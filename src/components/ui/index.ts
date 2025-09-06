/**
 * UI Components Barrel Export
 * ===========================
 *
 * Centralized exports for all UI components to simplify imports
 * and maintain clean import statements throughout the application.
 *
 * Usage:
 * ```tsx
 * import { Text, MagneticButton, Heading1 } from '@/components/ui'
 * ```
 */

// Typography Components
export {
  Body,
  BodyLarge,
  BodySmall, ButtonText, Caption, Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6, Label, Text
} from './Text'

// Interactive Components
export { default as DesignSystemControls } from './DesignSystemControls'
export { default as MagneticButton } from './MagneticButton'

// Theme Components
export { ThemeDemo } from './ThemeDemo'
export { ThemeToggle } from './ThemeToggle'

// Re-export types for convenience
export type {
  FontSize,
  FontWeight, LetterSpacing, LineHeight, TypographyProps
} from '../../types/typography'

// Component type exports
export type { DesignSystemControlsProps } from './DesignSystemControls'
export type { MagneticButtonProps } from './MagneticButton'

