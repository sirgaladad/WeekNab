import type { WeeklyBudgetData, CategoryData, DailySpending } from '@/types/budget'

export class DemoDataService {
  static async getWeeklyData(): Promise<WeeklyBudgetData> {
    // Simulated API response delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const categories: CategoryData[] = [
      {
        id: '1',
        name: 'Groceries',
        budgeted: 200,
        spent: 150,
        remaining: 50,
        percentageSpent: 75
      },
      {
        id: '2',
        name: 'Dining Out',
        budgeted: 150,
        spent: 100,
        remaining: 50,
        percentageSpent: 66.67
      }
    ]

    const dailySpending: DailySpending[] = [
      {
        label: 'Mon',
        amount: 45.50,
        date: new Date(2024, 2, 18),
        transactions: [
          { id: 1, payee: 'Grocery Store', amount: 35.50, category: 'Groceries' },
          { id: 2, payee: 'Coffee Shop', amount: 10.00, category: 'Dining Out' }
        ]
      },
      {
        label: 'Tue',
        amount: 65.75,
        date: new Date(2024, 2, 19),
        transactions: [
          { id: 3, payee: 'Restaurant', amount: 45.75, category: 'Dining Out' },
          { id: 4, payee: 'Pharmacy', amount: 20.00, category: 'Health' }
        ]
      }
    ]

    return {
      totalBudget: 1000,
      totalSpent: 750,
      remainingBudget: 250,
      categories,
      dailySpending
    }
  }

  static async getCurrentWeekData(): Promise<WeeklyBudgetData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const categories: CategoryData[] = [
      {
        id: '1',
        name: 'Groceries',
        budgeted: 150,
        spent: 125,
        remaining: 25,
        progress: 83.33,
        status: 'under-budget',
        isOverBudget: false,
        color: '#FF5733',
        transactions: [
          { id: 'tx1', date: new Date(), amount: -75.50, payee: 'Whole Foods Market', category: 'Groceries' },
          { id: 'tx2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: -45.75, payee: 'Trader Joes', category: 'Groceries' }
        ]
      },
      {
        id: '2',
        name: 'Dining Out',
        budgeted: 80,
        spent: 95,
        remaining: -15,
        progress: 118.75,
        status: 'over-budget',
        isOverBudget: true,
        color: '#3357FF',
        transactions: [
          { id: 'tx3', date: new Date(), amount: -45.00, payee: 'Local Restaurant', category: 'Dining Out' },
          { id: 'tx4', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: -50.00, payee: 'Sushi Place', category: 'Dining Out' }
        ]
      },
      {
        id: '3',
        name: 'Entertainment',
        budgeted: 75,
        spent: 45,
        remaining: 30,
        progress: 60,
        status: 'under-budget',
        isOverBudget: false,
        color: '#33FF57',
        transactions: [
          { id: 'tx5', date: new Date(), amount: -15.99, payee: 'Netflix Subscription', category: 'Entertainment' },
          { id: 'tx6', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: -28.50, payee: 'Movie Tickets', category: 'Entertainment' }
        ]
      },
      {
        id: '4',
        name: 'Transportation',
        budgeted: 200,
        spent: 175,
        remaining: 25,
        progress: 87.5,
        status: 'under-budget',
        isOverBudget: false,
        color: '#FFD700',
        transactions: [
          { id: 'tx7', date: new Date(), amount: -50.00, payee: 'Gas Station', category: 'Transportation' },
          { id: 'tx8', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: -125.00, payee: 'Car Service', category: 'Transportation' }
        ]
      },
      {
        id: '5',
        name: 'Shopping',
        budgeted: 150,
        spent: 200,
        remaining: -50,
        progress: 133.33,
        status: 'over-budget',
        isOverBudget: true,
        color: '#FF69B4',
        transactions: [
          { id: 'tx9', date: new Date(), amount: -120.00, payee: 'Department Store', category: 'Shopping' },
          { id: 'tx10', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: -80.00, payee: 'Online Store', category: 'Shopping' }
        ]
      },
      {
        id: '6',
        name: 'Utilities',
        budgeted: 300,
        spent: 285,
        remaining: 15,
        progress: 95,
        status: 'under-budget',
        isOverBudget: false,
        color: '#4B0082',
        transactions: [
          { id: 'tx11', date: new Date(), amount: -150.00, payee: 'Electric Company', category: 'Utilities' },
          { id: 'tx12', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), amount: -135.00, payee: 'Water & Gas', category: 'Utilities' }
        ]
      },
      {
        id: '7',
        name: 'Healthcare',
        budgeted: 200,
        spent: 75,
        remaining: 125,
        progress: 37.5,
        status: 'under-budget',
        isOverBudget: false,
        color: '#20B2AA',
        transactions: [
          { id: 'tx13', date: new Date(), amount: -45.00, payee: 'Pharmacy', category: 'Healthcare' },
          { id: 'tx14', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), amount: -30.00, payee: 'Doctor Visit', category: 'Healthcare' }
        ]
      },
      {
        id: '8',
        name: 'Subscriptions',
        budgeted: 50,
        spent: 65,
        remaining: -15,
        progress: 130,
        status: 'over-budget',
        isOverBudget: true,
        color: '#8A2BE2',
        transactions: [
          { id: 'tx15', date: new Date(), amount: -14.99, payee: 'Streaming Service', category: 'Subscriptions' },
          { id: 'tx16', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), amount: -50.00, payee: 'Software Subscription', category: 'Subscriptions' }
        ]
      },
      {
        id: '9',
        name: 'Personal Care',
        budgeted: 100,
        spent: 85,
        remaining: 15,
        progress: 85,
        status: 'under-budget',
        isOverBudget: false,
        color: '#FF1493',
        transactions: [
          { id: 'tx17', date: new Date(), amount: -45.00, payee: 'Salon', category: 'Personal Care' },
          { id: 'tx18', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), amount: -40.00, payee: 'Spa', category: 'Personal Care' }
        ]
      },
      {
        id: '10',
        name: 'Gifts',
        budgeted: 75,
        spent: 100,
        remaining: -25,
        progress: 133.33,
        status: 'over-budget',
        isOverBudget: true,
        color: '#FF4500',
        transactions: [
          { id: 'tx19', date: new Date(), amount: -50.00, payee: 'Gift Shop', category: 'Gifts' },
          { id: 'tx20', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), amount: -50.00, payee: 'Online Gift', category: 'Gifts' }
        ]
      }
    ]

    const recentActivity = [
      {
        id: '1',
        date: new Date(),
        amount: -50,
        payee: 'Gas Station',
        category: 'Transportation'
      }
    ]

    return {
      weekNumber: 3,
      dateRange: {
        start: new Date('2024-06-15'),
        end: new Date('2024-06-21')
      },
      budget: {
        total: 1250,
        spent: 875.50,
        remaining: 374.50,
        percentageSpent: 70
      },
      totalBudgeted: 1250,
      totalSpent: 875.50,
      remaining: 374.50,
      daysLeft: 2,
      categories,
      insights: {
        goalImpact: {
          type: 'savings',
          amount: 125.50
        },
        recommendations: [
          "Consider reducing transportation expenses",
          "You are on track with grocery spending"
        ],
        recentActivity
      }
    }
  }

  static async getPreviousWeekData(): Promise<WeeklyBudgetData> {
    return this.getCurrentWeekData()
  }

  static async getNextWeekData(): Promise<WeeklyBudgetData> {
    return this.getCurrentWeekData()
  }
} 