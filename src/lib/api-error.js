// ============================================================================
// API Error Utilities
// ============================================================================
// Robust extraction of human-readable error messages from arbitrary backend
// payloads. The backend may return errors in many shapes:
//   { message: "..." }
//   { error: "..." }
//   { code: "...", message: "...", details: [...] }
//   { details: { provider_error: "{\"message\":\"...\"}" } }
//   plain strings or HTML
// This module normalizes all of those into a single best-effort message.
// Modeled after the production api-error.ts pattern used in sibling projects.
// ============================================================================

const GENERIC_MESSAGES = new Set(['bad_request', 'request failed', 'error', 'failed'])

const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value)

const toStringMessage = (value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  if (Array.isArray(value)) {
    const parts = value
      .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
      .filter((entry) => entry.length > 0)
    return parts.length > 0 ? parts.join(', ') : null
  }
  return null
}

const parseProviderErrorMessage = (providerError) => {
  const raw = providerError.trim()
  if (!raw) return null

  const firstBrace = raw.indexOf('{')
  const lastBrace = raw.lastIndexOf('}')
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const candidate = raw.slice(firstBrace, lastBrace + 1)
    try {
      const parsed = JSON.parse(candidate)
      if (isRecord(parsed)) return toStringMessage(parsed.message)
    } catch {
      try {
        const parsed = JSON.parse(candidate.replace(/\\"/g, '"'))
        if (isRecord(parsed)) return toStringMessage(parsed.message)
      } catch {
        // fall through
      }
    }
  }

  const regexMatch = raw.match(/"message"\s*:\s*"([^"]+)"/)
  if (regexMatch && regexMatch[1]) {
    return regexMatch[1].replace(/\\"/g, '"').trim()
  }

  return null
}

const toDetailsMessages = (value) => {
  if (value == null) return []
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed ? [trimmed] : []
  }
  if (Array.isArray(value)) return value.flatMap((entry) => toDetailsMessages(entry))
  if (isRecord(value)) {
    const messages = []
    const providerError = toStringMessage(value.provider_error)
    if (providerError) {
      const providerMessage = parseProviderErrorMessage(providerError)
      messages.push(providerMessage || providerError)
    }
    const directMessage = toStringMessage(value.message)
    if (directMessage) messages.push(directMessage)
    const nested = toDetailsMessages(value.details)
    if (nested.length > 0) messages.push(...nested)
    return Array.from(new Set(messages.map((entry) => entry.trim()).filter((entry) => entry.length > 0)))
  }
  return []
}

const isGenericMessage = (message, code) => {
  const normalized = message.trim().toLowerCase()
  if (GENERIC_MESSAGES.has(normalized)) return true
  if (typeof code === 'string' && normalized === code.trim().toLowerCase()) return true
  return false
}

export function getApiErrorMessage(payload, fallback = 'Request failed') {
  if (typeof payload === 'string') {
    const message = payload.trim()
    return message.length > 0 ? message : fallback
  }
  if (!isRecord(payload)) return fallback

  const message =
    toStringMessage(payload.message) ||
    toStringMessage(payload.error) ||
    toStringMessage(payload.code)
  const details = toDetailsMessages(payload.details)

  if (details.length > 0) {
    if (message && !isGenericMessage(message, payload.code)) {
      return `${message}: ${details.join(', ')}`
    }
    return details.join(', ')
  }

  if (message) return message
  return fallback
}

export async function extractApiErrorMessage(response, fallback = 'Request failed') {
  let payload = null
  try {
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      payload = await response.json()
    } else {
      const text = await response.text()
      if (text.trim().length > 0) {
        try {
          payload = JSON.parse(text)
        } catch {
          payload = text
        }
      }
    }
  } catch {
    // ignore parse errors and fall through
  }

  const message = getApiErrorMessage(payload, fallback)
  if (message !== fallback) return message
  if (response.status) return `${fallback} (${response.status})`
  return fallback
}

export class ApiError extends Error {
  constructor(message, { status = 0, code, details, payload } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
    this.payload = payload
  }
}
