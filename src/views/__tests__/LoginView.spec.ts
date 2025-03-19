import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../LoginView.vue'
import { useAuthStore } from '@/stores/auth'

describe('LoginView', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/login',
        name: 'login',
        component: LoginView
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: { template: '<div>Dashboard</div>' }
      }
    ]
  })

  beforeEach(() => {
    router.push('/login')
  })

  function mountLoginView() {
    return mount(LoginView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          }),
          router
        ]
      }
    })
  }

  it('renders correctly', () => {
    const wrapper = mountLoginView()
    expect(wrapper.find('h1').text()).toBe('Connect with YNAB')
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Connect')
  })

  it('handles form submission correctly', async () => {
    const wrapper = mountLoginView()
    const store = useAuthStore()

    // Mock store actions
    store.setToken = vi.fn()
    store.validateToken = vi.fn().mockResolvedValue(true)
    store.redirectPath = '/dashboard'

    // Fill in the form
    const input = wrapper.find('input[type="password"]')
    await input.setValue('test-token')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Check if store actions were called
    expect(store.setToken).toHaveBeenCalledWith('test-token')
    expect(store.validateToken).toHaveBeenCalled()

    // Wait for navigation
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('displays error message on invalid token', async () => {
    const wrapper = mountLoginView()
    const store = useAuthStore()

    // Mock store actions to simulate failure
    store.setToken = vi.fn()
    store.validateToken = vi.fn().mockResolvedValue(false)
    store.clearToken = vi.fn()

    // Fill in the form
    const input = wrapper.find('input[type="password"]')
    await input.setValue('invalid-token')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Check if error is displayed
    expect(wrapper.find('.error-message').text()).toBe('Invalid YNAB token')
    expect(store.clearToken).toHaveBeenCalled()
  })

  it('handles network errors', async () => {
    const wrapper = mountLoginView()
    const store = useAuthStore()

    // Mock store actions to simulate network error
    store.setToken = vi.fn()
    store.validateToken = vi.fn().mockRejectedValue(new Error('Network error'))
    store.clearToken = vi.fn()

    // Fill in the form
    const input = wrapper.find('input[type="password"]')
    await input.setValue('test-token')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Check if error is displayed
    expect(wrapper.find('.error-message').text()).toBe('Failed to connect to YNAB')
    expect(store.clearToken).toHaveBeenCalled()
  })

  it('disables submit button during loading', async () => {
    const wrapper = mountLoginView()
    const store = useAuthStore()

    // Mock store actions with delay
    store.setToken = vi.fn()
    store.validateToken = vi.fn().mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve(true), 100)
    }))

    // Fill in the form
    const input = wrapper.find('input[type="password"]')
    await input.setValue('test-token')

    // Submit the form
    const submitButton = wrapper.find('button[type="submit"]')
    await wrapper.find('form').trigger('submit')

    // Check if button is disabled and shows loading state
    expect(submitButton.attributes('disabled')).toBeDefined()
    expect(submitButton.text()).toBe('Connecting...')
  })
}) 