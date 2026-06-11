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
    <>
      <div className="h-px w-full bg-vae-turquoise/30" />
      <section
        id={id}
        className={`relative overflow-hidden border-t-2 border-black py-20 text-text-light dark:border-white dark:text-white sm:py-28 ${className}`.trim()}
        style={{ background: 'var(--bg-darker)' }}
        aria-labelledby="final-cta-heading"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />

        <div className="container-vae relative z-10">
          <div className="grid gap-0 border-2 border-text-light dark:border-white lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="p-8 sm:p-10" style={{ background: 'var(--bg-darker)' }}>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-vae-turquoise">{eyebrow}</p>
              <h2
                id="final-cta-heading"
                className="mt-4 max-w-4xl text-balance text-5xl font-black uppercase leading-none tracking-tight md:text-6xl lg:text-7xl"
              >
                {title}
              </h2>
              <div className="dark:text-white/74 mt-6 max-w-2xl border-l-4 border-vae-turquoise pl-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                {description}
              </div>
              {note && <p className="dark:text-white/58 mt-4 text-sm font-medium text-text-muted">{note}</p>}
            </div>

            <div className="bg-bg-primary rounded-none border-t-2 border-text-light p-6 text-text-light dark:border-white dark:bg-black dark:text-white lg:border-l-2 lg:border-t-0">
              <div className="bg-vae-turquoise p-5 text-black">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/55">Format</p>
                <p className="mt-2 text-6xl font-black leading-none tracking-[-0.08em]">45</p>
                <p className="mt-1 text-base font-black uppercase tracking-[0.14em]">Minuten</p>
              </div>

              <div className="mt-4 space-y-3 border border-text-light/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <p className="dark:text-white/48 text-[10px] font-bold uppercase tracking-[0.28em] text-text-muted">
                  Wir klären
                </p>
                <ul className="dark:text-white/82 space-y-2 text-sm leading-relaxed text-text-secondary">
                  <li>Ihre aktuellen Tools und laufenden Kosten</li>
                  <li>Ob Migration, Hybrid-Modell oder Status quo sinnvoller ist</li>
                  <li>Welche nächsten Schritte wirtschaftlich Sinn ergeben</li>
                </ul>
              </div>

              <div className="mt-5 space-y-3">
                <MagneticButton className="w-full">
                  <CtaLink
                    ctaId={primary.ctaId}
                    ctx={{ fromPage: 'home', intent: 'final-cta' }}
                    variant="primary"
                    className="flex w-full items-center justify-center gap-3 px-5 py-4 text-sm font-black uppercase tracking-[0.14em]"
                  >
                    <CalendarClock className="h-5 w-5" />
                    {primary.label}
                  </CtaLink>
                </MagneticButton>

                <CtaLink
                  ctaId="contact.quick_email"
                  ctx={{ fromPage: 'home', intent: 'final-cta-email' }}
                  variant="secondary"
                  className="flex w-full items-center justify-center px-5 py-4 text-sm font-black uppercase tracking-[0.14em]"
                >
                  Direkte Frage per Mail
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FinalCtaSection
