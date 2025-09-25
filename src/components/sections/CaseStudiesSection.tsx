import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'
import Icon from '@/components/ui/Icon'
import { caseStudies, upcomingCasePlaceholders } from '../../content/caseStudies'

/**
 * CaseStudiesSection
 * Replaces old Testimonials with authentic / evolving project stories.
 */
const CaseStudiesSection: React.FC = () => {
  // Early exit with notice when no case studies are available
  if (caseStudies.length === 0) {
    return (
      <section
        id="case-studies"
        className="border-border-primary surface-dark overlay-grid overlay-diag edge-glow-top relative border-t py-32 dark:border-white/5"
      >
        <div className="container-vae text-center">
          <h2 className="h2 heading-gradient mb-6">Case Studies & Pilots</h2>
          <p className="mb-6 text-sm text-text-secondary">
            Aktuell werden Pilots kuratiert & aufbereitet. Bleib informiert oder nimm direkt Kontakt auf.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/newsletter"
              className="rounded-lg border border-vae-turquoise/40 bg-vae-turquoise/15 px-6 py-3 text-sm font-medium text-vae-turquoise transition-all hover:bg-vae-turquoise hover:text-bg-darker"
            >
              Newsletter abonnieren
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-vae-turquoise/40 bg-vae-turquoise/15 px-6 py-3 text-sm font-medium text-vae-turquoise transition-all hover:bg-vae-turquoise hover:text-bg-darker"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </section>
    )
  }

  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (caseStudies.length === 0) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([headerRef.current, cardsRef.current], { opacity: 1, y: 0 })
        return
      }
      if (!sectionRef.current) return
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
          force3D: true,
        }
      )
      const cards = cardsRef.current?.children
      if (cards) {
        Array.from(cards).forEach((c, i) => {
          gsap.fromTo(
            c,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: c as HTMLElement, start: 'top 88%' },
              force3D: true,
            }
          )
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const displayCases = [...caseStudies]
  if (caseStudies.length < 3) {
    displayCases.push(...upcomingCasePlaceholders.slice(0, 3 - caseStudies.length))
  }
  const single = caseStudies.length === 1

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="border-border-primary surface-dark overlay-grid overlay-diag edge-glow-top relative overflow-hidden border-t py-24 dark:border-white/5 sm:py-32"
    >
      <ParallaxBackdrop strength={7} />
      <ParticleField count={14} />

      <div className="container-vae relative">
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="h2 heading-gradient mb-6">Case Studies & Pilots</h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            Frühe produktive Umsetzungen & fokussierte Pilot-Initiativen – ausgerichtet auf belastbare Lernkurven und
            validierbare Outcomes statt künstlicher Referenz-Sammlungen.
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`grid items-stretch gap-10 ${single ? 'mx-auto max-w-4xl md:grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}
        >
          {displayCases.map(cs => (
            <article
              key={cs.slug}
              className={`to-vae-turquoise/2 duration-400 group relative flex h-full flex-col rounded-2xl border border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/5 p-7 backdrop-blur-xl transition-all ${cs.comingSoon ? 'opacity-75' : 'shadow-black/30/ shadow-lg hover:-translate-y-2 hover:border-vae-turquoise/40'}`}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_70%_30%,hsla(var(--color-vae-turquoise),0.25),transparent_60%)] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100" />

              <header className="relative z-10 mb-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-vae-turquoise/30 bg-vae-turquoise/15 px-3 py-1 text-[10px] font-semibold tracking-wide text-vae-turquoise">
                    {cs.type}
                  </span>
                  <span className="rounded-md border border-vae-turquoise/30 bg-vae-turquoise/10 px-2 py-1 text-[10px] text-vae-turquoise">
                    {cs.year}
                  </span>
                  <span
                    className={`rounded-md px-2 py-1 text-[10px] ${cs.comingSoon ? 'border-vae-turquoise/20 bg-vae-turquoise/5 text-text-muted' : 'border-vae-turquoise/30 bg-vae-turquoise/10 text-vae-turquoise'}`}
                  >
                    {cs.status}
                  </span>
                </div>
                <h3
                  className={`text-lg font-semibold leading-snug transition-colors ${cs.comingSoon ? 'text-text-secondary' : 'text-text-light group-hover:text-vae-turquoise'}`}
                >
                  {cs.title}
                </h3>
              </header>

              {cs.comingSoon ? (
                <div className="relative z-10 space-y-3 text-sm text-text-secondary/70">
                  <p>{cs.challenge}</p>
                  <p className="text-[12px] text-text-muted">Details folgen – in Validierung / Aufbereitung.</p>
                </div>
              ) : (
                <div className="relative z-10 space-y-4 text-sm text-text-secondary">
                  <p>
                    <span className="font-medium text-vae-turquoise">Challenge:</span> {cs.challenge}
                  </p>
                  <p>
                    <span className="font-medium text-vae-turquoise">Solution:</span> {cs.solution}
                  </p>
                  {cs.narrative && <p className="italic text-text-muted">{cs.narrative}</p>}
                </div>
              )}

              {cs.metrics?.length > 0 && (
                <ul className="relative z-10 my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {cs.metrics.map(m => (
                    <li
                      key={m.label}
                      className="bg-bg-primary/5 border-border-primary flex flex-col rounded-xl border p-3 text-center dark:border-white/10 dark:bg-white/5"
                    >
                      <span className="text-sm font-semibold leading-tight text-vae-turquoise">{m.value}</span>
                      <span className="mt-1 text-[10px] leading-tight text-text-muted">{m.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="relative z-10 mt-auto flex flex-wrap gap-2">
                {cs.tags.map(t => (
                  <span
                    key={t}
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${cs.comingSoon ? 'bg-bg-primary/5 border-border-primary text-text-muted dark:border-white/10 dark:bg-white/5' : 'border-vae-turquoise/30 bg-vae-turquoise/10 text-vae-turquoise'}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <footer className="relative z-10 mt-6 min-h-[40px]">
                {cs.comingSoon ? (
                  <div className="text-center text-[11px] tracking-wide text-text-muted">Coming Soon</div>
                ) : (
                  <button className="w-full rounded-lg border border-vae-turquoise/40 bg-vae-turquoise/15 py-3 text-sm font-medium text-vae-turquoise transition-all hover:bg-vae-turquoise hover:text-bg-darker">
                    Mehr erfahren
                  </button>
                )}
              </footer>
            </article>
          ))}
        </div>

        {/* CTA minimal for now */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-wider text-text-muted">Pipeline</p>
          <p className="mb-6 text-sm leading-relaxed text-text-secondary">
            Fokus: Validierte Pilots statt künstlicher Referenz-Sammlung. Neue Einträge sobald Ergebnisse belastbar
            dokumentiert sind.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 text-sm text-vae-turquoise hover:underline">
            Use Case prüfen lassen <Icon name="arrow_forward" size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default CaseStudiesSection
