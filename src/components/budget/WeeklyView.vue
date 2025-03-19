<template>
  <div class="weekly-view">
    <!-- Week Navigation -->
    <div class="week-navigation">
      <button @click="previousWeek" class="nav-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="week-info">
        <h2>Week {{ weekNumber }}</h2>
        <p>{{ formattedDateRange }}</p>
      </div>
      <button @click="nextWeek" class="nav-button">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Budget Overview -->
    <div class="budget-overview">
      <div class="budget-card">
        <h3>Weekly Budget</h3>
        <div class="amount">{{ formatCurrency(weeklyBudget.totalBudget) }}</div>
      </div>
      <div class="budget-card">
        <h3>Spent</h3>
        <div class="amount">{{ formatCurrency(weeklyBudget.totalSpent) }}</div>
      </div>
      <div class="budget-card">
        <h3>Remaining</h3>
        <div class="amount">{{ formatCurrency(weeklyBudget.totalRemaining) }}</div>
      </div>
      <div class="progress-bar">
        <div 
          class="progress" 
          :style="{ width: percentageToWidth(weeklyBudget.totalSpent / weeklyBudget.totalBudget) }"
          :class="{ 'over-budget': weeklyBudget.totalSpent > weeklyBudget.totalBudget }"
        ></div>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="category-filters">
      <button 
        v-for="filter in filters" 
        :key="filter.id"
        :class="{ active: currentFilter === filter.id }"
        @click="currentFilter = filter.id"
      >
        {{ filter.name }}
      </button>
    </div>

    <!-- Categories List -->
    <div class="categories-list">
      <div 
        v-for="category in filteredCategories" 
        :key="category.id" 
        class="category-item"
      >
        <div class="category-header" @click="toggleCategory(category.id)">
          <div class="category-name">{{ category.name }}</div>
          <div class="category-amounts">
            <span>{{ formatCurrency(category.spent) }} / {{ formatCurrency(category.weeklyBudget) }}</span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress" 
              :style="{ width: percentageToWidth(category.spent / category.weeklyBudget) }"
              :class="{ 'over-budget': category.spent > category.weeklyBudget }"
            ></div>
          </div>
        </div>
        
        <!-- Transactions List -->
        <div v-if="expandedCategories.includes(category.id)" class="transactions-list">
          <div 
            v-for="transaction in category.transactions" 
            :key="transaction.id" 
            class="transaction-item"
          >
            <div class="transaction-date">
              {{ formatDate(new Date(transaction.date)) }}
            </div>
            <div class="transaction-payee">{{ transaction.payee_name }}</div>
            <div class="transaction-amount">{{ formatCurrency(transaction.amount) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Insights Button -->
    <button @click="showInsights" class="insights-button">
      <i class="fas fa-chart-line"></i>
      Weekly Insights
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getWeeklyBudget, type WeeklyBudget, type WeeklyCategory } from '@/services/ynab-weekly.service'
import type { TransactionDetail } from 'ynab'

const route = useRoute()
const currentDate = ref(new Date())
const weeklyBudget = ref<WeeklyBudget>({
  weekNumber: 0,
  startDate: new Date(),
  endDate: new Date(),
  categories: [],
  totalBudget: 0,
  totalSpent: 0,
  totalRemaining: 0
})
const expandedCategories = ref<string[]>([])
const currentFilter = ref('all')

const filters = [
  { id: 'all', name: 'All Categories' },
  { id: 'over', name: 'Over Budget' },
  { id: 'under', name: 'Under Budget' }
]

// Computed Properties
const weekNumber = computed(() => weeklyBudget.value.weekNumber)

const formattedDateRange = computed(() => {
  return formatDateRange(weeklyBudget.value.startDate, weeklyBudget.value.endDate)
})

const filteredCategories = computed(() => {
  const categories = weeklyBudget.value.categories
  switch (currentFilter.value) {
    case 'over':
      return categories.filter((cat: WeeklyCategory) => cat.spent > cat.weeklyBudget)
    case 'under':
      return categories.filter((cat: WeeklyCategory) => cat.spent <= cat.weeklyBudget)
    default:
      return categories
  }
})

// Methods
async function loadWeeklyBudget() {
  try {
    const budgetId = route.params.budgetId as string
    weeklyBudget.value = await getWeeklyBudget(budgetId, currentDate.value)
  } catch (error) {
    console.error('Error loading weekly budget:', error)
  }
}

function previousWeek() {
  currentDate.value = new Date(currentDate.value.getTime() - 7 * 24 * 60 * 60 * 1000)
  loadWeeklyBudget()
}

function nextWeek() {
  currentDate.value = new Date(currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000)
  loadWeeklyBudget()
}

function toggleCategory(categoryId: string) {
  const index = expandedCategories.value.indexOf(categoryId)
  if (index === -1) {
    expandedCategories.value.push(categoryId)
  } else {
    expandedCategories.value.splice(index, 1)
  }
}

function showInsights() {
  // TODO: Implement insights modal
  console.log('Show insights for current week')
}

// Utility Functions
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount / 1000) // YNAB uses milliunits
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date)
}

function formatDateRange(start: Date, end: Date): string {
  return `${formatDate(start)} - ${formatDate(end)}`
}

function percentageToWidth(ratio: number): string {
  const percentage = Math.min(Math.round(ratio * 100), 100)
  return `${percentage}%`
}

// Lifecycle
onMounted(() => {
  loadWeeklyBudget()
})
</script>

<style scoped>
.weekly-view {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.week-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.nav-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
  padding: 0.5rem;
}

.week-info {
  text-align: center;
}

.week-info h2 {
  margin: 0;
  font-size: 1.5rem;
}

.week-info p {
  margin: 0.5rem 0 0;
  color: var(--text-secondary);
}

.budget-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.budget-card {
  background: var(--surface-color);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.budget-card h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--text-secondary);
}

.budget-card .amount {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: var(--surface-color);
  border-radius: 4px;
  overflow: hidden;
  grid-column: 1 / -1;
}

.progress {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.progress.over-budget {
  background: var(--error-color);
}

.category-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-filters button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: var(--surface-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.category-filters button.active {
  background: var(--primary-color);
  color: white;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-item {
  background: var(--surface-color);
  border-radius: 8px;
  overflow: hidden;
}

.category-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.category-name {
  font-weight: 500;
}

.category-amounts {
  text-align: right;
  color: var(--text-secondary);
}

.transactions-list {
  border-top: 1px solid var(--border-color);
  padding: 1rem;
}

.transaction-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 0.5rem;
}

.transaction-date {
  color: var(--text-secondary);
}

.transaction-amount {
  font-weight: 500;
}

.insights-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
}

.insights-button i {
  font-size: 1.2rem;
}
</style> 