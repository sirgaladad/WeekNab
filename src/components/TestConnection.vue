<template>
  <div class="test-connection">
    <h2>Connection Test</h2>
    
    <div class="test-section">
      <h3>Supabase Connection</h3>
      <button @click="testSupabaseConnection" :disabled="isLoading">
        Test Supabase Connection
      </button>
      <p v-if="supabaseStatus" :class="['status', supabaseStatus.type]">
        {{ supabaseStatus.message }}
      </p>
    </div>

    <div class="test-section">
      <h3>Encryption Test</h3>
      <div class="input-group">
        <input 
          v-model="testData" 
          placeholder="Enter text to encrypt"
          :disabled="isLoading"
        />
        <button @click="testEncryption" :disabled="isLoading || !testData">
          Test Encryption
        </button>
      </div>
      <div v-if="encryptionResult" class="result">
        <p><strong>Original:</strong> {{ encryptionResult.original }}</p>
        <p><strong>Encrypted:</strong> {{ encryptionResult.encrypted }}</p>
        <p><strong>Decrypted:</strong> {{ encryptionResult.decrypted }}</p>
        <p><strong>Match:</strong> 
          <span :class="encryptionResult.match ? 'success' : 'error'">
            {{ encryptionResult.match ? '✓' : '✗' }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { encryptData, decryptData } from '@/lib/encryption'

const isLoading = ref(false)
const testData = ref('')
const supabaseStatus = ref<{ type: 'success' | 'error', message: string } | null>(null)
const encryptionResult = ref<{
  original: string
  encrypted: string
  decrypted: string
  match: boolean
} | null>(null)

async function testSupabaseConnection() {
  isLoading.value = true
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    if (error) throw error
    supabaseStatus.value = {
      type: 'success',
      message: 'Successfully connected to Supabase!'
    }
  } catch (error) {
    console.error('Supabase connection error:', error)
    supabaseStatus.value = {
      type: 'error',
      message: 'Failed to connect to Supabase. Check console for details.'
    }
  } finally {
    isLoading.value = false
  }
}

async function testEncryption() {
  if (!testData.value) return
  
  isLoading.value = true
  try {
    const original = testData.value
    const encrypted = await encryptData(original)
    const decrypted = await decryptData(encrypted)
    
    encryptionResult.value = {
      original,
      encrypted,
      decrypted,
      match: original === decrypted
    }
  } catch (error) {
    console.error('Encryption test error:', error)
    encryptionResult.value = {
      original: testData.value,
      encrypted: 'Error',
      decrypted: 'Error',
      match: false
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.test-connection {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background: var(--color-background-soft);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 4px;
  background: var(--color-background);
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--color-heading);
}

h3 {
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: var(--color-primary);
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.status.success {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.status.error {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  background: var(--color-background-soft);
}

.result p {
  margin: 0.5rem 0;
  word-break: break-all;
}

.success {
  color: #28a745;
}

.error {
  color: #dc3545;
}
</style> 