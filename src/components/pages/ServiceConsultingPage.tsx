import React, { Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'
import { TermHint } from '../ui/Glossary'
import SpotlightCard from '../ui/SpotlightCard'
import type { FAQCategory } from '../sections/FAQSection'
import Card from '../ui/Card'

// Lazy sections
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
const GlossarySection = React.lazy(() => import('../ui/GlossarySection'))

const ServiceConsultingPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Beratung | Strategie, Governance & Architektur"
        description="Strategische KI- & Automationsberatung: Roadmaps, EU AI Act Orientierung, TCO/ROI & Architektur – faktenbasiert statt Hype."
        canonicalPath="/services/consulting"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'VAE Systems Beratung',
            description: 'Strategische KI & Automationsberatung: Roadmaps, Governance, Kosten & Risiko.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Beratungsprozess',
            description: 'Discover → Assess → Blueprint → Decision',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Discover',
                text: 'Ziele, Constraints, Stakeholder & Ist-Landschaft erfassen.',
              },
              {
                '@type': 'HowToStep',
                name: 'Assess',
                text: 'Risiken & Potenziale bewerten, Optionen und Reifegrad analysieren.',
              },
              {
                '@type': 'HowToStep',
                name: 'Blueprint',
                text: 'Architektur- & Governance-Entwurf, KPI / TCO Modellierung.',
              },
              {
                '@type': 'HowToStep',
                name: 'Decision',
                text: 'Entscheidungsvorlage: Roadmap, Priorisierung, nächste Schritte.',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Wie unabhängig sind Ihre Empfehlungen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Wir sind vendor-neutral: Open Source / lokale Optionen werden priorisiert, proprietäre Dienste nur bei eindeutiger Vorteilslage mit Dokumentation der Trade-offs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wann erhalten wir die Unterlagen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Erste Quick Findings < 5 Werktage, vollständige Blaupause je nach Umfang typischerweise innerhalb 2 Wochen nach Workshops.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wie werden Fachbereiche eingebunden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Structured Interviews & Use-Case Canvas Sessions – Ergebnisse fließen in Roadmap Priorisierung & Risikoabschätzung.',
                },
              },
              {
                '@type': 'Question',
                name: 'Übernehmen Sie auch Umsetzung?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Die Umsetzung erfolgt über unsere Custom Solutions. Beratung liefert Entscheidungsgrundlagen und Governance, kein Implementierungscode.',
                },
              },
            ],
          },
        ]}
      />
      <section className="border-border-primary relative -mt-20 border-b bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker pb-28 pt-44 dark:border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(0,255,165,0.08),transparent_60%)]" />
        <div className="container-vae -mt-24 mb-10 max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Beratung', path: '/services/consulting' },
            ]}
            className="relative z-[2] py-4 text-xs"
          />
        </div>
        <div className="container-vae max-w-6xl">
          {/* Hero */}
          <h1 className="h1 h-space-lg">
            <span className="block text-text-light">Beratung</span>
            <span className="block text-vae-turquoise">Strategie. Governance. Architektur.</span>
          </h1>
          <p className="mb-6 max-w-4xl text-xl leading-relaxed text-text-secondary">
            Entscheiden mit Klarheit: <TermHint term="Roadmap" />, <TermHint term="TCO" /> & Compliance –
            technologie‑agnostisch, dokumentiert, open‑first. Keine Buzzword-Decks, sondern belastbare
            Entscheidungsgrundlagen.
          </p>
          <p className="mb-12 max-w-3xl text-sm leading-relaxed text-text-muted">
            Abgrenzung: <span className="font-medium text-text-light dark:text-white">Schulungen & Workshops</span>{' '}
            bauen interne Kompetenz auf. <span className="font-medium text-text-light dark:text-white">Beratung</span>{' '}
            liefert Richtung & Governance.{' '}
            <span className="font-medium text-text-light dark:text-white">Custom Solutions</span> setzt produktiv um.
          </p>

          {/* Nutzen / Value Bullets */}
          <div className="mb-20 grid gap-6 md:grid-cols-5">
            {[
              {
                h: 'Architektur & Roadmap',
                p: 'Zielbild, Migrationspfade, modulare Optionen (Open Source bevorzugt).',
              },
              { h: 'Regulatorik', p: 'EU AI Act & DSGVO Orientierung – risikobasierte Einordnung.' },
              { h: 'TCO / ROI', p: 'Kosten- & Nutzenmodelle (p95 Latenz / Kosten Budgets).' },
              { h: 'Integrationen', p: 'ERP / CRM / DB / Legacy Anbindung & Datenflüsse.' },
              { h: 'Security & Ops', p: 'Zugriffe, Auditability, Observability, Betriebspfad.' },
            ].map(v => (
              <div
                key={v.h}
                className="bg-bg-primary/5 border-border-primary rounded-2xl border p-5 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="mb-2 text-sm font-semibold text-text-light dark:text-white">{v.h}</h3>
                <p className="text-xs leading-relaxed text-text-secondary">{v.p}</p>
              </div>
            ))}
          </div>

          {/* Formate & Preise */}
          <div className="mb-24">
            <h2 className="h3 h-space text-text-light dark:text-white">Formate & Preise</h2>
            <div className="grid items-stretch gap-8 md:grid-cols-3">
              {[
                {
                  k: 'Kickstart',
                  d: '½ Tag Remote',
                  price: '1 100 €',
                  desc: 'Schnellcheck: Reifegrad, Priorisierung, nächste 2–3 Schritte.',
                },
                {
                  k: 'Intensiv-Workshop',
                  d: '2 Tage Vor Ort',
                  price: '3 800 €',
                  desc: 'Deep-Dive: Architektur & Governance, Entscheidungsvorlage.',
                },
                {
                  k: 'Monatliche Begleitung',
                  d: 'laufend',
                  price: 'ab 5 000 €',
                  desc: 'Review-Zyklen, Vendor-Auswahl, Architektur & KPI Monitoring.',
                },
              ].map(f => (
                <Card
                  key={f.k}
                  title={undefined}
                  lead={f.k}
                  badge={f.d}
                  body={f.desc}
                  link="/contact"
                  cta="Beratung anfragen"
                  accent
                >
                  <div className="mb-6 text-xl font-bold text-vae-turquoise dark:text-vae-turquoise">{f.price}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Prozess & Deliverables */}
          <div className="mb-24">
            <h2 className="h3 h-space mb-6 text-text-light dark:text-white">Prozess & Deliverables</h2>
            <ConsultingProcessSpotlight />
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-vae-turquoise">Deliverables</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  {[
                    'Roadmap PDF (Priorisierung)',
                    'Architektur-Skizze / Sequenzen',
                    'Risiko & KPI Tabelle',
                    'TCO / Kostenmodell',
                    'Governance / Compliance Leitfaden',
                    'Optionale Shadowing-Notizen',
                  ].map(d => (
                    <li key={d} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 text-vae-turquoise">
                        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg-primary/5 border-border-primary rounded-2xl border p-6 dark:border-white/10 dark:bg-white/5">
                <h3 className="mb-3 text-sm font-semibold text-text-light dark:text-white">Kontext & Übergang</h3>
                <p className="mb-3 text-xs leading-relaxed text-text-secondary">
                  Beratung liefert belastbare Entscheidungsgrundlagen. Umsetzung & produktive Integrationen erfolgen
                  anschließend in{' '}
                  <Link
                    to="/services/custom-solutions"
                    className="text-vae-turquoise underline hover:text-text-light dark:hover:text-white"
                  >
                    Custom Solutions
                  </Link>
                  ; Kompetenzaufbau parallel über{' '}
                  <Link
                    to="/services/trainings"
                    className="text-vae-turquoise underline hover:text-text-light dark:hover:text-white"
                  >
                    Schulungen & Workshops
                  </Link>
                  .
                </p>
                <p className="text-xs leading-relaxed text-text-secondary">
                  Offene Standards & vollständige Dokumentation ermöglichen späteren Eigenbetrieb –{' '}
                  <span className="text-text-light dark:text-white">kein Lock‑in</span>.
                </p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mb-24 flex flex-col flex-wrap gap-4 sm:flex-row">
            <CtaLink
              ctaId="contact.schedule_call"
              ctx={{ fromPage: 'services-consulting', intent: 'initial-call' }}
              className="btn-primary"
            >
              Erstgespräch buchen
            </CtaLink>
            <Link to="#consulting-faq" className="btn-secondary">
              FAQ
            </Link>
            <Link to="/services/trainings" className="btn-outline">
              Schulungen & Workshops
            </Link>
            <Link to="/services/custom-solutions" className="btn-outline">
              Custom Solutions
            </Link>
          </div>

          {/* FAQ */}
          <Suspense fallback={<div className="py-24 text-center text-sm text-text-muted">Lade FAQ…</div>}>
            <ConsultingFAQ />
          </Suspense>
          <Suspense fallback={<div className="py-24 text-center text-sm text-text-muted">Lade Glossar…</div>}>
            <GlossarySection className="border-border-primary mt-10 border-t dark:border-white/5" limit={6} />
          </Suspense>

          {/* Crosslinks */}
          <div className="mt-24 grid gap-8 md:grid-cols-3">
            <SpotlightCard
              title="Schulungen & Workshops – Kompetenz aufbauen"
              description="Team befähigen & Grundlagen schaffen bevor tiefere Architekturentscheidungen anstehen."
              to="/services/trainings"
              cta="Schulungen ansehen"
            />
            <SpotlightCard
              title="Custom Solutions – Umsetzung"
              description="Produktive Integrationen & Automationen implementieren – dokumentiert & übergebbar."
              to="/services/custom-solutions"
              cta="Projekt anfragen"
            />
            <SpotlightCard
              title="Products – Suite & VAE CORE"
              description="Fertige Module & Plattform als Beschleuniger oder Alternative zum gezielten Neubau."
              to="/products/solutions"
              cta="Suite ansehen"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceConsultingPage

// FAQ component (consulting-specific using unified FAQSection style)
const consultingFaqCategories: FAQCategory[] = [
  {
    category: 'Allgemein',
    questions: [
      {
        question: 'Wie unabhängig sind Ihre Empfehlungen?',
        answer:
          'Vendor-neutral. Open Source & lokale Alternativen werden priorisiert. Proprietäre Dienste nur mit dokumentierter Nutzen-/Risikoabwägung.',
      },
      {
        question: 'Lieferzeit der Entscheidungsunterlagen?',
        answer:
          'Quick Findings innerhalb weniger Tage, vollständige Entscheidungs- & Architekturpakete nach Workshops typischerweise < 2 Wochen.',
      },
    ],
  },
  {
    category: 'Vorgehen',
    questions: [
      {
        question: 'Wie binden Sie Fachbereiche ein?',
        answer:
          'Structured Interviews, Use-Case Canvas, priorisierte Backlog-Sammlung. Ergebnisse fließen in Roadmap & KPI Matrix.',
      },
      {
        question: 'Wird Code erstellt?',
        answer: 'Nein. Beratung ist bewusst umsetzungsfrei – Implementierung via Custom Solutions.',
      },
    ],
  },
  {
    category: 'Governance & Output',
    questions: [
      {
        question: 'Welche Artefakte erhalten wir?',
        answer:
          'Roadmap, Architektur-Skizzen, Risiko & KPI Tabelle, TCO Modell, Compliance / Governance Leitfaden, optionale Shadowing-Notizen.',
      },
      {
        question: 'Wie wird Lock-in verhindert?',
        answer: 'Offene Standards, austauschbare Komponentenempfehlungen, klare Entscheidungstabellen & Dokumentation.',
      },
    ],
  },
]

const ConsultingFAQ: React.FC = () => (
  <FAQSection
    id="consulting-faq"
    title="FAQ zu Beratung"
    subtitle="Transparenz zu Vorgehen, Neutralität & Output."
    categories={consultingFaqCategories}
    cta={false}
    className="py-24"
    dense
  />
)

// Spotlight Prozess (analog Lifecycle aus Custom Solutions)
const consultingSteps = [
  { key: 'discover', title: 'Discover', desc: 'Ziele, Stakeholder, Risiken, Ist-Landschaft.' },
  { key: 'assess', title: 'Assess', desc: 'Optionen, Reifegrad, Risiko / Potenzial Modell.' },
  { key: 'blueprint', title: 'Blueprint', desc: 'Architektur & Governance, KPI/TCO Modell.' },
  { key: 'decision', title: 'Decision', desc: 'Roadmap + Priorisierung & nächste Schritte.' },
]

const ConsultingProcessSpotlight: React.FC = () => {
  const [active, setActive] = useState<number | null>(null)

  const handleMove: React.MouseEventHandler<HTMLDivElement> = e => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', x + 'px')
    el.style.setProperty('--my', y + 'px')
  }

  return (
    <div className="mb-14" aria-labelledby="consulting-process-heading">
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 relative -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-2">
        {consultingSteps.map((s, i) => (
          <div
            key={s.key}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(prev => (prev === i ? null : prev))}
            onMouseMove={handleMove}
            className={`border-border-primary bg-bg-primary/[0.04] group relative flex min-w-[78%] snap-start flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 will-change-transform dark:border-white/10 dark:bg-white/[0.04] sm:min-w-[55%] md:min-w-0 ${active === i ? 'border-vae-turquoise/50 shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_14px_48px_-10px_rgba(var(--vae-turquoise-rgb),0.45)]' : 'hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_10px_40px_-8px_rgba(var(--vae-turquoise-rgb),0.4)]'}`}
            style={{ ['--mx' as any]: '30%', ['--my' as any]: '25%' }}
            tabIndex={0}
          >
            <div className="pointer-events-none absolute -inset-px bg-[radial-gradient(600px_circle_at_var(--mx)_var(--my),rgba(var(--vae-turquoise-rgb),0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" />
            <div className="relative z-10 mb-4 flex items-center justify-between">
              <span className="rounded-md bg-vae-turquoise/10 px-2 py-1 text-[10px] font-semibold tracking-wider text-vae-turquoise">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-vae-turquoise/70">Phase</span>
            </div>
            <div
              aria-hidden="true"
              className="relative z-10 mb-4 h-px w-full bg-gradient-to-r from-transparent via-vae-turquoise/40 to-transparent"
            />
            <h3 className="relative z-10 mb-2 text-sm font-semibold leading-snug text-text-light dark:text-white">
              {s.title}
            </h3>
            <p className="relative z-10 flex-grow text-[11px] leading-relaxed text-text-secondary">{s.desc}</p>
            <div className="border-border-primary relative z-10 mt-4 border-t pt-3 text-[10px] text-text-muted dark:border-white/10">
              {s.key === 'discover' && 'Workshops & Interviews'}
              {s.key === 'assess' && 'Analyse & Bewertung'}
              {s.key === 'blueprint' && 'Architektur & Governance Artefakte'}
              {s.key === 'decision' && 'Entscheidungsvorlage & Roadmap'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
