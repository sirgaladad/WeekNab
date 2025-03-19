<template>
  <div class="demo">
    <div class="demo-header">
      <h1>Weekly Dashboard</h1>
      <div class="auth-actions">
        <button class="primary-button" @click="navigateToLogin">
          Connect Your YNAB Account
        </button>
      </div>
    </div>

    <WeeklyDashboard />

    <footer class="demo-footer">
      <nav class="footer-nav">
        <router-link to="/dashboard/weekly" class="nav-item">
          <i class="fas fa-chart-pie"></i>
          <span>Weekly View</span>
        </router-link>
        <router-link to="/dashboard/transactions" class="nav-item">
          <i class="fas fa-list"></i>
          <span>Transactions</span>
        </router-link>
        <button class="nav-item account-button" @click="showAccountModal = true">
          <i class="fas fa-user-circle"></i>
          <span>Account</span>
        </button>
      </nav>
    </footer>

    <!-- Account Modal -->
    <div v-if="showAccountModal" class="modal">
      <div class="modal-content">
        <h2>Account Settings</h2>
        <div class="account-options">
          <button class="option-button" @click="navigateToLogin">
            <i class="fas fa-key"></i>
            <span>Update YNAB Token</span>
          </button>
          <button class="option-button" @click="navigateToPreferences">
            <i class="fas fa-cog"></i>
            <span>Preferences</span>
          </button>
          <button class="option-button" @click="testConnection">
            <i class="fas fa-sync"></i>
            <span>Test Connection</span>
          </button>
        </div>
        <button class="close-button" @click="showAccountModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import WeeklyDashboard from '@/components/dashboard/WeeklyDashboard.vue'

const router = useRouter()
const showAccountModal = ref(false)

function navigateToLogin() {
  router.push('/login')
}

function navigateToPreferences() {
  router.push('/dashboard/preferences')
}

function testConnection() {
  router.push('/test-connection')
}
</script>

<style scoped>
.demo {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background);
}

.demo-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.auth-actions {
  display: flex;
  gap: 1rem;
}

.primary-button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.primary-button:hover {
  background: var(--primary-dark);
}

.demo-footer {
  margin-top: auto;
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 0.75rem;
}

.footer-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: var(--primary);
  background: var(--surface-hover);
}

.nav-item i {
  font-size: 1.25rem;
}

.account-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  color: inherit;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--surface);
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
}

.account-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.option-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-button:hover {
  background: var(--surface-dark);
}

.close-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--surface-dark);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .demo-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style> 