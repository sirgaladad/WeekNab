# WeekNab Design System

## 🎨 Design Assets

### 1. Weekly Dashboard Design
**Status**: Implemented
**File**: `weekly-view-mockup.svg`
**Tags**: #dashboard #weekly-view #budget-overview
**Components**:
- Budget Overview Card
- Category Management
- Daily Spending Chart
- Insights Section
- Monthly Savings Goal

### 2. Color Palette
```typescript
interface ColorSystem {
  primary: {
    main: "#3B82F6",
    light: "#60A5FA",
    dark: "#2563EB"
  },
  success: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669"
  },
  error: {
    main: "#EF4444",
    light: "#F87171",
    dark: "#DC2626"
  },
  neutral: {
    background: "#1A1D23",
    surface: "#242731",
    surfaceLight: "#2E303A",
    text: {
      primary: "#FFFFFF",
      secondary: "#94A3B8",
      tertiary: "#64748B"
    }
  },
  overlay: {
    surface: "rgba(26, 29, 35, 0.8)",
    light: "rgba(255, 255, 255, 0.05)",
    dark: "rgba(0, 0, 0, 0.4)"
  }
}
```

### 3. Typography
```typescript
interface TypographySystem {
  fontFamily: {
    primary: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace"
  },
  scale: {
    h1: "2.25rem/2.75rem",  // 36px
    h2: "1.5rem/2rem",      // 24px
    h3: "1.25rem/1.75rem",  // 20px
    subtitle: "1.125rem/1.5rem", // 18px
    body: "1rem/1.5rem",    // 16px
    small: "0.875rem/1.25rem", // 14px
    xs: "0.75rem/1rem"      // 12px
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
}
```

### 4. Component Library

#### 4.1 Cards
```typescript
interface Cards {
  budgetOverview: {
    status: "Implemented",
    file: "components/dashboard/WeeklyDashboard.vue",
    borderRadius: "1rem",
    padding: "2rem",
    background: "#242731",
    border: "1px solid rgba(59, 130, 246, 0.1)",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  category: {
    status: "Implemented",
    file: "components/dashboard/WeeklyDashboard.vue (categories-grid)",
    borderRadius: "0.875rem",
    padding: "1.25rem",
    background: "#242731",
    border: "1px solid rgba(59, 130, 246, 0.1)",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  insight: {
    status: "Implemented",
    file: "components/insights/InsightCard.vue",
    borderRadius: "0.875rem",
    padding: "1.5rem",
    background: "#242731",
    border: "1px solid rgba(59, 130, 246, 0.1)",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  dailySpendingChart: {
    status: "Implemented",
    file: "components/dashboard/WeeklyDashboard.vue (spending-chart)",
    borderRadius: "0.875rem",
    padding: "1.75rem",
    background: "#242731",
    border: "1px solid rgba(59, 130, 246, 0.1)",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  monthlyGoal: {
    status: "Implemented",
    file: "components/dashboard/WeeklyDashboard.vue (goal-progress)",
    borderRadius: "0.875rem",
    padding: "1.25rem",
    background: "#242731",
    border: "1px solid rgba(59, 130, 246, 0.1)",
    shadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
}
```

#### 4.2 Buttons and Interactive Elements
```typescript
interface InteractiveElements {
  buttons: {
    primary: {
      background: "#3B82F6",
      hoverBackground: "#2563EB",
      color: "#FFFFFF",
      borderRadius: "0.5rem",
      padding: "0.75rem 1.5rem"
    },
    secondary: {
      background: "none",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      hoverBorder: "1px solid #3B82F6",
      color: "#94A3B8",
      hoverColor: "#3B82F6",
      borderRadius: "2rem",
      padding: "0.5rem 1rem"
    },
    filter: {
      background: "none",
      activeBackground: "#3B82F6",
      color: "#94A3B8",
      activeColor: "#FFFFFF",
      borderRadius: "2rem",
      padding: "0.5rem 1rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      activeBorder: "1px solid #3B82F6"
    },
    navigation: {
      background: "rgba(59, 130, 246, 0.1)",
      hoverBackground: "rgba(59, 130, 246, 0.2)",
      color: "#E1E7EF",
      borderRadius: "0.75rem",
      size: "40px"
    }
  },
  links: {
    standard: {
      color: "#94A3B8",
      hoverColor: "#FFFFFF",
      textDecoration: "none"
    }
  }
}
```

#### 4.3 Data Visualizations
```typescript
interface DataVisualizations {
  progressBars: {
    height: "0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    fillColor: "#3B82F6",
    overBudgetColor: "#EF4444",
    borderRadius: "0.375rem"
  },
  dailySpendingChart: {
    barWidth: "36px",
    barColor: "#3B82F6",
    overThresholdGradient: "linear-gradient(to top, #3B82F6 80%, #EF4444 80%)",
    thresholdLineColor: "rgba(239, 68, 68, 0.3)",
    barBorderRadius: "4px 4px 0 0"
  },
  goalProgress: {
    height: "0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    fillColor: "#3B82F6",
    borderRadius: "0.375rem"
  }
}
```

## 📱 Responsive Breakpoints
```scss
// Mobile First Approach
$breakpoints: (
  'sm': 480px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px
);

// Usage
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// Mobile-specific adjustments
@media (max-width: 768px) {
  .week-navigation {
    padding: 1rem;
    margin-bottom: 1.25rem;
  }

  .nav-button {
    width: 36px;
    height: 36px;
  }

  .week-info h2 {
    font-size: 1.25rem;
  }

  .currency {
    font-size: 1.75rem;
  }

  .amount {
    font-size: 3rem;
  }

  .chart-wrapper {
    height: 200px;
    overflow-x: auto;
  }
  
  .chart-container {
    min-width: 500px;
  }
  
  .bar {
    width: 28px;
  }
}
```

