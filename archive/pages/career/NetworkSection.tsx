import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { NETWORK_CTA } from '../../data/careerData'
import { ArrowUpRight, Star } from 'lucide-react'
import React from 'react'

const highlights = [
  'Transparente Honorare & direkte Kundenschnittstelle',
  'Pairing mit den Gründern, keine Ticket-Flut',
  'Klare Deliverables, dokumentierte Systeme',
]

export const NetworkSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-bg-darker via-[#0f171b] to-bg-dark py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.22),transparent_65%)]" />
        <div className="absolute -right-24 bottom-12 h-56 w-56 rounded-full bg-vae-turquoise/15 blur-3xl" />
      </div>

      <div className="container-vae relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Netzwerk</p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl">{NETWORK_CTA.question}</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/80 lg:mx-0">{NETWORK_CTA.copy}</p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start">
            <MagneticButton intensity={0.08} className="w-full sm:w-auto">
              <a
                href={NETWORK_CTA.buttons[0].href}
                className="btn-primary inline-flex w-full items-center justify-center gap-3 px-10 py-4 text-sm font-semibold uppercase tracking-[0.35em]"
              >
                {NETWORK_CTA.buttons[0].label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </MagneticButton>
            <a
              href={NETWORK_CTA.buttons[1].href}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:border-vae-turquoise/60 hover:text-white"
            >
              {NETWORK_CTA.buttons[1].label}
            </a>
          </div>

          <p className="text-xs text-white/60">{NETWORK_CTA.note}</p>
        </div>

        <aside className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
            <Star className="h-4 w-4 text-vae-turquoise" />
            Warum es sich lohnt
          </div>
          <ul className="mt-6 space-y-4 text-sm text-white/80">
            {highlights.map(item => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
