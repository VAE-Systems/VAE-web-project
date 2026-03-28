import CtaLink from '@/components/ui/CtaLink'
import MagneticButton from '@/components/ui/MagneticButton'
import { CalendarClock, ChevronDown } from 'lucide-react'
import React from 'react'

const PROBLEMS = [
  'Ihre SaaS-Rechnung wächst jedes Quartal.',
  'Sie wissen nicht wo Ihre Kundendaten liegen.',
  'Kündigen bedeutet alles verlieren.',
]

const MinimalHeroSection: React.FC = () => {
  const scrollToProof = React.useCallback(() => {
    document.getElementById('social-proof')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section className="relative flex min-h-[100dvh] flex-col bg-[#030806] text-white">
      {/* Turquoise top rule */}
      <div className="h-[3px] w-full bg-vae-turquoise" />

      <div className="flex flex-1 flex-col justify-center px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-5xl">
          {/* Kicker */}
          <p className="mb-8 text-[11px] font-black uppercase tracking-[0.38em] text-vae-turquoise">
            VAE Systems · Infrastruktur, Automatisierung, KI
          </p>

          {/* Headline — direkt, kein Slogan */}
          <h1 className="mb-10 max-w-4xl text-[clamp(2.8rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-white">
            Wir bauen Infrastruktur,
            <br />
            <span className="bg-vae-turquoise px-3 py-1 text-black">die Ihnen gehört.</span>
          </h1>

          {/* Problem-Liste — konkret, keine Marketingsprache */}
          <div className="mb-10 max-w-xl space-y-3 border-l-2 border-white/20 pl-5">
            {PROBLEMS.map(p => (
              <p key={p} className="text-base leading-snug text-white/65 sm:text-lg">
                {p}
              </p>
            ))}
            <p className="pt-2 text-base font-bold text-white sm:text-lg">Das muss nicht so sein.</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton>
              <CtaLink
                ctaId="contact.schedule_call"
                ctx={{ fromPage: 'home', intent: 'minimal-hero' }}
                className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-vae-turquoise"
              >
                <CalendarClock className="h-5 w-5 shrink-0" />
                Kostenloses Erstgespräch
              </CtaLink>
            </MagneticButton>

            <button
              type="button"
              onClick={scrollToProof}
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-vae-turquoise hover:text-vae-turquoise"
            >
              Referenzen ansehen
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Trust-note */}
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/35">
            Binnen 48h Termin · Kein Pitch · Keine Verpflichtung · Heidelberg & deutschlandweit
          </p>
        </div>
      </div>

      {/* Bottom: was Sie am Ende haben — 3 Ergebnisse, eine Zeile */}
      <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
        {[
          { num: '3–6W', text: 'bis produktiv — nicht Monate' },
          { num: '100%', text: 'Ihre Daten, Ihre Server' },
          { num: '0€', text: 'Vendor-Lock-in nach dem Setup' },
        ].map(({ num, text }) => (
          <div
            key={num}
            className="flex items-center gap-4 border-b border-white/10 px-6 py-5 last:border-r-0 sm:border-b-0 sm:border-r"
          >
            <span className="text-2xl font-black tracking-[-0.05em] text-vae-turquoise">{num}</span>
            <span className="text-sm leading-snug text-white/55">{text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MinimalHeroSection
