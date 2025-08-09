import React from 'react'
import { Link } from 'react-router-dom'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'

const showcasePlaceholders = [
  { name: 'Event Automation Funnel', hint: 'Lead-Qualifizierung & Segmentierung @ Messe' },
  { name: 'Controlled Retrieval Workspace', hint: 'Rollenbasierte Wissensumgebung' },
  { name: 'Ops Workflow Orchestrator', hint: 'Incident-gebundene Automatisierung' }
]

const ProductShowcasesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Showcases & Ökosystem | VAE Systems – Built with VAE CORE"
        description="Reale Integrationen & Showcases auf Basis von VAE CORE – nachvollziehbare Muster für Betrieb, Qualität & Skalierung."
        canonicalPath="/products/showcases"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Showcases – Built with VAE CORE' },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type':'ListItem', position:1, name:'Produkte', item:'https://www.vae-systems.com/products' }, { '@type':'ListItem', position:2, name:'Showcases', item:'https://www.vae-systems.com/products/showcases' } ] }
        ]}
      />
      <section className="relative pt-40 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
        <div className="container-vae max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold heading-fix mb-8">
            <span className="block text-text-light">Built with VAE CORE</span>
            <span className="block text-gradient">Showcases & Ökosystem.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-6">
            Praxisbeispiele & Integrationen, die reale Probleme adressieren. Keine künstlichen Demos – sondern belastbare Muster für Betrieb & Skalierung.
          </p>
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl mb-12">
            Ziel: Substanz statt „Hello World“. Kennzahlen & Betriebsattribute werden erst veröffentlicht, wenn nachvollziehbar gemessen (Latenz, Fehlerraten-Pfade, Qualitätsmethodik). Partner klar gekennzeichnet.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {showcasePlaceholders.map(s => (
              <div key={s.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-vae-turquoise/40 transition-all">
                <h3 className="font-semibold text-white mb-2 text-sm">{s.name}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{s.hint}</p>
                <div className="mt-4 text-[10px] inline-flex px-2 py-1 rounded-full bg-vae-turquoise/10 text-vae-turquoise border border-vae-turquoise/30">In Aufbereitung</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[{
              h:'Publikationskriterien',
              b:['Stabile Deployment-Pipeline','Messbare Qualitätsmethodik','Rollen & Rechte klar','Kostenpfade nachvollziehbar']
            },{
              h:'Transparenz',
              b:['Partner klar markiert','Metrik-Definition beschrieben','Keine geschönten Benchmarks','Version Stand vermerkt']
            },{
              h:'Lerntransfer',
              b:['Explizite Anti-Pattern','Fallback & Degradation','Edge Cases dokumentiert','Skalierungsgrenzen benannt']
            }].map(c => (
              <div key={c.h} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-3">{c.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">
                  {c.b.map(x => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Ansatz</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Publikation erst nach Verfügbarkeit belastbarer Metriken & reproduzierbarer Deployments. Keine „Demo-Only“ Artefakte.</p>
            <p className="text-sm text-text-secondary leading-relaxed">Kooperationen willkommen, sofern klarer Nutzenpfad definiert ist.</p>
            <ReferenceList
              items={[
                { id: 's1', label: 'McKinsey State of AI Report – Gap zwischen Pilot & Skalierung', url: 'https://www.mckinsey.com' },
                { id: 's2', label: 'OECD AI Observatory – Transparenz & Wirkungsmessung', url: 'https://oecd.ai' },
                { id: 's3', label: 'CNCF Case Studies – Cloud Native Betriebsmodelle', url: 'https://www.cncf.io/case-studies/' }
              ]}
              dense
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary">Kooperation anfragen</Link>
            <Link to="/products/vae-core" className="btn-secondary">VAE CORE ansehen</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductShowcasesPage
