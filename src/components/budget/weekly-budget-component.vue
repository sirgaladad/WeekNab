<template>
  <div class="weekly-view">
    <div class="header-section">
      <div class="date-selector">
        <button 
          class="nav-button" 
          @click="previousWeek"
          aria-label="Previous week"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div class="current-date">
          <h2>{{ currentWeekLabel }}</h2>
          <p class="date-range">{{ weekDateRange }}</p>
        </div>
        <button 
          class="nav-button" 
          @click="nextWeek"
          aria-label="Next week"
          :disabled="isCurrentWeek"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      
      <div class="progress-card">
        <div class="progress-header">
          <h3>Weekly Budget</h3>
          <div class="week-selection">
            <span class="current-week">Week {{ currentWeekNumber }} of {{ totalWeeks }}</span>
          </div>
        </div>
        
        <div class="spending-overview">
          <div class="budget-summary">
            <div class="amount-item">
              <span class="label">Budget</span>
              <span class="amount">{{ formatCurrency(weeklyBudget) }}</span>
            </div>
            <div class="amount-item">
              <span class="label">Spent</span>
              <span class="amount">{{ formatCurrency(weeklySpent) }}</span>
            </div>
            <div class="amount-item">
              <span class="label">Remaining</span>
              <span :class="['amount', weeklyRemaining < 0 ? 'negative' : '']">
                {{ formatCurrency(weeklyRemaining) }}
              </span>
            </div>
          </div>
          
          <div class="progress-container">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${Math.min(100, (weeklySpent / weeklyBudget) * 100)}%` }"
                :class="{ 'over-budget': weeklySpent > weeklyBudget }"
              ></div>
            </div>
            <div class="progress-label">
              <span>{{ Math.round((weeklySpent / weeklyBudget) * 100) }}% of weekly budget</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="categories-section">
      <h3>Category Spending</h3>
      
      <div class="filter-tabs">
        <button 
          v-for="filter in filterOptions" 
          :key="filter.value"
          :class="['filter-tab', currentFilter === filter.value ? 'active' : '']"
          @click="changeFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>
      
      <div class="categories-list">
        <div v-if="loading" class="loading-categories">
          <p>Loading categories...</p>
        </div>
        
        <template v-else>
          <div 
            v-for="category in filteredCategories" 
            :key="category.id"
            class="category-item"
          >
            <div class="category-header">
              <div class="category-name-wrapper">
                <div class="category-color" :style="{ backgroundColor: getCategoryColor(category) }"></div>
                <span class="category-name">{{ category.name }}</span>
              </div>
              
              <div class="category-amounts">
                <span :class="['spent', isOverBudget(category) ? 'negative' : '']">
                  {{ formatCurrency(getWeeklySpent(category)) }}
                </span>
                <span class="allocated">/ {{ formatCurrency(getWeeklyBudget(category)) }}</span>
              </div>
            </div>
            
            <div class="category-progress">
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ width: `${getCategoryProgressPercentage(category)}%` }"
                  :class="{ 'over-budget': isOverBudget(category) }"
                ></div>
              </div>
            </div>
            
            <div class="transactions-preview" v-if="showTransactionsFor === category.id">
              <div 
                v-for="transaction in getCategoryTransactions(category.id)"
                :key="transaction.id"
                class="transaction-item"
              >
                <span class="transaction-name">{{ transaction.payee_name }}</span>
                <span :class="['transaction-amount', transaction.amount < 0 ? 'negative' : '']">
                  {{ formatCurrency(transaction.amount) }}
                </span>
              </div>
              
              <button class="view-all-button" @click="viewAllTransactions(category)">
                View all transactions
              </button>
            </div>
            
            <button 
              class="toggle-transactions" 
              @click="toggleTransactions(category.id)"
            >
              {{ showTransactionsFor === category.id ? 'Hide transactions' : 'Show transactions' }}
            </button>
          </div>
          
          <div v-if="filteredCategories.length === 0" class="no-categories">
            <p>No categories match the current filter.</p>
          </div>
        </template>
      </div>
    </div>
    
    <div class="insights-section">
      <h3>Weekly Insights</h3>
      
      <div class="insight-cards">
        <div class="insight-card" v-if="topSpendingCategory">
          <div class="insight-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8l-8 8"></path>
              <path d="M8 8l8 8"></path>
            </svg>
          </div>
          <div class="insight-content">
            <h4>Top Spending</h4>
            <p>Your highest spending this week is in <strong>{{ topSpendingCategory.name }}</strong> with {{ formatCurrency(getWeeklySpent(topSpendingCategory)) }}.</p>
          </div>
        </div>
        
        <div class="insight-card" v-if="overBudgetCategories.length > 0">
          <div class="insight-icon warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div class="insight-content">
            <h4>Over Budget</h4>
            <p>You have {{ overBudgetCategories.length }} {{ overBudgetCategories.length === 1 ? 'category' : 'categories' }} over budget this week.</p>
          </div>
        </div>
        
        <div class="insight-card" v-if="savingsOpportunity">
          <div class="insight-icon success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="insight-content">
            <h4>Savings Opportunity</h4>
            <p>You're {{ formatCurrency(savingsOpportunity) }} under budget in your discretionary spending categories!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as ynabService from '@/services/ynab.service'
import type { CategoryGroup, Category, TransactionDetail } from 'ynab'

const route = useRoute()
const router = useRouter()
const budgetId = route.params.budgetId as string

// Date & Week handling
const today = new Date()
const currentDate = ref(new Date())
const weekOffset = ref(0)

// Data loading
const loading = ref(true)
const categoryGroups = ref<CategoryGroup[]>([])
const transactions = ref<TransactionDetail[]>([])
const showTransactionsFor = ref<string | null>(null)

// Filters
const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Over Budget', value: 'over-budget' },
  { label: 'Under Budget', value: 'under-budget' },
  { label: 'Essential', value: 'essential' }
]
const currentFilter = ref('all')
const essentialCategories = ['Rent/Mortgage', 'Groceries', 'Utilities', 'Transportation', 'Healthcare', 'Insurance']

// Calculate week number and date range
const currentWeekNumber = computed(() => {
  const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  const firstDayWeek = getWeekOfMonth(firstDayOfMonth)
  const currentWeek = getWeekOfMonth(currentDate.value)
  return currentWeek - firstDayWeek + 1
})

const totalWeeks = computed(() => {
  const lastDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)
  const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  const firstWeek = getWeekOfMonth(firstDayOfMonth)
  const lastWeek = getWeekOfMonth(lastDayOfMonth)
  return lastWeek - firstWeek + 1
})

const currentWeekLabel = computed(() => {
  return `Week ${currentWeekNumber.value}`
})

const weekDateRange = computed(() => {
  const startOfWeek = getStartOfWeek(currentDate.value)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  
  const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' })
  const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' })
  const startDay = startOfWeek.getDate()
  const endDay = endOfWeek.getDate()
  
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}`
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
  }
})

const isCurrentWeek = computed(() => {
  const startOfCurrentWeek = getStartOfWeek(today)
  const startOfSelectedWeek = getStartOfWeek(currentDate.value)
  return startOfCurrentWeek.getTime() === startOfSelectedWeek.getTime()
})

// Budget calculations
const monthlyBudget = computed(() => {
  // Sum all category budgets for the month
  let total = 0
  categoryGroups.value.forEach(group => {
    (group.categories || []).forEach(category => {
      if (category.budgeted) {
        total += category.budgeted
      }
    })
  })
  return total
})

const weeklyBudget = computed(() => {
  // Divide monthly budget by number of weeks
  return monthlyBudget.value / totalWeeks.value
})

const weeklySpent = computed(() => {
  // Sum transactions for current week
  let spent = 0
  const startOfWeek = getStartOfWeek(currentDate.value)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  
  transactions.value.forEach(transaction => {
    const transactionDate = new Date(transaction.date)
    if (transactionDate >= startOfWeek && transactionDate <= endOfWeek && transaction.amount < 0) {
      spent += Math.abs(transaction.amount)
    }
  })
  
  return spent
})

const weeklyRemaining = computed(() => {
  return weeklyBudget.value - weeklySpent.value
})

// Category filtering and calculations
const filteredCategories = computed(() => {
  const allCategories: Category[] = []
  
  categoryGroups.value.forEach(group => {
    (group.categories || []).forEach(category => {
      // Exclude internal categories and credit card payments
      if (!category.hidden && !category.deleted && category.name !== 'Internal Master Category') {
        allCategories.push(category)
      }
    })
  })
  
  // Apply current filter
  switch (currentFilter.value) {
    case 'over-budget':
      return allCategories.filter(category => isOverBudget(category))
    case 'under-budget':
      return allCategories.filter(category => {
        const weeklyBudget = getWeeklyBudget(category)
        const weeklySpent = getWeeklySpent(category)
        return weeklySpent < weeklyBudget && weeklyBudget > 0
      })
    case 'essential':
      return allCategories.filter(category => 
        essentialCategories.some(name => category.name.toLowerCase().includes(name.toLowerCase()))
      )
    default:
      return allCategories
  }
})

