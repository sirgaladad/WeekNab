<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="modal-header">
        <h2>{{ isLogin ? 'Welcome Back' : 'Get Started' }}</h2>
        <p>{{ isLogin ? 'Sign in to your WeekNab account' : 'Create your WeekNab account' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label for="ynabToken">YNAB API Token</label>
          <div class="token-input-group">
            <input 
              id="ynabToken"
              v-model="ynabToken"
              type="password"
              required
              placeholder="Enter your YNAB API token"
              class="form-input"
            >
            <a 
              href="https://app.ynab.com/settings/developer" 
              target="_blank" 
              rel="noopener"
              class="token-help"
            >
              Get Token
            </a>
          </div>
        </div>

        <div v-if="!isLogin" class="form-group">
          <label for="confirmEmail">Confirm Email</label>
          <input 
            id="confirmEmail"
            v-model="confirmEmail"
            type="email"
            required
            placeholder="Confirm your email"
            class="form-input"
          >
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="submit-btn"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account') }}
        </button>

        <p class="toggle-mode">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button 
            type="button" 
            class="toggle-btn"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? 'Create Account' : 'Sign In' }}
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const email = ref('')
const confirmEmail = ref('')
const ynabToken = ref('')
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true

  try {
    if (!isLogin.value) {
      if (email.value !== confirmEmail.value) {
        throw new Error('Emails do not match')
      }
      
      // Create account
      const success = await authStore.createAccount(email.value, ynabToken.value)
      if (!success) {
        throw new Error('Failed to create account')
      }
    } else {
      // Validate YNAB token
      const isValid = await authStore.validateToken(ynabToken.value)
      if (!isValid) {
        throw new Error('Invalid YNAB token')
      }

      // Store the token and email
      authStore.setToken(ynabToken.value)
      authStore.setUserEmail(email.value)
    }

    // Close modal and redirect to dashboard
    emit('close')
    router.push('/dashboard')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--surface);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: var(--text);
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.modal-header p {
  color: var(--text-secondary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-dark);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
}

.token-input-group {
  display: flex;
  gap: 0.5rem;
}

.token-help {
  color: var(--primary);
  text-decoration: none;
  font-size: 0.875rem;
  white-space: nowrap;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.token-help:hover {
  background: var(--surface-dark);
}

.error-message {
  color: #EF4444;
  font-size: 0.875rem;
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
}

.submit-btn {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: var(--primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.toggle-mode {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: 0.25rem;
}

.toggle-btn:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }

  .token-input-group {
    flex-direction: column;
  }

  .token-help {
    text-align: center;
  }
}
</style> 