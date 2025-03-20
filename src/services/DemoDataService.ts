import type { WeeklyBudgetData, CategoryData, DailySpending, DateRange, Transaction } from '@/types/budget'

export class DemoDataService {
  private monthlyData: Map<string, WeeklyData> = new Map();

  private generateMonthData() {
    // Generate consistent data for the entire month
    const startOfMonth = this.getStartOfMonth();
    let currentDate = startOfMonth;
    
    while (currentDate <= new Date()) {
      const weekKey = this.getWeekKey(currentDate);
      if (!this.monthlyData.has(weekKey)) {
        const weekData = this.generateWeekData(currentDate);
        this.monthlyData.set(weekKey, weekData);
      }
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }

  private getWeekKey(date: Date): string {
    const startOfWeek = this.getStartOfWeek(date);
    return startOfWeek.toISOString().split('T')[0];
  }

  getWeeklyData(date?: Date): WeeklyData {
    const targetDate = date || new Date();
    const weekKey = this.getWeekKey(targetDate);

    // Initialize month data if not exists
    if (this.monthlyData.size === 0) {
      this.generateMonthData();
    }

    // Return consistent data for the week
    const weekData = this.monthlyData.get(weekKey);
    if (!weekData) {
      throw new Error('Week data not available');
    }

    return weekData;
  }

  static async getPreviousWeekData(): Promise<WeeklyBudgetData> {
    // For demonstration purposes, we'll return the same data with different dates
    const data = await this.getWeeklyData()
    
    // Adjust dates to previous week
    const previousStart = new Date(data.dateRange.start)
    previousStart.setDate(previousStart.getDate() - 7)
    
    const previousEnd = new Date(data.dateRange.end)
    previousEnd.setDate(previousEnd.getDate() - 7)
    
    return {
      ...data,
      dateRange: {
        start: previousStart,
        end: previousEnd
      },
      // Different values for variety
      totalBudget: 1200,
      totalSpent: 980.25,
      remainingBudget: 219.75,
      daysLeft: 0 // Past week
    }
  }
  
  static async getNextWeekData(): Promise<WeeklyBudgetData> {
    // For demonstration purposes, we'll return the same data with different dates
    const data = await this.getWeeklyData()
    
    // Adjust dates to next week
    const nextStart = new Date(data.dateRange.start)
    nextStart.setDate(nextStart.getDate() + 7)
    
    const nextEnd = new Date(data.dateRange.end)
    nextEnd.setDate(nextEnd.getDate() + 7)
    
    return {
      ...data,
      dateRange: {
        start: nextStart,
        end: nextEnd
      },
      // Different values for variety
      totalBudget: 1300,
      totalSpent: 0, // No spending yet
      remainingBudget: 1300,
      dailySpending: data.dailySpending.map(day => ({
        ...day,
        amount: 0,
        transactions: []
      })),
      daysLeft: 7 // Full week ahead
    }
  }

  static async getCurrentWeekData(): Promise<WeeklyBudgetData> {
    // Just an alias for getWeeklyData for consistency
    return this.getWeeklyData()
  }
} 