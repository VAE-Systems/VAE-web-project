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
        className={`relative overflow-hidden border-t-2 border-black py-20 text-black dark:border-white dark:text-white sm:py-28 ${className}`.trim()}
        style={{ background: '#060a08' }}
        aria-labelledby="final-cta-heading"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-vae-turquoise" />

        <div className="container-vae relative z-10">
          <div className="grid gap-0 border-2 border-black dark:border-white lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="p-8 sm:p-10" style={{ background: '#060a08' }}>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-vae-turquoise">{eyebrow}</p>
              <h2
                id="final-cta-heading"
                className="mt-4 max-w-4xl text-balance text-5xl font-black uppercase leading-none tracking-tight md:text-6xl lg:text-7xl"
              >
                {title}
              </h2>
              <div className="text-white/74 mt-6 max-w-2xl border-l-4 border-vae-turquoise pl-4 text-base leading-relaxed sm:text-lg">
                {description}
              </div>
              {note && <p className="text-white/58 mt-4 text-sm font-medium">{note}</p>}
            </div>

            <div className="rounded-none border-t-2 border-black bg-black p-6 text-white dark:border-white lg:border-l-2 lg:border-t-0">
              <div className="bg-vae-turquoise p-5 text-black">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/55">Format</p>
                <p className="mt-2 text-6xl font-black leading-none tracking-[-0.08em]">45</p>
                <p className="mt-1 text-base font-black uppercase tracking-[0.14em]">Minuten</p>
              </div>

              <div className="mt-4 space-y-3 border border-white/10 p-4">
                <p className="text-white/48 text-[10px] font-bold uppercase tracking-[0.28em]">Wir klären</p>
                <ul className="text-white/82 space-y-2 text-sm leading-relaxed">
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
                    variant="custom"
                    className="flex w-full items-center justify-center gap-3 bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition-colors hover:bg-vae-turquoise"
                  >
                    <CalendarClock className="h-5 w-5" />
                    {primary.label}
                  </CtaLink>
                </MagneticButton>

                <CtaLink
                  ctaId="contact.quick_email"
                  ctx={{ fromPage: 'home', intent: 'final-cta-email' }}
                  variant="custom"
                  className="border-white/18 flex w-full items-center justify-center border px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:border-vae-turquoise hover:bg-white/5"
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
