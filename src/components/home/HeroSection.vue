<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <h1>Take Control of Your Weekly Budget</h1>
        <p class="subtitle">Simple, intuitive weekly budgeting that helps you stay on track and achieve your financial goals.</p>
        
        <div class="cta-buttons">
          <router-link to="/demo" class="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            Try Demo
          </router-link>
          
          <router-link to="/about" class="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Learn More
          </router-link>
        </div>
      </div>
      
      <div class="hero-image">
        <img src="@/assets/images/WeeklyDashboardMobileView.png" alt="WeekNab Weekly Budget Dashboard" class="dashboard-preview" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component logic here if needed
</script>

<style scoped>
.hero {
  padding: 6rem 1rem 4rem;
  background: var(--background);
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  text-align: left;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--background);
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.dashboard-preview {
  max-width: 375px;
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
  h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.125rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
    min-height: auto;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-text {
    text-align: center;
    order: 1;
  }

  h1 {
    font-size: 2.5rem;
  }

  .cta-buttons {
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    justify-content: center;
    width: 100%;
  }

  .hero-image {
    order: 0;
  }

  .dashboard-preview {
    max-width: 320px;
  }
}
</style> 