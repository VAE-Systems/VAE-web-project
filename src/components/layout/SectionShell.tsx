/**
 * SectionShell — verbindliche Tiefen-/Layer-Architektur für Sektionen.
 *
 * Eine Section = ein eigener Stacking-Context (isolation:isolate via .section-shell).
 * Effekte werden in feste Layer einsortiert, statt pro Section ad-hoc z-index zu vergeben:
 *
 *   background → .section-bg     (z -30)  Flächen/Verläufe/Backdrops
 *   effects    → .section-fx     (z -20)  ambiente Effekte (Parallax, Partikel, Radials)
 *   topEffects → .section-fx-top (z -10)  interaktive Effekte hinter dem Content (Spotlight)
 *   children   → .section-content(z   1)  Inhalt
 *
 * Effekt-Layer sind pointer-events:none. Maus-Tracking (z. B. Spotlight) gehört auf das
 * Content-Element selbst, damit Event-Layer und Effekt-Layer identisch sind.
 *
 * Section-eigene Hintergrund-Klassen (surface-*, Verläufe, Border, edge-glow-top, overlay-*)
 * bleiben auf `className` — sie gehören zum Section-Element selbst (Basis-Ebene).
 */
import React from 'react'
import { cn } from '@/lib/classNames'

type SectionShellOwnProps = {
  /** HTML-Tag des Wrappers (Default: <section>). */
  as?: 'section' | 'div'
  /** Hintergrund-Layer (z -30): Flächen, Verläufe, Bild-Backdrops. */
  background?: React.ReactNode
  /** Ambiente Effekte (z -20): Parallax, Partikel, Radials. */
  effects?: React.ReactNode
  /** Interaktive Effekte hinter dem Content (z -10): z. B. Spotlight. */
  topEffects?: React.ReactNode
  /** Zusätzliche Klassen für den Content-Wrapper (z. B. Container). */
  contentClassName?: string
}

export type SectionShellProps = SectionShellOwnProps & React.HTMLAttributes<HTMLElement>

export const SectionShell = React.forwardRef<HTMLElement, SectionShellProps>(function SectionShell(
  { as = 'section', background, effects, topEffects, className, contentClassName, children, ...rest },
  ref
) {
  const Tag = as as React.ElementType
  return (
    <Tag ref={ref} className={cn('section-shell', className)} {...rest}>
      {background ? <div className="section-bg">{background}</div> : null}
      {effects ? <div className="section-fx">{effects}</div> : null}
      {topEffects ? <div className="section-fx-top">{topEffects}</div> : null}
      <div className={cn('section-content', contentClassName)}>{children}</div>
    </Tag>
  )
})

export default SectionShell
