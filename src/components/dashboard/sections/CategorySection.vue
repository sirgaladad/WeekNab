<template>
  <div class="category-section">
    <div class="section-header">
      <h2>Weekly Budget Categories</h2>
      <div class="filter-buttons">
        <button 
          @click="activeFilter = 'all'"
          :class="{ active: activeFilter === 'all' }"
          class="filter-button"
        >
          All
        </button>
        <button 
          @click="activeFilter = 'over'"
          :class="{ active: activeFilter === 'over' }"
          class="filter-button"
        >
          Over Budget
        </button>
        <button
          @click="activeFilter = 'under'"
          :class="{ active: activeFilter === 'under' }"
          class="filter-button"
        >
          Under Budget
        </button>
      </div>
    </div>

    <div class="categories-grid">
      <div 
        v-for="category in visibleCategories"
        :key="category.id" 
        class="category-card"
      >
        <div class="category-header">
          <h3>{{ category.name }}</h3>
          <span
            class="amount"
            :class="{ negative: category.remaining < 0 }"
          >
            ${{ Math.abs(category.remaining).toFixed(2) }}
            {{ category.remaining >= 0 ? "left" : "over" }}
          </span>
        </div>

        <div class="category-progress">
          <div class="progress-bar">
            <div 
              class="progress-fill"
              :style="{ 
                width: `${Math.min(
                  (category.spent / category.budgeted) * 100,
                  100
                )}%`,
              }"
              :class="{ 'over-budget': category.spent > category.budgeted }"
            ></div>
          </div>
          <div class="progress-label">
            ${{ category.spent.toFixed(2) }} of ${{ category.budgeted.toFixed(2) }}
          </div>
        </div>

        <div
          v-if="category.transactions && category.transactions.length > 0"
          class="category-transactions"
        >
          <div
            v-for="transaction in category.transactions.slice(0, 3)"
            :key="transaction.id"
            class="transaction-item"
          >
            <div class="transaction-details">
              <div class="transaction-payee">{{ transaction.payee }}</div>
              <div class="transaction-amount">
                ${{ transaction.amount.toFixed(2) }}
              </div>
            </div>
          </div>
          <div v-if="category.transactions.length > 3" class="view-more">
            {{ category.transactions.length - 3 }} more transactions
          </div>
        </div>
        <div v-else class="no-transactions">
          No transactions this week
        </div>
      </div>
    </div>

    <div class="show-more" v-if="categories.length > 4">
      <button @click="showAllCategories = !showAllCategories" class="show-more-button">
        {{ showAllCategories ? "Show Less" : "Show All Categories" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Transaction {
  id: string;
  payee: string;
  amount: number;
  date: string;
}

interface Category {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  remaining: number;
  transactions: Transaction[];
}

interface Props {
  categories: Category[];
}

const props = defineProps<Props>();
const showAllCategories = ref(false);
const activeFilter = ref('all');

const filteredCategories = computed(() => {
  if (activeFilter.value === 'all') {
    return props.categories;
  } else if (activeFilter.value === 'over') {
    return props.categories.filter(category => category.remaining < 0);
  } else {
    return props.categories.filter(category => category.remaining >= 0);
  }
});

const visibleCategories = computed(() => {
  return filteredCategories.value.slice(0, showAllCategories.value ? filteredCategories.value.length : 4);
});
</script>

<style scoped>
.category-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.categories-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.category-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.category-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.category-header .amount {
  font-weight: 600;
  color: var(--text-success);
}

.category-header .amount.negative {
  color: var(--text-error);
}

.category-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  height: 8px;
  background: var(--surface-variant);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill.over-budget {
  background: var(--color-error);
}

.progress-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.category-transactions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  padding: 0.75rem;
  background: var(--surface-hover);
  border-radius: 8px;
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-payee {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.transaction-amount {
  font-weight: 600;
  font-size: 0.875rem;
}

.view-more {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: center;
  padding: 0.5rem;
}

.no-transactions {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: center;
  padding: 1rem;
  background: var(--surface-hover);
  border-radius: 8px;
}

.show-more {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.show-more-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.show-more-button:hover {
  background: var(--surface-hover);
}

@media (min-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .section-header {
    flex-wrap: nowrap;
  }
}

@media (min-width: 1280px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style> 