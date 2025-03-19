<template>
  <section class="share">
    <div class="share-content">
      <h2>Share WeekNab</h2>
      <p>Invite your friends to join WeekNab and take control of their weekly budgets together!</p>
      
      <div class="share-form">
        <div class="input-group">
          <input 
            v-model="shareName" 
            type="text" 
            placeholder="Enter your name"
            @keyup.enter="handleShare('email')"
          >
        </div>
        
        <div class="share-buttons">
          <button @click="handleShare('facebook')" class="share-button facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            Share on Facebook
          </button>
          
          <button @click="handleShare('twitter')" class="share-button twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
            Share on Twitter
          </button>
          
          <button @click="handleShare('email')" class="share-button email">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Share via Email
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const shareName = ref('')

const handleShare = (platform: 'facebook' | 'twitter' | 'email') => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent('Check out WeekNab - Your Weekly Budget Companion!')
  
  switch (platform) {
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
      break
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
      break
    case 'email':
      const subject = encodeURIComponent('Check out WeekNab!')
      const body = encodeURIComponent(`Hi,\n\nI thought you might be interested in WeekNab, a great tool for managing your weekly budget.\n\nCheck it out here: ${window.location.href}\n\nBest regards,\n${shareName.value}`)
      window.location.href = `mailto:?subject=${subject}&body=${body}`
      break
  }
}
</script>

<style scoped>
.share {
  padding: 4rem 1rem;
  background: var(--surface);
}

.share-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.share-form {
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary);
}

.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.share-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.share-button:hover {
  transform: translateY(-2px);
}

.facebook {
  background: #1877f2;
  color: white;
}

.twitter {
  background: #1da1f2;
  color: white;
}

.email {
  background: var(--primary);
  color: white;
}

@media (min-width: 768px) {
  .share {
    padding: 6rem 1rem;
  }

  h2 {
    font-size: 3rem;
  }

  p {
    font-size: 1.5rem;
  }

  .share-buttons {
    flex-direction: row;
  }

  .share-button {
    flex: 1;
  }
}
</style> 