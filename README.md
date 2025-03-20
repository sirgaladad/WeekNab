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

### In Development
- Enhanced transaction details view
- Theme toggle (dark/light)
- Custom spending threshold configuration
- Historical data comparison

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
│   │   │   └── WeeklyDashboard.vue  # Weekly budget display
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
│   │   └── TransactionsView.vue     # Transactions list
│   ├── services/
│   │   ├── auth.service.ts          # Authentication handling
│   │   ├── ynab.service.ts          # YNAB API integration
│   │   ├── ynab-weekly.service.ts   # Weekly budget processing
│   │   └── DemoDataService.ts       # Demo data provider
│   ├── types/
│   │   └── budget.ts                # Type definitions for budget data
│   └── stores/
│       └── auth.ts                  # Authentication store
```

## 🔧 Technology Stack

- **Vue 3** with Composition API and `<script setup>`
- **Vite** for lightning-fast development
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** for navigation
- **YNAB API** for budget data

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

2. **Weekly Calculation**:
   - Proportional budget allocation for partial weeks
   - Remaining days calculation
   - Dynamic date range handling

## 📘 Development Documentation

See [LEARNING.md](./docs/LEARNING.md) for development decisions and learning outcomes.
See [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) for design system documentation.
See [implementation-guide.txt](./docs/implementation-guide.txt) for detailed implementation details.

## 🔄 Development Process

1. **Component Development**
   - Feature-based structure
   - Composition API with TypeScript
   - Responsive design implementation
   - Progressive enhancement

2. **Testing & Validation**
   - Linting and type checking
   - Component validation
   - Responsive testing
   - Edge case handling

3. **Release Planning**
   - Feature completeness verification
   - Design consistency review
   - Performance optimization
   - Documentation updates

## 🎯 Release v1.0 Focus

1. **Core Dashboard Functionality**
   - Weekly budget overview
   - Category management
   - Daily spending visualization
   - Savings goal tracking
   - Insights section

2. **Design System Compliance**
   - Component consistency
   - Responsive behavior
   - Accessibility standards
   - Visual hierarchy

3. **Data Integration**
   - Demo data service
   - YNAB API connection
   - Data transformation
   - Error handling

## 📝 License

MIT

## 🌐 Links

- [Cobobots.com](https://cobobots.com)
- [YNAB Developer Portal](https://app.ynab.com/settings/developer)
- [Privacy Policy](/privacy)
- [Terms of Use](/terms) 