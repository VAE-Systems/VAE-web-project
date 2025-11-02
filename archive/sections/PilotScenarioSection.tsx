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
        onEnter: batch =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: Motion.enter,
            ease: Motion.ease,
            stagger: Motion.stagger,
            force3D: true,
          }),
        once: true,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const { title, intro, context, goals, approach, resultQualitative, nextSteps, disclaimer } = pilotScenario

  return (
    <section
      id="pilot"
      className="about-section theme-d relative z-10 py-32"
      data-section
      ref={ref}
      aria-labelledby="pilot-heading"
    >
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="container-vae relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl" data-heading-accent>
          <h2
            id="pilot-heading"
            className="heading-fix mb-6 text-4xl font-bold text-text-light dark:text-white md:text-5xl"
          >
            {title}
          </h2>
          <div className="heading-accent-bar mb-6 h-[3px] w-40 rounded-full bg-gradient-to-r from-vae-turquoise to-transparent" />
          <p className="text-lg leading-relaxed text-text-secondary md:text-xl">{intro}</p>
        </header>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            data-col
            className="border-border-primary bg-bg-primary/5 flex flex-col rounded-2xl border p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.035]"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-vae-turquoise/80">Ausgangslage</h3>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">{context}</p>
            <ul className="space-y-2 text-[12px] text-text-secondary">
              {goals.map(g => (
                <li key={g} className="flex items-start gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-[3px] flex-shrink-0 text-vae-turquoise"
                  >
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-col
            className="border-border-primary bg-bg-primary/5 flex flex-col rounded-2xl border p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.035]"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-vae-turquoise/80">Ansatz</h3>
            <ul className="mb-4 space-y-2 text-[12px] text-text-secondary">
              {approach.map(a => (
                <li key={a} className="flex items-start gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-[3px] flex-shrink-0 text-vae-turquoise"
                  >
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-col
            className="border-border-primary bg-bg-primary/5 flex flex-col rounded-2xl border p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.035]"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-vae-turquoise/80">
              Ergebnis (Qualitativ)
            </h3>
            <ul className="mb-4 space-y-2 text-[12px] text-text-secondary">
              {resultQualitative.map(r => (
                <li key={r} className="flex items-start gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-[3px] flex-shrink-0 text-vae-turquoise"
                  >
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-col
            className="border-border-primary bg-bg-primary/5 flex flex-col rounded-2xl border p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.035]"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-vae-turquoise/80">Ausbaupfad</h3>
            <ul className="mb-4 space-y-2 text-[12px] text-text-secondary">
              {nextSteps.map(n => (
                <li key={n} className="flex items-start gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-[3px] flex-shrink-0 text-vae-turquoise"
                  >
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-[11px] tracking-wide text-text-secondary">{disclaimer}</p>
      </div>
      <div className="section-divider-horizontal" aria-hidden="true" />
    </section>
  )
}

export default PilotScenarioSection
