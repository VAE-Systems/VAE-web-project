/**
 * Zentraler Export für UI-Komponenten.
 *
 * Halte Importe konsistent über `@/components/ui` und kapsle interne Struktur.
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
export { default as SpotlightCard } from './SpotlightCard'
export { ThemeToggle } from './ThemeToggle'
export { default as TouchButton } from './TouchButton'
export { default as TouchCard } from './TouchCard'
export { default as Seo } from './Seo'

export { MagneticButton } from './buttons'

export type { MagneticButtonProps } from './buttons/MagneticButton'
export type { ThemeToggleProps } from './ThemeToggle'

// Named exports
export * from './Glossary'
export * from './LazyComponents'
