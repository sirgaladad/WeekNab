-- Clear existing demo data
DELETE FROM public.demo_budgets;

-- Function to generate demo data for a week
CREATE OR REPLACE FUNCTION generate_demo_week(
  p_week_number INTEGER,
  p_start_date DATE,
  p_total_budget DECIMAL
) RETURNS void AS $$
DECLARE
  p_end_date DATE;
  p_spent DECIMAL;
  p_remaining DECIMAL;
  p_percentage_spent DECIMAL;
BEGIN
  -- Calculate end date
  p_end_date := p_start_date + INTERVAL '6 days';
  
  -- Generate random spending (between 60% and 90% of budget)
  p_spent := (p_total_budget * (60 + floor(random() * 30)::int) / 100)::DECIMAL(10,2);
  p_remaining := (p_total_budget - p_spent)::DECIMAL(10,2);
  p_percentage_spent := (p_spent / p_total_budget * 100)::DECIMAL(5,2);

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
    p_week_number,
    p_start_date,
    p_end_date,
    p_total_budget,
    p_spent,
    p_remaining,
    p_percentage_spent,
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
            "date": "' || (p_start_date + INTERVAL '2 days')::DATE::TEXT || '",
            "payee": "Whole Foods Market",
            "amount": -85.50
          },
          {
            "id": "g2",
            "date": "' || (p_start_date + INTERVAL '5 days')::DATE::TEXT || '",
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
            "date": "' || (p_start_date + INTERVAL '3 days')::DATE::TEXT || '",
            "payee": "Local Restaurant",
            "amount": -65.75
          },
          {
            "id": "d2",
            "date": "' || (p_start_date + INTERVAL '4 days')::DATE::TEXT || '",
            "payee": "Coffee Shop",
            "amount": -79.75
          }
        ]
      },
      {
        "id": "3",
        "name": "Entertainment",
        "color": "#6BCB77",
        "budgeted": 100.00,
        "spent": 85.49,
        "remaining": 14.51,
        "percentageSpent": 85.49,
        "isOverBudget": false,
        "transactions": [
          {
            "id": "e1",
            "date": "' || (p_start_date + INTERVAL '4 days')::DATE::TEXT || '",
            "payee": "Movie Theater",
            "amount": -45.50
          },
          {
            "id": "e2",
            "date": "' || (p_start_date + INTERVAL '5 days')::DATE::TEXT || '",
            "payee": "Streaming Services",
            "amount": -39.99
          }
        ]
      }
    ]'::JSONB,
    '{
      "days_left": ' || (7 - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER) || ',
      "weekly_overview": {
        "message": "You are ' || p_percentage_spent::TEXT || '% through your weekly budget with ' || 
          (7 - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER) || ' days remaining.",
        "remaining_amount": ' || p_remaining::TEXT || '
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
          "date": "' || (p_start_date + INTERVAL '5 days')::DATE::TEXT || '",
          "payee": "Whole Foods Market",
          "amount": -85.50,
          "category": "Groceries"
        }
      ],
      "goal_impact": {
        "message": "Keep up the good work! You could save ' || (p_remaining * 0.5)::DECIMAL(10,2)::TEXT || ' this week.",
        "goal_type": "savings",
        "amount": ' || (p_remaining * 0.5)::DECIMAL(10,2)::TEXT || '
      }
    }'::JSONB
  );
END;
$$ LANGUAGE plpgsql;

-- Generate demo data for the past 4 weeks and next 4 weeks
DO $$
DECLARE
  current_week_start DATE;
  week_counter INTEGER;
BEGIN
  -- Get the start of the current week
  current_week_start := CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER;
  
  -- Generate past weeks
  FOR week_counter IN -4..4 LOOP
    PERFORM generate_demo_week(
      ABS(week_counter), -- Week number
      current_week_start + (week_counter * 7), -- Start date
      1250.00 -- Total budget
    );
  END LOOP;
END;
$$; 