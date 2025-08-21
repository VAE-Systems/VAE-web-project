import React from 'react'
import ProductsSection from '../sections/ProductsSection'
import ProductsHeroSection from '../sections/ProductsHeroSection'
import Seo from '../ui/Seo'
const FAQSection = React.lazy(() => import('../sections/FAQSection'))

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Produkte & Plattform – VAE Systems',
    about: 'Komplettlösungen, Applikationen, Plattform (VAE CORE) und Showcases',
    isPartOf: { '@type': 'WebSite', name: 'VAE Systems', url: 'https://www.vae-systems.com' }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vae-systems.com/' },
      { '@type': 'ListItem', position: 2, name: 'Produkte & Plattform', item: 'https://www.vae-systems.com/products' }
    ]
  }
]

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh]">
      <Seo
        title="Produkte & Plattform | VAE Systems – Lösungen, Module, Plattform"
        description="VAE Systems Produkt-Suite: Komplettlösungen, Applikationen, VAE Core Plattform und reale Showcases. Modular, nachvollziehbar, souverän betreibbar."
        canonicalPath="/products"
        jsonLd={jsonLd}
      />
      <ProductsHeroSection />
      {/* Additional overview content (textual depth for SEO & Nutzerorientierung) */}
      <section className="py-24 border-b border-white/5 bg-gradient-to-b from-bg-dark to-bg-darker/70">
        <div className="container-vae max-w-5xl space-y-20">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Typische Startpunkte</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[{
                t: 'Conversational Access',
                d: 'Re:spond bündelt Retrieval, Moderation, Evaluierung & Monitoring – Einstieg wenn Chat‑/Assistenzfunktion mit Auditierbarkeit benötigt wird.'
              }, {
                t: 'Dokumenten & Wissensraum',
                d: 'VAE Core + Docs‑Lens (Preview) für strukturierte semantische Suche mit Zugriffsklassen & Index-Strategien.'
              }, {
                t: 'Betriebsautomatisierung',
                d: 'Workflow orchestrieren (Temporal kompatibel) + Ops‑Copilot für wiederkehrende Runbook‑Schritte.'
              }].map(c => (
                <div key={c.t} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-2">{c.t}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Warum eine modulare Suite?</h2>
            <p className="text-text-secondary leading-relaxed">Viele Organisationen starten mit einzelnen Skripten oder isolierten Proofs-of-Concept. Später zeigen sich Brüche: fehlende Observability, schwer reproduzierbare Datenaufbereitung, heterogene Rechte-Logik. Unsere Suite ist bewusst so strukturiert, dass Sie an dem Punkt einsteigen können, der Ihren Reifegrad abholt – ohne spätere Migrationen zu erschweren.</p>
            <ul className="list-disc list-inside text-sm text-text-muted space-y-2">
              <li>Komplettlösungen: wenn Geschwindigkeit + Betriebssicherheit kritisch sind</li>
              <li>Applikationen & Module: gezielte Lücken schließen statt Neuaufbau</li>
              <li>VAE Core: zentrales semantisches Fundament & Governance Layer</li>
              <li>Showcases: verifizierbare Beispiele & Integrationsmuster</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Leitprinzipien</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                <p><span className="text-white font-medium">Transparenz:</span> Schnittstellen & Konfiguration nachvollziehbar; keine verdeckten Abhängigkeiten in proprietären Diensten.</p>
                <p><span className="text-white font-medium">Schrittweise Einführung:</span> Jede Ebene (Lösung, Modul, Plattform) kann isoliert Mehrwert liefern und später vertieft werden.</p>
                <p><span className="text-white font-medium">Souveränität:</span> On‑Prem & Sovereign Cloud fähig; austauschbare Speicher- & Index‑Adapter.</p>
              </div>
              <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                <p><span className="text-white font-medium">Betriebsfähigkeit:</span> Observability, Metriken & Audit-Pfade als First-Class – nicht nachträglich ergänzt.</p>
                <p><span className="text-white font-medium">Ethische Robustheit:</span> Governance‑Artefakte (Zugriff, Versionierung, Evaluierung) klar dokumentierbar.</p>
                <p><span className="text-white font-medium">Design für Migration:</span> Entscheidungen minimieren Lock‑in & ermöglichen Austausch einzelner Komponenten.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductsSection />
      <React.Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
        <FAQSection
        id="products-faq"
        className="bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker/90 border-t border-white/5"
        title="Produkte – häufige Fragen"
        subtitle="Einordnung von Modularität, Plattform & Betrieb." 
        categories={[
          { category: 'Modularität', questions: [
            { question: 'Muss ich VAE CORE komplett einführen?', answer: 'Nein. Einzelne Module (z.B. Retrieval Hub) können isoliert starten und später integriert erweitert werden.' },
            { question: 'Unterschied Lösung vs. Modul?', answer: 'Lösung = Ende‑zu‑Ende Use Case (z.B. Conversational Access). Modul = fokussierte Funktion (Index Layer, Evaluierung).' },
            { question: 'Showcases produktiv nutzbar?', answer: 'Sie sind gehärtete Referenzen. Anpassung auf Domäne / Governance erfolgt projektbezogen.' }
          ]},
          { category: 'Technik', questions: [
            { question: 'Welche Persistenz / Index Optionen?', answer: 'Austauschbare Adapter (pgvector, Milvus, Weaviate, lokale Embedding Caches). Auswahl nach Latenz + Betriebsmodell.' },
            { question: 'Upgrade Weg?', answer: 'Semantische Versionierung + Migrationsskripte. Fokus: keine disruptive Re‑Implementierung.' },
            { question: 'Vendor Lock‑in Risiko?', answer: 'Minimiert durch offene Schnittstellen, keine verpflichtenden proprietären SaaS Calls.' }
          ]},
          { category: 'Betrieb & Lizenz', questions: [
            { question: 'Lizenzmodell?', answer: 'Transparente Source – kommerzielle Erweiterung für Support / SLA Ebenen. Kernfunktionen quelloffen nutzbar.' },
            { question: 'On‑Prem Support?', answer: 'Ja – Deployment Templates (Kubernetes / Bare Metal) + Observability Bundles.' },
            { question: 'Roadmap Transparenz?', answer: 'Öffentliche Milestone Overview + Early Access Kanal für bestehende Kunden.' }
          ]}
        ]}
      />
  </React.Suspense>
    </div>
  )
}

export default ProductsPage
