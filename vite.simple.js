// vite.simple.js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

// Simple Vite configuration without TypeScript requirements
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  console.log('Environment variables loaded:', Object.keys(env).filter(key => key.startsWith('VITE_')))
  
  return {
    plugins: [vue()],
    base: '/WeekNab/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // Pass env variables to the app
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'import.meta.env.VITE_ENCRYPTION_KEY': JSON.stringify(env.VITE_ENCRYPTION_KEY)
    }
  }
}) 