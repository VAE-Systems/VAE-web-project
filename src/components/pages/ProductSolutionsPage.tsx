import React from 'react'
import { Link } from 'react-router-dom'
import ReferenceList from '../ui/ReferenceList'
import ProviderComparisonSection from '../sections/ProviderComparison'
import ReSuiteSection from '../sections/ReSuiteSection'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'

const ProductSolutionsPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      
  <Seo
        title="Komplettlösungen | VAE Systems – End‑to‑End KI Umsetzung"
        description="Architektur, Implementierung, Betrieb & Handover für KI- und Automationslösungen – dokumentiert, vendor‑lock‑in frei, auditierbar."
        canonicalPath="/products/solutions"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Service', name: 'Komplettlösungen KI & Automation', provider: { '@type': 'Organization', name: 'VAE Systems' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type':'ListItem', position:1, name:'Produkte', item:'https://www.vae-systems.com/products' }, { '@type':'ListItem', position:2, name:'Komplettlösungen', item:'https://www.vae-systems.com/products/solutions' } ] }
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Produkte & Plattform', path: '/products' },
          { label: 'Komplettlösungen', path: '/products/solutions' }
        ]}
        className="pt-6"
      />
      <section className="relative pt-40 pb-24 border-b border-border-primary dark:border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-8">
            <span className="block text-text-light">Komplettlösungen</span>
            <span className="block text-vae-turquoise">End‑to‑End umgesetzt.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-6">
            Wenn interne Kapazitäten oder spezialisierte Erfahrungswerte fehlen, braucht es mehr als einzelne Module: Architektur, Implementierung, Betriebsübergabe – als zusammenhängender Pfad. Keine versteckten Lizenzmodelle, kein proprietäres Black‑Box‑Gerüst. Ziel: Sie betreiben souverän.
          </p>
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl mb-10">
            Branchenreports zeigen: Fehlende Integrations‑ & Betriebsfähigkeiten sowie isolierte Pilotprojekte verzögern produktive Nutzung (u.a. Skills‑Lücken, fehlende Observability, Governance‑Unsicherheit). Unser Lösungsmodell adressiert diese Engpässe früh statt sie zu verschieben.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title:'Architektur & Blueprint', desc:'Technische & organisatorische Struktur: Datenflüsse, Komponenten, Sicherheits- & Betriebsmodell.' },
              { title:'Implementierung & Integration', desc:'Adaptierte Open‑Source‑Bausteine, Automatisierung & Handover-fähige Pipelines.' },
              { title:'Übergabe & Enablement', desc:'Dokumentation, Schulung, Betriebsleitfäden, optionale Begleitung für Skalierungsphase.' }
            ].map(card => (
              <div key={card.title} className="p-6 rounded-2xl bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 hover:border-vae-turquoise/40 transition-all">
                <h3 className="font-semibold mb-2 text-text-light dark:text-white text-lg">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-5 mb-16">
            <h2 className="text-2xl font-semibold text-text-light dark:text-white">Re:spond – Conversational Delivery</h2>
            <p className="text-text-secondary leading-relaxed max-w-3xl">
              Re:spond ist kein „Chatbot-Baukasten“, sondern ein betreibbares Paket: Datenaufbereitung, Vektorisierung, Retrieval‑Strategien, Moderation, Evaluierung & Betriebs-Metriken. Kontrolliertes Lernen, auditierbar, rollenbasiert. Setup → Betrieb → Handover – modular erweiterbar. Für tiefergehende Integration der semantischen Schicht siehe <Link to="/products/vae-core" className="text-vae-turquoise hover:underline">VAE CORE</Link>.
            </p>
          </div>
          {/* Additional contextual content blocks */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[{
              h:'Typische Engpässe',
              b:['Skript-Sammlung statt Pipeline','Keine Metriken für Antwortqualität','Unsaubere Rechte & Data Scoping','Fehlende Übergabe-Dokumente']
            },{
              h:'Unser Ansatz',
              b:['Architektur vor Code-Skalierung','Frühe Observability-Hooks','Rollen-/Kontext-Modelle explizit','Dokumentation & Runbooks']
            },{
              h:'Ergebnis',
              b:['Schneller produktiv','Geringere Re‑Engineering-Kosten','Auditierbarer Lifecycle','Team Empowerment']
            }].map(col => (
              <div key={col.h} className="p-6 bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 rounded-2xl">
                <h3 className="text-sm font-semibold text-text-light dark:text-white mb-3">{col.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">
                  {col.b.map(x => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-white mb-3">Warum Komplett statt Stückwerk?</h3>
              <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc list-inside">
                <li>Reduktion von Integrations-Reibung & Schattenabhängigkeiten</li>
                <li>Frühe Sichtbarkeit von Betriebs- & Sicherheitsfragen</li>
                <li>Saubere Ablösung temporärer Prototypen</li>
                <li>Wissensaufbau im Team statt externer Blackbox</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-white mb-3">Transparenz-Prinzip</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">Keine versteckten Dienste, klare Open‑Source‑Anteile, definierte Übergabepunkte, Security-by-Design. Ziel: Sie betreiben souverän – wir bleiben optional.</p>
              <p className="text-sm text-text-secondary leading-relaxed">Qualitätskriterien: Reproduzierbarkeit, Observability, Metriken (Antwortqualität, Latenz, Abdeckung), Laufzeitkosten‑Transparenz.</p>
            </div>
          </div>
          <div className="bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 rounded-2xl p-8 mb-20">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Kontext & Marktperspektive</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              Häufige Muster: Parallel entstandene Skripte statt betreibbarer Pipelines, fehlende Metriken zur Qualitätsbewertung und unklare Übergaben zwischen Experiment & Betrieb. Wir strukturieren früh: Schnittstellen, Observability, Governance‑Artefakte.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Ergebnis: Weniger Re‑Engineering, schnellere Betriebsfähigkeit, geringere Abhängigkeit von einzelnen Personen.
            </p>
            <ReferenceList
              items={[
                { id: 'r1', label: 'Bitkom Digital Office Index – Fachkräftemangel & Prozessbrüche', url: 'https://www.bitkom.org' },
                { id: 'r2', label: 'McKinsey State of AI Report – Skalierungsbarrieren (Organisation & Talent)', url: 'https://www.mckinsey.com' },
                { id: 'r3', label: 'OECD AI Policy Observatory – Governance & Transparenzanforderungen', url: 'https://oecd.ai' },
                { id: 'r4', label: 'EU AI Act (Final Text) – Transparenz & Risikoklassen', url: 'https://eur-lex.europa.eu' }
              ]}
              dense
            />
          </div>
          
    <ReSuiteSection />

          <ProviderComparisonSection className="border-t border-border-primary dark:border-white/5 mt-10" headline="Vergleich: Komplettlösungen" subtitle="End‑to‑End Umsetzung & Ownership vs. Agentur Stückwerk & Low-Code Grenzen." />
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link to="/contact" className="btn-primary">Projekt anfragen</Link>
            <Link to="/products/vae-core" className="btn-secondary">VAE CORE ansehen</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductSolutionsPage
