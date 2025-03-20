<template>
  <div class="budget-summary">
    <div class="budget-status">
      <div class="status-message" :class="{ negative: remainingBudget < 0 }">
        {{ remainingBudget >= 0 ? "You're doing okay" : "You're over budget" }}
      </div>
    </div>

    <div class="budget-amount">
      <div class="amount-wrapper">
        <span class="currency">$</span>
        <span class="amount" :class="{ negative: remainingBudget < 0 }">
          {{ Math.abs(remainingBudget).toFixed(2) }}
        </span>
      </div>
      <div class="amount-label">
        {{ remainingBudget >= 0 ? 'Remaining' : 'Over Budget' }}
      </div>
    </div>

    <div class="budget-details">
      <div class="budget-detail">
        <div class="detail-label">Total Budget</div>
        <div class="detail-value">${{ totalBudget.toFixed(2) }}</div>
      </div>
      <div class="budget-detail">
        <div class="detail-label">Spent So Far</div>
        <div class="detail-value">${{ totalSpent.toFixed(2) }}</div>
      </div>
    </div>

    <div class="budget-progress">
      <div class="progress-bar">
        <div 
          class="progress-fill"
          :style="{ width: `${Math.min(spentPercentage, 100)}%` }"
          :class="{ 'over-budget': remainingBudget < 0 }"
        ></div>
      </div>
      <div class="progress-label">
        {{ Math.round(spentPercentage) }}% of budget spent
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
}

const props = defineProps<Props>();

const spentPercentage = computed(() => {
  if (props.totalBudget === 0) return 0;
  return (props.totalSpent / props.totalBudget) * 100;
});
</script>

<style scoped>
.budget-summary {
  padding: 1.5rem;
  background: var(--surface);
  border-radius: 16px;
  margin-bottom: 2rem;
}

.budget-status {
  margin-bottom: 1rem;
  text-align: center;
}

.status-message {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(74, 222, 128, 0.1);
  color: #4ADE80;
  border-radius: 8px;
  font-weight: 500;
}

.status-message.negative {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.budget-amount {
  text-align: center;
  margin: 1.5rem 0;
}

.amount-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.currency {
  font-size: 2rem;
  font-weight: 600;
  margin-right: 0.25rem;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
  color: #4ADE80;
}

.amount.negative {
  color: #EF4444;
}

.amount-label {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.budget-details {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.budget-detail {
  text-align: center;
  flex: 1;
}

.detail-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.25rem;
  font-weight: 600;
}

.budget-progress {
  margin-top: 1.5rem;
}

.progress-bar {
  height: 8px;
  background: var(--surface-variant);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #4ADE80;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill.over-budget {
  background: #EF4444;
}

.progress-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: right;
}

@media (max-width: 767px) {
  .currency {
    font-size: 1.75rem;
  }
  
  .amount {
    font-size: 2.5rem;
  }
  
  .budget-details {
    padding: 0.5rem 0;
  }
}
</style> 