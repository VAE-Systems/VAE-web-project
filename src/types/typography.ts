/**
 * Typography Design Tokens
 * Centralized typography configuration for consistent and maintainable font sizes
 */

export type FontSize =
  | 'xs'      // 12px - 14px
  | 'sm'      // 14px - 16px
  | 'base'    // 16px - 18px
  | 'lg'      // 18px - 20px
  | 'xl'      // 20px - 24px
  | '2xl'     // 24px - 32px
  | '3xl'     // 32px - 40px
  | '4xl'     // 40px - 48px
  | '5xl'     // 48px - 64px
  | '6xl'     // 64px - 80px

export type FontWeight =
  | 'thin'       // 100
  | 'light'      // 300
  | 'normal'     // 400
  | 'medium'     // 500
  | 'semibold'   // 600
  | 'bold'       // 700
  | 'extrabold'  // 800
  | 'black'      // 900

export type LineHeight =
  | 'tight'   // 1.25
  | 'normal'  // 1.5
  | 'loose'   // 1.75

export type LetterSpacing =
  | 'tight'   // -0.025em
  | 'normal'  // 0
  | 'wide'    // 0.025em
  | 'wider'   // 0.05em
  | 'widest'  // 0.1em

export interface TypographyProps {
  size?: FontSize
  weight?: FontWeight
  lineHeight?: LineHeight
  letterSpacing?: LetterSpacing
  responsive?: boolean
}

/**
 * Typography utility functions
 */
export const getFontSizeClass = (size: FontSize): string => `text-${size}`
export const getFontWeightClass = (weight: FontWeight): string => `font-${weight}`
export const getLineHeightClass = (lineHeight: LineHeight): string => `leading-${lineHeight}`
export const getLetterSpacingClass = (spacing: LetterSpacing): string => `tracking-${spacing}`

/**
 * Combine typography classes
 */
export const getTypographyClasses = (props: TypographyProps): string => {
  const classes: string[] = []

  if (props.size) classes.push(getFontSizeClass(props.size))
  if (props.weight) classes.push(getFontWeightClass(props.weight))
  if (props.lineHeight) classes.push(getLineHeightClass(props.lineHeight))
  if (props.letterSpacing) classes.push(getLetterSpacingClass(props.letterSpacing))

  return classes.join(' ')
}

/**
 * Typography scale values (for calculations)
 */
export const typographyScale = {
  xs: { min: 12, max: 14, clamp: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)' },
  sm: { min: 14, max: 16, clamp: 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)' },
  base: { min: 16, max: 18, clamp: 'clamp(1rem, 0.9rem + 0.3vw, 1.125rem)' },
  lg: { min: 18, max: 20, clamp: 'clamp(1.125rem, 1rem + 0.4vw, 1.25rem)' },
  xl: { min: 20, max: 24, clamp: 'clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)' },
  '2xl': { min: 24, max: 32, clamp: 'clamp(1.5rem, 1.3rem + 0.7vw, 2rem)' },
  '3xl': { min: 32, max: 40, clamp: 'clamp(2rem, 1.7rem + 1vw, 2.5rem)' },
  '4xl': { min: 40, max: 48, clamp: 'clamp(2.5rem, 2rem + 1.3vw, 3rem)' },
  '5xl': { min: 48, max: 64, clamp: 'clamp(3rem, 2.5rem + 1.8vw, 4rem)' },
  '6xl': { min: 64, max: 80, clamp: 'clamp(4rem, 3rem + 2.5vw, 5rem)' }
} as const

export const fontWeights = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
} as const
