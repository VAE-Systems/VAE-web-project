import { CAREER_HERO } from '../../data/careerData'
import { Mail, Sparkles, UsersRound } from 'lucide-react'
import React, { useMemo } from 'react'

export const CareerHero: React.FC = () => {
  const bodyParagraphs = useMemo<string[]>(() => CAREER_HERO.body.split(' — ').map((chunk: string) => chunk.trim()), [])
  const focusBadges = ['Freelance Engineering', 'DevOps', 'UX Research', 'Open Source', 'Remote EU']
  const statusHighlights = [
    { label: 'Status', value: 'Keine aktiven Stellenausschreibungen' },
    { label: 'Profil', value: 'Senior Freelancer · 5+ Jahre Erfahrung' },
    { label: 'Bereiche', value: 'Backend · DevOps · UX' },
  ]

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-bg-darker via-bg-darker/95 to-[#050505] py-24 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(var(--color-vae-turquoise-rgb),0.32),transparent_58%),radial-gradient(circle_at_85%_0%,rgba(64,120,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_60%)] mix-blend-screen" />
        <div className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-vae-turquoise/20 blur-3xl" />
      </div>

      <div className="container-vae relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6 text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-vae-turquoise/40 bg-vae-turquoise/10 px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.35em] text-vae-turquoise/85">
            Karriere & Netzwerk
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">{CAREER_HERO.title}</h1>
          <p className="text-lg font-medium text-white/85 md:text-xl">{CAREER_HERO.subheading}</p>
          <div className="space-y-4 text-base leading-relaxed text-white/80 md:text-lg">
            {bodyParagraphs.map((paragraph: string) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2" aria-label="Schwerpunkte">
            {focusBadges.map(badge => (
              <span
                key={badge}
                className="border-white/12 rounded-full border bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/70"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-10 shadow-[0_30px_80px_rgba(7,15,25,0.55)] backdrop-blur xl:p-12">
          <div
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            aria-hidden="true"
          />
          <div className="relative space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              <Sparkles className="h-4 w-4 text-vae-turquoise" />
              Fokus 2025
            </div>

            <div className="space-y-5">
              {statusHighlights.map(item => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-vae-turquoise/70">
                    {item.label}
                  </p>
                  <p className="text-sm text-white/85">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-vae-turquoise/75">Kontakt</p>
              <p className="text-sm text-white/75">Profil, Referenzen oder GitHub direkt an uns senden.</p>
              <a
                href="mailto:info@vae.systems?subject=Freelance%20Netzwerk%20VAE"
                className="inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-vae-turquoise"
              >
                <Mail className="h-4 w-4" /> info@vae.systems
              </a>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/15 px-4 py-3 text-xs text-white/60">
              <UsersRound className="h-4 w-4 text-vae-turquoise" />
              Wir antworten innerhalb weniger Tage – jede Anfrage landet direkt bei den Gründern.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
