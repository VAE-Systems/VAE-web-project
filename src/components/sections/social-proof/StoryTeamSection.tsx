/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  STORY TEAM SECTION                                                       ┃
 * ┃  Team-Vorstellung mit Story-Intro → persönliche Verbindung.               ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── storyIntro           → Headline, Lead, Body aus content/storyTeam
 * └── teamMembers[]        → Team-Daten aus content/team
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Skip GSAP animations
 *
 * 🔁 SIDE-EFFECTS
 * ├── GSAP ScrollTrigger.batch → Block entrance animations
 * └── onError img fallback     → FALLBACK_AVATAR
 *
 * 🎨 LAYERS
 * ├── Story intro (headline + body)
 * └── Team member cards
 */

import Icon from '@/components/ui/Icon'
import { storyIntro } from '@/content/storyTeam'
import { teamMembers } from '@/content/team'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useCallback, useEffect, useRef } from 'react'

// ── 🎛️ CORE — Fallback Avatar ──
const FALLBACK_AVATAR =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="%23121a1a"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%2300d488" font-family="Arial, sans-serif" font-size="32">VAE</text></svg>'

interface StoryTeamSectionProps {
  id?: string
  className?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — StoryTeamSection
// ═══════════════════════════════════════════════════════════════════════════
const StoryTeamSection: React.FC<StoryTeamSectionProps> = ({ id = 'team', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  // ── 🔁 SIDE-EFFECT — Image Error Fallback ──
  const handleImageError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = FALLBACK_AVATAR
  }, [])

  // ── 🔁 SIDE-EFFECT — GSAP ScrollTrigger Batch Animations ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // ⛓️ GATE — Accessibility Check
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
    // 🧹 CLEANUP
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
                <div className="mb-1 text-[11px] uppercase tracking-wider text-vae-turquoise dark:text-vae-turquoise/70">
                  {f.label}
                </div>
                <div className="text-sm font-semibold text-text-light dark:text-white">{f.value}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Founders */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" data-block>
          {teamMembers.map(member => (
            <article
              key={member.id}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 mb-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-black/10 bg-white/5 shadow-inner shadow-black/10 dark:border-white/10 sm:h-28 sm:w-28">
                  <div className="pointer-events-none absolute inset-2 rounded-xl border-2 border-black/10 dark:border-white/20" />
                  <img
                    src={member.image}
                    alt={`${member.name} – ${member.role}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold leading-tight text-text-light dark:text-white">{member.name}</h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-vae-turquoise">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="relative z-10 mb-5 text-[0.95rem] leading-relaxed text-text-secondary dark:text-white/80">
                {member.bio}
              </p>

              <div className="relative z-10 mb-5 flex flex-wrap gap-2">
                {member.expertise.map(area => (
                  <span
                    key={area}
                    className="bg-vae-turquoise/12 rounded-full border border-vae-turquoise/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-vae-turquoise/90"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <dl className="relative z-10 mb-6 grid gap-3 text-sm text-text-secondary dark:text-white/70 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vae-turquoise dark:text-vae-turquoise/70">
                    Erfahrung
                  </dt>
                  <dd className="mt-1 text-text-light dark:text-white">{member.experience}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vae-turquoise dark:text-vae-turquoise/70">
                    Ausbildung
                  </dt>
                  <dd className="mt-1 text-text-light dark:text-white">{member.education}</dd>
                </div>
              </dl>

              <div className="relative z-10 mt-auto flex flex-col gap-2 text-sm">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-vae-turquoise transition-colors hover:text-text-light dark:hover:text-white"
                  >
                    <Icon name="forward_to_inbox" size={18} />
                    <span>{member.email}</span>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-muted transition-colors hover:text-text-light dark:text-white/60 dark:hover:text-white"
                  >
                    <Icon name="link" size={16} />
                    <span>LinkedIn Profil</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="section-divider-horizontal" aria-hidden="true" />
    </section>
  )
}

export default StoryTeamSection
