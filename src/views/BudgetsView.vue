<template>
  <div class="budgets">
    <h1>Your Budgets</h1>
    
    <div
      v-if="loading"
      class="loading"
    >
      Loading budgets...
    </div>
    
    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>
    
    <div
      v-else
      class="budgets-list"
    >
      <div
        v-for="budget in budgets"
        :key="budget.id"
        class="budget-card"
      >
        <h2>{{ budget.name }}</h2>
        <p>Last modified: {{ budget.last_modified_on ? new Date(budget.last_modified_on).toLocaleDateString() : 'Never' }}</p>
        <button @click="selectBudget(budget.id)">
          View Budget
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as ynabService from '@/services/ynab.service'
import type { BudgetSummary } from 'ynab'

const router = useRouter()
const budgets = ref<BudgetSummary[]>([])
const loading = ref(true)
const error = ref('')

const loadBudgets = async () => {
  try {
    budgets.value = await ynabService.getBudgets()
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load budgets. Please check your token and try again.'
    loading.value = false
  }
}

const selectBudget = (budgetId: string) => {
  router.push(`/budgets/${budgetId}`)
}

onMounted(() => {
  loadBudgets()
})
</script>

<style scoped>
.budgets {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text);
}

.loading, .error {
  text-align: center;
  margin: 4rem 0;
  color: var(--text-secondary);
}

.error {
  color: #dc2626;
}

.budgets-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.budget-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.budget-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.budget-card h2 {
  margin: 0 0 1rem 0;
  color: var(--text);
  font-size: 1.5rem;
}

.budget-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.budget-card button {
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

.budget-card button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

@media (max-width: 768px) {
  .budgets {
    margin: 1rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .budget-card {
    padding: 1rem;
  }
}
</style> 