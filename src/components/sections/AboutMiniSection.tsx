import React from 'react'
import { miniTagline, miniSubline, miniOutcomes, miniProcess, miniMetrics } from '../../content/aboutMini'

// Visuell verstärkte Mini-About Sektion (Teaser)
// Fokus: Klarer Header, stärkerer Kontrast, leichte Tiefen- & Hover-Effekte, strukturierte Prozess-Darstellung
const AboutMiniSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker"
      aria-labelledby="about-mini-heading"
    >
      {/* Layered background accents - neutral and subtle */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_18%_22%,rgba(0,0,0,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.06),transparent_65%)] dark:bg-[radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.03),transparent_65%)]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[780px] bg-gradient-to-b from-white/5 via-transparent to-transparent dark:from-white/3 dark:via-transparent dark:to-transparent blur-3xl rounded-full" />
      </div>

      <div className="container-vae relative">
        {/* Heading Block */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 id="about-mini-heading" className="h2 heading-gradient mb-6 tracking-tight">
            {miniTagline}
          </h2>
          <p className="text-xl md:text-2xl font-light text-text-secondary/90 leading-relaxed max-w-3xl mx-auto">
            {miniSubline}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs tracking-wide text-text-secondary/80 dark:bg-white/5 dark:border-white/10 dark:text-text-secondary/70">Open Source First</span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs tracking-wide text-text-secondary/80 dark:bg-white/5 dark:border-white/10 dark:text-text-secondary/70">On‑Prem Ready</span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs tracking-wide text-text-secondary/80 dark:bg-white/5 dark:border-white/10 dark:text-text-secondary/70">Governance integriert</span>
          </div>
        </div>

        {/* Outcomes */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {miniOutcomes.map(o => (
            <div
              key={o.key}
              className="group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-vae-turquoise/50 hover:shadow-[0_12px_40px_-8px_rgba(var(--vae-turquoise-rgb),0.45)] hover:scale-[1.02] hover:bg-white/[0.08] dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 bg-[radial-gradient(circle_at_35%_30%,rgba(var(--vae-turquoise-rgb),0.25),transparent_70%)]" />
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-vae-turquoise/20 group-hover:bg-vae-turquoise/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100">
                <span className="material-symbols-outlined text-sm text-vae-turquoise">arrow_outward</span>
              </div>
                            <div className="relative flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 dark:from-vae-turquoise/30 dark:to-vae-turquoise/20 text-vae-turquoise dark:text-vae-turquoise-light flex items-center justify-center ring-1 ring-vae-turquoise/30 dark:ring-vae-turquoise/20 shadow-inner">
                  <span className="material-symbols-outlined text-[26px]">{o.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white leading-snug tracking-tight group-hover:text-vae-turquoise transition-colors duration-300">
                  {o.title}
                </h3>
              </div>
              <p className="relative text-sm text-text-secondary/90 leading-relaxed group-hover:text-text-secondary transition-colors duration-300">
                {o.body}
              </p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mb-24">
          <h3 className="text-center text-xl font-semibold text-white mb-10 tracking-tight">Unser Prozess</h3>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {miniProcess.map((step, idx) => (
              <div key={step.key} className="relative text-center px-2 group">
                {/* connector (desktop) */}
                {idx < miniProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[55%] right-[-12%] h-px bg-gradient-to-r from-vae-turquoise/30 via-vae-turquoise/20 to-transparent group-hover:from-vae-turquoise/60 group-hover:via-vae-turquoise/40 transition-all duration-300" />
                )}
                <div className="relative w-14 h-14 mx-auto mb-4 rounded-2xl grid place-items-center bg-gradient-to-br from-vae-turquoise/20 to-vae-turquoise/10 dark:from-vae-turquoise/30 dark:to-vae-turquoise/20 border border-vae-turquoise/30 dark:border-vae-turquoise/20 text-vae-turquoise dark:text-vae-turquoise-light shadow-[0_0_0_3px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_3px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_0_8px_rgba(var(--vae-turquoise-rgb),0.25)] group-hover:border-vae-turquoise/50 dark:group-hover:border-vae-turquoise/40 group-hover:bg-gradient-to-br group-hover:from-vae-turquoise/30 group-hover:to-vae-turquoise/20 dark:group-hover:from-vae-turquoise/40 dark:group-hover:to-vae-turquoise/30 transition-all duration-300 hover:scale-110">
                  <span className="material-symbols-outlined text-[26px]">{step.icon}</span>
                  <span className="absolute -top-2 -right-2 w-5 h-5 text-xs rounded-full bg-vae-turquoise/80 text-bg-dark flex items-center justify-center font-semibold backdrop-blur-sm border border-vae-turquoise/60 group-hover:bg-vae-turquoise transition-colors duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-white mb-1 tracking-wide group-hover:text-vae-turquoise transition-colors duration-300">{step.label}</h4>
                <p className="text-sm text-text-secondary/80 leading-snug max-w-[160px] mx-auto group-hover:text-text-secondary transition-colors duration-300">{step.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-xl font-semibold text-white mb-8 tracking-tight">Typische Zeitrahmen</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {miniMetrics.map((m, idx) => {
              const icons = ['schedule', 'architecture', 'rocket_launch'];
              const labels = ['Fokus / Schärfung', 'Architektur Sprint', 'Produktionsnaher Pilot'];
              const icon = icons[idx] || 'schedule';
              const label = labels[idx] || '';

              return (
                <div
                  key={m}
                  className="relative group p-6 rounded-2xl border border-vae-turquoise/25 bg-vae-turquoise/10 backdrop-blur-sm overflow-hidden shadow-[inset_0_1px_0_0_rgba(var(--vae-turquoise-rgb),0.25)] hover:shadow-[0_12px_40px_-6px_rgba(var(--vae-turquoise-rgb),0.4)] hover:border-vae-turquoise/50 hover:bg-vae-turquoise/15 transition-all duration-500 hover:scale-[1.02] dark:border-vae-turquoise/20 dark:bg-vae-turquoise/5 dark:hover:bg-vae-turquoise/10"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_65%_55%,rgba(var(--vae-turquoise-rgb),0.25),transparent_70%)]"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-vae-turquoise/20 group-hover:bg-vae-turquoise/40 transition-colors duration-300 flex items-center justify-center border border-vae-turquoise/30 shadow-sm dark:bg-vae-turquoise/15 dark:group-hover:bg-vae-turquoise/30 dark:border-vae-turquoise/20">
                    <span className="text-sm font-bold text-vae-turquoise">{idx + 1}</span>
                  </div>
                  <div className="relative text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-vae-turquoise/20 group-hover:bg-vae-turquoise/30 transition-colors duration-300 flex items-center justify-center dark:bg-vae-turquoise/15 dark:group-hover:bg-vae-turquoise/25">
                      <span className="material-symbols-outlined text-lg text-vae-turquoise">{icon}</span>
                    </div>
                    <div className="text-sm font-semibold text-vae-turquoise group-hover:text-white transition-colors duration-300 tracking-tight dark:group-hover:text-bg-primary">
                      {m}
                    </div>
                    <div className="text-xs text-vae-turquoise/80 group-hover:text-vae-turquoise/60 transition-colors duration-300 mt-1 dark:text-vae-turquoise/70 dark:group-hover:text-vae-turquoise/50">
                      {label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMiniSection
