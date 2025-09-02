import React from 'react'
import { Link } from 'react-router-dom'
import ReferenceList from '../ui/ReferenceList'
import Seo from '../ui/Seo'
import Breadcrumbs from '../navigation/Breadcrumbs'
import { vaeCoreContent } from '../../content/vaeCore'

const ProductVaeCorePage: React.FC = () => {
  const c = vaeCoreContent

  return (
    <div className="min-h-[100dvh]">
  <Seo
        title="VAE Core – Das semantische Backend | VAE Systems"
        description={c.hero.subline}
        canonicalPath="/products/vae-core"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'VAE CORE', applicationCategory: 'AI Platform', operatingSystem:'Cloud / On-Prem', publisher:{ '@type':'Organization', name:'VAE Systems' } },
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type':'ListItem', position:1, name:'Produkte', item:'https://www.vae-systems.com/products' }, { '@type':'ListItem', position:2, name:'VAE CORE', item:'https://www.vae-systems.com/products/vae-core' } ] }
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Produkte & Plattform', path: '/products' },
          { label: 'VAE CORE', path: '/products/vae-core' }
        ]}
        className="pt-6"
      />
      <section id="hero" className="relative pt-40 pb-24 border-b border-border-primary dark:border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
        <div className="container-vae max-w-5xl">
          <h1 className="h1 mb-6">
            <span className="block text-text-light">{c.hero.titlePre}</span>
            <span className="block text-vae-turquoise">{c.hero.titleMain}</span>
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-vae-turquoise/10 text-vae-turquoise text-sm font-medium tracking-wide" role="status" aria-label="Release status">
              {c.hero.badge}
            </span>
            <p className="text-sm text-text-muted leading-relaxed">{c.hero.subline}</p>
          </div>

          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mb-8">
            {c.hero.lead}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/products/vae-core#open-source" className="btn-primary">
              {c.cta.openSourceLabel}
            </Link>
            <Link to="/contact" className="btn-secondary">
              {c.cta.enterpriseLabel}
            </Link>
            <Link to="/contact" className="btn-ghost">
              {c.cta.demoLabel}
            </Link>
          </div>
        </div>
      </section>

      <section id="was-ist" className="py-16">
        <div className="container-vae max-w-5xl">
          <h2 className="h3 mb-4">{c.sections.whatIs.title}</h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-3xl mb-8">{c.sections.whatIs.text}</p>

          <div id="features" className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-white mb-4">Kernbausteine</h3>
              <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc list-inside">
                {c.sections.features.clusters.flatMap(cluster => cluster.items).map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-white mb-4">Betriebsmodelle</h3>
              <ul className="space-y-2 text-sm text-text-secondary leading-relaxed list-disc list-inside">
                <li>On‑Prem / Sovereign Cloud (lokale Kontrolle)</li>
                <li>Konfigurierbare Datenresidenz</li>
                <li>Erweiterbar via Plug‑in Layer</li>
                <li>Observability & Kosten‑Transparenz integriert</li>
                <li>Klare Upgrade‑ & Migrationspfade</li>
              </ul>
            </div>
          </div>

          <div id="architecture" className="bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 rounded-2xl p-8 my-12">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">{c.sections.architecture.title}</h3>
            {c.sections.architecture.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-text-secondary leading-relaxed mb-3">{p}</p>
            ))}
            <p className="text-sm text-text-secondary leading-relaxed italic">{c.sections.architecture.roadmapNote}</p>
          </div>

          <div id="open-source" className="p-8 rounded-2xl border border-border-primary dark:border-white/10 bg-gradient-to-tr from-bg-primary dark:from-bg-dark to-bg-primary dark:to-bg-darker">
            <h3 className="text-lg font-semibold text-text-light dark:text-white mb-3">{c.sections.openSource.title}</h3>
            <p className="text-sm text-text-secondary mb-3">Wir glauben an offene Innovation. Deshalb wird VAE Core als Open Source veröffentlicht — {c.sections.openSource.releaseEstimate}.</p>
            <ul className="list-disc list-inside text-sm text-text-secondary space-y-2 mb-4">
              {c.sections.openSource.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <div className="mt-4">
              <span className="inline-block px-3 py-2 rounded bg-vae-turquoise/10 text-vae-turquoise text-sm font-medium">{c.sections.openSource.ctaNote}</span>
            </div>
          </div>

          <div className="bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 rounded-2xl p-8 mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-vae-turquoise mb-4">Kontext & Referenzen</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">Reports betonen: Ohne durchgängige Sichtbarkeit & Governance scheitert Skalierung häufig an Sicherheits‑ & Compliance‑Fragen. Ein konsistenter Plattform‑Layer reduziert Reibung zwischen Entwicklung & Betrieb.</p>
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

          <div id="cta" className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/products/vae-core#open-source" className="btn-primary">{c.cta.openSourceLabel}</Link>
            <Link to="/contact" className="btn-secondary">{c.cta.enterpriseLabel}</Link>
            <Link to="/contact" className="btn-ghost">{c.cta.demoLabel}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductVaeCorePage
