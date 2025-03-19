export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          ynab_token: string | null
          preferences: {
            theme: 'light' | 'dark' | 'system'
            notifications: boolean
            weekly_report_day: number
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          ynab_token?: string | null
          preferences?: {
            theme?: 'light' | 'dark' | 'system'
            notifications?: boolean
            weekly_report_day?: number
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          ynab_token?: string | null
          preferences?: {
            theme?: 'light' | 'dark' | 'system'
            notifications?: boolean
            weekly_report_day?: number
          }
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 