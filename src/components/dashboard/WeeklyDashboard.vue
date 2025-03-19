<template>
  <div class="weekly-dashboard">
    <router-link to="/budget" class="back-link">
      ← Back to Budget
    </router-link>

    <div class="dashboard-header">
      <h1>Weekly Dashboard</h1>
      
      <div class="week-navigation">
        <button class="nav-button" @click="previousWeek">
          ←
        </button>
        <div class="week-info">
          <div class="week-title">Week {{ budgetData?.weekNumber || '...' }}</div>
          <div class="date-range">{{ formatDateRange }}</div>
        </div>
        <button class="nav-button" @click="nextWeek">
          →
        </button>
      </div>
    </div>

    <div class="budget-overview">
      <div class="budget-title">
        <h2>Weekly Budget</h2>
        <span>Week {{ budgetData?.weekNumber }} of 4</span>
      </div>

      <div class="budget-numbers">
        <div class="budget-item">
          <div class="budget-label">Budget</div>
          <div class="budget-value">${{ formatCurrency(budgetData?.budget.total || 0) }}</div>
        </div>
        <div class="budget-item">
          <div class="budget-label">Spent</div>
          <div class="budget-value">${{ formatCurrency(budgetData?.budget.spent || 0) }}</div>
        </div>
        <div class="budget-item">
          <div class="budget-label">Remaining</div>
          <div class="budget-value" :class="{
            'over-budget': (budgetData?.budget.remaining || 0) < 0
          }">${{ formatCurrency(budgetData?.budget.remaining || 0) }}</div>
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress" 
            :class="{ 'over-budget': (budgetData?.budget.percentageSpent || 0) > 100 }"
            :style="{ width: `${Math.min(budgetData?.budget.percentageSpent || 0, 100)}%` }"
          />
        </div>
        <div class="progress-label">
          {{ budgetData?.budget.percentageSpent || 0 }}% of weekly budget
        </div>
      </div>
    </div>

    <div class="category-section">
      <h2>Category Spending</h2>
      
      <div class="category-filters">
        <button 
          v-for="filter in ['All', 'Over Budget', 'Under Budget']" 
          :key="filter"
          class="filter-button"
          :class="{ active: activeFilter === filter.toLowerCase().replace(' ', '-') }"
          @click="activeFilter = filter.toLowerCase().replace(' ', '-')"
        >
          {{ filter }}
        </button>
      </div>

      <div class="categories-list">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id" 
          class="category-card"
        >
          <div class="category-header">
            <div class="category-info">
              <div 
                class="category-dot"
                :style="{ background: category.color }"
              />
              <span class="category-name">{{ category.name }}</span>
            </div>
            <div class="category-amount" :class="{ 'over-budget': category.isOverBudget }">
              ${{ formatCurrency(category.spent) }} / ${{ formatCurrency(category.budgeted) }}
            </div>
          </div>

          <div class="progress-bar">
            <div 
              class="progress"
              :class="{ 'over-budget': category.percentageSpent > 100 }"
              :style="{ 
                width: `${Math.min(category.percentageSpent, 100)}%`,
                background: category.color
              }"
            />
          </div>

          <div v-if="category.transactions.length > 0" class="transactions-preview">
            <div 
              v-for="transaction in category.transactions.slice(0, 2)"
              :key="transaction.id"
              class="transaction-item"
            >
              <span class="transaction-payee">{{ transaction.payee }}</span>
              <span class="transaction-amount" :class="{ 'negative': transaction.amount < 0 }">
                -${{ formatCurrency(Math.abs(transaction.amount)) }}
              </span>
            </div>
            <button 
              v-if="category.transactions.length > 2"
              class="show-transactions"
              @click="viewCategoryTransactions(category.id)"
            >
              View all transactions
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="insights-section">
      <h2>Weekly Insights ↓</h2>
      <div class="insights-content">
        {{ budgetData?.insights.weeklyOverview.message }}
      </div>
      <div class="goal-impact">
        {{ budgetData?.insights.goalImpact.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Demo data interfaces and service
interface WeeklyBudgetData {
  weekNumber: number
  dateRange: {
    start: Date
    end: Date
  }
  budget: {
    total: number
    spent: number
    remaining: number
    percentageSpent: number
  }
  categories: CategoryData[]
  insights: {
    daysLeft: number
    weeklyOverview: {
      message: string
      remainingAmount: number
    }
    categoryInsights: CategoryInsight[]
    recentActivity: Transaction[]
    goalImpact: {
      message: string
      goalType: string
      amount: number
    }
  }
}

interface CategoryData {
  id: string
  name: string
  color: string
  budgeted: number
  spent: number
  remaining: number
  percentageSpent: number
  isOverBudget: boolean
  transactions: Transaction[]
}

interface CategoryInsight {
  name: string
  spent: number
  budgeted: number
  remaining: number
  powerGoal: {
    name: string
    amount: number
  }
}

interface Transaction {
  id: string
  date: Date
  payee: string
  amount: number
  category?: string
}

const DemoDataService = {
  getCurrentWeekData(): WeeklyBudgetData {
    const today = new Date()
    
    return {
      weekNumber: 3,
      dateRange: {
        start: new Date(2024, 5, 15), // June 15
        end: new Date(2024, 5, 21),   // June 21
      },
      budget: {
        total: 1250.00,
        spent: 875.50,
        remaining: 374.50,
        percentageSpent: 70
      },
      categories: [
        {
          id: '1',
          name: 'Groceries',
          color: '#FF6B6B',
          budgeted: 150,
          spent: 125,
          remaining: 25,
          percentageSpent: 83.33,
          isOverBudget: false,
          transactions: []
        },
        {
          id: '2',
          name: 'Dining Out',
          color: '#4D96FF',
          budgeted: 80,
          spent: 95,
          remaining: -15,
          percentageSpent: 118.75,
          isOverBudget: true,
          transactions: []
        },
        {
          id: '3',
          name: 'Entertainment',
          color: '#6BCB77',
          budgeted: 75,
          spent: 45,
          remaining: 30,
          percentageSpent: 60,
          isOverBudget: false,
          transactions: [
            {
              id: 't1',
              date: new Date(2024, 5, 18),
              payee: 'Netflix Subscription',
              amount: -15.99
            },
            {
              id: 't2',
              date: new Date(2024, 5, 19),
              payee: 'Movie Tickets',
              amount: -28.50
            }
          ]
        }
      ],
      insights: {
        daysLeft: 4,
        weeklyOverview: {
          message: "You're on track with your budget!",
          remainingAmount: 115
        },
        categoryInsights: [
          {
            name: 'Dining Out',
            spent: 65,
            budgeted: 100,
            remaining: 35,
            powerGoal: {
              name: 'European Vacation Fund',
              amount: 45
            }
          }
        ],
        recentActivity: [
          {
            id: 'ra1',
            date: new Date(2024, 5, 19),
            payee: 'Starbucks',
            amount: -5.75
          }
        ],
        goalImpact: {
          message: "Stay on budget this week and you'll be $45 closer to your European Vacation!",
          goalType: 'vacation',
          amount: 45
        }
      }
    }
  },

  getPreviousWeekData(): WeeklyBudgetData {
    return this.getCurrentWeekData() // For demo purposes, return same data
  },

  getNextWeekData(): WeeklyBudgetData {
    return this.getCurrentWeekData() // For demo purposes, return same data
  }
}

const router = useRouter()
const loading = ref(true)
const error = ref<string | null>(null)
const budgetData = ref<WeeklyBudgetData | null>(null)
const showAllCategories = ref(false)
const MAX_VISIBLE_CATEGORIES = 8
const activeFilter = ref<'all' | 'over-budget' | 'under-budget'>('all')

// Loading states for different sections
const loadingStates = ref({
  overview: true,
  categories: true,
  insights: true
})

const formatDateRange = computed(() => {
  if (!budgetData.value) return ''
  const { start, end } = budgetData.value.dateRange
  return `${formatDate(start)} - ${formatDate(end)}`
})

const displayedCategories = computed(() => {
  if (!budgetData.value?.categories) return []
  return showAllCategories.value 
    ? budgetData.value.categories 
    : budgetData.value.categories.slice(0, MAX_VISIBLE_CATEGORIES)
})

const hasMoreCategories = computed(() => {
  return budgetData.value?.categories.length > MAX_VISIBLE_CATEGORIES
})

const totalSpent = computed(() => {
  if (!budgetData.value) return 0
  return budgetData.value.categories.reduce((sum, category) => sum + category.spent, 0)
})

const remaining = computed(() => {
  if (!budgetData.value) return 0
  return budgetData.value.budget.total - totalSpent.value
})

const recentTransactions = computed(() => {
  if (!budgetData.value) return []
  return budgetData.value.insights.recentActivity
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)
})

const filteredCategories = computed(() => {
  if (!budgetData.value?.categories) return []
  
  switch (activeFilter.value) {
    case 'over-budget':
      return budgetData.value.categories.filter(c => c.isOverBudget)
    case 'under-budget':
      return budgetData.value.categories.filter(c => !c.isOverBudget)
    default:
      return budgetData.value.categories
  }
})

function formatCurrency(amount: number): string {
  return amount.toFixed(2)
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date).replace(',', '')
}

