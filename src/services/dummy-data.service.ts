import type { BudgetDetail, CategoryGroup, TransactionDetail } from 'ynab'

// Dummy budget data
export const dummyBudget: BudgetDetail = {
  id: 'dummy-budget-id',
  name: 'Demo Budget',
  last_modified_on: new Date().toISOString(),
  first_month: '2024-01-01',
  last_month: '2024-12-31',
  date_format: { format: 'MM/DD/YYYY' },
  currency_format: {
    iso_code: 'USD',
    example_format: '123,456.78',
    decimal_digits: 2,
    decimal_separator: '.',
    symbol_first: true,
    group_separator: ',',
    currency_symbol: '$',
    display_symbol: true
  },
  accounts: [],
  payees: [],
  payee_locations: [],
  category_groups: [],
  categories: [],
  months: [],
  transactions: [],
  scheduled_transactions: [],
  scheduled_subtransactions: [],
  subtransactions: []
}

// Dummy category groups with categories
export const dummyCategoryGroups: CategoryGroup[] = [
  {
    id: 'group-1',
    name: 'Essential Expenses',
    hidden: false,
    deleted: false,
    categories: [
      {
        id: 'cat-1',
        category_group_id: 'group-1',
        name: 'Housing',
        hidden: false,
        original_category_group_id: 'group-1',
        note: null,
        budgeted: 2000000, // $2,000
        activity: -1850000, // $1,850
        balance: 150000, // $150
        goal_type: null,
        goal_day: null,
        goal_cadence: null,
        goal_cadence_frequency: null,
        goal_creation_month: null,
        goal_target: null,
        goal_target_month: null,
        goal_percentage_complete: null,
        deleted: false
      },
      {
        id: 'cat-2',
        category_group_id: 'group-1',
        name: 'Groceries',
        hidden: false,
        original_category_group_id: 'group-1',
        note: null,
        budgeted: 800000, // $800
        activity: -750000, // $750
        balance: 50000, // $50
        goal_type: null,
        goal_day: null,
        goal_cadence: null,
        goal_cadence_frequency: null,
        goal_creation_month: null,
        goal_target: null,
        goal_target_month: null,
        goal_percentage_complete: null,
        deleted: false
      }
    ]
  },
  {
    id: 'group-2',
    name: 'Discretionary Spending',
    hidden: false,
    deleted: false,
    categories: [
      {
        id: 'cat-3',
        category_group_id: 'group-2',
        name: 'Entertainment',
        hidden: false,
        original_category_group_id: 'group-2',
        note: null,
        budgeted: 400000, // $400
        activity: -450000, // $450
        balance: -50000, // -$50
        goal_type: null,
        goal_day: null,
        goal_cadence: null,
        goal_cadence_frequency: null,
        goal_creation_month: null,
        goal_target: null,
        goal_target_month: null,
        goal_percentage_complete: null,
        deleted: false
      },
      {
        id: 'cat-4',
        category_group_id: 'group-2',
        name: 'Dining Out',
        hidden: false,
        original_category_group_id: 'group-2',
        note: null,
        budgeted: 300000, // $300
        activity: -250000, // $250
        balance: 50000, // $50
        goal_type: null,
        goal_day: null,
        goal_cadence: null,
        goal_cadence_frequency: null,
        goal_creation_month: null,
        goal_target: null,
        goal_target_month: null,
        goal_percentage_complete: null,
        deleted: false
      }
    ]
  }
]

// Generate dummy transactions for the last 30 days
export function generateDummyTransactions(): TransactionDetail[] {
  const transactions: TransactionDetail[] = []
  const today = new Date()
  const payees = ['Walmart', 'Target', 'Amazon', 'Netflix', 'Spotify', 'Local Restaurant']
  const categories = dummyCategoryGroups.flatMap(group => group.categories || [])

  // Generate 30 random transactions
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const category = categories[Math.floor(Math.random() * categories.length)]
    const amount = Math.floor(Math.random() * 100000) // Random amount up to $100
    
    transactions.push({
      id: `trans-${i}`,
      date: date.toISOString().split('T')[0],
      amount: -amount, // Negative for expenses
      memo: null,
      cleared: 'cleared',
      approved: true,
      flag_color: null,
      flag_name: null,
      account_id: 'dummy-account',
      deleted: false,
      account_name: 'Checking',
      payee_id: `payee-${i}`,
      payee_name: payees[Math.floor(Math.random() * payees.length)],
      category_id: category.id,
      category_name: category.name,
      transfer_account_id: null,
      transfer_transaction_id: null,
      matched_transaction_id: null,
      import_id: null,
      import_payee_name: null,
      import_payee_name_original: null,
      debt_transaction_type: null,
      debt_interest_transaction_id: null,
      subtransactions: []
    })
  }

  return transactions
}

// Get dummy data for development
export function getDummyData() {
  return {
    budget: dummyBudget,
    categoryGroups: dummyCategoryGroups,
    transactions: generateDummyTransactions()
  }
} 