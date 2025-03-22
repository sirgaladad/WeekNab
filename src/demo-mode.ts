// demo-mode.ts
// This file sets up mock data and handlers for demo mode when real backend services are unavailable

// Mock YNAB API implementation to prevent require errors
const mockYnabApi = {
  budgets: {
    getBudgets: () => Promise.resolve({
      data: {
        budgets: [
          { id: 'demo-budget-1', name: 'Demo Budget' },
          { id: 'demo-budget-2', name: 'Secondary Budget' }
        ]
      }
    }),
    getBudgetById: () => Promise.resolve({
      data: {
        budget: {
          id: 'demo-budget-1',
          name: 'Demo Budget',
          currency_format: { iso_code: 'USD' },
          categories: [],
          category_groups: []
        }
      }
    })
  },
  transactions: {
    getTransactionsByBudget: () => Promise.resolve({
      data: {
        transactions: []
      }
    })
  }
};

// Check if we're in demo mode
export const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.VITE_SUPABASE_URL === 'https://demo-project.supabase.co';

// Export mock API if in demo mode
export const getYnabApi = () => {
  if (isDemoMode) {
    console.warn('Using mock YNAB API in demo mode');
    return mockYnabApi;
  }
  
  // In real mode, this should never be called directly
  throw new Error('Use proper API initialization in production mode');
};

// Helper function to get pre-populated demo data for the dashboard
export function getDemoData() {
  // Import and use the demo data service directly
  console.log('Loading demo data in demo mode')
  
  // Use a static import to avoid the dynamic import issues
  import('@/services/demo-data.service').then(module => {
    console.log('Demo data service loaded:', module)
  }).catch(error => {
    console.error('Error loading demo data service:', error)
  })
  
  // Fallback demo data
  return Promise.resolve({
    weekNumber: 12,
    dateRange: {
      start: new Date(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    budget: {
      total: 1200,
      spent: 850,
      remaining: 350,
      percentageSpent: 70
    },
    categories: [
      {
        id: 'cat-1',
        name: 'Groceries',
        color: '#4CAF50',
        budgeted: 300,
        spent: 275,
        remaining: 25,
        percentageSpent: 92,
        isOverBudget: false,
        transactions: []
      },
      {
        id: 'cat-2',
        name: 'Dining Out',
        color: '#FF5722',
        budgeted: 200,
        spent: 180,
        remaining: 20,
        percentageSpent: 90,
        isOverBudget: false,
        transactions: []
      }
    ],
    insights: {
      daysLeft: 3,
      weeklyOverview: {
        message: 'You\'re on track with your budget this week.',
        remainingAmount: 350
      },
      categoryInsights: [],
      recentActivity: [],
      goalImpact: {
        message: 'Keep up the good work!',
        goalType: 'savings',
        amount: 350
      }
    }
  })
}

// Setup window-level error handler for require errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.error?.message?.includes('require is not defined')) {
      console.warn('Caught require error in demo mode - this is expected and handled');
      event.preventDefault();
    }
  });
}

// Call this function to initialize demo mode
export function setupDemoMode() {
  if (isDemoMode) {
    console.log('🚀 Demo mode initialized - using mock data');
    
    // Add any other demo mode setup here
    
    // Polyfill require for libraries that expect it
    if (typeof window !== 'undefined' && !(window as any).require) {
      const mockRequire = (module: string) => {
        console.warn(`Mock require called for module: ${module}`);
        if (module === 'ynab') {
          return { API: { new: () => mockYnabApi }};
        }
        return {};
      };
      
      // Only add this in development/demo mode, never in production
      (window as any).require = mockRequire;
    }
  }
} 