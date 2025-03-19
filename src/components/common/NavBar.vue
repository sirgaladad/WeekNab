<template>
  <nav class="navbar">
    <div class="navbar-content">
      <router-link to="/" class="logo">
        <span class="logo-text">WeekNab</span>
      </router-link>

      <button 
        class="menu-toggle"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <line v-if="!isMenuOpen" x1="3" y1="12" x2="21" y2="12"></line>
          <line v-if="!isMenuOpen" x1="3" y1="6" x2="21" y2="6"></line>
          <line v-if="!isMenuOpen" x1="3" y1="18" x2="21" y2="18"></line>
          <line v-else x1="18" y1="6" x2="6" y2="18"></line>
          <line v-else x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="menu" :class="{ 'is-open': isMenuOpen }">
        <div class="menu-content">
          <div class="nav-links">
            <router-link to="/" class="nav-link" @click="isMenuOpen = false">Home</router-link>
            <router-link to="/demo" class="nav-link" @click="isMenuOpen = false">Demo</router-link>
            <router-link to="/about" class="nav-link" @click="isMenuOpen = false">About</router-link>
          </div>

          <div class="nav-actions">
            <button 
              class="theme-toggle"
              @click="toggleTheme"
              aria-label="Toggle theme"
            >
              <svg 
                v-if="isDark" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg 
                v-else 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>

            <template v-if="!isAuthenticated">
              <router-link to="/login" class="btn-primary" @click="isMenuOpen = false">Login</router-link>
              <router-link to="/register" class="btn-secondary" @click="isMenuOpen = false">Register</router-link>
            </template>
            <template v-else>
              <router-link to="/dashboard" class="btn-primary" @click="isMenuOpen = false">Dashboard</router-link>
              <button @click="logout" class="btn-secondary">Logout</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'

const authStore = useAuthStore()
const { isDark, toggleTheme } = useTheme()
const isMenuOpen = ref(false)
const isAuthenticated = ref(false)

const logout = () => {
  authStore.clearToken()
  isAuthenticated.value = false
  isMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
}

.navbar-content {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  text-decoration: none;
  color: var(--text);
  font-size: 1.5rem;
  font-weight: 700;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  padding: 0.5rem;
  cursor: pointer;
}

.menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text);
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background: var(--background);
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
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
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .menu {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--surface);
    display: none;
    padding: 2rem;
  }

  .menu.is-open {
    display: block;
  }

  .menu-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .nav-links {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .nav-link {
    font-size: 1.25rem;
  }

  .nav-actions {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
}
</style> 