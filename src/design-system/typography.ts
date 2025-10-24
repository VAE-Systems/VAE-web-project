import type { CSSProperties } from 'react'

import type { TypographyTokens } from './types'
import { defaultTheme, themeRegistry } from './tokens'

export type TypographyPreset = keyof TypographyTokens

const fallbackTypography = themeRegistry[defaultTheme].typography

const toCssString = (value: string | number | undefined): string => {
  if (value === undefined) {
    return ''
  }
  return typeof value === 'number' ? value.toString() : value
}

const cssVar = (preset: TypographyPreset, property: string, fallback: string): string =>
  `var(--ds-typography-${preset}-${property}, ${fallback})`

const ensurePreset = (preset: TypographyPreset): void => {
  if (!fallbackTypography[preset]) {
    const availablePresets = Object.keys(fallbackTypography).join(', ')
    throw new Error(
      `Unknown typography preset "${preset}". Available presets: ${availablePresets}. Please update tokens and callers in sync.`
    )
  }
}

export const getTypographyStyle = (preset: TypographyPreset): CSSProperties => {
  ensurePreset(preset)
  const token = fallbackTypography[preset]

  const fontFamily = cssVar(preset, 'font-family', token.fontFamily)
  const fontSize = cssVar(preset, 'font-size', token.fontSize)
  const lineHeight = cssVar(preset, 'line-height', toCssString(token.lineHeight))
  const fontWeight = cssVar(preset, 'font-weight', toCssString(token.fontWeight))
  const letterSpacing = cssVar(preset, 'letter-spacing', token.letterSpacing ?? 'normal')
  const textTransform = cssVar(
    preset,
    'text-transform',
    token.textTransform ?? 'none'
  ) as CSSProperties['textTransform']

  return {
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing,
    textTransform,
  }
}

export const isTypographyPreset = (value: unknown): value is TypographyPreset => {
  return typeof value === 'string' && value in fallbackTypography
}
