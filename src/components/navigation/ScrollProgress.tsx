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
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-40 select-none" aria-label={`Scroll Fortschritt ${pct}%`}>
      <div className="relative h-[340px] w-2 rounded-full bg-bg-primary/8 dark:bg-white/8 overflow-hidden border border-border-primary/15 dark:border-white/15 backdrop-blur-sm">
        {/* Track subtle glow */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_8%,rgba(var(--vae-turquoise-rgb),0.35),transparent_70%)] pointer-events-none" />
        {/* Fill (top -> down) */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-vae-turquoise via-vae-turquoise/80 to-vae-turquoise-dark transition-[height] duration-150 ease-out shadow-[0_0_8px_-2px_rgba(var(--vae-turquoise-rgb),0.6)] [height:var(--progress)]"
          style={{ '--progress': `${pct}%` } as React.CSSProperties }
        />
        {/* Circular badge (static) */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          <div
            className="relative w-16 h-16 rounded-full p-[3px] bg-[conic-gradient(rgba(var(--vae-turquoise-rgb),0.85)_var(--pct),rgba(255,255,255,0.07)_var(--pct)_100%),radial-gradient(circle_at_30%_30%,rgba(var(--vae-turquoise-rgb),0.4),rgba(var(--vae-turquoise-rgb),0.05))] backdrop-blur-md border border-vae-turquoise/40 shadow-[0_0_18px_-4px_rgba(var(--vae-turquoise-rgb),0.6)]"
            style={{ '--pct': `${pct}%` } as React.CSSProperties }
          >
            <div className="absolute inset-[4px] rounded-full bg-[linear-gradient(145deg,rgba(8,24,22,0.9),rgba(6,18,16,0.65))] flex items-center justify-center text-vae-turquoise font-semibold text-sm tracking-wide">
              {pct}%
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium select-none">Progress</span>
        </div>
      </div>
    </div>
  )
}

export default ScrollProgress
