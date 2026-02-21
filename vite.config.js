import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        home:     resolve(__dirname, 'index.html'),
        mentions: resolve(__dirname, 'mentions-legales.html'),
        politique: resolve(__dirname, 'politique-confidentialite.html'),
      }
    }
  }
})
