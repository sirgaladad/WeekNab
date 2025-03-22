<template>
  <div class="demo-view">
    <div class="demo-banner">
      <p>👋 You're viewing WeekNab in demo mode. <a href="#" @click.prevent="connectYNAB">Connect your YNAB account</a> to get started with your own data.</p>
    </div>
    
    <WeeklyDashboard :is-demo-mode="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import WeeklyDashboard from '@/components/dashboard/WeeklyDashboard.vue'

const router = useRouter()

const connectYNAB = () => {
  router.push({ name: 'login' })
}
</script>

<style scoped>
.demo-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.demo-banner {
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.demo-banner p {
  margin: 0;
  color: #0369a1;
}

.demo-banner a {
  color: #0284c7;
  text-decoration: underline;
  font-weight: 500;
}

.demo-banner a:hover {
  color: #0369a1;
}
</style> 