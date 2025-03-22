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
  categories JSONB NOT NULL,
  insights JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on start_date for faster lookups
CREATE INDEX IF NOT EXISTS demo_budgets_start_date_idx ON public.demo_budgets(start_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.demo_budgets ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read demo data
CREATE POLICY "Allow public read access to demo_budgets"
  ON public.demo_budgets
  FOR SELECT
  TO public
  USING (true);

-- Insert sample demo data for the current week
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
  12, -- Week number
  CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER, -- Start of current week
  CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 6, -- End of current week
  1250.00, -- Total budget
  875.50,  -- Total spent
  374.50,  -- Total remaining
  70.00,   -- Percentage spent
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
          "date": "2024-03-16",
          "payee": "Whole Foods Market",
          "amount": -85.50
        },
        {
          "id": "g2",
          "date": "2024-03-19",
          "payee": "Local Grocery Store",
          "amount": -80.25
        }
      ]
    }
  ]'::JSONB,
  '{
    "days_left": 4,
    "weekly_overview": {
      "message": "You''re 70% through your weekly budget with 4 days remaining. Five categories are currently over budget. Consider adjusting spending to stay on track.",
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
      }
    ],
    "recent_activity": [
      {
        "id": "ra1",
        "date": "2024-03-19",
        "payee": "Whole Foods Market",
        "amount": -85.50,
        "category": "Groceries"
      }
    ],
    "goal_impact": {
      "message": "If you reduce spending in over-budget categories, you could add $91.50 more to your savings goals this week!",
      "goal_type": "savings",
      "amount": 91.50
    }
  }'::JSONB
); 