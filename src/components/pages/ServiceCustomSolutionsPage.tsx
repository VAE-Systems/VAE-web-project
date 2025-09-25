import React, { useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'
import { productCategories } from '../navigation/productCategories'
import SpotlightCard from '../ui/SpotlightCard'
import type { FAQCategory } from '../sections/FAQSection'

const FAQSection = React.lazy(() => import('../sections/FAQSection'))

const ServiceCustomSolutionsPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Custom Solutions | VAE Systems – Individuelle Umsetzung"
        description="Individuelle Software & Integrationen: API-Connectoren, Spezial-Workflows, domain-spezifische Retrieval Layer – präzise auf Ihren Use Case."
        canonicalPath="/services/custom-solutions"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Custom Software & Integration',
            description:
              'Maßgeschneiderte Implementierung individueller Software / Integrations-Bausteine inkl. Monitoring & Optimierung.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Custom Solution Lifecycle',
            description: 'Discovery bis Optimierung',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Discovery',
                text: 'Engpass & Metriken präzisieren (Pain / Outcome / Constraints).',
              },
              { '@type': 'HowToStep', name: 'Blueprint', text: 'Architektur, Reuse-Pfade, Risiko- & KPI-Mapping.' },
              {
                '@type': 'HowToStep',
                name: 'Build',
                text: 'Iterative Umsetzung mit Qualitätssicherung & Observability Hooks.',
              },
              { '@type': 'HowToStep', name: 'Monitor', text: 'Dashboards, Alerting, Cost / Latenz Tracking.' },
              { '@type': 'HowToStep', name: 'Optimize', text: 'Kontinuierliche Tuning-Zyklen & Erweiterbarkeit.' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Woran erkenne ich, ob Reuse statt Neubau sinnvoll ist?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Wir prüfen zu Beginn Matching gegen bestehende Komplettlösungen / Module. Wenn >70% Funktionsdeckung erreichbar ist, empfehlen wir Adaptieren statt Voll-Neubau mit Aufwandsabschätzung.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wie wird Erfolg messbar gemacht?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Gemeinsam definieren wir primäre KPIs (z.B. Durchlaufzeit, Qualitäts-Score, Kosten / Aufruf) plus Guardrails. Diese werden früh instrumentiert und in Dashboard / Alerts sichtbar.',
                },
              },
              {
                '@type': 'Question',
                name: 'Was bekomme ich zum Handover?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Runbooks, Architektur-Übersicht, Observability Queries, Security & Scaling Hinweise sowie optionale Schulung des internen Teams.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wie wird Vendor Lock-in vermieden?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bewusste Auswahl offener Standards, modulare Schnittstellen, Dokumentation & Ownership Transfer. Keine proprietären Blackbox-Abhängigkeiten.',
                },
              },
            ],
          },
        ]}
      />
      <section className="relative -mt-20 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker pb-24 pt-44">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(0,255,165,0.08),transparent_60%)]" />
        <div className="container-vae -mt-24 mb-6 max-w-5xl">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Custom Solutions', path: '/services/custom-solutions' },
            ]}
            className="relative z-[2] py-4 text-xs"
          />
        </div>
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-8">
            <span className="block text-text-light">Custom Solutions</span>
            <span className="block text-vae-turquoise">Präzise Umsetzung.</span>
          </h1>
          <p className="mb-6 max-w-3xl text-xl leading-relaxed text-text-secondary">
            Wir bauen spezifische Software & Integrationsbausteine für Ihren konkreten Engpass. Fokus: tragfähige
            Architektur, Messbarkeit & späterer Eigenbetrieb ohne Lock‑in.
          </p>
          <p className="mb-10 max-w-3xl text-sm leading-relaxed text-text-muted">
            Vielleicht existiert Ihr Bedarf aber bereits als{' '}
            <span className="font-medium text-white">Komplettlösung</span> (End‑to‑End Paket) in unserer Produkt-Suite.
            Unser Vorgehen: <span className="text-white">1. Engpass präzisieren</span> →{' '}
            <span className="text-white">2. Suite-Reuse prüfen</span> →{' '}
            <span className="text-white">3. Adaptieren oder gezielt neu entwickeln</span>. So vermeiden Sie unnötige
            Neubaustapel.
          </p>
          <div className="mb-16 grid items-stretch gap-8 md:grid-cols-3">
            {[
              {
                h: 'Integrationen',
                b: ['API-Connectoren', 'Webhook Orchestrierung', 'Legacy Brücken', 'Event Normalisierung'],
              },
              {
                h: 'Automatisierung',
                b: [
                  'Workflow Implementierung',
                  'Human-in-the-loop Pfade',
                  'Kosten / Latenz Budgets',
                  'Fallback / Degradation',
                ],
              },
              {
                h: 'Retrieval & Data',
                b: ['Domain Embeddings', 'Index Strategie', 'Sicherheits-Scoping', 'Evaluation Hooks'],
              },
            ].map(c => (
              <div key={c.h} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-sm font-semibold text-white">{c.h}</h3>
                <ul className="list-inside list-disc space-y-1 text-xs leading-relaxed text-text-secondary">
                  {c.b.map(x => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-14 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-vae-turquoise">
              Engpass → Blueprint → Build
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              Kurzer Discovery Sprint zur Eingrenzung. Danach modulare Umsetzung mit klaren Metriken (Qualität, Latenz,
              Betrieb). Handover inkl. Runbooks & Observability Dashboards.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              Ergebnis: Kein „Proof of Concept Friedhof“, sondern betreibbarer Wertschöpfungsbaustein.
            </p>
            <div className="mt-4 rounded-xl border border-vae-turquoise/30 bg-vae-turquoise/10 p-4">
              <p className="text-xs leading-relaxed text-text-secondary">
                <span className="font-medium text-white">Hinweis:</span> Prüfen wir während Discovery, dass Ihr
                Anwendungsfall durch eine vorhandene{' '}
                <Link to="/products/solutions" className="text-vae-turquoise underline hover:text-white">
                  Komplettlösung
                </Link>{' '}
                effizienter abbildbar ist, erhalten Sie eine klare Empfehlung & Aufwandseinschätzung für Adaption statt
                Neu‑Implementierung.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Projekt anfragen
            </Link>
            <Link to="/products/solutions" className="btn-secondary">
              Komplettlösungen ansehen
            </Link>
            <Link to="/services" className="btn-ghost">
              Zurück zur Übersicht
            </Link>
          </div>

          {/* Prozess / Lifecycle Spotlight Cards */}
          <LifecycleSpotlight />

          {/* KPI & Monitoring */}
          <div className="mb-24">
            <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">Messbarkeit & Optimierung</h2>
            <div className="mb-10 grid items-stretch gap-6 md:grid-cols-3">
              {[
                { h: 'Kern-KPIs', p: ['Qualitäts-Score', 'Durchlaufzeit / Latenz', 'Kosten / Aufruf'] },
                { h: 'Guardrails', p: ['Fehlerraten', 'Token / Ressourcen Budget', 'Security / Zugriff'] },
                { h: 'Observability', p: ['Dashboards', 'Alerting Schwellen', 'Drilldown Queries'] },
              ].map(b => (
                <div key={b.h} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-3 text-sm font-semibold text-white">{b.h}</h3>
                  <ul className="list-inside list-disc space-y-1 text-xs leading-relaxed text-text-secondary">
                    {b.p.map(x => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise/10 via-white/5 to-transparent p-8">
              <h3 className="mb-3 text-sm font-semibold text-white">Warum dieser Fokus?</h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                Viele „Proof of Concepts" scheitern beim Übergang in den Betrieb, weil Metriken fehlen oder Kosten
                kippen. Wir instrumentieren früh: Jede kritische Pipeline-Phase liefert Signale (Qualität, Kosten,
                Latenz). So werden Optimierung & Budgetkontrolle strukturiert statt ad-hoc.
              </p>
            </div>
          </div>

          {/* FAQ (Reusable Section) */}
          <div className="mt-10">
            <Suspense fallback={<div className="py-24 text-center text-sm text-text-muted">Lade FAQ…</div>}>
              <CustomSolutionsFAQ />
            </Suspense>
          </div>

          {/* Cross-Suite Navigation */}
          <div className="mt-32 space-y-10">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Verwandte Produkt-Suite</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
              Unsere Produktlandschaft kombiniert fertige <span className="text-white">Komplettlösungen</span>, modulare{' '}
              <span className="text-white">Applikationen & Lizenzen</span>, die Plattform{' '}
              <span className="text-white">VAE CORE</span> sowie <span className="text-white">Showcases</span> als
              Referenzen. Custom Build wird dort eingesetzt, wo spezifische Differenzierung oder Integrationstiefe nötig
              ist.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {productCategories.map(cat => {
                const to =
                  cat.key === 'solutions'
                    ? '/products/solutions'
                    : cat.key === 'tools'
                      ? '/products/tools'
                      : cat.key === 'core'
                        ? '/products/vae-core'
                        : cat.key === 'built'
                          ? '/products/showcases'
                          : '/products'
                return (
                  <SpotlightCard
                    key={cat.key}
                    title={cat.title}
                    description={cat.description}
                    to={to}
                    cta={cat.cta}
                    className="p-0"
                    iconSlot={
                      <div className="inline-flex items-center rounded-md border border-vae-turquoise/30 bg-vae-turquoise/10 px-2 py-1 text-[10px] font-semibold text-vae-turquoise">
                        {cat.badge || 'Suite'}
                      </div>
                    }
                  >
                    <ul className="list-inside list-disc">
                      {cat.points.slice(0, 3).map(p => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </SpotlightCard>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceCustomSolutionsPage

// Spotlight Lifecycle component (modular, could be extracted later)
const lifecycleSteps = [
  { key: 'discovery', title: 'Discovery', desc: 'Engpass schärfen, KPIs & Constraints definieren, Reuse analysieren.' },
  {
    key: 'blueprint',
    title: 'Blueprint',
    desc: 'Architektur & Schnittstellen, Risiko & KPI-Mapping, Iterations-Plan.',
  },
  { key: 'build', title: 'Build', desc: 'Iterative Umsetzung mit Tests, Evaluierung & Observability Hooks.' },
  { key: 'monitor', title: 'Monitor', desc: 'Dashboards, Alerts, Kosten / Latenz Tracking, Qualitätsmetriken.' },
  { key: 'optimize', title: 'Optimize', desc: 'Kontinuierliches Tuning & Erweiterbarkeit entlang Roadmap.' },
]

const LifecycleSpotlight: React.FC = () => {
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
    <div className="mb-20 mt-24" aria-labelledby="lifecycle-heading">
      <h2 id="lifecycle-heading" className="mb-10 text-2xl font-semibold text-white md:text-3xl">
        Lifecycle & Verantwortlichkeiten
      </h2>
      <div className="relative">
        {/* Connector removed per design feedback – flow now implied by numbering & layout */}
        {/* Cards: mobile horizontal scroll-snap, desktop grid */}
        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 relative z-10 -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:pb-0">
          {lifecycleSteps.map((s, i) => (
            <div
              key={s.key}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(prev => (prev === i ? null : prev))}
              onMouseMove={handleMove}
              className={`group relative flex min-w-[78%] snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 will-change-transform sm:min-w-[55%] md:min-w-0 ${active === i ? 'border-vae-turquoise/50 shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_14px_48px_-10px_rgba(var(--vae-turquoise-rgb),0.45)]' : 'hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_10px_40px_-8px_rgba(var(--vae-turquoise-rgb),0.4)]'}`}
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
              <h3 className="relative z-10 mb-2 text-sm font-semibold leading-snug text-white">{s.title}</h3>
              <p className="relative z-10 flex-grow text-[11px] leading-relaxed text-text-secondary">{s.desc}</p>
              <div className="relative z-10 mt-4 border-t border-white/10 pt-3 text-[10px] text-text-muted">
                {s.key === 'discovery' && 'Gemeinsam (Workshops, Scoping)'}
                {s.key === 'blueprint' && 'Gemeinsam – technische Federführung'}
                {s.key === 'build' && 'VAE Implementierung + transparente Artefakte'}
                {s.key === 'monitor' && 'Geteilt – Dashboards & Alerts'}
                {s.key === 'optimize' && 'Gemeinsame Roadmap / Iterationen'}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-text-muted">
          Alle Artefakte übertragbar: Architektur, Evaluierung, Observability Queries, Runbooks. Ziel: Kein
          Abhängigkeits-Lock, sondern eigenständig betreibbare Bausteine.
        </p>
      </div>
    </div>
  )
}

// Custom Solutions specific FAQ wrapper using unified FAQSection styles
const customFaqCategories: FAQCategory[] = [
  {
    category: 'Strategie & Scope',
    questions: [
      {
        question: 'Reuse vs. Neubau – wie entscheiden wir?',
        answer:
          'Funktions-Matrix gegen bestehende Komplettlösungen / Module. >70% Abdeckung + keine kritische Differenzierung → Adaptieren statt Voll-Neubau, inkl. Aufwandsschätzung.',
      },
      {
        question: 'Wie lange dauert Discovery?',
        answer:
          'Typisch 3–5 Werktage: Engpass präzisieren, Scope abgrenzen, KPI & Risiko Mapping, Reuse-Pfade, grober Umsetzungsplan.',
      },
      {
        question: 'Welche Artefakte liefert der Blueprint?',
        answer:
          'Architekturdiagramm, Sequenzen, Komponenten-Schnittstellen, KPI/Guardrail Definitionen, Backlog, Risiko & Mitigation, Reuse Analyse.',
      },
    ],
  },
  {
    category: 'Umsetzung & Betrieb',
    questions: [
      {
        question: 'Kann unser Team später selbst erweitern?',
        answer:
          'Ja. Modularer Code, klare Ordner- & Interface-Struktur, Dokumentation, Runbooks & Handover Sessions sichern schnelles Onboarding.',
      },
      {
        question: 'Wie adressiert ihr Kosten & Latenz?',
        answer:
          'Budgets (z.B. p95 Latenz, Kosten / Transaktion) werden früh definiert, Telemetrie & Alerts instrumentiert, Optimierung zyklisch.',
      },
      {
        question: 'Observability Umfang?',
        answer:
          'Dashboards (Qualität, Kosten, Latenz), strukturierte Logs, Trace / Metrik-Instrumentierung, Evaluierungs-Hooks für kontinuierliche Qualität.',
      },
    ],
  },
  {
    category: 'Governance & Qualität',
    questions: [
      {
        question: 'Vendor Lock-in Vermeidung?',
        answer:
          'Offene Standards, austauschbare Komponenten, bewusst keine proprietären Black-Box Abhängigkeiten, vollständige Übergabe.',
      },
      {
        question: 'Sicherheit & Compliance?',
        answer:
          'Rollen & Zugriffsklassen, Audit Logs, Data Residency Optionen (On-Prem / souveräne Cloud), frühe AI-Act / DSGVO Vororientierung.',
      },
      {
        question: 'Qualitätssicherung?',
        answer:
          'Versionierte Evaluations-Sets, Regression Checks, Guardrails, Code & Architektur Reviews entlang der Iterationen.',
      },
    ],
  },
]

const CustomSolutionsFAQ: React.FC = () => (
  <FAQSection
    id="custom-faq"
    title="FAQ zu Custom Solutions"
    subtitle="Konzentration auf Reuse, eindeutige Metriken & betreibbare Architektur."
    categories={customFaqCategories}
    cta={false}
    className="py-24"
  />
)
