-- Create demo_budgets table
CREATE TABLE IF NOT EXISTS public.demo_budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  week_number INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_budget DECIMAL(10,2) NOT NULL,
  total_spent DECIMAL(10,2) NOT NULL,
  total_remaining DECIMAL(10,2) NOT NULL,
  percentage_spent DECIMAL(5,2) NOT NULL,
  categories JSONB NOT NULL DEFAULT '[]'::JSONB,
  insights JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster date-based lookups
CREATE INDEX IF NOT EXISTS idx_demo_budgets_start_date ON public.demo_budgets(start_date);

-- Enable RLS but allow public access for demo data
ALTER TABLE public.demo_budgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to demo_budgets" 
  ON public.demo_budgets FOR SELECT 
  TO public 
  USING (true);

-- Insert initial demo data
INSERT INTO public.demo_budgets (
  week_number,
  start_date,
  end_date,
  total_budget,
  total_spent,
  total_remaining,
  percentage_spent,
  categories,
  insights
) VALUES (
  1,
  CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER,
  CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6,
  1250.00,
  875.50,
  374.50,
  70.00,
  '[
    {
      "id": "1",
      "name": "Groceries",
      "color": "#FF6B6B",
      "budgeted": 200.00,
      "spent": 165.75,
      "remaining": 34.25,
      "percentageSpent": 82.88,
      "isOverBudget": false,
      "transactions": [
        {
          "id": "g1",
          "date": "2024-03-20",
          "payee": "Whole Foods Market",
          "amount": -85.50
        },
        {
          "id": "g2",
          "date": "2024-03-23",
          "payee": "Local Grocery Store",
          "amount": -80.25
        }
      ]
    },
    {
      "id": "2",
      "name": "Dining Out",
      "color": "#4D96FF",
      "budgeted": 150.00,
      "spent": 145.50,
      "remaining": 4.50,
      "percentageSpent": 97.00,
      "isOverBudget": false,
      "transactions": [
        {
          "id": "d1",
          "date": "2024-03-21",
          "payee": "Local Restaurant",
          "amount": -65.75
        },
        {
          "id": "d2",
          "date": "2024-03-22",
          "payee": "Coffee Shop",
          "amount": -79.75
        }
      ]
    }
  ]'::JSONB,
  '{
    "days_left": 4,
    "weekly_overview": {
      "message": "You are 70% through your weekly budget with 4 days remaining.",
      "remaining_amount": 374.50
    },
    "category_insights": [
      {
        "name": "Groceries",
        "spent": 165.75,
        "budgeted": 200.00,
        "remaining": 34.25,
        "power_goal": {
          "name": "Healthy Eating Goal",
          "amount": 34.25
        }
      },
      {
        "name": "Dining Out",
        "spent": 145.50,
        "budgeted": 150.00,
        "remaining": 4.50,
        "power_goal": {
          "name": "Restaurant Savings",
          "amount": 4.50
        }
      }
    ],
    "recent_activity": [
      {
        "id": "ra1",
        "date": "2024-03-23",
        "payee": "Whole Foods Market",
        "amount": -85.50,
        "category": "Groceries"
      },
      {
        "id": "ra2",
        "date": "2024-03-22",
        "payee": "Coffee Shop",
        "amount": -79.75,
        "category": "Dining Out"
      }
    ],
    "goal_impact": {
      "message": "Keep up the good work! You could save $187.25 this week.",
      "goal_type": "savings",
      "amount": 187.25
    }
  }'::JSONB
); 