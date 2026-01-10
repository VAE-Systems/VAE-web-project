/**
 * Team Network CTA Section
 * Design identisch zu LeadershipCTA
 */
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { NETWORK_CTA } from '@/content/shared/teamNetworkData'
import { ArrowUpRight, Sparkles, Users } from 'lucide-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

export const TeamNetworkCTA: React.FC = () => {
  const buttonLabel = useMemo(() => NETWORK_CTA.button.label, [])
  const copyParagraphs = useMemo(() => NETWORK_CTA.copy.split(' — ').map(paragraph => paragraph.trim()), [])
  const supportingPoints = useMemo(
    () => [
      {
        id: 'netzwerk',
        title: 'Kuratiertes Netzwerk',
        description: 'Wir wählen Partner sorgfältig aus – für fachliche Exzellenz und kulturelle Passung.',
      },
      {
        id: 'projekte',
        title: 'Spannende Projekte',
        description: 'Von KI-Integration bis zur digitalen Infrastruktur – arbeiten Sie an Projekten, die zählen.',
      },
      {
        id: 'flexibilitaet',
        title: 'Flexibel & eigenverantwortlich',
        description: 'Remote-First, transparente Kommunikation und Raum für eigene Ideen.',
      },
    ],
    []
  )

  return (
    <section className="relative z-0 overflow-hidden border-t border-black/5 bg-bg-dark py-24 dark:border-white/5">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.08),transparent_70%)]" />
      </div>

      <div className="container-vae relative grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/35 bg-vae-turquoise/10 px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-vae-turquoise/85">
            Zusammenarbeit
          </p>
          <h2 className="text-balance text-3xl font-semibold text-text-light md:text-4xl lg:text-5xl">
            {NETWORK_CTA.heading}
          </h2>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-text-light/80 md:text-lg">
            {copyParagraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start">
            <MagneticButton intensity={0.08} className="w-full sm:w-auto">
              <a
                href={NETWORK_CTA.button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex w-full items-center justify-center gap-3 px-10 py-4 text-base font-semibold"
              >
                <Users className="h-5 w-5" />
                {buttonLabel}
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </MagneticButton>
            <MagneticButton intensity={0.06} className="w-full sm:w-auto">
              <Link
                to="/ueber-uns/leitung"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-text-muted transition-colors duration-200 hover:border-vae-turquoise/60 hover:text-text-light"
              >
                Unsere Leitung kennenlernen
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur xl:p-12">
          <div
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            aria-hidden="true"
          />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
              <Sparkles className="h-4 w-4 text-vae-turquoise" />
              Was Sie erwartet
            </div>
            <ul className="space-y-5 text-left text-text-light/80">
              {supportingPoints.map(point => (
                <li key={point.id} className="space-y-1 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise/75">
                    {point.title}
                  </p>
                  <p className="text-sm leading-relaxed text-text-light/75">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
