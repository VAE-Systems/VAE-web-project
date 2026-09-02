/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  FINAL CTA SECTION                                                        ┃
 * ┃  Abschluss-CTA am Ende von Pages → Conversion-Trigger.                    ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎨 LAYERS (Visual Stack)
 * ├── radial-gradient top  → Ambient turquoise glow
 * ├── linear-gradient grid → Subtle grid overlay
 * └── content box          → Eyebrow + H2 + Description + CTA
 *
 * 🎛️ CORE
 * ├── finalCtaHome content → Zentralisierte CTA-Texte aus content/home
 * └── CtaLink via Registry → Konsistente CTA-Aktionen
 *
 * 🚪 ORCHESTRATOR
 * └── FinalCtaSection      → Bindet Content + MagneticButton + CtaLink
 */

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import CtaLink from '@/components/ui/CtaLink'
import { finalCtaHome } from '@/content/home'
import { CalendarClock } from 'lucide-react'
import React from 'react'

interface FinalCtaSectionProps {
  className?: string
  id?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — FinalCtaSection
// ═══════════════════════════════════════════════════════════════════════════
const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ className = '', id = 'abschluss' }) => {
  // 🎛️ CORE — Content aus zentralem Store
  const { eyebrow, title, description, primary, note } = finalCtaHome

  return (
    <section
      id={id}
      className={`accent-section relative overflow-hidden border-t border-vae-turquoise/25 bg-vae-turquoise py-20 dark:border-vae-turquoise/10 dark:bg-gradient-to-b dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker sm:py-28 ${className}`.trim()}
      aria-labelledby="final-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Firefly-Bild: aufsteigende Glas-Plattformen – ruhige Tiefe hinter dem CTA */}
        <div
          className="absolute inset-0 opacity-[0.30] mix-blend-multiply dark:opacity-[0.45] dark:mix-blend-normal"
          style={{
            backgroundImage: 'url(/images/heroes/final-cta-plattformen.webp)',
            backgroundPosition: 'center 40%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 hidden h-72 bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.22),transparent_65%)] dark:block"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden bg-[linear-gradient(rgba(var(--vae-turquoise-rgb),0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--vae-turquoise-rgb),0.08)_1px,transparent_1px)] bg-[size:120px_120px] mix-blend-soft-light dark:block"
          aria-hidden
        />
      </div>
      <div className="container-vae">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/85 dark:text-vae-turquoise/70">
            {eyebrow}
          </p>
          <h2 id="final-cta-heading" className="fluid-h2 mt-4 text-balance font-bold text-white dark:text-white">
            {title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/90 dark:text-text-secondary sm:text-lg">
            {description}
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton className="w-full sm:w-auto">
              <CtaLink
                ctaId={primary.ctaId}
                ctx={{ fromPage: 'home', intent: 'final-cta' }}
                variant="custom"
                className="btn-primary flex min-w-[260px] items-center justify-center gap-3 shadow-[0_16px_32px_-18px_rgba(0,0,0,0.35)] dark:shadow-none"
              >
                <CalendarClock className="h-5 w-5" />
                {primary.label}
              </CtaLink>
            </MagneticButton>
          </div>
          {note && <p className="mt-4 text-xs text-white/70 dark:text-text-muted">{note}</p>}
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
