import { getStartOfWeek, getEndOfWeek } from './ynab-weekly.service'

export interface WeeklyBudgetData {
  weekNumber: number
  dateRange: {
    start: Date
    end: Date
  }
  budget: {
    total: number
    spent: number
    remaining: number
    percentageSpent: number
  }
  categories: CategoryData[]
  insights: {
    daysLeft: number
    weeklyOverview: {
      message: string
      remainingAmount: number
    }
    categoryInsights: CategoryInsight[]
    recentActivity: Transaction[]
    goalImpact: {
      message: string
      goalType: string
      amount: number
    }
  }
}

export interface CategoryData {
  id: string
  name: string
  color: string
  budgeted: number
  spent: number
  remaining: number
  percentageSpent: number
  isOverBudget: boolean
  transactions: Transaction[]
}

export interface CategoryInsight {
  name: string
  spent: number
  budgeted: number
  remaining: number
  powerGoal: {
    name: string
    amount: number
  }
}

export interface Transaction {
  id: string
  date: Date
  payee: string
  amount: number
  category?: string
}

export class DemoDataService {
  static getCurrentWeekData(): WeeklyBudgetData {
    const today = new Date()
    const weekStart = getStartOfWeek(today)
    const weekEnd = getEndOfWeek(today)
    
    return {
      weekNumber: 3,
      dateRange: {
        start: new Date(2024, 5, 15), // June 15
        end: new Date(2024, 5, 21),   // June 21
      },
      budget: {
        total: 1250.00,
        spent: 875.50,
        remaining: 374.50,
        percentageSpent: 70
      },
      categories: [
        {
          id: '1',
          name: 'Groceries',
          color: '#FF6B6B',
          budgeted: 150,
          spent: 125,
          remaining: 25,
          percentageSpent: 83.33,
          isOverBudget: false,
          transactions: []
        },
        {
          id: '2',
          name: 'Dining Out',
          color: '#4D96FF',
          budgeted: 80,
          spent: 95,
          remaining: -15,
          percentageSpent: 118.75,
          isOverBudget: true,
          transactions: []
        },
        {
          id: '3',
          name: 'Entertainment',
          color: '#6BCB77',
          budgeted: 75,
          spent: 45,
          remaining: 30,
          percentageSpent: 60,
          isOverBudget: false,
          transactions: [
            {
              id: 't1',
              date: new Date(2024, 5, 18),
              payee: 'Netflix Subscription',
              amount: -15.99
            },
            {
              id: 't2',
              date: new Date(2024, 5, 19),
              payee: 'Movie Tickets',
              amount: -28.50
            }
          ]
        }
      ],
      insights: {
        daysLeft: 4,
        weeklyOverview: {
          message: "You're on track with your budget!",
          remainingAmount: 115
        },
        categoryInsights: [
          {
            name: 'Dining Out',
            spent: 65,
            budgeted: 100,
            remaining: 35,
            powerGoal: {
              name: 'European Vacation Fund',
              amount: 45
            }
          },
          {
            name: 'Entertainment',
            spent: 30,
            budgeted: 80,
            remaining: 50,
            powerGoal: {
              name: 'New Laptop',
              amount: 0
            }
          },
          {
            name: 'Snacks & Coffee',
            spent: 20,
            budgeted: 50,
            remaining: 30,
            powerGoal: {
              name: 'Emergency Fund',
              amount: 0
            }
          }
        ],
        recentActivity: [
          {
            id: 'ra1',
            date: new Date(2024, 5, 19),
            payee: 'Starbucks',
            amount: -5.75
          },
          {
            id: 'ra2',
            date: new Date(2024, 5, 19),
            payee: 'Movie Tickets',
            amount: -24.00
          }
        ],
        goalImpact: {
          message: "Stay on budget this week and you'll be $45 closer to your European Vacation!",
          goalType: 'vacation',
          amount: 45
        }
      }
    }
  }

  static getPreviousWeekData(): WeeklyBudgetData {
    // Similar structure but with different dates and numbers
    // Implementation similar to getCurrentWeekData
    return this.getCurrentWeekData() // For now, return same data
  }

  static getNextWeekData(): WeeklyBudgetData {
    // Similar structure but with different dates and numbers
    // Implementation similar to getCurrentWeekData
    return this.getCurrentWeekData() // For now, return same data
  }
} 