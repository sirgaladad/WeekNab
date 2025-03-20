<template>
  <div class="category-list">
    <div v-for="group in categoryGroups" :key="group.id" class="category-group">
      <h3 class="group-name">{{ group.name }}</h3>
      <div class="categories">
        <div 
          v-for="category in group.categories" 
          :key="category.id" 
          class="category-item"
          :class="{ 'hidden': category.hidden }"
        >
          <div class="category-header">
            <span class="category-name">{{ category.name }}</span>
            <span class="category-amount">
              {{ formatCurrency(category.budgeted) }}
            </span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress" 
              :style="{ width: `${(category.spent / category.budgeted) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtendedCategoryGroup } from '@/types/budget'

defineProps<{
  categoryGroups: ExtendedCategoryGroup[]
}>()

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
</script>

<style scoped>
.category-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.group-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item.hidden {
  opacity: 0.5;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-name {
  font-weight: 500;
  color: var(--text);
}

.category-amount {
  color: var(--text-secondary);
}

.progress-bar {
  height: 8px;
  background: var(--background);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}
</style> 