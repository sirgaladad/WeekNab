<template>
  <div class="weekly-dashboard">
    <DashboardHeader :status="props.isDemoMode ? 'Demo' : 'Connected'" />

    <div v-if="isLoading && !weeklyData" class="loading-container">
      <p>Loading your budget data...</p>
      <!-- You could add a spinner here -->
        </div>
        
    <div v-else-if="showPlaceholder" class="placeholder-container">
      <h2>Unable to load budget data</h2>
      <p>Please try again later or check your connection.</p>
      <button @click="loadData" class="reload-btn">Retry</button>
    </div>

    <div v-else-if="weeklyData" class="dashboard-content">
      <h1 class="weekly-budget-title">Weekly Budget</h1>
      
      <WeekNavigation 
        :date-range-text="formattedDateRange" 
        :days-remaining="weeklyData.insights.daysLeft"
        :is-current-week="true"
        @previous-week="handlePreviousWeek"
        @next-week="handleNextWeek"
      />

      <BudgetSummary 
        :total-budget="weeklyData.budget.total"
        :total-spent="weeklyData.budget.spent"
        :remaining-budget="weeklyData.budget.remaining"
      />

      <CategorySection :categories="convertCategories(weeklyData.categories)" />

      <div class="weekly-insights">
        <DailySpendingChart :daily-spending="convertDailySpending(dailySpendingData)" />
        
        <SavingsGoalCard 
          :goal-amount="500"
          :current-saved="350"
          :weekly-contribution="weeklyData.insights.goalImpact.amount"
        />

        <InsightsContainer />
            </div>
          </div>

    <DashboardFooter 
      v-if="props.isDemoMode"
      :show-toast="true"
      toast-message="Want to try WeekNab with your own budget? Connect with your YNAB account now!"
      @exit="$router.push('/')"
      @try-now="$router.push('/login')"
      @close-toast="() => {}"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useYNABWeeklyService } from '@/composables/useYNABWeekly'
import { getCurrentWeekDemoData, getPreviousWeekDemoData, getNextWeekDemoData } from '@/services/demo-supabase.service'
import DashboardHeader from './sections/DashboardHeader.vue'
import WeekNavigation from './sections/WeekNavigation.vue'
import BudgetSummary from './sections/BudgetSummary.vue'
import CategorySection from './sections/CategorySection.vue'
import DailySpendingChart from './sections/DailySpendingChart.vue'
import SavingsGoalCard from './sections/SavingsGoalCard.vue'
import DashboardFooter from './sections/DashboardFooter.vue'
import InsightsContainer from '@/components/insights/InsightsContainer.vue'
import type { WeeklyBudgetData, CategoryData } from '@/services/demo-data.service'
import type { DateRange, DailySpending, Transaction } from '@/types'
import { useYNABStore } from '@/stores/ynab'
import { useAuthStore } from '@/stores/auth'

const { 
  getWeeklyBudgetData, 
  navigateToPreviousWeek, 
  navigateToNextWeek, 
  isLoading, 
  currentDateRange
} = useYNABWeeklyService()

const props = defineProps<{
  isDemoMode: boolean
}>()

const ynabStore = useYNABStore()
const authStore = useAuthStore()

const weeklyData = ref<WeeklyBudgetData | null>(null)
const dailySpendingData = ref<DailySpending[]>([])
const showPlaceholder = ref(false)
const error = ref<string | null>(null)

const isDataLoaded = computed(() => !!weeklyData.value && !isLoading.value)

const loadData = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    if (props.isDemoMode) {
      console.log('Loading demo data from Supabase for WeeklyDashboard')
      weeklyData.value = await getCurrentWeekDemoData()
  } else {
      console.log('Loading real YNAB data for WeeklyDashboard')
      weeklyData.value = await ynabStore.getCurrentWeekData()
    }
    
    if (weeklyData.value) {
      generateDailySpendingData()
    }
  } catch (e) {
    console.error('Error loading weekly data:', e)
    error.value = 'Failed to load budget data. Please try again.'
    showPlaceholder.value = true
  } finally {
    isLoading.value = false
  }
}

// Format date range for display
const formattedDateRange = computed(() => {
  if (!weeklyData.value) return ''
  const start = weeklyData.value.dateRange.start
  const end = weeklyData.value.dateRange.end
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
})

