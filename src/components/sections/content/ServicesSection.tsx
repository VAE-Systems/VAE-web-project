/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  SERVICES SECTION                                                         ┃
 * ┃  Umfassende Service-Darstellung mit Lifecycle, Comparison, Categories.    ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── servicesData          → Detaillierte Service-Beschreibungen
 * ├── servicesCategories    → Kategorisierte Gruppierung
 * ├── consultingServices    → Beratungs-Angebote
 * ├── lifecycleBlocks       → Projekt-Phasen
 * └── comparisonMatrix      → SaaS vs. Self-Hosted Vergleich
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Skip GSAP animations
 *
 * 🔁 SIDE-EFFECTS
 * └── GSAP ScrollTrigger    → Header + Cards entrance animations
 *
 * 🗺️ MAPPING
 * ├── servicePath{}         → ID → URL mapping
 * └── serviceIdMap{}        → Alias-Auflösung
 */

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import Icon from '@/components/ui/Icon'
import {
  comparisonMatrix,
  consultingServices,
  lifecycleBlocks,
  servicesCategories,
  servicesData,
  servicesLifecycle,
} from '@/content/services'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import React, { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'

// ── 🎛️ CORE — Route Mappings ──
const servicePath: Record<string, string> = {
  consulting: '/services',
  infrastructure: '/infrastruktur',
  automation: '/ki-optimierung',
  support: '/betreuung',
  'infrastructure-setup': '/infrastruktur',
  'ai-optimization': '/ki-optimierung',
  'longterm-support': '/betreuung',
}

const serviceIdMap: Record<string, string> = {
  infrastructure: 'infrastructure-setup',
  automation: 'ai-optimization',
  support: 'longterm-support',
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — ServicesSection
// ═══════════════════════════════════════════════════════════════════════════
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
    '3': 'Red Hat: Enterprise Open Source Report (2024)',
    '4': 'VAE Systems Projektsprints (Median pro Iteration)',
  }

  // ── 🔁 SIDE-EFFECT — GSAP ScrollTrigger Animations ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // ⛓️ GATE — Accessibility Check
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

  const consultingById = useMemo(() => {
    const map = new Map<string, (typeof consultingServices)[number]>()
    consultingServices.forEach(detail => map.set(detail.id, detail))
    return map
  }, [])

  const serviceItems = servicesData.map(service => {
    const detail = consultingById.get(serviceIdMap[service.key] ?? service.key)
    const deliverables = detail ? Array.from(new Set(detail.features)) : []

    let phaseBadge = ''
    let timelineText = detail?.timeline ?? ''
    if (detail?.timeline) {
      const parts = detail.timeline.split('·').map(part => part.trim())
      if (parts.length > 1) {
        phaseBadge = parts.shift() ?? ''
        timelineText = parts.join(' · ')
      }
    }

    const serviceTypeLabel = detail?.type === 'coordination' ? 'Betreuung' : 'Consulting'

    return {
      ...service,
      deliverables,
      phaseBadge,
      timeline: timelineText,
      investment: detail?.investment ?? '',
      ctaLabel: detail?.cta ?? service.cta,
      path: servicePath[service.key] || '/services',
      serviceTypeLabel,
    }
  })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-vae-turquoise/10 bg-[#faf8f4] py-24 dark:bg-[#030806] md:py-36"
    >
      {/* Background Effects */}

      <div className="container-vae relative">
        {/* Section Header */}
        <div className="mb-16 text-center" ref={headerRef}>
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-vae-turquoise">Drei Leistungen</p>
          <h2 className="mt-4 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-gray-900 dark:text-white md:text-5xl">
            Wir bauen. Wir optimieren. Wir betreiben.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-white/70 sm:text-lg">
            Drei klare Leistungen — aufeinander aufbauend. Strategie zuerst, dann Setup, dann Betrieb. Kein Chaos, kein
            Vendor-Lock-in.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-20 grid gap-8 lg:grid-cols-3" ref={cardsRef}>
          {serviceItems.map(service => (
            <article
              key={service.key}
              className="group relative flex h-full flex-col overflow-hidden border border-gray-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 dark:border-white/10 dark:bg-white/5"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-vae-turquoise/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-vae-turquoise/12 flex h-14 w-14 items-center justify-center rounded-none text-vae-turquoise">
                    <Icon name={service.iconName} className="text-vae-turquoise" size={20} />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-flex items-center border border-vae-turquoise/30 bg-vae-turquoise/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.35em] text-vae-turquoise">
                      {service.badge}
                    </span>
                    {service.phaseBadge && (
                      <span className="inline-flex items-center border border-vae-turquoise/20 bg-vae-turquoise/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.32em] text-vae-turquoise/80">
                        {service.phaseBadge}
                      </span>
                    )}
                  </div>
                </div>
                <span className="border border-vae-turquoise/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-vae-turquoise/80">
                  {service.serviceTypeLabel}
                </span>
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="mb-3 text-lg font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">{service.description}</p>

                <div className="mb-6 grid grid-cols-2 gap-4">
                  {service.stats.map((stat, idx) => (
                    <div
                      key={`${service.key}-stat-${idx}`}
                      className="border border-vae-turquoise/15 bg-vae-turquoise/5 px-3 py-3 text-center"
                    >
                      <div className="mb-1 text-lg font-black text-vae-turquoise">{stat.value}</div>
                      <div className="text-[11px] leading-tight text-text-muted">
                        {stat.desc}
                        {stat.note && (
                          <sup className="ml-1 text-[10px] text-vae-turquoise/60">{superscripts[stat.note]}</sup>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="mb-2 text-xs font-medium uppercase tracking-[0.32em] text-text-light dark:text-white">
                    Im Fokus
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map(feature => (
                      <span
                        key={feature}
                        className="bg-vae-turquoise/8 border border-vae-turquoise/20 px-2 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-vae-turquoise"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {service.deliverables.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-3 text-xs font-medium uppercase tracking-[0.32em] text-text-light dark:text-white">
                      Lieferumfang
                    </div>
                    <ul className="space-y-2">
                      {service.deliverables.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                          <span className="mt-0.5 flex-shrink-0 text-vae-turquoise" aria-hidden="true">
                            ▸
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative z-10 mt-auto space-y-4">
                {(service.timeline || service.investment) && (
                  <div className="grid gap-3 rounded-none border border-vae-turquoise/20 bg-vae-turquoise/10 p-4 text-sm text-text-secondary">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/90">
                        Timeline
                      </span>
                      <span className="text-right text-sm text-text-secondary">{service.timeline || 'laufend'}</span>
                    </div>
                    {service.investment && (
                      <div className="flex items-center justify-between gap-3 border-t border-vae-turquoise/20 pt-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise/90">
                          Invest
                        </span>
                        <span className="text-right text-2xl font-black text-vae-turquoise">{service.investment}</span>
                      </div>
                    )}
                  </div>
                )}

                <MagneticButton>
                  <Link
                    to={service.path}
                    className="btn-convert w-full gap-2"
                    aria-label={`${service.title} – Details ansehen`}
                    data-pulse={service.key === 'infrastructure'}
                  >
                    {service.ctaLabel}
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
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>

        {/* Service Journey */}
        <div className="mb-24 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="border border-vae-turquoise/20 bg-white p-8 dark:border-white/10 dark:bg-white/5">
            <div className="mb-6">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-vae-turquoise">Service Journey</p>
              <h3 className="mt-3 text-xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                Von Setup bis Betriebssicherheit
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{servicesLifecycle.description1}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{servicesLifecycle.description2}</p>
            </div>

            <ol className="relative mt-8 space-y-7">
              {lifecycleBlocks.map((stage, index) => (
                <li key={stage.title} className="group relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-9 w-9 items-center justify-center bg-vae-turquoise/15 text-sm font-black text-vae-turquoise">
                      {index + 1}
                    </span>
                    {index < lifecycleBlocks.length - 1 && (
                      <span className="mt-3 h-full w-px bg-gradient-to-b from-vae-turquoise/40 via-vae-turquoise/15 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 border border-transparent bg-white/70 p-5 transition-colors duration-300 group-hover:border-vae-turquoise/40 dark:bg-white/[0.06]">
                    <h4 className="mb-1 text-sm font-black uppercase tracking-[-0.02em] text-gray-900 dark:text-white">
                      {stage.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-text-secondary">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col justify-between gap-6 border border-vae-turquoise/20 bg-[#f4f1ec] p-8 dark:border-vae-turquoise/30 dark:bg-white/5">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-vae-turquoise">Priorisierung</p>
              <h3 className="mt-3 text-xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-gray-900 dark:text-white">
                {servicesLifecycle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{servicesLifecycle.description1}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{servicesLifecycle.description2}</p>
            </div>
            <div className="border border-vae-turquoise/25 bg-vae-turquoise/10 p-5 text-sm text-text-secondary dark:border-vae-turquoise/30 dark:bg-vae-turquoise/5">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-vae-turquoise/90">
                Empfohlene Reihenfolge
              </p>
              <p className="mt-2 leading-relaxed">{comparisonMatrix.sequenceNote}</p>
            </div>
          </div>
        </div>

        {/* Capability Modules */}
        <div className="mb-24 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicesCategories.map(category => (
            <div
              key={category.key}
              className="group relative overflow-hidden border border-vae-turquoise/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-white/5"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-vae-turquoise/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="bg-vae-turquoise/12 flex h-14 w-14 items-center justify-center rounded-none text-vae-turquoise">
                  <Icon name={category.icon} size={20} />
                </div>
                <Link
                  to={category.to}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-vae-turquoise underline-offset-4 transition-colors hover:text-vae-turquoise/80"
                >
                  Modul
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="relative z-10 mt-5">
                <h4 className="mb-2 text-base font-black uppercase leading-[0.92] tracking-[-0.03em] text-gray-900 dark:text-white">
                  {category.title}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">{category.focus}</p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {category.examples.map(example => (
                    <li key={example} className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0 text-vae-turquoise" aria-hidden="true">
                        ▸
                      </span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* KPI / Studien Panel */}
        <div className="to-vae-turquoise/2 relative overflow-hidden rounded-none border-2 border-vae-turquoise/20 bg-gradient-to-br from-vae-turquoise/5 p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(var(--vae-turquoise-rgb),0.12),transparent_60%)] opacity-40" />
          <div className="relative mb-10 grid gap-8 md:grid-cols-4">
            {[
              { k: '< 6 Wochen', l: 'Proof → produktiver Wert' },
              { k: '> 60%', l: 'Prozess-Effizienzsteigerung (Automation)', note: '5' },
              { k: '4–6x', l: 'Schnellere Architektur-Entscheidungen', note: '2' },
              { k: '65%', l: 'Reduzierte Vendor-/Lizenzkosten', note: '1' },
            ].map(x => (
              <div key={x.l} className="text-center md:text-left">
                <div className="mb-1 text-5xl font-black text-vae-turquoise">{x.k}</div>
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
              Self-Hosted KI, Open-Source-Modelle, Retrieval Qualität
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
