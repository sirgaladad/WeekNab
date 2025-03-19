import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

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
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(import.meta.env.VITE_ENCRYPTION_KEY || ''),
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
}

// Helper function to decrypt sensitive data
export async function decryptData(encryptedData: string): Promise<string> {
  const decoder = new TextDecoder()
  const dataArray = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
  const iv = dataArray.slice(0, 12)
  const data = dataArray.slice(12)
  const key = await crypto.subtle.importKey(
    'raw',
    decoder.decode(new TextEncoder().encode(import.meta.env.VITE_ENCRYPTION_KEY || '')),
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
} 