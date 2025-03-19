<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script setup lang="ts">
import Layout from './components/common/Layout.vue'
</script>

<style>
:root {
  --primary: #2563EB;
  --background: #0A0E1A;
  --surface: #1A1F35;
  --text: #FFFFFF;
  --text-secondary: #8892B0;
  --border: #2A2F45;
}

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
}

.light-theme {
  --background: #FFFFFF;
  --surface: #F3F4F6;
  --text: #1F2937;
  --text-secondary: #4B5563;
  --border: #E5E7EB;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
}

a {
  color: var(--primary);
  text-decoration: none;
}

button {
  cursor: pointer;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style> 