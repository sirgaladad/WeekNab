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
    text: {
      primary: "#FFFFFF",
      secondary: "#94A3B8"
    }
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
    h1: "2.5rem/3rem",
    h2: "2rem/2.5rem",
    h3: "1.5rem/2rem",
    body: "1rem/1.5rem",
    small: "0.875rem/1.25rem"
  }
}
```

### 4. Component Library
```typescript
interface ComponentLibrary {
  cards: {
    budget: {
      status: "Implemented",
      file: "components/dashboard/BudgetCard.vue",
      tags: ["#card", "#budget", "#status"]
    },
    category: {
      status: "Implemented",
      file: "components/dashboard/CategoryCard.vue",
      tags: ["#card", "#category", "#progress"]
    },
    insight: {
      status: "Implemented",
      file: "components/dashboard/InsightCard.vue",
      tags: ["#card", "#insight", "#alert"]
    }
  },
  charts: {
    spending: {
      status: "Implemented",
      file: "components/dashboard/SpendingChart.vue",
      tags: ["#chart", "#spending", "#visualization"]
    }
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
```

## 🎯 Design Decisions

### 1. Dark Theme Priority
- **Rationale**: Better readability for financial data
- **Implementation**: Base theme with light mode option
- **Status**: Implemented
- **Tags**: #theme #accessibility #ux

### 2. Card-Based Layout
- **Rationale**: Clear content separation
- **Implementation**: Consistent card styling
- **Status**: Implemented
- **Tags**: #layout #components #structure

### 3. Interactive Elements
- **Rationale**: Clear user feedback
- **Implementation**: Hover states and transitions
- **Status**: Implemented
- **Tags**: #interaction #feedback #animation

## 📊 Design Patterns

### 1. Data Visualization
```typescript
interface DataVisualization {
  charts: {
    type: "Bar",
    style: {
      height: "200px",
      barWidth: "2.5rem",
      borderRadius: "0.5rem"
    }
  },
  progress: {
    type: "Linear",
    style: {
      height: "0.75rem",
      borderRadius: "0.375rem"
    }
  }
}
```

### 2. Navigation
```typescript
interface Navigation {
  primary: {
    type: "Horizontal",
    style: {
      height: "4rem",
      padding: "0 2rem"
    }
  },
  secondary: {
    type: "Vertical",
    style: {
      width: "16rem",
      padding: "1rem"
    }
  }
}
```

## 🎨 Design Resources

### 1. Icons
- **Source**: Heroicons
- **Style**: Outline
- **Size**: 24x24px
- **Color**: Current color
- **Tags**: #icons #ui #assets

### 2. Illustrations
- **Source**: Custom SVGs
- **Style**: Minimalist
- **Format**: SVG
- **Tags**: #illustrations #assets #branding

## 📝 Design Documentation

### 1. Component Guidelines
Each component should include:
- Visual design
- Interaction states
- Responsive behavior
- Accessibility considerations

### 2. Usage Examples
```vue
<!-- Example Component Usage -->
<template>
  <budget-card
    :amount="1000"
    :spent="750"
    :remaining="250"
    status="warning"
  />
</template>
```

## 🔄 Design Updates

### Recent Changes
1. Enhanced card shadows
2. Updated color contrast
3. Improved typography scale
4. Added loading states

### Planned Updates
1. Enhanced animations
2. Additional chart types
3. Custom illustrations
4. Accessibility improvements

## 🎯 Design Goals

### 1. Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast

### 2. Performance
- Optimized assets
- Efficient animations
- Responsive images
- Lazy loading

### 3. User Experience
- Clear hierarchy
- Consistent patterns
- Intuitive navigation
- Helpful feedback 