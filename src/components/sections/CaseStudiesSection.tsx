import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'
import { caseStudies, upcomingCasePlaceholders } from '../../content/caseStudies'

/**
 * CaseStudiesSection
 * Replaces old Testimonials with authentic / evolving project stories.
 */
const CaseStudiesSection: React.FC = () => {
  // Early exit with notice when no case studies are available
  if (caseStudies.length === 0) {
    return (
      <section id="case-studies" className="relative py-32 border-t border-white/5 surface-dark overlay-grid overlay-diag edge-glow-top">
        <div className="container-vae text-center">
          <h2 className="h2 heading-gradient mb-6">Case Studies & Pilots</h2>
          <p className="text-text-secondary text-sm mb-6">Aktuell werden Pilots kuratiert & aufbereitet. Bleib informiert oder nimm direkt Kontakt auf.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/newsletter" className="px-6 py-3 rounded-lg bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/40 text-sm font-medium hover:bg-vae-turquoise hover:text-bg-darker transition-all">Newsletter abonnieren</a>
            <a href="/contact" className="px-6 py-3 rounded-lg bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/40 text-sm font-medium hover:bg-vae-turquoise hover:text-bg-darker transition-all">Kontakt aufnehmen</a>
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
      gsap.fromTo(headerRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } })
      const cards = cardsRef.current?.children
      if (cards) {
        Array.from(cards).forEach((c, i) => {
          gsap.fromTo(c, { opacity: 0, y: 80, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.08, scrollTrigger: { trigger: c as HTMLElement, start: 'top 88%' } })
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
    <section id="case-studies" ref={sectionRef} className="relative py-24 sm:py-32 border-t border-white/5 surface-dark overlay-grid overlay-diag edge-glow-top overflow-hidden">
      <ParallaxBackdrop strength={7} />
      <ParticleField count={14} />

      <div className="container-vae relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="h2 heading-gradient mb-6">Case Studies & Pilots</h2>
          <p className="text-lg text-text-secondary leading-relaxed">Frühe produktive Umsetzungen & fokussierte Pilot-Initiativen – ausgerichtet auf belastbare Lernkurven und validierbare Outcomes statt künstlicher Referenz-Sammlungen.</p>
        </div>

        <div ref={cardsRef} className={`grid items-stretch gap-10 ${single ? 'md:grid-cols-1 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {displayCases.map(cs => (
            <article key={cs.slug} className={`group relative flex flex-col h-full rounded-2xl p-7 bg-gradient-to-br from-vae-turquoise/5 to-vae-turquoise/2 backdrop-blur-xl border border-vae-turquoise/20 transition-all duration-400 ${cs.comingSoon ? 'opacity-75' : 'hover:border-vae-turquoise/40 hover:-translate-y-2 shadow-lg shadow-black/30/'}`}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen pointer-events-none bg-[radial-gradient(circle_at_70%_30%,hsla(var(--color-vae-turquoise),0.25),transparent_60%)]" />

              <header className="mb-5 relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 text-[10px] tracking-wide font-semibold rounded-full bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/30">{cs.type}</span>
                  <span className="px-2 py-1 text-[10px] rounded-md bg-vae-turquoise/10 text-vae-turquoise border border-vae-turquoise/30">{cs.year}</span>
                  <span className={`px-2 py-1 text-[10px] rounded-md ${cs.comingSoon ? 'bg-vae-turquoise/5 text-text-muted border-vae-turquoise/20' : 'bg-vae-turquoise/10 text-vae-turquoise border-vae-turquoise/30'}`}>{cs.status}</span>
                </div>
                <h3 className={`text-lg font-semibold leading-snug transition-colors ${cs.comingSoon ? 'text-text-secondary' : 'text-text-light group-hover:text-vae-turquoise'}`}>{cs.title}</h3>
              </header>

              {cs.comingSoon ? (
                <div className="space-y-3 relative z-10 text-sm text-text-secondary/70">
                  <p>{cs.challenge}</p>
                  <p className="text-text-muted text-[12px]">Details folgen – in Validierung / Aufbereitung.</p>
                </div>
              ) : (
                <div className="space-y-4 relative z-10 text-sm text-text-secondary">
                  <p><span className="text-vae-turquoise font-medium">Challenge:</span> {cs.challenge}</p>
                  <p><span className="text-vae-turquoise font-medium">Solution:</span> {cs.solution}</p>
                  {cs.narrative && <p className="text-text-muted italic">{cs.narrative}</p>}
                </div>
              )}

              {cs.metrics?.length > 0 && (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 relative z-10">
                  {cs.metrics.map(m => (
                    <li key={m.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col">
                      <span className="text-sm font-semibold text-vae-turquoise leading-tight">{m.value}</span>
                      <span className="text-[10px] text-text-muted leading-tight mt-1">{m.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                {cs.tags.map(t => (
                  <span key={t} className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${cs.comingSoon ? 'bg-white/5 text-text-muted border-white/10' : 'bg-vae-turquoise/10 text-vae-turquoise border-vae-turquoise/30'}`}>{t}</span>
                ))}
              </div>

              <footer className="relative z-10 mt-6 min-h-[40px]">
                {cs.comingSoon ? (
                  <div className="text-center text-[11px] text-text-muted tracking-wide">Coming Soon</div>
                ) : (
                  <button className="w-full py-3 rounded-lg bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/40 text-sm font-medium hover:bg-vae-turquoise hover:text-bg-darker transition-all">Mehr erfahren</button>
                )}
              </footer>
            </article>
          ))}
        </div>

        {/* CTA minimal for now */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-3">Pipeline</p>
          <p className="text-sm text-text-secondary leading-relaxed mb-6">Fokus: Validierte Pilots statt künstlicher Referenz-Sammlung. Neue Einträge sobald Ergebnisse belastbar dokumentiert sind.</p>
          <a href="/contact" className="inline-flex items-center gap-2 text-vae-turquoise text-sm hover:underline">Use Case prüfen lassen <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
        </div>
      </div>
    </section>
  )
}

export default CaseStudiesSection
