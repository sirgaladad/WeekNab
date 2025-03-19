<template>
  <div class="token-login">
    <h2>Connect Your YNAB Account</h2>
    <p class="description">
      To get started, you'll need to connect your YNAB account. Please enter your Personal Access Token below.
    </p>
    
    <div class="token-instructions">
      <h3>How to get your token:</h3>
      <ol>
        <li>Log in to your YNAB account</li>
        <li>Go to Account Settings</li>
        <li>Scroll down to "Developer Settings"</li>
        <li>Click "New Token" and copy it</li>
        <li>Paste your token below</li>
      </ol>
    </div>

    <form
      class="token-form"
      @submit.prevent="handleSubmit"
    >
      <div class="form-group">
        <label for="token">Personal Access Token</label>
        <input
          id="token"
          v-model="token"
          type="password"
          placeholder="Enter your YNAB token"
          :class="{ 'error': showError }"
        >
        <span
          v-if="showError"
          class="error-message"
        >
          {{ errorMessage }}
        </span>
      </div>

      <div class="actions">
        <button 
          type="submit" 
          class="submit-button"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Connecting...' : 'Connect to YNAB' }}
        </button>
      </div>
    </form>

    <div class="security-note">
      <h3>🔒 Security Note</h3>
      <p>
        Your token is stored securely in your browser and is never sent to our servers.
        We only use it to communicate directly with YNAB on your behalf.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service'

const router = useRouter()
const token = ref('')
const isLoading = ref(false)
const showError = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!token.value.trim()) {
    showError.value = true
    errorMessage.value = 'Please enter your YNAB token'
    return
  }

  isLoading.value = true
  showError.value = false

  try {
    const isValid = await AuthService.validateToken(token.value)
    if (isValid) {
      AuthService.saveToken(token.value)
      router.push('/budgets')
    } else {
      showError.value = true
      errorMessage.value = 'Invalid token. Please check and try again.'
    }
  } catch (error) {
    showError.value = true
    errorMessage.value = 'Failed to validate token. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.token-login {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--surface);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.token-instructions {
  background: var(--background);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.token-instructions h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.token-instructions ol {
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.token-instructions li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.token-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 6px;
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

input.error {
  border-color: #dc2626;
}

.error-message {
  display: block;
  color: #dc2626;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.security-note {
  background: rgba(37, 99, 235, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.security-note h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.security-note p {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.925rem;
}

@media (max-width: 768px) {
  .token-login {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style> 