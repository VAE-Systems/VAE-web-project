import React, { useEffect, useRef } from 'react'
import CtaLink from '@/components/ui/CtaLink'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import SpotlightCard from '../ui/SpotlightCard'
import MaterialIcon from '../ui/MaterialIcon'
import ServicesHeroSection from '../sections/ServicesHeroSection'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'
import {
  servicesLifecycle,
  lifecycleBenefits,
  servicesCategories,
  comparisonMatrix,
  finalCta
} from '../../content/services'
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
/**
 * ServicesPage Component
 * 
 * Complete Services page with all sections according to the new concept
 */
const ServicesPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        if (heroRef.current) gsap.set(heroRef.current.children, { opacity: 1, y: 0 })
        return
      }
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.children,
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
  title="Services | VAE Systems – Schulungen, Beratung, Individuelle Lösungen"
  description="Schulungen & Workshops, strategische Beratung & individuelle KI-/Automationslösungen. Von Analyse bis Umsetzung – souverän & nachvollziehbar."
        canonicalPath="/services"
        jsonLd={[{ '@context':'https://schema.org','@type':'CollectionPage', name:'VAE Services' }]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Services', path: '/services' }
        ]}
      />
      <ServicesHeroSection innerRef={heroRef} />
      {/* Storytelling */}
      <section className="py-28 bg-bg-primary dark:bg-bg-darker border-b border-border-primary dark:border-white/5">
        <div className="container-vae max-w-5xl">
          <div className="max-w-3xl mb-16">
            <h2 className="h2 heading-gradient h-space">{servicesLifecycle.title}</h2>
            <p className="text-text-secondary leading-relaxed mb-5 text-lg">{servicesLifecycle.description1}</p>
            <p className="text-text-secondary leading-relaxed mb-5 text-sm">{servicesLifecycle.description2}</p>
            <p className="text-text-secondary leading-relaxed text-sm">{servicesLifecycle.platformLink} <Link to="/products" className="text-vae-turquoise hover:underline">Products</Link>.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {lifecycleBenefits.map(benefit => (
              <div key={benefit.title} className="p-6 rounded-2xl bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10">
                <h3 className="text-sm font-semibold text-text-light dark:text-white mb-3">{benefit.title}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">
                  {benefit.benefits.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategorie Grid */}
      <section id="categories" className="py-28 bg-bg-secondary dark:bg-bg-dark border-b border-border-primary dark:border-white/5">
        <div className="container-vae max-w-7xl">
          <div className="grid md:grid-cols-3 gap-10">
            {servicesCategories.map(cat => (
              <SpotlightCard
                key={cat.key}
                title={cat.title}
                description={cat.focus}
                to={cat.to}
                cta="Mehr Details"
                iconSlot={<div className="w-14 h-14 rounded-xl bg-vae-turquoise/15 text-vae-turquoise flex items-center justify-center"><MaterialIcon icon={cat.icon} className="text-2xl" /></div>}
              >
                <ul className="list-disc list-inside">
                  {cat.examples.map(example => <li key={example}>{example}</li>)}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Vergleich / Differenzierung Matrix */}
      <section className="py-28 bg-bg-secondary dark:bg-bg-dark border-b border-border-primary dark:border-white/5" id="vergleich">
        <div className="container-vae max-w-6xl">
          <header className="max-w-3xl mb-14">
            <h2 className="h2 heading-gradient h-space">{comparisonMatrix.title}</h2>
            <p className="text-text-secondary leading-relaxed text-lg">{comparisonMatrix.subtitle}</p>
          </header>
          <div className="overflow-x-auto -mx-2 px-2">
            <div className="min-w-[860px] grid grid-cols-[160px_repeat(3,1fr)] rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/3 dark:bg-white/[0.03] relative">
              {/* Column Headers */}
              <div className="p-3 text-[11px] uppercase tracking-wide text-text-muted/70 border-b border-border-primary dark:border-white/10">Kriterium</div>
              {['Schulungen & Workshops','Beratung','Custom Solutions'].map(h => (
                <div key={h} className="p-3 text-[11px] font-semibold uppercase tracking-wide text-text-light dark:text-white border-b border-border-primary dark:border-white/10 bg-gradient-to-b from-bg-primary/10 dark:from-white/10 to-transparent backdrop-blur-sm">
                  {h}
                </div>
              ))}
              {comparisonMatrix.criteria.map((r, i, arr) => (
                <React.Fragment key={r.key}>
                  <div className={`p-4 text-[11px] font-medium text-text-muted/70 border-t border-border-primary dark:border-white/5 ${i===arr.length-1 ? 'rounded-bl-2xl' : ''}`}>{r.label}</div>
                  {[r.trainings, r.consulting, r.custom].map((val,ci) => (
                    <div className={`p-4 text-xs leading-relaxed text-text-secondary border-t border-border-primary dark:border-white/5 relative group ${i===arr.length-1 && ci===2 ? 'rounded-br-2xl' : ''}`} aria-label={`${r.label} für ${['Schulungen & Workshops','Beratung','Custom Solutions'][ci]}: ${val}`}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none bg-[radial-gradient(380px_circle_at_30%_30%,rgba(var(--vae-turquoise-rgb),0.12),transparent_70%)]" />
                    <span className="relative z-10">{val}</span>
                  </div>
                  ))}
                </React.Fragment>
              ))}
              {/* Vertical Separators: exakt an den Grid-Spalten */}
              <div className="pointer-events-none absolute top-[40px] bottom-0 left-[160px] w-px bg-border-primary/20 dark:bg-white/5" />
              <div className="pointer-events-none absolute top-[40px] bottom-0 left-[calc(160px+((100%-160px)/3))] w-px bg-border-primary/20 dark:bg-white/5" />
              <div className="pointer-events-none absolute top-[40px] bottom-0 left-[calc(160px+2*((100%-160px)/3))] w-px bg-border-primary/20 dark:bg-white/5" />
            </div>
          </div>
          <div className="mt-8 text-[11px] text-text-muted max-w-4xl space-y-2">
            <p>{comparisonMatrix.footnote}</p>
            <p className="text-text-secondary/70">{comparisonMatrix.sequenceNote}</p>
          </div>
                </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-bg-dark">
        <div className="container-vae max-w-4xl text-center">
          <h2 className="h2 h-space text-text-light">{finalCta.title}</h2>
          <p className="text-lg text-text-secondary mb-10">{finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {finalCta.buttons.map(btn => (
              btn.primary ? (
                <Link key={btn.text} to={btn.to || "/contact"} className={`btn-primary px-8 py-4`}>{btn.text}</Link>
              ) : (
                <a key={btn.text} href={btn.href || "#"} className="btn-secondary px-8 py-4" target="_blank" rel="noopener noreferrer" aria-label={`${btn.text}`}>{btn.text}</a>
              )
            ))}
          </div>
          {/* Added consulting direct mail CTAs */}
          <div className="grid md:grid-cols-2 gap-4 text-left mb-8" aria-label="Direkte Beratungs-Anfragen">
            <CtaLink
              ctaId="consulting.initial_call"
              ctx={{ fromPage: 'services', intent: 'initial-call' }}
              className="btn-secondary justify-start"
            >
              <span className="material-symbols-outlined mr-2">call</span>
              Erstgespräch (15–20 Min) buchen
            </CtaLink>
            <CtaLink
              ctaId="consulting.two_days_workshop"
              ctx={{ fromPage: 'services', intent: 'workshop' }}
              className="btn-secondary justify-start"
            >
              <span className="material-symbols-outlined mr-2">event_available</span>
              2 Tage Intensiv‑Workshop anfragen
            </CtaLink>
            <CtaLink
              ctaId="consulting.deep_dive_architecture"
              ctx={{ fromPage: 'services', intent: 'deep-dive' }}
              className="btn-outline justify-start"
            >
              <span className="material-symbols-outlined mr-2">architecture</span>
              Deep‑Dive Architektur & Governance
            </CtaLink>
            <CtaLink
              ctaId="consulting.monthly_support"
              ctx={{ fromPage: 'services', intent: 'monthly-support' }}
              className="btn-outline justify-start"
            >
              <span className="material-symbols-outlined mr-2">support_agent</span>
              Monatliche Begleitung anfragen
            </CtaLink>
          </div>
          <p className="mt-6 text-xs text-text-muted">{finalCta.disclaimer}</p>
        </div>
      </section>

      {/* FAQ Section (Services Fokus) */}
      <React.Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
        <FAQSection
          id="services-faq"
          className="bg-gradient-to-b from-bg-darker to-bg-dark/90 border-t border-border-primary dark:border-white/5"
          title="Services – Häufige Fragen"
          subtitle="Klarheit zu Umfang, Ablauf und Betrieb." 
          categories={[
            { category: 'Ablauf', questions: [
              { question: 'Wie startet ein Services-Projekt?', answer: 'Kurz-Workshop (Ziel, Restriktionen, vorhandene Systeme), dann definierter Explorations- / Architektur-Sprint mit klaren Artefakten.' },
              { question: 'Fixed Scope oder agil?', answer: 'Hybrid: definierte Kernziele + priorisierte Backlog-Optionen. Jede Iteration liefert überprüfbaren Mehrwert.' },
              { question: 'Remote oder vor Ort?', answer: 'Primär remote, kritische Architektur- oder Enablement-Sessions optional vor Ort.' }
            ]},
            { category: 'Leistungstiefe', questions: [
              { question: 'Nur Beratung möglich?', answer: 'Ja. Reine Architektur-/Governance Begleitung ohne Implementierung ist möglich – aber Integration & Enablement erhöhen Nachhaltigkeit.' },
              { question: 'Hand Over Strategie?', answer: 'Früh dokumentierte Artefakte, Playbooks, Trainings. Ziel: internes Team kann Betrieb / Erweiterung souverän übernehmen.' },
              { question: 'Toolchain Vorgaben?', answer: 'Wir adaptieren existierende Tooling-Landschaften sofern sie Transparenz & Reproduzierbarkeit erlauben.' }
            ]},
              { category: 'Betrieb', questions: [
              { question: 'Nach Projekt Support?', answer: 'On-Demand Sprints, SLA für kritische Pfade oder Transfer-Begleitung bis definierter Reifegrad erreicht.' },
              { question: 'Kostenkontrolle?', answer: 'Offene Kostentreiber identifiziert (Inference, Index, Orchestrierung). Metriken & Budget-Alerts optional integrierbar.' },
              { question: 'Sicherheitsmodell?', answer: 'Rollen / Zugriff + Audit Logging + Evaluationspfade werden nicht nachträglich ergänzt, sondern konzeptionell vorgezogen.' }
            ]}
          ]}
        />
      </React.Suspense>
    </div>
  )
}

export default ServicesPage
