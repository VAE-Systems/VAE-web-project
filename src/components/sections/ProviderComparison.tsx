import React, { useState } from 'react'
import MaterialIcon from '../ui/MaterialIcon'

interface ComparisonRow {
  key: string
  label: string
  icon: string
  vae: string
  diff: string
}

// Vereinfachte, lesbare Matrix: Fokus auf Vorteil + kurzer Vergleichssatz
export const rows: ComparisonRow[] = [
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
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => setOpen(prev => (prev === key ? null : key))

  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container-vae max-w-6xl">
        <header className="max-w-3xl mb-12">
          <h2 className="h2 text-text-light dark:text-white mb-5">{headline}</h2>
          <p className="text-lg text-text-secondary leading-relaxed">{subtitle}</p>
        </header>

        {/* Accordion for small screens */}
        <div className="md:hidden mb-10 divide-y divide-border-primary dark:divide-white/10 border border-border-primary dark:border-white/10 rounded-xl">
          {rows.map(r => {
            const isOpen = open === r.key
            return (
              <div key={r.key}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(r.key)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <MaterialIcon icon={r.icon} size={22} className="text-vae-turquoise" />
                    <span className="text-sm font-semibold text-text-light dark:text-white tracking-wide uppercase">{r.label}</span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`text-vae-turquoise transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-[13px] text-text-secondary">
                    <p className="mb-2">{r.vae}</p>
                    <div className="flex items-start gap-2 text-[11px] text-text-muted">
                      <MaterialIcon icon="compare_arrows" size={16} className="text-vae-turquoise/70 mt-0.5" />
                      <span>{r.diff}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Grid for md and up */}
        <div className="hidden md:block mb-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rows.map(d => (
              <div key={d.key} className="group relative p-6 rounded-2xl bg-bg-primary/10 dark:bg-white/[0.035] border border-border-primary/10 dark:border-white/10 backdrop-blur-sm overflow-hidden transition-colors hover:border-vae-turquoise/40">
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.12),transparent_70%)]" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <MaterialIcon icon={d.icon} size={22} className="text-vae-turquoise" />
                  <h3 className="text-sm font-semibold text-text-light dark:text-white tracking-wide uppercase">{d.label}</h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-3 relative z-10">{d.vae}</p>
                <div className="flex items-start gap-2 text-[11px] text-text-muted relative z-10">
                  <MaterialIcon icon="compare_arrows" size={16} className="text-vae-turquoise/70 mt-0.5" />
                  <span>{d.diff}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-text-muted max-w-3xl">Hinweis: Muster – einzelne Anbieter können einzelne Punkte ebenfalls erfüllen. Ziel: schnelle Orientierung ohne Tabellen-Overload.</p>
      </div>
    </section>
  )
}

export default ProviderComparisonSection
