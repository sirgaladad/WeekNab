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

const DemoDataService = {
  getCurrentWeekData(): WeeklyBudgetData {
    const today = new Date()
    
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
          budgeted: 200,
          spent: 165.75,
          remaining: 34.25,
          percentageSpent: 82.88,
          isOverBudget: false,
          transactions: [
            {
              id: 'g1',
              date: new Date(2024, 5, 16),
              payee: 'Whole Foods Market',
              amount: -85.50
            },
            {
              id: 'g2',
              date: new Date(2024, 5, 19),
              payee: 'Local Grocery Store',
              amount: -80.25
            }
          ]
        },
        {
          id: '2',
          name: 'Dining Out',
          color: '#4D96FF',
          budgeted: 120,
          spent: 145.50,
          remaining: -25.50,
          percentageSpent: 121.25,
          isOverBudget: true,
          transactions: [
            {
              id: 'd1',
              date: new Date(2024, 5, 17),
              payee: 'Local Restaurant',
              amount: -65.75
            },
            {
              id: 'd2',
              date: new Date(2024, 5, 18),
              payee: 'Coffee Shop',
              amount: -79.75
            }
          ]
        },
        {
          id: '3',
          name: 'Entertainment',
          color: '#6BCB77',
          budgeted: 100,
          spent: 85.49,
          remaining: 14.51,
          percentageSpent: 85.49,
          isOverBudget: false,
          transactions: [
            {
              id: 'e1',
              date: new Date(2024, 5, 18),
              payee: 'Movie Theater',
              amount: -45.50
            },
            {
              id: 'e2',
              date: new Date(2024, 5, 19),
              payee: 'Streaming Services',
              amount: -39.99
            }
          ]
        },
        {
          id: '4',
          name: 'Transportation',
          color: '#9B59B6',
          budgeted: 150,
          spent: 168.25,
          remaining: -18.25,
          percentageSpent: 112.17,
          isOverBudget: true,
          transactions: [
            {
              id: 't1',
              date: new Date(2024, 5, 16),
              payee: 'Gas Station',
              amount: -85.25
            },
            {
              id: 't2',
              date: new Date(2024, 5, 18),
              payee: 'Public Transit Pass',
              amount: -83.00
            }
          ]
        },
        {
          id: '5',
          name: 'Shopping',
          color: '#E67E22',
          budgeted: 175,
          spent: 145.75,
          remaining: 29.25,
          percentageSpent: 83.29,
          isOverBudget: false,
          transactions: [
            {
              id: 's1',
              date: new Date(2024, 5, 17),
              payee: 'Department Store',
              amount: -95.75
            },
            {
              id: 's2',
              date: new Date(2024, 5, 19),
              payee: 'Online Shopping',
              amount: -50.00
            }
          ]
        },
        {
          id: '6',
          name: 'Health & Fitness',
          color: '#3498DB',
          budgeted: 80,
          spent: 95.00,
          remaining: -15.00,
          percentageSpent: 118.75,
          isOverBudget: true,
          transactions: [
            {
              id: 'h1',
              date: new Date(2024, 5, 16),
              payee: 'Gym Membership',
              amount: -55.00
            },
            {
              id: 'h2',
              date: new Date(2024, 5, 18),
              payee: 'Vitamin Shop',
              amount: -40.00
            }
          ]
        },
        {
          id: '7',
          name: 'Utilities',
          color: '#95A5A6',
          budgeted: 200,
          spent: 185.50,
          remaining: 14.50,
          percentageSpent: 92.75,
          isOverBudget: false,
          transactions: [
            {
              id: 'u1',
              date: new Date(2024, 5, 15),
              payee: 'Electric Bill',
              amount: -125.50
            },
            {
              id: 'u2',
              date: new Date(2024, 5, 17),
              payee: 'Water Bill',
              amount: -60.00
            }
          ]
        },
        {
          id: '8',
          name: 'Personal Care',
          color: '#F1C40F',
          budgeted: 75,
          spent: 82.25,
          remaining: -7.25,
          percentageSpent: 109.67,
          isOverBudget: true,
          transactions: [
            {
              id: 'p1',
              date: new Date(2024, 5, 16),
              payee: 'Pharmacy',
              amount: -45.25
            },
            {
              id: 'p2',
              date: new Date(2024, 5, 19),
              payee: 'Hair Salon',
              amount: -37.00
            }
          ]
        },
        {
          id: '9',
          name: 'Education',
          color: '#8E44AD',
          budgeted: 90,
          spent: 85.00,
          remaining: 5.00,
          percentageSpent: 94.44,
          isOverBudget: false,
          transactions: [
            {
              id: 'ed1',
              date: new Date(2024, 5, 16),
              payee: 'Online Course',
              amount: -45.00
            },
            {
              id: 'ed2',
              date: new Date(2024, 5, 18),
              payee: 'Books',
              amount: -40.00
            }
          ]
        },
        {
          id: '10',
          name: 'Hobbies',
          color: '#D35400',
          budgeted: 60,
          spent: 85.50,
          remaining: -25.50,
          percentageSpent: 142.50,
          isOverBudget: true,
          transactions: [
            {
              id: 'hb1',
              date: new Date(2024, 5, 17),
              payee: 'Art Supplies',
              amount: -55.50
            },
            {
              id: 'hb2',
              date: new Date(2024, 5, 19),
              payee: 'Music Equipment',
              amount: -30.00
            }
          ]
        }
      ],
      insights: {
        daysLeft: 4,
        weeklyOverview: {
          message: "You're 70% through your weekly budget with 4 days remaining. Five categories are currently over budget. Consider adjusting spending to stay on track.",
          remainingAmount: 374.50
        },
        categoryInsights: [
          {
            name: 'Dining Out',
            spent: 145.50,
            budgeted: 120,
            remaining: -25.50,
            powerGoal: {
              name: 'European Vacation Fund',
              amount: 45
            }
          },
          {
            name: 'Transportation',
            spent: 168.25,
            budgeted: 150,
            remaining: -18.25,
            powerGoal: {
              name: 'Car Maintenance Fund',
              amount: 35.50
            }
          },
          {
            name: 'Health & Fitness',
            spent: 95.00,
            budgeted: 80,
            remaining: -15.00,
            powerGoal: {
              name: 'Wellness Goal',
              amount: 25.00
            }
          },
          {
            name: 'Personal Care',
            spent: 82.25,
            budgeted: 75,
            remaining: -7.25,
            powerGoal: {
              name: 'Self Care Fund',
              amount: 20.00
            }
          },
          {
            name: 'Hobbies',
            spent: 85.50,
            budgeted: 60,
            remaining: -25.50,
            powerGoal: {
              name: 'Creative Projects Fund',
              amount: 30.00
            }
          },
          {
            name: 'Groceries',
            spent: 165.75,
            budgeted: 200,
            remaining: 34.25,
            powerGoal: {
              name: 'Healthy Eating Goal',
              amount: 34.25
            }
          },
          {
            name: 'Entertainment',
            spent: 85.49,
            budgeted: 100,
            remaining: 14.51,
            powerGoal: {
              name: 'Fun Fund',
              amount: 14.51
            }
          }
        ],
        recentActivity: [
          {
            id: 'ra1',
            date: new Date(2024, 5, 19),
            payee: 'Department Store',
            amount: -95.75,
            category: 'Shopping'
          },
          {
            id: 'ra2',
            date: new Date(2024, 5, 19),
            payee: 'Movie Theater',
            amount: -45.50,
            category: 'Entertainment'
          },
          {
            id: 'ra3',
            date: new Date(2024, 5, 18),
            payee: 'Gym Membership',
            amount: -55.00,
            category: 'Health & Fitness'
          },
          {
            id: 'ra4',
            date: new Date(2024, 5, 18),
            payee: 'Local Restaurant',
            amount: -65.75,
            category: 'Dining Out'
          },
          {
            id: 'ra5',
            date: new Date(2024, 5, 17),
            payee: 'Art Supplies',
            amount: -55.50,
            category: 'Hobbies'
          }
        ],
        goalImpact: {
          message: "If you reduce spending in over-budget categories, you could add $91.50 more to your savings goals this week!",
          goalType: 'savings',
          amount: 91.50
        }
      }
    }
  },

  getPreviousWeekData(): WeeklyBudgetData {
    return this.getCurrentWeekData() // For demo purposes, return same data
  },

  getNextWeekData(): WeeklyBudgetData {
    return this.getCurrentWeekData() // For demo purposes, return same data
  }
}

export default DemoDataService 