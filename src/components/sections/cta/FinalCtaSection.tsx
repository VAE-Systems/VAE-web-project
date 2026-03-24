import MagneticButton from '@/components/ui/buttons/MagneticButton'
import CtaLink from '@/components/ui/CtaLink'
import { finalCtaHome } from '@/content/home'
import { CalendarClock } from 'lucide-react'
import React from 'react'

interface FinalCtaSectionProps {
  className?: string
  id?: string
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ className = '', id = 'abschluss' }) => {
  const { eyebrow, title, description, primary, note } = finalCtaHome

  return (
    <section
      id={id}
      className={`accent-section relative overflow-hidden border-t border-vae-turquoise/25 bg-vae-turquoise py-20 dark:border-vae-turquoise/10 dark:bg-gradient-to-b dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker sm:py-28 ${className}`.trim()}
      aria-labelledby="final-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
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
        <div className="mx-auto grid max-w-5xl gap-10 rounded-[2rem] border border-white/10 bg-black/20 p-8 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)] backdrop-blur-sm lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/85 dark:text-vae-turquoise/70">
              {eyebrow}
            </p>
            <h2
              id="final-cta-heading"
              className="fluid-h2 mt-4 max-w-3xl text-balance font-bold text-white dark:text-white"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 dark:text-text-secondary sm:text-lg">
              {description}
            </p>
            {note && <p className="mt-4 text-sm text-white/70 dark:text-text-muted">{note}</p>}
          </div>

          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Ihre zwei nächsten Schritte
            </p>
            <MagneticButton className="w-full">
              <CtaLink
                ctaId={primary.ctaId}
                ctx={{ fromPage: 'home', intent: 'final-cta' }}
                variant="custom"
                className="btn-primary flex w-full items-center justify-center gap-3 shadow-[0_16px_32px_-18px_rgba(0,0,0,0.35)] dark:shadow-none"
              >
                <CalendarClock className="h-5 w-5" />
                {primary.label}
              </CtaLink>
            </MagneticButton>
            <CtaLink
              ctaId="contact.quick_email"
              ctx={{ fromPage: 'home', intent: 'final-cta-email' }}
              variant="custom"
              className="btn-outline flex w-full items-center justify-center gap-3 px-6 py-3 text-sm font-semibold text-white"
            >
              Direkte Frage per Mail
            </CtaLink>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">Im Gespräch klären wir</p>
              <ul className="text-white/82 mt-3 space-y-2 text-sm">
                <li>Ihre aktuellen Tools und laufenden Kosten</li>
                <li>Ob Migration, Hybrid-Modell oder Status quo sinnvoller ist</li>
                <li>Welche nächsten Schritte realistisch und wirtschaftlich sind</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
