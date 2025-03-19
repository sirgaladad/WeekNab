<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Take Control of your Budget</h1>
        <p class="subtitle">
          WeekNab helps you take control of your budget, one week at a time.
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
          <a href="https://app.ynab.com/settings/developer" target="_blank" rel="noopener">
            Get your token here
          </a>
        </p>
      </div>
    </section>

    <!-- Key Features Section -->
    <KeyFeatures />

    <!-- Share Section -->
    <section class="share">
      <div class="container">
        <h2>Share WeekNab With Friends</h2>
        <p>Know someone who could benefit from better weekly budget insights? Invite them to try WeekNab!</p>
        <div class="share-content">
          <div class="share-text">
            <h3>Help Your Friends Budget Better</h3>
            <p>Share WeekNab with friends and family who want to take control of their finances with weekly budget insights.</p>
          </div>
          <div class="share-buttons">
            <SocialShare :is-modal="false" />
          </div>
        </div>
      </div>
    </section>

    <!-- Share Modal -->
    <SocialShare 
      v-if="showShareModal" 
      :is-modal="true"
      title="Share WeekNab"
      description="Help your friends take control of their budget with WeekNab!"
      @close="showShareModal = false"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KeyFeatures from '@/components/home/KeyFeatures.vue'
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
  padding: 5rem 0 4rem;
  text-align: center;
  background: linear-gradient(180deg, var(--background) 0%, var(--surface) 100%);
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #2563EB, #3B82F6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.demo-link {
  color: var(--primary);
  text-decoration: underline;
  font-weight: 500;
}

.demo-link:hover {
  text-decoration: none;
}

.token-info {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.token-info a {
  color: var(--primary);
  text-decoration: underline;
}

.token-info a:hover {
  text-decoration: none;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1.125rem;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
}

.share {
  padding: 4rem 0;
  text-align: center;
  background: var(--surface);
}

.share h2 {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.share p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.share-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
  background: var(--background);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.share-text {
  flex: 1;
  text-align: left;
}

.share-buttons {
  flex: 1;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0 3rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  .cta-buttons {
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .btn {
    width: 100%;
  }

  .share-content {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.25rem;
  }

  .share-text {
    text-align: center;
  }
}
</style> 