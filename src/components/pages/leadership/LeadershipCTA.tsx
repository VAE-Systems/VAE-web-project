import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { LEADERSHIP_CTA } from '@/data/leadershipData'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

export const LeadershipCTA: React.FC = () => {
  const buttonLabel = useMemo(() => LEADERSHIP_CTA.button.label.toUpperCase(), [])
  const copyParagraphs = useMemo(() => LEADERSHIP_CTA.copy.split(' — ').map(paragraph => paragraph.trim()), [])
  const supportingPoints = useMemo(
    () => [
      {
        id: 'sparring',
        title: 'Strategisches Sparring',
        description: 'Wir challengen Annahmen, liefern Markt- und Tech-Perspektiven und bereiten Entscheidungen vor.',
      },
      {
        id: 'systeme',
        title: 'Systeme, die tragen',
        description: 'Architekturen, die skalieren, dokumentiert sind und auch ohne uns funktionieren.',
      },
      {
        id: 'partnerschaft',
        title: 'Partnerschaftlich & ehrlich',
        description: 'Transparent, direkt, keine Überraschungen – wir arbeiten wie ein erweitertes internes Team.',
      },
    ],
    []
  )

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-bg-dark via-bg-darker to-bg-dark py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_top,rgba(var(--color-vae-turquoise-rgb),0.25),transparent_65%)]" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-vae-turquoise/20 blur-3xl" />
        <div className="absolute -right-20 top-12 h-60 w-60 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="container-vae relative grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-vae-turquoise/35 bg-vae-turquoise/10 px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-vae-turquoise/85">
            Zusammenarbeit
          </p>
          <h2 className="text-balance text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
            {LEADERSHIP_CTA.heading}
          </h2>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-white/75 md:text-lg">
            {copyParagraphs.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start">
            <MagneticButton intensity={0.08} className="w-full sm:w-auto">
              <Link
                to={LEADERSHIP_CTA.button.href}
                className="btn-primary inline-flex w-full items-center justify-center gap-3 px-10 py-4 text-sm font-semibold uppercase tracking-[0.35em]"
              >
                {buttonLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
            <Link
              to="/about/referenzen"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition-colors duration-200 hover:border-vae-turquoise/60 hover:text-white"
            >
              Case Studies ansehen
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur xl:p-12">
          <div
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            aria-hidden="true"
          />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              <Sparkles className="h-4 w-4 text-vae-turquoise" />
              Was Sie erwartet
            </div>
            <ul className="space-y-5 text-left text-white/80">
              {supportingPoints.map(point => (
                <li key={point.id} className="space-y-1 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise/75">
                    {point.title}
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
