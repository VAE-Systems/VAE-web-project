import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'

/**
 * CaseStudiesSection
 * Replaces old Testimonials with authentic / evolving project stories.
 */
const CaseStudiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
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

  const cases = [
    {
      slug: 'art-affair-qr-signage',
      title: 'ART AFFAIR – QR Code Newsletter Automation @ art KARLSRUHE 2025',
      type: 'Pilot Automation',
      status: 'Live Pilot',
      year: '2025',
      tags: ['Event-Tech', 'Newsletter Funnel', 'On-Site Automation'],
      challenge: 'Vor Ort qualifizierte Kontakte erfassen ohne Personal-Overhead & sofortigen digitalen Mehrwert liefern.',
      solution: 'Dynamische QR-Codes an jedem Kunstwerk, Scan führt zu Micro-Flow: DSGVO-konforme Opt-in Oberfläche → Sofort E-Mail mit Stand-Infos & PDF → Segmentierung für Follow-up.',
      outcome: 'Hohe Conversion bei minimalem Setup-Aufwand; Grundlage für wiederverwendbaren Event-Automations-Blueprint.',
      metrics: [
        { label: 'Avg. Scan→Opt-in', value: '38%', hint: 'First-day conversion (Pilot)' },
        { label: 'Setup Zeit', value: '~2h', hint: 'On-site Aktivierung' },
        { label: 'Manual Aufwand', value: '-70%', hint: 'vs. manuelle Erfassung' }
      ],
      narrative: 'Für ART AFFAIR wurde ein schneller, skalierbarer Messe-Funnel implementiert: Besucher scannen, erhalten kontextuelle Inhalte und sind sofort im Segment. Kein Vendor-Lock-in, vollständig adaptierbar für kommende Ausstellungen. Grundlage für spätere Integration mit VAE CORE Embedding-Katalogen.'
    }
  ]

  return (
    <section id="case-studies" ref={sectionRef} className="relative py-32 border-t border-white/5 surface-dark overlay-grid overlay-diag edge-glow-top overflow-hidden">
      <ParallaxBackdrop strength={7} />
      <ParticleField count={14} />

      <div className="container-vae relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="h2 heading-gradient mb-6">Case Studies & Pilots</h2>
          <p className="text-lg text-text-secondary leading-relaxed">Frühe produktive Umsetzungen & fokussierte Pilot-Initiativen – ausgerichtet auf belastbare Lernkurven und validierbare Outcomes statt künstlicher Referenz-Sammlungen.</p>
        </div>

        <div ref={cardsRef} className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {cases.map(cs => (
            <article key={cs.slug} className="group relative flex flex-col rounded-2xl p-7 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] backdrop-blur-xl border border-white/12 hover:border-vae-turquoise/40 transition-all duration-400 hover:-translate-y-2 shadow-lg shadow-black/30/">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen pointer-events-none bg-[radial-gradient(circle_at_70%_30%,hsla(var(--color-vae-turquoise),0.25),transparent_60%)]" />

              <header className="mb-5 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-[10px] tracking-wide font-semibold rounded-full bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/30">{cs.type}</span>
                  <span className="px-2 py-1 text-[10px] rounded-md bg-white/5 text-text-secondary border border-white/10">{cs.year}</span>
                  <span className="px-2 py-1 text-[10px] rounded-md bg-vae-turquoise/10 text-vae-turquoise border border-vae-turquoise/30">{cs.status}</span>
                </div>
                <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-vae-turquoise transition-colors">{cs.title}</h3>
              </header>

              <div className="space-y-4 relative z-10 text-sm text-text-secondary">
                <p><span className="text-vae-turquoise font-medium">Challenge:</span> {cs.challenge}</p>
                <p><span className="text-vae-turquoise font-medium">Solution:</span> {cs.solution}</p>
                <p className="text-text-muted italic">{cs.narrative}</p>
              </div>

              <ul className="grid grid-cols-3 gap-3 my-6 relative z-10">
                {cs.metrics.map(m => (
                  <li key={m.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center flex flex-col">
                    <span className="text-sm font-semibold text-vae-turquoise leading-tight">{m.value}</span>
                    <span className="text-[10px] text-text-muted leading-tight mt-1">{m.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                {cs.tags.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-vae-turquoise/10 text-vae-turquoise border border-vae-turquoise/30">{t}</span>
                ))}
              </div>

              <footer className="relative z-10 mt-6">
                <button className="w-full py-3 rounded-lg bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/40 text-sm font-medium hover:bg-vae-turquoise hover:text-bg-darker transition-all">Mehr erfahren</button>
              </footer>
            </article>
          ))}
        </div>

        {/* CTA minimal for now */}
        <div className="mt-24 text-center">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-4">Ausbau laufend</p>
          <p className="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">Weitere Pilots (R&D Automation, Sovereign LLM Workflows, Secure Vector Analytics) folgen – Ausbau laufend. Fokus bleibt: Qualität, Validierung, Wiederverwendbarkeit.</p>
        </div>
      </div>
    </section>
  )
}

export default CaseStudiesSection
