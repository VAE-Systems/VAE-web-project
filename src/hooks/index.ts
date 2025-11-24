/**
 * Hooks Export Index
 *
 * Central export point for all custom React hooks
 */

// Animation
export * from './animation/useAdvancedAnimation'
export * from './animation/useScrollReveal'
export * from './animation/useScrollScrub'

// UI
export * from './ui/useAttentionSignal'
export * from './ui/useFocusTrap'
export * from './ui/useMobileMenu'
export * from './ui/useSwipeGesture'

// Features
export { useKeyboardNavigation, useFocusTrap as useAccessibilityFocusTrap } from './features/useAccessibility'
export * from './features/useConsent'
export * from './features/useContactForm'
export * from './features/useDesignSystem'
export * from './features/useNewsletter'
export * from './features/usePerformance'
export * from './features/usePWA'
export * from './features/useServiceWorker'

// Tutorials
export * from './tutorials/useMailBuilderTutorial'
export * from './tutorials/useSetupCalculatorTutorial'
export * from './tutorials/useSpotlightTutorial'