function getCategorySpent(categoryId: string): number {
  if (!budgetData.value) return 0
  const category = budgetData.value.categories.find(c => c.id === categoryId)
  return category?.spent || 0
}

function getCategoryRemaining(categoryId: string): number {
  if (!budgetData.value) return 0
  const category = budgetData.value.categories.find(c => c.id === categoryId)
  return category ? category.remaining : 0
}

function getCategoryProgress(categoryId: string): number {
  if (!budgetData.value) return 0
  const category = budgetData.value.categories.find(c => c.id === categoryId)
  if (!category) return 0
  return (Math.abs(category.spent) / category.budgeted) * 100
}

async function loadBudgetData() {
  try {
    // Simulate loading states
    Object.keys(loadingStates.value).forEach(key => {
      loadingStates.value[key as keyof typeof loadingStates.value] = true
    })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    budgetData.value = DemoDataService.getCurrentWeekData()
    error.value = null
  } catch (err) {
    error.value = 'Failed to load budget data. Please try again.'
    console.error('Budget data error:', err)
  } finally {
    // Simulate staggered loading completion
    setTimeout(() => { loadingStates.value.overview = false }, 500)
    setTimeout(() => { loadingStates.value.categories = false }, 1000)
    setTimeout(() => { loadingStates.value.insights = false }, 1500)
    loading.value = false
  }
}

