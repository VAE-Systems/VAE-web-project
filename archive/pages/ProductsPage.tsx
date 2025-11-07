import React from 'react'
import Breadcrumbs from '../../src/components/navigation/Breadcrumbs'
import ProductsHeroSection from '../../src/components/sections/ProductsHeroSection'
import ProductsSection from '../../src/components/sections/ProductsSection'
import Seo from '../../src/components/ui/Seo'
const FAQSection = React.lazy(() => import('../../src/components/sections/FAQSection'))

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Consulting Solutions – VAE Systems',
    about: 'Infrastruktur-Setup, AI-Optimierung, Betreuung und VAE CORE',
    isPartOf: { '@type': 'WebSite', name: 'VAE Systems', url: 'https://www.vae-systems.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vae-systems.com/' },
      { '@type': 'ListItem', position: 2, name: 'Consulting Solutions', item: 'https://www.vae-systems.com/solutions' },
    ],
  },
]

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Consulting Solutions | VAE Systems"
        description="Lösungen und Pakete für Infrastruktur-Setup, AI-Optimierung und Betreuung – kombiniert mit VAE CORE für maximale Souveränität."
        canonicalPath="/solutions"
        jsonLd={jsonLd}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Consulting Solutions', path: '/solutions' },
        ]}
      />
      <ProductsHeroSection />
      {/* Additional overview content (textual depth for SEO & Nutzerorientierung) */}
      <section className="border-border-primary/5 from-bg-primary to-bg-primary/70 border-b bg-gradient-to-b py-24 dark:border-white/5 dark:from-bg-dark dark:to-bg-darker/70">
        <div className="container-vae max-w-5xl space-y-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-text-light dark:text-white md:text-3xl">Typische Startpunkte</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  t: 'Conversational Access',
                  d: 'Re:spond bündelt Retrieval, Moderation, Evaluierung & Monitoring – Einstieg wenn Chat‑/Assistenzfunktion mit Auditierbarkeit benötigt wird.',
                },
                {
                  t: 'Dokumenten & Wissensraum',
                  d: 'VAE Core + Docs‑Lens (Preview) für strukturierte semantische Suche mit Zugriffsklassen & Index-Strategien.',
                },
                {
                  t: 'Betriebsautomatisierung',
                  d: 'Workflow orchestrieren (Temporal kompatibel) + Ops‑Copilot für wiederkehrende Runbook‑Schritte.',
                },
              ].map(c => (
                <div
                  key={c.t}
                  className="bg-bg-primary/5 border-border-primary rounded-2xl border p-6 dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="mb-2 text-sm font-semibold text-text-light dark:text-white">{c.t}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-text-light dark:text-white md:text-3xl">
              Warum eine modulare Suite?
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Viele Organisationen starten mit einzelnen Skripten oder isolierten Proofs-of-Concept. Später zeigen sich
              Brüche: fehlende Observability, schwer reproduzierbare Datenaufbereitung, heterogene Rechte-Logik. Unsere
              Suite ist bewusst so strukturiert, dass Sie an dem Punkt einsteigen können, der Ihren Reifegrad abholt –
              ohne spätere Migrationen zu erschweren.
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm text-text-muted">
              <li>Komplettlösungen: wenn Geschwindigkeit + Betriebssicherheit kritisch sind</li>
              <li>Applikationen & Module: gezielte Lücken schließen statt Neuaufbau</li>
              <li>VAE Core: zentrales semantisches Fundament & Governance Layer</li>
              <li>Showcases: verifizierbare Beispiele & Integrationsmuster</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-text-light dark:text-white md:text-3xl">Leitprinzipien</h2>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
                <p>
                  <span className="font-medium text-text-light dark:text-white">Transparenz:</span> Schnittstellen &
                  Konfiguration nachvollziehbar; keine verdeckten Abhängigkeiten in proprietären Diensten.
                </p>
                <p>
                  <span className="font-medium text-text-light dark:text-white">Schrittweise Einführung:</span> Jede
                  Ebene (Lösung, Modul, Plattform) kann isoliert Mehrwert liefern und später vertieft werden.
                </p>
                <p>
                  <span className="font-medium text-text-light dark:text-white">Souveränität:</span> On‑Prem & Sovereign
                  Cloud fähig; austauschbare Speicher- & Index‑Adapter.
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
                <p>
                  <span className="font-medium text-text-light dark:text-white">Betriebsfähigkeit:</span> Observability,
                  Metriken & Audit-Pfade als First-Class – nicht nachträglich ergänzt.
                </p>
                <p>
                  <span className="font-medium text-text-light dark:text-white">Ethische Robustheit:</span>{' '}
                  Governance‑Artefakte (Zugriff, Versionierung, Evaluierung) klar dokumentierbar.
                </p>
                <p>
                  <span className="font-medium text-text-light dark:text-white">Design für Migration:</span>{' '}
                  Entscheidungen minimieren Lock‑in & ermöglichen Austausch einzelner Komponenten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductsSection />
      <React.Suspense fallback={<div className="py-24 text-center text-sm text-text-muted">Lade FAQ…</div>}>
        <FAQSection
          id="products-faq"
          className="border-border-primary border-t bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker/90 dark:border-white/5"
          title="Produkte – häufige Fragen"
          subtitle="Einordnung von Modularität, Plattform & Betrieb."
          categories={[
            {
              category: 'Modularität',
              questions: [
                {
                  question: 'Muss ich VAE CORE komplett einführen?',
                  answer:
                    'Nein. Einzelne Module (z.B. Retrieval Hub) können isoliert starten und später integriert erweitert werden.',
                },
                {
                  question: 'Unterschied Lösung vs. Modul?',
                  answer:
                    'Lösung = Ende‑zu‑Ende Use Case (z.B. Conversational Access). Modul = fokussierte Funktion (Index Layer, Evaluierung).',
                },
                {
                  question: 'Showcases produktiv nutzbar?',
                  answer: 'Sie sind gehärtete Referenzen. Anpassung auf Domäne / Governance erfolgt projektbezogen.',
                },
              ],
            },
            {
              category: 'Technik',
              questions: [
                {
                  question: 'Welche Persistenz / Index Optionen?',
                  answer:
                    'Austauschbare Adapter (pgvector, Milvus, Weaviate, lokale Embedding Caches). Auswahl nach Latenz + Betriebsmodell.',
                },
                {
                  question: 'Upgrade Weg?',
                  answer: 'Semantische Versionierung + Migrationsskripte. Fokus: keine disruptive Re‑Implementierung.',
                },
                {
                  question: 'Vendor Lock‑in Risiko?',
                  answer: 'Minimiert durch offene Schnittstellen, keine verpflichtenden proprietären SaaS Calls.',
                },
              ],
            },
            {
              category: 'Betrieb & Lizenz',
              questions: [
                {
                  question: 'Lizenzmodell?',
                  answer:
                    'Transparente Source – kommerzielle Erweiterung für Support / SLA Ebenen. Kernfunktionen quelloffen nutzbar.',
                },
                {
                  question: 'On‑Prem Support?',
                  answer: 'Ja – Deployment Templates (Kubernetes / Bare Metal) + Observability Bundles.',
                },
                {
                  question: 'Roadmap Transparenz?',
                  answer: 'Öffentliche Milestone Overview + Early Access Kanal für bestehende Kunden.',
                },
              ],
            },
          ]}
        />
      </React.Suspense>
    </div>
  )
}

export default ProductsPage