// Generate daily spending data for visualization
function generateDailySpendingData() {
  if (!weeklyData.value) return
  
  const startDate = weeklyData.value.dateRange.start
  const endDate = weeklyData.value.dateRange.end
  
  // Create array of all dates in the week
  const dates: Date[] = []
  const currentDate = new Date(startDate)
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  // Map all transactions to their dates
  const allTransactions = weeklyData.value.categories.flatMap(cat => 
    cat.transactions.map(trans => ({
      ...trans,
      category: cat.name,
      color: cat.color
    }))
  )
  
  // Create daily spending entries
  dailySpendingData.value = dates.map(date => {
    const dayTransactions = allTransactions.filter(t => 
      t.date.toDateString() === date.toDateString()
    )
    
    return {
      date,
      total: dayTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0),
      transactions: dayTransactions
    }
  })
}

// Convert data to match expected types for components
function convertDailySpending(data: DailySpending[]): any[] {
  return data.map(day => ({
    label: day.date.toLocaleString('en-US', { weekday: 'short' }),
    amount: day.total,
    date: day.date,
    transactions: day.transactions
  }))
}

function convertCategories(categories: CategoryData[]): any[] {
  return categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    color: cat.color,
    budgeted: cat.budgeted,
    spent: cat.spent,
    remaining: cat.remaining,
    percentageSpent: cat.percentageSpent,
    isOverBudget: cat.isOverBudget,
    transactions: cat.transactions.map(t => ({
      ...t,
      date: t.date.toISOString().split('T')[0] // Convert to string format expected by component
    }))
  }))
}

// Navigation handlers (work in both modes)
async function handlePreviousWeek() {
  try {
    isLoading.value = true
    if (props.isDemoMode) {
      weeklyData.value = await getPreviousWeekDemoData(weeklyData.value?.dateRange.start || new Date())
    } else {
      navigateToPreviousWeek()
    }
    if (weeklyData.value) {
      generateDailySpendingData()
    }
  } catch (error) {
    console.error('Error navigating to previous week:', error)
  } finally {
    isLoading.value = false
  }
}

async function handleNextWeek() {
  try {
    isLoading.value = true
    if (props.isDemoMode) {
      weeklyData.value = await getNextWeekDemoData(weeklyData.value?.dateRange.start || new Date())
    } else {
      navigateToNextWeek()
    }
    if (weeklyData.value) {
      generateDailySpendingData()
    }
  } catch (error) {
    console.error('Error navigating to next week:', error)
  } finally {
    isLoading.value = false
  }
}

// Watch for date range changes in authenticated mode
watch(currentDateRange, () => {
  if (!props.isDemoMode) {
    loadData()
  }
})

// Initial loading
onMounted(() => {
  console.log('WeeklyDashboard mounted in', props.isDemoMode ? 'demo mode' : 'authenticated mode')
  loadData()
})

// Computed properties for UI display
const spendingProgress = computed(() => {
  if (!weeklyData.value) return 0
  return (weeklyData.value.budget.spent / weeklyData.value.budget.total) * 100
})

const overBudgetCategories = computed(() => {
  if (!weeklyData.value) return []
  return weeklyData.value.categories.filter(cat => cat.isOverBudget)
})
</script>

<style scoped>
.weekly-dashboard {
  min-height: 100vh;
  background: var(--background);
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  flex: 1;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.weekly-budget-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.weekly-insights {
  margin-bottom: 2rem;
}

.placeholder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
  color: var(--text-primary);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
  color: var(--text-primary);
}

.placeholder-container h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.placeholder-container p {
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

.reload-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reload-btn:hover {
  background-color: var(--primary-dark);
}

@media (min-width: 1024px) {
  .dashboard-content {
    padding: 2rem;
  }

  .weekly-insights {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
  }
  
  .weekly-insights > *:first-child {
    grid-column: 1;
    grid-row: 1 / span 2;
  }
  
  .weekly-insights > *:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }
}

@media (max-width: 767px) {
  .dashboard-content {
    padding: 1rem;
  }
  
  .weekly-budget-title {
    font-size: 1.75rem;
  margin-bottom: 0.75rem;
}

  .placeholder-container h2 {
    font-size: 1.25rem;
  }
}
</style> 