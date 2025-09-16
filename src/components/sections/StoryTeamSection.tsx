import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyIntro, founders } from '../../content/storyTeam'
import Icon from '@/components/ui/Icon'

interface StoryTeamSectionProps { id?: string; className?: string }

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
        once: true
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id={id} className={`relative py-32 about-section theme-b z-10 ${className}`} data-section ref={ref} aria-labelledby="story-team-heading">
      <div className="about-surface-bg" aria-hidden="true" />
      <div className="container-vae relative max-w-6xl mx-auto">
        <header className="max-w-4xl mb-16" data-heading-accent data-block>
          <h2 id="story-team-heading" className="text-4xl md:text-5xl font-bold text-white heading-fix mb-6">
            {storyIntro.headline}
          </h2>
          <div className="heading-accent-bar h-[3px] w-36 bg-gradient-to-r from-vae-turquoise to-transparent rounded-full mb-6" />
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">{storyIntro.lead}</p>
          <div className="space-y-4">
            {storyIntro.body.map(p => (
              <p key={p} className="text-sm md:text-base text-text-secondary leading-relaxed" data-block>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10" data-block>
            {storyIntro.microFacts.map(f => (
              <div key={f.label} className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 text-center">
                <div className="text-[11px] uppercase tracking-wider text-vae-turquoise/70 mb-1">{f.label}</div>
                <div className="text-text-light dark:text-white font-semibold text-sm">{f.value}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Founders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" data-block>
          {founders.map(f => (
            <div key={f.key} className="relative group rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm p-6 flex flex-col">
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
              <div className="mb-4 relative z-10">
                <h3 className="text-text-light dark:text-white font-semibold text-lg leading-snug tracking-tight flex items-center gap-2">
                  <Icon name={f.icon} className="text-vae-turquoise" size={16} />
                  {f.name}
                </h3>
                <p className="text-vae-turquoise text-[11px] font-medium uppercase tracking-wide mt-1">{f.role}</p>
              </div>
              <p className="text-text-secondary dark:text-white/80 text-sm leading-relaxed mb-4 relative z-10">{f.highlight}</p>
              <ul className="space-y-2 text-[12px] text-text-secondary mb-4 relative z-10">
                {f.points.map(p => (
                  <li key={p} className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0 mt-[3px]"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
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
