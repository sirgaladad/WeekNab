<template>
  <div class="insight-item" :class="{ 'alert': type === 'alert' }">
    <div class="insight-header">
      <div class="insight-type">
        <svg v-if="type === 'savings'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 20V4M4 12l8-8 8 8" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 4v16m0-16l-4 4m4-4l4 4" />
        </svg>
        {{ type === 'savings' ? 'Savings' : 'Alert' }}
      </div>
      <div class="insight-category">{{ category }}</div>
    </div>
    
    <div class="insight-body">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>

    <div class="insight-footer">
      <div class="impact" :class="{ positive: impact > 0 }">
        {{ impact > 0 ? '+' : '' }}${{ Math.abs(impact).toFixed(2) }}
      </div>
      <div class="trend" v-if="trend">
        <span class="trend-value" :class="{ positive: trend > 0 }">
          {{ trend > 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}%
        </span>
        vs last week
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InsightCard',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['savings', 'alert'].includes(value)
    },
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    impact: {
      type: Number,
      required: true
    },
    trend: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>
.insight-item {
  background: #242731;
  border-radius: 1rem;
  padding: 1.5rem;
}

.insight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.insight-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: 0.875rem;
}

.insight-type svg {
  stroke: currentColor;
}

.insight-category {
  font-size: 0.875rem;
  color: #94A3B8;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  font-weight: 500;
}

.insight-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #FFFFFF;
}

.insight-body p {
  font-size: 1rem;
  line-height: 1.5;
  color: #94A3B8;
  margin-bottom: 1.25rem;
}

.insight-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.impact {
  font-size: 1.375rem;
  font-weight: 600;
  color: #ef4444;
}

.impact.positive {
  color: #10b981;
}

.trend {
  font-size: 0.875rem;
  color: #94A3B8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.trend-value {
  color: #ef4444;
  font-weight: 600;
}

.trend-value.positive {
  color: #10b981;
}
</style> 