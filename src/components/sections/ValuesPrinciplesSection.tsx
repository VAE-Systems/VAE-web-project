import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from '@/components/ui/Icon'

/**
 * Werte / Leitprinzipien als vertikale Timeline mit dezentem Story-Verlauf.
 * Professionelle Sprache, keine umgangssprachlichen Formulierungen.
 */
const principles = [
  {
    icon: 'architecture',
    title: 'Fundierte Architektur',
    body: 'Sorgfältig modellierte Systeme statt kurzlebiger Experimente. Modular, testbar, erweiterbar.'
  },
  {
    icon: 'verified_user',
    title: 'Offen & überprüfbar',
    body: 'Open-Source-Komponenten, nachvollziehbare Entscheidungen, vollständige Übergabedokumentation.'
  },
  {
    icon: 'handshake',
    title: 'Partnerschaft ohne Abhängigkeit',
    body: 'Systeme, die auch ohne uns betrieben werden können – Qualität und Transparenz statt Lock-in.'
  },
  {
    icon: 'tune',
    title: 'Pragmatische Präzision',
    body: 'Fokus auf Wirkung und Betrieb. Wir integrieren, was stabil trägt – nicht, was gerade laut ist.'
  },
  {
    icon: 'design_services',
    title: 'Klarheit & UX',
    body: 'Saubere Interfaces und nutzerorientierte Oberflächen erhöhen Akzeptanz und Lebensdauer.'
  }
]

interface ValuesPrinciplesSectionProps { className?: string }

const ValuesPrinciplesSection: React.FC<ValuesPrinciplesSectionProps> = ({ className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) return

  const items = gsap.utils.toArray<HTMLElement>('[data-timeline-item]')
      const line = el.querySelector<HTMLElement>('[data-timeline-line]')
      if (line) {
        gsap.set(line, { scaleY: 0, transformOrigin: '0 0' })
        ScrollTrigger.create({
          trigger: el,
          // Start a bit earlier so first nodes feel present sooner
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.55,
          animation: gsap.to(line, { scaleY: 1, ease: 'none' })
        })
      }
      items.forEach((item, i) => {
        gsap.set(item, { autoAlpha: 0, y: 40 })
        ScrollTrigger.create({
          trigger: item,
          // Trigger nearer to the viewport bottom so content erscheint früher beim ersten Scroll
          start: 'top 90%',
          once: true,
          onEnter: () => gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.03 })
        })
        // Active highlight while item in viewport center
        ScrollTrigger.create({
          trigger: item,
          start: 'top center+=40',
          end: 'bottom center-=40',
          onEnter: () => item.classList.add('is-active'),
          onEnterBack: () => item.classList.add('is-active'),
          onLeave: () => item.classList.remove('is-active'),
          onLeaveBack: () => item.classList.remove('is-active')
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="werte" className={className ? className : 'mb-40 section-block'} data-section ref={wrapperRef} aria-labelledby="werte-heading">
      <div className="max-w-6xl mx-auto">
        <header className="max-w-3xl mb-20" data-animate>
          <h2 id="werte-heading" className="fluid-h2 font-bold text-white heading-fix mb-6">Leitprinzipien</h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Haltung vor Hype: Substanz, Nachvollziehbarkeit und nachhaltiger Betrieb. Jedes Projekt unterliegt denselben Standards – unabhängig von Größe oder Laufzeit.
          </p>
        </header>
        <div className="relative pl-10 md:pl-14">
          {/* Vertical progress line */}
          <div aria-hidden="true" className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-vae-turquoise/0 via-vae-turquoise/70 to-vae-turquoise/0 overflow-hidden">
            <div data-timeline-line className="absolute inset-0 bg-gradient-to-b from-vae-turquoise via-vae-turquoise to-vae-turquoise" />
          </div>
          <ol className="space-y-20">
            {principles.map((p, idx) => (
              <li key={p.title} data-timeline-item className="relative">
                {/* Node */}
                <div aria-hidden="true" className="absolute -left-[38px] md:-left-[46px] top-1.5">
                  <div className="timeline-node w-8 h-8 rounded-full bg-vae-turquoise/20 border border-vae-turquoise/40 flex items-center justify-center backdrop-blur-sm">
                    <Icon name={p.icon} className="text-vae-turquoise" size={16} />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 transition-colors hover:border-vae-turquoise/40">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white leading-snug pr-6">{p.title}</h3>
                    <span className="text-xs font-medium tracking-wider text-vae-turquoise/70">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-sm md:text-base max-w-2xl">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default ValuesPrinciplesSection
