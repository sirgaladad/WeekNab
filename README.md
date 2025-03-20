# WeekNab

A modern Vue.js application for weekly YNAB budget management with a beautiful dark theme interface.

## 🎯 Current Status

### Implemented Features
- Weekly budget overview with total/spent/remaining visualization
- Category spending tracking with progress bars and transaction previews
- Category filters (All, Over Budget, Under Budget)
- Daily spending chart with threshold visualization
- Monthly savings goal tracking
- Weekly insights section with actionable recommendations
- YNAB token authentication and validation
- Modern dark theme UI with responsive design
- Demo mode with realistic budget data
- Enhanced data caching for improved performance
- Robust error handling with retry logic
- Support for split transactions and credit cards
- Multi-month week handling

### In Development
- Enhanced transaction details view
- Theme toggle (dark/light)
- Custom spending threshold configuration
- Historical data comparison

## 🌐 Project Website

Check out our [GitHub Pages website](https://yourusername.github.io/WeekNab/) for more information about the project, features, and roadmap.

## 📋 Project Plan

The complete project plan with timeline, deliverables, and development phases is available in [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md).

## 👨‍💻 Development

Developed by Corey Boelkens at [Cobobots.com](https://cobobots.com). WeekNab is one of many innovative products from Cobobots.com.

## 🎨 Design Features

- Modern dark theme UI with component consistency
- Fully responsive design with mobile-first approach
- Interactive data visualizations with threshold indicators
- Clear budget status indicators with color coding
- Accessibility-focused components
- Intuitive navigation with weekly date selection

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## 🔑 YNAB Integration

1. Get your YNAB Personal Access Token from [app.ynab.com/settings/developer](https://app.ynab.com/settings/developer)
2. Enter your token in WeekNab
3. Start managing your weekly budget!

## 📁 Project Structure

```
weeknab/
├── src/
│   ├── components/
│   │   ├── auth/                    # Authentication components
│   │   ├── dashboard/
│   │   │   ├── WeeklyDashboard.vue  # Weekly budget display
│   │   │   └── sections/            # Dashboard section components
│   │   ├── insights/
│   │   │   ├── InsightsContainer.vue # Insights section container
│   │   │   └── InsightCard.vue      # Individual insight cards
│   │   └── common/                  # Shared components
│   ├── views/
│   │   ├── HomeView.vue             # Landing page
│   │   ├── DashboardView.vue        # Main dashboard container
│   │   ├── DemoView.vue             # Demo view with sample data
│   │   ├── BudgetsView.vue          # Budget selection
│   │   ├── WeeklyBudgetView.vue     # Weekly budget view
│   │   └── 404-page.vue             # Not found page
│   ├── services/
│   │   ├── auth.service.ts          # Authentication handling
│   │   ├── ynab.service.ts          # YNAB API integration
│   │   ├── ynab-weekly.service.ts   # Weekly budget processing
│   │   ├── cache.service.ts         # Data caching service
│   │   └── DemoDataService.ts       # Demo data provider
│   ├── types/
│   │   └── budget.ts                # Type definitions for budget data
│   └── stores/
│       └── auth.ts                  # Authentication store
├── github-pages/                    # GitHub Pages website
├── docs/                            # Project documentation
└── .github/                         # GitHub configurations
```

## 🔧 Technology Stack

- **Vue 3** with Composition API and `<script setup>`
- **Vite** for lightning-fast development
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** for navigation
- **YNAB API** for budget data
- **Supabase** for backend services (coming soon)

## 🎯 Key Features

1. **Weekly Budget Dashboard**
   - Break down monthly budgets into week view
   - Visual budget progress with status indicators
   - Dynamic date navigation with days remaining
   - Progressive budget visualization

2. **Category Management**
   - Filter by budget status (All/Over/Under)
   - Transaction previews within categories
   - Progress visualization with color-coded indicators
   - Show more/less categories with intuitive controls

3. **Daily Spending Chart**
   - Day-by-day spending visualization
   - Threshold indicator for spending limits
   - Color-coded indicators for over-threshold days
   - Average daily spend calculation

4. **Monthly Savings Goal**
   - Goal progress visualization
   - Weekly contribution tracking
   - Percentage complete indicator

5. **Weekly Insights**
   - Spending analysis and recommendations
   - Budget progress summaries
   - Actionable suggestions for budget management

## 🌐 YNAB Data Integration

The application processes YNAB data to provide weekly insights:

1. **Data Transformation**:
   - YNAB monthly categories → Weekly budget allocation
   - Transaction data → Daily spending patterns
   - Category groups → Simplified category view
   - Support for split transactions and credit cards
   - Multi-month week handling

2. **Weekly Calculation**:
   - Proportional budget allocation for partial weeks
   - Remaining days calculation
   - Dynamic date range handling
   - Cached data for improved performance

3. **Error Handling**:
   - Automatic retry for failed requests
   - Rate limit handling
   - User-friendly error messages
   - Fallback to demo data when needed

## 📊 Development Phases

1. **Phase 1: Component Architecture** (Completed)
   - Creation of core UI components
   - Responsive layout implementation
   - Component hierarchy establishment

2. **Phase 2: Data Layer** (In Progress)
   - Data services implementation
   - Supabase integration
   - Caching mechanisms

3. **Phase 3: API Integration** (Upcoming)
   - YNAB API connection
   - Authentication flow
   - Data transformation

4. **Phase 4: Testing & Refinement** (Upcoming)
   - Unit and integration testing
   - Performance optimization
   - Accessibility improvements

5. **Phase 5: Launch & Feedback** (Upcoming)
   - Production deployment
   - User documentation
   - Feedback collection

## 📘 Development Documentation

- [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) - Detailed project plan and roadmap
- [LEARNING.md](./docs/LEARNING.md) - Development decisions and learning outcomes
- [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) - Design system documentation
- [YNAB_DATA_INTEGRATION.md](./docs/YNAB_DATA_INTEGRATION.md) - YNAB integration details
- [RELEASE_PLAN.md](./docs/RELEASE_PLAN.md) - Release planning and checklist

## 📝 License

MIT

## 🌐 Links

- [Project Website](https://yourusername.github.io/WeekNab/)
- [Cobobots.com](https://cobobots.com)
- [YNAB Developer Portal](https://app.ynab.com/settings/developer)
- [Privacy Policy](/privacy)
- [Terms of Use](/terms) 