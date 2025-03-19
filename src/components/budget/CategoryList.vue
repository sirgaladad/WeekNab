<template>
  <section class="section">
    <h2>Categories</h2>
    <div class="categories">
      <div
        v-for="group in categories"
        :key="group.id"
        class="category-group"
      >
        <h3>{{ group.name }}</h3>
        <div class="category-list">
          <div
            v-for="category in group.categories || []"
            :key="category.id"
            class="category-item"
          >
            <div class="category-info">
              <span class="category-name">{{ category.name }}</span>
              <span
                class="category-balance"
                :class="{ negative: category.balance < 0 }"
              >
                {{ formatCurrency(category.balance) }}
              </span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress" 
                :style="{ width: `${Math.min(100, (category.activity / (category.budgeted || 1)) * 100)}%` }"
                :class="{ warning: category.balance < 0 }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CategoryGroup } from 'ynab'
import { formatCurrency } from '@/utils/currency'

defineProps<{
  categories: CategoryGroup[]
}>()
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

.category-group {
  margin-bottom: 1.5rem;
}

.category-group:last-child {
  margin-bottom: 0;
}

h3 {
  font-size: 1.125rem;
  color: var(--text);
  margin: 0 0 0.75rem 0;
}

.category-list {
  display: grid;
  gap: 0.75rem;
}

.category-item {
  background: var(--background);
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--border);
}

.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.category-name {
  font-weight: 500;
  color: var(--text);
  font-size: 0.875rem;
}

.category-balance {
  font-weight: 600;
  color: var(--success);
  font-size: 0.875rem;
}

.category-balance.negative {
  color: var(--error);
}

.progress-bar {
  height: 4px;
  background: var(--surface);
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--success);
  transition: width 0.3s ease;
}

.progress.warning {
  background: var(--error);
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

  .category-group {
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .category-list {
    gap: 1rem;
  }

  .category-item {
    padding: 1rem;
  }

  .category-name,
  .category-balance {
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .category-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (min-width: 1024px) {
  .section {
    padding: 2rem;
  }

  .category-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style> 