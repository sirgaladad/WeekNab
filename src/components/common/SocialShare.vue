<template>
  <div :class="['social-share', { 'is-modal': isModal }]">
    <div v-if="isModal" class="modal-overlay" @click="$emit('close')" />
    <div class="share-container">
      <div v-if="isModal" class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="$emit('close')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <p v-if="description" class="share-description">{{ description }}</p>
      <div class="share-buttons">
        <button 
          v-for="platform in platforms" 
          :key="platform.name"
          class="share-btn"
          :style="{ '--platform-color': platform.color }"
          @click="share(platform)"
        >
          <component :is="platform.icon" class="platform-icon" />
          <span>{{ platform.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

interface Platform {
  name: string
  label: string
  color: string
  url: string
  icon: ReturnType<typeof defineComponent>
}

const props = defineProps<{
  isModal?: boolean
  title?: string
  description?: string
}>()

const platforms: Platform[] = [
  {
    name: 'twitter',
    label: 'Share on Twitter',
    color: '#1DA1F2',
    url: 'https://twitter.com/intent/tweet?text=Check%20out%20WeekNab%20-%20Transform%20your%20YNAB%20experience%20with%20weekly%20budget%20insights!%20&url=https://weeknab.com',
    icon: defineComponent({
      template: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `
    })
  },
  {
    name: 'linkedin',
    label: 'Share on LinkedIn',
    color: '#0A66C2',
    url: 'https://www.linkedin.com/sharing/share-offsite/?url=https://weeknab.com',
    icon: defineComponent({
      template: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 9H2V21H6V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `
    })
  },
  {
    name: 'facebook',
    label: 'Share on Facebook',
    color: '#1877F2',
    url: 'https://www.facebook.com/sharer/sharer.php?u=https://weeknab.com',
    icon: defineComponent({
      template: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `
    })
  }
]

const share = (platform: Platform) => {
  window.open(platform.url, '_blank')
}
</script>

<style scoped>
.social-share {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.share-container {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  border: 1px solid var(--border);
  position: relative;
  z-index: 101;
  box-shadow: var(--shadow-lg);
}

.is-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: var(--transition-all);
}

.close-btn:hover {
  color: var(--text);
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.share-description {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.share-buttons {
  display: grid;
  gap: 1rem;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-all);
}

.share-btn:hover {
  border-color: var(--platform-color);
  background: color-mix(in srgb, var(--platform-color) 10%, transparent);
  color: var(--platform-color);
  transform: translateY(-1px);
}

.platform-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .share-container {
    margin: 1rem;
    padding: 1.5rem;
    max-width: calc(100% - 2rem);
  }
}
</style> 