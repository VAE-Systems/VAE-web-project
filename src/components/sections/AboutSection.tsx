import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { ParallaxBackdrop, ParticleField } from './BackgroundEffects'
import { miniOutcomes, miniProcess, miniTagline, miniSubline, miniMetrics, badges } from '../../content/aboutMini'

const AboutSection: React.FC = () => {
  // content now imported from aboutMini & aboutWhy (badges)

  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <section id="about" className={`relative py-24 md:py-28 surface-dark border-t border-border-primary dark:border-white/5 ${isLight ? '' : 'overlay-grid overlay-diag'} edge-glow-top overflow-hidden`}>
      {/* Layered interactive backdrop */}
      {!isLight && <ParallaxBackdrop strength={8} />}
      {!isLight && <ParticleField count={16} />}
      {/* Soft radial accent gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {isLight ? (
          <>
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 28% 22%, rgba(0,0,0,0.05), transparent 55%)` }} />
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 72% 78%, rgba(0,0,0,0.04), transparent 60%)` }} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 28% 22%, hsla(var(--color-vae-turquoise),0.10), transparent 55%)` }} />
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 72% 78%, hsla(var(--color-vae-turquoise),0.08), transparent 60%)` }} />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="h2 heading-gradient mb-4">{miniTagline}</h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">{miniSubline}</p>
        </div>

        {/* Core Grid */}
        <div className="grid lg:grid-cols-2 gap-14 mb-16">
          {/* Outcomes & Process */}
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-4">Wofür es wirkt</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {miniOutcomes.map(o => (
                  <div key={o.key} className={`group relative rounded-xl p-5 backdrop-blur-sm transition-colors ${isLight ? 'border border-border-primary bg-white/60 hover:border-black/15 hover:shadow-[0_10px_34px_-14px_rgba(0,0,0,0.28)]' : 'border border-vae-turquoise/20 bg-vae-turquoise/5 hover:border-vae-turquoise/40'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isLight ? 'bg-black/5 text-text-secondary' : 'bg-vae-turquoise/20 text-vae-turquoise'}`}>
                        <span className="material-symbols-outlined text-base">{o.icon}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-text-light leading-snug">{o.title}</h4>
                    </div>
                    <p className="text-[12px] text-text-secondary leading-relaxed">{o.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-4">Wie wir starten</h3>
              <ol className="flex flex-wrap gap-3 text-[11px] text-text-secondary">
                {miniProcess.map((s,i) => (
                  <li key={s.key} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isLight ? 'border border-border-primary bg-white/60' : 'border border-vae-turquoise/20 bg-vae-turquoise/5'}`}>
                    <span className={`${isLight ? 'text-text-muted' : 'text-vae-turquoise/70'} font-semibold`}>{String(i+1).padStart(2,'0')}</span>
                    <span className="text-text-light">{s.label}</span>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-secondary">{s.hint}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Badges & Metrics */}
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-4">Vertrauen & Prinzipien</h3>
              <div className="flex flex-wrap gap-3">
                {badges.slice(0,4).map(b => (
                  <div key={b.key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] ${isLight ? 'bg-black/5 border border-black/10 text-text-secondary' : 'bg-vae-turquoise/10 border border-vae-turquoise/20 text-vae-turquoise'}`}>
                    <span className={`material-symbols-outlined text-[16px] ${isLight ? 'text-text-secondary' : 'text-vae-turquoise'}`}>{b.icon}</span>
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-4">Richtgeschwindigkeiten</h3>
              <ul className="space-y-2">
                {miniMetrics.map(m => (
                  <li key={m} className="flex items-center gap-2 text-[12px] text-text-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`${isLight ? 'text-text-secondary' : 'text-vae-turquoise'} flex-shrink-0`}><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-6 rounded-2xl backdrop-blur-sm text-center ${isLight ? 'border border-border-primary bg-white/60' : 'border border-vae-turquoise/20 bg-vae-turquoise/5'}`}>
              <h3 className="text-xl font-semibold text-text-light mb-3">Use‑Case kurz prüfen?</h3>
              <p className="text-sm text-text-secondary mb-5">15 Minuten Gespräch: Ziel, aktuelle Systeme & erstes Inkrement grob abstecken.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact" className="btn-primary text-[12px]">Gespräch anfragen</a>
                <a href="/about" className="btn-outline text-[12px]">Mehr über uns</a>
              </div>
            </div>
          </div>
        </div>

  {/* Reserved space for optional slim CTA / banner later */}
      </div>
    </section>
  )
}

export default AboutSection
