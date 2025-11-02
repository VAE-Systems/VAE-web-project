import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import Icon from '@/components/ui/Icon'
import { miniOutcomes, miniProcess, miniMetrics, miniTagline, miniSubline } from '../../content/aboutMini'

interface AboutSectionProps {
  className?: string
}

// Compact "About" teaser used on the home page (full story lives on About page)
const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <section id="about" className={`relative overflow-hidden py-24 md:py-32 ${className}`}>
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
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
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <h2 className="h2 heading-gradient">Über uns</h2>
          <p className="leading-relaxed text-text-secondary md:text-lg">{miniTagline}</p>
          <p className="text-sm leading-relaxed text-text-secondary">{miniSubline}</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-text-muted">
            <span className="rounded-full border border-vae-turquoise/25 bg-vae-turquoise/10 px-3 py-1 text-vae-turquoise/90">
              Open Source First
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-text-secondary">
              On‑Prem Ready
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-text-secondary">
              Governance integriert
            </span>
          </div>

          {/* Mini Outcomes */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {miniOutcomes.map(outcome => (
              <div key={outcome.key} className="rounded-lg border border-white/10 bg-white/5 p-4 text-left">
                <div className="mb-2 flex items-center gap-3">
                  <Icon name={outcome.icon} className="text-vae-turquoise" />
                  <h3 className="font-semibold text-white">{outcome.title}</h3>
                </div>
                <p className="text-sm text-text-secondary">{outcome.body}</p>
              </div>
            ))}
          </div>

          {/* Mini Process */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-white">Unser Prozess</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {miniProcess.map(step => (
                <div key={step.key} className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-vae-turquoise/20">
                    <Icon name={step.icon} className="text-vae-turquoise" size={18} />
                  </div>
                  <div className="text-sm font-medium text-white">{step.label}</div>
                  <div className="text-xs text-text-secondary">{step.hint}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Metrics */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-white">Typische Zeitrahmen</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {miniMetrics.map(metric => (
                <span
                  key={metric}
                  className="rounded-full border border-vae-turquoise/25 bg-vae-turquoise/10 px-3 py-1 text-sm text-vae-turquoise/90"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <a href="/about" className="btn-outline mt-2 inline-flex items-center gap-2">
            Mehr erfahren
            <Icon name="arrow_outward" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