const topSpendingCategory = computed(() => {
  if (filteredCategories.value.length === 0) return null
  
  return filteredCategories.value.reduce((top, current) => {
    const topSpent = getWeeklySpent(top)
    const currentSpent = getWeeklySpent(current)
    return currentSpent > topSpent ? current : top
  }, filteredCategories.value[0])
})

const overBudgetCategories = computed(() => {
  return filteredCategories.value.filter(category => isOverBudget(category))
})

const savingsOpportunity = computed(() => {
  // Calculate potential savings from discretionary categories
  let savings = 0
  
  filteredCategories.value.forEach(category => {
    // Skip essential categories
    const isEssential = essentialCategories.some(name => 
      category.name.toLowerCase().includes(name.toLowerCase())
    )
    
    if (!isEssential) {
      const weeklyBudget = getWeeklyBudget(category)
      const weeklySpent = getWeeklySpent(category)
      
      if (weeklySpent < weeklyBudget) {
        savings += (weeklyBudget - weeklySpent)
      }
    }
  })
  
  return savings
})

// Methods
function getWeekOfMonth(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const firstWeekday = firstDayOfMonth.getDay()
  const offsetDate = date.getDate() + firstWeekday - 1
  return Math.floor(offsetDate / 7) + 1
}

function getStartOfWeek(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  const diff = result.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
  result.setDate(diff)
  result.setHours(0, 0, 0, 0)
  return result
}

function previousWeek() {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() - 7)
  
  // Don't go to previous month
  if (newDate.getMonth() === currentDate.value.getMonth()) {
    currentDate.value = newDate
    weekOffset.value -= 1
  }
}

function nextWeek() {
  if (isCurrentWeek.value) return
  
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() + 7)
  
  // Don't go to next month
  if (newDate.getMonth() === currentDate.value.getMonth()) {
    currentDate.value = newDate
    weekOffset.value += 1
  }
}

function changeFilter(filter: string) {
  currentFilter.value = filter
}

