import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  // Services (ohne Plattform-Karte – VE CORE gehört zu Products)
  // Reihenfolge angepasst: erst Schulungen & Workshops, dann Beratung, dann Custom Solutions
  const services = [
    {
      key: 'trainings',
      badge: 'Core Säule',
      title: 'Schulungen & Workshops – Enablement & Rollenkompetenz',
      description: 'Hands-on Formate für Dev, Ops & Knowledge Steward. Schnelle interne Souveränität statt dauerhafte externe Abhängigkeit.',
      stats: [
        { value: '2–4', desc: 'Wochen initiales Setup', note: '3' },
        { value: '100%', desc: 'Enablement Fokus' }
      ],
      features: ['Workshops & Labs', 'Artefakte / Playbooks', 'Mentoring & Shadowing'],
      cta: 'Schulungen ansehen',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7l8 4 8-4-8-4-8 4Zm0 4 8 4 8-4" stroke="currentColor" strokeWidth="2" />
          <path d="M12 11v9" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      key: 'consulting',
      badge: 'Core Säule',
      title: 'Beratung – Architektur & Governance',
      description: 'Architektur, Governance, Compliance & Roadmaps für souveräne KI- & Automationslandschaften. Fokus: Transparenz, Austauschbarkeit, Betrieb statt POC-Silos.',
      stats: [
        { value: '65%', desc: 'ø Lizenz-/Vendor Kosten Reduktion', note: '1' },
        { value: '4–6x', desc: 'Schnellere Entscheidungszyklen', note: '2' }
      ],
      features: ['Architektur-Assessment', 'Roadmap & Reifegradmodell', 'Governance / AI Act Vororientierung'],
      cta: 'Beratung ansehen',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M7 8h10M7 12h6" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      key: 'solutions',
      badge: 'Core Säule',
      title: 'Custom Solutions – Integration & Automation',
      description: 'Gezielte Automations- & Retrieval-Bausteine. Von Connectoren über Evaluierung bis Observability – modular kombinierbar.',
      stats: [
        { value: '3–8', desc: 'Wochen MVP Umsetzung', note: '4' },
        { value: '60%', desc: 'Avg. Effizienzgewinn', note: '5' }
      ],
      features: ['Workflow Orchestrierung', 'Retrieval / Index Layer', 'Evaluierung & Monitoring'],
      cta: 'Use Cases',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    }
  ]

  // Mapping paths for detail navigation
  const servicePath: Record<string,string> = {
    consulting: '/services/consulting',
    trainings: '/services/trainings',
    solutions: '/services/custom-solutions'
  }

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-36 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-secondary border-t border-vae-turquoise/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.15] bg-[radial-gradient(circle_at_20%_30%,rgba(var(--vae-turquoise-rgb),0.1),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(var(--vae-turquoise-rgb),0.06),transparent_55%)]" />
      <div className="container-vae relative">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <h2 className="h2 heading-gradient h-space">Services – Enablement, Beratung, Umsetzung</h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">Von erster Einordnung bis souveränem Betrieb: <span className="text-text-light font-medium">Schulungen & Workshops</span> für interne Kompetenz, <span className="text-text-light font-medium">Beratung</span> für Richtung & Governance sowie modulare <span className="text-text-light">Custom Solutions</span> für messbare Prozess‑ & Wissensautomatisierung. <span className="text-vae-turquoise">Open Source. Auditierbar. Austauschbar.</span></p>
        </div>

        {/* Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24 items-stretch">
          {services.map((s) => (
            <div
              key={s.key}
              className={`group relative overflow-hidden rounded-2xl p-7 bg-vae-turquoise/5 backdrop-blur-md border border-vae-turquoise/20 flex flex-col h-full transition-all duration-400 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_8px_36px_-8px_rgba(var(--vae-turquoise-rgb),0.35)] hover:-translate-y-2`}
            >
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-vae-turquoise/20 text-vae-turquoise flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-vae-turquoise/80">{s.title.split(' – ')[0]}</span>
                </div>
                <span className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium tracking-wide">{s.badge}</span>
              </div>
              <h3 className="h4 mb-3 text-text-light leading-snug relative z-10">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-grow relative z-10">{s.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-6 text-center text-[11px] rounded-lg p-3 bg-vae-turquoise/5 relative z-10">
                {s.stats.map(st => (
                  <div key={st.desc}>
                    <div className="text-base font-bold text-vae-turquoise mb-0.5">{st.value}</div>
                    <div className="text-[10px] leading-tight text-text-muted">
                      {st.desc}
                      {st.note && (
                        <sup
                          className="ml-0.5 cursor-help text-vae-turquoise"
                          title={footnotes[st.note]}
                        >
                          {superscripts[st.note]}
                        </sup>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <ul className="space-y-2 mb-8 relative z-10">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={servicePath[s.key] || '/services'}
                className={`btn-convert mt-auto gap-2`}
                aria-label={`${s.title} – Details ansehen`}
                data-pulse={s.key === 'consulting'}
              >
                {s.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </Link>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.10),transparent_70%)]" />
            </div>
          ))}
        </div>

        {/* Lifecycle / Value Blocks */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {[{h:'Lifecycle Ansatz',d:'Analyse → Architektur → Umsetzung → Enablement → Betrieb. Keine „Throwaway“ POCs – inkrementell produktionsfähig.'},{h:'Messbarkeit',d:'Evaluationssets, Quality Gates & Betriebsmesswerte eingebaut statt nachgelagert. Entscheidungen werden datenbasiert.'},{h:'Souveränität',d:'Open Source & lokale Ausführbarkeit verhindern unerwünschten Lock‑in. Austauschbare Index & Modell Layer.'}].map(b => (
            <div key={b.h} className="p-6 rounded-2xl bg-vae-turquoise/5 border border-vae-turquoise/20">
              <h3 className="text-sm font-semibold text-text-light mb-3">{b.h}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>

        {/* KPI / Studien Panel */}
        <div className="relative bg-gradient-to-br from-vae-turquoise/5 to-vae-turquoise/2 border border-vae-turquoise/20 rounded-3xl p-10 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_70%_30%,rgba(0,239,213,0.12),transparent_60%)]" />
          <div className="relative grid md:grid-cols-4 gap-8 mb-10">
            {[{k:'< 6 Wochen',l:'Proof → produktiver Wert'},{k:'> 60%',l:'Prozess-Effizienzsteigerung (Automation)',note:'5'},{k:'4–6x',l:'Schnellere Architektur-Entscheidungen',note:'2'},{k:'65%',l:'Reduzierte Vendor-/Lizenzkosten',note:'1'}].map(x => (
              <div key={x.l} className="text-center md:text-left">
                <div className="text-2xl font-bold text-vae-turquoise mb-1">{x.k}</div>
                <div className="text-[11px] uppercase tracking-wide text-text-muted">
                  {x.l}
                  {x.note && (
                    <sup
                      className="ml-0.5 cursor-help text-vae-turquoise"
                      title={footnotes[x.note]}
                    >
                      {superscripts[x.note]}
                    </sup>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="relative text-xs text-text-secondary leading-relaxed max-w-4xl">Unsere Services kombinieren <span className="text-text-light dark:text-white">architektonische Klarheit</span>, <span className="text-text-light dark:text-white">schnelle operative Umsetzbarkeit</span> und <span className="text-text-light dark:text-white">Enablement</span>. So entsteht nachhaltige interne Kompetenz statt externer Black Box. Fokus auf <strong className="text-text-light dark:text-white font-semibold">Open Source KI, Retrieval Qualität, Workflow Robustheit</strong> und <strong className="text-text-light dark:text-white font-semibold">Compliance früh</strong>. Ergebnis: verkürzte Iterationen, geringeres Risiko, nachweisbarer ROI.</p>
          <div className="mt-8 p-4 rounded-md bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10">
            <h4 className="text-[11px] uppercase tracking-wide text-text-light dark:text-white mb-2">Quellen</h4>
            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-text-muted">
              {Object.entries(footnotes).map(([k, v]) => (
                <li key={k}>
                  <span className="text-vae-turquoise">{superscripts[k]}</span> {v}
                </li>
              ))}
              <li>Quelle: Synthese Branch Reports + interne Benchmarks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
