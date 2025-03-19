<template>
  <div class="preferences-container">
    <div class="preferences-header">
      <h2>Account Preferences</h2>
      <p>Manage your account settings and preferences</p>
    </div>

    <div class="preferences-content">
      <div class="preferences-section">
        <h3>Appearance</h3>
        <div class="form-group">
          <label for="theme">Theme</label>
          <select 
            id="theme"
            v-model="preferences.theme"
            class="form-select"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div class="preferences-section">
        <h3>Notifications</h3>
        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox"
              v-model="preferences.notifications"
              class="form-checkbox"
            >
            Enable weekly budget notifications
          </label>
        </div>
        <div class="form-group">
          <label for="reportDay">Weekly Report Day</label>
          <select 
            id="reportDay"
            v-model="preferences.weekly_report_day"
            class="form-select"
          >
            <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
          </select>
        </div>
      </div>

      <div class="preferences-section danger-zone">
        <h3>Danger Zone</h3>
        <div class="danger-actions">
          <button 
            class="danger-btn"
            @click="showDeleteConfirm = true"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="modal-content">
        <h3>Delete Account</h3>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        <div class="modal-actions">
          <button 
            class="cancel-btn"
            @click="showDeleteConfirm = false"
          >
            Cancel
          </button>
          <button 
            class="delete-btn"
            @click="handleDeleteAccount"
            :disabled="isDeleting"
          >
            {{ isDeleting ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const preferences = ref({
  theme: 'system',
  notifications: true,
  weekly_report_day: 0
})

const showDeleteConfirm = ref(false)
const isDeleting = ref(false)

onMounted(async () => {
  if (authStore.userProfile?.preferences) {
    preferences.value = { ...authStore.userProfile.preferences }
  }
})

const handleDeleteAccount = async () => {
  isDeleting.value = true
  try {
    const success = await authStore.deleteAccount()
    if (success) {
      router.push('/')
    }
  } catch (error) {
    console.error('Failed to delete account:', error)
  } finally {
    isDeleting.value = false
    showDeleteConfirm.value = false
  }
}

// Watch for preference changes and update in Supabase
watch(preferences, async (newPrefs) => {
  try {
    await authStore.updatePreferences(newPrefs)
  } catch (error) {
    console.error('Failed to update preferences:', error)
  }
}, { deep: true })
</script>

<style scoped>
.preferences-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.preferences-header {
  margin-bottom: 2rem;
}

.preferences-header h2 {
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.preferences-header p {
  color: var(--text-secondary);
}

.preferences-section {
  background: var(--surface);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.preferences-section h3 {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-dark);
  color: var(--text);
  font-size: 1rem;
}

.form-checkbox {
  margin-right: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.danger-zone {
  border: 1px solid #EF4444;
}

.danger-zone h3 {
  color: #EF4444;
}

.danger-actions {
  display: flex;
  justify-content: flex-end;
}

.danger-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #EF4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.danger-btn:hover {
  background: #DC2626;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--surface);
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  color: #EF4444;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: var(--surface-dark);
}

.delete-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #EF4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn:hover:not(:disabled) {
  background: #DC2626;
}

.delete-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .preferences-container {
    padding: 1rem;
  }

  .preferences-section {
    padding: 1rem;
  }
}
</style> 