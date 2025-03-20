# YNAB Data Integration Guide

## Overview

This document outlines how data from the YNAB API is transformed and utilized within the WeekNab application. The core challenge is converting YNAB's monthly budget data into weekly views and insights.

## Data Flow

1. **Authentication**: User provides YNAB Personal Access Token
2. **Budget Selection**: User selects a budget to work with
3. **Data Fetching**: Application retrieves budget details, categories, and transactions
4. **Data Transformation**: Monthly data is converted to weekly format
5. **Data Display**: Transformed data is presented in the WeeklyDashboard

## YNAB API Structure

YNAB organizes data with the following key entities:

```typescript
// Key YNAB Data Structures
interface YNABBudget {
  id: string;
  name: string;
  last_modified_on: string;
  first_month: string;
  last_month: string;
  currency_format: CurrencyFormat;
}

interface YNABCategory {
  id: string;
  category_group_id: string;
  name: string;
  hidden: boolean;
  budgeted: number;  // Monthly budgeted amount (in milliunits)
  activity: number;  // Total spending in current month (in milliunits)
  balance: number;   // Remaining amount (in milliunits)
}

interface YNABCategoryGroup {
  id: string;
  name: string;
  hidden: boolean;
  categories: YNABCategory[];
}

interface YNABTransaction {
  id: string;
  date: string;      // ISO format (YYYY-MM-DD)
  amount: number;    // In milliunits (divide by 1000 for currency value)
  memo: string;
  payee_id: string;
  payee_name: string;
  category_id: string;
  category_name: string;
  cleared: 'cleared' | 'uncleared' | 'reconciled';
  approved: boolean;
  deleted: boolean;
}
```

## WeekNab Data Structures

WeekNab uses the following data structures to present weekly information:

```typescript
// WeekNab Data Structures
interface WeeklyBudgetData {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  categories: CategoryData[];
  dailySpending: DailySpending[];
  dateRange: DateRange;
  daysLeft: number;
}

interface CategoryData {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  remaining: number;
  transactions?: Transaction[];
}

interface DailySpending {
  label: string;  // Day of week (e.g., "Mon")
  amount: number;
  date: Date;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  payee: string;
  amount: number;
  category: string;
}

interface DateRange {
  start: Date;
  end: Date;
}
```

## Data Transformation Process

### 1. Monthly to Weekly Budget Allocation

YNAB provides monthly budget amounts, which must be proportionally allocated to weeks:

```typescript
// Allocate monthly budget to specific week
function allocateWeeklyBudget(
  monthlyBudget: number,
  startOfMonth: Date,
  endOfMonth: Date,
  weekStart: Date,
  weekEnd: Date
): number {
  // Calculate days in month
  const daysInMonth = getDaysBetween(startOfMonth, endOfMonth);
  
  // Calculate days in selected week that fall within the month
  const weekStartInMonth = weekStart < startOfMonth ? startOfMonth : weekStart;
  const weekEndInMonth = weekEnd > endOfMonth ? endOfMonth : weekEnd;
  const daysInWeek = getDaysBetween(weekStartInMonth, weekEndInMonth);
  
  // Calculate proportion
  const proportion = daysInWeek / daysInMonth;
  
  // Allocate budget based on proportion
  return monthlyBudget * proportion;
}
```

### 2. Transaction Filtering by Week

Transactions must be filtered to show only those that occurred within the selected week:

```typescript
// Filter transactions to specific week
function filterTransactionsByWeek(
  transactions: YNABTransaction[],
  weekStart: Date,
  weekEnd: Date
): YNABTransaction[] {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= weekStart && transactionDate <= weekEnd;
  });
}
```

### 3. Daily Spending Aggregation

Transactions are aggregated by day to create the daily spending chart:

```typescript
// Aggregate transactions by day for the week
function aggregateDailySpending(
  transactions: YNABTransaction[],
  weekStart: Date,
  weekEnd: Date
): DailySpending[] {
  // Initialize array with empty days
  const result: DailySpending[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Create a map to hold transactions by day
  const dayMap: Record<string, Transaction[]> = {};
  
  // Populate days in the week
  for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    const dayStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    dayMap[dayStr] = [];
    
    result.push({
      label: dayNames[date.getDay()],
      amount: 0,
      date: new Date(date),
      transactions: []
    });
  }
  
  // Assign transactions to days
  transactions.forEach(tx => {
    const dayStr = tx.date; // YNAB date is already YYYY-MM-DD
    if (dayMap[dayStr]) {
      dayMap[dayStr].push({
        id: parseInt(tx.id.split('_')[1]), // Convert YNAB ID to number
        payee: tx.payee_name,
        amount: Math.abs(tx.amount / 1000), // Convert milliunits to positive value
        category: tx.category_name
      });
    }
  });
  
  // Calculate daily amounts and assign transactions
  result.forEach(day => {
    const dayStr = day.date.toISOString().split('T')[0];
    day.transactions = dayMap[dayStr] || [];
    day.amount = day.transactions.reduce((sum, tx) => sum + tx.amount, 0);
  });
  
  return result;
}
```

