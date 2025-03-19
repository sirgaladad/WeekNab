<template>
  <div class="layout">
    <header class="header">
      <nav class="nav-container">
        <router-link
          to="/"
          class="logo"
        >
          WeekNab
        </router-link>
        
        <!-- Mobile Menu Button -->
        <button 
          class="mobile-menu-btn"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
        >
          <span class="sr-only">Menu</span>
          <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div 
          class="nav-links"
          :class="{ 'is-open': isMenuOpen }"
        >
          <router-link
            to="/"
            class="nav-link"
            @click="isMenuOpen = false"
          >
            Home
          </router-link>
          <router-link
            to="/dashboard"
            class="nav-link"
            @click="isMenuOpen = false"
          >
            Dashboard
          </router-link>
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import Footer from './Footer.vue'

const isMenuOpen = ref(false)
const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
}

.header {
  background-color: var(--surface);
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary);
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  color: var(--primary);
}

.main-content {
  flex: 1;
  margin-top: 4rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text);
}

.hamburger {
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: all 0.3s ease;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    background-color: var(--surface);
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid var(--border);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-links.is-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
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
</style> 