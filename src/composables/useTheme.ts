import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('light-theme')
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
      if (!isDark.value) {
        document.documentElement.classList.add('light-theme')
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      if (!prefersDark) {
        document.documentElement.classList.add('light-theme')
      }
    }
  }

  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleTheme
  }
} 