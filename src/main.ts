import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Log environment variables (without showing sensitive values)
console.log('Environment check:', {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'defined' : 'not defined',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'defined' : 'not defined',
  ENCRYPTION_KEY: import.meta.env.VITE_ENCRYPTION_KEY ? 'defined' : 'not defined'
})

// Error handling for the entire app
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error)
  
  // If the error is about Supabase environment variables, show a user-friendly message
  if (event.error?.message?.includes('Supabase environment')) {
    // This could be enhanced to show a UI error instead of just console
    console.warn('App running in demo mode due to missing configuration')
  }
})

// Create Vue app instance
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use router
app.use(router)

// Error handling for Vue-specific errors
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err, info)
}

// Mount the app
app.mount('#app') 