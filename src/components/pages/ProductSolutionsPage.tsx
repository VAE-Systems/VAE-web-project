import React from 'react'
import { Link } from 'react-router-dom'
import ReferenceList from '../ui/ReferenceList'
import { solutionsSuite } from '../../content/solutionsSuite'
import ProviderComparisonSection from '../sections/ProviderComparison'
import Seo from '../ui/Seo'

const ProductSolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      
      <Seo
        title="Komplettlösungen | VAE Systems – End‑to‑End KI Umsetzung"
        description="Architektur, Implementierung, Betrieb & Handover für KI- und Automationslösungen – dokumentiert, vendor‑lock‑in frei, auditierbar."
        canonicalPath="/products/solutions"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'Service', name: 'Komplettlösungen KI & Automation', provider: { '@type': 'Organization', name: 'VAE Systems' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type':'ListItem', position:1, name:'Produkte', item:'https://www.vae-systems.com/products' }, { '@type':'ListItem', position:2, name:'Komplettlösungen', item:'https://www.vae-systems.com/products/solutions' } ] }
        ]}
      />
      <section className="relative pt-40 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-8">
            <span className="block text-text-light">Komplettlösungen</span>
            <span className="block text-gradient">End‑to‑End umgesetzt.</span>
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
              <div key={card.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-vae-turquoise/40 transition-all">
                <h3 className="font-semibold mb-2 text-white text-lg">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-5 mb-16">
            <h2 className="text-2xl font-semibold text-white">Re:spond – Conversational Delivery</h2>
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
              <div key={col.h} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-3">{col.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">
                  {col.b.map(x => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Warum Komplett statt Stückwerk?</h3>
              <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc list-inside">
                <li>Reduktion von Integrations-Reibung & Schattenabhängigkeiten</li>
                <li>Frühe Sichtbarkeit von Betriebs- & Sicherheitsfragen</li>
                <li>Saubere Ablösung temporärer Prototypen</li>
                <li>Wissensaufbau im Team statt externer Blackbox</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Transparenz-Prinzip</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">Keine versteckten Dienste, klare Open‑Source‑Anteile, definierte Übergabepunkte, Security-by-Design. Ziel: Sie betreiben souverän – wir bleiben optional.</p>
              <p className="text-sm text-text-secondary leading-relaxed">Qualitätskriterien: Reproduzierbarkeit, Observability, Metriken (Antwortqualität, Latenz, Abdeckung), Laufzeitkosten‑Transparenz.</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-20">
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
          
    {/* Re:* Suite Section */}
    <section className="relative pt-32 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
      <div className="container-vae max-w-5xl">
        {/* Re: Banner – E‑Mail Szene */}
        <div className="mb-12 flex flex-col items-center justify-center">
          <div
            className="w-full max-w-3xl surface-glass-panel rounded-2xl p-6 md:p-8 shadow-lg edge-glow-top checker-faint"
            role="region"
            aria-label="Empfehlungs‑Mail Szene"
          >
            <div className="text-xs md:text-sm font-mono text-text-muted space-y-1">
              <div>
                <span className="text-text-secondary mr-2">From:</span>
                <span className="text-white">ToldYou &lt;toldyou@hidden.network&gt;</span>
              </div>
              <div>
                <span className="text-text-secondary mr-2">To:</span>
                <span className="text-white">AlwaysBusy &lt;alwaysbusy@somewhere.work&gt;</span>
              </div>
              <div>
                <span className="text-text-secondary mr-2">Subject:</span>
                <span className="text-white">Re: The problem you told me about.</span>
              </div>
            </div>

            <div className="mt-5 md:mt-6 text-base md:text-lg leading-relaxed">
              <p className="text-text-secondary measure-readable">
                Ich muss ehrlich sein – eigentlich wollte ich’s für mich behalten.{' '}
                <span className="text-white">Aber ich erzähle dir jetzt von <span className="text-vae-turquoise">VAE Systems</span>.</span>
              </p>
              {/* Blinkender Cursor‑Moment */}
              <div className="mt-3 h-5 flex items-center" aria-hidden>
                <span className="inline-block w-[10px] h-5 bg-vae-turquoise/80 animate-pulse rounded-[1px]"></span>
              </div>
            </div>

            <div className="mt-6 text-xs text-text-muted">
              <span className="uppercase tracking-wide">Re: Suite</span>
              <span className="mx-2">•</span>
              Antworten auf echte Probleme – betrieben auf <Link to="/products/vae-core" className="text-vae-turquoise hover:underline">VAE CORE</Link>
            </div>
          </div>

          <h2 className="h2 heading-gradient text-center mt-8">Re: Suite – Modular, betreibbar, transparent</h2>
          <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mt-2">
            Jede Re:-Lösung kombiniert CORE‑Layer (Retrieval, Workflows, Zugriff) mit operativen Artefakten – Dokumentation, Runbooks, Observability. Ergebnis: produktive, auditierbare Systeme statt Prototypen.
          </p>
        </div>

        {/* Grid aller Lösungen */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mb-16">
          {solutionsSuite.map((sol) => (
            <div
              key={sol.slug}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-vae-turquoise/40 transition-all flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-white text-lg">{sol.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ml-2 ${
                    sol.maturity === 'GA'
                      ? 'bg-vae-turquoise/10 text-vae-turquoise border-vae-turquoise/30'
                      : sol.maturity === 'Beta'
                      ? 'bg-violet-600/10 text-violet-400 border-violet-400/30'
                      : sol.maturity === 'Pilot'
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                      : 'bg-slate-600/10 text-slate-400 border-slate-400/30'
                  }`}
                >
                  {sol.maturity}
                </span>
              </div>
              <div className="text-sm text-text-secondary mb-2">{sol.tagline}</div>
              <div className="mb-2 text-xs text-text-muted">
                <span className="font-semibold">Pain:</span> {sol.pain}
              </div>
              <div className="mb-2 text-xs text-text-muted">
                <span className="font-semibold">Approach:</span> {sol.approach}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {sol.outcomes.map((o) => (
                  <span
                    key={o}
                    className="px-2 py-1 rounded-full text-[10px] font-medium border bg-vae-turquoise/10 text-vae-turquoise border-vae-turquoise/30"
                  >
                    {o}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {sol.coreLayers.map((l) => (
                  <span
                    key={l}
                    className="px-2 py-1 rounded text-[10px] bg-white/10 text-text-muted border border-white/10"
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div className="mt-auto text-xs text-text-muted">{sol.statusNote}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

          <ProviderComparisonSection className="border-t border-white/5 mt-10" headline="Vergleich: Komplettlösungen" subtitle="End‑to‑End Umsetzung & Ownership vs. Agentur Stückwerk & Low-Code Grenzen." />
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
