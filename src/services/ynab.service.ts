import { API } from 'ynab'
import { AuthService } from './auth.service'
import { isDemoMode, getYnabApi } from '../demo-mode'

let ynabAPI: API | null = null

export function initYNABService(): API {
  try {
    // If we're in demo mode, use the mock API
    if (isDemoMode) {
      console.log('Using mock YNAB API in demo mode')
      return getYnabApi() as unknown as API
    }
    
    const token = AuthService.getToken()
    if (!token) {
      throw new Error('No YNAB token found')
    }
    ynabAPI = new API(token)
    return ynabAPI
  } catch (error) {
    console.error('Error initializing YNAB service:', error)
    // Fallback to demo mode if initialization fails
    console.log('Falling back to mock YNAB API')
    return getYnabApi() as unknown as API
  }
}

export function getYNABService(): API {
  if (!ynabAPI) {
    return initYNABService()
  }
  return ynabAPI
}

export async function getBudgets() {
  try {
    const api = getYNABService()
    const response = await api.budgets.getBudgets()
    return response.data.budgets
  } catch (error) {
    console.error('Error fetching budgets:', error)
    // Return mock data if the real API call fails
    return [
      { id: 'demo-budget-1', name: 'Demo Budget' },
      { id: 'demo-budget-2', name: 'Secondary Budget' }
    ]
  }
}

export async function getBudgetById(budgetId: string) {
  try {
    const api = getYNABService()
    const response = await api.budgets.getBudgetById(budgetId)
    return response.data.budget
  } catch (error) {
    console.error(`Error fetching budget ${budgetId}:`, error)
    // Return mock data if the real API call fails
    return {
      id: budgetId || 'demo-budget-1',
      name: 'Demo Budget',
      currency_format: { iso_code: 'USD' },
      categories: [],
      category_groups: []
    }
  }
}

export async function getTransactions(budgetId: string) {
  try {
    const api = getYNABService()
    const response = await api.transactions.getTransactions(budgetId)
    return response.data.transactions
  } catch (error) {
    console.error(`Error fetching transactions for budget ${budgetId}:`, error)
    // Return mock data if the real API call fails
    return []
  }
}

export async function getCategories(budgetId: string) {
  try {
    const api = getYNABService()
    const response = await api.categories.getCategories(budgetId)
    return response.data.category_groups
  } catch (error) {
    console.error(`Error fetching categories for budget ${budgetId}:`, error)
    // Return mock data if the real API call fails
    return []
  }
} 