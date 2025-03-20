import type { CategoryGroup, Category, TransactionDetail } from 'ynab'

export interface ExtendedCategoryGroup extends CategoryGroup {
  categories: Category[]
}

export interface BudgetData {
  budget: {
    id: string
    name: string
    last_modified_on: string
  }
  categories: ExtendedCategoryGroup[]
  transactions: TransactionDetail[]
}

export interface CategoryInsights {
  averageSpending: number
  trend: 'up' | 'down'
  trendPercentage: number
}

export interface Transaction {
  id: number
  payee: string
  amount: number
  category: string
}

export interface CategoryData {
  id: string
  name: string
  budgeted: number
  spent: number
  remaining: number
  percentageSpent: number
}

export interface DateRange {
  start: Date | string
  end: Date | string
}

export interface RecentActivity {
  id: string
  date: Date | string
  amount: number
  payee: string
  category?: string
}

export interface DailySpending {
  label: string
  amount: number
  date: Date
  transactions: Transaction[]
}

export interface WeeklyBudgetData {
  totalBudget: number
  totalSpent: number
  remainingBudget: number
  categories: CategoryData[]
  dailySpending: DailySpending[]
}

export type WeeklyBudgetDataResponse = WeeklyBudgetData 