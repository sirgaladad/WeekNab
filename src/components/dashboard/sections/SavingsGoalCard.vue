<template>
  <div class="goal-progress">
    <h2>Monthly Savings Goal</h2>
    <div class="goal-content">
      <div class="goal-info">
        <div class="goal-amount">
          <span class="label">Goal:</span>
          <span class="value">${{ goalAmount.toFixed(2) }}</span>
        </div>
        <div class="goal-contribution">
          <span class="label">This week:</span>
          <span class="value" :class="{ positive: weeklyContribution > 0 }">
            {{ weeklyContribution > 0 ? '+' : '' }}${{ weeklyContribution.toFixed(2) }}
          </span>
        </div>
      </div>
      <div class="progress-container">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <div class="progress-label">{{ progressPercentage }}% complete</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  goalAmount: number;
  currentSaved: number;
  weeklyContribution: number;
}

const props = defineProps<Props>();

const progressPercentage = computed(() => {
  if (props.goalAmount === 0) return 0;
  const percentage = (props.currentSaved / props.goalAmount) * 100;
  return Math.min(Math.round(percentage), 100);
});
</script>

<style scoped>
.goal-progress {
  background: var(--surface);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.goal-progress h2 {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.goal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.goal-info {
  display: flex;
  justify-content: space-between;
}

.goal-amount,
.goal-contribution {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.value {
  font-size: 1.25rem;
  font-weight: 600;
}

.value.positive {
  color: #10B981;
}

.progress-container {
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

.progress-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: right;
}
</style> 