/**
 * Typography Configuration
 * ========================
 *
 * Centralized configuration for the typography system.
 * Modify these values to change the global typography behavior.
 */

export const TYPOGRAPHY_CONFIG = {
  // Base font size (in pixels)
  baseFontSize: 16,

  // Modular scale ratio (Major Third)
  scaleRatio: 1.25,

  // Font family stacks
  fontFamilies: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(', '),

    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Monaco',
      'Cascadia Code',
      'Roboto Mono',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ].join(', '),
  },

  // Responsive breakpoints for clamp() functions
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },

  // Typography scale configuration
  scale: {
    xs: { min: 12, max: 14, mobile: 12 },
    sm: { min: 14, max: 16, mobile: 14 },
    base: { min: 16, max: 18, mobile: 16 },
    lg: { min: 18, max: 20, mobile: 18 },
    xl: { min: 20, max: 24, mobile: 20 },
    '2xl': { min: 24, max: 32, mobile: 24 },
    '3xl': { min: 32, max: 40, mobile: 32 },
    '4xl': { min: 40, max: 48, mobile: 40 },
    '5xl': { min: 48, max: 64, mobile: 48 },
    '6xl': { min: 64, max: 80, mobile: 64 },
  },

  // Font weights mapping
  fontWeights: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    loose: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const

/**
 * Generate clamp function for responsive typography
 * @param min Minimum font size in pixels
 * @param max Maximum font size in pixels
 * @param mobile Mobile font size in pixels (optional)
 * @returns CSS clamp() function string
 */
export const generateClamp = (min: number, max: number, mobile?: number): string => {
  const mobileSize = mobile || min
  const minVw = (min / TYPOGRAPHY_CONFIG.baseFontSize) * 100

  return `clamp(${mobileSize / 16}rem, ${minVw}vw, ${max / 16}rem)`
}

/**
 * Get typography scale value with clamp function
 * @param size Font size key
 * @returns CSS clamp() function string
 */
export const getTypographyScale = (size: keyof typeof TYPOGRAPHY_CONFIG.scale): string => {
  const config = TYPOGRAPHY_CONFIG.scale[size]
  return generateClamp(config.min, config.max, config.mobile)
}

/**
 * Get font weight value
 * @param weight Font weight key
 * @returns Font weight number
 */
export const getFontWeight = (weight: keyof typeof TYPOGRAPHY_CONFIG.fontWeights): number => {
  return TYPOGRAPHY_CONFIG.fontWeights[weight]
}

/**
 * Get line height value
 * @param height Line height key
 * @returns Line height number
 */
export const getLineHeight = (height: keyof typeof TYPOGRAPHY_CONFIG.lineHeights): number => {
  return TYPOGRAPHY_CONFIG.lineHeights[height]
}

/**
 * Get letter spacing value
 * @param spacing Letter spacing key
 * @returns Letter spacing string
 */
export const getLetterSpacing = (spacing: keyof typeof TYPOGRAPHY_CONFIG.letterSpacing): string => {
  return TYPOGRAPHY_CONFIG.letterSpacing[spacing]
}

/**
 * Validate typography configuration
 * Ensures the modular scales are working correctly
 */
export const validateTypographyConfig = (): void => {
  if (process.env.NODE_ENV !== 'development') return

  console.log('🔍 Validating Typography Configuration...')

  // Check scale ratio
  if (TYPOGRAPHY_CONFIG.scaleRatio !== 1.25) {
    console.warn('⚠️ Scale ratio should be 1.25 for Major Third')
  }

  // Check clamp function generation
  const testClamp = generateClamp(16, 18, 16)
  if (!testClamp.includes('clamp') || !testClamp.includes('rem')) {
    console.error('❌ Clamp function generation failed')
  }

  // Check scale progression
  const sizes = Object.keys(TYPOGRAPHY_CONFIG.scale) as Array<keyof typeof TYPOGRAPHY_CONFIG.scale>
  for (let i = 1; i < sizes.length; i++) {
    const prev = TYPOGRAPHY_CONFIG.scale[sizes[i - 1]]
    const curr = TYPOGRAPHY_CONFIG.scale[sizes[i]]
    if (curr.min <= prev.min || curr.max <= prev.max) {
      console.warn(`⚠️ Scale progression issue between ${sizes[i - 1]} and ${sizes[i]}`)
    }
  }

  console.log('✅ Typography validation complete')
}

// Auto-validate in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Delay validation to ensure console is available
  setTimeout(validateTypographyConfig, 100)
}
