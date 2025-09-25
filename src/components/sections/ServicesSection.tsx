import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { servicesData, lifecycleBlocks } from '../../content/services'
import Icon from '@/components/ui/Icon'

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const superscripts: Record<string, string> = {
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
  }

  const footnotes: Record<string, string> = {
    '1': 'McKinsey: Value Capture Open Source (2023)',
    '2': 'Forrester: Decision Velocity in Modular Architectures (2024)',
    '3': 'Red Hat: Enterprise Open Source Report (2024)',
    '4': 'Internal Case Aggregation (Median Implementierung)',
    '5': 'MIT Sloan / Automations Benchmark (2024)',
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
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        })
      }
      if (cardsRef.current) {
        Array.from(cardsRef.current.children).forEach(card => {
          gsap.from(card, {
            opacity: 0,
            y: 80,
            scale: 0.9,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: card as HTMLElement, start: 'top 85%' },
          })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Mapping paths for detail navigation
  const servicePath: Record<string, string> = {
    consulting: '/services/consulting',
    trainings: '/services/trainings',
    solutions: '/services/custom-solutions',
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="from-bg-primary to-bg-primary relative overflow-hidden border-t border-vae-turquoise/10 bg-gradient-to-br via-bg-secondary py-24 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker md:py-36"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(var(--vae-turquoise-rgb),0.08),transparent_55%)]" />
      </div>

      <div className="container-vae relative">
        {/* Section Header */}
        <div className="mb-16 text-center" ref={headerRef}>
          <h2 className="h2 heading-gradient mb-4">Services</h2>
          <p className="mx-auto mb-4 max-w-3xl text-xl leading-relaxed text-text-secondary">
            Unsere Services kombinieren architekturische Klarheit, schnelle operative Umsetzbarkeit und Enablement. So
            entsteht nachhaltige interne Kompetenz statt externer Black Box. Fokus auf Open Source KI, Retrieval
            Qualität, Workflow Robustheit und Compliance früh. Ergebnis: verkürzte Iterationen, geringeres Risiko,
            nachweisbarer ROI.
          </p>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary">
            Von erster Einordnung bis souveränem Betrieb:{' '}
            <span className="font-medium text-text-light">Schulungen & Workshops</span> für interne Kompetenz,{' '}
            <span className="font-medium text-text-light">Beratung</span> für Richtung & Governance sowie modulare{' '}
            <span className="text-text-light">Custom Solutions</span> für messbare Prozess‑ & Wissensautomatisierung.{' '}
            <span className="text-vae-turquoise">Open Source. Auditierbar. Austauschbar.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-20 grid gap-8 lg:grid-cols-3" ref={cardsRef}>
          {servicesData.map(s => (
            <div
              key={s.key}
              className="bg-bg-primary/5 border-border-primary group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_12px_44px_-10px_rgba(var(--vae-turquoise-rgb),0.4)] dark:border-white/10 dark:bg-white/5"
            >
              <div className="pointer-events-none absolute -inset-px bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/20 text-vae-turquoise">
                    <Icon name={s.iconName} className="text-vae-turquoise" size={20} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-vae-turquoise/80">
                    {s.title.split(' – ')[0]}
                  </span>
                </div>
                <span className="rounded-md bg-vae-turquoise/10 px-2 py-1 text-[10px] font-medium tracking-wide text-vae-turquoise">
                  {s.badge}
                </span>
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="mb-3 text-lg font-semibold leading-tight text-text-light dark:text-white">{s.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">{s.description}</p>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  {s.stats.map((st, idx) => (
                    <div key={idx} className="text-center">
                      <div className="mb-1 text-lg font-bold text-vae-turquoise">{st.value}</div>
                      <div className="text-[11px] leading-tight text-text-muted">
                        {st.desc}
                        {st.note && (
                          <sup className="ml-1 text-[10px] text-vae-turquoise/60">{superscripts[st.note]}</sup>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="mb-2 text-xs font-medium text-text-light dark:text-white">Schwerpunkte:</div>
                  <div className="flex flex-wrap gap-2">
                    {s.features.map(f => (
                      <span
                        key={f}
                        className="rounded-md bg-vae-turquoise/10 px-2 py-1 text-[10px] font-medium text-vae-turquoise"
                      >
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 18 18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </Link>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.10),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Lifecycle / Value Blocks */}
        <div className="mb-24 grid gap-10 md:grid-cols-3">
          {lifecycleBlocks.map(b => (
            <div key={b.title} className="rounded-2xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-6">
              <h3 className="mb-3 text-sm font-semibold text-text-light">{b.title}</h3>
              <p className="text-xs leading-relaxed text-text-secondary">{b.description}</p>
            </div>
          ))}
        </div>

        {/* KPI / Studien Panel */}
        <div className="to-vae-turquoise/2 relative overflow-hidden rounded-3xl border border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/5 p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)] opacity-40" />
          <div className="relative mb-10 grid gap-8 md:grid-cols-4">
            {[
              { k: '< 6 Wochen', l: 'Proof → produktiver Wert' },
              { k: '> 60%', l: 'Prozess-Effizienzsteigerung (Automation)', note: '5' },
              { k: '4–6x', l: 'Schnellere Architektur-Entscheidungen', note: '2' },
              { k: '65%', l: 'Reduzierte Vendor-/Lizenzkosten', note: '1' },
            ].map(x => (
              <div key={x.l} className="text-center md:text-left">
                <div className="mb-1 text-2xl font-bold text-vae-turquoise">{x.k}</div>
                <div className="text-[11px] uppercase tracking-wide text-text-muted">
                  {x.l}
                  {x.note && <sup className="ml-1 text-[10px] text-vae-turquoise/60">{superscripts[x.note]}</sup>}
                </div>
              </div>
            ))}
          </div>
          <div className="relative max-w-4xl text-xs leading-relaxed text-text-secondary">
            Unsere Services kombinieren{' '}
            <span className="text-text-light dark:text-white">architektonische Klarheit</span>,{' '}
            <span className="text-text-light dark:text-white">schnelle operative Umsetzbarkeit</span> und{' '}
            <span className="text-text-light dark:text-white">Enablement</span>. So entsteht nachhaltige interne
            Kompetenz statt externer Black Box. Fokus auf{' '}
            <strong className="font-semibold text-text-light dark:text-white">
              Open Source KI, Retrieval Qualität, Workflow Robustheit
            </strong>{' '}
            und <strong className="font-semibold text-text-light dark:text-white">Compliance früh</strong>. Ergebnis:
            verkürzte Iterationen, geringeres Risiko, nachweisbarer ROI.
          </div>
        </div>

        {/* Footnotes */}
        <div className="mt-8 space-y-1 text-[10px] text-text-muted">
          {Object.entries(footnotes).map(([key, text]) => (
            <div key={key} className="flex items-start gap-2">
              <sup className="mt-[-2px] text-[10px] text-vae-turquoise/60">{superscripts[key]}</sup>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
