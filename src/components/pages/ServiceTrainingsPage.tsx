import React, { Suspense } from 'react'
import Icon from '@/components/ui/Icon'
import { Link } from 'react-router-dom'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'
import { TermHint } from '../ui/Glossary'
import SpotlightCard from '../ui/SpotlightCard'
import type { FAQCategory } from '../sections/FAQSection'
import Card from '../ui/Card'

// Lazy loaded heavy sections
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
const GlossarySection = React.lazy(() => import('../ui/GlossarySection'))

const ServiceTrainingsPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
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
  <section className="relative -mt-20 pt-44 pb-32 border-b border-border-primary dark:border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_65%_35%,rgba(0,255,165,0.08),transparent_60%)]" />
    <div className="container-vae max-w-5xl -mt-24 mb-6">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Services', path: '/services' },
          { label: 'Schulungen & Workshops', path: '/services/trainings' }
        ]}
        className="py-4 relative z-[2] text-xs"
      />
    </div>
        <div className="container-vae max-w-5xl">
          <h1 className="h1 h-space-lg">
            <span className="block text-text-light">Schulungen & Workshops</span>
            <span className="block text-vae-turquoise">Kompetenz. In 1 Tag vertieft.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-6">Praxisorientierte, dichte Formate statt Frontal-Marathon. Ziel: interne Handlungsfähigkeit, Governance Verankerung & sicherer Betrieb.</p>
          <p className="text-sm text-text-muted max-w-3xl mb-12">Abgrenzung: <span className="text-text-light dark:text-white font-medium">Schulungen & Workshops</span> bauen Wissen & Routinen auf. <span className="text-text-light dark:text-white font-medium">Beratung</span> liefert Entscheidungsgrundlagen. <span className="text-text-light dark:text-white font-medium">Custom Solutions</span> setzt produktiv um.</p>

          {/* Benefits quick grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              {h:'Hands-on',p:'Übungen & Lab-Umgebungen statt Folienüberhang.'},
              {h:'Messbar',p:'Metriken & Evaluierung statt vager Qualitätsurteile.'},
              {h:'Open-first',p:'Offene Tools & Standards – kein Vendor Lock‑in.'},
              {h:'Transfer',p:'Artefakte & Checklisten zur direkten Nutzung.'}
            ].map(v => (
              <div key={v.h} className="rounded-2xl p-5 bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10">
                <h3 className="text-sm font-semibold text-text-light dark:text-white mb-2">{v.h}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{v.p}</p>
              </div>
            ))}
          </div>

          <div className="bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 rounded-2xl p-8 mb-14">
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
              <h2 className="h2 h-space text-text-light dark:text-white">Kern-Schulungen (je 1 Tag)</h2>
              <p className="text-lg text-text-secondary leading-relaxed">Fokussiert, intensiv & praxisnah – kombinierbar zu 2‑Tages Blöcken für beschleunigten Enablement Pfad.</p>
            </header>
              <div className="grid md:grid-cols-3 gap-10 items-stretch">
              {coreTrainings.map((t) => (
                <Card
                  key={t.key}
                  title={t.badge}
                  lead={t.title}
                  body={t.desc}
                  bullets={t.topics}
                  badge={t.badge}
                  link="/contact"
                  cta={t.ctaLabel}
                >
                  <div className="grid grid-cols-3 gap-3 text-[10px] text-text-muted mb-6">
                    <div className="flex flex-col"><span className="uppercase tracking-wide text-text-light dark:text-white/70 mb-1">Dauer</span><span>{t.duration}</span></div>
                    <div className="flex flex-col"><span className="uppercase tracking-wide text-text-light dark:text-white/70 mb-1">Format</span><span>{t.format}</span></div>
                    <div className="flex flex-col"><span className="uppercase tracking-wide text-text-light dark:text-white/70 mb-1">Preis</span><span>{t.price}</span></div>
                  </div>
                  <div className="relative overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100">
                    <div className="mt-2 mb-4 text-[11px] flex items-start gap-2 text-text-muted leading-relaxed">
                      <Icon name="info" className="text-vae-turquoise mt-0.5" size={16} />
                      <span>{t.info}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
            <TrainingsFAQ />
          </Suspense>

          {/* Crosslinks */}
          <div className="mt-24 grid md:grid-cols-3 gap-8 items-stretch">
            <SpotlightCard title="Beratung – Richtung" description="Architektur, Kosten & Governance strukturiert entscheiden bevor Umsetzung startet." to="/services/consulting" cta="Beratung ansehen" />
            <SpotlightCard title="Custom Solutions – Umsetzung" description="Produktive Integrationen & Automationen – dokumentiert & übergebbar." to="/services/custom-solutions" cta="Erstgespräch buchen" />
            <SpotlightCard title="Products – Suite & CORE" description="Fertige Module & Plattform als Beschleuniger oder Alternative." to="/products/solutions" cta="Suite erkunden" />
          </div>

          <Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade Glossar…</div>}>
            <GlossarySection className="mt-28 border-t border-border-primary dark:border-white/5" limit={9} />
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
