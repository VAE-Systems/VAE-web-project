import React, { useEffect, useState } from 'react'

/**
 * ScrollProgress
 * Schlanke vertikale Fortschrittsanzeige für Unterseiten.
 * Zeigt den Scroll-Progress in % (Viewport vs. gesamter Dokumenthöhe) an.
 * Energiesparend durch rAF-Throttling + passive Listener.
 */
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calc = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? scrollTop / docHeight : 1
      setProgress(Math.min(1, Math.max(0, ratio)))
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        calc()
        ticking = false
      })
    }

    calc()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', calc)
    }
  }, [])

  const pct = Math.round(progress * 100)

  return (
    <div className="fixed right-4 top-1/2 z-40 -translate-y-1/2 select-none" aria-label={`Scroll Fortschritt ${pct}%`}>
      <div className="bg-bg-primary/8 dark:bg-white/8 border-border-primary/15 relative h-[340px] w-2 overflow-hidden rounded-full border backdrop-blur-sm dark:border-white/15">
        {/* Track subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(var(--vae-turquoise-rgb),0.35),transparent_70%)] opacity-40" />
        {/* Fill (top -> down) */}
        <div
          className="absolute left-0 top-0 w-full bg-gradient-to-b from-vae-turquoise via-vae-turquoise/80 to-vae-turquoise-dark shadow-[0_0_8px_-2px_rgba(var(--vae-turquoise-rgb),0.6)] transition-[height] duration-150 ease-out [height:var(--progress)]"
          style={{ '--progress': `${pct}%` } as React.CSSProperties}
        />
        {/* Circular badge (static) */}
        <div className="absolute -left-20 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
          <div
            className="relative h-16 w-16 rounded-full border border-vae-turquoise/40 bg-[conic-gradient(rgba(var(--vae-turquoise-rgb),0.85)_var(--pct),rgba(255,255,255,0.07)_var(--pct)_100%),radial-gradient(circle_at_30%_30%,rgba(var(--vae-turquoise-rgb),0.4),rgba(var(--vae-turquoise-rgb),0.05))] p-[3px] shadow-[0_0_18px_-4px_rgba(var(--vae-turquoise-rgb),0.6)] backdrop-blur-md"
            style={{ '--pct': `${pct}%` } as React.CSSProperties}
          >
            <div className="absolute inset-[4px] flex items-center justify-center rounded-full bg-[linear-gradient(145deg,rgba(8,24,22,0.9),rgba(6,18,16,0.65))] text-sm font-semibold tracking-wide text-vae-turquoise">
              {pct}%
            </div>
          </div>
          <span className="select-none text-[10px] font-medium uppercase tracking-wider text-text-muted">Progress</span>
        </div>
      </div>
    </div>
  )
}

export default ScrollProgress
