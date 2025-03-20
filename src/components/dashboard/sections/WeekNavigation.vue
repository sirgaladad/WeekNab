<template>
  <div class="week-navigation">
    <button @click="onPreviousWeek" class="nav-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <div class="week-info">
      <h2>{{ dateRangeText }}</h2>
      <span class="days-left">{{ daysRemaining }} days left</span>
    </div>
    
    <button @click="onNextWeek" class="nav-button" :disabled="isCurrentWeek">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  dateRangeText: string;
  daysRemaining: number;
  isCurrentWeek?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['previousWeek', 'nextWeek']);

const onPreviousWeek = () => {
  emit('previousWeek');
};

const onNextWeek = () => {
  emit('nextWeek');
};
</script>

<style scoped>
.week-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--surface-hover);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.nav-button:hover:not(:disabled) {
  background: var(--surface-dark);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.week-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.week-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.days-left {
  font-size: 1rem;
  color: var(--text-secondary);
}

@media (max-width: 767px) {
  .week-navigation {
    padding: 0.75rem;
  }
  
  .nav-button {
    width: 36px;
    height: 36px;
  }
  
  .week-info h2 {
    font-size: 1.25rem;
  }
  
  .days-left {
    font-size: 0.875rem;
  }
}
</style> 