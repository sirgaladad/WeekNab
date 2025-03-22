import { ref, computed } from 'vue'
import { getWeeklyData, getStartOfWeek, getEndOfWeek } from '@/services/ynab-weekly.service'
import type { WeeklyBudgetData } from '@/services/demo-data.service'
import { isDemoMode } from '@/demo-mode'
import DemoDataService from '@/services/demo-data.service'

export interface DateRange {
  start: Date
  end: Date
}

/**
 * Composable for handling weekly budget data from YNAB
 */
export function useYNABWeeklyService() {
  // State
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const currentWeek = ref(new Date())
  
  // Computed
  const currentDateRange = computed(() => {
    const start = getStartOfWeek(currentWeek.value)
    const end = getEndOfWeek(currentWeek.value)
    return { start, end }
  })
  
  /**
   * Get the weekly budget data for the current week
   */
  async function getWeeklyBudgetData(): Promise<WeeklyBudgetData> {
    if (isDemoMode) {
      console.warn('Using demo data in useYNABWeeklyService')
      return DemoDataService.getCurrentWeekData()
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const dateRange = currentDateRange.value
      
      // Get data from YNAB service
      const data = await getWeeklyData(dateRange.start, dateRange.end)
      
      // Transform YNAB data to our WeeklyBudgetData format
      return {
        weekNumber: getWeekNumber(dateRange.start),
        dateRange: {
          start: dateRange.start,
          end: dateRange.end
        },
        budget: {
          total: data.budget?.totalBudget || 0,
          spent: data.budget?.totalSpent || 0,
          remaining: data.budget?.totalRemaining || 0,
          percentageSpent: data.budget?.percentSpent || 0
        },
        categories: data.categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          color: getColorForCategory(cat.name),
          budgeted: cat.weeklyBudget,
          spent: cat.spent,
          remaining: cat.remaining,
          percentageSpent: cat.spent ? 
            Math.round((cat.spent / cat.weeklyBudget) * 100) : 0,
          isOverBudget: cat.spent > cat.weeklyBudget,
          transactions: cat.transactions.map(t => ({
            id: t.id,
            date: new Date(t.date),
            payee: t.payee_name || 'Unknown',
            amount: t.amount / 1000, // YNAB amounts are in milliunits
            category: cat.name
          }))
        })),
        insights: generateInsights(data)
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      console.error('Error getting weekly budget data:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Navigate to the previous week
   */
  function navigateToPreviousWeek() {
    const prevWeek = new Date(currentWeek.value)
    prevWeek.setDate(prevWeek.getDate() - 7)
    currentWeek.value = prevWeek
  }
  
  /**
   * Navigate to the next week
   */
  function navigateToNextWeek() {
    const nextWeek = new Date(currentWeek.value)
    nextWeek.setDate(nextWeek.getDate() + 7)
    currentWeek.value = nextWeek
  }
  
  /**
   * Get the week number for a date
   */
  function getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }
  
  /**
   * Get a color for a category
   */
  function getColorForCategory(categoryName: string): string {
    // Map category names to colors (simplified)
    const colorMap: Record<string, string> = {
      'Groceries': '#4CAF50',
      'Dining Out': '#FF5722',
      'Entertainment': '#2196F3',
      'Transportation': '#9C27B0',
      'Shopping': '#FF9800',
      'Health & Fitness': '#3F51B5',
      'Utilities': '#607D8B',
      'Personal Care': '#FFC107',
      'Education': '#673AB7',
      'Hobbies': '#E91E63'
    }
    
    return colorMap[categoryName] || `#${Math.floor(Math.random()*16777215).toString(16)}`
  }
  
  /**
   * Generate insights from weekly data
   */
  function generateInsights(data: any): any {
    // This is a placeholder - implement actual insights generation
    const daysLeft = Math.round((currentDateRange.value.end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    
    return {
      daysLeft: Math.max(0, daysLeft),
      weeklyOverview: {
        message: `You're ${data.budget?.percentSpent || 0}% through your weekly budget with ${daysLeft} days remaining.`,
        remainingAmount: data.budget?.totalRemaining || 0
      },
      categoryInsights: [],
      recentActivity: [],
      goalImpact: {
        message: "Keep up the good work!",
        goalType: "savings",
        amount: data.budget?.totalRemaining || 0
      }
    }
  }
  
  return {
    isLoading,
    error,
    currentWeek,
    currentDateRange,
    getWeeklyBudgetData,
    navigateToPreviousWeek,
    navigateToNextWeek
  }
} 