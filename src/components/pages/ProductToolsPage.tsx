import React from 'react'
import { Link } from 'react-router-dom'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'

const placeholderTools = [
  { name: 'VAE CRM (Preview)', desc: 'Fokus auf Beziehungsdaten & Interaktions-Kontext statt reiner Tabellenansicht.' },
  { name: 'Docs‑Lens', desc: 'Dokumenten-Overlay: Semantische Suche, Passage-Extraktion, kontextuelles Routing.' },
  { name: 'Ops‑Copilot', desc: 'Runbook-Verknüpfung + Workflow-Aktionen für wiederkehrende Betriebsabläufe.' }
]

const ProductToolsPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Applikationen & Module | VAE Systems – Schlanke Werkzeuge"
        description="Fokussierte Applikationen & Module – klarer Nutzen, integrativ, transparente Lizenzierung. Roadmap basiert auf realen Anforderungen."
        canonicalPath="/products/tools"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Applikationen & Module', about: 'Softwaremodule & Applikationen für KI‑gestützte Arbeitsabläufe' },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type':'ListItem', position:1, name:'Produkte', item:'https://www.vae-systems.com/products' }, { '@type':'ListItem', position:2, name:'Applikationen & Module', item:'https://www.vae-systems.com/products/tools' } ] }
        ]}
      />
      <section className="relative pt-40 pb-24 border-b border-border-primary dark:border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-8">
            <span className="block text-text-light">Applikationen & Module</span>
            <span className="block text-vae-turquoise">Klarer Nutzen. Coming Soon.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-6">
            Fokussierte Applikationen & Module – klarer Nutzen, schlanke Schnittstellen, transparente Lizenzierung. Qualität & Wartbarkeit vor Feature‑Breite.
          </p>
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl mb-10">
            Coming Soon. Veröffentlichungen erfolgen erst, wenn Deploy‑Pfad, Dokumentation & Wartungsprozess belastbar sind. Kein „Ship & Forget“.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {placeholderTools.map(t => (
              <div key={t.name} className="p-6 rounded-2xl bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 hover:border-vae-turquoise/40 transition-all">
                <h3 className="font-semibold text-text-light dark:text-white mb-2 text-sm">{t.name}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{t.desc}</p>
                <div className="mt-4 inline-flex px-3 py-1 rounded-full bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium border border-vae-turquoise/30">Preview</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[{
              h:'Design-Prinzipien',
              b:['Minimale Konfiguration','Explizite Schnittstellen','Saubere Deinstallation','Kein Telemetrie-Zwang']
            },{
              h:'Qualitätskriterien',
              b:['Versionierte APIs','Testbare Integrationspfade','Ressourcen-Kosten sichtbar','Security-Scopes klar']
            },{
              h:'Release Gate',
              b:['Dokumentation fertig','Deployment Script reproduzierbar','Rollback-Pfad definiert','Monitoring Hook vorhanden']
            }].map(c => (
              <div key={c.h} className="p-6 bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 rounded-2xl">
                <h3 className="text-sm font-semibold text-text-light dark:text-white mb-3">{c.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">
                  {c.b.map(x => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 rounded-2xl p-8 mb-20">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Transparente Roadmap</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Priorisierung basiert auf realen Projektanforderungen & wiederkehrenden Mustern in Delivery‑Phasen (z.B. Dokumentenklassifikation, Betriebsautomatisierung, Wissenszugriff).</p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">Wir vermeiden Tool‑Sprawl: Jede Veröffentlichung muss klar zu Wartungs‑ & Observability‑Standards passen.</p>
            <ReferenceList
              items={[
                { id: 't1', label: 'CNCF Annual Survey – Operative Reife & Plattform-Pattern', url: 'https://www.cncf.io' },
                { id: 't2', label: 'Gartner Platform Engineering – Reduktion von Tool-Sprawl', url: 'https://www.gartner.com' },
                { id: 't3', label: 'EU AI Act – Technische Governance Anforderungen (Allgemein)', url: 'https://eur-lex.europa.eu' }
              ]}
              dense
            />
            <p className="text-xs text-text-muted mt-4">Hinweis: Inhalte dieser Seite sind Ausblick und können angepasst werden.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Early Interest anmelden</Link>
            <Link to="/products/vae-core" className="btn-secondary">VAE CORE ansehen</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductToolsPage
