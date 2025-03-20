import { ref } from 'vue'

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresIn: number
}

export class CacheService {
  private static instance: CacheService
  private cache: Map<string, CacheEntry<any>> = new Map()
  private readonly DEFAULT_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private constructor() {}

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService()
    }
    return CacheService.instance
  }

  set<T>(key: string, data: T, expiresIn: number = this.DEFAULT_CACHE_DURATION): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > entry.expiresIn
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Specific cache keys for YNAB data
  static getWeeklyBudgetKey(budgetId: string, date: Date): string {
    return `weekly-budget-${budgetId}-${date.toISOString().split('T')[0]}`
  }

  static getCategoriesKey(budgetId: string): string {
    return `categories-${budgetId}`
  }

  static getTransactionsKey(budgetId: string, startDate: Date, endDate: Date): string {
    return `transactions-${budgetId}-${startDate.toISOString().split('T')[0]}-${endDate.toISOString().split('T')[0]}`
  }
}

// Export singleton instance
export const cacheService = CacheService.getInstance() 