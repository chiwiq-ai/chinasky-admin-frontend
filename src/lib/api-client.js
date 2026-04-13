// ============================================================================
// HTTP Client (Admin Dashboard)
// ============================================================================
// Single source of truth for backend communication.
//
// Responsibilities:
//   - Resolve base URL from Vite env vars (with sensible fallbacks)
//   - Inject Authorization header from token storage
//   - Serialize JSON bodies and set headers automatically
//   - Apply a request timeout via AbortController
//   - Validate response content-type before parsing
//   - Throw a structured ApiError on non-2xx responses
//   - Surface 401s through an optional unauthorized handler so the
//     auth context can clear stale sessions and redirect to /login
// ============================================================================

import appConfig from '../config/app.json'
import { ApiError, extractApiErrorMessage } from './api-error.js'

const TOKEN_STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'chinasky_admin_token'
const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS) || 30000

function resolveBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL
  if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/$/, '')
  }
  if (appConfig.apiBaseUrl) return String(appConfig.apiBaseUrl).replace(/\/$/, '')
  return '/api'
}

export const BASE_URL = resolveBaseUrl()

// ---------- Token storage ----------------------------------------------------

export const tokenStorage = {
  get() {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY)
    } catch {
      return null
    }
  },
  set(token) {
    try {
      if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token)
      else localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch {
      // ignore quota / privacy mode errors
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch {
      // ignore
    }
  },
}

// ---------- Unauthorized hook ------------------------------------------------

let onUnauthorized = null

/** Register a callback fired whenever a request returns 401. */
export function setUnauthorizedHandler(handler) {
  onUnauthorized = typeof handler === 'function' ? handler : null
}

// ---------- Core request -----------------------------------------------------

/**
 * Perform an HTTP request to the backend.
 * Returns parsed JSON for 2xx responses, or `null` for 204/empty bodies.
 * Throws an ApiError on failure.
 */
export async function request(path, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    rawBody,
    query,
    auth = true,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal,
  } = options

  let url = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
  if (query && typeof query === 'object') {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === '') continue
      params.append(key, String(value))
    }
    const qs = params.toString()
    if (qs) url += (url.includes('?') ? '&' : '?') + qs
  }

  const finalHeaders = { Accept: 'application/json', ...headers }
  let finalBody = rawBody
  if (rawBody === undefined && body !== undefined) {
    finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json'
    finalBody = typeof body === 'string' ? body : JSON.stringify(body)
  }
  if (auth) {
    const token = tokenStorage.get()
    if (token) finalHeaders['Authorization'] = `Bearer ${token}`
  }

  const controller = new AbortController()
  const timeoutId = timeoutMs > 0 ? setTimeout(() => controller.abort(new DOMException('Request timed out', 'TimeoutError')), timeoutMs) : null
  if (signal) {
    if (signal.aborted) controller.abort(signal.reason)
    else signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true })
  }

  let response
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: finalBody,
      signal: controller.signal,
    })
  } catch (err) {
    if (timeoutId) clearTimeout(timeoutId)
    if (err && (err.name === 'AbortError' || err.name === 'TimeoutError')) {
      throw new ApiError('Request timed out', { status: 0, code: 'TIMEOUT' })
    }
    throw new ApiError(err && err.message ? err.message : 'Network error', { status: 0, code: 'NETWORK_ERROR' })
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }

  if (response.status === 401 && onUnauthorized) {
    try {
      onUnauthorized()
    } catch {
      // never let the handler break the original error path
    }
  }

  if (!response.ok) {
    const message = await extractApiErrorMessage(response, `Request failed (${response.status})`)
    throw new ApiError(message, { status: response.status })
  }

  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    const text = await response.text()
    return text || null
  }
  try {
    return await response.json()
  } catch (err) {
    throw new ApiError('Invalid JSON in response', { status: response.status, code: 'PARSE_ERROR' })
  }
}

export const apiGet = (path, options) => request(path, { ...options, method: 'GET' })
export const apiPost = (path, body, options) => request(path, { ...options, method: 'POST', body })
export const apiPut = (path, body, options) => request(path, { ...options, method: 'PUT', body })
export const apiPatch = (path, body, options) => request(path, { ...options, method: 'PATCH', body })
export const apiDelete = (path, options) => request(path, { ...options, method: 'DELETE' })
