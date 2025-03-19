<template>
  <section class="features">
    <div class="container">
      <h2>Key Features</h2>
      <p class="section-desc">
        WeekNab makes your YNAB experience more intuitive by breaking down monthly budgets into weekly insights.
      </p>
      
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21M4 21H20M12 12H12.01M12 16H12.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h3>Weekly Overview</h3>
          <p>See your budget broken down into weekly chunks for easier tracking.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h3>Budget Insights</h3>
          <p>Get intelligent recommendations based on your spending patterns.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M16 8V14M8 8V14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h3>Category Analysis</h3>
          <p>Understand which spending categories need your attention.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h3>Transaction Feed</h3>
          <p>Review recent transactions and how they impact your weekly budget.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props or state needed for this component
</script>

<script lang="ts">
export default {
  name: 'KeyFeatures'
}
</script>

<style scoped>
.features {
  padding: 4rem 0;
  background: var(--surface);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.section-desc {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.feature-card {
  background: var(--background);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 40px;
  height: 40px;
  margin: 0 0 1rem 0;
  color: var(--primary);
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text);
}

p {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features {
    padding: 3rem 0;
  }

  h2 {
    font-size: 2rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-card {
    padding: 1.25rem;
    text-align: center;
  }

  .feature-icon {
    margin: 0 auto 1rem;
  }
}
</style> 