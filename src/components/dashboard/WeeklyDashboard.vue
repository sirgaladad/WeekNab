<template>
  <div class="weekly-dashboard">
    <div class="dashboard-header">
      <h1>Weekly Budget Overview</h1>
      <div class="budget-overview">
        <div class="budget-item">
          <span class="label">Total Budget</span>
          <span class="value">${{ totalBudget }}</span>
        </div>
        <div class="budget-item">
          <span class="label">Total Spent</span>
          <span class="value">${{ totalSpent }}</span>
        </div>
      </div>
    </div>

    <div class="categories-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-header">
          <h3>{{ category.name }}</h3>
          <div class="category-amount">
            <span class="spent">${{ category.spent }}</span>
            <span class="budgeted">/ ${{ category.budgeted }}</span>
          </div>
        </div>
        <div class="progress-bar">
          <div 
            class="progress" 
            :style="{ width: `${category.percentageSpent}%` }"
            :class="{ 'over-budget': category.spent > category.budgeted }"
          ></div>
        </div>
        <div class="category-footer">
          <span class="remaining">${{ category.remaining }} remaining</span>
          <span class="percentage">{{ category.percentageSpent }}%</span>
        </div>
      </div>
    </div>

    <div class="insights-section">
      <InsightsContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { WeeklyBudgetData, CategoryData } from '@/types/budget'
import { DemoDataService } from '@/services/DemoDataService'
import InsightsContainer from '@/components/insights/InsightsContainer.vue'

const weeklyData = ref<WeeklyBudgetData>({
  totalBudget: 0,
  totalSpent: 0,
  remainingBudget: 0,
  categories: [],
  dailySpending: []
})

const categories = ref<CategoryData[]>([])

onMounted(async () => {
  const data = await DemoDataService.getWeeklyData()
  weeklyData.value = data
  categories.value = data.categories
})

const totalBudget = computed(() => weeklyData.value.totalBudget)
const totalSpent = computed(() => weeklyData.value.totalSpent)
</script>

<style scoped>
.weekly-dashboard {
  padding: 2rem;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.budget-overview {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.budget-item {
  display: flex;
  flex-direction: column;
}

.budget-item .label {
  font-size: 0.875rem;
  color: #666;
}

.budget-item .value {
  font-size: 1.5rem;
  font-weight: 600;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.category-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-header h3 {
  margin: 0;
  font-size: 1rem;
}

.category-amount {
  font-size: 0.875rem;
}

.category-amount .spent {
  font-weight: 600;
}

.category-amount .budgeted {
  color: #666;
}

.progress-bar {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 0.5rem;
}

.progress {
  height: 100%;
  background: #4CAF50;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress.over-budget {
  background: #f44336;
}

.category-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666;
}

.insights-section {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .weekly-dashboard {
    padding: 1rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style> 