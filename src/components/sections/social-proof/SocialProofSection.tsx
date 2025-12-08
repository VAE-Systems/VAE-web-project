/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  SOCIAL PROOF SECTION                                                     ┃
 * ┃  Projekte & Referenzen → Vertrauensaufbau durch echte Beispiele.          ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ KOMPONENTEN
 * ├── LogoModal            → Vergrößerungsansicht für Projekt-Logos
 * └── SocialProofSection   → Grid mit Projekten + Insights
 *
 * 🎛️ CORE
 * ├── referenceProjects[]  → Projekt-Daten aus content/home
 * └── referenceInsights[]  → Statistiken/Highlights
 *
 * 🔁 SIDE-EFFECTS
 * └── Keyboard listener    → ESC schließt Modal
 *
 * 🎨 LAYERS
 * ├── Project Cards        → 2-spaltig, hover-animiert
 * ├── Insights Grid        → 4-spaltig, Icon + Text
 * └── LogoModal overlay    → Fullscreen mit backdrop-blur
 */

import Icon from '@/components/ui/Icon'
import { referenceInsights, referenceProjects } from '@/content/home'
import { ArrowRight, Briefcase, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════════════════
// 🎛️ CORE — LogoModal (Vergrößerungsansicht)
// ═══════════════════════════════════════════════════════════════════════════
interface LogoModalProps {
  logo: { src: string; alt: string; invertOnDark?: boolean; invertOnLight?: boolean }
  onClose: () => void
}

const LogoModal: React.FC<LogoModalProps> = ({ logo, onClose }) => {
  // 🔁 SIDE-EFFECT — ESC Key Handler
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/80 px-4 py-10 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${logo.alt} - Vergrößert`}
      onClick={onClose}
    >
      <div className="relative max-h-[90vh] max-w-4xl" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-all hover:scale-110 hover:bg-white dark:bg-bg-darker/90 dark:text-white dark:hover:bg-bg-darker"
          aria-label="Schließen"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl dark:bg-bg-dark/95">
          <img
            src={logo.src}
            alt={logo.alt}
            className={[
              'max-h-[75vh] w-full object-contain',
              (logo.invertOnDark || logo.invertOnLight) && 'filter',
              logo.invertOnDark && 'dark:invert',
              logo.invertOnLight && 'invert',
              logo.invertOnLight && 'dark:invert-0',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — SocialProofSection
// ═══════════════════════════════════════════════════════════════════════════
const SocialProofSection: React.FC = () => {
  // 🎛️ CORE — Modal State
  const [selectedLogo, setSelectedLogo] = useState<{
    src: string
    alt: string
    invertOnDark?: boolean
    invertOnLight?: boolean
  } | null>(null)

  return (
    <section
      id="social-proof"
      className="relative border-t border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker sm:py-28"
    >
      <div className="container-vae">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Social Proof</p>
          <h2 className="fluid-h2 mt-3 font-semibold text-gray-900 dark:text-text-light">Projekte & Referenzen</h2>
        </header>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {referenceProjects.map(project => (
            <article
              key={project.id}
              className="group flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-lg hover:shadow-vae-turquoise/10 dark:border-white/10 dark:bg-white/5 dark:shadow-vae-turquoise/20"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {project.logo ? (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedLogo({
                          src: project.logo!,
                          alt: `${project.client} Logo`,
                          invertOnDark: project.invertOnDark,
                          invertOnLight: project.invertOnLight,
                        })
                      }
                      className="group/logo cursor-pointer transition-opacity hover:opacity-80"
                      aria-label={`${project.client} Logo vergrößern`}
                    >
                      <img
                        src={project.logo}
                        alt={`${project.client} Logo`}
                        className={[
                          'h-14 w-auto max-w-[180px] transition-transform duration-300 group-hover/logo:scale-110',
                          (project.invertOnDark || project.invertOnLight) && 'filter',
                          project.invertOnDark && 'dark:invert',
                          project.invertOnLight && 'invert',
                          project.invertOnLight && 'dark:invert-0',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-vae-turquoise/15 text-vae-turquoise">
                      <Briefcase className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-text-secondary">{project.client}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
                      {project.status}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary">
                  {project.badge}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-text-light">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                {project.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-text-secondary">
                {project.highlights.map(highlight => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              {project.role && <p className="mt-4 text-xs text-gray-500 dark:text-text-muted">{project.role}</p>}

              <div className="mt-6">
                <Link
                  to="/ressourcen/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-vae-turquoise transition-colors hover:text-vae-turquoise/80"
                >
                  Details ansehen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {referenceInsights.map(insight => (
            <div
              key={insight.id}
              className="group flex flex-col gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-md dark:border-white/10 dark:bg-white/[0.05]"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-vae-turquoise/15 text-vae-turquoise transition-transform duration-300 group-hover:scale-110">
                <Icon name={insight.icon} size={20} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-900 dark:text-text-light">
                {insight.title}
              </p>
              <p className="text-sm text-gray-700 dark:text-text-secondary">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedLogo && <LogoModal logo={selectedLogo} onClose={() => setSelectedLogo(null)} />}
    </section>
  )
}

export default SocialProofSection
