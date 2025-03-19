<template>
  <section class="cta">
    <div class="cta-content">
      <h2>Ready to Get Started?</h2>
      <p>Take control of your weekly budget today and start achieving your financial goals.</p>
      
      <div class="cta-buttons">
        <router-link to="/demo" class="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          Try Demo
        </router-link>
        
        <router-link to="/login" class="btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          Get Started
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic here if needed
</script>

<style scoped>
.cta {
  padding: 4rem 1rem;
  text-align: center;
  background: var(--surface);
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--background);
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

@media (min-width: 640px) {
  .cta {
    padding: 6rem 1rem;
  }

  h2 {
    font-size: 3rem;
  }

  p {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .cta {
    padding: 8rem 1rem;
  }

  h2 {
    font-size: 3.5rem;
  }

  p {
    font-size: 1.75rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 1.25rem 2.5rem;
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .cta {
    padding: 10rem 1rem;
  }

  h2 {
    font-size: 4rem;
  }
}
</style> 