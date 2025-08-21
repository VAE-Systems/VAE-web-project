import React from 'react'
import MaterialIcon from '../ui/MaterialIcon'

interface DimensionCard {
  key: string
  label: string
  icon: string
  vae: string
  diff: string
}

// Vereinfachte, lesbare Matrix: Fokus auf Vorteil + kurzer Vergleichssatz
const dimensions: DimensionCard[] = [
  { key:'arch', label:'Architektur', icon:'architecture', vae:'Modularer Open-Source Stack mit klaren Integrationspunkten.', diff:'Alternativen oft Plattform-zentriert oder projektweise gewachsen.' },
  { key:'enablement', label:'Enablement', icon:'school', vae:'Artefakte, Runbooks & Übergabe früh eingebaut.', diff:'Übergabe / Dokumentation häufig nach Projektende.' },
  { key:'messbarkeit', label:'Messbarkeit', icon:'analytics', vae:'KPIs & Evaluierung ab Start (Retrieval, Qualität, Kosten).', diff:'Metriken später / begrenzt konfigurierbar.' },
  { key:'lockin', label:'Lock‑in', icon:'link_off', vae:'Austauschbare Komponenten – niedriger Lock‑in.', diff:'Proprietäre Abhängigkeiten oder Know-how extern.' },
  { key:'betrieb', label:'Betrieb & Observability', icon:'monitoring', vae:'Tracing, Logs & Guardrails integriert.', diff:'Oft nur Basis-Logs / zusätzliche Werkzeuge nötig.' },
  { key:'skalierung', label:'Skalierung', icon:'trending_up', vae:'Skalierbar über modulare Services & Adapterschicht.', diff:'Refactoring bei Wachstum häufiger nötig.' },
  { key:'kosten', label:'Kosten Transparenz', icon:'euro', vae:'Frühe Total Cost Sicht & Nutzungsmetriken.', diff:'Folgekosten bei Änderungen schwer früh sichtbar.' },
  { key:'sicherheit', label:'Security & Governance', icon:'security', vae:'Rollen, Policies & Compliance früh adressiert.', diff:'Security Aspekte nachgelagert ergänzt.' }
]

const ProviderComparisonSection: React.FC<{ id?: string; className?: string; headline?: string; subtitle?: string }> = ({ id='anbieter-vergleich', className='', headline='Vergleich auf einen Blick', subtitle='Warum VAE Systems – komprimierte Kerndimensionen.' }) => {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container-vae max-w-6xl">
        <header className="max-w-3xl mb-12">
          <h2 className="h2 text-white mb-5">{headline}</h2>
          <p className="text-lg text-text-secondary leading-relaxed">{subtitle}</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {dimensions.map(d => (
            <div key={d.key} className="group relative p-6 rounded-2xl bg-white/[0.035] border border-white/10 backdrop-blur-sm overflow-hidden transition-colors hover:border-vae-turquoise/40">
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.12),transparent_70%)]" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <MaterialIcon icon={d.icon} size={22} className="text-vae-turquoise" />
                <h3 className="text-sm font-semibold text-white tracking-wide uppercase">{d.label}</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-3 relative z-10">{d.vae}</p>
              <div className="flex items-start gap-2 text-[11px] text-text-muted relative z-10">
                <MaterialIcon icon="compare_arrows" size={16} className="text-vae-turquoise/70 mt-0.5" />
                <span>{d.diff}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted max-w-3xl">Hinweis: Muster – einzelne Anbieter können einzelne Punkte ebenfalls erfüllen. Ziel: schnelle Orientierung ohne Tabellen-Overload.</p>
      </div>
    </section>
  )
}

export default ProviderComparisonSection