## 🎯 Design Decisions

### 1. Dark Theme Priority
- **Rationale**: Better readability for financial data
- **Implementation**: Dark background (#1A1D23) with lighter surface elements (#242731)
- **Status**: Implemented
- **Tags**: #theme #accessibility #ux

### 2. Card-Based Layout
- **Rationale**: Clear content separation and visual hierarchy
- **Implementation**: Consistent card styling with subtle borders and shadows
- **Status**: Implemented
- **Tags**: #layout #components #structure

### 3. Interactive Elements
- **Rationale**: Clear user feedback and affordance
- **Implementation**: Hover states, transitions, and consistent interactive patterns
- **Status**: Implemented
- **Tags**: #interaction #feedback #animation

### 4. Data Visualization
- **Rationale**: Intuitive understanding of budget status
- **Implementation**: Color-coded progress bars, dynamic daily spending chart
- **Status**: Implemented
- **Tags**: #visualization #data #charts

### 5. Mobile-First Approach
- **Rationale**: Ensure great experience on all devices
- **Implementation**: Responsive breakpoints with device-specific optimizations
- **Status**: Implemented
- **Tags**: #responsive #mobile #accessibility

## 📊 Design Patterns

### 1. Data Visualization
```typescript
interface DataVisualization {
  charts: {
    dailySpending: {
      type: "Bar",
      style: {
        height: "250px",
        barWidth: "36px",
        barRadius: "4px 4px 0 0"
      },
      features: {
        threshold: {
          position: "absolute",
          color: "rgba(239, 68, 68, 0.3)"
        },
        labels: {
          position: "absolute",
          top: "-25px", // Amount labels
          bottom: "-25px" // Day labels
        }
      }
    },
    progress: {
      type: "Linear",
      style: {
        height: "0.75rem",
        borderRadius: "0.375rem"
      },
      variants: {
        standard: {
          color: "#3B82F6"
        },
        overBudget: {
          color: "#EF4444"
        },
        goal: {
          color: "#3B82F6"
        }
      }
    }
  }
}
```

### 2. Navigation
```typescript
interface Navigation {
  weekNavigation: {
    type: "Horizontal",
    style: {
      background: "#1A1D23",
      borderRadius: "0.75rem",
      padding: "1.25rem"
    },
    elements: {
      buttons: {
        size: "40px",
        background: "rgba(59, 130, 246, 0.1)"
      },
      dateInfo: {
        textAlign: "center",
        title: {
          fontSize: "1.5rem",
          color: "#FFFFFF"
        },
        subtitle: {
          fontSize: "1rem",
          color: "#94A3B8"
        }
      }
    }
  },
  categoryFilters: {
    type: "Horizontal",
    style: {
      display: "flex",
      gap: "0.5rem"
    },
    elements: {
      buttons: {
        borderRadius: "2rem",
        padding: "0.5rem 1rem",
        active: {
          background: "#3B82F6",
          color: "#FFFFFF"
        },
        inactive: {
          background: "none",
          color: "#94A3B8"
        }
      }
    }
  }
}
```

### 3. Card Structure
```typescript
interface CardStructure {
  header: {
    title: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#FFFFFF",
      marginBottom: "1.5rem"
    }
  },
  content: {
    padding: "1.25rem to 2rem",
    gap: "1rem"
  },
  footer: {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "1rem",
    marginTop: "1.5rem"
  }
}
```

## 🎨 Design Resources

### 1. Icons
- **Source**: Heroicons
- **Style**: Outline
- **Size**: 24x24px
- **Color**: Current color (inherits from parent)
- **Usage Example**:
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### 2. Shadows
```css
--card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
--elevated-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
--button-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
```

### 3. Spacing System
```css
--space-xs: 0.25rem;  /* 4px */
--space-sm: 0.5rem;   /* 8px */
--space-md: 0.75rem;  /* 12px */
--space-base: 1rem;   /* 16px */
--space-lg: 1.25rem;  /* 20px */
--space-xl: 1.5rem;   /* 24px */
--space-2xl: 2rem;    /* 32px */
--space-3xl: 2.5rem;  /* 40px */
```

## 📝 Component Guidelines

### 1. WeeklyDashboard Component
- **Structure**: Card-based layout with consistent spacing
- **Interactive Elements**: Navigation buttons, category filters
- **Visual Hierarchy**: Budget amount as focal point, categories in grid layout
- **Responsive Behavior**: Stack on mobile, grid on larger screens

### 2. Daily Spending Chart
- **Visual Design**: Bar chart with threshold indicator
- **Interactive States**: None (static visualization)
- **Responsive Behavior**: Horizontal scroll on mobile
- **Accessibility**: Amount and day labels for screen readers

### 3. Category Cards
- **Visual Design**: Consistent card styling with progress bar
- **Interactive States**: Hover effect for cards with transactions
- **Responsive Behavior**: Full width on mobile, grid on larger screens
- **Accessibility**: Color is not the only indicator of over-budget status

### 4. Insight Cards
- **Visual Design**: Card with icon and content
- **Priority Levels**: Normal, Important, Warning (color-coded)
- **Content Structure**: Title, description, optional action
- **Responsive Behavior**: Stack vertically, preserve readability 