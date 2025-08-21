import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../../content/process'
import {
  homeProcessHeading,
  homeProcessDescription,
  homeProcessNote
} from '../../content/home'
import Card from '../ui/Card'

/**
 * HomeProcessTeaserSection
 * Kompakte Teaser-Version des Prozess-Flows (nur erste 3 Schritte) – Link zur vollständigen Darstellung.
 */
const HomeProcessTeaserSection: React.FC<{ id?: string; className?: string }> = ({ id = 'process', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const cards = el.querySelectorAll('[data-step-card]')
      gsap.set(cards, { opacity: 0, y: 32 })
      ScrollTrigger.batch(cards, {
        start: 'top 82%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07 }),
        once: true
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const steps = processSteps.slice(0,3)

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-20 md:py-28 border-t border-white/5 bg-[linear-gradient(145deg,#0c1213,#0e1416,#0b1011)] overflow-hidden ${className}`.trim()}
      aria-labelledby="process-home-heading"
    >
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.12),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(var(--vae-turquoise-rgb),0.08),transparent_60%)]" />
      </div>
      <div className="container-vae relative max-w-6xl mx-auto">
        <header className="max-w-3xl mb-14">
          <h2 id="process-home-heading" className="h2 heading-gradient h-space mb-4">{homeProcessHeading}</h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            {homeProcessDescription}
            <a href="/about#prozess" className="text-vae-turquoise hover:underline">Über Uns</a>.
          </p>
        </header>
        <ol className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((s,i) => (
            <Card as="li" key={s.key} data-step-card className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 flex flex-col transition-all hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_6px_28px_-6px_rgba(var(--vae-turquoise-rgb),0.3)]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-vae-turquoise/25 flex items-center justify-center text-vae-turquoise">
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-vae-turquoise/70 font-medium">{String(i+1).padStart(2,'0')}</span>
                </div>
                {s.durationHint && <span className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60">{s.durationHint}</span>}
              </div>
              <h3 className="text-base font-semibold text-white mb-2 leading-snug">{s.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-grow">{s.summary}</p>
              {s.deliverables.slice(0,2).length > 0 && (
                <ul className="space-y-1.5 text-[11px] text-text-secondary mb-3">
                  {s.deliverables.slice(0,2).map(d => (
                    <li key={d} className="flex items-start gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0 mt-[2px]"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg><span>{d}</span></li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-2">
                <a href="/about#prozess" className="inline-flex items-center gap-1 text-[11px] font-medium text-vae-turquoise hover:underline">Kompletter Ablauf <span className="material-symbols-outlined text-[14px]">arrow_forward</span></a>
              </div>
            </Card>
          ))}
        </ol>
        <div className="text-[12px] text-text-muted max-w-3xl">{homeProcessNote}</div>
      </div>
    </section>
  )
}

export default HomeProcessTeaserSection
