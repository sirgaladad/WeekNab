# WeekNab

A modern Vue.js application for weekly YNAB budget management with a beautiful dark theme interface.

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
│   │   ├── budget/
│   │   │   └── WeeklyView.vue       # Weekly budget display
│   │   ├── common/
│   │   │   ├── Layout.vue           # App layout with theme toggle
│   │   │   ├── Footer.vue           # Site footer with social links
│   │   │   └── SocialShare.vue      # Social sharing component
│   │   └── home/
│   │       └── KeyFeatures.vue      # Home page features grid
│   ├── views/
│   │   ├── HomeView.vue             # Landing page
│   │   ├── BudgetsView.vue          # Budgets dashboard
│   │   ├── BudgetDetailView.vue     # Single budget view
│   │   ├── PrivacyPolicy.vue        # Privacy policy
│   │   └── TermsOfUse.vue          # Terms of use
│   ├── services/
│   │   ├── auth.service.ts         # Authentication handling
│   │   └── ynab.service.ts         # YNAB API integration
│   ├── stores/
│   │   └── budget.store.ts         # Pinia store for budget state
│   └── types/
│       └── ynab.types.ts           # TypeScript definitions
```

## 🔧 Technology Stack

- **Vue 3** with Composition API and `<script setup>`
- **Vite** for lightning-fast development
- **TypeScript** for type safety
- **Pinia** for state management
- **Vue Router** for navigation
- **YNAB API** for budget data

## 🎯 Key Features

1. **Weekly Budget View**
   - Break down monthly budgets into weeks
   - Track spending patterns
   - Visual progress indicators

2. **Dark/Light Theme**
   - System preference detection
   - Manual toggle option
   - Consistent styling

3. **Social Integration**
   - Share with friends
   - Social media links
   - Community engagement

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
4. Write tests
5. Submit PR

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

# Run all tests with coverage
npm run test
```

## 📘 Development Journal

See [LEARNING.md](./docs/LEARNING.md) for:
- Development decisions
- Problem solutions
- Learning outcomes
- Best practices

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