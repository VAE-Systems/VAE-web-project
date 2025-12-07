/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  DESIGN SYSTEM                                                            ┃
 * ┃  Zentraler Export für Design Tokens, Theme Manager und Typography.        ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ EXPORTS
 * ├── types          → ThemeMode, ThemeDefinition, etc.
 * ├── tokens         → Farben, Spacing, Radien als CSS Vars
 * ├── themeManager   → applyTheme, initialiseTheme, persistTheme
 * └── typography     → getTypographyStyle, fluid scales
 *
 * 📦 USAGE
 * ├── import { applyTheme, ThemeMode } from '@design-system'
 * └── import { getTypographyStyle } from '@design-system/typography'
 */

export * from './themeManager'
export * from './tokens'
export * from './types'
export * from './typography'
