import React, { useEffect, useRef, useState } from 'react'

/**
 * ScrollProgress
 * Schlanke vertikale Fortschrittsanzeige für Unterseiten.
 * Zeigt den Scroll-Progress in % (Viewport vs. gesamter Dokumenthöhe) an.
 * Energiesparend durch rAF-Throttling + passive Listener.
 */
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const isActive = isDragging || isHovering
  const trackWidthClass = isActive ? 'w-[10px] sm:w-[12px] md:w-[14px]' : 'w-[6px] sm:w-[8px] md:w-[10px]'

  useEffect(() => {
    const calc = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? scrollTop / docHeight : 1
      setProgress(Math.min(1, Math.max(0, ratio)))
    }

    let ticking = false
    const onScroll = () => {
      if (ticking || isDragging) return
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
  }, [isDragging])

  const handlePointer = (clientY: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = docHeight * ratio
    window.scrollTo({ top: targetScroll, behavior: 'auto' })
    setProgress(ratio)
  }

  useEffect(() => {
    if (!isDragging) return
    const handleMove = (event: PointerEvent) => {
      event.preventDefault()
      handlePointer(event.clientY)
    }
    const handleUp = () => {
      setIsDragging(false)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [isDragging])

  const pct = Math.round(progress * 100)

  return (
    <div
      className="fixed right-2 top-1/2 z-40 -translate-y-1/2 select-none pr-1 sm:right-3 md:right-4 md:pr-0"
      aria-label={`Scroll Fortschritt ${pct}%`}
    >
      <div
        ref={trackRef}
        className={`bg-bg-primary/6 dark:bg-white/8 border-border-primary/15 group/track relative h-[220px] max-h-[70vh] overflow-hidden rounded-full border backdrop-blur-sm transition-all duration-200 sm:h-[260px] md:h-[320px] ${trackWidthClass} hover:scale-[1.03] active:scale-[1.04] dark:border-white/15`}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        onPointerDown={event => {
          event.preventDefault()
          setIsDragging(true)
          handlePointer(event.clientY)
        }}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        onBlur={() => setIsHovering(false)}
        onFocus={() => setIsHovering(true)}
        style={{ touchAction: 'none' }}
      >
        {/* Track subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(var(--vae-turquoise-rgb),0.35),transparent_70%)] opacity-40" />
        {/* Fill (top -> down) */}
        <div
          className="absolute left-0 top-0 w-full bg-gradient-to-b from-vae-turquoise via-vae-turquoise/80 to-vae-turquoise-dark shadow-[0_0_8px_-2px_rgba(var(--vae-turquoise-rgb),0.6)] transition-[height] duration-150 ease-out [height:var(--progress)]"
          style={{ '--progress': `${pct}%` } as React.CSSProperties}
        />
        {/* Drag handle */}
        <div
          className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-vae-turquoise/50 bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark shadow-[0_8px_20px_rgba(8,255,193,0.35)] transition-transform duration-150 md:h-5 md:w-5 ${
            isActive ? 'scale-110' : ''
          }`}
          style={{ top: `${pct}%` }}
        >
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[2px]" />
        </div>
        {/* Dynamic island-style bubble */}
      </div>
    </div>
  )
}

export default ScrollProgress
