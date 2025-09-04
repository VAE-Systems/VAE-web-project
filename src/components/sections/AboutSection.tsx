import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { miniOutcomes, miniProcess, miniMetrics, miniTagline, miniSubline } from '../../content/aboutMini'

interface AboutSectionProps {
  className?: string
}

// Compact "About" teaser used on the home page (full story lives on About page)
const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <section id="about" className={`relative py-24 md:py-32 overflow-hidden ${className}`}>      
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {isLight ? (
          <></>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,hsla(var(--color-vae-turquoise),0.10),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_78%,hsla(var(--color-vae-turquoise),0.08),transparent_60%)]" />
          </>
        )}
      </div>
      <div className="container-vae relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="h2 heading-gradient">Über uns</h2>
          <p className="text-text-secondary leading-relaxed md:text-lg">
            {miniTagline}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {miniSubline}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-text-muted">
            <span className="px-3 py-1 rounded-full bg-vae-turquoise/10 text-vae-turquoise/90 border border-vae-turquoise/25">Open Source First</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">On‑Prem Ready</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">Governance integriert</span>
          </div>
          
          {/* Mini Outcomes */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {miniOutcomes.map(outcome => (
              <div key={outcome.key} className="text-left p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-vae-turquoise">{outcome.icon}</span>
                  <h3 className="font-semibold text-white">{outcome.title}</h3>
                </div>
                <p className="text-sm text-text-secondary">{outcome.body}</p>
              </div>
            ))}
          </div>

          {/* Mini Process */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Unser Prozess</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {miniProcess.map(step => (
                <div key={step.key} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-vae-turquoise/20 flex items-center justify-center mb-2 mx-auto">
                    <span className="material-symbols-outlined text-vae-turquoise text-lg">{step.icon}</span>
                  </div>
                  <div className="text-sm font-medium text-white">{step.label}</div>
                  <div className="text-xs text-text-secondary">{step.hint}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Metrics */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Typische Zeitrahmen</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {miniMetrics.map(metric => (
                <span key={metric} className="px-3 py-1 rounded-full bg-vae-turquoise/10 text-vae-turquoise/90 border border-vae-turquoise/25 text-sm">
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <a href="/about" className="inline-flex items-center gap-2 btn-outline mt-2">
            Mehr erfahren
            <span className="material-symbols-outlined text-base">arrow_outward</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

