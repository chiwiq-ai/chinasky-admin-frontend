import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// Env vars (set in .env.local, .env.development, .env.production):
//   VITE_API_BASE_URL    Backend root, e.g. http://localhost:4000/api
//                        If unset, the dev server proxies "/api" -> VITE_API_PROXY_TARGET.
//   VITE_API_PROXY_TARGET  Dev-only proxy target, default http://localhost:4000
//   VITE_AUTH_TOKEN_KEY  localStorage key for the auth token (optional)
//   VITE_API_TIMEOUT_MS  Per-request timeout in ms (optional, default 30000)
//
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:4000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
