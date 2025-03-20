import type { WeeklyBudgetData, CategoryData, DailySpending, DateRange, Transaction } from '@/types/budget'

export class DemoDataService {
  static async getWeeklyData(): Promise<WeeklyBudgetData> {
    // Simulated API response delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const categoryTransactions: Record<string, Transaction[]> = {
      'Groceries': [
        { id: 1, payee: 'Whole Foods', amount: 85.50, category: 'Groceries' },
        { id: 2, payee: 'Trader Joes', amount: 45.25, category: 'Groceries' },
        { id: 3, payee: 'Local Market', amount: 19.75, category: 'Groceries' }
      ],
      'Dining Out': [
        { id: 4, payee: 'Pizza Restaurant', amount: 35.50, category: 'Dining Out' },
        { id: 5, payee: 'Coffee Shop', amount: 15.75, category: 'Dining Out' },
        { id: 6, payee: 'Sunday Brunch', amount: 48.75, category: 'Dining Out' }
      ],
      'Entertainment': [
        { id: 7, payee: 'Movie Theater', amount: 30.50, category: 'Entertainment' },
        { id: 8, payee: 'Bowling Alley', amount: 22.00, category: 'Entertainment' },
        { id: 9, payee: 'Concert Tickets', amount: 75.00, category: 'Entertainment' }
      ],
      'Transportation': [
        { id: 10, payee: 'Gas Station', amount: 45.75, category: 'Transportation' },
        { id: 11, payee: 'Parking Garage', amount: 15.00, category: 'Transportation' },
        { id: 12, payee: 'Uber', amount: 24.50, category: 'Transportation' }
      ],
      'Shopping': [
        { id: 13, payee: 'Department Store', amount: 125.35, category: 'Shopping' },
        { id: 14, payee: 'Online Retailer', amount: 67.89, category: 'Shopping' },
        { id: 15, payee: 'Electronics Store', amount: 199.99, category: 'Shopping' }
      ],
      'Utilities': [
        { id: 16, payee: 'Electric Company', amount: 85.42, category: 'Utilities' },
        { id: 17, payee: 'Water Service', amount: 35.00, category: 'Utilities' },
        { id: 18, payee: 'Internet Provider', amount: 65.99, category: 'Utilities' }
      ]
    }

    const categories: CategoryData[] = [
      {
        id: '1',
        name: 'Groceries',
        budgeted: 200,
        spent: 150.50,
        remaining: 49.50,
        percentageSpent: 75,
        transactions: categoryTransactions['Groceries']
      },
      {
        id: '2',
        name: 'Dining Out',
        budgeted: 150,
        spent: 100,
        remaining: 50,
        percentageSpent: 66.67,
        transactions: categoryTransactions['Dining Out']
      },
      {
        id: '3',
        name: 'Entertainment',
        budgeted: 100,
        spent: 127.50,
        remaining: -27.50,
        percentageSpent: 127.5,
        transactions: categoryTransactions['Entertainment']
      },
      {
        id: '4',
        name: 'Transportation',
        budgeted: 120,
        spent: 85.25,
        remaining: 34.75,
        percentageSpent: 71.04,
        transactions: categoryTransactions['Transportation']
      },
      {
        id: '5',
        name: 'Shopping',
        budgeted: 300,
        spent: 393.23,
        remaining: -93.23,
        percentageSpent: 131.08,
        transactions: categoryTransactions['Shopping']
      },
      {
        id: '6',
        name: 'Utilities',
        budgeted: 200,
        spent: 186.41,
        remaining: 13.59,
        percentageSpent: 93.21,
        transactions: categoryTransactions['Utilities']
      }
    ]

    const dateRange: DateRange = {
      start: new Date(2024, 2, 18), // March 18, 2024
      end: new Date(2024, 2, 24)    // March 24, 2024
    }

    const dailySpending: DailySpending[] = [
      {
        label: 'Mon',
        amount: 145.50,
        date: new Date(2024, 2, 18),
        transactions: [
          { id: 1, payee: 'Grocery Store', amount: 85.50, category: 'Groceries' },
          { id: 2, payee: 'Coffee Shop', amount: 10.00, category: 'Dining Out' },
          { id: 3, payee: 'Gas Station', amount: 50.00, category: 'Transportation' }
        ]
      },
      {
        label: 'Tue',
        amount: 65.75,
        date: new Date(2024, 2, 19),
        transactions: [
          { id: 4, payee: 'Restaurant', amount: 45.75, category: 'Dining Out' },
          { id: 5, payee: 'Pharmacy', amount: 20.00, category: 'Health' }
        ]
      },
      {
        label: 'Wed',
        amount: 235.25,
        date: new Date(2024, 2, 20),
        transactions: [
          { id: 6, payee: 'Online Shopping', amount: 199.99, category: 'Shopping' },
          { id: 7, payee: 'Gas Station', amount: 35.25, category: 'Transportation' }
        ]
      },
      {
        label: 'Thu',
        amount: 85.99,
        date: new Date(2024, 2, 21),
        transactions: [
          { id: 8, payee: 'Internet Bill', amount: 65.99, category: 'Utilities' },
          { id: 9, payee: 'Coffee Shop', amount: 20.00, category: 'Dining Out' }
        ]
      },
      {
        label: 'Fri',
        amount: 155.50,
        date: new Date(2024, 2, 22),
        transactions: [
          { id: 10, payee: 'Movie Theater', amount: 30.50, category: 'Entertainment' },
          { id: 11, payee: 'Restaurant', amount: 45.00, category: 'Dining Out' },
          { id: 12, payee: 'Department Store', amount: 80.00, category: 'Shopping' }
        ]
      },
      {
        label: 'Sat',
        amount: 195.25,
        date: new Date(2024, 2, 23),
        transactions: [
          { id: 13, payee: 'Department Store', amount: 125.25, category: 'Shopping' },
          { id: 14, payee: 'Restaurant', amount: 70.00, category: 'Dining Out' }
        ]
      },
      {
        label: 'Sun',
        amount: 125.00,
        date: new Date(2024, 2, 24),
        transactions: [
          { id: 15, payee: 'Grocery Store', amount: 65.00, category: 'Groceries' },
          { id: 16, payee: 'Brunch', amount: 35.00, category: 'Dining Out' },
          { id: 17, payee: 'Gas Station', amount: 25.00, category: 'Transportation' }
        ]
      }
    ]

    return {
      totalBudget: 1000,
      totalSpent: 750,
      remainingBudget: 250,
      categories,
      dailySpending,
      dateRange,
      daysLeft: 3
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