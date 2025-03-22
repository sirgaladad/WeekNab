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
      demo_budgets: {
        Row: {
          id: string
          week_number: number
          start_date: string
          end_date: string
          total_budget: number
          total_spent: number
          total_remaining: number
          percentage_spent: number
          categories: Json[]
          insights: {
            days_left: number
            weekly_overview: {
              message: string
              remaining_amount: number
            }
            category_insights: Json[]
            recent_activity: Json[]
            goal_impact: {
              message: string
              goal_type: string
              amount: number
            }
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          week_number: number
          start_date: string
          end_date: string
          total_budget: number
          total_spent: number
          total_remaining: number
          percentage_spent: number
          categories: Json[]
          insights: {
            days_left: number
            weekly_overview: {
              message: string
              remaining_amount: number
            }
            category_insights: Json[]
            recent_activity: Json[]
            goal_impact: {
              message: string
              goal_type: string
              amount: number
            }
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          week_number?: number
          start_date?: string
          end_date?: string
          total_budget?: number
          total_spent?: number
          total_remaining?: number
          percentage_spent?: number
          categories?: Json[]
          insights?: {
            days_left: number
            weekly_overview: {
              message: string
              remaining_amount: number
            }
            category_insights: Json[]
            recent_activity: Json[]
            goal_impact: {
              message: string
              goal_type: string
              amount: number
            }
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