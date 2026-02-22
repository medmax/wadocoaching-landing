import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    // Fallback dev : redirige /ressources/:slug → /ressources/index.html (comme vercel.json en prod)
    {
      name: 'ressources-history-fallback',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith('/ressources/') && !req.url.includes('.')) {
            req.url = '/ressources/index.html'
          }
          next()
        })
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home:       resolve(__dirname, 'index.html'),
        mentions:   resolve(__dirname, 'mentions-legales.html'),
        politique:  resolve(__dirname, 'politique-confidentialite.html'),
        ressources: resolve(__dirname, 'ressources/index.html'),
      }
    }
  }
})
