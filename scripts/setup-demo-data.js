import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDemoData() {
  try {
    // Create the demo_budgets table
    const { error: createError } = await supabase.rpc('create_demo_table')
    if (createError) {
      console.error('Error creating table:', createError)
      return
    }

    // Generate demo data for current week
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // Get Sunday
    
    const demoData = {
      week_number: Math.ceil((today.getDate() - startOfWeek.getDate()) / 7),
      start_date: startOfWeek.toISOString().split('T')[0],
      end_date: new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total_budget: 1250.00,
      total_spent: 875.50,
      total_remaining: 374.50,
      percentage_spent: 70.00,
      categories: [
        {
          id: '1',
          name: 'Groceries',
          color: '#FF6B6B',
          budgeted: 200.00,
          spent: 165.75,
          remaining: 34.25,
          percentageSpent: 82.88,
          isOverBudget: false,
          transactions: [
            {
              id: 'g1',
              date: new Date(startOfWeek.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              payee: 'Whole Foods Market',
              amount: -85.50
            },
            {
              id: 'g2',
              date: new Date(startOfWeek.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              payee: 'Local Grocery Store',
              amount: -80.25
            }
          ]
        }
      ],
      insights: {
        days_left: 7 - today.getDay(),
        weekly_overview: {
          message: "You're 70% through your weekly budget with 4 days remaining.",
          remaining_amount: 374.50
        },
        category_insights: [
          {
            name: 'Groceries',
            spent: 165.75,
            budgeted: 200.00,
            remaining: 34.25,
            power_goal: {
              name: 'Healthy Eating Goal',
              amount: 34.25
            }
          }
        ],
        recent_activity: [
          {
            id: 'ra1',
            date: new Date(startOfWeek.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            payee: 'Whole Foods Market',
            amount: -85.50,
            category: 'Groceries'
          }
        ],
        goal_impact: {
          message: 'Keep up the good work! You could save $187.25 this week.',
          goal_type: 'savings',
          amount: 187.25
        }
      }
    }

    // Insert demo data
    const { error: insertError } = await supabase
      .from('demo_budgets')
      .insert(demoData)

    if (insertError) {
      console.error('Error inserting demo data:', insertError)
      return
    }

    console.log('Demo data setup complete!')
  } catch (error) {
    console.error('Error in setupDemoData:', error)
  }
}

setupDemoData() 