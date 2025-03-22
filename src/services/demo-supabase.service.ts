import { supabase } from '@/lib/supabase'
import type { WeeklyBudgetData } from './demo-data.service'
import { getStartOfWeek, getEndOfWeek } from './ynab-weekly.service'

export async function getDemoBudgetData(weekStart: Date): Promise<WeeklyBudgetData> {
  try {
    const startDate = getStartOfWeek(weekStart).toISOString().split('T')[0]
    const endDate = getEndOfWeek(weekStart).toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('demo_budgets')
      .select('*')
      .eq('start_date', startDate)
      .single()

    if (error) {
      console.error('Error fetching demo budget:', error)
      throw error
    }

    if (!data) {
      throw new Error('No demo data found for the specified week')
    }

    // Transform the data from Supabase format to WeeklyBudgetData format
    return {
      weekNumber: data.week_number,
      dateRange: {
        start: new Date(data.start_date),
        end: new Date(data.end_date)
      },
      budget: {
        total: data.total_budget,
        spent: data.total_spent,
        remaining: data.total_remaining,
        percentageSpent: data.percentage_spent
      },
      categories: data.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        color: cat.color,
        budgeted: cat.budgeted,
        spent: cat.spent,
        remaining: cat.remaining,
        percentageSpent: cat.percentageSpent,
        isOverBudget: cat.isOverBudget,
        transactions: cat.transactions.map((t: any) => ({
          id: t.id,
          date: new Date(t.date),
          payee: t.payee,
          amount: t.amount,
          category: cat.name
        }))
      })),
      insights: {
        daysLeft: data.insights.days_left,
        weeklyOverview: {
          message: data.insights.weekly_overview.message,
          remainingAmount: data.insights.weekly_overview.remaining_amount
        },
        categoryInsights: data.insights.category_insights.map((insight: any) => ({
          name: insight.name,
          spent: insight.spent,
          budgeted: insight.budgeted,
          remaining: insight.remaining,
          powerGoal: {
            name: insight.power_goal.name,
            amount: insight.power_goal.amount
          }
        })),
        recentActivity: data.insights.recent_activity.map((activity: any) => ({
          id: activity.id,
          date: new Date(activity.date),
          payee: activity.payee,
          amount: activity.amount,
          category: activity.category
        })),
        goalImpact: {
          message: data.insights.goal_impact.message,
          goalType: data.insights.goal_impact.goal_type,
          amount: data.insights.goal_impact.amount
        }
      }
    }
  } catch (error) {
    console.error('Error in getDemoBudgetData:', error)
    throw error
  }
}

export async function getCurrentWeekDemoData(): Promise<WeeklyBudgetData> {
  return getDemoBudgetData(new Date())
}

export async function getPreviousWeekDemoData(currentDate: Date): Promise<WeeklyBudgetData> {
  const prevWeek = new Date(currentDate)
  prevWeek.setDate(prevWeek.getDate() - 7)
  return getDemoBudgetData(prevWeek)
}

export async function getNextWeekDemoData(currentDate: Date): Promise<WeeklyBudgetData> {
  const nextWeek = new Date(currentDate)
  nextWeek.setDate(nextWeek.getDate() + 7)
  return getDemoBudgetData(nextWeek)
} 