import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import SpotlightCard from '../ui/SpotlightCard'
import MaterialIcon from '../ui/MaterialIcon'
import ServicesHeroSection from '../sections/ServicesHeroSection'
import Seo from '../ui/Seo'
const FAQSection = React.lazy(() => import('../sections/FAQSection'))
/**
 * ServicesPage Component
 * 
 * Complete Services page with all sections according to the new concept
 */
const ServicesPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        if (heroRef.current) gsap.set(heroRef.current.children, { opacity: 1, y: 0 })
        return
      }
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out' }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  const categories = [
    { key:'trainings', title:'Schulungen', icon:'school', focus:'Wissenstransfer & Enablement – Teams schneller produktiv machen.', examples:['VAE CORE Admin-Schulung','Prompt Engineering Workshop','Datenarchitektur-Training'], to:'/services/trainings' },
    { key:'consulting', title:'Beratungen', icon:'handshake', focus:'Strategische Architektur-, Prozess- & Compliance-Begleitung.', examples:['KI-Integrations-Roadmap','Sicherheits- & Governance Audit','Machbarkeitsanalyse (EU AI Act / Data Act)'], to:'/services/consulting' },
  { key:'custom', title:'Custom Solutions', icon:'extension', focus:'Individuelle Software & Integrationen – gezielte Umsetzung statt Produktkatalog.', examples:['API-Connector Bestandssystem','Spezial-Workflow Automatisierung','Domain-spez. Retrieval Layer'], to:'/services/custom-solutions' }
  ]

  return (
    <div className="min-h-screen">
      <Seo
        title="Services | VAE Systems – Schulungen, Beratung, Individuelle Lösungen"
        description="Trainings, strategische Beratung & individuelle KI-/Automationslösungen. Von Analyse bis Umsetzung – souverän & nachvollziehbar."
        canonicalPath="/services"
        jsonLd={[{ '@context':'https://schema.org','@type':'CollectionPage', name:'VAE Services' }]}
      />
      <ServicesHeroSection innerRef={heroRef} />

      {/* Kategorie Grid */}
      <section id="categories" className="py-28 bg-bg-dark border-b border-white/5">
        <div className="container-vae max-w-7xl">
          <div className="grid md:grid-cols-3 gap-10">
            {categories.map(cat => (
              <SpotlightCard
                key={cat.key}
                title={cat.title}
                description={cat.focus}
                to={cat.to}
                cta="Mehr Details"
                iconSlot={<div className="w-14 h-14 rounded-xl bg-vae-turquoise/15 text-vae-turquoise flex items-center justify-center"><MaterialIcon icon={cat.icon} className="text-2xl" /></div>}
              >
                <ul className="list-disc list-inside">
                  {cat.examples.map(ex => <li key={ex}>{ex}</li>)}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Vergleich / Differenzierung Matrix */}
      <section className="py-28 bg-bg-dark border-b border-white/5" id="vergleich">
        <div className="container-vae max-w-6xl">
          <header className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-5xl font-bold heading-fix mb-6 text-gradient">Wann welches Format?</h2>
            <p className="text-text-secondary leading-relaxed text-lg">Schnell erkennbare Zuordnung: Wissen aufbauen, Richtung festlegen oder spezifisch umsetzen. Überlappungen bewusst minimal.</p>
          </header>
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-left text-[13px] md:text-sm border-collapse">
              <thead>
                <tr className="text-[10px] md:text-[11px] uppercase tracking-wide text-text-muted/80">
                  <th className="py-2 pr-4 font-medium text-left text-text-secondary/70 w-[150px]">Kriterium</th>
                  <th className="py-2 px-4 font-semibold text-white bg-white/[0.04] rounded-tl-xl">Trainings</th>
                  <th className="py-2 px-4 font-semibold text-white bg-white/[0.04]">Consulting</th>
                  <th className="py-2 px-4 font-semibold text-white bg-white/[0.04] rounded-tr-xl">Custom Solutions</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {[
                  { k:'Ziel', label:'Primäres Ziel', a:'Kompetenz & Routinen', b:'Entscheidung & Governance', c:'Produktiver Baustein' },
                  { k:'Output', label:'Greifbarer Output', a:'Unterlagen, Übungen, Cheatsheets', b:'Roadmap, Architektur, KPI/Risiko', c:'Software, Runbooks, Dashboards' },
                  { k:'Tiefe', label:'Technische Tiefe', a:'Fundament & Patterns', b:'Architektur & Optionen', c:'Implementierung & Integrationen' },
                  { k:'Dauer', label:'Typische Dauer', a:'1 Tag / Modul', b:'Tage – wenige Wochen', c:'Wochen – Inkremente' },
                  { k:'Team', label:'Interne Beteiligung', a:'Aktives Lernen', b:'Workshops & Entscheidungen', c:'Review + Co-Development' },
                  { k:'Metriken', label:'Messpunkte', a:'Lernziele / Übungserfolg', b:'Reifegrad, Risiko, TCO', c:'Qualität, Latenz, Kosten' },
                  { k:'Lockin', label:'Lock‑in Risiko', a:'Keins', b:'Sehr gering (Dokumente)', c:'Niedrig (Open-first Code)' }
                ].map((r,i,arr) => (
                  <tr key={r.k} className="border-b border-white/5 last:border-0">
                    <th scope="row" className="text-[10px] md:text-[11px] font-medium text-text-muted py-3 pr-4 text-left align-top w-[150px]">{r.label}</th>
                    <td className={`py-3 px-4 text-xs text-text-secondary bg-white/[0.035] border border-white/5 ${i===0 ? 'rounded-tl-xl' : ''} ${i===arr.length-1 ? 'rounded-bl-xl' : ''}`}>{r.a}</td>
                    <td className="py-3 px-4 text-xs text-text-secondary bg-white/[0.035] border border-white/5">{r.b}</td>
                    <td className={`py-3 px-4 text-xs text-text-secondary bg-white/[0.035] border border-white/5 ${i===0 ? 'rounded-tr-xl' : ''} ${i===arr.length-1 ? 'rounded-br-xl' : ''}`}>{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-[11px] text-text-muted max-w-4xl space-y-2">
            <p>Bereiche können separat gebucht oder in direktem Kontakt sinnvoll kombiniert werden – abhängig von Reifegrad & Zielbild.</p>
            <p className="text-text-secondary/70">Typische Sequenz: Klarheit (Consulting) → Enablement (Trainings) → Umsetzung spezifischer Bausteine (Custom Solutions).</p>
          </div>
        </div>
      </section>

      {/* Storytelling */}
      <section className="py-28 bg-bg-darker border-b border-white/5">
        <div className="container-vae max-w-5xl">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-bold heading-fix mb-6 text-gradient">Lifecycle statt Einzelleistung.</h2>
            <p className="text-text-secondary leading-relaxed mb-5 text-lg">Wir entwickeln nicht nur Software – wir begleiten den gesamten Lebenszyklus: Analyse, Architektur, Implementierung, Enablement, Betrieb & Übergabe. So entstehen keine „Abwurfprojekte“, sondern betreibbare Lösungen.</p>
            <p className="text-text-secondary leading-relaxed mb-5 text-sm">Trainings bauen interne Kompetenz auf, Consulting schafft Klarheit & Richtung, Custom Solutions liefern präzise Bausteine oder vollständige Automationspfade – kombinierbar nach Reifegrad.</p>
            <p className="text-text-secondary leading-relaxed text-sm">Plattform‑ & Lizenzangebote unter <Link to="/products" className="text-vae-turquoise hover:underline">Products</Link>. Services adressieren Ihren spezifischen Kontext.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{h:'Enablement',b:['Team handlungsfähig','Reduktion externer Abhängigkeit','Dokumentierte Artefakte']},{h:'Governance & Compliance',b:['Frühe AI Act Orientierung','Sicherheitsmodell klar','Transparente Audits']},{h:'Umsetzung',b:['Fokus reale Engpässe','Messbare Qualitätskriterien','Souveräner Betrieb']}].map(col => (
              <div key={col.h} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">{col.h}</h3>
                <ul className="text-xs text-text-secondary space-y-1 leading-relaxed list-disc list-inside">{col.b.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-bg-dark">
        <div className="container-vae max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold heading-fix mb-6 text-text-light">Nächster Schritt?</h2>
          <p className="text-lg text-text-secondary mb-10">Senden Sie uns Kernziel, Zeithorizont & vorhandene Systeme – wir melden uns innerhalb von 24h mit einem Vorschlag für das Erstgespräch.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary px-10 py-4">Kontakt aufnehmen</Link>
            <a href="/service-katalog.pdf" className="btn-secondary px-10 py-4" target="_blank" rel="noopener">Service-Katalog (PDF)</a>
          </div>
          <p className="mt-6 text-xs text-text-muted">PDF ist Vorab-Version – Inhalte können sich ändern.</p>
        </div>
      </section>

      {/* FAQ Section (Services Fokus) */}
      <React.Suspense fallback={<div className="py-24 text-center text-text-muted text-sm">Lade FAQ…</div>}>
        <FAQSection
          id="services-faq"
          className="bg-gradient-to-b from-bg-darker to-bg-dark/90 border-t border-white/5"
          title="Services – häufige Fragen"
          subtitle="Klarheit zu Umfang, Ablauf und Betrieb." 
          categories={[
            { category: 'Ablauf', questions: [
              { question: 'Wie startet ein Services-Projekt?', answer: 'Kurz-Workshop (Ziel, Restriktionen, vorhandene Systeme), dann definierter Explorations- / Architektur-Sprint mit klaren Artefakten.' },
              { question: 'Fixed Scope oder agil?', answer: 'Hybrid: definierte Kernziele + priorisierte Backlog-Optionen. Jede Iteration liefert überprüfbaren Mehrwert.' },
              { question: 'Remote oder vor Ort?', answer: 'Primär remote, kritische Architektur- oder Enablement-Sessions optional vor Ort.' }
            ]},
            { category: 'Leistungstiefe', questions: [
              { question: 'Nur Consulting möglich?', answer: 'Ja. Reine Architektur-/Governance Begleitung ohne Implementierung ist möglich – aber Integration & Enablement erhöhen Nachhaltigkeit.' },
              { question: 'Hand Over Strategie?', answer: 'Früh dokumentierte Artefakte, Playbooks, Trainings. Ziel: internes Team kann Betrieb / Erweiterung souverän übernehmen.' },
              { question: 'Toolchain Vorgaben?', answer: 'Wir adaptieren existierende Tooling-Landschaften sofern sie Transparenz & Reproduzierbarkeit erlauben.' }
            ]},
              { category: 'Betrieb', questions: [
              { question: 'Nach Projekt Support?', answer: 'On-Demand Sprints, SLA für kritische Pfade oder Transfer-Begleitung bis definierter Reifegrad erreicht.' },
              { question: 'Kostenkontrolle?', answer: 'Offene Kostentreiber identifiziert (Inference, Index, Orchestrierung). Metriken & Budget-Alerts optional integrierbar.' },
              { question: 'Sicherheitsmodell?', answer: 'Rollen / Zugriff + Audit Logging + Evaluationspfade werden nicht nachträglich ergänzt, sondern konzeptionell vorgezogen.' }
            ]}
          ]}
        />
      </React.Suspense>
    </div>
  )
}

export default ServicesPage
