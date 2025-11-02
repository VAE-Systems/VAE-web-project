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
  {
    key: 'arch',
    label: 'Architektur',
    icon: 'architecture',
    vae: 'Modularer Open-Source Stack mit klaren Integrationspunkten.',
    diff: 'Alternativen oft Plattform-zentriert oder projektweise gewachsen.',
  },
  {
    key: 'enablement',
    label: 'Enablement',
    icon: 'school',
    vae: 'Artefakte, Runbooks & Übergabe früh eingebaut.',
    diff: 'Übergabe / Dokumentation häufig nach Projektende.',
  },
  {
    key: 'messbarkeit',
    label: 'Messbarkeit',
    icon: 'analytics',
    vae: 'KPIs & Evaluierung ab Start (Retrieval, Qualität, Kosten).',
    diff: 'Metriken später / begrenzt konfigurierbar.',
  },
  {
    key: 'lockin',
    label: 'Lock‑in',
    icon: 'link_off',
    vae: 'Austauschbare Komponenten – niedriger Lock‑in.',
    diff: 'Proprietäre Abhängigkeiten oder Know-how extern.',
  },
  {
    key: 'betrieb',
    label: 'Betrieb & Observability',
    icon: 'monitoring',
    vae: 'Tracing, Logs & Guardrails integriert.',
    diff: 'Oft nur Basis-Logs / zusätzliche Werkzeuge nötig.',
  },
  {
    key: 'skalierung',
    label: 'Skalierung',
    icon: 'trending_up',
    vae: 'Skalierbar über modulare Services & Adapterschicht.',
    diff: 'Refactoring bei Wachstum häufiger nötig.',
  },
  {
    key: 'kosten',
    label: 'Kosten Transparenz',
    icon: 'euro',
    vae: 'Frühe Total Cost Sicht & Nutzungsmetriken.',
    diff: 'Folgekosten bei Änderungen schwer früh sichtbar.',
  },
  {
    key: 'sicherheit',
    label: 'Security & Governance',
    icon: 'security',
    vae: 'Rollen, Policies & Compliance früh adressiert.',
    diff: 'Security Aspekte nachgelagert ergänzt.',
  },
]

const ProviderComparisonSection: React.FC<{
  id?: string
  className?: string
  headline?: string
  subtitle?: string
}> = ({
  id = 'anbieter-vergleich',
  className = '',
  headline = 'Vergleich auf einen Blick',
  subtitle = 'Warum VAE Systems – komprimierte Kerndimensionen.',
}) => {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => setOpen(prev => (prev === key ? null : key))

  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="container-vae max-w-6xl">
        <header className="mb-12 max-w-3xl">
          <h2 className="h2 mb-5 text-text-light dark:text-white">{headline}</h2>
          <p className="text-lg leading-relaxed text-text-secondary">{subtitle}</p>
        </header>

        {/* Accordion for small screens */}
        <div className="divide-border-primary border-border-primary mb-10 divide-y rounded-xl border dark:divide-white/10 dark:border-white/10 md:hidden">
          {rows.map(r => {
            const isOpen = open === r.key
            return (
              <div key={r.key}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(r.key)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <MaterialIcon icon={r.icon} size={22} className="text-vae-turquoise" />
                    <span className="text-sm font-semibold uppercase tracking-wide text-text-light dark:text-white">
                      {r.label}
                    </span>
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`text-vae-turquoise transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-[13px] text-text-secondary">
                    <p className="mb-2">{r.vae}</p>
                    <div className="flex items-start gap-2 text-[11px] text-text-muted">
                      <MaterialIcon icon="compare_arrows" size={16} className="mt-0.5 text-vae-turquoise/70" />
                      <span>{r.diff}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Grid for md and up */}
        <div className="mb-10 hidden md:block">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map(d => (
              <div
                key={d.key}
                className="bg-bg-primary/10 border-border-primary/10 group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-colors hover:border-vae-turquoise/40 dark:border-white/10 dark:bg-white/[0.035]"
              >
                <div className="pointer-events-none absolute -inset-px bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 mb-4 flex items-center gap-3">
                  <MaterialIcon icon={d.icon} size={22} className="text-vae-turquoise" />
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-text-light dark:text-white">
                    {d.label}
                  </h3>
                </div>
                <p className="relative z-10 mb-3 text-xs leading-relaxed text-text-secondary">{d.vae}</p>
                <div className="relative z-10 flex items-start gap-2 text-[11px] text-text-muted">
                  <MaterialIcon icon="compare_arrows" size={16} className="mt-0.5 text-vae-turquoise/70" />
                  <span>{d.diff}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="max-w-3xl text-[11px] text-text-muted">
          Hinweis: Muster – einzelne Anbieter können einzelne Punkte ebenfalls erfüllen. Ziel: schnelle Orientierung
          ohne Tabellen-Overload.
        </p>
      </div>
    </section>
  )
}

export default ProviderComparisonSection
