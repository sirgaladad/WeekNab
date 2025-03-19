<template>
  <div class="weekly-budget-demo">
    <!-- Week Navigation -->
    <div class="week-nav">
      <button class="nav-btn">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="week-info">
        <span class="week-label">Current Week</span>
        <span class="week-date">May 13 - May 19</span>
      </div>
      <button class="nav-btn" disabled>
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Budget Overview -->
    <div class="budget-overview">
      <div class="budget-card">
        <span class="label">Weekly Budget</span>
        <span class="amount">$850.00</span>
        <div class="progress-container">
          <div class="progress-bar" style="width: 65%"></div>
        </div>
        <div class="budget-stats">
          <div class="stat">
            <span class="label">Spent</span>
            <span class="value">$552.50</span>
          </div>
          <div class="stat">
            <span class="label">Remaining</span>
            <span class="value">$297.50</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Category List -->
    <div class="categories">
      <div class="category-filters">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          :class="['filter-btn', currentFilter === filter.id ? 'active' : '']"
          @click="currentFilter = filter.id"
        >
          {{ filter.name }}
        </button>
      </div>

      <div class="category-list">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id"
          class="category-item"
          :class="{ expanded: expandedCategory === category.id }"
          @click="toggleCategory(category.id)"
        >
          <div class="category-header">
            <div class="category-info">
              <i :class="category.icon"></i>
              <div class="category-text">
                <span class="category-name">{{ category.name }}</span>
                <span class="category-budget">${{ category.budget }}</span>
              </div>
            </div>
            <div class="category-progress">
              <div 
                class="progress-bar"
                :style="getProgressStyle(category)"
                :class="{ warning: isOverBudget(category) }"
              ></div>
            </div>
          </div>

          <div class="category-details">
            <div class="transactions">
              <div 
                v-for="transaction in category.transactions" 
                :key="transaction.id"
                class="transaction-item"
              >
                <div class="transaction-info">
                  <span class="payee">{{ transaction.payee }}</span>
                  <span class="date">{{ transaction.date }}</span>
                </div>
                <span class="amount">${{ transaction.amount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Transaction {
  id: string
  payee: string
  date: string
  amount: string
}

interface Category {
  id: string
  name: string
  icon: string
  budget: number
  spent: number
  type: 'essential' | 'discretionary'
  transactions: Transaction[]
}

const currentFilter = ref('all')
const expandedCategory = ref<string | null>(null)

const filters = [
  { id: 'all', name: 'All' },
  { id: 'essential', name: 'Essential' },
  { id: 'discretionary', name: 'Discretionary' }
]

const categories: Category[] = [
  {
    id: 'groceries',
    name: 'Groceries',
    icon: 'fas fa-shopping-cart',
    budget: 200,
    spent: 175.50,
    type: 'essential',
    transactions: [
      { id: '1', payee: 'Whole Foods', date: 'May 15', amount: '85.75' },
      { id: '2', payee: "Trader Joe's", date: 'May 17', amount: '89.75' }
    ]
  },
  {
    id: 'dining',
    name: 'Dining Out',
    icon: 'fas fa-utensils',
    budget: 150,
    spent: 132.25,
    type: 'discretionary',
    transactions: [
      { id: '3', payee: 'Local Cafe', date: 'May 14', amount: '42.50' },
      { id: '4', payee: 'Pizza Place', date: 'May 16', amount: '89.75' }
    ]
  },
  {
    id: 'transport',
    name: 'Transportation',
    icon: 'fas fa-bus',
    budget: 100,
    spent: 45.75,
    type: 'essential',
    transactions: [
      { id: '5', payee: 'Gas Station', date: 'May 13', amount: '45.75' }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'fas fa-film',
    budget: 100,
    spent: 89.00,
    type: 'discretionary',
    transactions: [
      { id: '6', payee: 'Cinema', date: 'May 18', amount: '45.00' },
      { id: '7', payee: 'Streaming Service', date: 'May 13', amount: '44.00' }
    ]
  }
]

const filteredCategories = computed(() => {
  if (currentFilter.value === 'all') return categories
  return categories.filter(category => category.type === currentFilter.value)
})

const getProgressStyle = (category: Category) => {
  const percentage = (category.spent / category.budget) * 100
  return { width: percentage + '%' }
}

const isOverBudget = (category: Category) => {
  return category.spent > category.budget * 0.8
}

const toggleCategory = (categoryId: string) => {
  if (expandedCategory.value === categoryId) {
    expandedCategory.value = null
  } else {
    expandedCategory.value = categoryId
  }
}
</script>

<style scoped>
.weekly-budget-demo {
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--background);
}

.week-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--surface);
  border-radius: 8px;
}

.nav-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
}

.nav-btn:disabled {
  color: var(--text-disabled);
  cursor: not-allowed;
}

.week-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.week-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.week-date {
  font-weight: 600;
}

.budget-overview {
  padding: 1rem;
}

.budget-card {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.budget-card .label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.budget-card .amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.progress-container {
  height: 8px;
  background: var(--surface-variant);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.progress-bar.warning {
  background: var(--warning);
}

.budget-stats {
  display: flex;
  justify-content: space-between;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat .label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.stat .value {
  font-weight: 600;
}

.categories {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--surface);
  color: var(--text-secondary);
  border-radius: 20px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background: var(--primary);
  color: white;
}

.category-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
}

.category-item {
  background: var(--surface);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-info i {
  font-size: 1.25rem;
  color: var(--primary);
}

.category-text {
  display: flex;
  flex-direction: column;
}

.category-name {
  font-weight: 600;
}

.category-budget {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.category-progress {
  width: 100px;
  height: 4px;
  background: var(--surface-variant);
  border-radius: 2px;
  overflow: hidden;
}

.category-details {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.category-item.expanded .category-details {
  max-height: 500px;
}

.transactions {
  padding: 1rem;
  border-top: 1px solid var(--border);
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.transaction-item:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.payee {
  font-weight: 500;
}

.date {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.amount {
  font-weight: 600;
}
</style> 