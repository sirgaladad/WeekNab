import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'

describe('Auth Store', () => {
  beforeEach(() => {
    // Create a fresh pinia instance and make it active
    setActivePinia(createPinia())
    
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    }
    global.localStorage = localStorageMock
  })

  it('initializes with correct state', () => {
    const store = useAuthStore()
    expect(store.token).toBeNull()
    expect(store.redirectPath).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('sets and clears token correctly', () => {
    const store = useAuthStore()
    const testToken = 'test-token'

    store.setToken(testToken)
    expect(store.token).toBe(testToken)
    expect(localStorage.setItem).toHaveBeenCalledWith('ynab_token', testToken)
    expect(store.isAuthenticated).toBe(true)

    store.clearToken()
    expect(store.token).toBeNull()
    expect(localStorage.removeItem).toHaveBeenCalledWith('ynab_token')
    expect(store.isAuthenticated).toBe(false)
  })

  it('manages redirect path', () => {
    const store = useAuthStore()
    const testPath = '/dashboard'

    store.setRedirectPath(testPath)
    expect(store.redirectPath).toBe(testPath)
  })

  it('validates token correctly', async () => {
    const store = useAuthStore()
    const testToken = 'test-token'

    // Mock fetch
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url === 'https://api.youneedabudget.com/v1/user') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: { user: { id: 1 } } })
        })
      }
      return Promise.reject(new Error('Invalid URL'))
    })

    store.setToken(testToken)
    const isValid = await store.validateToken()
    expect(isValid).toBe(true)
    expect(store.token).toBe(testToken)

    // Test invalid token
    global.fetch = vi.fn().mockImplementation(() => 
      Promise.resolve({ ok: false })
    )

    const isInvalid = await store.validateToken()
    expect(isInvalid).toBe(false)
    expect(store.token).toBeNull()
  })

  it('handles token validation errors', async () => {
    const store = useAuthStore()
    const testToken = 'test-token'

    // Mock fetch to throw an error
    global.fetch = vi.fn().mockImplementation(() => 
      Promise.reject(new Error('Network error'))
    )

    store.setToken(testToken)
    const isValid = await store.validateToken()
    expect(isValid).toBe(false)
    expect(store.token).toBeNull()
  })
}) 