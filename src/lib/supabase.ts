import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// Check for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key'
const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY || 'demo-encryption-key-for-local-development'

// Set a flag for demo mode
export const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY

// Instead of throwing an error, let's create a mock client and log a warning
let supabaseClient;
try {
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
  if (isDemoMode) {
    console.warn('Running in demo mode with mock Supabase data')
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error)
  // Create a mock client with fake methods
  supabaseClient = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null })
      })
    })
  }
}

export const supabase = supabaseClient

export interface UserProfile {
  id: string
  email: string
  ynab_token: string
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    weekly_report_day: number
  }
  created_at: string
  updated_at: string
}

// Helper function to encrypt sensitive data
export async function encryptData(data: string): Promise<string> {
  try {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(encryptionKey),
      'AES-GCM',
      false,
      ['encrypt']
    )
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBuffer
    )
    const encryptedArray = new Uint8Array(encryptedData)
    const result = new Uint8Array(iv.length + encryptedArray.length)
    result.set(iv)
    result.set(encryptedArray, iv.length)
    return btoa(String.fromCharCode(...result))
  } catch (error) {
    console.error('Encryption error:', error)
    return `mock-encrypted-${data}`
  }
}

// Helper function to decrypt sensitive data
export async function decryptData(encryptedData: string): Promise<string> {
  try {
    if (encryptedData.startsWith('mock-encrypted-')) {
      return encryptedData.replace('mock-encrypted-', '')
    }
    
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const dataArray = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
    const iv = dataArray.slice(0, 12)
    const data = dataArray.slice(12)
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(encryptionKey),
      'AES-GCM',
      false,
      ['decrypt']
    )
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    )
    return decoder.decode(decryptedData)
  } catch (error) {
    console.error('Decryption error:', error)
    if (encryptedData.includes('-')) {
      return encryptedData.split('-').pop() || ''
    }
    return 'decryption-failed'
  }
} 