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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — HomeProcessTeaserSection
// ═══════════════════════════════════════════════════════════════════════════
const HomeProcessTeaserSection: React.FC<{ id?: string; className?: string }> = ({
  id = 'process',
  className = '',
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    gsap.from(el, {
      y: 32,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section
      id={id}
      className={`relative border-t border-text-light/5 bg-bg-darker py-20 dark:border-white/5 sm:py-28 ${className}`.trim()}
      aria-labelledby="process-home-heading"
      style={{
        clipPath: 'polygon(0 4%, 100% 0, 100% 100%, 0 96%)',
        marginTop: '-4vw',
        marginBottom: '-4vw',
        paddingTop: 'calc(var(--section-pad, 5rem) + 4vw)',
        paddingBottom: 'calc(var(--section-pad, 5rem) + 4vw)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container-vae">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-vae-turquoise">Prozess</p>
          <h2
            ref={headingRef}
            id="process-home-heading"
            className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-text-light dark:text-white md:text-5xl"
          >
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
                <span className="inline-flex items-center border border-vae-turquoise/25 bg-vae-turquoise/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-vae-turquoise">
                  {step.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-text-light dark:text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-white/65">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/services/beratung#prozess"
            className="text-xs font-black uppercase tracking-[0.2em] text-vae-turquoise underline-offset-4 hover:underline"
          >
            {homeProcessNote}
          </a>
        </div>
      </div>
    </section>
  )
}

export default HomeProcessTeaserSection
