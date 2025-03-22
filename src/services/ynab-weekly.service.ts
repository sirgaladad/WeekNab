import { getYNABService } from './ynab.service'
import { isDemoMode } from '../demo-mode'
import type { TransactionDetail } from 'ynab'

export interface WeeklyBudget {
  weekNumber: number
  startDate: Date
  endDate: Date
  categories: WeeklyCategory[]
  totalBudget: number
  totalSpent: number
  totalRemaining: number
}

export interface WeeklyCategory {
  id: string
  name: string
  weeklyBudget: number
  spent: number
  remaining: number
  transactions: TransactionDetail[]
}

interface YNABCategory {
  id: string
  name: string
  budgeted: number
  hidden: boolean
  deleted: boolean
  category_id?: string
}

interface CategoryGroup {
  id: string
  name: string
  categories: YNABCategory[]
}

// Helper functions
export function getStartOfWeek(date: Date): Date {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const diff = newDate.getDate() - day
  newDate.setDate(diff)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

export function getEndOfWeek(date: Date): Date {
  const newDate = new Date(date)
  const day = newDate.getDay()
  const diff = newDate.getDate() + (6 - day)
  newDate.setDate(diff)
  newDate.setHours(23, 59, 59, 999)
  return newDate
}

// Get weekly data from YNAB API
export async function getWeeklyData(startDate: Date, endDate: Date) {
  if (isDemoMode) {
    console.warn('Demo mode active, using mock data in ynab-weekly.service')
    return {
      budget: {
        totalBudget: 1250,
        totalSpent: 875.5,
        totalRemaining: 374.5,
        percentSpent: 70
      },
      categories: []
    }
  }
  
  try {
    const ynabService = getYNABService()
    
    // Get active budget ID (using first budget for simplicity)
    const budgetsResponse = await ynabService.budgets.getBudgets()
    const budgetId = budgetsResponse.data.budgets[0].id
    
    // Format dates for YNAB API
    const sinceDate = startDate.toISOString().split('T')[0]
    const untilDate = endDate.toISOString().split('T')[0]
    
    // Fetch categories and transactions in parallel
    const [categoryGroups, transactions] = await Promise.all([
      ynabService.categories.getCategories(budgetId),
      ynabService.transactions.getTransactions(budgetId, undefined, {
        since_date: sinceDate
      })
    ])
    
    // Filter transactions by date (additional filtering on client side if needed)
    const filteredTransactions = transactions.data.transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate >= startDate && transactionDate <= endDate
    })
    
    // Calculate number of weeks in the month for budget allocation
    const weeksInMonth = 4.33 // Average
    
    // Process budget categories
    const processedCategories = processWeeklyCategories(
      categoryGroups.data.category_groups,
      filteredTransactions,
      weeksInMonth
    )
    
    // Calculate totals
    const totalBudget = processedCategories.reduce((sum, cat) => sum + cat.weeklyBudget, 0)
    const totalSpent = processedCategories.reduce((sum, cat) => sum + cat.spent, 0)
    
    return {
      budget: {
        totalBudget,
        totalSpent,
        totalRemaining: totalBudget - totalSpent,
        percentSpent: totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0
      },
      categories: processedCategories
    }
  } catch (error) {
    console.error('Error getting weekly data:', error)
    throw error
  }
}

/**
 * Process categories and calculate weekly budgets
 */
function processWeeklyCategories(
  categoryGroups: any[],
  transactions: TransactionDetail[],
  weeksInMonth: number
): WeeklyCategory[] {
  const weeklyCategories: WeeklyCategory[] = []
  
  categoryGroups.forEach(group => {
    const categories = group.categories || []
    categories.forEach((category: any) => {
      if (!category.hidden && !category.deleted) {
        const weeklyBudget = calculateWeeklyBudget(category.budgeted, weeksInMonth)
        const categoryTransactions = transactions.filter(
          t => t.category_id === category.id
        )
        const spent = categoryTransactions.reduce(
          (sum, t) => sum + Math.abs(t.amount),
          0
        ) / 1000 // YNAB amounts are in milliunits
        
        weeklyCategories.push({
          id: category.id,
          name: category.name,
          weeklyBudget: weeklyBudget / 1000, // YNAB amounts are in milliunits
          spent,
          remaining: (weeklyBudget / 1000) - spent,
          transactions: categoryTransactions
        })
      }
    })
  })
  
  return weeklyCategories
}

/**
 * Calculate weekly budget from monthly budget
 */
function calculateWeeklyBudget(monthlyBudget: number, weeksInMonth: number): number {
  return monthlyBudget / weeksInMonth
}

/**
 * Get transactions for a specific date range
 */
export async function getTransactionsForDateRange(
  budgetId: string,
  startDate: Date,
  endDate: Date
): Promise<TransactionDetail[]> {
  const api = getYNABService()
  
  // Format dates for YNAB API (YYYY-MM-DD)
  const since_date = startDate.toISOString().split('T')[0]
  
  // Get all transactions since the start date
  const response = await api.transactions.getTransactions(budgetId, since_date)
  
  // Filter transactions to only include those within our date range
  return response.data.transactions.filter((transaction: TransactionDetail) => {
    const transactionDate = new Date(transaction.date)
    return transactionDate >= startDate && transactionDate <= endDate
  })
}

/**
 * Get categories from YNAB
 */
