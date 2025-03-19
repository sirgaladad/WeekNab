<template>
  <div class="action-buttons">
    <router-link 
      :to="`/budgets/${budgetId}/weekly`"
      class="action-button primary"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      View Weekly Budget
    </router-link>
    
    <router-link 
      :to="`/budgets/${budgetId}/transactions`"
      class="action-button secondary"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
      View All Transactions
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  budgetId: string
}>()
</script>

<style scoped>
.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-button.primary {
  background: var(--primary);
  color: white;
}

.action-button.secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style> 