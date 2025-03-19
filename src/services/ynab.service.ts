import { API } from 'ynab'
import { AuthService } from './auth.service'

let ynabAPI: API | null = null

export function initYNABService(): API {
  const token = AuthService.getToken()
  if (!token) {
    throw new Error('No YNAB token found')
  }
  ynabAPI = new API(token)
  return ynabAPI
}

export function getYNABService(): API {
  if (!ynabAPI) {
    return initYNABService()
  }
  return ynabAPI
}

export async function getBudgets() {
  const api = getYNABService()
  const response = await api.budgets.getBudgets()
  return response.data.budgets
}

export async function getBudgetById(budgetId: string) {
  const api = getYNABService()
  const response = await api.budgets.getBudgetById(budgetId)
  return response.data.budget
}

export async function getTransactions(budgetId: string) {
  const api = getYNABService()
  const response = await api.transactions.getTransactions(budgetId)
  return response.data.transactions
}

export async function getCategories(budgetId: string) {
  const api = getYNABService()
  const response = await api.categories.getCategories(budgetId)
  return response.data.category_groups
} 