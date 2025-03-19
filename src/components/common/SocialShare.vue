<template>
  <div
    class="social-share"
    :class="{ 'is-modal': isModal }"
  >
    <div class="share-container">
      <h2>{{ title }}</h2>
      <p class="share-desc">
        {{ description }}
      </p>

      <div class="share-actions">
        <button
          class="share-button copy-button"
          @click="copyLink"
        >
          <svg
            class="share-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.41421C20 6.88378 19.7893 6.37507 19.4142 6L16 2.58579C15.6249 2.21071 15.1162 2 14.5858 2H10C8.89543 2 8 2.89543 8 4Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6H8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Copy Link
        </button>

        <div class="social-buttons">
          <button
            class="social-button twitter"
            aria-label="Share on Twitter"
            @click="shareOnTwitter"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 4C22 4 21.3 6.1 20 7.4C21.6 17.4 10.6 24.7 2 19C4.2 19.1 6.4 18.4 8 17C3 15.5 0.5 9.6 3 5C5.2 7.6 8.6 9.1 12 9C11.1 4.8 16 2.4 19 5.2C20.1 5.2 22 4 22 4Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            class="social-button facebook"
            aria-label="Share on Facebook"
            @click="shareOnFacebook"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            class="social-button linkedin"
            aria-label="Share on LinkedIn"
            @click="shareOnLinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M8 11v5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M8 8v.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M12 16v-5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M16 16v-3a2 2 0 0 0 -4 0"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="showToast"
        class="toast"
        :class="{ 'show': showToast }"
      >
        Link copied to clipboard!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Share WeekNab'
  },
  description: {
    type: String,
    default: 'Help others take control of their budget with WeekNab!'
  },
  isModal: {
    type: Boolean,
    default: false
  },
  shareUrl: {
    type: String,
    default: window.location.href
  }
})

const showToast = ref(false)

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(props.shareUrl)
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const shareOnTwitter = () => {
  const text = encodeURIComponent(`${props.description}\n\n`)
  const url = encodeURIComponent(props.shareUrl)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(props.shareUrl)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = encodeURIComponent(props.shareUrl)
  const title = encodeURIComponent(props.title)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank')
}
</script>

<script lang="ts">
export default {
  name: 'SocialShare'
}
</script>

<style scoped>
.social-share {
  padding: 2rem;
  text-align: center;
}

.is-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.share-container {
  max-width: 500px;
  margin: 0 auto;
  background: var(--surface);
  border-radius: 16px;
  padding: 2rem;
}

.is-modal .share-container {
  margin: 1rem;
  width: 100%;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.share-desc {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.share-actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.share-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: var(--primary);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.share-icon {
  width: 20px;
  height: 20px;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-button svg {
  width: 24px;
  height: 24px;
}

.social-button:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  opacity: 0;
  transition: all 0.3s ease;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .share-container {
    padding: 1.5rem;
  }

  .social-buttons {
    flex-wrap: wrap;
  }
}
</style> 