### 4. Remaining Days Calculation

Calculate the number of days remaining in the current week:

```typescript
// Calculate days remaining in the week
function calculateDaysLeft(weekEnd: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  
  // If today is past week end, return 0
  if (today > weekEnd) {
    return 0;
  }
  
  // Calculate days between today and week end (inclusive)
  return getDaysBetween(today, weekEnd) + 1;
}
```

## Component Data Mapping

### 1. WeeklyDashboard.vue

The main dashboard component receives the transformed weekly data:

```typescript
interface WeeklyDashboardProps {
  weeklyData: WeeklyBudgetData;
  onWeekChange: (direction: 'previous' | 'next') => void;
}
```

Key computed properties:
- `spentPercentage`: `(totalSpent / totalBudget) * 100`
- `formatDateRange`: Formats the start and end dates
- `averageSpending`: Average of daily spending amounts

### 2. Category Cards

Each category card displays:
- Category name
- Budgeted amount
- Spent amount
- Remaining amount
- Spending progress bar
- Transaction previews (optional)

```html
<div class="category-card">
  <div class="category-header">
    <h3>{{ category.name }}</h3>
    <span class="amount" :class="{ negative: category.remaining < 0 }">
      ${{ Math.abs(category.remaining).toFixed(2) }} left
    </span>
  </div>
  
  <div class="category-progress">
    <div class="progress-bar">
      <div 
        class="progress" 
        :style="{ width: `${Math.min((category.spent / category.budgeted) * 100, 100)}%` }"
        :class="{ 'over-budget': category.spent > category.budgeted }"
      ></div>
    </div>
    <div class="category-info">
      Spent: ${{ category.spent.toFixed(2) }} of ${{ category.budgeted.toFixed(2) }}
    </div>
  </div>
  
  <!-- Transaction previews -->
  <div v-if="category.transactions && category.transactions.length" class="category-transactions">
    <div v-for="tx in category.transactions.slice(0, 3)" :key="tx.id" class="transaction-item">
      <span class="transaction-payee">{{ tx.payee }}</span>
      <span class="transaction-amount">${{ tx.amount.toFixed(2) }}</span>
    </div>
  </div>
</div>
```

### 3. Daily Spending Chart

The daily spending chart visualizes:
- Daily spending amounts as bars
- Threshold line for spending limits
- Visual indicators for over-threshold days

```html
<div class="chart-wrapper">
  <!-- Maximum threshold indicator -->
  <div class="threshold-line">
    <div class="threshold-label">${{ spendingThreshold }} threshold</div>
  </div>
  
  <div class="chart-container">
    <div 
      v-for="(day, index) in dailySpending" 
      :key="index" 
      class="chart-column"
    >
      <!-- Amount label -->
      <div class="day-amount" :class="{ 'over-threshold': day.amount > spendingThreshold }">
        ${{ Math.round(day.amount) }}
      </div>
      
      <!-- Bar -->
      <div class="bar-container">
        <div 
          class="bar" 
          :style="{ height: calculateBarHeight(day.amount) }"
          :class="{ 'over-threshold': day.amount > spendingThreshold }"
        ></div>
      </div>
      
      <!-- Day label -->
      <div class="day-label">{{ day.label }}</div>
    </div>
  </div>
</div>
```

### 4. Monthly Savings Goal

The monthly savings goal component displays:
- Goal amount
- Weekly contribution
- Progress percentage
- Visual progress bar

```html
<div class="goal-progress">
  <h3>Monthly Savings Goal</h3>
  <div class="goal-content">
    <div class="goal-info">
      <div class="goal-amount">
        <span class="label">Goal:</span>
        <span class="value">${{ monthlyGoal.toFixed(2) }}</span>
      </div>
      <div class="goal-contribution">
        <span class="label">This week:</span>
        <span class="value positive">+${{ weeklyContribution.toFixed(2) }}</span>
      </div>
    </div>
    <div class="progress-container">
      <div class="progress-bar">
        <div 
          class="progress" 
          :style="{ width: `${goalProgress}%` }"
        ></div>
      </div>
      <div class="progress-label">{{ goalProgress }}% complete</div>
    </div>
  </div>
</div>
```

## Special Cases

### 1. Multi-Month Weeks

When a week spans two months, the budget allocation becomes more complex:

