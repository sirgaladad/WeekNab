<template>
  <div class="budget-detail">
    <header class="header">
      <h1>{{ budget?.name || 'Loading...' }}</h1>
    </header>

    <div v-if="loading" class="loading">
      Loading budget details...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <template v-else>
      <ActionButtons :budget-id="budgetId" />
      
      <div class="weekly-overview">
        <h2>Weekly Overview</h2>
        <div class="stats">
          <div class="stat-item">
            <span class="label">Income</span>
            <span class="value positive">{{ formatCurrency(weeklyIncome) }}</span>
          </div>
          <div class="stat-item">
            <span class="label">Expenses</span>
            <span class="value negative">{{ formatCurrency(weeklyExpenses) }}</span>
          </div>
          <div class="stat-item">
            <span class="label">Balance</span>
            <span class="value" :class="{ negative: weeklyBalance < 0 }">
              {{ formatCurrency(weeklyBalance) }}
            </span>
          </div>
        </div>
      </div>

      <CategoryList :categories="categoryGroups" />
      
      <RecentTransactions :transactions="recentTransactions" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { BudgetDetail, CategoryGroup, TransactionDetail } from 'ynab'
import { formatCurrency } from '@/utils/currency'
import ActionButtons from '@/components/budget/ActionButtons.vue'
import CategoryList from '@/components/budget/CategoryList.vue'
import RecentTransactions from '@/components/budget/RecentTransactions.vue'

const route = useRoute()
const budgetId = route.params.id as string

const budget = ref<BudgetDetail | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const categoryGroups = ref<CategoryGroup[]>([])
const recentTransactions = ref<TransactionDetail[]>([])

const weeklyIncome = ref(0)
const weeklyExpenses = ref(0)
const weeklyBalance = ref(0)

onMounted(async () => {
  try {
    // TODO: Implement API calls to fetch budget data
    loading.value = false
  } catch (e) {
    error.value = 'Failed to load budget details'
    loading.value = false
  }
})
</script>

<style scoped>
.budget-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.header {
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.75rem;
  color: var(--text);
  margin: 0;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  background: var(--surface);
  border-radius: 12px;
  border: 1px solid var(--border);
  margin: 1rem 0;
}

.error {
  color: var(--error);
}

.weekly-overview {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
}

.weekly-overview h2 {
  font-size: 1.25rem;
  color: var(--text);
  margin: 0 0 1rem 0;
}

.stats {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.stat-item {
  background: var(--background);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.value {
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
}

.positive {
  color: var(--success);
}

.negative {
  color: var(--error);
}

@media (min-width: 640px) {
  .budget-detail {
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  .weekly-overview {
    padding: 1.5rem;
  }

  .weekly-overview h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .stats {
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .stat-item {
    padding: 1rem;
  }

  .value {
    font-size: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .budget-detail {
    padding: 3rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }
}
</style> 