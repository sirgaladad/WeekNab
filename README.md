# WeekNab

A modern Vue.js application for weekly YNAB budget management with a beautiful dark theme interface.

## 🎯 Current Status

### Implemented Features
- Weekly budget overview with total/spent/remaining visualization
- Category spending tracking with progress bars
- Category filters (All, Over Budget, Under Budget)
- Transaction previews within categories
- YNAB token authentication and validation
- Modern dark theme UI
- Responsive mobile-first design

### In Development
- Enhanced category management
- Weekly insights section
- Theme toggle (dark/light)
- Additional demo data
- Loading state improvements

## 👨‍💻 Development

Developed by Corey Boelkens at [Cobobots.com](https://cobobots.com). WeekNab is one of many innovative products from Cobobots.com.

## 🎨 Design Features

- Modern dark theme UI with light mode toggle
- Fully responsive design for all devices
- Accessibility-focused components
- Intuitive navigation and user flow
- Social sharing integration
- Weekly budget insights

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
│   │   ├── auth/
│   │   │   └── TokenLogin.vue       # YNAB authentication
│   │   ├── dashboard/
│   │   │   └── WeeklyDashboard.vue  # Weekly budget display
│   │   └── common/
│   │       └── Layout.vue           # App layout
│   ├── views/
│   │   ├── HomeView.vue             # Landing page
│   │   ├── DashboardView.vue        # Main dashboard
│   │   └── DemoView.vue            # Demo view
│   ├── services/
│   │   ├── auth.service.ts         # Authentication handling
│   │   ├── ynab.service.ts         # YNAB API integration
│   │   └── demo-data.service.ts    # Demo data service
│   └── stores/
│       └── auth.ts                 # Authentication store
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
   - Break down monthly budgets into weeks
   - Track spending patterns
   - Visual progress indicators
   - Category filtering and management

2. **Category Management**
   - Filter by budget status
   - Transaction previews
   - Progress visualization
   - Over-budget indicators

3. **Weekly Insights**
   - Spending analysis
   - Budget progress
   - Goal tracking
   - Actionable recommendations

4. **Responsive Design**
   - Mobile-first approach
   - Tablet optimization
   - Desktop enhancement

## 🔐 Privacy & Security

- Client-side only processing
- No server storage of YNAB tokens
- Secure token handling
- Clear privacy policy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit PR

## 📝 License

MIT

## 🌐 Links

- [Cobobots.com](https://cobobots.com)
- [YNAB Developer Portal](https://app.ynab.com/settings/developer)
- [Privacy Policy](/privacy)
- [Terms of Use](/terms)

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e
```

## 📘 Development Notes

See [LEARNING.md](./docs/LEARNING.md) for development decisions and learning outcomes.
See [implementation-guide.txt](./docs/implementation-guide.txt) for detailed implementation details.

## 🔄 Development Process

1. **Setup & Configuration**
   - TypeScript configuration
   - ESLint setup
   - Vue 3 configuration
   - Path aliases

2. **Component Development**
   - Feature-based structure
   - Composition API usage
   - Type-safe props
   - Event handling

3. **Testing & Validation**
   - Linting checks
   - Type checking
   - Build validation
   - Performance testing

4. **Documentation**
   - Code comments
   - Component documentation
   - Learning journal updates
   - README maintenance

## 🎯 Development Principles

1. **Type Safety First**
   - Use TypeScript
   - Define interfaces for all data structures
   - Strict type checking

2. **Testing Strategy**
   - Unit tests for business logic
   - Component tests for UI
   - E2E tests for critical paths

3. **Code Organization**
   - Feature-based structure
   - Clear separation of concerns
   - Reusable components

4. **Performance**
   - Lazy loading
   - Code splitting
   - Performance monitoring

## 📊 YNAB Integration

### Authentication
- Personal Access Token approach
- Secure token storage
- Token validation

### API Usage
- Budget fetching
- Transaction management
- Error handling
- Rate limiting compliance

### Security Considerations
- Client-side only processing
- No server storage of tokens
- Secure communication

## 🔐 Privacy & Terms

WeekNab takes privacy and security seriously:

- No server-side storage of YNAB tokens
- Local processing of budget data
- Transparent data handling
- Clear terms of service

See our [Privacy Policy](/privacy-policy) and [Terms of Use](/terms-of-use) for more details.

## 🌐 Sharing Features

WeekNab includes social sharing capabilities:
- Direct link sharing
- Social media integration
- Referral tracking
- Community building

## 🛠 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit PR

## 📝 License

MIT

## 🎨 Current Features

- **Weekly Budget Management**
  - Break down monthly budgets into weekly chunks
  - Track spending patterns
  - Visual progress indicators

- **Modern UI/UX**
  - Dark theme with modern design
  - Responsive layout for all devices
  - Intuitive navigation
  - Beautiful animations and transitions

- **Core Features**
  1. Weekly Overview - See your budget broken down into weekly chunks
  2. Budget Insights - Get intelligent recommendations
  3. Category Analysis - Track spending categories
  4. Transaction Feed - Review recent transactions

- **Social Integration**
  - Share functionality with major platforms
  - Twitter, LinkedIn, and Facebook sharing
  - Direct link sharing
  - Community engagement 