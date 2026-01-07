/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  HOME PROCESS TEASER SECTION                                              ┃
 * ┃  Kompakte Prozess-Übersicht für die Homepage → Link zur Detailseite.      ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── homeProcessTeaserSteps[] → 3 Schritte mit Nummer, Dauer, Titel
 * └── homeProcessNote          → Link-Text zur Detailseite
 *
 * 🎨 LAYERS
 * ├── Gradient bg              → subtle dark-to-light
 * ├── Step cards (ol)          → nummerierte Liste
 * └── Footer link              → zur /services/beratung#prozess
 */

import { homeProcessDescription, homeProcessHeading, homeProcessNote, homeProcessTeaserSteps } from '@/content/home'
import React from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — HomeProcessTeaserSection
// ═══════════════════════════════════════════════════════════════════════════
const HomeProcessTeaserSection: React.FC<{ id?: string; className?: string }> = ({
  id = 'process',
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`border-border-primary/40 to-bg-primary/80 relative border-t bg-gradient-to-b from-bg-secondary/40 py-20 dark:border-white/5 dark:from-bg-dark/70 dark:to-bg-darker sm:py-28 ${className}`.trim()}
      aria-labelledby="process-home-heading"
    >
      <div className="container-vae">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise dark:text-vae-turquoise/70">
            Prozess
          </p>
          <h2 id="process-home-heading" className="fluid-h2 mt-3 font-semibold text-text-light">
            {homeProcessHeading}
          </h2>
          <p className="mt-4 text-base text-text-secondary">{homeProcessDescription}</p>
        </header>

        <ol className="mt-12 space-y-8">
          {homeProcessTeaserSteps.map(step => (
            <li
              key={step.number}
              className="border-border-primary/40 rounded-3xl border bg-white/[0.02] p-6 shadow-[0_30px_90px_-60px_rgba(5,212,182,0.8)] backdrop-blur"
            >
              <div className="grid gap-4 md:grid-cols-[auto,1fr] md:items-center">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-vae-turquoise">{step.number}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-text-secondary">
                    {step.duration}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-light">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <a
            href="/services/beratung#prozess"
            className="text-sm font-semibold text-vae-turquoise underline-offset-4 hover:underline"
          >
            {homeProcessNote}
          </a>
        </div>
      </div>
    </section>
  )
}

export default HomeProcessTeaserSection
