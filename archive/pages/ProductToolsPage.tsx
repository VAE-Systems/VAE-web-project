import React from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'

const placeholderTools = [
  { name: 'VAE CRM (Preview)', desc: 'Fokus auf Beziehungsdaten & Interaktions-Kontext statt reiner Tabellenansicht.' },
  { name: 'Docs‑Lens', desc: 'Dokumenten-Overlay: Semantische Suche, Passage-Extraktion, kontextuelles Routing.' },
  { name: 'Ops‑Copilot', desc: 'Runbook-Verknüpfung + Workflow-Aktionen für wiederkehrende Betriebsabläufe.' },
]

const ProductToolsPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Applikationen & Module | VAE Systems – Schlanke Werkzeuge"
        description="Fokussierte Applikationen & Module – klarer Nutzen, integrativ, transparente Lizenzierung. Roadmap basiert auf realen Anforderungen."
        canonicalPath="/products/tools"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Applikationen & Module',
            about: 'Softwaremodule & Applikationen für KI‑gestützte Arbeitsabläufe',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Produkte', item: 'https://www.vae-systems.com/products' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Applikationen & Module',
                item: 'https://www.vae-systems.com/products/tools',
              },
            ],
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Produkte & Plattform', path: '/products' },
          { label: 'Applikationen & Module', path: '/products/tools' },
        ]}
        className="pt-6"
      />
      <section className="border-border-primary relative overflow-hidden border-b bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker pb-24 pt-40 dark:border-white/5">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-8">
            <span className="block text-text-light">Applikationen & Module</span>
            <span className="block text-vae-turquoise">Klarer Nutzen. Coming Soon.</span>
          </h1>
          <p className="mb-6 max-w-3xl text-xl leading-relaxed text-text-secondary">
            Fokussierte Applikationen & Module – klarer Nutzen, schlanke Schnittstellen, transparente Lizenzierung.
            Qualität & Wartbarkeit vor Feature‑Breite.
          </p>
          <p className="mb-10 max-w-3xl text-sm leading-relaxed text-text-muted">
            Coming Soon. Veröffentlichungen erfolgen erst, wenn Deploy‑Pfad, Dokumentation & Wartungsprozess belastbar
            sind. Kein „Ship & Forget“.
          </p>
          <div className="mb-20 grid gap-8 md:grid-cols-3">
            {placeholderTools.map(t => (
              <div
                key={t.name}
                className="bg-bg-primary/5 border-border-primary rounded-2xl border p-6 transition-all hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="mb-2 text-sm font-semibold text-text-light dark:text-white">{t.name}</h3>
                <p className="text-xs leading-relaxed text-text-secondary">{t.desc}</p>
                <div className="mt-4 inline-flex rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 px-3 py-1 text-[10px] font-medium text-vae-turquoise">
                  Preview
                </div>
              </div>
            ))}
          </div>
          <div className="mb-20 grid gap-8 md:grid-cols-3">
            {[
              {
                h: 'Design-Prinzipien',
                b: [
                  'Minimale Konfiguration',
                  'Explizite Schnittstellen',
                  'Saubere Deinstallation',
                  'Kein Telemetrie-Zwang',
                ],
              },
              {
                h: 'Qualitätskriterien',
                b: [
                  'Versionierte APIs',
                  'Testbare Integrationspfade',
                  'Ressourcen-Kosten sichtbar',
                  'Security-Scopes klar',
                ],
              },
              {
                h: 'Release Gate',
                b: [
                  'Dokumentation fertig',
                  'Deployment Script reproduzierbar',
                  'Rollback-Pfad definiert',
                  'Monitoring Hook vorhanden',
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
          <div className="bg-bg-primary/5 border-border-primary mb-20 rounded-2xl border p-8 dark:border-white/10 dark:bg-white/5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-vae-turquoise">
              Transparente Roadmap
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              Priorisierung basiert auf realen Projektanforderungen & wiederkehrenden Mustern in Delivery‑Phasen (z.B.
              Dokumentenklassifikation, Betriebsautomatisierung, Wissenszugriff).
            </p>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">
              Wir vermeiden Tool‑Sprawl: Jede Veröffentlichung muss klar zu Wartungs‑ & Observability‑Standards passen.
            </p>
            <ReferenceList
              items={[
                {
                  id: 't1',
                  label: 'CNCF Annual Survey – Operative Reife & Plattform-Pattern',
                  url: 'https://www.cncf.io',
                },
                {
                  id: 't2',
                  label: 'Gartner Platform Engineering – Reduktion von Tool-Sprawl',
                  url: 'https://www.gartner.com',
                },
                {
                  id: 't3',
                  label: 'EU AI Act – Technische Governance Anforderungen (Allgemein)',
                  url: 'https://eur-lex.europa.eu',
                },
              ]}
              dense
            />
            <p className="mt-4 text-xs text-text-muted">
              Hinweis: Inhalte dieser Seite sind Ausblick und können angepasst werden.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <CtaLink
              ctaId="products.tools.early_interest_email"
              ctx={{ product: 'Applikationen & Module', fromPage: 'products-tools', intent: 'early-access' }}
              variant="primary"
            />
            <Link to="/products/vae-core" className="btn-secondary">
              VAE CORE ansehen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductToolsPage
