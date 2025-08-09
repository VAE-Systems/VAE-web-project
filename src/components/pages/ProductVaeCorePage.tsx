import React from 'react'
import { Link } from 'react-router-dom'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'

const ProductVaeCorePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="VAE CORE Plattform | VAE Systems – Semantische Betriebsplattform"
        description="VAE CORE: Embeddings, Vektorsuche, Workflows, Zugriffskontrolle & Observability als souveränes Plattform-Fundament."
        canonicalPath="/products/vae-core"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'VAE CORE', applicationCategory: 'AI Platform', operatingSystem:'Cloud / On-Prem', publisher:{ '@type':'Organization', name:'VAE Systems' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type':'ListItem', position:1, name:'Produkte', item:'https://www.vae-systems.com/products' }, { '@type':'ListItem', position:2, name:'VAE CORE', item:'https://www.vae-systems.com/products/vae-core' } ] }
        ]}
      />
      <section className="relative pt-40 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
        <div className="container-vae max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold heading-fix mb-8">
            <span className="block text-text-light">VAE CORE</span>
            <span className="block text-gradient">Semantische Betriebsplattform.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-6">
            Backend-Fundament für datensouveräne KI‑Arbeitsräume: Embeddings, Vektor‑ & Hybrid-Suche, Zugriffsebenen, Workflow-Orchestrierung, Audit-Pfade & Observability. Verständliche Schnittstellen statt proprietärer Monolith.
          </p>
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl mb-12">
            Ziel: Einheitlicher semantischer Layer, klare Policies, austauschbare Infrastruktur‑Adapter. Architektur minimiert Kopplung & erleichtert spätere Migrationen.
          </p>
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Kernbausteine</h3>
              <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc list-inside">
                <li>Embedding Layer & adaptive Index-Strategien</li>
                <li>Vektor- & Hybrid Retrieval (Text / Struktur / Attribute)</li>
                <li>Rollen- & Kontext-gebundene Zugriffskontrolle</li>
                <li>Workflow Engine (Temporal kompatibel)</li>
                <li>Events, Telemetrie, Metriken & Audit Trails</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Betriebsmodelle</h3>
              <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc list-inside">
                <li>On‑Prem / Sovereign Cloud (lokale Kontrolle)</li>
                <li>Konfigurierbare Datenresidenz</li>
                <li>Erweiterbar via Plug‑in Layer</li>
                <li>Observability & Kosten-Transparenz integriert</li>
                <li>Klare Upgrade-Pfade / Migrations-Guides</li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[{
              h:'Schichten',
              b:['API / Gateway','Semantik & Index','Workflow / Orchestrierung','Observability & Policy']
            },{
              h:'Abgrenzung',
              b:['Kein proprietärer Model-Host','Kein Vendor-spez. Lock‑in Layer','Keine Intransparente Telemetrie','Kein monolithischer UI-Zwang']
            },{
              h:'Use Cases',
              b:['Wissensräume','Dokumenten-Assistenz','Prozessautomatisierung','Policy‑gesteuerte Retrieval-Flows']
            }].map(b => (
              <div key={b.h} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-3">{b.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">
                  {b.b.map(x => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Architektur-Ansatz</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Austauschbare Speicher‑ & Index‑Adapter, deklarative Konfiguration, explizite API-Verträge. Fokus auf Beobachtbarkeit jeder Pipeline‑Stufe.</p>
            <p className="text-sm text-text-secondary leading-relaxed">Roadmap (Auszug): Policy Engine, Multi-Tenancy Hardening, integrierte Qualitäts-Evaluierung. Lizenz: kommerziell + ausgewählte Open‑Source Komponenten.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-20">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Kontext & Referenzen</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Reports betonen: Ohne durchgängige Sichtbarkeit & Governance scheitert Skalierung häufig an Sicherheits- & Compliance-Fragen. Ein konsistenter Plattform-Layer reduziert Reibung zwischen Entwicklung & Betrieb.</p>
            <ReferenceList
              items={[
                { id: 'c1', label: 'CNCF Annual Survey – Observability & Plattform Patterns', url: 'https://www.cncf.io' },
                { id: 'c2', label: 'Gartner Platform Engineering – Team Enabler Patterns', url: 'https://www.gartner.com' },
                { id: 'c3', label: 'EU Data Act – Datenzugriff & Portabilität', url: 'https://eur-lex.europa.eu' },
                { id: 'c4', label: 'EU AI Act – Governance & Transparenz', url: 'https://eur-lex.europa.eu' }
              ]}
              dense
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Demo / Architekturgespräch</Link>
            <Link to="/products/showcases" className="btn-secondary">Showcases ansehen</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductVaeCorePage
