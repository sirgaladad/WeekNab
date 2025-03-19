<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <h3>{{ companyInfo.name }}</h3>
          <p>{{ companyInfo.slogan }}</p>
          <p class="copyright">
            © {{ currentYear }} {{ companyInfo.name }}. All rights reserved.
          </p>
          <p class="developer-info">
            Developed by {{ companyInfo.developer.name }} at 
            <a
              :href="companyInfo.developer.url"
              target="_blank"
              rel="noopener"
            >{{ companyInfo.developer.company }}</a>
          </p>
        </div>
        
        <div class="footer-links">
          <div class="links-group">
            <h4>Quick Links</h4>
            <nav>
              <router-link 
                v-for="link in companyLinks" 
                :key="link.url" 
                :to="link.url"
              >
                {{ link.name }}
              </router-link>
            </nav>
          </div>
          
          <div class="links-group">
            <h4>Connect With Us</h4>
            <div class="social-links">
              <a 
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url" 
                target="_blank" 
                rel="noopener" 
                class="social-link"
                :aria-label="link.ariaLabel"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  v-html="link.icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>{{ companyInfo.disclaimer }}</p>
        <p class="cobobots-note">
          {{ companyInfo.tagline }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { socialLinks, companyLinks, companyInfo } from '@/config/social'

const currentYear = new Date().getFullYear()
</script>

<script lang="ts">
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: var(--surface);
  padding: 4rem 0 2rem;
  border-top: 1px solid var(--border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 2rem;
}

.footer-brand h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.footer-brand p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.copyright {
  font-size: 0.875rem;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.links-group h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text);
}

.links-group nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.links-group nav a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.links-group nav a:hover {
  color: var(--primary);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--background);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.social-link:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.developer-info {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.developer-info a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.developer-info a:hover {
  text-decoration: underline;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.footer-bottom p {
  margin-bottom: 0.5rem;
}

.cobobots-note {
  color: var(--text-secondary);
  font-style: italic;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .social-links {
    justify-content: center;
  }

  .footer-brand {
    text-align: center;
  }

  .developer-info {
    text-align: center;
  }

  .footer-bottom p {
    margin-bottom: 0.75rem;
  }
}
</style> 