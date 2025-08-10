import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'
import { TermHint } from '../ui/Glossary'
import SpotlightCard from '../ui/SpotlightCard'
import type { FAQCategory } from '../sections/FAQSection'

// Lazy loaded heavy sections
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
const GlossarySection = React.lazy(() => import('../ui/Glossary'))

const ServiceTrainingsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Schulungen & Workshops | KI Enablement & Governance"
        description="Drei fokussierte 1‑Tages Formate: Governance & AI Strategy, Prompt Patterns & Evaluation, Lokale KI-Infrastruktur mit VAE CORE. Praxistief + direkt anwendbare Artefakte."
        canonicalPath="/services/trainings"
        jsonLd={[
          { '@context':'https://schema.org','@type':'Course','name':'AI Governance & Strategy Workshop','description':'1 Tag – strategische Verankerung & regulatorische Orientierung.'},
          { '@context':'https://schema.org','@type':'Course','name':'Prompt Patterns & Evaluation Lab','description':'1 Tag – systematische Prompt-Muster & Messbarkeit von Output-Qualität.'},
          { '@context':'https://schema.org','@type':'Course','name':'Lokale KI-Infrastruktur & VAE CORE Operations','description':'1 Tag – Deployment & Betrieb offener KI-Stacks.'},
          { '@context':'https://schema.org','@type':'FAQPage','mainEntity': [
            { '@type':'Question','name':'Wie groß sind die Gruppen?','acceptedAnswer':{'@type':'Answer','text':'Offene Formate typischerweise 6–10 Teilnehmende. Inhouse nach Absprache.'}},
            { '@type':'Question','name':'Gibt es Unterlagen?','acceptedAnswer':{'@type':'Answer','text':'Ja: Cheat Sheets, Übungen, Lösungsbeispiele & empfohlene Tool-/Framework-Liste.'}},
            { '@type':'Question','name':'Können Trainings kombiniert werden?','acceptedAnswer':{'@type':'Answer','text':'Ja – oft Governance Tag + Prompt Patterns Tag als 2‑Tages Block.'}},
            { '@type':'Question','name':'Remote oder vor Ort?','acceptedAnswer':{'@type':'Answer','text':'Beides möglich. Interaktive Whiteboards & geteilte Lab-Umgebung für Remote.'}}
          ]}
        ]}
      />
  <section className="relative -mt-20 pt-44 pb-32 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 h-space-lg">
            <span className="block text-text-light">Schulungen & Workshops</span>
            <span className="block text-gradient">Kompetenz. In 1 Tag vertieft.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-6">Praxisorientierte, dichte Formate statt Frontal-Marathon. Ziel: interne Handlungsfähigkeit, Governance Verankerung & sicherer Betrieb.</p>
          <p className="text-sm text-text-muted max-w-3xl mb-12">Abgrenzung: <span className="text-white font-medium">Schulungen & Workshops</span> bauen Wissen & Routinen auf. <span className="text-white font-medium">Beratung</span> liefert Entscheidungsgrundlagen. <span className="text-white font-medium">Custom Solutions</span> setzt produktiv um.</p>

          {/* Benefits quick grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              {h:'Hands-on',p:'Übungen & Lab-Umgebungen statt Folienüberhang.'},
              {h:'Messbar',p:'Metriken & Evaluierung statt vager Qualitätsurteile.'},
              {h:'Open-first',p:'Offene Tools & Standards – kein Vendor Lock‑in.'},
              {h:'Transfer',p:'Artefakte & Checklisten zur direkten Nutzung.'}
            ].map(v => (
              <div key={v.h} className="rounded-2xl p-5 bg-white/5 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-2">{v.h}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{v.p}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-14">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Format & Ablauf</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Alle Formate: 1 Tag, modulare Blöcke (Impulse → Pattern → Übung → Review). <TermHint term="Prompt Pattern" />, <TermHint term="Retrieval" /> & Auswertung mit Metriken (<TermHint term="KPI" />) wo sinnvoll.</p>
            <p className="text-sm text-text-secondary leading-relaxed">Optional: Follow-up Q&A, Code / Prompt Review Sessions, Betriebssprechstunde.</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-24">
            <Link to="/contact" className="btn-primary">Anfrage stellen</Link>
            <Link to="#core-trainings" className="btn-secondary">Zu Kern-Trainings</Link>
            <Link to="#trainings-faq" className="btn-ghost">FAQ</Link>
            <Link to="/services" className="btn-outline">Services Übersicht</Link>
          </div>

          {/* Core Trainings */}
          <div className="relative" id="core-trainings">
            <header className="max-w-3xl mb-14">
              <h2 className="h2 h-space text-white">Kern-Schulungen (je 1 Tag)</h2>
              <p className="text-lg text-text-secondary leading-relaxed">Fokussiert, intensiv & praxisnah – kombinierbar zu 2‑Tages Blöcken für beschleunigten Enablement Pfad.</p>
            </header>
            <div className="grid md:grid-cols-3 gap-10">
              {coreTrainings.map((t,i) => (
                <div key={t.key} className="group relative rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-md p-7 flex flex-col overflow-hidden transition-all duration-500 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(0,255,165,0.25),0_8px_36px_-8px_rgba(0,255,165,0.35)]">
                  <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{background:'radial-gradient(circle at 28% 25%, rgba(0,255,165,0.18), transparent 65%)'}} />
                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <span className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-semibold tracking-wide">{t.badge}</span>
                    <span className="text-[11px] text-text-muted font-medium tracking-wide">{String(i+1).padStart(2,'0')}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug relative z-10">{t.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 relative z-10">{t.desc}</p>
                  <div className="grid grid-cols-3 gap-3 text-[10px] text-text-muted mb-6 relative z-10">
                    <div className="flex flex-col"><span className="uppercase tracking-wide text-white/70 mb-1">Dauer</span><span>{t.duration}</span></div>
                    <div className="flex flex-col"><span className="uppercase tracking-wide text-white/70 mb-1">Format</span><span>{t.format}</span></div>
                    <div className="flex flex-col"><span className="uppercase tracking-wide text-white/70 mb-1">Preis</span><span>{t.price}</span></div>
                  </div>
                  <ul className="space-y-2 mb-4 relative z-10">
                    {t.topics.map(tp => (
                      <li key={tp} className="flex items-center gap-2 text-xs text-text-secondary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                        {tp}
                      </li>
                    ))}
                  </ul>
                  <div className="relative z-10 overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100">
                    <div className="mt-2 mb-4 text-[11px] flex items-start gap-2 text-text-muted leading-relaxed">
                      <span className="material-symbols-outlined text-vae-turquoise text-base mt-0.5">info</span>
                      <span>{t.info}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="btn-convert inline-flex gap-2 text-[11px] mt-auto relative z-20">
                    {t.ctaLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
            <TrainingsFAQ />
          </Suspense>

          {/* Crosslinks */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <SpotlightCard title="Beratung – Richtung" description="Architektur, Kosten & Governance strukturiert entscheiden bevor Umsetzung startet." to="/services/consulting" cta="Beratung ansehen" />
            <SpotlightCard title="Custom Solutions – Umsetzung" description="Produktive Integrationen & Automationen – dokumentiert & übergebbar." to="/services/custom-solutions" cta="Projekt starten" />
            <SpotlightCard title="Products – Suite & CORE" description="Fertige Module & Plattform als Beschleuniger oder Alternative." to="/products/solutions" cta="Suite erkunden" />
          </div>

          <Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade Glossar…</div>}>
            <GlossarySection className="mt-28 border-t border-white/5" limit={9} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default ServiceTrainingsPage

// Data & FAQ
const coreTrainings = [
  {
    key:'governance-strategy',
    title:'AI Governance & Strategy',
    desc:'Strategische Verankerung & regulatorische Orientierung – fundiert & umsetzungsnah.',
    duration:'1 Tag', format:'Hybrid', price:'900 €',
    topics:['Strategische Zielbilder','EU AI Act Basics','Policy & Rollen','Priorisierungs-Canvas'],
    ctaLabel:'Workshop buchen',
    badge:'Governance',
    info:'Enthält Canvas-Vorlagen & Entscheidungs-Matrix als übergebbare Artefakte.'
  },
  {
    key:'prompt-patterns',
    title:'Prompt Patterns & Evaluation',
    desc:'Strukturierte Muster, Messbarkeit & Reduktion von Halluzinationen für reproduzierbare Qualität.',
    duration:'1 Tag', format:'Online / Hybrid', price:'850 €',
    topics:['Prompt Patterns','Evaluation Metriken','Retrieval Kontext','Halluzinations-Reduktion'],
    ctaLabel:'Platz sichern',
    badge:'Patterns',
    info:'Beinhaltet Pattern-Cheat-Sheet & Evaluations-Template (Precision / Robustheit).'  
  },
  {
    key:'core-ops',
    title:'Lokale KI Infrastruktur & VAE CORE Ops',
    desc:'Deployment, Betrieb & Observability eines offenen KI-Stacks inkl. Sicherheitsgrundlagen.',
    duration:'1 Tag', format:'Hybrid', price:'980 €',
    topics:['Deployment Pfad','Retrieval Setup','Policies & Rollen','Observability Basics'],
    ctaLabel:'Session anfragen',
    badge:'Operations',
    info:'Optionale Erweiterung: 2. Tag vertiefte Integrationen & Security Hardening.'
  }
]

const trainingsFaqCategories: FAQCategory[] = [
  { category:'Allgemein', questions:[
    {question:'Wie groß sind die Gruppen?', answer:'Offene Formate meist 6–10 Personen. Inhouse nach Bedarf skalierbar.'},
    {question:'Gibt es Aufzeichnungen?', answer:'Aus Datenschutzgründen normalerweise nein – Unterlagen & Labs decken Inhalte ab.'}
  ]},
  { category:'Inhalt & Ablauf', questions:[
    {question:'Wie viel Theorie vs Praxis?', answer:'Ca. 30% Kontext & Modelle, 70% Übungen, Reviews & Transfer.'},
    {question:'Welche Tools werden genutzt?', answer:'Open-first Stack: u.a. offene Modelle, Vektordatenbank, Evaluationsskripte, Observability Dashboard.'}
  ]},
  { category:'Kombi & Erweiterung', questions:[
    {question:'Können wir Trainings kombinieren?', answer:'Ja – häufig Governance Tag + Patterns Tag. Rabatte bei Kombination möglich.'},
    {question:'Gibt es Follow-up Support?', answer:'Optional Sprechstunden-Paket oder Übergang in Consulting / Custom Solutions.'}
  ]}
]

const TrainingsFAQ: React.FC = () => (
  <FAQSection
      id="trainings-faq"
  title="FAQ zu Schulungen & Workshops"
      subtitle="Häufige Fragen zu Ablauf, Umfang & Kombination."
      categories={trainingsFaqCategories}
      cta={false}
      className="py-28"
      dense
    />
)
