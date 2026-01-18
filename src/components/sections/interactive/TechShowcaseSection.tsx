/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  TECH SHOWCASE SECTION                                                    ┃
 * ┃  Auto-scrolling Carousel mit Tools/Technologies → Pause on Hover.         ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── techShowcaseTools[]  → Tool-Logos aus content/home
 * ├── AUTO_SCROLL_SPEED    → 35px/s
 * └── duplicatedTools      → Dupliziert für seamless loop
 *
 * ⛓️ GATES
 * └── prefers-reduced-motion → Animation disabled
 *
 * 🔁 SIDE-EFFECTS
 * └── requestAnimationFrame → Continuous scroll animation
 *
 * 👁️ OBSERVERS
 * └── isHovered state       → Pause/Resume on pointer events
 */

import { techShowcaseTools } from '@/content/home'
import React from 'react'

// ── 🎛️ CORE — Constants ──
const AUTO_SCROLL_SPEED = 35 // px per second

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — TechShowcaseSection
// ═══════════════════════════════════════════════════════════════════════════
const TechShowcaseSection: React.FC = () => {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)
  const offsetRef = React.useRef(0)
  const [segmentWidth, setSegmentWidth] = React.useState(0)

  // ⛓️ GATE — Accessibility Check (memoized)
  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    []
  )

  // 🎛️ CORE — Duplicate tools for seamless loop
  const duplicatedTools = React.useMemo(() => techShowcaseTools.concat(techShowcaseTools), [])

  // 🔁 SIDE-EFFECT — Measure segment width
  React.useLayoutEffect(() => {
    if (trackRef.current) {
      setSegmentWidth(trackRef.current.scrollWidth / 2)
    }
  }, [duplicatedTools])

  // 🔁 SIDE-EFFECT — Animation Loop
  React.useEffect(() => {
    if (reducedMotion) return
    let frameId: number
    let lastTime = performance.now()

    const step = (time: number) => {
      if (!trackRef.current || segmentWidth === 0) {
        frameId = requestAnimationFrame(step)
        return
      }
      const delta = time - lastTime
      lastTime = time
      if (!isHovered) {
        offsetRef.current = (offsetRef.current + (AUTO_SCROLL_SPEED * delta) / 1000) % segmentWidth
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`
      }
      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)
    // 🧹 CLEANUP
    return () => cancelAnimationFrame(frameId)
  }, [isHovered, segmentWidth, reducedMotion])

  // 👁️ OBSERVER — Hover state handlers
  const handlePause = React.useCallback(() => setIsHovered(true), [])
  const handleResume = React.useCallback(() => setIsHovered(false), [])

  return (
    <section
      id="tech-showcase"
      className="border-border-primary to-bg-primary/80 relative border-t bg-gradient-to-b from-bg-secondary/50 py-20 dark:border-white/5 dark:from-bg-dark/60 dark:to-bg-darker sm:py-28"
    >
      <div className="container-vae">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise dark:text-vae-turquoise/70">
            Tech-Showcase
          </p>
          <h2 className="fluid-h2 mt-3 font-semibold text-text-light">Technologien, die wir einsetzen</h2>
          <p className="mt-3 text-base text-text-secondary">
            Bewährte Self-Hosted-Tools — Open Source professionell integriert
          </p>
        </header>

        <div className="mt-12 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_30px_100px_-60px_rgba(5,212,182,0.8)] backdrop-blur-xl">
          <div className="overflow-hidden">
            <div ref={trackRef} className="flex gap-6" style={{ willChange: reducedMotion ? undefined : 'transform' }}>
              {duplicatedTools.map((tool, index) => (
                <div
                  key={`${tool.id}-${index}`}
                  className="to-white/2 group relative w-[220px] shrink-0 cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 p-5 text-left text-white transition-transform hover:-translate-y-1"
                  onPointerEnter={handlePause}
                  onPointerLeave={handleResume}
                  onFocus={handlePause}
                  onBlur={handleResume}
                  tabIndex={0}
                  aria-label={`${tool.name}: ${tool.description}`}
                >
                  <div
                    className={`rounded-xl bg-gradient-to-br ${tool.accent} mb-4 px-3 py-2 text-[11px] uppercase tracking-[0.38em]`}
                  >
                    {tool.tagline}
                  </div>
                  <p className="text-xl font-semibold text-text-light">{tool.name}</p>
                  <p className="mt-1 text-sm text-text-secondary">{tool.description}</p>
                  <div className="bg-bg-primary/90 pointer-events-none absolute left-1/2 top-full z-10 mt-4 w-56 -translate-x-1/2 rounded-2xl border border-white/10 p-4 text-xs text-text-secondary opacity-0 backdrop-blur group-focus-within:opacity-100 group-hover:opacity-100">
                    {tool.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-text-muted">Hover oder fokussieren, um Infos zu pausieren.</p>
        </div>
      </div>
    </section>
  )
}

export default TechShowcaseSection
