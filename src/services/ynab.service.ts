import { API } from 'ynab'

export class YNABService {
  private api: API
  
  constructor(accessToken: string) {
    this.api = new API(accessToken)
  }

  async getBudgets() {
    try {
      const budgetsResponse = await this.api.budgets.getBudgets()
      return budgetsResponse.data.budgets
    } catch (error) {
      console.error('Error fetching budgets:', error)
      throw error
    }
  }

  async getBudgetById(budgetId: string) {
    try {
      const budgetResponse = await this.api.budgets.getBudgetById(budgetId)
      return budgetResponse.data.budget
    } catch (error) {
      console.error('Error fetching budget:', error)
      throw error
    }
  }
}

// Create singleton instance
let ynabService: YNABService | null = null

export const initYNABService = (accessToken: string) => {
  ynabService = new YNABService(accessToken)
  return ynabService
}

export const getYNABService = () => {
  if (!ynabService) {
    throw new Error('YNAB service not initialized')
  }
  return ynabService
} 