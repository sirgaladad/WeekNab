<template>
  <div class="weekly-dashboard">
    <DashboardHeader status="Demo" />

    <div class="dashboard-content">
      <h1 class="weekly-budget-title">Weekly Budget</h1>
      
      <WeekNavigation 
        :date-range-text="formatDateRange" 
        :days-remaining="daysLeft"
        :is-current-week="isCurrentWeek"
        @previous-week="loadPreviousWeek"
        @next-week="loadNextWeek"
      />

      <BudgetSummary 
        :total-budget="totalBudget"
        :total-spent="totalSpent"
        :remaining-budget="remainingBudget"
      />

      <CategorySection :categories="categories" />

      <div class="weekly-insights">
        <DailySpendingChart :daily-spending="dailySpending" />
        
        <SavingsGoalCard 
          :goal-amount="500"
          :current-saved="350"
          :weekly-contribution="125"
        />

        <InsightsContainer />
      </div>
    </div>

    <DashboardFooter 
      :show-toast="showToast"
      :toast-message="toastMessage"
      @exit="handleExit"
      @try-now="handleTryNow"
      @close-toast="showToast = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { DemoDataService } from '@/services/DemoDataService';
import { useRouter } from 'vue-router';
import InsightsContainer from '@/components/insights/InsightsContainer.vue';
import DashboardHeader from './sections/DashboardHeader.vue';
import WeekNavigation from './sections/WeekNavigation.vue';
import BudgetSummary from './sections/BudgetSummary.vue';
import CategorySection from './sections/CategorySection.vue';
import DailySpendingChart from './sections/DailySpendingChart.vue';
import SavingsGoalCard from './sections/SavingsGoalCard.vue';
import DashboardFooter from './sections/DashboardFooter.vue';
import type { CategoryData, DailySpending, DateRange } from '@/types/budget';

const router = useRouter();
const emit = defineEmits(['showLoginModal']);

// State management
const totalBudget = ref(0);
const totalSpent = ref(0);
const remainingBudget = ref(0);
const categories = ref<CategoryData[]>([]);
const dailySpending = ref<DailySpending[]>([]);
const dateRange = ref<DateRange>({
  start: new Date(),
  end: new Date()
});
const daysLeft = ref(0);
const isCurrentWeek = ref(true);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');
let toastTimeout: number | null = null;

// Computed properties
const formatDateRange = computed(() => {
  if (!dateRange.value.start || !dateRange.value.end) return '';
  
  const start = dateRange.value.start;
  const end = dateRange.value.end;
  
  // Format: Mar 18 - Mar 24, 2024
  const startMonth = start.toLocaleString('default', { month: 'short' });
  const endMonth = end.toLocaleString('default', { month: 'short' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();
  
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  }
});

// Methods
const loadWeekData = async () => {
  try {
    const data = await DemoDataService.getWeeklyData();
    
    if (!data) {
      console.error('No data received from DemoDataService');
      return;
    }
    
    totalBudget.value = data.totalBudget || 0;
    totalSpent.value = data.totalSpent || 0;
    remainingBudget.value = data.remainingBudget || 0;
    categories.value = data.categories || [];
    dailySpending.value = data.dailySpending || [];
    dateRange.value = data.dateRange || {
      start: new Date(),
      end: new Date()
    };
    daysLeft.value = data.daysLeft || 0;
  } catch (error) {
    console.error('Error loading weekly data:', error);
    // Set default values in case of error
    totalBudget.value = 0;
    totalSpent.value = 0;
    remainingBudget.value = 0;
    categories.value = [];
    dailySpending.value = [];
    dateRange.value = {
      start: new Date(),
      end: new Date()
    };
    daysLeft.value = 0;
  }
};

const loadPreviousWeek = () => {
  isCurrentWeek.value = false;
  console.log('Loading previous week...');
  // This would normally load the previous week's data
};

const loadNextWeek = () => {
  isCurrentWeek.value = true;
  console.log('Loading next week...');
  // This would normally load the next week's data
};

const handleExit = () => {
  router.push('/');
};

const handleTryNow = () => {
  emit('showLoginModal');
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  
  // Hide toast after 10 seconds
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    showToast.value = false;
  }, 10000);
};

// Lifecycle hooks
onMounted(async () => {
  await loadWeekData();
  
  // Show the notification after 5 seconds
  setTimeout(() => {
    showToastNotification('Want to try WeekNab with your own budget? Connect with your YNAB account now!');
  }, 5000);
});
</script>

<style scoped>
.weekly-dashboard {
  min-height: 100vh;
  background: var(--background);
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  flex: 1;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.weekly-budget-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.weekly-insights {
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .dashboard-content {
    padding: 2rem;
  }

  .weekly-insights {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
  }
  
  .weekly-insights > *:first-child {
    grid-column: 1;
    grid-row: 1 / span 2;
  }
  
  .weekly-insights > *:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }
}

@media (max-width: 767px) {
  .dashboard-content {
    padding: 1rem;
  }
  
  .weekly-budget-title {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
}
</style> 