<template>
  <div class="spending-chart">
    <h2>Daily Spending</h2>
    <div class="chart-wrapper">
      <div class="threshold-line">
        <div class="threshold-label">${{ thresholdAmount }} threshold</div>
      </div>
      <div class="chart-container">
        <div
          v-for="(day, index) in dailySpending"
          :key="index"
          class="chart-column"
        >
          <div
            class="day-amount"
            :class="{ 'over-threshold': day.amount > thresholdAmount }"
          >
            ${{ Math.round(day.amount) }}
          </div>
          <div class="bar-container">
            <div
              class="bar"
              :style="{ height: calculateBarHeight(day.amount) }"
              :class="{ 'over-threshold': day.amount > thresholdAmount }"
            ></div>
          </div>
          <div class="day-label">{{ day.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

interface DailySpending {
  label: string;
  amount: number;
  date: string;
}

interface Props {
  dailySpending: DailySpending[];
  thresholdAmount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  thresholdAmount: 400
});

const maxAmount = computed(() => {
  return Math.max(...props.dailySpending.map(day => day.amount), props.thresholdAmount);
});

const calculateBarHeight = (amount: number) => {
  // Calculate height percentage (max 85% of container)
  const heightPercentage = (amount / maxAmount.value) * 85;
  return `${heightPercentage}%`;
};
</script>

<style scoped>
.spending-chart {
  background: var(--surface);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.spending-chart h2 {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.chart-wrapper {
  position: relative;
  height: 250px;
  margin-top: 2rem;
}

.threshold-line {
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
  border-top: 1px dashed var(--text-error);
  z-index: 1;
}

.threshold-label {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 0.875rem;
  color: var(--text-error);
  background: var(--surface);
  padding: 0 0.5rem;
}

.chart-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 2;
}

.chart-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.day-amount {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.day-amount.over-threshold {
  color: var(--text-error);
}

.bar-container {
  height: 85%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.5rem;
}

.bar {
  width: 32px;
  background: var(--primary);
  border-radius: 8px 8px 0 0;
  transition: height 0.3s ease;
}

.bar.over-threshold {
  background: var(--color-error);
}

.day-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

@media (max-width: 767px) {
  .chart-wrapper {
    height: 200px;
    overflow-x: auto;
  }
  
  .chart-container {
    min-width: 500px;
  }
  
  .bar {
    width: 28px;
  }
}
</style> 