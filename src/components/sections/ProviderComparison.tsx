import React from 'react'

interface ComparisonRow {
  key: string
  label: string
  vae: string
  agency: string
  lowcode: string
}

const rows: ComparisonRow[] = [
  { key:'depth', label:'Technische Tiefe', vae:'Architektur, Code & Infrastruktur (Retrieval, Pipelines, Observability).', agency:'Konzept + Workflow-Konfiguration, begrenzte System-Ebene.', lowcode:'Visuelle Flows innerhalb Plattform-Grenzen.' },
  { key:'arch', label:'Architektur & Skalierbarkeit', vae:'Modular (Adapter, Schnittstellen, Open Source).', agency:'Projektbezogene Strukturen, spätere Skalierung oft neu.', lowcode:'Skalierung abhängig von Plattform-Limits.' },
  { key:'focus', label:'Fokus', vae:'Langfristige Betriebsfähigkeit & Ownership.', agency:'Projektabschluss / Launch als primärer Meilenstein.', lowcode:'Schneller Prototyp / kurzfristige Entlastung.' },
  { key:'reuse', label:'Reuse & Open Source', vae:'Gezielter Reuse + dokumentierte OSS-Komponenten.', agency:'Teilweise Reuse, weniger tiefe Dokumentation.', lowcode:'Proprietäre vorgefertigte Bausteine.' },
  { key:'metrics', label:'Messbarkeit & Observability', vae:'Frühe KPIs, Guardrails, Dashboards, Logs & Traces.', agency:'Reporting nach Implementierung, operative Metriken begrenzt.', lowcode:'Plattform-Standard-Logs / Basis-Dashboards.' },
  { key:'handover', label:'Übergabe & Dokumentation', vae:'Runbooks, Architektur-Skizzen, Evaluierungs-Sets.', agency:'Projekt-Dokumentation variiert, Betrieb teils extern.', lowcode:'Kaum tiefe System-Doku, Plattform UI als Referenz.' },
  { key:'future', label:'Erweiterbarkeit / Zukunftsfähigkeit', vae:'Update-fähige Module + klare Integrationspunkte.', agency:'Nachträgliches Refactoring häufiger nötig.', lowcode:'Neue Anforderungen → Workarounds / Plattformwechsel.' },
  { key:'costs', label:'Kostenstruktur langfristig', vae:'Planbare Opex (Transparenz: Latenz & Token / Nutzung).', agency:'Zusatzkosten bei Erweiterungen / Change Requests.', lowcode:'Abonnement + evtl. steigende Transaktionsgebühren.' },
  { key:'lockin', label:'Lock‑in Risiko', vae:'Niedrig (Open-first, austauschbare Komponenten).', agency:'Mittel – Know-how liegt extern.', lowcode:'Höher – gebunden an Plattform.' },
  { key:'security', label:'Sicherheit & Governance', vae:'Rollenmodell, Auditability & Data Scoping eingeplant.', agency:'Security-Aspekte nachgelagert integrierbar.', lowcode:'Plattform-Vorgaben, eingeschränkte Feinanpassung.' }
]

const ProviderComparisonSection: React.FC<{ id?: string; className?: string; headline?: string; subtitle?: string }> = ({ id='anbieter-vergleich', className='', headline='Vergleich: VAE Systems & typische Alternativen', subtitle='Orientierung – Muster & häufige Unterschiede. Ausnahmen existieren.' }) => {
  return (
    <section id={id} className={`py-28 ${className}`}>      
      <div className="container-vae max-w-6xl">
        <header className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-5xl font-bold heading-fix text-white mb-6">{headline}</h2>
          <p className="text-lg text-text-secondary leading-relaxed">{subtitle}</p>
        </header>
        <div className="overflow-x-auto -mx-2 px-2">
          <div className="min-w-[900px] rounded-2xl border border-white/10 bg-white/[0.03] relative">
            <div className="grid grid-cols-[180px_repeat(3,1fr)] text-[11px] uppercase tracking-wide text-text-muted/70">
              <div className="p-3 border-b border-white/10">Kriterium</div>
              <div className="p-3 border-b border-white/10 font-semibold text-white">VAE Systems</div>
              <div className="p-3 border-b border-white/10 font-semibold text-white">Generische Automations-Agentur</div>
              <div className="p-3 border-b border-white/10 font-semibold text-white">Low-Code / Plattform Fokus</div>
            </div>
            {rows.map((r) => (
              <div key={r.key} className="grid grid-cols-[180px_repeat(3,1fr)] border-t border-white/5 last:rounded-b-2xl">
                <div className="p-4 text-[11px] font-medium text-text-muted/80 bg-white/2">{r.label}</div>
                {[r.vae, r.agency, r.lowcode].map((val,ci) => (
                  <div key={ci} className="p-4 text-xs leading-relaxed text-text-secondary relative group">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{background:'radial-gradient(420px circle at 25% 30%, rgba(0,255,165,0.12), transparent 70%)'}} />
                    <span className="relative z-10 block">{val}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="pointer-events-none absolute top-[42px] bottom-0 left-[180px] w-px bg-white/5" />
            <div className="pointer-events-none absolute top-[42px] bottom-0 left-[calc(180px+33.333%)] w-px bg-white/5" />
            <div className="pointer-events-none absolute top-[42px] bottom-0 left-[calc(180px+66.666%)] w-px bg-white/5" />
          </div>
          <p className="mt-6 text-[11px] text-text-muted max-w-3xl">Hinweis: Darstellung zeigt typische Muster – einzelne Anbieter können davon abweichen. Ziel: schnelle Orientierung für Auswahl & Erwartungsmanagement.</p>
        </div>
      </div>
    </section>
  )
}

export default ProviderComparisonSection
