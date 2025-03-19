<template>
  <div id="app" :class="{ 'dark': isDark }">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
</script>

<style>
:root {
  /* Base colors as RGB for opacity support */
  --primary-rgb: 37, 99, 235;
  --background-rgb: 10, 14, 26;
  --surface-rgb: 26, 31, 53;
  --text-rgb: 255, 255, 255;
  --text-secondary-rgb: 156, 163, 175;
  --border-rgb: 55, 65, 81;

  /* Theme colors */
  --primary: rgb(var(--primary-rgb));
  --primary-dark: rgb(29, 78, 216);
  --background: rgb(var(--background-rgb));
  --surface: rgb(var(--surface-rgb));
  --text: rgb(var(--text-rgb));
  --text-secondary: rgb(var(--text-secondary-rgb));
  --border: rgb(var(--border-rgb));

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, rgb(var(--primary-rgb)), rgb(29, 78, 216));
  --gradient-surface: linear-gradient(135deg, rgba(var(--surface-rgb), 0.9), rgba(var(--surface-rgb), 0.95));

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-primary: 0 8px 16px rgba(var(--primary-rgb), 0.2);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;

  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}

/* Light theme overrides */
.light {
  --background-rgb: 249, 250, 251;
  --surface-rgb: 255, 255, 255;
  --text-rgb: 17, 24, 39;
  --text-secondary-rgb: 107, 114, 128;
  --border-rgb: 229, 231, 235;
}

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background);
  color: var(--text);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Utility classes */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass {
  background: var(--gradient-surface);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform var(--transition-normal), opacity var(--transition-normal);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style> 