```typescript
// Handle multi-month weeks
function handleMultiMonthWeek(
  weekStart: Date,
  weekEnd: Date,
  categoryBudgets: { [monthKey: string]: number }
): number {
  // Get the list of months that this week spans
  const months = getMonthsBetween(weekStart, weekEnd);
  
  // Calculate budget for each portion of the week
  let totalBudget = 0;
  
  months.forEach(month => {
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
    const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`;
    
    // Find intersection of week and month
    const periodStart = weekStart > monthStart ? weekStart : monthStart;
    const periodEnd = weekEnd < monthEnd ? weekEnd : monthEnd;
    
    // Calculate days in period and month
    const daysInPeriod = getDaysBetween(periodStart, periodEnd) + 1;
    const daysInMonth = getDaysBetween(monthStart, monthEnd) + 1;
    
    // Calculate proportion of month and apply to budget
    const proportion = daysInPeriod / daysInMonth;
    totalBudget += (categoryBudgets[monthKey] || 0) * proportion;
  });
  
  return totalBudget;
}
```

### 2. Credit Card Transactions

YNAB handles credit card transactions differently, requiring special handling:

```typescript
// Process credit card transactions
function processCreditCardTransactions(
  transactions: YNABTransaction[],
  creditCardPayeeIds: string[]
): YNABTransaction[] {
  // Filter out credit card payment transactions to avoid double counting
  return transactions.filter(tx => {
    // If it's a credit card payment (transfer), exclude it
    if (creditCardPayeeIds.includes(tx.payee_id) && tx.amount > 0) {
      return false;
    }
    return true;
  });
}
```

### 3. Split Transactions

YNAB supports split transactions, which require special handling:

```typescript
// Handle split transactions
function handleSplitTransactions(
  transactions: YNABTransaction[]
): YNABTransaction[] {
  // Group transactions by parent_transaction_id
  const grouped: { [parentId: string]: YNABTransaction[] } = {};
  
  transactions.forEach(tx => {
    if (tx.parent_transaction_id) {
      if (!grouped[tx.parent_transaction_id]) {
        grouped[tx.parent_transaction_id] = [];
      }
      grouped[tx.parent_transaction_id].push(tx);
    }
  });
  
  // Process each transaction
  return transactions.map(tx => {
    // If this is a parent of split transactions, skip it as we'll use the splits
    if (grouped[tx.id]) {
      return null;
    }
    
    // If this is a split transaction, use the category from the split
    if (tx.parent_transaction_id) {
      // We include the split as is
      return tx;
    }
    
    // Regular transaction
    return tx;
  }).filter(Boolean) as YNABTransaction[];
}
```

## Testing YNAB Data Integration

To ensure accurate data transformation, the following tests should be performed:

1. **Monthly to Weekly Allocation**
   - Test with weeks entirely within a month
   - Test with weeks spanning two months
   - Test with leap years and different month lengths

2. **Transaction Filtering**
   - Test with transactions on week boundaries
   - Test with transactions outside the week
   - Test with different time zones

3. **Daily Spending Aggregation**
   - Test with multiple transactions per day
   - Test with days having no transactions
   - Test with negative transactions (refunds)

4. **Category Processing**
   - Test with categories that are over budget
   - Test with categories that have no activity
   - Test with hidden categories

## Fallback Strategy

When YNAB data is unavailable or during development, the `DemoDataService` provides realistic sample data:

```typescript
// Example from DemoDataService
static async getWeeklyData(): Promise<WeeklyBudgetData> {
  // Simulated API response delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Sample categories with transactions
  const categories: CategoryData[] = [
    {
      id: '1',
      name: 'Groceries',
      budgeted: 200,
      spent: 150.50,
      remaining: 49.50,
      transactions: [
        { id: 1, payee: 'Whole Foods', amount: 85.50, category: 'Groceries' },
        { id: 2, payee: 'Trader Joes', amount: 45.25, category: 'Groceries' },
        { id: 3, payee: 'Local Market', amount: 19.75, category: 'Groceries' }
      ]
    },
    // Additional categories...
  ];

  // Sample daily spending
  const dailySpending: DailySpending[] = [
    {
      label: 'Mon',
      amount: 145.50,
      date: new Date(2024, 2, 18),
      transactions: [
        { id: 1, payee: 'Grocery Store', amount: 85.50, category: 'Groceries' },
        // Additional transactions...
      ]
    },
    // Additional days...
  ];

  // Return complete sample data
  return {
    totalBudget: 1250,
    totalSpent: 875.50,
    remainingBudget: 374.50,
    categories,
    dailySpending,
    dateRange: {
      start: new Date(2024, 2, 18), // March 18, 2024
      end: new Date(2024, 2, 24)    // March 24, 2024
    },
    daysLeft: 3 // Sample value
  };
}
```

## Future Enhancements

1. **Historical Data Comparison**
   - Compare current week with previous weeks
   - Show spending trends over time
   - Highlight changes in spending patterns

2. **Custom Date Ranges**
   - Allow users to select custom date ranges
   - Support bi-weekly budgeting
   - Implement pay-period based views

3. **Advanced Category Analysis**
   - Provide category-specific insights
   - Show category spending trends
   - Suggest budget adjustments based on spending patterns

4. **Goal Integration**
   - Connect with YNAB goals
   - Track goal progress by week
   - Provide goal-specific recommendations 