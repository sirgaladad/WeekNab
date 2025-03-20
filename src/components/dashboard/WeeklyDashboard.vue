<template>
  <div class="weekly-dashboard">
    <div class="dashboard-header">
      <router-link to="/budget" class="back-link">
        ← Back to Budget
      </router-link>
      <div class="sync-badge">
        <span class="sync-dot"></span>
        Demo
      </div>
    </div>

    <div class="budget-overview">
      <h1>Weekly Budget</h1>
      
      <div class="week-navigation">
        <button @click="loadPreviousWeek" class="nav-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="week-info">
          <h2>{{ formatDateRange }}</h2>
          <span class="days-left">{{ weeklyData.daysLeft }} days left</span>
        </div>
        <button @click="loadNextWeek" class="nav-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="budget-status">
        <div class="status-message" :class="{ negative: remainingBudget < 0 }">
          {{ remainingBudget >= 0 ? "You're doing okay" : "You're over budget" }}
        </div>
      </div>

      <div class="budget-amount">
        <div class="amount-wrapper">
          <span class="currency">$</span>
          <span class="amount" :class="{ negative: remainingBudget < 0 }">
            {{ Math.abs(remainingBudget).toFixed(2) }}
          </span>
        </div>
        <div class="amount-label">remaining this week</div>
      </div>

      <div class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress" 
            :style="{ width: spentPercentage + '%' }"
            :class="{ 'over-budget': spentPercentage > 100 }"
          ></div>
        </div>
        <div class="progress-labels">
          <div class="progress-label">
            <span class="label">Assigned</span>
            <span class="value">${{ totalBudget.toFixed(2) }}</span>
          </div>
          <div class="progress-label">
            <span class="label">Spent</span>
            <span class="value">${{ totalSpent.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="categories-section">
      <div class="section-header">
        <h2>Budget Categories</h2>
        <div class="category-filters">
          <button 
            class="filter-button"
            :class="{ active: activeFilter === 'all' }"
            @click="activeFilter = 'all'"
          >
            All
          </button>
          <button 
            class="filter-button"
            :class="{ active: activeFilter === 'over-budget' }"
            @click="activeFilter = 'over-budget'"
          >
            Over Budget
          </button>
          <button 
            class="filter-button"
            :class="{ active: activeFilter === 'under-budget' }"
            @click="activeFilter = 'under-budget'"
          >
            Under Budget
          </button>
        </div>
      </div>

      <div class="categories-grid">
        <div v-for="category in displayedCategories" :key="category.id" class="category-card">
          <div class="category-header">
            <h3>{{ category.name }}</h3>
            <span class="amount" :class="{ negative: category.remaining < 0 }">
              ${{ Math.abs(category.remaining).toFixed(2) }} left
            </span>
          </div>
          
          <div class="category-progress">
            <div class="progress-bar">
              <div 
                class="progress" 
                :style="{ width: `${Math.min((category.spent / category.budgeted) * 100, 100)}%` }"
                :class="{ 'over-budget': category.spent > category.budgeted }"
              ></div>
            </div>
            <div class="category-info">
              Spent: ${{ category.spent.toFixed(2) }} of ${{ category.budgeted.toFixed(2) }}
            </div>
          </div>
          
          <div v-if="category.transactions && category.transactions.length" class="category-transactions">
            <div v-for="tx in category.transactions.slice(0, 3)" :key="tx.id" class="transaction-item">
              <span class="transaction-payee">{{ tx.payee }}</span>
              <span class="transaction-amount">${{ tx.amount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="hasMoreCategories" class="show-more-container">
        <button @click="toggleShowAllCategories" class="show-more-button">
          <span>Show {{ filteredCategories.length - 5 }} More Categories</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div v-if="showAllCategories" class="show-more-container">
        <button @click="toggleShowAllCategories" class="show-more-button">
          <span>Show Less</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="spending-chart">
      <h3>Daily Spending</h3>
      <div class="chart-wrapper">
        <!-- Maximum threshold indicator -->
        <div class="threshold-line">
          <div class="threshold-label">${{ spendingThreshold }} threshold</div>
        </div>
        
        <div class="chart-container">
          <div 
            v-for="(day, index) in dailySpending" 
            :key="index" 
            class="chart-column"
          >
            <!-- Amount label directly above each bar -->
            <div class="day-amount" :class="{ 'over-threshold': day.amount > spendingThreshold }">
              ${{ Math.round(day.amount) }}
            </div>
            
            <!-- Bar with height proportional to the amount -->
            <div class="bar-container">
              <div 
                class="bar" 
                :style="{ height: calculateBarHeight(day.amount) }"
                :class="{ 'over-threshold': day.amount > spendingThreshold }"
              ></div>
            </div>
            
            <!-- Day label below the bar -->
            <div class="day-label">{{ day.label }}</div>
          </div>
        </div>
      </div>
      
      <div class="chart-footer">
        <div class="average">
          <span class="label">Average daily spend:</span>
          <span class="value">${{ averageSpending.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <div class="goal-progress">
      <h3>Monthly Savings Goal</h3>
      <div class="goal-content">
        <div class="goal-info">
          <div class="goal-amount">
            <span class="label">Goal:</span>
            <span class="value">${{ monthlyGoal.toFixed(2) }}</span>
          </div>
          <div class="goal-contribution">
            <span class="label">This week:</span>
            <span class="value positive">+${{ weeklyContribution.toFixed(2) }}</span>
          </div>
        </div>
        <div class="progress-container">
          <div class="progress-bar">
            <div 
              class="progress" 
              :style="{ width: `${goalProgress}%` }"
            ></div>
          </div>
          <div class="progress-label">{{ goalProgress }}% complete</div>
        </div>
      </div>
    </div>

    <div class="insights-section">
      <InsightsContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { WeeklyBudgetData, CategoryData, DailySpending } from '@/types/budget'
import { DemoDataService } from '@/services/DemoDataService'
import InsightsContainer from '@/components/insights/InsightsContainer.vue'

const weeklyData = ref<WeeklyBudgetData>({
  totalBudget: 0,
  totalSpent: 0,
  remainingBudget: 0,
  categories: [],
  dailySpending: [],
  dateRange: {
    start: new Date(),
    end: new Date()
  },
  daysLeft: 0
})

const rawDailySpending = ref<DailySpending[]>([])
const totalBudget = ref(0)
const totalSpent = ref(0)
const remainingBudget = ref(0)

const categories = computed(() => weeklyData.value.categories)
const dailySpending = computed(() => rawDailySpending.value.length > 0 ? rawDailySpending.value : weeklyData.value.dailySpending)

onMounted(() => {
  loadWeekData();
})

const spentPercentage = computed(() => (totalSpent.value / totalBudget.value) * 100)
const averageSpending = computed(() => {
  if (!dailySpending.value || dailySpending.value.length === 0) return 0
  const total = dailySpending.value.reduce((sum, day) => sum + day.amount, 0)
  return total / dailySpending.value.length
})

const formatDateRange = computed(() => {
  if (!weeklyData.value?.dateRange) return ''
  const { start, end } = weeklyData.value.dateRange
  return `${formatDate(start)} - ${formatDate(end)}`
})

function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

// We keep these functions for potential future use when connected to a real API
const loadPreviousWeek = async () => {
  // In a real app, this would call an API to get previous week data
  console.log('Loading previous week')
}

const loadNextWeek = async () => {
  // In a real app, this would call an API to get next week data
  console.log('Loading next week')
}

const activeFilter = ref<'all' | 'over-budget' | 'under-budget'>('all')
const showAllCategories = ref(false)

const filteredCategories = computed(() => {
  if (!categories.value) return []
  return categories.value.filter(category => {
    if (activeFilter.value === 'all') return true
    return activeFilter.value === 'over-budget' 
      ? category.spent > category.budgeted 
      : category.spent <= category.budgeted
  })
})

const displayedCategories = computed(() => {
  const filtered = filteredCategories.value
  if (showAllCategories.value || filtered.length <= 5) {
    return filtered
  }
  return filtered.slice(0, 5)
})

const hasMoreCategories = computed(() => {
  return filteredCategories.value.length > 5 && !showAllCategories.value
})

function toggleShowAllCategories() {
  showAllCategories.value = !showAllCategories.value
}

const calculateBarHeight = (amount: number) => {
  const maxHeight = 500; // Maximum value ($500)
  return `${(amount / maxHeight) * 100}%`;
}

const isOverAverage = (amount: number) => {
  return amount > averageSpending.value
}

// Monthly goal values
const monthlyGoal = ref(500)
const weeklyContribution = ref(125)
const goalProgress = ref(65)

const spendingThreshold = ref(400); // Make this configurable instead of hardcoded

// This function could be updated to calculate a suggested threshold
const calculateSuggestedThreshold = (spending: DailySpending[]) => {
  if (!spending || spending.length === 0) return 400; // Default value
  
  // Calculate based on historical spending patterns
  // For example: 150% of average spending
  const average = spending.reduce((sum, day) => sum + day.amount, 0) / spending.length;
  return Math.round(average * 1.5);
};

// This could be called when data is loaded to update the threshold
const updateSpendingThreshold = () => {
  // During onboarding or with limited data, we could suggest a value
  // Later, this could be user-configured or calculated from historical data
  if (dailySpending.value && dailySpending.value.length > 0) {
    const suggestedThreshold = calculateSuggestedThreshold(dailySpending.value);
    // Only auto-update if user hasn't manually set a value
    // This is a placeholder for actual implementation logic
    if (!userHasSetThreshold.value) {
      spendingThreshold.value = suggestedThreshold;
    }
  }
};

// Placeholder for a user preference
const userHasSetThreshold = ref(false);

const loadWeekData = async () => {
  try {
    const data = await DemoDataService.getWeeklyData();
    weeklyData.value = data;
    rawDailySpending.value = data.dailySpending;
    totalBudget.value = data.totalBudget;
    totalSpent.value = data.totalSpent;
    remainingBudget.value = data.remainingBudget;
    
    // Update threshold based on the loaded data
    updateSpendingThreshold();
  } catch (error) {
    console.error('Error loading weekly data:', error);
  }
};

defineExpose({
  weeklyData,
  totalBudget,
  totalSpent,
  remainingBudget,
  spentPercentage,
  dailySpending,
  averageSpending,
  categories,
  activeFilter,
  filteredCategories,
  displayedCategories,
  hasMoreCategories,
  showAllCategories,
  toggleShowAllCategories,
  calculateBarHeight,
  isOverAverage,
  loadPreviousWeek,
  loadNextWeek
})
</script>

<style scoped>
.weekly-dashboard {
  padding: 1.5rem;
  color: #E1E7EF;
  background-color: #1A1D23;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94A3B8;
  text-decoration: none;
  font-size: 0.875rem;
}

.sync-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  color: #3B82F6;
  font-size: 0.75rem;
  font-weight: 500;
}

.sync-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3B82F6;
}

.budget-overview {
  background: #242731;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.budget-overview h1 {
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  font-weight: 600;
}

.week-navigation {
  background: #1A1D23;
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.week-info {
  text-align: center;
  flex-grow: 1;
}

.week-info h2 {
  font-size: 1.5rem;
  color: #FFFFFF;
  margin: 0;
  font-weight: 500;
}

.days-left {
  font-size: 1rem;
  color: #94A3B8;
  display: block;
  margin-top: 0.25rem;
}

.nav-button {
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.1);
  border: none;
  color: #E1E7EF;
  cursor: pointer;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.nav-button:hover {
  background: rgba(59, 130, 246, 0.2);
}

.budget-status {
  text-align: center;
  margin-bottom: 1.5rem;
}

.status-message {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 500;
}

.status-message.negative {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.budget-amount {
  text-align: center;
  margin-bottom: 2rem;
}

.amount-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.currency {
  font-size: 2rem;
  font-weight: 500;
  color: #ffffff;
  margin-right: 0.25rem;
}

.amount {
  font-size: 3.75rem; /* 60px for main budget amount */
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

/* Specific style for category amounts */
.category-header .amount {
  font-size: 2.1875rem; /* 35px max for category amounts */
  font-weight: 600;
}

.amount.negative {
  color: #EF4444;
}

.amount-label {
  color: #94A3B8;
  font-size: 1.125rem;
  margin-top: 0.5rem;
}

.progress-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.progress-bar {
  height: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.progress {
  height: 100%;
  background: #3B82F6;
  transition: width 0.3s ease;
}

.progress.over-budget {
  background: #EF4444;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.progress-label {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.progress-label .label {
  color: #94A3B8;
  font-size: 0.875rem;
  font-weight: 500;
}

.progress-label .value {
  color: #FFFFFF;
  font-size: 1.25rem;
  font-weight: 600;
}

.categories-section {
  margin-top: 2rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.25rem;
  color: #FFFFFF;
  margin-bottom: 0.75rem;
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: #94A3B8;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  border-color: #3B82F6;
  color: #3B82F6;
}

.filter-button.active {
  background: #3B82F6;
  border-color: #3B82F6;
  color: #FFFFFF;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-card {
  background: #242731;
  border-radius: 0.875rem;
  padding: 1.25rem;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #FFFFFF;
}

.category-amount {
  font-size: 0.875rem;
}

.category-amount .spent {
  font-weight: 600;
  color: #FFFFFF;
}

.category-amount .budgeted {
  color: #94A3B8;
}

.category-progress {
  margin-bottom: 1rem;
}

.category-info {
  font-size: 0.875rem;
  color: #94A3B8;
  margin-top: 0.5rem;
}

.spending-chart {
  background: #242731;
  border-radius: 0.875rem;
  padding: 1.75rem;
  margin: 1.5rem 0;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.spending-chart h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
}

.chart-wrapper {
  position: relative;
  height: 250px;
  margin-bottom: 1rem;
}

/* Maximum threshold indicator */
.threshold-line {
  position: absolute;
  top: 20%; /* Position 20% from top (since $400 is 80% of $500) */
  left: 0;
  right: 0;
  height: 2px;
  background-color: rgba(239, 68, 68, 0.3); /* Semi-transparent red */
  z-index: 1;
}

.threshold-label {
  position: absolute;
  right: 0;
  top: -22px;
  color: #EF4444;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: rgba(26, 29, 35, 0.8); /* Semi-transparent background */
  padding: 2px 6px;
  border-radius: 4px;
}

/* Styling for bars exceeding threshold */
.bar.over-threshold {
  position: relative;
  background: linear-gradient(to top, #3B82F6 80%, #EF4444 80%); /* Blue with red top for over threshold */
}

/* Remove the existing after pseudo-element since we're using gradient */
.bar.over-threshold::after {
  display: none;
}

/* Amount label for values over threshold */
.day-amount.over-threshold {
  background-color: rgba(239, 68, 68, 0.6); /* Red background */
  color: white;
  font-weight: 700;
}

.chart-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  padding-top: 30px; /* Space for amount labels */
  padding-bottom: 30px; /* Space for day labels */
}

.chart-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
}

.day-amount {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  padding: 3px 6px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 2;
  white-space: nowrap; /* Prevent line breaks */
}

.bar-container {
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 36px;
  background: #3B82F6; /* Solid blue */
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.day-label {
  font-size: 0.875rem;
  color: #94A3B8;
  font-weight: 500;
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  white-space: nowrap; /* Prevent line breaks */
}

.chart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  margin-top: 1.5rem;
}

.average .label {
  color: #94A3B8;
  font-size: 0.875rem;
  font-weight: 500;
}

.average .value {
  color: white;
  font-size: 1rem;
  font-weight: 600;
}

.goal-progress {
  background: #242731;
  border-radius: 0.875rem;
  padding: 1.25rem;
  margin: 1.5rem 0;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.goal-progress h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
}

.goal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.goal-info {
  display: flex;
  justify-content: space-between;
}

.goal-amount,
.goal-contribution {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.goal-amount .label,
.goal-contribution .label {
  font-size: 0.75rem;
  color: #94A3B8;
}

.goal-amount .value,
.goal-contribution .value {
  font-size: 1.125rem;
  font-weight: 600;
}

.goal-contribution .value.positive {
  color: #3B82F6;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #94A3B8;
  text-align: right;
}

.insights-section {
  margin-top: 2rem;
}

.daily-spend-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 8px;
  margin-top: 1rem;
  height: 150px;
  align-items: flex-end;
}

.daily-spend-bar {
  position: relative;
  background-color: #2E303A;
  border-radius: 4px;
  width: 100%;
  height: 8px;
  transition: height 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.daily-spend-bar-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #4CAF50;
  border-radius: 4px;
  min-height: 8px;
  transition: height 0.3s ease;
}

.daily-spend-day {
  text-align: center;
  color: #B4B7C3;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.daily-spend-amount {
  text-align: center;
  color: #fff;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

/* Make the bar fill scale correctly based on the amount */
.daily-amount-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.daily-spend-bar {
  height: 100%;
}

.show-more-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.show-more-button {
  background: #242731;
  border: none;
  color: #94A3B8;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.show-more-button:hover {
  background: #2E303A;
  color: #FFFFFF;
}

.category-transactions {
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.75rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.875rem;
}

.transaction-payee {
  color: #E1E7EF;
  font-weight: 500;
}

.transaction-amount {
  color: #94A3B8;
}

@media (max-width: 768px) {
  .weekly-dashboard {
    padding: 1rem;
  }

  .budget-overview {
    padding: 1.25rem;
  }

  .budget-overview h1 {
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
  }

  .week-navigation {
    padding: 1rem;
    margin-bottom: 1.25rem;
  }

  .nav-button {
    width: 36px;
    height: 36px;
  }

  .week-info h2 {
    font-size: 1.25rem;
  }

  .days-left {
    font-size: 0.875rem;
  }

  .currency {
    font-size: 1.75rem;
  }

  .amount {
    font-size: 3rem; /* Main budget amount on mobile */
  }

  .category-header .amount {
    font-size: 1.625rem; /* Category amounts on mobile */
  }

  .progress-label .value {
    font-size: 1rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .chart-wrapper {
    height: 200px;
    overflow-x: auto;
  }
  
  .chart-container {
    min-width: 500px; /* Ensure minimum width for scrolling */
  }
  
  .bar {
    width: 28px;
  }
  
  .day-amount {
    font-size: 0.75rem;
    padding: 2px 4px;
  }
  
  .day-label {
    font-size: 0.75rem;
  }

  .goal-progress {
    padding: 1rem;
  }

  .goal-progress h3 {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  .goal-amount .value,
  .goal-contribution .value {
    font-size: 1rem;
  }
  
  .show-more-button {
    font-size: 0.8125rem;
    padding: 0.625rem 1.25rem;
  }
}
</style> 