async function getCategories(budgetId: string): Promise<CategoryGroup[]> {
  const api = getYNABService()
  const response = await api.categories.getCategories(budgetId)
  return response.data.category_groups
}

/**
 * Calculate the number of weeks in a month
 */
export function getWeeksInMonth(year: number, month: number): number {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const firstWeek = getWeekOfMonth(firstDay)
  const lastWeek = getWeekOfMonth(lastDay)
  
  return lastWeek - firstWeek + 1
}

/**
 * Get the week number (1-based) for a date
 */
export function getWeekOfMonth(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const firstMonday = getStartOfWeek(firstDayOfMonth)
  const diff = date.getTime() - firstMonday.getTime()
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1
}

/**
 * Get all weeks in a month
 */
export function getMonthWeeks(year: number, month: number): { startDate: Date; endDate: Date }[] {
  const weeks: { startDate: Date; endDate: Date }[] = []
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const currentDate = getStartOfWeek(firstDay)
  
  while (currentDate <= lastDay) {
    weeks.push({
      startDate: new Date(currentDate),
      endDate: getEndOfWeek(currentDate)
    })
    currentDate.setDate(currentDate.getDate() + 7)
  }
  
  return weeks
}

/**
 * Get category spending for a specific week
 */
export function getCategorySpendingForWeek(
  transactions: TransactionDetail[], 
  categoryId: string, 
  startDate: Date, 
  endDate: Date
): number {
  let spent = 0
  
  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.date)
    if (
      transaction.category_id === categoryId &&
      transactionDate >= startDate && 
      transactionDate <= endDate && 
      transaction.amount < 0
    ) {
      spent += Math.abs(transaction.amount)
    }
  })
  
  return spent
}

/**
 * Analyze spending patterns for categories
 */
export function analyzeSpendingPatterns(
  categories: CategoryGroup[], 
  transactions: TransactionDetail[], 
  startDate: Date, 
  endDate: Date,
  weeksInMonth: number
): {
  overBudgetCategories: string[],
  underBudgetCategories: string[],
  topSpendingCategories: Array<{id: string, name: string, spent: number}>
} {
  const overBudgetCategories: string[] = []
  const underBudgetCategories: string[] = []
  const categorySpending: Array<{id: string, name: string, spent: number}> = []
  
  // Process each category
  categories.forEach(group => {
    (group.categories || []).forEach(category => {
      if (!category.hidden && !category.deleted) {
        const weeklyBudget = calculateWeeklyBudget(category.budgeted, weeksInMonth)
        const spent = getCategorySpendingForWeek(transactions, category.id, startDate, endDate)
        
        categorySpending.push({
          id: category.id,
          name: category.name,
          spent
        })
        
        if (spent > weeklyBudget && weeklyBudget > 0) {
          overBudgetCategories.push(category.id)
        } else if (spent < weeklyBudget && weeklyBudget > 0) {
          underBudgetCategories.push(category.id)
        }
      }
    })
  })
  
  // Sort by spending amount (descending)
  const topSpendingCategories = categorySpending
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 5) // Top 5 categories
  
  return {
    overBudgetCategories,
    underBudgetCategories,
    topSpendingCategories
  }
}

/**
 * Get discretionary vs essential spending breakdown
 */
export function getSpendingBreakdown(
  categories: CategoryGroup[],
  transactions: TransactionDetail[],
  startDate: Date,
  endDate: Date,
  essentialCategories: string[] = [
    'Rent', 'Mortgage', 'Groceries', 'Utilities', 
    'Transport', 'Healthcare', 'Insurance'
  ]
): {
  essential: number,
  discretionary: number,
  savingsOpportunity: number
} {
  let essentialSpending = 0
  let discretionarySpending = 0
  let savingsOpportunity = 0
  
  categories.forEach(group => {
    (group.categories || []).forEach(category => {
      if (!category.hidden && !category.deleted) {
        const isEssential = essentialCategories.some(name => 
          category.name.toLowerCase().includes(name.toLowerCase())
        )
        
        const weeklyBudget = category.budgeted / 4 // Simple approximation
        const spent = getCategorySpendingForWeek(transactions, category.id, startDate, endDate)
        
        if (isEssential) {
          essentialSpending += spent
        } else {
          discretionarySpending += spent
          
          // Calculate savings opportunity
          if (spent < weeklyBudget && weeklyBudget > 0) {
            savingsOpportunity += (weeklyBudget - spent)
          }
        }
      }
    })
  })
  
  return {
    essential: essentialSpending,
    discretionary: discretionarySpending,
    savingsOpportunity
  }
}

/**
 * For backward compatibility with existing components
 * Get the weekly budget for a specific budget and date
 */
export async function getWeeklyBudget(budgetId: string, date: Date = new Date()): Promise<WeeklyBudget> {
  const startDate = getStartOfWeek(date)
  const endDate = getEndOfWeek(date)
  
  try {
    const data = await getWeeklyData(startDate, endDate)
    
    return {
      weekNumber: getWeekNumber(date),
      startDate,
      endDate,
      categories: data.categories,
      totalBudget: data.budget.totalBudget,
      totalSpent: data.budget.totalSpent,
      totalRemaining: data.budget.totalRemaining
    }
  } catch (error) {
    console.error('Error in getWeeklyBudget:', error)
    throw error
  }
}

/**
 * Get the week number for a date
 */
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}