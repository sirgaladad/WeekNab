import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Create Vue app instance
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use router
app.use(router)

// Mount the app
app.mount('#app') 