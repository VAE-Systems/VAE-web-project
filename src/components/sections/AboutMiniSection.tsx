import React from 'react'
import { miniTagline, miniSubline, miniOutcomes, miniProcess, miniMetrics } from '../../content/aboutMini'

// Visuell verstärkte Mini-About Sektion (Teaser)
// Fokus: Klarer Header, stärkerer Kontrast, leichte Tiefen- & Hover-Effekte, strukturierte Prozess-Darstellung
const AboutMiniSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 overflow-hidden bg-[linear-gradient(140deg,#0b1112,#0f1d1f_55%,#0c1415)]"
      aria-labelledby="about-mini-heading"
    >
      {/* Layered background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_18%_22%,rgba(var(--vae-turquoise-rgb),0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_82%_78%,rgba(var(--vae-turquoise-rgb),0.12),transparent_65%)]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[780px] bg-gradient-to-b from-vae-turquoise/10 via-vae-turquoise/0 to-transparent blur-3xl rounded-full" />
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
            <span className="badge-soft-turquoise">Open Source First</span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-wide text-text-secondary/80">On‑Prem Ready</span>
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs tracking-wide text-text-secondary/80">Governance integriert</span>
          </div>
        </div>

        {/* Outcomes */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {miniOutcomes.map(o => (
            <div
              key={o.key}
              className="group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-400 hover:border-vae-turquoise/40 hover:shadow-[0_6px_28px_-6px_rgba(var(--vae-turquoise-rgb),0.35)]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_35%_30%,rgba(var(--vae-turquoise-rgb),0.20),transparent_70%)]" />
              <div className="relative flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-vae-turquoise/15 text-vae-turquoise flex items-center justify-center ring-1 ring-vae-turquoise/30 shadow-inner">
                  <span className="material-symbols-outlined text-[26px]">{o.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white leading-snug tracking-tight group-hover:text-vae-turquoise transition-colors">
                  {o.title}
                </h3>
              </div>
              <p className="relative text-sm text-text-secondary/90 leading-relaxed">
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
              <div key={step.key} className="relative text-center px-2">
                {/* connector (desktop) */}
                {idx < miniProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[55%] right-[-12%] h-px bg-gradient-to-r from-vae-turquoise/30 via-vae-turquoise/20 to-transparent" />
                )}
                <div className="relative w-14 h-14 mx-auto mb-4 rounded-2xl grid place-items-center bg-vae-turquoise/15 border border-vae-turquoise/30 text-vae-turquoise shadow-[0_0_0_3px_rgba(var(--vae-turquoise-rgb),0.08)]">
                  <span className="material-symbols-outlined text-[26px]">{step.icon}</span>
                  <span className="absolute -top-2 -right-2 w-5 h-5 text-[10px] rounded-full bg-vae-turquoise/25 text-vae-turquoise/90 flex items-center justify-center font-semibold backdrop-blur-sm border border-vae-turquoise/40">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-white mb-1 tracking-wide">{step.label}</h4>
                <p className="text-xs text-text-secondary/80 leading-snug max-w-[160px] mx-auto">{step.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-xl font-semibold text-white mb-8 tracking-tight">Typische Zeitrahmen</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {miniMetrics.map(m => (
              <div
                key={m}
                className="relative group p-5 rounded-2xl border border-vae-turquoise/25 bg-vae-turquoise/10 backdrop-blur-sm overflow-hidden shadow-[inset_0_1px_0_0_rgba(var(--vae-turquoise-rgb),0.25)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_65%_55%,rgba(var(--vae-turquoise-rgb),0.25),transparent_70%)]" />
                <div className="relative text-base font-semibold text-vae-turquoise tracking-tight">
                  {m}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMiniSection
