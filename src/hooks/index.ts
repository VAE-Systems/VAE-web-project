/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  HOOKS BARREL                                                             ┃
 * ┃  Zentraler Export für alle Custom React Hooks.                            ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ KATEGORIEN
 * ├── Animation   → useAdvancedAnimation, useScrollReveal, useScrollScrub
 * ├── UI          → useAttentionSignal, useFocusTrap, useMobileMenu, useSwipeGesture
 * ├── Features    → useConsent, useContactForm, useDesignSystem, useNewsletter, etc.
 * └── Tutorials   → useMailBuilderTutorial, useSetupCalculatorTutorial, useSpotlightTutorial
 *
 * 📦 USAGE
 * └── import { useScrollReveal, useMailBuilderTutorial } from '@/hooks'
 */

// ── Animation ──
export * from './animation/useAdvancedAnimation'
export * from './animation/useScrollReveal'
export * from './animation/useScrollScrub'

// ── UI ──
export * from './ui/useAttentionSignal'
export * from './ui/useFocusTrap'
export * from './ui/useMobileMenu'
export * from './ui/useSwipeGesture'

// ── Features ──
export { useFocusTrap as useAccessibilityFocusTrap, useKeyboardNavigation } from './features/useAccessibility'
export * from './features/useConsent'
export * from './features/useContactForm'
export * from './features/useDesignSystem'
export * from './features/useNewsletter'
export * from './features/usePerformance'
export * from './features/usePWA'
export * from './features/useServiceWorker'
export * from './useHumanTypewriter'

// ── Tutorials ──
export * from './tutorials/useMailBuilderTutorial'
export * from './tutorials/useSetupCalculatorTutorial'
export * from './tutorials/useSpotlightTutorial'
