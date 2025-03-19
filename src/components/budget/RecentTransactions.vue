<template>
  <section class="section">
    <h2>Recent Transactions</h2>
    <div class="transactions">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <div class="transaction-info">
          <span class="transaction-payee">{{ transaction.payee_name || 'Unknown Payee' }}</span>
          <span
            class="transaction-amount"
            :class="{ negative: transaction.amount < 0 }"
          >
            {{ formatCurrency(transaction.amount) }}
          </span>
        </div>
        <div class="transaction-details">
          <span class="transaction-category">{{ transaction.category_name || 'Uncategorized' }}</span>
          <span class="transaction-date">{{ formatDate(transaction.date) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TransactionDetail } from 'ynab'
import { formatCurrency } from '@/utils/currency'

defineProps<{
  transactions: TransactionDetail[]
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.section {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
}

h2 {
  font-size: 1.25rem;
  color: var(--text);
  margin: 0 0 1rem 0;
}

.transactions {
  display: grid;
  gap: 0.75rem;
}

.transaction-item {
  background: var(--background);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--border);
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.transaction-payee {
  font-weight: 500;
  color: var(--text);
  font-size: 0.875rem;
}

.transaction-amount {
  font-weight: 600;
  color: var(--success);
  font-size: 0.875rem;
}

.transaction-amount.negative {
  color: var(--error);
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.transaction-category {
  font-style: italic;
}

@media (min-width: 640px) {
  .section {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .transactions {
    gap: 1rem;
  }

  .transaction-item {
    padding: 1rem;
  }

  .transaction-payee,
  .transaction-amount {
    font-size: 1rem;
  }

  .transaction-details {
    font-size: 0.875rem;
  }
}

@media (min-width: 768px) {
  .transactions {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (min-width: 1024px) {
  .section {
    padding: 2rem;
  }

  .transactions {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style> 
</style> 