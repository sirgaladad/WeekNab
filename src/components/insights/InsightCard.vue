<template>
  <div class="insight-item" :class="[type]">
    <div class="insight-header">
      <div class="insight-type">
        <svg v-if="type === 'savings'" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.3 13.2L13.4 17.1C12.8 17.7 11.9 17.7 11.3 17.1L6.7 12.5C6.3 12.1 6.3 11.5 6.7 11.1C7.1 10.7 7.7 10.7 8.1 11.1L12 15L15.2 11.8C15.6 11.4 16.2 11.4 16.6 11.8C17 12.2 17 12.8 16.6 13.2H17.3Z" fill="#4CAF50"/>
        </svg>
        <svg v-if="type === 'alert'" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#EB4747"/>
        </svg>
        <span>{{ type === 'savings' ? 'Saving' : 'Alert' }}</span>
      </div>
      <div class="insight-category">{{ category }}</div>
    </div>
    <div class="insight-body">
      <h3 class="insight-title">{{ title }}</h3>
      <p class="insight-description">{{ description }}</p>
    </div>
    <div class="insight-footer">
      <div class="insight-impact" :class="{ positive: trend === 'positive', negative: trend === 'negative' }">
        {{ impact }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ['savings', 'alert'].includes(value)
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
    type: String,
    required: true
  },
  trend: {
    type: String,
    required: true,
    validator: (value: string) => ['positive', 'negative'].includes(value)
  }
})

defineExpose({
  ...props
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InsightCard'
})
</script>

<style scoped>
.insight-item {
  background: #242731;
  border-radius: 8px;
  padding: 1.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.insight-item.savings {
  border-left: 4px solid #4CAF50;
}

.insight-item.alert {
  border-left: 4px solid #EB4747;
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
  font-size: 0.875rem;
  font-weight: 500;
}

.insight-type svg {
  margin-right: 0.25rem;
}

.savings .insight-type {
  color: #4CAF50;
}

.alert .insight-type {
  color: #EB4747;
}

.insight-category {
  font-size: 0.75rem;
  color: #B4B7C3;
  background: #2E303A;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.insight-body {
  margin-bottom: 1rem;
  flex-grow: 1;
}

.insight-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.insight-description {
  font-size: 0.875rem;
  color: #B4B7C3;
  line-height: 1.5;
}

.insight-footer {
  display: flex;
  justify-content: flex-end;
}

.insight-impact {
  font-size: 1rem;
  font-weight: 600;
}

.insight-impact.positive {
  color: #4CAF50;
}

.insight-impact.negative {
  color: #EB4747;
}

@media (max-width: 768px) {
  .insight-item {
    padding: 1rem;
  }
  
  .insight-title {
    font-size: 1rem;
  }
  
  .insight-description {
    font-size: 0.8125rem;
  }
}
</style> 