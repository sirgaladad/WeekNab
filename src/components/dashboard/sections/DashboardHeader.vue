<template>
  <div class="dashboard-header">
    <div class="logo-container">
      WeekNab
    </div>
    <div class="sync-badge">
      <span class="sync-dot"></span>
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string;
}>();
</script>

<style scoped>
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 80px;
}

.logo-container {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  min-height: 48px;
}

.sync-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  background: rgba(74, 222, 128, 0.1);
  color: #4ADE80;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
}

.sync-dot {
  width: 8px;
  height: 8px;
  background: #4ADE80;
  border-radius: 50%;
}

@media (max-width: 767px) {
  .dashboard-header {
    padding: 1rem;
    min-height: 64px;
    gap: 0.5rem;
  }
  
  .logo-container {
    font-size: 1.5rem;
    min-height: 40px;
  }
}
</style> 