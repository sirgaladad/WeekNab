<template>
  <div class="budgets">
    <h1>Your Budgets</h1>
    
    <div v-if="loading" class="loading">
      Loading budgets...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="budgets-list">
      <div v-for="budget in budgets" :key="budget.id" class="budget-card">
        <h2>{{ budget.name }}</h2>
        <p>Last modified: {{ new Date(budget.last_modified_on).toLocaleDateString() }}</p>
        <button @click="selectBudget(budget.id)">View Budget</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getYNABService } from '../services/ynab.service'
import type { BudgetSummary } from 'ynab'

export default defineComponent({
  name: 'BudgetsView',
  setup() {
    const budgets = ref<BudgetSummary[]>([])
    const loading = ref(true)
    const error = ref('')

    const loadBudgets = async () => {
      try {
        const ynabService = getYNABService()
        budgets.value = await ynabService.getBudgets()
        loading.value = false
      } catch (err) {
        error.value = 'Failed to load budgets. Please check your token and try again.'
        loading.value = false
      }
    }

    const selectBudget = (budgetId: string) => {
      // TODO: Implement budget selection
      console.log('Selected budget:', budgetId)
    }

    onMounted(() => {
      loadBudgets()
    })

    return {
      budgets,
      loading,
      error,
      selectBudget
    }
  }
})
</script>

<style scoped>
.budgets {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  margin: 40px 0;
}

.error {
  color: #dc3545;
}

.budgets-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.budget-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.budget-card h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.budget-card button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.budget-card button:hover {
  background-color: #3aa876;
}
</style> 