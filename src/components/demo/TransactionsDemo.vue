<template>
  <div class="transactions-demo">
    <!-- Search and Filter Bar -->
    <div class="search-bar">
      <div class="search-input">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search transactions..."
        >
      </div>
      <button class="filter-btn">
        <i class="fas fa-filter"></i>
        <span>Filter</span>
      </button>
    </div>

    <!-- Transaction List -->
    <div class="transaction-list">
      <div 
        v-for="transaction in filteredTransactions" 
        :key="transaction.id"
        class="transaction-item"
      >
        <div class="transaction-icon" :class="transaction.type">
          <i :class="getCategoryIcon(transaction.category)"></i>
        </div>
        <div class="transaction-content">
          <div class="transaction-main">
            <div class="transaction-info">
              <span class="payee">{{ transaction.payee }}</span>
              <span class="category">{{ transaction.category }}</span>
            </div>
            <span 
              class="amount"
              :class="{ negative: transaction.type === 'expense' }"
            >
              {{ transaction.type === 'expense' ? '-' : '+' }}${{ transaction.amount }}
            </span>
          </div>
          <div class="transaction-details">
            <span class="date">{{ transaction.date }}</span>
            <span class="account">{{ transaction.account }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <button class="action-btn">
        <i class="fas fa-plus"></i>
        <span>Add Transaction</span>
      </button>
      <button class="action-btn">
        <i class="fas fa-file-export"></i>
        <span>Export</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Transaction {
  id: string
  payee: string
  category: string
  amount: string
  type: 'expense' | 'income'
  date: string
  account: string
}

const searchQuery = ref('')

const transactions: Transaction[] = [
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
]

const filteredTransactions = computed(() => {
  if (!searchQuery.value) return transactions
  
  const query = searchQuery.value.toLowerCase()
  return transactions.filter(transaction => 
    transaction.payee.toLowerCase().includes(query) ||
    transaction.category.toLowerCase().includes(query) ||
    transaction.amount.includes(query) ||
    transaction.account.toLowerCase().includes(query)
  )
})

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Groceries': 'fas fa-shopping-cart',
    'Income': 'fas fa-money-bill-wave',
    'Dining Out': 'fas fa-utensils',
    'Transportation': 'fas fa-bus',
    'Entertainment': 'fas fa-film'
  }
  return icons[category] || 'fas fa-tag'
}
</script>

<style scoped>
.transactions-demo {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--background);
}

.search-bar {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--surface);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.search-input i {
  color: var(--text-secondary);
}

.search-input input {
  flex: 1;
  border: none;
  background: none;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.search-input input:focus {
  outline: none;
}

.search-input input::placeholder {
  color: var(--text-secondary);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: var(--surface-hover);
}

.transaction-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.transaction-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.transaction-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.25rem;
}

.transaction-icon.expense {
  background: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
}

.transaction-icon.income {
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
}

.transaction-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.transaction-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.transaction-info {
  display: flex;
  flex-direction: column;
}

.payee {
  font-weight: 600;
  color: var(--text-primary);
}

.category {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.amount {
  font-weight: 600;
  color: var(--text-primary);
}

.amount.negative {
  color: rgb(239, 68, 68);
}

.transaction-details {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.quick-actions {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border-radius: 8px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--surface-hover);
}

.action-btn i {
  font-size: 1rem;
}
</style> 