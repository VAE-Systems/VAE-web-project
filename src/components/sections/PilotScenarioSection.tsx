import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Motion } from '@/utils/motion'
import { pilotScenario } from '../../content/pilotScenario'

const PilotScenarioSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      const el = ref.current
      if (!el) return
      const cols = el.querySelectorAll('[data-col]')
      gsap.set(cols, { opacity: 0, y: 40 })
      ScrollTrigger.batch(cols, {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: Motion.enter, ease: Motion.ease, stagger: Motion.stagger }),
        once: true
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const { title, intro, context, goals, approach, resultQualitative, nextSteps, disclaimer } = pilotScenario

  return (
    <section id="pilot" className="relative py-32 about-section theme-d z-10" data-section ref={ref} aria-labelledby="pilot-heading">
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="container-vae max-w-6xl mx-auto relative">
        <header className="max-w-3xl mb-14" data-heading-accent>
          <h2 id="pilot-heading" className="text-4xl md:text-5xl font-bold text-text-light dark:text-white heading-fix mb-6">{title}</h2>
          <div className="heading-accent-bar h-[3px] w-40 bg-gradient-to-r from-vae-turquoise to-transparent rounded-full mb-6" />
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">{intro}</p>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div data-col className="rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/5 dark:bg-white/[0.035] p-6 backdrop-blur-sm flex flex-col">
            <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-3">Ausgangslage</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{context}</p>
            <ul className="space-y-2 text-[12px] text-text-secondary">
              {goals.map(g => (
                <li key={g} className="flex items-start gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0 mt-[3px]"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>{g}</li>
              ))}
            </ul>
          </div>
          <div data-col className="rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/5 dark:bg-white/[0.035] p-6 backdrop-blur-sm flex flex-col">
            <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-3">Ansatz</h3>
            <ul className="space-y-2 text-[12px] text-text-secondary mb-4">
              {approach.map(a => (
                <li key={a} className="flex items-start gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0 mt-[3px]"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>{a}</li>
              ))}
            </ul>
          </div>
          <div data-col className="rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/5 dark:bg-white/[0.035] p-6 backdrop-blur-sm flex flex-col">
            <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-3">Ergebnis (Qualitativ)</h3>
            <ul className="space-y-2 text-[12px] text-text-secondary mb-4">
              {resultQualitative.map(r => (
                <li key={r} className="flex items-start gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0 mt-[3px]"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>{r}</li>
              ))}
            </ul>
          </div>
          <div data-col className="rounded-2xl border border-border-primary dark:border-white/10 bg-bg-primary/5 dark:bg-white/[0.035] p-6 backdrop-blur-sm flex flex-col">
            <h3 className="text-sm font-semibold tracking-wider text-vae-turquoise/80 uppercase mb-3">Ausbaupfad</h3>
            <ul className="space-y-2 text-[12px] text-text-secondary mb-4">
              {nextSteps.map(n => (
                <li key={n} className="flex items-start gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0 mt-[3px]"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>{n}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-[11px] text-text-secondary mt-8 tracking-wide">{disclaimer}</p>
      </div>
      <div className="section-divider-horizontal" aria-hidden="true" />
    </section>
  )
}

export default PilotScenarioSection
