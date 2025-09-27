/\*\*

- VAE Web Project - Architecture Overview
- =====================================
-
- This document provides a comprehensive overview of the project's architecture,
- component structure, and development guidelines.
  \*/

# 🏗️ **Architecture Overview**

## **Project Structure**

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Text.tsx          # Typography components
│   │   ├── MagneticButton.tsx # Enhanced button component
│   │   ├── ThemeToggle.tsx   # Theme switching component
│   │   └── ThemeDemo.tsx     # Theme demonstration
│   ├── layout/               # Layout components
│   ├── pages/                # Page components
│   └── sections/             # Section components
├── contexts/                 # React contexts
│   └── ThemeContext.tsx      # Theme management
├── hooks/                    # Custom hooks
├── lib/                      # Utility libraries
├── services/                 # API services
├── stores/                   # State management
├── styles/                   # CSS and styling
│   ├── globals.css          # Global styles
│   ├── theme.css            # Theme variables
│   ├── typography.css       # Typography system
│   └── animations.css       # Animation utilities
├── types/                    # TypeScript definitions
│   ├── index.ts             # Main type exports
│   ├── typography.ts        # Typography types
│   └── theme.ts             # Theme types
└── utils/                    # Utility functions
```

## **Design System**

### **Typography Scale**

- **Base Size**: 16px (1rem)
- **Ratio**: 1.25 (Major Third)
- **Responsive**: Clamp functions for fluid scaling
- **Accessibility**: prefers-reduced-motion support

### **Color System**

- **Primary**: #00ffa5 (VAE Turquoise)
- **Secondary**: #00a5ff (VAE Blue)
- **Accent**: #a500ff (VAE Purple)
- **Theme Support**: Light/Dark/Auto modes

### **Component Guidelines**

- **TypeScript**: Strict typing required
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Hardware acceleration where possible
- **Responsiveness**: Mobile-first approach

## **Development Guidelines**

### **Code Style**

- **Imports**: Group by external, internal, types
- **Naming**: PascalCase for components, camelCase for functions
- **Documentation**: JSDoc for all public APIs
- **Testing**: Unit tests for critical components

### **Performance**

- **Bundle Splitting**: Lazy loading for large components
- **Image Optimization**: WebP with fallbacks
- **CSS**: Minimize repaints/reflows
- **JavaScript**: Avoid unnecessary re-renders

### **Accessibility**

- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels where needed
- **Color Contrast**: Minimum 4.5:1 ratio

---

# 📚 **Component Documentation**

## **Typography System**

### **Usage Examples**

```tsx
// Basic text
<Text size="lg" weight="semibold">Hello World</Text>

// Semantic headings
<Heading1>Main Title</Heading1>
<Heading2>Subtitle</Heading2>

// Responsive text
<Text size="base" responsive>Responsive text</Text>
```

### **Available Sizes**

- `xs` (12px-14px), `sm` (14px-16px), `base` (16px-18px)
- `lg` (18px-20px), `xl` (20px-24px), `2xl` (24px-32px)
- `3xl` (32px-40px), `4xl` (40px-48px), `5xl` (48px-64px), `6xl` (64px-80px)

## **Theme System**

### **Features**

- ✅ Light/Dark/Auto modes
- ✅ High contrast support
- ✅ Colorblind friendly
- ✅ System preference detection
- ✅ Persistent settings

### **Usage**

```tsx
const { mode, colorScheme, setMode, setColorScheme } = useTheme()

// Change theme
setMode('dark')
setColorScheme('high-contrast')
```

## **MagneticButton Component**

### **Props**

```tsx
interface MagneticButtonProps {
  children: React.ReactNode
  intensity?: number // Magnetic effect strength
  glowEffect?: boolean // Glow on hover
  rippleEffect?: boolean // Click ripple animation
  scaleEffect?: boolean // Scale on hover
  textSize?: FontSize // Typography size
  textWeight?: FontWeight // Typography weight
  disabled?: boolean // Disabled state
  ariaLabel?: string // Accessibility label
}
```

### **Performance Features**

- Hardware acceleration enabled
- Optimized re-renders
- Memory leak prevention
- Accessibility compliance

---

# 🚀 **Quick Start**

## **Adding New Components**

1. Create component in appropriate folder
2. Add TypeScript interfaces
3. Include JSDoc documentation
4. Add to component index file
5. Test accessibility and responsiveness

## **Using Typography**

```tsx
import { Text, Heading1, Body } from '@/components/ui/Text'

// Use semantic components
<Heading1>Welcome</Heading1>
<Body>This is body text</Body>

// Or flexible Text component
<Text size="lg" weight="bold" lineHeight="loose">
  Custom styled text
</Text>
```

## **Theme Integration**

```tsx
import { useTheme } from '@/contexts/ThemeContext'

const MyComponent = () => {
  const { isDark, colors } = useTheme()

  return (
    <div style={{ backgroundColor: colors.background }}>
      <p style={{ color: colors.text }}>Themed content</p>
    </div>
  )
}
```

---

# 📋 **Maintenance Checklist**

## **Monthly**

- [ ] Update dependencies
- [ ] Review bundle size
- [ ] Test accessibility
- [ ] Performance audit

## **Weekly**

- [ ] Code review
- [ ] TypeScript errors
- [ ] Component documentation
- [ ] Cross-browser testing

## **Daily**

- [ ] Build verification
- [ ] Type checking
- [ ] Linting
- [ ] Unit tests

---

# 🔧 **Troubleshooting**

## **Common Issues**

1. **Typography not applying**: Check CSS imports in globals.css
2. **Theme not switching**: Verify ThemeProvider is at app root
3. **Performance issues**: Enable hardware acceleration
4. **Accessibility warnings**: Add proper ARIA labels

## **Debug Commands**

```bash
# Check build
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run type-check
```

---

## **Enhanced Project Structure (2025)**

```
src/
├── components/          # React-Komponenten
│   ├── ui/             # Wiederverwendbare UI-Komponenten
│   │   ├── DesignSystemControls.tsx  # Design-System Steuerung
│   │   └── MagneticButton.tsx        # Enhanced Button
│   ├── layout/         # Layout-Komponenten
│   ├── forms/          # Formular-Komponenten
│   └── pages/          # Seiten-Komponenten
│       └── DesignSystemDemo.tsx     # Demo-Seite
├── config/             # Konfigurationen
│   ├── designSystem.constants.ts    # Design-System-Konstanten
│   ├── designSystem.ts              # Legacy-Interface
│   └── designSystem.constants.ts    # Neue Konstanten
├── hooks/              # Custom React Hooks
│   ├── useDesignSystem.ts           # Design-System Hook
│   └── useServiceWorker.ts          # Service Worker Hook
├── lib/                # Utility-Bibliotheken
│   └── designSystem.utils.ts        # Design-System Utilities
├── services/           # Business-Logic Services
│   └── designSystem.service.ts      # Design-System Service
├── styles/             # Stylesheets
│   ├── design-system.css            # Design-System CSS
│   ├── globals.css                  # Globale Styles
│   └── typography.css               # Typografie-System
├── types/              # TypeScript-Typen
│   ├── designSystem.ts              # Design-System Typen
│   └── index.ts                     # Main type exports
├── utils/              # Hilfsfunktionen
├── contexts/           # React Contexts
├── stores/             # State Management
└── content/            # Statische Inhalte
```

## **🎨 Enhanced Design System (2025)**

### **Service-Oriented Architecture**

- **Service Layer**: `DesignSystemService` für Business-Logik
- **Hook Layer**: `useDesignSystem` für React-Integration
- **Utility Layer**: Reine Funktionen für Berechnungen
- **Type Layer**: Strenge TypeScript-Typisierung

### **Key Improvements**

- **Singleton Service**: Zentralisierte State-Verwaltung
- **Event-Driven**: Automatische UI-Updates bei Änderungen
- **Performance**: Debounced Updates und Memoization
- **Type Safety**: Vollständige TypeScript-Abdeckung

### **Usage Patterns**

#### Service Direct Usage

```typescript
import { designSystemService } from '@/services/designSystem.service'

// Update scale factor
designSystemService.updateScaleFactor(1.2)

// Subscribe to changes
const unsubscribe = designSystemService.subscribe(state => {
  console.log('Scale changed:', state.currentScaleFactor)
})
```

#### React Hook Usage

```typescript
import { useDesignSystem } from '@/hooks/useDesignSystem'

const MyComponent = () => {
  const { state, actions } = useDesignSystem()

  return (
    <div className="ds-text-base">
      Current Scale: {state.currentScaleFactor}
      <button onClick={() => actions.scaleByFactor(1.1)}>
        +10%
      </button>
    </div>
  )
}
```

#### CSS Integration

```css
/* Design-System Variablen */
.my-element {
  font-size: var(--ds-font-size-base);
  padding: var(--ds-spacing-base);
}

