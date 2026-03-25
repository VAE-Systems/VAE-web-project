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
 * ├── Step cards (grid)        → horizontales 3-Spalten-Grid auf Desktop
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

        <div className="relative mt-12 grid grid-cols-1 gap-0 md:grid-cols-3">
          {/* Connecting line across top */}
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-vae-turquoise/20 md:block" />

          {homeProcessTeaserSteps.map(step => (
            <div key={step.number} className="relative border-t-2 border-vae-turquoise bg-transparent px-8 pb-12 pt-8">
              {/* Giant decorative number */}
              <div className="pointer-events-none absolute right-6 top-4 select-none text-8xl font-black leading-none text-vae-turquoise/10 md:text-[120px]">
                {step.number}
              </div>

              {/* Small step number label */}
              <span className="text-sm font-bold uppercase tracking-widest text-vae-turquoise">{step.number}</span>

              {/* Duration badge */}
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full border border-vae-turquoise/25 bg-vae-turquoise/10 px-3 py-1 text-xs text-vae-turquoise">
                  {step.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-2xl font-bold text-text-light">{step.title}</h3>

              {/* Description */}
              <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>

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
