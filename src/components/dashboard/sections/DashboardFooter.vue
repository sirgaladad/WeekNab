<template>
  <div class="dashboard-footer">
    <div class="footer-content">
      <div class="footer-logo-container">
        <img 
          src="@/assets/images/weeknab-white-logo.svg" 
          alt="WeekNab Logo"
          class="footer-logo"
        />
      </div>
      <div class="footer-links">
        <router-link to="/about">About</router-link>
        <router-link to="/privacy">Privacy</router-link>
        <router-link to="/terms">Terms</router-link>
      </div>
      <div class="footer-actions">
        <button @click="onExit" class="action-button exit">Exit Demo</button>
        <button @click="onTryNow" class="action-button try-now">Try Now</button>
      </div>
    </div>

    <div v-if="showToast" class="toast-notification" :class="{ 'show': showToast }">
      <div class="toast-content">
        <p>{{ toastMessage }}</p>
        <button @click="onCloseToast" class="toast-close" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="toast-actions">
          <button @click="onExit" class="toast-button exit">Exit Demo</button>
          <button @click="onTryNow" class="toast-button try-now">Try Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  showToast?: boolean;
  toastMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showToast: false,
  toastMessage: 'Want to try WeekNab with your own budget? Sign up now!'
});

const emit = defineEmits(['exit', 'tryNow', 'closeToast']);

const onExit = () => {
  emit('exit');
};

const onTryNow = () => {
  emit('tryNow');
};

const onCloseToast = () => {
  emit('closeToast');
};
</script>

<style scoped>
.dashboard-footer {
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-logo-container {
  display: flex;
  align-items: center;
}

.footer-logo {
  height: 32px;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--primary);
}

.footer-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button.exit {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.action-button.exit:hover {
  background: var(--surface-hover);
}

.action-button.try-now {
  background: var(--primary);
  border: none;
  color: white;
}

.action-button.try-now:hover {
  background: var(--primary-dark);
}

.toast-notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  width: 90%;
  max-width: 500px;
  background: var(--surface);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.3s ease;
}

.toast-notification.show {
  transform: translateX(-50%) translateY(0);
}

.toast-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toast-content p {
  font-size: 1rem;
  margin: 0;
}

.toast-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
}

.toast-actions {
  display: flex;
  gap: 1rem;
}

.toast-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toast-button.exit {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.toast-button.try-now {
  background: var(--primary);
  border: none;
  color: white;
}

@media (max-width: 767px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-links {
    order: 2;
  }
  
  .footer-actions {
    order: 1;
    width: 100%;
  }
  
  .action-button {
    flex: 1;
  }
}
</style> 