import React, { useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'
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
          { '@context':'https://schema.org','@type':'Service','name':'Custom Software & Integration', 'description':'Maßgeschneiderte Implementierung individueller Software / Integrations-Bausteine inkl. Monitoring & Optimierung.' },
          { '@context':'https://schema.org','@type':'HowTo','name':'Custom Solution Lifecycle','description':'Discovery bis Optimierung','step':[
            { '@type':'HowToStep','name':'Discovery','text':'Engpass & Metriken präzisieren (Pain / Outcome / Constraints).'},
            { '@type':'HowToStep','name':'Blueprint','text':'Architektur, Reuse-Pfade, Risiko- & KPI-Mapping.'},
            { '@type':'HowToStep','name':'Build','text':'Iterative Umsetzung mit Qualitätssicherung & Observability Hooks.'},
            { '@type':'HowToStep','name':'Monitor','text':'Dashboards, Alerting, Cost / Latenz Tracking.'},
            { '@type':'HowToStep','name':'Optimize','text':'Kontinuierliche Tuning-Zyklen & Erweiterbarkeit.'}
          ]},
          { '@context':'https://schema.org','@type':'FAQPage','mainEntity':[
            { '@type':'Question','name':'Woran erkenne ich, ob Reuse statt Neubau sinnvoll ist?','acceptedAnswer':{'@type':'Answer','text':'Wir prüfen zu Beginn Matching gegen bestehende Komplettlösungen / Module. Wenn >70% Funktionsdeckung erreichbar ist, empfehlen wir Adaptieren statt Voll-Neubau mit Aufwandsabschätzung.'}},
            { '@type':'Question','name':'Wie wird Erfolg messbar gemacht?','acceptedAnswer':{'@type':'Answer','text':'Gemeinsam definieren wir primäre KPIs (z.B. Durchlaufzeit, Qualitäts-Score, Kosten / Aufruf) plus Guardrails. Diese werden früh instrumentiert und in Dashboard / Alerts sichtbar.'}},
            { '@type':'Question','name':'Was bekomme ich zum Handover?','acceptedAnswer':{'@type':'Answer','text':'Runbooks, Architektur-Übersicht, Observability Queries, Security & Scaling Hinweise sowie optionale Schulung des internen Teams.'}},
            { '@type':'Question','name':'Wie wird Vendor Lock-in vermieden?','acceptedAnswer':{'@type':'Answer','text':'Bewusste Auswahl offener Standards, modulare Schnittstellen, Dokumentation & Ownership Transfer. Keine proprietären Blackbox-Abhängigkeiten.'}}
          ]}
        ]}
      />
      <section className="relative -mt-20 pt-44 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-8">
            <span className="block text-text-light">Custom Solutions</span>
            <span className="block text-gradient">Präzise Umsetzung.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-6">Wir bauen spezifische Software & Integrationsbausteine für Ihren konkreten Engpass. Fokus: tragfähige Architektur, Messbarkeit & späterer Eigenbetrieb ohne Lock‑in.</p>
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl mb-10">Vielleicht existiert Ihr Bedarf aber bereits als <span className="text-white font-medium">Komplettlösung</span> (End‑to‑End Paket) in unserer Produkt-Suite. Unser Vorgehen: <span className="text-white">1. Engpass präzisieren</span> → <span className="text-white">2. Suite-Reuse prüfen</span> → <span className="text-white">3. Adaptieren oder gezielt neu entwickeln</span>. So vermeiden Sie unnötige Neubaustapel.</p>
          <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
            {[{h:'Integrationen',b:['API-Connectoren','Webhook Orchestrierung','Legacy Brücken','Event Normalisierung']},{h:'Automatisierung',b:['Workflow Implementierung','Human-in-the-loop Pfade','Kosten / Latenz Budgets','Fallback / Degradation']},{h:'Retrieval & Data',b:['Domain Embeddings','Index Strategie','Sicherheits-Scoping','Evaluation Hooks']}].map(c => (
              <div key={c.h} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">{c.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">{c.b.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-14">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Engpass → Blueprint → Build</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Kurzer Discovery Sprint zur Eingrenzung. Danach modulare Umsetzung mit klaren Metriken (Qualität, Latenz, Betrieb). Handover inkl. Runbooks & Observability Dashboards.</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Ergebnis: Kein „Proof of Concept Friedhof“, sondern betreibbarer Wertschöpfungsbaustein.</p>
            <div className="mt-4 p-4 rounded-xl bg-vae-turquoise/10 border border-vae-turquoise/30">
              <p className="text-xs text-text-secondary leading-relaxed"><span className="text-white font-medium">Hinweis:</span> Prüfen wir während Discovery, dass Ihr Anwendungsfall durch eine vorhandene <Link to="/products/solutions" className="underline text-vae-turquoise hover:text-white">Komplettlösung</Link> effizienter abbildbar ist, erhalten Sie eine klare Empfehlung & Aufwandseinschätzung für Adaption statt Neu‑Implementierung.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Projekt anfragen</Link>
            <Link to="/products/solutions" className="btn-secondary">Komplettlösungen ansehen</Link>
            <Link to="/services" className="btn-ghost">Zurück zur Übersicht</Link>
          </div>

          {/* Prozess / Lifecycle Spotlight Cards */}
          <LifecycleSpotlight />

          {/* KPI & Monitoring */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Messbarkeit & Optimierung</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-10 items-stretch">
              {[{h:'Kern-KPIs',p:['Qualitäts-Score','Durchlaufzeit / Latenz','Kosten / Aufruf']},{h:'Guardrails',p:['Fehlerraten','Token / Ressourcen Budget','Security / Zugriff']},{h:'Observability',p:['Dashboards','Alerting Schwellen','Drilldown Queries']}].map(b => (
                <div key={b.h} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-3">{b.h}</h3>
                  <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">{b.p.map(x=> <li key={x}>{x}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-vae-turquoise/10 via-white/5 to-transparent border border-vae-turquoise/30 p-8">
              <h3 className="text-sm font-semibold text-white mb-3">Warum dieser Fokus?</h3>
              <p className="text-xs text-text-secondary leading-relaxed">Viele „Proof of Concepts" scheitern beim Übergang in den Betrieb, weil Metriken fehlen oder Kosten kippen. Wir instrumentieren früh: Jede kritische Pipeline-Phase liefert Signale (Qualität, Kosten, Latenz). So werden Optimierung & Budgetkontrolle strukturiert statt ad-hoc.</p>
            </div>
          </div>

          {/* FAQ (Reusable Section) */}
          <div className="mt-10">
            <Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
              <CustomSolutionsFAQ />
            </Suspense>
          </div>

          {/* Cross-Suite Navigation */}
          <div className="mt-32 space-y-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Verwandte Produkt-Suite</h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">Unsere Produktlandschaft kombiniert fertige <span className="text-white">Komplettlösungen</span>, modulare <span className="text-white">Applikationen & Lizenzen</span>, die Plattform <span className="text-white">VAE CORE</span> sowie <span className="text-white">Showcases</span> als Referenzen. Custom Build wird dort eingesetzt, wo spezifische Differenzierung oder Integrationstiefe nötig ist.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productCategories.map(cat => {
                const to = cat.key === 'solutions' ? '/products/solutions' :
                  cat.key === 'tools' ? '/products/tools' :
                  cat.key === 'core' ? '/products/vae-core' :
                  cat.key === 'built' ? '/products/showcases' : '/products'
                return (
                  <SpotlightCard
                    key={cat.key}
                    title={cat.title}
                    description={cat.description}
                    to={to}
                    cta={cat.cta}
                    className="p-0"
                    iconSlot={<div className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-semibold inline-flex items-center border border-vae-turquoise/30">{cat.badge || 'Suite'}</div>}
                  >
                    <ul className="list-disc list-inside">
                      {cat.points.slice(0,3).map(p => <li key={p}>{p}</li>)}
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
  { key:'discovery', title:'Discovery', desc:'Engpass schärfen, KPIs & Constraints definieren, Reuse analysieren.' },
  { key:'blueprint', title:'Blueprint', desc:'Architektur & Schnittstellen, Risiko & KPI-Mapping, Iterations-Plan.' },
  { key:'build', title:'Build', desc:'Iterative Umsetzung mit Tests, Evaluierung & Observability Hooks.' },
  { key:'monitor', title:'Monitor', desc:'Dashboards, Alerts, Kosten / Latenz Tracking, Qualitätsmetriken.' },
  { key:'optimize', title:'Optimize', desc:'Kontinuierliches Tuning & Erweiterbarkeit entlang Roadmap.' }
]

const LifecycleSpotlight: React.FC = () => {
  const [active, setActive] = useState<number | null>(null)

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', x + 'px')
    el.style.setProperty('--my', y + 'px')
  }

  return (
    <div className="mt-24 mb-20" aria-labelledby="lifecycle-heading">
      <h2 id="lifecycle-heading" className="text-2xl md:text-3xl font-semibold text-white mb-10">Lifecycle & Verantwortlichkeiten</h2>
      <div className="relative">
  {/* Connector removed per design feedback – flow now implied by numbering & layout */}
        {/* Cards: mobile horizontal scroll-snap, desktop grid */}
        <div className="relative z-10 flex md:grid md:grid-cols-5 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-1 -mx-1 pb-4 md:pb-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {lifecycleSteps.map((s,i) => (
            <div
              key={s.key}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(prev => prev===i ? null : prev)}
              onMouseMove={handleMove}
              className={`relative group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col overflow-hidden transition-all duration-500 will-change-transform snap-start min-w-[78%] sm:min-w-[55%] md:min-w-0 ${active===i ? 'border-vae-turquoise/50 shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_14px_48px_-10px_rgba(var(--vae-turquoise-rgb),0.45)]' : 'hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_10px_40px_-8px_rgba(var(--vae-turquoise-rgb),0.4)]'}`}
              style={{ ['--mx' as any]:'30%', ['--my' as any]:'25%' }}
              tabIndex={0}
            >
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(600px_circle_at_var(--mx)_var(--my),rgba(var(--vae-turquoise-rgb),0.22),transparent_70%)]" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-semibold tracking-wider">{String(i+1).padStart(2,'0')}</span>
                <span className="text-[11px] text-vae-turquoise/70 font-medium uppercase tracking-wide">Phase</span>
              </div>
              <div aria-hidden="true" className="w-full h-px bg-gradient-to-r from-transparent via-vae-turquoise/40 to-transparent mb-4 relative z-10" />
              <h3 className="text-sm font-semibold text-white mb-2 relative z-10 leading-snug">{s.title}</h3>
              <p className="text-[11px] text-text-secondary leading-relaxed relative z-10 flex-grow">{s.desc}</p>
              <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-text-muted relative z-10">
                {s.key === 'discovery' && 'Gemeinsam (Workshops, Scoping)'}
                {s.key === 'blueprint' && 'Gemeinsam – technische Federführung'}
                {s.key === 'build' && 'VAE Implementierung + transparente Artefakte'}
                {s.key === 'monitor' && 'Geteilt – Dashboards & Alerts'}
                {s.key === 'optimize' && 'Gemeinsame Roadmap / Iterationen'}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-text-muted max-w-3xl leading-relaxed">Alle Artefakte übertragbar: Architektur, Evaluierung, Observability Queries, Runbooks. Ziel: Kein Abhängigkeits-Lock, sondern eigenständig betreibbare Bausteine.</p>
      </div>
    </div>
  )
}

// Custom Solutions specific FAQ wrapper using unified FAQSection styles
const customFaqCategories: FAQCategory[] = [
  {
    category: 'Strategie & Scope',
    questions: [
      { question: 'Reuse vs. Neubau – wie entscheiden wir?', answer: 'Funktions-Matrix gegen bestehende Komplettlösungen / Module. >70% Abdeckung + keine kritische Differenzierung → Adaptieren statt Voll-Neubau, inkl. Aufwandsschätzung.' },
      { question: 'Wie lange dauert Discovery?', answer: 'Typisch 3–5 Werktage: Engpass präzisieren, Scope abgrenzen, KPI & Risiko Mapping, Reuse-Pfade, grober Umsetzungsplan.' },
      { question: 'Welche Artefakte liefert der Blueprint?', answer: 'Architekturdiagramm, Sequenzen, Komponenten-Schnittstellen, KPI/Guardrail Definitionen, Backlog, Risiko & Mitigation, Reuse Analyse.' }
    ]
  },
  {
    category: 'Umsetzung & Betrieb',
    questions: [
      { question: 'Kann unser Team später selbst erweitern?', answer: 'Ja. Modularer Code, klare Ordner- & Interface-Struktur, Dokumentation, Runbooks & Handover Sessions sichern schnelles Onboarding.' },
      { question: 'Wie adressiert ihr Kosten & Latenz?', answer: 'Budgets (z.B. p95 Latenz, Kosten / Transaktion) werden früh definiert, Telemetrie & Alerts instrumentiert, Optimierung zyklisch.' },
      { question: 'Observability Umfang?', answer: 'Dashboards (Qualität, Kosten, Latenz), strukturierte Logs, Trace / Metrik-Instrumentierung, Evaluierungs-Hooks für kontinuierliche Qualität.' }
    ]
  },
  {
    category: 'Governance & Qualität',
    questions: [
      { question: 'Vendor Lock-in Vermeidung?', answer: 'Offene Standards, austauschbare Komponenten, bewusst keine proprietären Black-Box Abhängigkeiten, vollständige Übergabe.' },
      { question: 'Sicherheit & Compliance?', answer: 'Rollen & Zugriffsklassen, Audit Logs, Data Residency Optionen (On-Prem / souveräne Cloud), frühe AI-Act / DSGVO Vororientierung.' },
      { question: 'Qualitätssicherung?', answer: 'Versionierte Evaluations-Sets, Regression Checks, Guardrails, Code & Architektur Reviews entlang der Iterationen.' }
    ]
  }
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
