# WeekNab

A modern Vue.js application for weekly YNAB budget management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
weeknab/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── TokenLogin.vue    # YNAB authentication
│   │   ├── budget/
│   │   │   └── WeeklyView.vue    # Weekly budget display
│   │   └── common/
│   │       └── Layout.vue        # Common layout components
│   ├── services/
│   │   └── ynab.service.ts       # YNAB API integration
│   ├── stores/
│   │   └── budget.store.ts       # Pinia store for budget state
│   └── types/
│       └── ynab.types.ts         # TypeScript definitions
├── tests/
│   ├── unit/
│   └── e2e/
└── docs/
    └── LEARNING.md               # Development learning journal
```

## 🔧 Technology Stack

- **Vue 3** with Composition API
- **Vite** for fast development
- **TypeScript** for type safety
- **Pinia** for state management
- **Vitest** for unit testing
- **Cypress** for E2E testing

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

## 🔄 Continuous Integration

- GitHub Actions workflow
- Automated testing
- Code quality checks
- Deployment pipeline

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
- Personal Access Token
- Secure token storage
- Token validation

### API Usage
- Budget fetching
- Transaction management
- Error handling

## 🛠 Contributing

1. Create feature branch
2. Make changes
3. Write tests
4. Submit PR

## 📝 License

MIT 