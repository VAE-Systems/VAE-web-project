import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { servicesData, lifecycleBlocks } from '../../content/services'

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const superscripts: Record<string, string> = {
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵'
  }

  const footnotes: Record<string, string> = {
    '1': 'McKinsey: Value Capture Open Source (2023)',
    '2': 'Forrester: Decision Velocity in Modular Architectures (2024)',
    '3': 'Red Hat: Enterprise Open Source Report (2024)',
    '4': 'Internal Case Aggregation (Median Implementierung)',
    '5': 'MIT Sloan / Automations Benchmark (2024)'
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 })
        if (cardsRef.current) gsap.set(cardsRef.current.children, { opacity: 1, y: 0, scale: 1 })
        return
      }
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0, y: 60, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        })
      }
      if (cardsRef.current) {
        Array.from(cardsRef.current.children).forEach(card => {
          gsap.from(card, {
            opacity: 0, y: 80, scale: 0.9, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: card as HTMLElement, start: 'top 85%' }
          })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Mapping paths for detail navigation
  const servicePath: Record<string,string> = {
    consulting: '/services/consulting',
    trainings: '/services/trainings',
    solutions: '/services/custom-solutions'
  }

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-36 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-secondary border-t border-vae-turquoise/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(var(--vae-turquoise-rgb),0.08),transparent_55%)]" />
      </div>

      <div className="relative container-vae">
        {/* Section Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className="h2 heading-gradient mb-4">Services</h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Von erster Einordnung bis souveränem Betrieb: <span className="text-text-light font-medium">Schulungen & Workshops</span> für interne Kompetenz, <span className="text-text-light font-medium">Beratung</span> für Richtung & Governance sowie modulare <span className="text-text-light">Custom Solutions</span> für messbare Prozess‑ & Wissensautomatisierung. <span className="text-vae-turquoise">Open Source. Auditierbar. Austauschbar.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20" ref={cardsRef}>
          {servicesData.map((s) => (
            <div
              key={s.key}
              className="group relative p-8 rounded-2xl bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_12px_44px_-10px_rgba(var(--vae-turquoise-rgb),0.4)]"
            >
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-vae-turquoise/20 text-vae-turquoise flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">{s.iconName}</span>
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-vae-turquoise/80">{s.title.split(' – ')[0]}</span>
                </div>
                <span className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium tracking-wide">{s.badge}</span>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-text-light dark:text-white mb-3 leading-tight">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{s.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {s.stats.map((st, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold text-vae-turquoise mb-1">{st.value}</div>
                      <div className="text-[11px] text-text-muted leading-tight">
                        {st.desc}
                        {st.note && <sup className="text-vae-turquoise/60">{superscripts[st.note]}</sup>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-text-light dark:text-white mb-2">Schwerpunkte:</div>
                  <div className="flex flex-wrap gap-2">
                    {s.features.map(f => (
                      <span key={f} className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={servicePath[s.key] || '/services'}
                  className={`btn-convert mt-auto gap-2`}
                  aria-label={`${s.title} – Details ansehen`}
                  data-pulse={s.key === 'consulting'}
                >
                  {s.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </Link>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.10),transparent_70%)]" />
            </div>
          ))}
        </div>

        {/* Lifecycle / Value Blocks */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {lifecycleBlocks.map(b => (
            <div key={b.title} className="p-6 rounded-2xl bg-vae-turquoise/5 border border-vae-turquoise/20">
              <h3 className="text-sm font-semibold text-text-light mb-3">{b.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        {/* KPI / Studien Panel */}
        <div className="relative bg-gradient-to-br from-vae-turquoise/5 to-vae-turquoise/2 border border-vae-turquoise/20 rounded-3xl p-10 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_70%_30%,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)]" />
          <div className="relative grid md:grid-cols-4 gap-8 mb-10">
            {[{k:'< 6 Wochen',l:'Proof → produktiver Wert'},{k:'> 60%',l:'Prozess-Effizienzsteigerung (Automation)',note:'5'},{k:'4–6x',l:'Schnellere Architektur-Entscheidungen',note:'2'},{k:'65%',l:'Reduzierte Vendor-/Lizenzkosten',note:'1'}].map(x => (
              <div key={x.l} className="text-center md:text-left">
                <div className="text-2xl font-bold text-vae-turquoise mb-1">{x.k}</div>
                <div className="text-[11px] uppercase tracking-wide text-text-muted">
                  {x.l}
                  {x.note && <sup className="text-vae-turquoise/60">{superscripts[x.note]}</sup>}
                </div>
              </div>
            ))}
          </div>
          <div className="relative text-xs text-text-secondary leading-relaxed max-w-4xl">
            Unsere Services kombinieren <span className="text-text-light dark:text-white">architektonische Klarheit</span>, <span className="text-text-light dark:text-white">schnelle operative Umsetzbarkeit</span> und <span className="text-text-light dark:text-white">Enablement</span>. So entsteht nachhaltige interne Kompetenz statt externer Black Box. Fokus auf <strong className="text-text-light dark:text-white font-semibold">Open Source KI, Retrieval Qualität, Workflow Robustheit</strong> und <strong className="text-text-light dark:text-white font-semibold">Compliance früh</strong>. Ergebnis: verkürzte Iterationen, geringeres Risiko, nachweisbarer ROI.
          </div>
        </div>

        {/* Footnotes */}
        <div className="mt-8 text-[10px] text-text-muted space-y-1">
          {Object.entries(footnotes).map(([key, text]) => (
            <div key={key} className="flex items-start gap-2">
              <sup className="text-vae-turquoise/60 mt-[-2px]">{superscripts[key]}</sup>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
