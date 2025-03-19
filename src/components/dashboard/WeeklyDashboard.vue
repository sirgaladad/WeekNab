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
          <div class="budget-value" :class="remainingAmountClass">
            ${{ formatCurrency(budgetData?.budget.remaining || 0) }}
          </div>
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress" 
            :class="{ 'over-budget': (budgetData?.budget.percentageSpent || 0) > 100 }"
            :style="{ width: `${Math.min(budgetData?.budget.percentageSpent || 0, 100)}%` }"
          >
            <span class="progress-spent">
              ${{ formatCurrency(budgetData?.budget.spent || 0) }} spent
            </span>
          </div>
          <span class="progress-remaining" v-if="(budgetData?.budget.percentageSpent || 0) < 85">
            ${{ formatCurrency(budgetData?.budget.remaining || 0) }} remaining
          </span>
        </div>
        <div class="progress-label">
          {{ budgetData?.budget.percentageSpent || 0 }}% of weekly budget
        </div>
      </div>
    </div>

    <div class="category-section">
      <div class="section-header">
        <div class="header-content">
          <h2>Budget Category</h2>
          <span class="category-stats">
            {{ categoryStats.overBudget }} over budget of {{ categoryStats.total }} categories
          </span>
        </div>
        <button 
          v-if="hasMoreCategories" 
          class="show-more-button"
          @click="toggleShowMore"
        >
          {{ showAllCategories ? 'Show Less' : `Show More (${sortedCategories.length - MAX_VISIBLE_CATEGORIES})` }}
        </button>
      </div>
      
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
          v-for="category in displayedCategories" 
          :key="category.id" 
          class="category-card"
          :class="{ 'over-budget': category.isOverBudget }"
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
                background: `linear-gradient(90deg, ${category.color} 0%, ${category.isOverBudget ? '#ff8066' : '#6bcb77'} 100%)`
              }"
            />
          </div>

          <div class="category-details">
            <span class="remaining-amount" :class="{ 'over-budget': category.isOverBudget }">
              {{ category.isOverBudget ? 'Over by' : 'Remaining' }}: 
              ${{ formatCurrency(Math.abs(category.remaining)) }}
            </span>
            <span class="percentage">
              {{ Math.round(category.percentageSpent) }}%
            </span>
          </div>

          <div v-if="category.transactions.length > 0" class="transactions-preview">
            <div 
              v-for="transaction in expandedCategories.has(category.id) 
                ? category.transactions 
                : category.transactions.slice(0, 2)"
              :key="transaction.id"
              class="transaction-item"
            >
              <span class="transaction-payee">{{ transaction.payee }}</span>
              <span class="transaction-amount">-${{ formatCurrency(Math.abs(transaction.amount)) }}</span>
            </div>
            <button 
              v-if="category.transactions.length > 2"
              class="show-transactions"
              @click="toggleTransactions(category.id)"
            >
              View all transactions
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="insights-section">
      <h2>Weekly Insights</h2>
      
      <div v-if="loading && loadingStates.insights" class="loading-block" />
      <template v-else>
        <div class="insights-overview">
          <div class="insight-card overview-card">
            <div class="insight-icon">📊</div>
            <h3>Weekly Overview</h3>
            <p>{{ budgetData?.insights.weeklyOverview.message }}</p>
            <div class="insight-stats">
              <div class="stat">
                <span class="label">Days Left</span>
                <span class="value">{{ budgetData?.insights.daysLeft }}</span>
              </div>
              <div class="stat">
                <span class="label">Daily Budget Left</span>
                <span class="value">${{ formatCurrency((budgetData?.insights.weeklyOverview.remainingAmount || 0) / (budgetData?.insights.daysLeft || 1)) }}</span>
              </div>
            </div>
            <div class="daily-spending">
              <div class="daily-label">Average Daily Spending</div>
              <div class="daily-amount">${{ formatCurrency((budgetData?.budget.spent || 0) / ((7 - (budgetData?.insights.daysLeft || 0)))) }}</div>
            </div>
          </div>

          <div class="insight-card goal-card">
            <div class="insight-icon">🎯</div>
            <h3>Goal Impact</h3>
            <p>{{ budgetData?.insights.goalImpact.message }}</p>
            
            <div class="goal-stats">
              <div class="goal-amount-wrapper">
                <div 
                  class="goal-amount" 
                  :class="{
                    'positive': budgetData?.insights.goalImpact.amount > 0,
                    'negative': budgetData?.insights.goalImpact.amount < 0
                  }"
                >
                  ${{ formatCurrency(Math.abs(budgetData?.insights.goalImpact.amount || 0)) }}
                </div>
                <span class="goal-label">
                  {{ budgetData?.insights.goalImpact.amount > 0 ? 'Potential Savings' : 'Over Budget' }}
                </span>
              </div>

              <div class="goal-metrics">
                <div class="goal-metric">
                  <div class="metric-value">
                    {{ budgetData?.insights.daysLeft }}
                  </div>
                  <div class="metric-label">Days Left</div>
                </div>
                <div class="goal-metric">
                  <div class="metric-value">
                    ${{ formatCurrency((budgetData?.insights.goalImpact.amount || 0) / (budgetData?.insights.daysLeft || 1)) }}
                  </div>
                  <div class="metric-label">Daily Impact</div>
                </div>
              </div>

              <div class="goal-projection">
                <div class="projection-header">
                  <span class="projection-title">Monthly Projection</span>
                  <span 
                    class="projection-trend"
                    :class="{ 'negative': (budgetData?.insights.goalImpact.amount || 0) < 0 }"
                  >
                    {{ (budgetData?.insights.goalImpact.amount || 0) > 0 ? '↗' : '↘' }}
                    {{ Math.abs(((budgetData?.insights.goalImpact.amount || 0) / (budgetData?.budget.total || 1)) * 100).toFixed(1) }}%
                  </span>
                </div>
                <div 
                  class="projection-amount"
                  :class="{ 'negative': (budgetData?.insights.goalImpact.amount || 0) < 0 }"
                >
                  ${{ formatCurrency(Math.abs((budgetData?.insights.goalImpact.amount || 0) * 4)) }}
                </div>
                <div class="projection-subtitle">
                  Projected {{ (budgetData?.insights.goalImpact.amount || 0) > 0 ? 'savings' : 'overspending' }} at current rate
                </div>
              </div>
            </div>
          </div>

          <div class="insight-card categories-card">
            <div class="insight-icon">📈</div>
            <h3>Category Insights</h3>
            <div class="category-insights">
              <div class="insights-summary">
                <div class="summary-stat">
                  <span class="stat-value">{{ categoryStats.overBudget }}</span>
                  <span class="stat-label">Over Budget</span>
                </div>
                <div class="summary-stat">
                  <span class="stat-value">{{ categoryStats.total - categoryStats.overBudget }}</span>
                  <span class="stat-label">Under Budget</span>
                </div>
                <div class="summary-stat">
                  <span class="stat-value">{{ Math.round((categoryStats.overBudget / categoryStats.total) * 100) }}%</span>
                  <span class="stat-label">Need Attention</span>
                </div>
              </div>
              <div 
                v-for="insight in budgetData?.insights.categoryInsights"
                :key="insight.name"
                class="category-insight"
              >
                <div class="category-header">
                  <span class="name">{{ insight.name }}</span>
                  <span class="amount" :class="{ 'over-budget': insight.remaining < 0 }">
                    ${{ formatCurrency(Math.abs(insight.remaining)) }}
                    {{ insight.remaining < 0 ? 'over' : 'under' }}
                  </span>
                </div>
                <div v-if="insight.powerGoal" class="power-goal">
                  <span class="goal-name">
                    <span class="goal-icon">💰</span>
                    {{ insight.powerGoal.name }}
                  </span>
                  <span class="goal-impact">+${{ formatCurrency(insight.powerGoal.amount) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DemoDataService from '../../services/demo-data.service'
import type { WeeklyBudgetData, CategoryData, CategoryInsight, Transaction } from '../../services/demo-data.service'

const router = useRouter()
const loading = ref(true)
const error = ref<string | null>(null)
const budgetData = ref<WeeklyBudgetData | null>(null)
const showAllCategories = ref(false)
const MAX_VISIBLE_CATEGORIES = 5
const activeFilter = ref<'all' | 'over-budget' | 'under-budget'>('all')

// Loading states for different sections
const loadingStates = ref({
  overview: true,
  categories: true,
  insights: true
})

const expandedCategories = ref<Set<string>>(new Set())

const formatDateRange = computed(() => {
  if (!budgetData.value) return ''
  const { start, end } = budgetData.value.dateRange
  return `${formatDate(start)} - ${formatDate(end)}`
})

const sortedCategories = computed(() => {
  if (!budgetData.value?.categories) return []
  return [...filteredCategories.value].sort((a, b) => {
    // Sort by over budget first, then by amount spent
    if (a.isOverBudget && !b.isOverBudget) return -1
    if (!a.isOverBudget && b.isOverBudget) return 1
    return b.spent - a.spent
  })
})

const displayedCategories = computed(() => {
  return showAllCategories.value 
    ? sortedCategories.value 
    : sortedCategories.value.slice(0, MAX_VISIBLE_CATEGORIES)
})

const hasMoreCategories = computed(() => {
  return sortedCategories.value.length > MAX_VISIBLE_CATEGORIES
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
  
  const categories = budgetData.value.categories
  switch (activeFilter.value) {
    case 'over-budget':
      return categories.filter(c => c.isOverBudget)
    case 'under-budget':
      return categories.filter(c => !c.isOverBudget)
    default:
      return categories
  }
})

const remainingAmountClass = computed(() => {
  if (!budgetData.value) return ''
  return {
    'over-budget': budgetData.value.budget.remaining < 0,
    'positive': budgetData.value.budget.remaining > 0
  }
})

const categoryStats = computed(() => {
  if (!budgetData.value?.categories) return { total: 0, overBudget: 0 }
  const categories = budgetData.value.categories
  return {
    total: categories.length,
    overBudget: categories.filter(c => c.isOverBudget).length
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

function toggleTransactions(categoryId: string) {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId)
  } else {
    expandedCategories.value.add(categoryId)
  }
}

onMounted(loadBudgetData)
</script>

<style scoped>
:root {
  --primary: #4d96ff;
  --primary-hover: #3a7fd9;
  --error: #ff4d4d;
  --success: #6BCB77;
  --surface: #2a2f3e;
  --surface-hover: #343b4f;
  --surface-dark: #1a1f2e;
  --border: rgba(255, 255, 255, 0.1);
  --text-primary: #ffffff;
  --text-secondary: #8b93a7;
}

.weekly-dashboard {
  padding: 1rem;
  background: var(--surface-dark);
  min-height: 100vh;
  color: var(--text-primary);
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
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.budget-value {
  font-size: 1.25rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.budget-value.over-budget {
  color: #ff4d4d;
  font-weight: 700;
}

/* Add specific styling for remaining amount when positive */
.budget-item:last-child .budget-value:not(.over-budget) {
  color: #6BCB77;
  font-weight: 700;
  font-size: 1.35rem;
}

.progress-container {
  margin-top: 1.5rem;
}

.progress-bar {
  height: 32px;
  background: rgba(26, 31, 46, 0.5);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  position: relative;
  border: 1px solid var(--border);
}

.progress {
  height: 100%;
  transition: width 0.6s ease, background-color 0.6s ease;
  background: linear-gradient(90deg, var(--primary) 0%, #6bcb77 100%);
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-width: 100px;
}

.progress.over-budget {
  background: linear-gradient(90deg, #ff4d4d 0%, #ff8066 100%);
}

.progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-spent {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

.progress-remaining {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 1;
  white-space: nowrap;
}

.progress-label {
  text-align: right;
  color: #8b93a7;
  font-size: 0.85rem;
}

.category-section {
  margin-top: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.category-stats {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.show-more-button {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: var(--primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.show-more-button:hover {
  background: var(--surface-hover);
  border-color: var(--primary);
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
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.category-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.category-card.over-budget {
  border-color: var(--error);
}

.category-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0;
  font-size: 0.9rem;
}

.remaining-amount {
  color: var(--success);
  font-weight: 600;
}

.remaining-amount.over-budget {
  color: var(--error);
}

.percentage {
  color: var(--text-secondary);
  font-weight: 500;
}

.transactions-preview {
  margin-top: 1rem;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 8px;
  background: rgba(26, 31, 46, 0.3);
  padding: 0.5rem;
}

.transactions-preview::-webkit-scrollbar {
  width: 4px;
}

.transactions-preview::-webkit-scrollbar-track {
  background: rgba(26, 31, 46, 0.5);
  border-radius: 2px;
}

.transactions-preview::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 2px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.transaction-item:hover {
  background: rgba(26, 31, 46, 0.8);
}

.transaction-payee {
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
}

.transaction-amount {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
}

.show-transactions {
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  margin-top: 0.5rem;
  background: var(--surface-dark);
  border: none;
  border-radius: 8px;
  color: var(--primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-transactions:hover {
  background: var(--surface);
  color: var(--primary-hover);
}

.insights-section {
  margin-top: 3rem;
  padding-top: 1.5rem;
}

.insights-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.insights-overview {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
}

.insight-card {
  background: #2a2f3e;
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.insight-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4d96ff, #6bcb77);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.insight-card:hover::before {
  opacity: 1;
}

.insight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.insight-icon {
  position: absolute;
  top: -20px;
  left: 2rem;
  background: #1a1f2e;
  padding: 0.75rem;
  border-radius: 50%;
  font-size: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.insight-card:hover .insight-icon {
  transform: scale(1.1);
}

.insight-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.75rem 0 1.25rem;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.insight-card p {
  color: #8b93a7;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

.insight-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background: rgba(26, 31, 46, 0.5);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat .label {
  color: #8b93a7;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.stat .value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.03em;
}

.goal-amount-wrapper {
  position: relative;
  padding: 2rem;
  background: rgba(26, 31, 46, 0.7);
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.goal-amount-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(77, 150, 255, 0.1) 0%, rgba(107, 203, 119, 0.1) 100%);
  opacity: 0.5;
}

.goal-amount {
  position: relative;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4d96ff 0%, #6bcb77 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  padding: 0;
  line-height: 1.2;
}

.goal-amount.positive {
  background: linear-gradient(135deg, #6bcb77 0%, #4d96ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.goal-amount.negative {
  background: linear-gradient(135deg, #ff4d4d 0%, #ff8066 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.goal-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
}

.goal-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.goal-metric {
  background: rgba(26, 31, 46, 0.5);
  padding: 1.25rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.2s ease;
}

.goal-metric:hover {
  transform: translateY(-2px);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.metric-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.goal-projection {
  background: rgba(26, 31, 46, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.projection-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.projection-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}

.projection-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #6bcb77;
}

.projection-trend.negative {
  color: #ff4d4d;
}

.projection-amount {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4d96ff 0%, #6bcb77 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
}

.projection-amount.negative {
  background: linear-gradient(135deg, #ff4d4d 0%, #ff8066 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projection-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.category-insights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.category-insights::-webkit-scrollbar {
  width: 4px;
}

.category-insights::-webkit-scrollbar-track {
  background: rgba(26, 31, 46, 0.5);
  border-radius: 2px;
}

.category-insights::-webkit-scrollbar-thumb {
  background: #4d96ff;
  border-radius: 2px;
}

.category-insight {
  padding: 1.5rem;
  background: rgba(26, 31, 46, 0.5);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.category-insight:hover {
  transform: translateX(4px);
  background: rgba(26, 31, 46, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.category-insight .amount {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.power-goal {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--surface-dark);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goal-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.goal-impact {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.02em;
}

.loading-block {
  height: 200px;
  background: #2a2f3e;
  border-radius: 12px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}

@media (min-width: 768px) {
  .insights-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .insight-card.overview-card {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .insights-overview {
    grid-template-columns: repeat(3, 1fr);
  }

  .insight-card.overview-card {
    grid-column: auto;
  }
}

.insights-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--surface-dark);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.summary-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.25rem 1rem;
  background: var(--surface);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.03em;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}

.daily-spending {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--surface-dark);
  border-radius: 12px;
  text-align: center;
}

.daily-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.daily-amount {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
}

.goal-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.goal-projection {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: var(--surface-dark);
  border-radius: 12px;
  text-align: center;
}

.projection-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.projection-amount {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.03em;
}

/* Update category progress bars to match */
.category-card .progress-bar {
  height: 24px;
  background: rgba(26, 31, 46, 0.5);
  border-radius: 12px;
  overflow: hidden;
  margin: 0.75rem 0;
  position: relative;
}

.category-card .progress {
  height: 100%;
  transition: width 0.6s ease, background-color 0.6s ease;
  min-width: 60px;
}
</style> 