import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [tailwindcss(), vue()],
  build: {
    rollupOptions: {
      input: {
        home:      resolve(__dirname, 'index.html'),
        mentions:  resolve(__dirname, 'mentions-legales.html'),
        politique: resolve(__dirname, 'politique-confidentialite.html'),
      }
    }
  }
})
