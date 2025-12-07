/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  UI COMPONENTS BARREL                                                     ┃
 * ┃  Zentraler Export für alle UI-Komponenten.                                ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ KATEGORIEN
 * ├── Buttons      → Button, MagneticButton, TouchButton
 * ├── Cards        → Card, FeatureCard, SpotlightCard, TouchCard
 * ├── Navigation   → Icon, MaterialIcon, ThemeToggle
 * ├── Content      → CtaLink, Glossary, ReferenceList
 * ├── Feedback     → LoadingSpinner, Reveal
 * └── SEO          → Seo
 *
 * 📦 USAGE
 * └── import { Button, Icon, MagneticButton } from '@/components/ui'
 */

export { default as Button } from './Button'
export { default as Card } from './Card'
export { default as CtaLink } from './CtaLink'
export { default as FeatureCard } from './FeatureCard'
export { default as FloatingElement } from './FloatingElement'
export { default as GlossarySection } from './GlossarySection'
export { default as Icon } from './Icon'
export { default as LoadingSpinner } from './LoadingSpinner'
export { default as MaterialIcon } from './MaterialIcon'
export { default as ReferenceList } from './ReferenceList'
export { default as Reveal } from './Reveal'
export { default as Seo } from './Seo'
export { default as SpotlightCard } from './SpotlightCard'
export { ThemeToggle } from './ThemeToggle'
export { default as TouchButton } from './TouchButton'
export { default as TouchCard } from './TouchCard'

export { MagneticButton } from './buttons'

export type { MagneticButtonProps } from './buttons/MagneticButton'
export type { ThemeToggleProps } from './ThemeToggle'

// Named exports
export * from './Glossary'
export * from './LazyComponents'
