import { supabase } from './supabase'
import { encryptData, decryptData } from './encryption'

interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
}

interface YNABResponse<T> {
  data: T
  error?: {
    id: string
    name: string
    detail: string
  }
}

interface Budget {
  id: string
  name: string
  total_budgeted: number
  categories: Category[]
}

interface Category {
  id: string
  name: string
  budgeted: number
}

interface Transaction {
  id: string
  date: string
  amount: number
  payee_name: string
  category_id: string
  category_name: string
}

class YNABClient {
  private static instance: YNABClient
  private baseUrl = 'https://api.ynab.com/v1'
  private rateLimitInfo: RateLimitInfo | null = null
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes

  private constructor() {}

  static getInstance(): YNABClient {
    if (!YNABClient.instance) {
      YNABClient.instance = new YNABClient()
    }
    return YNABClient.instance
  }

  private async getToken(): Promise<string> {
    // In a real app, this would get the token from your auth store
    const token = localStorage.getItem('ynab_token')
    if (!token) {
      throw new Error('YNAB token not found')
    }
    return token
  }

  private async checkRateLimit(): Promise<boolean> {
    if (!this.rateLimitInfo) return true

    const now = Date.now()
    if (now >= this.rateLimitInfo.reset) {
      this.rateLimitInfo = null
      return true
    }

    return this.rateLimitInfo.remaining > 0
  }

  private updateRateLimit(headers: Headers): void {
    const limit = parseInt(headers.get('X-Rate-Limit-Limit') || '0')
    const remaining = parseInt(headers.get('X-Rate-Limit-Remaining') || '0')
    const reset = parseInt(headers.get('X-Rate-Limit-Reset') || '0')

    if (limit && remaining && reset) {
      this.rateLimitInfo = { limit, remaining, reset }
    }
  }

  private async fetchWithRateLimit<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<YNABResponse<T>> {
    const token = await this.getToken()
    const url = `${this.baseUrl}${endpoint}`
    const cacheKey = `${url}-${JSON.stringify(options)}`

    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }

    // Check rate limit
    if (!(await this.checkRateLimit())) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    // Update rate limit info
    this.updateRateLimit(response.headers)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.detail || 'Failed to fetch data from YNAB')
    }

    const data = await response.json()
    
    // Cache the response
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })

    return data
  }

  async getBudgets(): Promise<YNABResponse<{ budgets: Budget[] }>> {
    return this.fetchWithRateLimit('/budgets')
  }

  async getWeeklyBudgetData(budgetId: string, date: Date): Promise<{
    budget: Budget
    transactions: Transaction[]
  }> {
    // Get the start and end dates for the week
    const startDate = new Date(date)
    startDate.setDate(startDate.getDate() - startDate.getDay())
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 6)

    // Format dates for YNAB API
    const sinceDate = startDate.toISOString().split('T')[0]
    const untilDate = endDate.toISOString().split('T')[0]

    // Fetch budget and transactions in parallel
    const [budgetResponse, transactionsResponse] = await Promise.all([
      this.fetchWithRateLimit(`/budgets/${budgetId}`),
      this.fetchWithRateLimit(
        `/budgets/${budgetId}/transactions?since_date=${sinceDate}&until_date=${untilDate}`
      ),
    ])

    return {
      budget: budgetResponse.data.budget,
      transactions: transactionsResponse.data.transactions,
    }
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const ynabClient = YNABClient.getInstance() 