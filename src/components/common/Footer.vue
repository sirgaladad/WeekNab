<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-logo">
        <h3>WeekNab</h3>
        <p>A modern Vue.js application for weekly YNAB budget management</p>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>Features</h4>
          <ul>
            <li><router-link to="/dashboard">Weekly Dashboard</router-link></li>
            <li><router-link to="/insights">Budget Insights</router-link></li>
            <li><router-link to="/categories">Category Management</router-link></li>
          </ul>
        </div>
        
        <div class="link-group">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://app.ynab.com/settings/developer" target="_blank">YNAB Developer</a></li>
            <li><router-link to="/privacy">Privacy Policy</router-link></li>
            <li><router-link to="/terms">Terms of Use</router-link></li>
          </ul>
        </div>
        
        <div class="link-group">
          <h4>Social</h4>
          <ul>
            <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank">LinkedIn</a></li>
            <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} Developed by <a href="https://cobobots.com" target="_blank">Corey Boelkens</a>. All rights reserved.</p>
      <p>MIT License</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

defineExpose({
  currentYear
})
</script>

<style scoped>
.app-footer {
  background: #1A1D23;
  color: #B4B7C3;
  padding: 3rem 2rem 1.5rem;
  margin-top: 4rem;
  border-top: 1px solid #2E303A;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  flex: 1;
  min-width: 250px;
}

.footer-logo h3 {
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.footer-logo p {
  font-size: 0.875rem;
  line-height: 1.5;
  max-width: 300px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.link-group {
  min-width: 150px;
}

.link-group h4 {
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.link-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-group li {
  margin-bottom: 0.75rem;
}

.link-group a {
  color: #B4B7C3;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.link-group a:hover {
  color: #3B82F6;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #2E303A;
  text-align: center;
  font-size: 0.8125rem;
}

.footer-bottom a {
  color: #FFFFFF;
  text-decoration: none;
}

.footer-bottom a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 2rem 1rem 1rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-logo {
    text-align: center;
    min-width: auto;
  }
  
  .footer-logo p {
    max-width: 100%;
  }
  
  .footer-links {
    justify-content: space-between;
  }
  
  .link-group {
    min-width: 120px;
  }
}
</style> 