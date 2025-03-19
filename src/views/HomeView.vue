<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
                <path d="M13 11.586V8C13 7.448 12.552 7 12 7C11.448 7 11 7.448 11 8V12C11 12.266 11.105 12.52 11.293 12.707L14.293 15.707C14.488 15.902 14.744 16 15 16C15.256 16 15.512 15.902 15.707 15.707C16.098 15.316 16.098 14.684 15.707 14.293L13 11.586Z" fill="currentColor"/>
              </svg>
              <span class="logo-text">WeekNab</span>
            </div>
            <h1>Take Control of your Budget</h1>
            <p class="subtitle">
              Transform your monthly budget chaos into weekly insights to make better informed decisions.
            </p>
            <div class="cta-buttons">
              <router-link
                to="/login"
                class="btn btn-primary"
              >
                Get Started
              </router-link>
              <router-link
                to="/demo"
                class="btn btn-secondary"
              >
                Try Demo
              </router-link>
            </div>
            <p class="token-info">
              You'll need a YNAB Personal Access Token to get started.
              <a
                href="https://app.ynab.com/settings/developer"
                target="_blank"
                rel="noopener"
              >
                Get your token here
              </a>
            </p>
          </div>
          <div class="hero-image">
            <img src="@/assets/images/WeeklyDashboardMobileView.png" alt="WeekNab Dashboard" class="phone-mockup" />
          </div>
        </div>
      </div>
      <div class="hero-shape">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C240,100 480,120 720,120 C960,120 1200,100 1440,80 L1440,120 L0,120 Z" fill="var(--surface)"></path>
        </svg>
      </div>
    </section>

    <!-- Core Features Section -->
    <section class="features">
      <div class="container">
        <h2>Key Features</h2>
        <p class="features-description">WeekNab makes your YNAB experience more intuitive by breaking down monthly budgets into weekly insights.</p>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9h18M3 15h18M9 5v14M15 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>Weekly Overview</h3>
            <p>See your budget broken down into weekly chunks for easier tracking.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>Budget Insights</h3>
            <p>Get intelligent recommendations based on your spending patterns.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20V10M18 20V4M6 20v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>Category Analysis</h3>
            <p>Understand which spending categories need your attention.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                <path d="M16 10H8M16 14H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>Transaction Feed</h3>
            <p>Review recent transactions and how they impact your weekly budget.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Share Section -->
    <section class="share">
      <div class="container">
        <h2>Share WeekNab</h2>
        <p class="share-description">Help others take control of their budgets by sharing WeekNab with your friends and family.</p>
        <button class="btn btn-secondary share-btn" @click="showShareModal = true">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="share-icon">
            <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.93703C7.54305 9.35399 6.81388 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.81388 15 7.54305 14.646 8.08261 14.063L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1861 16 16.457 16.354 15.9174 16.937L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.06297C16.457 7.64601 17.1861 8 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Share WeekNab
        </button>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta">
      <div class="container">
        <h2>Ready to try WeekNab?</h2>
        <p>Get started for free and transform how you budget.</p>
        <router-link to="/login" class="btn btn-primary">Get Started</router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
                <path d="M13 11.586V8C13 7.448 12.552 7 12 7C11.448 7 11 7.448 11 8V12C11 12.266 11.105 12.52 11.293 12.707L14.293 15.707C14.488 15.902 14.744 16 15 16C15.256 16 15.512 15.902 15.707 15.707C16.098 15.316 16.098 14.684 15.707 14.293L13 11.586Z" fill="currentColor"/>
              </svg>
              <span>WeekNab</span>
            </div>
            <p class="footer-description">
              Transform your YNAB experience with weekly insights and better budgeting control.
            </p>
          </div>

          <div class="footer-section">
            <h4>Product</h4>
            <nav class="footer-nav">
              <router-link to="/features">Features</router-link>
              <router-link to="/demo">Try Demo</router-link>
              <router-link to="/roadmap">Roadmap</router-link>
              <a href="https://github.com/yourusername/weeknab" target="_blank" rel="noopener">GitHub</a>
            </nav>
          </div>

          <div class="footer-section">
            <h4>Support</h4>
            <nav class="footer-nav">
              <a href="https://docs.weeknab.com" target="_blank" rel="noopener">Documentation</a>
              <router-link to="/faq">FAQ</router-link>
              <a href="mailto:support@weeknab.com">Contact</a>
            </nav>
          </div>

          <div class="footer-section">
            <h4>Legal</h4>
            <nav class="footer-nav">
              <router-link to="/terms">Terms of Service</router-link>
              <router-link to="/privacy">Privacy Policy</router-link>
            </nav>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} WeekNab. All rights reserved.</p>
          <div class="social-links">
            <a href="https://twitter.com/weeknab" target="_blank" rel="noopener" aria-label="Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="https://github.com/yourusername/weeknab" target="_blank" rel="noopener" aria-label="GitHub">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    <SocialShare 
      v-if="showShareModal"
      :is-modal="true"
      title="Share WeekNab"
      description="Help others discover better budget management with WeekNab's weekly insights."
      @close="showShareModal = false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SocialShare from '@/components/common/SocialShare.vue'

