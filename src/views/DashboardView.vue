<template>
  <div class="dashboard">
    <WeeklyDashboard />
  </div>
</template>

<script setup lang="ts">
import WeeklyDashboard from '@/components/dashboard/WeeklyDashboard.vue'
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 