<template>
  <section class="features">
    <div class="container">
      <h2>Why Choose <span class="highlight">WeekNab</span></h2>
      <p class="section-desc">
        WeekNab transforms your YNAB experience by breaking down monthly budgets into weekly insights that help you make better financial decisions.
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
          <h3>Weekly Breakdown</h3>
          <p>See your budget broken down into weekly chunks, making it easier to pace your spending throughout the month.</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-number">4x</span>
              <span class="stat-text">better clarity</span>
            </div>
          </div>
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
          <h3>Smart Insights</h3>
          <p>Get personalized recommendations based on your spending patterns to help you stay on track.</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-number">68%</span>
              <span class="stat-text">improved budgeting</span>
            </div>
          </div>
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
          <p>Understand which spending categories need attention with detailed weekly category breakdowns.</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-number">85%</span>
              <span class="stat-text">better awareness</span>
            </div>
          </div>
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
          <p>Review your recent transactions and understand how they impact your weekly budget in real-time.</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-number">57%</span>
              <span class="stat-text">less overspending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props or state needed for this component
</script>

<style scoped>
.features {
  padding: 5rem 0;
  background: var(--background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text);
}

.highlight {
  background: linear-gradient(to right, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-desc {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.6;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: left;
  transition: var(--transition-all);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(8px);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--primary);
  opacity: 0;
  transition: var(--transition-all);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: var(--primary);
  background: var(--primary-transparent);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text);
}

p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-stats {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text);
  font-family: var(--font-mono);
}

.stat-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: 2rem;
  }

  .section-desc {
    font-size: 1rem;
  }
}
</style> 