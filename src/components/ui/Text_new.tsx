import React from 'react'
import { TypographyProps, getTypographyClasses } from '../../types/typography'

/**
 * Extended props for the Text component
 * @interface TextProps
 */
interface TextProps extends TypographyProps {
  /** The content to be rendered */
  children: React.ReactNode
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements
  /** Additional CSS classes */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Unified Typography Component with Design System Integration
 *
 * Provides consistent typography across the application using design tokens.
 * Supports responsive scaling, multiple font weights, and semantic HTML elements.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Text size="lg" weight="semibold">Hello World</Text>
 *
 * // With semantic element
 * <Text as="span" size="sm" lineHeight="loose">Description</Text>
 *
 * // Responsive text
 * <Text size="xl" responsive>Responsive heading</Text>
 * ```
 *
 * @param {TextProps} props - Component props
 * @returns {JSX.Element} Rendered text element
 */
export const Text: React.FC<TextProps> = ({
  children,
  as: Component = 'span',
  size = 'base',
  weight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  responsive = true,
  className = '',
  style,
  ...props
}) => {
  // Generate typography classes dynamically
  const typographyClasses = getTypographyClasses({
    size,
    weight,
    lineHeight,
    letterSpacing,
  })

  // Combine classes efficiently
  const combinedClassName = [typographyClasses, responsive ? 'responsive-text' : '', className]
    .filter(Boolean)
    .join(' ')

  return React.createElement(
    Component,
    {
      className: combinedClassName,
      style,
      ...props,
    },
    children
  )
}

/**
 * Semantic Heading Component - H1
 */
export const Heading1: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="h1" size="5xl" weight="bold" {...props} />
)

/**
 * Semantic Heading Component - H2
 */
export const Heading2: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="h2" size="4xl" weight="bold" {...props} />
)

/**
 * Semantic Heading Component - H3
 */
export const Heading3: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="h3" size="3xl" weight="semibold" {...props} />
)

/**
 * Semantic Heading Component - H4
 */
export const Heading4: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="h4" size="2xl" weight="semibold" {...props} />
)

/**
 * Semantic Heading Component - H5
 */
export const Heading5: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="h5" size="xl" weight="semibold" {...props} />
)

/**
 * Semantic Heading Component - H6
 */
export const Heading6: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="h6" size="lg" weight="semibold" {...props} />
)

/**
 * Body Text Component
 */
export const Body: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="p" size="base" weight="normal" {...props} />
)

/**
 * Large Body Text Component
 */
export const BodyLarge: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="p" size="lg" weight="normal" {...props} />
)

/**
 * Small Body Text Component
 */
export const BodySmall: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="p" size="sm" weight="normal" {...props} />
)

/**
 * Caption Text Component
 */
export const Caption: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="span" size="xs" weight="normal" {...props} />
)

/**
 * Label Text Component
 */
export const Label: React.FC<Omit<TextProps, 'as' | 'size' | 'weight'>> = props => (
  <Text as="label" size="sm" weight="medium" {...props} />
)

/**
 * Button Text Component
 */
export const ButtonText: React.FC<Omit<TextProps, 'as' | 'size' | 'weight' | 'letterSpacing'>> = props => (
  <Text as="span" size="sm" weight="semibold" letterSpacing="wide" {...props} />
)
