<template>
  <div class="home">
    <h1>Welcome to WeekNab</h1>
    <p>Your weekly YNAB budget overview</p>
    
    <div v-if="!hasToken" class="token-input">
      <h2>Enter your YNAB Access Token</h2>
      <input 
        type="password" 
        v-model="token" 
        placeholder="Your YNAB Access Token"
      />
      <button @click="saveToken">Save Token</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { initYNABService } from '../services/ynab.service'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter()
    const token = ref('')
    const hasToken = computed(() => !!localStorage.getItem('ynab_token'))

    const saveToken = () => {
      if (token.value) {
        localStorage.setItem('ynab_token', token.value)
        initYNABService(token.value)
        router.push('/budgets')
      }
    }

    return {
      token,
      hasToken,
      saveToken
    }
  }
})
</script>

<style scoped>
.home {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.token-input {
  margin-top: 40px;
}

input {
  padding: 10px;
  width: 300px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style> 