import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../../content/process'
import { homeProcessHeading, homeProcessDescription, homeProcessNote } from '../../content/home'
import Card from '../ui/Card'
import Icon from '@/components/ui/Icon'

/**
 * HomeProcessTeaserSection
 * Kompakte Teaser-Version des Prozess-Flows (nur erste 3 Schritte) – Link zur vollständigen Darstellung.
 */
const HomeProcessTeaserSection: React.FC<{ id?: string; className?: string }> = ({
  id = 'process',
  className = '',
}) => {
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
        onEnter: batch =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07, force3D: true }),
        once: true,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const steps = processSteps.slice(0, 3)

  return (
    <section
      id={id}
      ref={ref}
      className={`border-border-primary from-bg-primary to-bg-primary relative overflow-hidden border-t bg-gradient-to-br via-bg-secondary py-20 dark:border-white/5 dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker md:py-28 ${className}`.trim()}
      aria-labelledby="process-home-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.12),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(var(--vae-turquoise-rgb),0.08),transparent_60%)]" />
      </div>
      <div className="container-vae relative mx-auto max-w-6xl">
        <header className="mb-14 max-w-3xl">
          <h2 id="process-home-heading" className="h2 heading-gradient h-space mb-4">
            {homeProcessHeading}
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
            {homeProcessDescription}
            <a href="/about#prozess" className="text-vae-turquoise hover:underline">
              Über Uns
            </a>
            .
          </p>
        </header>
        <ol className="mb-12 grid items-stretch gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Card
              as="li"
              key={s.key}
              data-step-card
              className="border-border-primary bg-bg-primary/4 group relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_6px_28px_-6px_rgba(var(--vae-turquoise-rgb),0.3)] dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-vae-turquoise/25 text-vae-turquoise">
                    <Icon name={s.icon} className="text-vae-turquoise" size={18} />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-vae-turquoise/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {s.durationHint && (
                  <span className="bg-bg-primary/5 border-border-primary rounded-md border px-2 py-1 text-[10px] text-text-muted dark:border-white/10 dark:bg-white/5">
                    {s.durationHint}
                  </span>
                )}
              </div>
              <h3 className="mb-2 text-base font-semibold leading-snug text-text-light dark:text-white">{s.title}</h3>
              <p className="mb-4 flex-grow text-[13px] leading-relaxed text-text-secondary">{s.summary}</p>
              {s.deliverables.slice(0, 2).length > 0 && (
                <ul className="mb-3 space-y-1.5 text-[11px] text-text-secondary">
                  {s.deliverables.slice(0, 2).map(d => (
                    <li key={d} className="flex items-start gap-1.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-[2px] flex-shrink-0 text-vae-turquoise"
                      >
                        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-2">
                <a
                  href="/about#prozess"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-vae-turquoise hover:underline"
                >
                  Kompletter Ablauf <Icon name="arrow_forward" size={14} />
                </a>
              </div>
            </Card>
          ))}
        </ol>
        <div className="max-w-3xl text-[12px] text-text-muted">{homeProcessNote}</div>
      </div>
    </section>
  )
}

export default HomeProcessTeaserSection
