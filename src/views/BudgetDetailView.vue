<template>
  <div class="budget-detail">
    <div class="header">
      <button
        class="back-button"
        @click="router.back()"
      >
        ← Back to Budgets
      </button>
      <h1>{{ budget?.name || 'Loading...' }}</h1>
    </div>

    <div
      v-if="loading"
      class="loading"
    >
      Loading budget details...
    </div>

    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <div
      v-else
      class="budget-content"
    >
      <!-- Weekly Overview -->
      <section class="section">
        <h2>Weekly Overview</h2>
        <p class="coming-soon">
          Weekly budget breakdown coming soon!
        </p>
      </section>

      <!-- Categories -->
      <section class="section">
        <h2>Categories</h2>
        <div class="categories">
          <div
            v-for="group in categories"
            :key="group.id"
            class="category-group"
          >
            <h3>{{ group.name }}</h3>
            <div class="category-list">
              <div
                v-for="category in group.categories || []"
                :key="category.id"
                class="category-item"
              >
                <div class="category-info">
                  <span class="category-name">{{ category.name }}</span>
                  <span
                    class="category-balance"
                    :class="{ negative: category.balance < 0 }"
                  >
                    {{ formatCurrency(category.balance) }}
                  </span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress" 
                    :style="{ width: `${Math.min(100, (category.activity / (category.budgeted || 1)) * 100)}%` }"
                    :class="{ warning: category.balance < 0 }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Transactions -->
      <section class="section">
        <h2>Recent Transactions</h2>
        <div class="transactions">
          <div
            v-for="transaction in recentTransactions"
            :key="transaction.id"
            class="transaction-item"
          >
            <div class="transaction-info">
              <span class="transaction-payee">{{ transaction.payee_name || 'Unknown Payee' }}</span>
              <span
                class="transaction-amount"
                :class="{ negative: transaction.amount < 0 }"
              >
                {{ formatCurrency(transaction.amount) }}
              </span>
            </div>
            <div class="transaction-details">
              <span class="transaction-category">{{ transaction.category_name || 'Uncategorized' }}</span>
              <span class="transaction-date">{{ formatDate(transaction.date) }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as ynabService from '@/services/ynab.service'
import type { BudgetDetail, CategoryGroup, TransactionDetail } from 'ynab'

const router = useRouter()
const route = useRoute()
const budgetId = route.params.id as string

const budget = ref<BudgetDetail | null>(null)
const categories = ref<CategoryGroup[]>([])
const recentTransactions = ref<TransactionDetail[]>([])
const loading = ref(true)
const error = ref('')

const loadBudgetData = async () => {
  try {
    // Load budget details
    budget.value = await ynabService.getBudgetById(budgetId)
    
    // Load categories
    categories.value = await ynabService.getCategories(budgetId)
    
    // Load recent transactions
    recentTransactions.value = await ynabService.getTransactions(budgetId)
    
    loading.value = false
  } catch (err) {
    error.value = 'Failed to load budget details. Please try again.'
    loading.value = false
  }
}

const formatCurrency = (amount: number) => {
  const value = amount / 1000 // YNAB stores amounts in milliunits
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  loadBudgetData()
})
</script>

<style scoped>
.budget-detail {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.header {
  margin-bottom: 2rem;
}

.back-button {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1rem;
  display: inline-block;
}

.back-button:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2.5rem;
  color: var(--text);
  margin: 0;
}

.loading, .error {
  text-align: center;
  margin: 4rem 0;
  color: var(--text-secondary);
}

.error {
  color: #dc2626;
}

.section {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
}

h2 {
  font-size: 1.5rem;
  color: var(--text);
  margin: 0 0 1.5rem 0;
}

.coming-soon {
  color: var(--text-secondary);
  font-style: italic;
}

.category-group {
  margin-bottom: 2rem;
}

.category-group:last-child {
  margin-bottom: 0;
}

h3 {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 1rem;
}

.category-item {
  margin-bottom: 1rem;
}

.category-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.category-name {
  color: var(--text);
}

.category-balance {
  font-weight: 500;
}

.progress-bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.progress.warning {
  background: #dc2626;
}

.transaction-item {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.transaction-payee {
  color: var(--text);
  font-weight: 500;
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.negative {
  color: #dc2626;
}

@media (max-width: 768px) {
  .budget-detail {
    margin: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .section {
    padding: 1rem;
  }
}
</style> 