function previousWeek() {
  loading.value = true
  budgetData.value = DemoDataService.getPreviousWeekData()
  loading.value = false
}

function nextWeek() {
  loading.value = true
  budgetData.value = DemoDataService.getNextWeekData()
  loading.value = false
}

function toggleShowMore() {
  showAllCategories.value = !showAllCategories.value
}

function viewCategoryTransactions(categoryId: string) {
  router.push(`/dashboard/transactions?category=${categoryId}`)
}

onMounted(loadBudgetData)
</script>

<style scoped>
.weekly-dashboard {
  padding: 1rem;
  background: #1a1f2e;
  min-height: 100vh;
  color: #ffffff;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #8b93a7;
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.dashboard-header h1 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.week-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
}

.nav-button {
  background: #2a2f3e;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.2rem;
}

.week-info {
  text-align: center;
}

.week-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.date-range {
  color: #8b93a7;
  font-size: 0.9rem;
}

.budget-overview {
  background: #2a2f3e;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.budget-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.budget-title h2 {
  font-size: 1.1rem;
  font-weight: 600;
}

.budget-title span {
  color: #8b93a7;
  font-size: 0.9rem;
}

.budget-numbers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.budget-item {
  text-align: left;
}

.budget-label {
  color: #8b93a7;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.budget-value {
  font-size: 1.1rem;
  font-weight: 500;
}

.progress-bar {
  height: 6px;
  background: #1a1f2e;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress {
  height: 100%;
  background: #4d96ff;
  transition: width 0.3s ease;
}

.progress.over-budget {
  background: #ff4d4d;
}

.progress-label {
  text-align: right;
  color: #8b93a7;
  font-size: 0.85rem;
}

.category-section {
  margin-top: 2rem;
}

.category-section h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.category-filters {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.filter-button {
  background: #2a2f3e;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
}

.filter-button.active {
  background: #4d96ff;
  color: #ffffff;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid var(--border);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.category-name {
  font-weight: 500;
}

.category-amount {
  font-weight: 600;
}

.category-amount.over-budget {
  color: var(--error);
}

.transactions-preview {
  margin-top: 1rem;
  border-top: 1px solid var(--border);
  padding-top: 0.75rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.875rem;
}

.transaction-payee {
  color: var(--text-secondary);
}

.show-transactions {
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  margin-top: 0.5rem;
  background: var(--surface-hover);
  border: none;
  border-radius: 8px;
  color: var(--primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.show-transactions:hover {
  background: var(--surface-dark);
}

.insights-section {
  margin-top: 2rem;
}

.insights-content {
  margin-bottom: 1rem;
}

.goal-impact {
  color: var(--text-secondary);
}

.loading-skeleton {
  background: linear-gradient(
    90deg,
    var(--surface) 25%,
    var(--surface-hover) 50%,
    var(--surface) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.loading-text {
  height: 1em;
  width: 100%;
}

.loading-block {
  height: 100px;
  width: 100%;
}

@media (min-width: 768px) {
  .weekly-dashboard {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style> 