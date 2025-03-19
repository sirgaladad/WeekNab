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

export function getWeeklyBudget(budgetId: string, date?: Date): Promise<WeeklyBudget>
export function getTransactionsForDateRange(budgetId: string, startDate: Date, endDate: Date): Promise<TransactionDetail[]>
export function calculateWeeklyBudget(monthlyBudget: number, weeksInMonth: number): number
export function getWeeksInMonth(year: number, month: number): number
export function getWeekOfMonth(date: Date): number
export function getStartOfWeek(date: Date): Date
export function getEndOfWeek(date: Date): Date
export function getMonthWeeks(year: number, month: number): { startDate: Date; endDate: Date }[] 