const showShareModal = ref(false)
</script>

<style scoped>
.home {
  background-color: var(--background);
  color: var(--text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero {
  padding: 2rem 0;
  background: linear-gradient(180deg, var(--background) 0%, var(--surface) 100%);
  position: relative;
  overflow: hidden;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.logo-icon {
  width: 48px;
  height: 48px;
  color: var(--primary);
}

.logo-text {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  padding-right: 2rem;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: var(--text);
}

.highlight {
  background: linear-gradient(to right, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: block;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: var(--transition-all);
  font-size: 1.125rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: var(--primary-dark);
}

.btn-secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  background: var(--surface-hover);
  border-color: var(--primary);
}

.token-info {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.token-info a {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--primary);
}

.token-info a:hover {
  border-bottom-style: solid;
}

.hero-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 600px;
  overflow: hidden;
}

.phone-mockup {
  max-width: 85%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.hero-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
}

.hero-shape svg {
  width: 100%;
  height: auto;
}

.features {
  padding: 0 0 5rem;
  background: var(--background);
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text);
}

.features-description {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  font-size: 1.125rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  transition: var(--transition-all);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
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
}

.final-cta {
  padding: 5rem 0;
  background: var(--surface);
  text-align: center;
}

.final-cta h2 {
  margin-bottom: 1rem;
}

.final-cta p {
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.footer {
  background: var(--surface);
  padding: 5rem 0 2rem;
  border-top: 1px solid var(--border);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  color: var(--text);
  font-weight: 600;
  font-size: 1.25rem;
}

.footer-logo .logo-icon {
  width: 24px;
  height: 24px;
  color: var(--primary);
}

.footer-description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 300px;
  line-height: 1.6;
}

.footer h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-nav a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-all);
  font-size: 0.875rem;
}

.footer-nav a:hover {
  color: var(--primary);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: var(--text-secondary);
  transition: var(--transition-all);
}

.social-links a:hover {
  color: var(--primary);
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .hero-text {
    padding-right: 0;
    order: 1;
  }

  .logo {
    justify-content: center;
  }

  .cta-buttons {
    justify-content: center;
  }

  .hero-image {
    order: 2;
  }

  .phone-mockup {
    max-width: 60%;
  }

  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  .footer-section:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 1rem 0 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.125rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  h2 {
    font-size: 2rem;
  }

  .phone-mockup {
    max-width: 75%;
  }

  .footer {
    padding: 3rem 0 2rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }
  
  .logo-text {
    font-size: 2rem;
  }
}

.share {
  padding: 5rem 0;
  background: var(--background);
  text-align: center;
}

.share-description {
  max-width: 600px;
  margin: 0 auto 2rem;
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.share-icon {
  color: currentColor;
}

@media (max-width: 768px) {
  .share {
    padding: 3rem 0;
  }
}
</style> 