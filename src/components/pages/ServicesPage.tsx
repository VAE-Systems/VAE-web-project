import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { useScrollScrub } from '@/hooks/useScrollScrub'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  comparisonMatrix,
  finalCta,
  lifecycleBenefits,
  servicesCategories,
  servicesLifecycle,
} from '../../content/services'
import Breadcrumbs from '../navigation/Breadcrumbs'
import ServicesHeroSection from '../sections/ServicesHeroSection'
import MagneticButton from '../ui/buttons/MagneticButton'
import Seo from '../ui/Seo'
import SpotlightCard from '../ui/SpotlightCard'
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
/**
 * ServicesPage Component
 *
 * Complete Services page with all sections according to the new concept
 */
const ServicesPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const storyHeaderRef = useRef<HTMLDivElement>(null)
  const { opacity, y } = useScrollScrub({ target: storyHeaderRef })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        if (heroRef.current) gsap.set(heroRef.current.children, { opacity: 1, y: 0 })
        return
      }
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out', force3D: true }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Services | Arbeitsinfrastruktur, AI-Optimierung & Betreuung"
        description="Wir richten Ihre Open-Source-Arbeitsinfrastruktur ein, optimieren Prozesse mit KI und betreuen Systeme langfristig. Transparente Kosten, dokumentierte Ergebnisse."
        canonicalPath="/services"
        jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'VAE Services' }]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Services', path: '/services' },
        ]}
      />
      <ServicesHeroSection innerRef={heroRef} />
      {/* Storytelling */}
      <section className="bg-bg-primary border-border-primary border-b py-28 dark:border-white/5 dark:bg-bg-darker">
        <div className="container-vae max-w-5xl">
          <motion.div ref={storyHeaderRef} style={{ opacity, y }} className="mb-16 max-w-3xl">
            <h2 className="h2 fluid-h2 heading-gradient h-space">{servicesLifecycle.title}</h2>
            <p className="mb-5 text-lg leading-relaxed text-text-secondary">{servicesLifecycle.description1}</p>
            <p className="mb-5 text-sm leading-relaxed text-text-secondary">{servicesLifecycle.description2}</p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Weitere Details zur Plattform finden Sie auf der{' '}
              <Link to="/vae-core" className="text-vae-turquoise hover:underline">
                VAE CORE Seite
              </Link>
              .
            </p>
          </motion.div>
          <Reveal.Group stagger={0.08} className="grid gap-8 md:grid-cols-3">
            {lifecycleBenefits.map(benefit => (
              <Reveal
                key={benefit.title}
                preset="fadeUp"
                className="bg-bg-primary/5 border-border-primary rounded-2xl border p-6 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="mb-3 text-sm font-semibold text-text-light dark:text-white">{benefit.title}</h3>
                <ul className="list-inside list-disc space-y-1 text-xs leading-relaxed text-text-secondary">
                  {benefit.benefits.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </Reveal.Group>
        </div>
      </section>

      {/* Kategorie Grid */}
      <section
        id="categories"
        className="border-border-primary border-b bg-bg-secondary py-28 dark:border-white/5 dark:bg-bg-dark"
      >
        <div className="container-vae max-w-7xl">
          <Reveal.Group stagger={0.08} className="grid gap-10 md:grid-cols-3">
            {servicesCategories.map(cat => (
              <Reveal key={cat.key} preset="fadeUp">
                <SpotlightCard
                  title={cat.title}
                  description={cat.focus}
                  to={cat.to}
                  cta="Mehr Details"
                  iconSlot={
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-vae-turquoise/15 text-vae-turquoise">
                      <Icon name={cat.icon} size={24} />
                    </div>
                  }
                >
                  <ul className="list-inside list-disc">
                    {cat.examples.map(example => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </Reveal.Group>
        </div>
      </section>

      {/* Vergleich / Differenzierung Matrix */}
      <section
        className="border-border-primary border-b bg-bg-secondary py-28 dark:border-white/5 dark:bg-bg-dark"
        id="vergleich"
      >
        <div className="container-vae max-w-6xl">
          <header className="mb-14 max-w-3xl">
            <h2 className="h2 heading-gradient h-space">{comparisonMatrix.title}</h2>
            <p className="text-lg leading-relaxed text-text-secondary">{comparisonMatrix.subtitle}</p>
          </header>
          <div className="-mx-2 overflow-x-auto px-2">
            <div className="border-border-primary bg-bg-primary/3 relative grid min-w-[960px] grid-cols-[180px_repeat(4,1fr)] rounded-2xl border dark:border-white/10 dark:bg-white/[0.03]">
              {/* Column Headers */}
              <div className="border-border-primary border-b p-3 text-[11px] uppercase tracking-wide text-text-muted/70 dark:border-white/10">
                Kriterium
              </div>
              {comparisonMatrix.columns.map(col => (
                <div
                  key={col.key}
                  className="border-border-primary from-bg-primary/10 border-b bg-gradient-to-b to-transparent p-3 text-[11px] font-semibold uppercase tracking-wide text-text-light backdrop-blur-sm dark:border-white/10 dark:from-white/10 dark:text-white"
                >
                  {col.label}
                </div>
              ))}
              {comparisonMatrix.criteria.map((r, i, arr) => (
                <React.Fragment key={r.key}>
                  <div
                    className={`border-border-primary border-t p-4 text-[11px] font-medium text-text-muted/70 dark:border-white/5 ${i === arr.length - 1 ? 'rounded-bl-2xl' : ''}`}
                  >
                    {r.label}
                  </div>
                  {comparisonMatrix.columns.map((col, ci) => {
                    const val = (r as Record<string, string>)[col.key] ?? '—'
                    const isLastCell = i === arr.length - 1 && ci === comparisonMatrix.columns.length - 1
                    return (
                      <div
                        key={col.key}
                        className={`border-border-primary group relative border-t p-4 text-xs leading-relaxed text-text-secondary dark:border-white/5 ${isLastCell ? 'rounded-br-2xl' : ''}`}
                        aria-label={`${r.label} für ${col.label}: ${val}`}
                      >
                        <div className="duration-400 pointer-events-none absolute inset-0 bg-[radial-gradient(380px_circle_at_30%_30%,rgba(var(--vae-turquoise-rgb),0.12),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="relative z-10">{val}</span>
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
              {/* Vertical Separators: exakt an den Grid-Spalten */}
              <div className="bg-border-primary/20 pointer-events-none absolute bottom-0 left-[180px] top-[40px] w-px dark:bg-white/5" />
              <div className="bg-border-primary/20 pointer-events-none absolute bottom-0 left-[calc(180px+((100%-180px)/4))] top-[40px] w-px dark:bg-white/5" />
              <div className="bg-border-primary/20 pointer-events-none absolute bottom-0 left-[calc(180px+2*((100%-180px)/4))] top-[40px] w-px dark:bg-white/5" />
              <div className="bg-border-primary/20 pointer-events-none absolute bottom-0 left-[calc(180px+3*((100%-180px)/4))] top-[40px] w-px dark:bg-white/5" />
            </div>
          </div>
          <div className="mt-8 max-w-4xl space-y-2 text-[11px] text-text-muted">
            <p>{comparisonMatrix.footnote}</p>
            <p className="text-text-secondary/70">{comparisonMatrix.sequenceNote}</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-bg-dark py-24">
        <div className="container-vae max-w-4xl text-center">
          <h2 className="h2 h-space text-text-light">{finalCta.title}</h2>
          <p className="mb-10 text-lg text-text-secondary">{finalCta.subtitle}</p>
          <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row">
            {finalCta.buttons.map(btn => {
              const destination = btn.to ?? '#'
              const isExternal = /^https?:\/\//.test(destination) || destination.startsWith('mailto:')

              const buttonClass = btn.primary ? 'btn-primary px-8 py-4' : 'btn-secondary px-8 py-4'

              return (
                <MagneticButton key={btn.text} className="w-full sm:w-auto">
                  {isExternal ? (
                    <a
                      href={destination}
                      className={`${buttonClass} inline-flex w-full items-center justify-center text-center`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={btn.text}
                    >
                      {btn.text}
                    </a>
                  ) : (
                    <Link
                      to={destination}
                      className={`${buttonClass} inline-flex w-full items-center justify-center text-center`}
                      aria-label={btn.text}
                    >
                      {btn.text}
                    </Link>
                  )}
                </MagneticButton>
              )
            })}
          </div>
          {/* Added consulting direct mail CTAs */}
          <div className="mb-8 grid gap-4 text-left md:grid-cols-2" aria-label="Direkte Beratungs-Anfragen">
            <CtaLink
              ctaId="consulting.initial_call"
              ctx={{ fromPage: 'services', intent: 'initial-call' }}
              className="btn-secondary hover-lift press-bounce justify-start"
            >
              <Icon name="call" className="mr-2" />
              Erstgespräch (15–20 Min) buchen
            </CtaLink>
            <CtaLink
              ctaId="consulting.two_days_workshop"
              ctx={{ fromPage: 'services', intent: 'workshop' }}
              className="btn-secondary hover-lift press-bounce justify-start"
            >
              <Icon name="event_available" className="mr-2" />2 Tage Intensiv‑Workshop anfragen
            </CtaLink>
            <CtaLink
              ctaId="consulting.deep_dive_architecture"
              ctx={{ fromPage: 'services', intent: 'deep-dive' }}
              className="btn-outline hover-lift press-bounce justify-start"
            >
              <Icon name="architecture" className="mr-2" />
              Deep‑Dive Architektur & Governance
            </CtaLink>
            <CtaLink
              ctaId="consulting.monthly_support"
              ctx={{ fromPage: 'services', intent: 'monthly-support' }}
              className="btn-outline hover-lift press-bounce justify-start"
            >
              <Icon name="support_agent" className="mr-2" />
              Monatliche Begleitung anfragen
            </CtaLink>
          </div>
          <p className="mt-6 text-xs text-text-muted">{finalCta.disclaimer}</p>
        </div>
      </section>

      {/* FAQ Section (Services Fokus) */}
      <React.Suspense fallback={<div className="py-24 text-center text-sm text-text-muted">Lade FAQ…</div>}>
        <FAQSection
          id="services-faq"
          className="border-border-primary border-t bg-gradient-to-b from-bg-darker to-bg-dark/90 dark:border-white/5"
          title="Services – Häufige Fragen"
          subtitle="Klarheit zu Umfang, Ablauf und Betrieb."
          categories={[
            {
              category: 'Ablauf',
              questions: [
                {
                  question: 'Wie startet ein Services-Projekt?',
                  answer:
                    'Kurz-Workshop (Ziel, Restriktionen, vorhandene Systeme), dann definierter Explorations- / Architektur-Sprint mit klaren Artefakten.',
                },
                {
                  question: 'Fixed Scope oder agil?',
                  answer:
                    'Hybrid: definierte Kernziele + priorisierte Backlog-Optionen. Jede Iteration liefert überprüfbaren Mehrwert.',
                },
                {
                  question: 'Remote oder vor Ort?',
                  answer: 'Primär remote, kritische Architektur- oder Enablement-Sessions optional vor Ort.',
                },
              ],
            },
            {
              category: 'Leistungstiefe',
              questions: [
                {
                  question: 'Nur Beratung möglich?',
                  answer:
                    'Ja. Reine Architektur-/Governance Begleitung ohne Implementierung ist möglich – aber Integration & Enablement erhöhen Nachhaltigkeit.',
                },
                {
                  question: 'Hand Over Strategie?',
                  answer:
                    'Früh dokumentierte Artefakte, Playbooks, Trainings. Ziel: internes Team kann Betrieb / Erweiterung souverän übernehmen.',
                },
                {
                  question: 'Toolchain Vorgaben?',
                  answer:
                    'Wir adaptieren existierende Tooling-Landschaften sofern sie Transparenz & Reproduzierbarkeit erlauben.',
                },
              ],
            },
            {
              category: 'Betrieb',
              questions: [
                {
                  question: 'Nach Projekt Support?',
                  answer:
                    'On-Demand Sprints, SLA für kritische Pfade oder Transfer-Begleitung bis definierter Reifegrad erreicht.',
                },
                {
                  question: 'Kostenkontrolle?',
                  answer:
                    'Offene Kostentreiber identifiziert (Inference, Index, Orchestrierung). Metriken & Budget-Alerts optional integrierbar.',
                },
                {
                  question: 'Sicherheitsmodell?',
                  answer:
                    'Rollen / Zugriff + Audit Logging + Evaluationspfade werden nicht nachträglich ergänzt, sondern konzeptionell vorgezogen.',
                },
              ],
            },
          ]}
        />
      </React.Suspense>
    </div>
  )
}

export default ServicesPage
