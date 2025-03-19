interface Transaction {
  id: string
  payee: string
  category: string
  amount: string
  type: 'expense' | 'income'
  date: string
  account: string
}

interface Category {
  id: string
  name: string
  icon: string
  budget: number
  spent: number
  type: 'essential' | 'discretionary'
  transactions: Transaction[]
}

interface DummyData {
  weeklyBudget: number
  weeklySpent: number
  transactions: Transaction[]
  categories: Category[]
}

class DummyService {
  getDummyData(): DummyData {
    return {
      weeklyBudget: 850.00,
      weeklySpent: 552.50,
      transactions: [
        {
          id: '1',
          payee: 'Whole Foods',
          category: 'Groceries',
          amount: '85.75',
          type: 'expense',
          date: 'May 15, 2024',
          account: 'Chase Checking'
        },
        {
          id: '2',
          payee: 'Acme Corp',
          category: 'Income',
          amount: '2,500.00',
          type: 'income',
          date: 'May 15, 2024',
          account: 'Chase Checking'
        },
        {
          id: '3',
          payee: 'Local Cafe',
          category: 'Dining Out',
          amount: '42.50',
          type: 'expense',
          date: 'May 14, 2024',
          account: 'Amex Card'
        },
        {
          id: '4',
          payee: 'Gas Station',
          category: 'Transportation',
          amount: '45.75',
          type: 'expense',
          date: 'May 13, 2024',
          account: 'Chase Credit'
        },
        {
          id: '5',
          payee: 'Cinema',
          category: 'Entertainment',
          amount: '45.00',
          type: 'expense',
          date: 'May 18, 2024',
          account: 'Chase Credit'
        }
      ],
      categories: [
        {
          id: 'groceries',
          name: 'Groceries',
          icon: 'fas fa-shopping-cart',
          budget: 200,
          spent: 175.50,
          type: 'essential',
          transactions: [
            { id: '1', payee: 'Whole Foods', category: 'Groceries', amount: '85.75', type: 'expense', date: 'May 15, 2024', account: 'Chase Checking' },
            { id: '6', payee: "Trader Joe's", category: 'Groceries', amount: '89.75', type: 'expense', date: 'May 17, 2024', account: 'Chase Checking' }
          ]
        },
        {
          id: 'dining',
          name: 'Dining Out',
          icon: 'fas fa-utensils',
          budget: 150,
          spent: 132.25,
          type: 'discretionary',
          transactions: [
            { id: '3', payee: 'Local Cafe', category: 'Dining Out', amount: '42.50', type: 'expense', date: 'May 14, 2024', account: 'Amex Card' },
            { id: '7', payee: 'Pizza Place', category: 'Dining Out', amount: '89.75', type: 'expense', date: 'May 16, 2024', account: 'Chase Credit' }
          ]
        },
        {
          id: 'transport',
          name: 'Transportation',
          icon: 'fas fa-bus',
          budget: 100,
          spent: 45.75,
          type: 'essential',
          transactions: [
            { id: '4', payee: 'Gas Station', category: 'Transportation', amount: '45.75', type: 'expense', date: 'May 13, 2024', account: 'Chase Credit' }
          ]
        },
        {
          id: 'entertainment',
          name: 'Entertainment',
          icon: 'fas fa-film',
          budget: 100,
          spent: 89.00,
          type: 'discretionary',
          transactions: [
            { id: '5', payee: 'Cinema', category: 'Entertainment', amount: '45.00', type: 'expense', date: 'May 18, 2024', account: 'Chase Credit' },
            { id: '8', payee: 'Streaming Service', category: 'Entertainment', amount: '44.00', type: 'expense', date: 'May 13, 2024', account: 'Chase Credit' }
          ]
        }
      ]
    }
  }
}

export const dummyService = new DummyService() 