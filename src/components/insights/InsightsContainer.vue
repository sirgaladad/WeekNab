<template>
  <div class="insights-section">
    <div class="section-header">
      <h2>Insights</h2>
      <div class="filter-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
          class="tab-button"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="insights-grid">
      <InsightCard
        v-for="insight in filteredInsights"
        :key="insight.id"
        v-bind="insight"
      />
    </div>

    <div class="insights-link">
      <router-link to="/insights" class="link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 4v16m0-16l-4 4m4-4l4 4" />
        </svg>
        View All Insights
      </router-link>
    </div>
    <div class="budget-title">
      <div>
        <h3>Weekly Insights</h3>
        <p>Your spending habits and savings progress</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InsightCard from './InsightCard.vue';

interface Insight {
  id: number;
  type: 'savings' | 'alert';
  category: string;
  title: string;
  description: string;
  impact: number;
  trend?: number;
}

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'savings', label: 'Savings' },
  { id: 'alerts', label: 'Alerts' }
];

const activeTab = ref('all');

const insights: Insight[] = [
  {
    id: 1,
    type: 'savings',
    category: 'Groceries',
    title: 'Under budget this week',
    description: 'You spent less on groceries compared to your usual spending.',
    impact: 25.50,
    trend: -15
  },
  {
    id: 2,
    type: 'alert',
    category: 'Dining Out',
    title: 'Higher than usual spending',
    description: 'Your dining out expenses are trending higher than last week.',
    impact: -45.75,
    trend: 25
  }
];

const filteredInsights = computed(() => {
  if (activeTab.value === 'all') return insights;
  return insights.filter(insight => 
    activeTab.value === 'savings' ? insight.type === 'savings' : insight.type === 'alert'
  );
});
</script>

<style scoped>
.insights-section {
  margin-top: 2rem;
  background: #1A1D23;
  border-radius: 1rem;
  padding: 1.5rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  background: #242731;
  padding: 0.5rem;
  border-radius: 2rem;
  width: fit-content;
}

.tab-button {
  padding: 0.75rem 2rem;
  border: none;
  background: none;
  color: #94A3B8;
  border-radius: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #FFFFFF;
}

.tab-button.active {
  background: #3B82F6;
  color: #FFFFFF;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.insights-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.insights-link .link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94A3B8;
  text-decoration: none;
  font-size: 0.875rem;
}

.insights-link .link svg {
  stroke: currentColor;
}

.budget-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.budget-title div {
  text-align: center;
}

.budget-title h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.budget-title p {
  font-size: 1rem;
  color: #94A3B8;
}

@media (max-width: 768px) {
  .insights-section {
    padding: 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .filter-tabs {
    padding: 0.375rem;
  }

  .tab-button {
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
  }
}
</style> 