/* Utility-Klassen */
.responsive-text {
  font-size: var(--ds-font-size-lg);
}
```

## **📋 Code Quality Standards**

### **TypeScript Best Practices**

```typescript
// ✅ Strenge Typisierung
interface ComponentProps {
  title: string
  onClick: (id: string) => void
  isLoading?: boolean
}

const MyComponent: React.FC<ComponentProps> = ({ title, onClick, isLoading = false }) => {
  // Implementation
}

// ❌ Vermeide any
const BadComponent = (props: any) => {
  // Implementation
}
```

### **React Patterns**

```typescript
// ✅ Custom Hooks für Logik
const useDataFetching = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [url])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetch(url)
      setData(await result.json())
    } finally {
      setLoading(false)
    }
  }, [url])

  return { data, loading, refetch: fetchData }
}

// ❌ Vermeide Logik in Komponenten
const BadComponent = () => {
  const [data, setData] = useState(null)
  // ... komplexe Logik direkt in Komponente
}
```

### **Service Patterns**

```typescript
// ✅ Service-Klasse mit Dependency Injection
class ApiService {
  constructor(private baseUrl: string) {}

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`)
    return response.json()
  }
}

export const apiService = new ApiService('/api')

// ❌ Globale Funktionen
export const getUsers = async () => {
  const response = await fetch('/api/users')
  return response.json()
}
```

## **🧪 Testing Strategy**

### **Unit Tests**

```typescript
// services/designSystem.service.test.ts
import { describe, it, expect } from 'vitest'
import { designSystemService } from './designSystem.service'

describe('DesignSystemService', () => {
  it('should update scale factor', () => {
    designSystemService.updateScaleFactor(1.2)
    expect(designSystemService.getCurrentScale()).toBe(1.2)
  })

  it('should validate scale factor range', () => {
    expect(() => designSystemService.updateScaleFactor(3.0)).toThrow()
  })
})
```

### **Integration Tests**

```typescript
// hooks/useDesignSystem.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useDesignSystem } from './useDesignSystem'

describe('useDesignSystem', () => {
  it('should return current state', () => {
    const { result } = renderHook(() => useDesignSystem())

    expect(result.current.state).toHaveProperty('currentScaleFactor')
    expect(result.current.actions).toHaveProperty('updateScaleFactor')
  })

  it('should update state when scale changes', () => {
    const { result } = renderHook(() => useDesignSystem())

    act(() => {
      result.current.actions.updateScaleFactor(1.1)
    })

    expect(result.current.state.currentScaleFactor).toBe(1.1)
  })
})
```

## **🚀 Performance Optimizations**

### **Debouncing & Throttling**

```typescript
import { debounce } from '@/lib/designSystem.utils'

// Debounced scale updates
const debouncedUpdate = debounce((factor: number) => {
  designSystemService.updateScaleFactor(factor)
}, 100)
```

### **Memoization**

```typescript
import { useMemo, useCallback } from 'react'

const MyComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item))
  }, [data])

  const handleClick = useCallback(() => {
    // Handle click
  }, [])

  return <div onClick={handleClick}>{processedData}</div>
}
```

### **Code Splitting**

```typescript
// Lazy loading für große Komponenten
const DesignSystemDemo = lazy(() => import('@/pages/DesignSystemDemo'))

// Service Worker für Caching
const ServiceWorkerManager = () => {
  useServiceWorker()
  return null
}
```

## **🔧 Development Workflow**

### **Pre-commit Hooks**

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test
```

### **VS Code Settings**

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### **Build Optimization**

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'design-system': ['@/services/designSystem.service'],
          'ui-components': ['@/components/ui'],
        },
      },
    },
  },
})
```

## **📊 Monitoring & Analytics**

### **Performance Monitoring**

```typescript
// Performance tracking
const trackPerformance = (metric: string, value: number) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    analytics.track('performance', { metric, value })
  }
}

// Bundle analysis
if (process.env.NODE_ENV === 'development') {
  console.log('Bundle size:', getBundleSize())
}
```

### **Error Boundaries**

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    errorReporting.captureException(error, { extra: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
```

---

_Architecture updated: September 2025_
_Design System v2.0: Service-oriented architecture_
_Maintained by: VAE Development Team_
