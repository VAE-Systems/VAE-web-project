import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '../ui/ServiceCard';
import { servicesData, lifecycleBlocks } from '../../content/services';

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
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-4">
            Unsere Services kombinieren architekturische Klarheit, schnelle operative Umsetzbarkeit und Enablement. So entsteht nachhaltige interne Kompetenz statt externer Black Box. Fokus auf Open Source KI, Retrieval Qualität, Workflow Robustheit und Compliance früh. Ergebnis: verkürzte Iterationen, geringeres Risiko, nachweisbarer ROI.
          </p>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Von erster Einordnung bis souveränem Betrieb: <span className="text-text-light font-medium">Schulungen & Workshops</span> für interne Kompetenz, <span className="text-text-light font-medium">Beratung</span> für Richtung & Governance sowie modulare <span className="text-text-light">Custom Solutions</span> für messbare Prozess‑ & Wissensautomatisierung. <span className="text-vae-turquoise">Open Source. Auditierbar. Austauschbar.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20" ref={cardsRef}>
          {servicesData.map((s) => (
            <ServiceCard
              key={s.key}
              service={s}
              servicePath={servicePath}
              superscripts={superscripts}
            />
          ))}
        </div>

        {/* Lifecycle / Value Blocks */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {lifecycleBlocks.map(b => (
            <div key={b.title} className="p-8 rounded-2xl bg-vae-turquoise/5 border border-vae-turquoise/20 transition-all duration-300 hover:bg-vae-turquoise/10 hover:border-vae-turquoise/30 hover:shadow-lg">
              <h3 className="text-lg font-bold text-text-light mb-4 leading-tight">{b.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{b.description}</p>
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
                  {x.note && <sup className="text-vae-turquoise/60 text-[10px] ml-1">{superscripts[x.note]}</sup>}
                </div>
              </div>
            ))}
          </div>
          <div className="relative text-sm text-text-secondary leading-relaxed max-w-4xl">
            Unsere Services kombinieren <span className="text-text-light dark:text-white">architektonische Klarheit</span>, <span className="text-text-light dark:text-white">schnelle operative Umsetzbarkeit</span> und <span className="text-text-light dark:text-white">Enablement</span>. So entsteht nachhaltige interne Kompetenz statt externer Black Box. Fokus auf <strong className="text-text-light dark:text-white font-semibold">Open Source KI, Retrieval Qualität, Workflow Robustheit</strong> und <strong className="text-text-light dark:text-white font-semibold">Compliance früh</strong>. Ergebnis: verkürzte Iterationen, geringeres Risiko, nachweisbarer ROI.
          </div>
        </div>

        {/* Footnotes */}
        <div className="mt-8 text-xs text-text-muted space-y-2">
          {Object.entries(footnotes).map(([key, text]) => (
            <div key={key} className="flex items-start gap-2">
              <sup className="text-vae-turquoise/60 text-xs mt-[-1px]">{superscripts[key]}</sup>
              <span className="leading-relaxed">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
