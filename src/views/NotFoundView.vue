<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <div class="not-found-content">
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div class="actions">
        <router-link to="/" class="btn">Return Home</router-link>
        <button @click="goBack" class="btn">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found {
  padding: 2rem;
  text-align: center;
}

.not-found h1 {
  font-size: 4rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.not-found-content {
  max-width: 400px;
  margin: 0 auto;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

@media (max-width: 768px) {
  .not-found h1 {
    font-size: 3rem;
  }

  .not-found p {
    font-size: 1.25rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style> 