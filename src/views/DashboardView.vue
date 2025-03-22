<template>
  <div class="dashboard">
    <WeeklyDashboard :is-demo-mode="isDemoMode" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import WeeklyDashboard from '@/components/dashboard/WeeklyDashboard.vue'
import { isDemoMode } from '@/demo-mode'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  // Check if we need to redirect based on auth state
  if (!authStore.isAuthenticated && !route.query.demo) {
    console.log('Not authenticated, redirecting to demo')
    router.push({ name: 'demo' })
  }
  
  console.log('Dashboard mode:', isDemoMode ? 'Demo' : 'Authenticated')
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style> 