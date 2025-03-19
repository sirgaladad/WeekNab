<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Connect with YNAB</h1>
      <p class="description">
        To connect with YNAB, you'll need to generate a personal access token. 
        <a href="https://app.ynab.com/settings/developer" target="_blank" rel="noopener">Get your token here</a>.
      </p>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="token">YNAB Token</label>
          <input
            id="token"
            v-model="token"
            type="password"
            :disabled="isLoading"
            @input="error = ''"
            placeholder="Paste your YNAB token here"
          />
        </div>

        <p class="help-text">
          Generate a personal access token from your 
          <a href="https://app.ynab.com/settings/developer" target="_blank" rel="noopener">
            YNAB Developer Settings
          </a>
          and paste it here.
        </p>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            :disabled="isLoading || !token.trim()"
            class="submit-button"
          >
            {{ isLoading ? 'Connecting...' : 'Connect' }}
          </button>
        </div>
      </form>

      <div class="security-info">
        <h2>Your Security Matters</h2>
        <ul>
          <li>Your token is stored securely in your browser</li>
          <li>We never store your token on our servers</li>
          <li>All communication is encrypted via HTTPS</li>
          <li>You can revoke access anytime from YNAB</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const token = ref('')
const error = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  error.value = ''
  isLoading.value = true

  try {
    if (!token.value.trim()) {
      throw new Error('Please enter your YNAB token')
    }

    // Try to validate the token first
    const isValid = await authStore.validateToken(token.value)

    if (!isValid) {
      throw new Error('Failed to validate YNAB token. Please check your token and try again.')
    }

    // Token is valid, redirect to dashboard
    const redirectPath = authStore.redirectPath || '/dashboard'
    router.push(redirectPath)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to connect to YNAB'
    token.value = '' // Clear the invalid token
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  background: var(--surface);
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
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

label {
  color: var(--text);
  font-weight: 500;
}

input {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-dark);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary);
}

.help-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.help-text a {
  color: var(--primary);
  text-decoration: none;
}

.help-text a:hover {
  text-decoration: underline;
}

.form-actions {
  margin-top: 1rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.token-info {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.token-warning {
  color: #dc2626;
}

.error-message {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 0.875rem;
}

.security-info {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.security-info h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.security-info ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  color: var(--text-secondary);
}

.security-info li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }

  .login-container {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style> 