import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('demo_budgets')
      .select('count')
      .single()
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase test failed:', error)
    return false
  }
} 