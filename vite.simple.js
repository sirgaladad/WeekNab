// vite.simple.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

// Simple Vite configuration without TypeScript requirements
export default defineConfig({
  plugins: [vue()],
  base: '/WeekNab/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}) 