<template>
  <div class="insights-demo">
    <!-- Time Period Selector -->
    <div class="time-selector">
      <button class="time-btn active">This Week</button>
      <button class="time-btn">Last Week</button>
      <button class="time-btn">Last Month</button>
    </div>

    <!-- Spending Overview -->
    <div class="spending-overview">
      <h2>Spending Overview</h2>
      <div class="overview-cards">
        <div class="overview-card">
          <div class="card-header">
            <i class="fas fa-chart-line"></i>
            <span class="label">Total Spent</span>
          </div>
          <span class="amount">$552.50</span>
          <span class="trend positive">
            <i class="fas fa-arrow-down"></i>
            12% less than last week
          </span>
        </div>
        <div class="overview-card">
          <div class="card-header">
            <i class="fas fa-bullseye"></i>
            <span class="label">Budget Status</span>
          </div>
          <span class="amount">65%</span>
          <span class="trend">of weekly budget used</span>
        </div>
        <div class="overview-card">
          <div class="card-header">
            <i class="fas fa-wallet"></i>
            <span class="label">Remaining</span>
          </div>
          <span class="amount">$297.50</span>
          <span class="trend">for this week</span>
        </div>
      </div>
    </div>

    <!-- Category Analysis -->
    <div class="category-analysis">
      <div class="section-header">
        <h2>Category Analysis</h2>
        <div class="legend">
          <span class="legend-item">
            <span class="dot essential"></span>
            Essential
          </span>
          <span class="legend-item">
            <span class="dot discretionary"></span>
            Discretionary
          </span>
        </div>
      </div>
      <div class="category-chart">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-bar"
        >
          <div class="bar-label">
            <i :class="category.icon"></i>
            <span>{{ category.name }}</span>
          </div>
          <div class="bar-container">
            <div 
              class="bar"
              :class="category.type"
              :style="{ width: getPercentage(category.spent, category.budget) }"
            ></div>
            <span class="bar-amount">${{ category.spent }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Insights -->
    <div class="insights-section">
      <h2>Smart Insights</h2>
      <div class="insights-list">
        <div class="insight-card warning">
          <i class="fas fa-exclamation-circle"></i>
          <div class="insight-content">
            <h3>Dining Out Alert</h3>
            <p>You've spent 88% of your dining budget this week. Consider cooking at home for the remaining days.</p>
          </div>
        </div>
        <div class="insight-card success">
          <i class="fas fa-check-circle"></i>
          <div class="insight-content">
            <h3>Transportation Savings</h3>
            <p>Great job! You're under budget on transportation this week, saving $54.25.</p>
          </div>
        </div>
        <div class="insight-card info">
          <i class="fas fa-lightbulb"></i>
          <div class="insight-content">
            <h3>Spending Pattern</h3>
            <p>Most of your discretionary spending happens on weekends. Plan ahead to stay within budget.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Category {
  id: string
  name: string
  icon: string
  spent: number
  budget: number
  type: 'essential' | 'discretionary'
}

const categories: Category[] = [
  {
    id: 'groceries',
    name: 'Groceries',
    icon: 'fas fa-shopping-cart',
    spent: 175.50,
    budget: 200,
    type: 'essential'
  },
  {
    id: 'dining',
    name: 'Dining Out',
    icon: 'fas fa-utensils',
    spent: 132.25,
    budget: 150,
    type: 'discretionary'
  },
  {
    id: 'transport',
    name: 'Transportation',
    icon: 'fas fa-bus',
    spent: 45.75,
    budget: 100,
    type: 'essential'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'fas fa-film',
    spent: 89.00,
    budget: 100,
    type: 'discretionary'
  }
]

const getPercentage = (spent: number, budget: number): string => {
  const percentage = (spent / budget) * 100
  return percentage + '%'
}
</script>

<style scoped>
.insights-demo {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  background: var(--background);
  overflow-y: auto;
}

.time-selector {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--surface);
  border-radius: 8px;
}

.time-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  background: none;
  color: var(--text-secondary);
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-btn.active {
  background: var(--primary);
  color: white;
}

.spending-overview h2,
.category-analysis h2,
.insights-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.overview-card {
  background: var(--surface);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.card-header i {
  font-size: 1rem;
}

.overview-card .amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.overview-card .trend {
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trend.positive {
  color: rgb(34, 197, 94);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.legend {
  display: flex;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.essential {
  background: var(--primary);
}

.dot.discretionary {
  background: var(--warning);
}

.category-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bar-label {
  width: 120px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.bar-label i {
  color: var(--text-secondary);
}

.bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bar {
  height: 8px;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.bar.essential {
  background: var(--primary);
}

.bar.discretionary {
  background: var(--warning);
}

.bar-amount {
  font-size: 0.875rem;
  color: var(--text-secondary);
  width: 60px;
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.insight-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface);
  border-radius: 8px;
  border-left: 4px solid transparent;
}

.insight-card i {
  font-size: 1.5rem;
}

.insight-card.warning {
  border-color: rgb(234, 179, 8);
}

.insight-card.warning i {
  color: rgb(234, 179, 8);
}

.insight-card.success {
  border-color: rgb(34, 197, 94);
}

.insight-card.success i {
  color: rgb(34, 197, 94);
}

.insight-card.info {
  border-color: rgb(59, 130, 246);
}

.insight-card.info i {
  color: rgb(59, 130, 246);
}

.insight-content h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

.insight-content p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

@media (max-width: 640px) {
  .overview-cards {
    grid-template-columns: 1fr;
  }

  .bar-label {
    width: 100px;
  }
}
</style> 