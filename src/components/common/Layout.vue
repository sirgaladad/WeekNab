<template>
  <div class="layout">
    <header class="header">
      <NavBar />
    </header>

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'

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
  padding: 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
}

.main-content {
  flex: 1;
  margin-top: 4rem;
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