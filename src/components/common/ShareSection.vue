<template>
  <section class="share">
    <div class="container">
      <h2>Share WeekNab With Friends</h2>
      <p>Know someone who could benefit from better weekly budget insights? Invite them to try WeekNab!</p>
      <div class="share-content">
        <div class="share-text">
          <h3>Help Your Friends Budget Better</h3>
          <p>Share WeekNab with friends and family who want to take control of their finances with weekly budget insights.</p>
          <div class="share-name">
            <span class="share-label">Share as:</span>
            <input 
              type="text" 
              v-model="shareName"
              placeholder="Your Name (Optional)" 
              class="share-input"
            >
          </div>
        </div>
        <div class="share-buttons">
          <button 
            class="share-btn facebook"
            @click="handleShare('facebook')"
          >
            <i class="fab fa-facebook-f"></i>
            Share on Facebook
          </button>
          <button 
            class="share-btn twitter"
            @click="handleShare('twitter')"
          >
            <i class="fab fa-twitter"></i>
            Share on Twitter
          </button>
          <button 
            class="share-btn email"
            @click="handleShare('email')"
          >
            <i class="fas fa-envelope"></i>
            Share via Email
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isModal?: boolean
  title?: string
  description?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const shareName = ref('')

const handleShare = (platform: 'facebook' | 'twitter' | 'email') => {
  // Implement sharing logic here
  console.log(`Sharing on ${platform} as ${shareName.value}`)
  if (props.isModal) {
    emit('close')
  }
}
</script>

<style scoped>
.share {
  padding: 4rem 0;
  text-align: center;
  background: var(--surface);
}

.share h2 {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.share p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.share-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--surface-dark);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.share-text {
  text-align: left;
}

.share-text h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.share-text p {
  margin-bottom: 1.5rem;
}

.share-name {
  margin-top: 1.5rem;
}

.share-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.share-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
}

.share-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.share-btn i {
  font-size: 1.25rem;
}

.share-btn.facebook {
  background: #1877F2;
  color: white;
}

.share-btn.twitter {
  background: #1DA1F2;
  color: white;
}

.share-btn.email {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1024px) {
  .share-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }

  .share-text {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .share h2 {
    font-size: 2rem;
  }

  .share-buttons {
    padding: 0 1rem;
  }
}
</style> 