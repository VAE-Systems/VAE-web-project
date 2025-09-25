import type { CSSProperties } from 'react'
import type { TypographyTokens } from './types'

export type TypographyPreset = keyof TypographyTokens

export const getTypographyStyle = (preset: TypographyPreset): CSSProperties => ({
  fontFamily: `var(--ds-typography-${preset}-font-family)`,
  fontSize: `var(--ds-typography-${preset}-font-size)`,
  lineHeight: `var(--ds-typography-${preset}-line-height)`,
  fontWeight: `var(--ds-typography-${preset}-font-weight)` as unknown as CSSProperties['fontWeight'],
  letterSpacing: `var(--ds-typography-${preset}-letter-spacing)`,
  textTransform: `var(--ds-typography-${preset}-text-transform)` as CSSProperties['textTransform'],
})
