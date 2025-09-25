import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyIntro, founders } from '../../content/storyTeam'
import Icon from '@/components/ui/Icon'

interface StoryTeamSectionProps {
  id?: string
  className?: string
}

const StoryTeamSection: React.FC<StoryTeamSectionProps> = ({ id = 'team', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) return
      const el = ref.current
      if (!el) return

      const blocks = el.querySelectorAll('[data-block]')
      gsap.set(blocks, { opacity: 0, y: 40 })
      ScrollTrigger.batch(blocks, {
        start: 'top 85%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
        once: true,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      className={`about-section theme-b relative z-10 py-32 ${className}`}
      data-section
      ref={ref}
      aria-labelledby="story-team-heading"
    >
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="container-vae relative mx-auto max-w-6xl">
        <header className="mb-16 max-w-4xl" data-heading-accent data-block>
          <h2 id="story-team-heading" className="heading-fix mb-6 text-4xl font-bold text-white md:text-5xl">
            {storyIntro.headline}
          </h2>
          <div className="heading-accent-bar mb-6 h-[3px] w-36 rounded-full bg-gradient-to-r from-vae-turquoise to-transparent" />
          <p className="mb-6 text-lg leading-relaxed text-text-secondary md:text-xl">{storyIntro.lead}</p>
          <div className="space-y-4">
            {storyIntro.body.map(p => (
              <p key={p} className="text-sm leading-relaxed text-text-secondary md:text-base" data-block>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4" data-block>
            {storyIntro.microFacts.map(f => (
              <div
                key={f.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-sm"
              >
                <div className="mb-1 text-[11px] uppercase tracking-wider text-vae-turquoise/70">{f.label}</div>
                <div className="text-sm font-semibold text-text-light dark:text-white">{f.value}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Founders */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3" data-block>
          {founders.map(f => (
            <div
              key={f.key}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 mb-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold leading-snug tracking-tight text-text-light dark:text-white">
                  <Icon name={f.icon} className="text-vae-turquoise" size={16} />
                  {f.name}
                </h3>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-vae-turquoise">{f.role}</p>
              </div>
              <p className="relative z-10 mb-4 text-sm leading-relaxed text-text-secondary dark:text-white/80">
                {f.highlight}
              </p>
              <ul className="relative z-10 mb-4 space-y-2 text-[12px] text-text-secondary">
                {f.points.map(p => (
                  <li key={p} className="flex items-start gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-[3px] flex-shrink-0 text-vae-turquoise"
                    >
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider-horizontal" aria-hidden="true" />
    </section>
  )
}

export default StoryTeamSection