function formatCurrency(amount: number): string {
  // YNAB stores amounts in milliunits
  const value = amount / 1000
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

function getWeeklyBudget(category: Category): number {
  // Calculate weekly budget for category
  return category.budgeted / totalWeeks.value
}

function getWeeklySpent(category: Category): number {
  // Calculate weekly spending for category
  let spent = 0
  const startOfWeek = getStartOfWeek(currentDate.value)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  
  transactions.value.forEach(transaction => {
    const transactionDate = new Date(transaction.date)
    if (
      transaction.category_id === category.id &&
      transactionDate >= startOfWeek && 
      transactionDate <= endOfWeek && 
      transaction.amount < 0
    ) {
      spent += Math.abs(transaction.amount)
    }
  })
  
  return spent
}

function getCategoryProgressPercentage(category: Category): number {
  const weekly = getWeeklyBudget(category)
  if (weekly === 0) return 0
  
  const spent = getWeeklySpent(category)
  return Math.min(100, (spent / weekly) * 100)
}

function isOverBudget(category: Category): boolean {
  return getWeeklySpent(category) > getWeeklyBudget(category)
}

function getCategoryColor(category: Category): string {
  // Generate a color based on category ID for visual distinction
  // In a real implementation, you might store these colors or calculate them differently
  const colorMap: Record<string, string> = {
    'Rent/Mortgage': '#FF5733',
    'Groceries': '#33FF57',
    'Dining Out': '#3357FF',
    'Utilities': '#F3FF33',
    'Transportation': '#FF33F3',
    'Healthcare': '#33FFF3',
    'Entertainment': '#8333FF',
    'Shopping': '#FF8333'
  }
  
  // Check if the category name contains any of the keys
  for (const [key, color] of Object.entries(colorMap)) {
    if (category.name.includes(key)) {
      return color
    }
  }
  
  // Fallback color generation based on category ID
  const hash = category.id.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  return `hsl(${Math.abs(hash) % 360}, 70%, 50%)`
}

function getCategoryTransactions(categoryId: string): TransactionDetail[] {
  const startOfWeek = getStartOfWeek(currentDate.value)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  
  return transactions.value.filter(transaction => {
    const transactionDate = new Date(transaction.date)
    return (
      transaction.category_id === categoryId &&
      transactionDate >= startOfWeek && 
      transactionDate <= endOfWeek
    )
  }).sort((a, b) => {
    // Sort by date, most recent first
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  }).slice(0, 3) // Show only 3 most recent transactions
}

function toggleTransactions(categoryId: string) {
  if (showTransactionsFor.value === categoryId) {
    showTransactionsFor.value = null
  } else {
    showTransactionsFor.value = categoryId
  }
}

function viewAllTransactions(category: Category) {
  // Navigate to transactions page filtered by category
  router.push({
    name: 'transactions',
    query: { 
      categoryId: category.id,
      categoryName: category.name
    }
  })
}

// Load data
async function loadData() {
  try {
    loading.value = true
    
    // Load categories
    categoryGroups.value = await ynabService.getCategories(budgetId)
    
    // Load transactions
    transactions.value = await ynabService.getTransactions(budgetId)
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load weekly budget data:', error)
    loading.value = false
  }
}

// Initialize component
onMounted(() => {
  // Set current date to start of current week
  currentDate.value = getStartOfWeek(new Date())
  loadData()
})

// Watch for budget ID changes (if navigating between budgets)
watch(() => route.params.budgetId, (newBudgetId) => {
  if (newBudgetId && newBudgetId !== budgetId) {
    loadData()
  }
})
</script>

<style scoped>
.weekly-view {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
}

/* Header Section */
.header-section {
  margin-bottom: 2rem;
}

.date-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.nav-button {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover:not(:disabled) {
  background: var(--primary);
  color: white;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.current-date {
  text-align: center;
}

.current-date h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text);
}

.date-range {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.progress-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.progress-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text);
}

.week-selection {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.spending-overview {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.budget-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.amount-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.amount {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
}

.amount.negative {
  color: #ef4444;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: var(--background);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill.over-budget {
  background: #ef4444;
}

.progress-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: right;
}

/* Categories Section */
.categories-section {
  margin-bottom: 2rem;
}

.categories-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: var(--text);
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.filter-tab {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: var(--background);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.filter-tab.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading-categories {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.category-item {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid var(--border);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category-name-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.category-name {
  font-weight: 500;
  color: var(--text);
}

.category-amounts {
  font-size: 0.875rem;
}

.spent {
  font-weight: 600;
  color: var(--text);
}

.spent.negative {
  color: #ef4444;
}

.allocated {
  color: var(--text-secondary);
}

.category-progress {
  margin-bottom: 1rem;
}

.transactions-preview {
  background: var(--background);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.transaction-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.transaction-name {
  color: var(--text);
}

.transaction-amount {
  font-weight: 500;
  color: var(--text);
}

.transaction-amount.negative {
  color: #ef4444;
}

.view-all-button {
  background: transparent;
  border: none;
  color: var(--primary);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  border-top: 1px solid var(--border);
  margin-top: 0.5rem;
}

.toggle-transactions {
  background: transparent;
  border: none;
  color: var(--primary);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  width: 100%;
  text-align: center;
}

.no-categories {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  background: var(--surface);
  border-radius: 12px;
  border: 1px solid var(--border);
}

/* Insights Section */
.insights-section {
  margin-bottom: 2rem;
}

.insights-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: var(--text);
}

.insight-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.insight-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid var(--border);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.insight-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.insight-icon.warning {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.insight-icon.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.insight-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: var(--text);
}

.insight-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .budget-summary {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .insight-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .progress-card {
    padding: 1rem;
  }
  
  .category-item {
    padding: 1rem;
  }
  
  .current-date h2 {
    font-size: 1.25rem;
  }
  
  .amount {
    font-size: 1rem;
  }
}