<template>
  <div class="insights-container">
    <div class="insights-header">
      <h2 class="budget-title">Weekly Insights</h2>
      
      <div class="filter-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :class="['filter-tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>

    <div class="insights-grid">
      <InsightCard
        v-for="insight in filteredInsights"
        :key="insight.id"
        :type="insight.type"
        :category="insight.category"
        :title="insight.title"
        :description="insight.description"
        :impact="insight.impact"
        :trend="insight.trend"
      />
    </div>

    <div v-if="filteredInsights.length === 0" class="no-insights">
      <p>No {{ activeTab !== 'all' ? activeTab : '' }} insights available for this week.</p>
    </div>

    <router-link to="/insights" class="view-all-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" fill="#4CAF50"/>
      </svg>
      View All Insights
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue'
import InsightCard from './InsightCard.vue'

const activeTab = ref('all')

const tabs = [
  { id: 'all', name: 'All' },
  { id: 'savings', name: 'Savings' },
  { id: 'alert', name: 'Alerts' }
]

const insights = [
  {
    id: 1,
    type: 'savings',
    category: 'Groceries',
    title: 'Spent 15% less on groceries',
    description: 'You spent $25 less on groceries compared to last week.',
    impact: '+$25',
    trend: 'positive'
  },
  {
    id: 2,
    type: 'alert',
    category: 'Entertainment',
    title: 'Entertainment budget exceeded',
    description: 'You exceeded your entertainment budget by $27.50 this week.',
    impact: '-$27.50',
    trend: 'negative'
  },
  {
    id: 3,
    type: 'savings',
    category: 'Transportation',
    title: 'Lower transportation costs',
    description: 'Using public transit saved you money this week.',
    impact: '+$15',
    trend: 'positive'
  },
  {
    id: 4,
    type: 'alert',
    category: 'Shopping',
    title: 'Shopping budget exceeded',
    description: 'You spent $93.23 over your shopping budget this week.',
    impact: '-$93.23',
    trend: 'negative'
  }
]

const filteredInsights = computed(() => {
  if (activeTab.value === 'all') {
    return insights
  }
  return insights.filter(insight => insight.type === activeTab.value)
})

defineExpose({
  activeTab,
  tabs,
  filteredInsights
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'InsightsContainer'
})
</script>

<style scoped>
.insights-container {
  margin-top: 2rem;
  background: #1A1D23;
  border-radius: 1rem;
  padding: 2rem;
}

.insights-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.budget-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #FFFFFF;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
}

.filter-tab {
  padding: 0.75rem 2rem;
  border: none;
  background: #242731;
  color: #94A3B8;
  border-radius: 2rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab:hover {
  color: #FFFFFF;
}

.filter-tab.active {
  background: #3B82F6;
  color: #FFFFFF;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.no-insights {
  text-align: center;
  color: #94A3B8;
  padding: 2rem 0;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4CAF50;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 1rem;
}

.view-all-link svg {
  stroke: currentColor;
}

@media (max-width: 768px) {
  .insights-container {
    padding: 1rem;
  }

  .budget-title {
    font-size: 1.5rem;
  }

  .insights-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filter-tabs {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .filter-tab {
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .insights-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style> 