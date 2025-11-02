import React from 'react'
import Icon from '@/components/ui/Icon'
import { miniTagline, miniSubline, miniOutcomes, miniProcess, miniMetrics } from '../../content/aboutMini'

// Visuell verstärkte Mini-About Sektion (Teaser)
// Fokus: Klarer Header, stärkerer Kontrast, leichte Tiefen- & Hover-Effekte, strukturierte Prozess-Darstellung
const AboutMiniSection: React.FC = () => {
  return (
    <section
      id="about"
      className="from-bg-primary to-bg-primary relative overflow-hidden bg-gradient-to-br via-bg-secondary py-28 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker md:py-36"
      aria-labelledby="about-mini-heading"
    >
      {/* Layered background accents - neutral and subtle */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(0,0,0,0.08),transparent_60%)] opacity-30 dark:bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.06),transparent_65%)] opacity-20 dark:bg-[radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.03),transparent_65%)]" />
        <div className="dark:from-white/3 absolute -top-32 left-1/2 h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/5 via-transparent to-transparent blur-3xl dark:via-transparent dark:to-transparent" />
      </div>

      <div className="container-vae relative">
        {/* Heading Block */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <h2 id="about-mini-heading" className="h2 heading-gradient mb-6 tracking-tight">
            {miniTagline}
          </h2>
          <p className="mx-auto max-w-3xl text-xl font-light leading-relaxed text-text-secondary/90 md:text-2xl">
            {miniSubline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-wide text-text-secondary/80 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary/70">
              Open Source First
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-wide text-text-secondary/80 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary/70">
              On‑Prem Ready
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-wide text-text-secondary/80 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary/70">
              Governance integriert
            </span>
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-24 grid gap-10 md:grid-cols-2">
          {miniOutcomes.map(o => (
            <div
              key={o.key}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-vae-turquoise/50 hover:bg-white/[0.08] hover:shadow-[0_12px_40px_-8px_rgba(var(--vae-turquoise-rgb),0.45)] dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
            >
              <div className="duration-600 absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(var(--vae-turquoise-rgb),0.25),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute -right-3 -top-3 flex h-8 w-8 scale-75 transform items-center justify-center rounded-full bg-vae-turquoise/20 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-vae-turquoise/40 group-hover:opacity-100">
                <Icon name="arrow_outward" className="text-vae-turquoise" size={14} />
              </div>
              <div className="relative mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 text-vae-turquoise shadow-inner ring-1 ring-vae-turquoise/30 dark:from-vae-turquoise/30 dark:to-vae-turquoise/20 dark:text-vae-turquoise-light dark:ring-vae-turquoise/20">
                  <Icon name={o.icon} className="text-vae-turquoise" size={22} />
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-vae-turquoise">
                  {o.title}
                </h3>
              </div>
              <p className="relative text-sm leading-relaxed text-text-secondary/90 transition-colors duration-300 group-hover:text-text-secondary">
                {o.body}
              </p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-24">
          <h3 className="mb-10 text-center text-xl font-semibold tracking-tight text-white">Unser Prozess</h3>
          <div className="relative grid gap-6 md:grid-cols-4">
            {miniProcess.map((step, idx) => (
              <div key={step.key} className="group relative px-2 text-center">
                {/* connector (desktop) */}
                {idx < miniProcess.length - 1 && (
                  <div className="absolute left-[55%] right-[-12%] top-8 hidden h-px bg-gradient-to-r from-vae-turquoise/30 via-vae-turquoise/20 to-transparent transition-all duration-300 group-hover:from-vae-turquoise/60 group-hover:via-vae-turquoise/40 md:block" />
                )}
                <div className="relative mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 text-vae-turquoise shadow-[0_0_0_3px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-110 group-hover:border-vae-turquoise/50 group-hover:bg-gradient-to-br group-hover:from-vae-turquoise/30 group-hover:to-vae-turquoise/20 group-hover:shadow-[0_0_0_8px_rgba(var(--vae-turquoise-rgb),0.25)] dark:border-vae-turquoise/20 dark:from-vae-turquoise/30 dark:to-vae-turquoise/20 dark:text-vae-turquoise-light dark:shadow-[0_0_0_3px_rgba(255,255,255,0.05)] dark:group-hover:border-vae-turquoise/40 dark:group-hover:from-vae-turquoise/40 dark:group-hover:to-vae-turquoise/30">
                  <Icon name={step.icon} size={22} className="text-vae-turquoise" />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-vae-turquoise/60 bg-vae-turquoise/80 text-[10px] font-semibold text-bg-dark backdrop-blur-sm transition-colors duration-300 group-hover:bg-vae-turquoise">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="mb-1 text-sm font-medium tracking-wide text-white transition-colors duration-300 group-hover:text-vae-turquoise">
                  {step.label}
                </h4>
                <p className="mx-auto max-w-[160px] text-xs leading-snug text-text-secondary/80 transition-colors duration-300 group-hover:text-text-secondary">
                  {step.hint}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-8 text-center text-xl font-semibold tracking-tight text-white">Typische Zeitrahmen</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {miniMetrics.map((m, idx) => {
              const icons = ['schedule', 'architecture', 'rocket_launch']
              const labels = ['Fokus / Schärfung', 'Architektur Sprint', 'Produktionsnaher Pilot']
              const icon = icons[idx] || 'schedule'
              const label = labels[idx] || ''

              return (
                <div
                  key={m}
                  className="group relative overflow-hidden rounded-2xl border border-vae-turquoise/25 bg-vae-turquoise/10 p-6 shadow-[inset_0_1px_0_0_rgba(var(--vae-turquoise-rgb),0.25)] backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-vae-turquoise/50 hover:bg-vae-turquoise/15 hover:shadow-[0_12px_40px_-6px_rgba(var(--vae-turquoise-rgb),0.4)] dark:border-vae-turquoise/20 dark:bg-vae-turquoise/5 dark:hover:bg-vae-turquoise/10"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_55%,rgba(var(--vae-turquoise-rgb),0.25),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-vae-turquoise/30 bg-vae-turquoise/20 shadow-sm transition-colors duration-300 group-hover:bg-vae-turquoise/40 dark:border-vae-turquoise/20 dark:bg-vae-turquoise/15 dark:group-hover:bg-vae-turquoise/30">
                    <span className="text-sm font-bold text-vae-turquoise">{idx + 1}</span>
                  </div>
                  <div className="relative text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-vae-turquoise/20 transition-colors duration-300 group-hover:bg-vae-turquoise/30 dark:bg-vae-turquoise/15 dark:group-hover:bg-vae-turquoise/25">
                      <Icon name={icon} size={18} className="text-vae-turquoise" />
                    </div>
                    <div className="dark:group-hover:text-bg-primary text-sm font-semibold tracking-tight text-vae-turquoise transition-colors duration-300 group-hover:text-white">
                      {m}
                    </div>
                    <div className="mt-1 text-xs text-vae-turquoise/80 transition-colors duration-300 group-hover:text-vae-turquoise/60 dark:text-vae-turquoise/70 dark:group-hover:text-vae-turquoise/50">
                      {label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMiniSection
