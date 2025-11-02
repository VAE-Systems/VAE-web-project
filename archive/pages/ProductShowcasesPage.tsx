import React from 'react'
import { Link } from 'react-router-dom'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'

const showcasePlaceholders = [
  { name: 'Event Automation Funnel', hint: 'Lead-Qualifizierung & Segmentierung @ Messe' },
  { name: 'Controlled Retrieval Workspace', hint: 'Rollenbasierte Wissensumgebung' },
  { name: 'Ops Workflow Orchestrator', hint: 'Incident-gebundene Automatisierung' },
]

const ProductShowcasesPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Showcases & Ökosystem | VAE Systems – Built with VAE Core"
        description="Reale Integrationen & Showcases auf Basis von VAE Core – nachvollziehbare Muster für Betrieb, Qualität & Skalierung."
        canonicalPath="/products/showcases"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Showcases – Built with VAE CORE' },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Produkte', item: 'https://www.vae-systems.com/products' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Showcases',
                item: 'https://www.vae-systems.com/products/showcases',
              },
            ],
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Produkte & Plattform', path: '/products' },
          { label: 'Showcases', path: '/products/showcases' },
        ]}
        className="pt-6"
      />
      <section className="border-border-primary from-bg-primary to-bg-primary relative overflow-hidden border-b bg-gradient-to-br via-bg-secondary pb-24 pt-40 dark:border-white/5 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-8">
            <span className="block text-text-light">Built with VAE Core</span>
            <span className="block text-vae-turquoise">Showcases & Ökosystem.</span>
          </h1>
          <p className="mb-6 max-w-3xl text-xl leading-relaxed text-text-secondary">
            Praxisbeispiele & Integrationen, die reale Probleme adressieren. Keine künstlichen Demos – sondern
            belastbare Muster für Betrieb & Skalierung.
          </p>
          <p className="mb-12 max-w-3xl text-sm leading-relaxed text-text-muted">
            Ziel: Substanz statt „Hello World“. Kennzahlen & Betriebsattribute werden erst veröffentlicht, wenn
            nachvollziehbar gemessen (Latenz, Fehlerraten-Pfade, Qualitätsmethodik). Partner klar gekennzeichnet.
          </p>
          <div className="mb-20 grid gap-8 md:grid-cols-3">
            {showcasePlaceholders.map(s => (
              <div
                key={s.name}
                className="bg-bg-primary/5 border-border-primary rounded-2xl border p-6 transition-all hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="mb-2 text-sm font-semibold text-text-light dark:text-white">{s.name}</h3>
                <p className="text-xs leading-relaxed text-text-secondary">{s.hint}</p>
                <div className="mt-4 inline-flex rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-2 py-1 text-[10px] text-vae-turquoise">
                  In Aufbereitung
                </div>
              </div>
            ))}
          </div>
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {[
              {
                h: 'Publikationskriterien',
                b: [
                  'Stabile Deployment-Pipeline',
                  'Messbare Qualitätsmethodik',
                  'Rollen & Rechte klar',
                  'Kostenpfade nachvollziehbar',
                ],
              },
              {
                h: 'Transparenz',
                b: [
                  'Partner klar markiert',
                  'Metrik-Definition beschrieben',
                  'Keine geschönten Benchmarks',
                  'Version Stand vermerkt',
                ],
              },
              {
                h: 'Lerntransfer',
                b: [
                  'Explizite Anti-Pattern',
                  'Fallback & Degradation',
                  'Edge Cases dokumentiert',
                  'Skalierungsgrenzen benannt',
                ],
              },
            ].map(c => (
              <div
                key={c.h}
                className="bg-bg-primary/5 border-border-primary rounded-2xl border p-6 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="mb-3 text-sm font-semibold text-text-light dark:text-white">{c.h}</h3>
                <ul className="list-inside list-disc space-y-1 text-xs leading-relaxed text-text-secondary">
                  {c.b.map(x => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-bg-primary/5 border-border-primary mb-16 rounded-2xl border p-8 dark:border-white/10 dark:bg-white/5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-vae-turquoise">Ansatz</h3>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              Publikation erst nach Verfügbarkeit belastbarer Metriken & reproduzierbarer Deployments. Keine „Demo-Only“
              Artefakte.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Kooperationen willkommen, sofern klarer Nutzenpfad definiert ist.
            </p>
            <ReferenceList
              items={[
                {
                  id: 's1',
                  label: 'McKinsey State of AI Report – Gap zwischen Pilot & Skalierung',
                  url: 'https://www.mckinsey.com',
                },
                { id: 's2', label: 'OECD AI Observatory – Transparenz & Wirkungsmessung', url: 'https://oecd.ai' },
                {
                  id: 's3',
                  label: 'CNCF Case Studies – Cloud Native Betriebsmodelle',
                  url: 'https://www.cncf.io/case-studies/',
                },
              ]}
              dense
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Kooperation anfragen
            </Link>
            <Link to="/products/vae-core" className="btn-secondary">
              VAE CORE ansehen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductShowcasesPage
