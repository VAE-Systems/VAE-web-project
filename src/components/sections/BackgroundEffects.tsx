import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const ParallaxBackdrop: React.FC<{ strength?: number }> = ({ strength = 12 }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Activate only when in viewport
    const io = new IntersectionObserver(
      entries => {
        setActive(entries[0]?.isIntersecting ?? false)
      },
      { threshold: 0 }
    )
    io.observe(el)

    const handler = (e: MouseEvent) => {
      if (!active) return
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * strength
      const y = (e.clientY / innerHeight - 0.5) * strength
      gsap.to(el, { x, y, duration: 1.2, ease: 'expo.out' })
    }
    window.addEventListener('mousemove', handler)
    return () => {
      window.removeEventListener('mousemove', handler)
      io.disconnect()
    }
  }, [strength, active])
  return (
    <div ref={containerRef} className="bg-layered-parallax">
      <div className="parallax-layer layer-1" />
      <div className="parallax-layer layer-2" />
      <div className="parallax-layer layer-3" />
    </div>
  )
}

export const ParticleField: React.FC<{ count?: number }> = ({ count = 25 }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setPaused(true)
      return
    }
    const io = new IntersectionObserver(
      entries => {
        setPaused(!(entries[0]?.isIntersecting ?? false))
      },
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const spans = Array.from({ length: count })
  return (
    <div ref={containerRef} className={`particle-field ${paused ? 'paused' : ''}`}>
      {spans.map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * -10
        const size = 4 + Math.random() * 6
        const duration = 8 + Math.random() * 8
        const blur = Math.random() * 4
        const opacity = 0.08 + Math.random() * 0.18
        return (
          <span
            key={i}
            style={{
              left: left + '%',
              bottom: '-10vh',
              width: size,
              height: size,
              animationDelay: delay + 's',
              animationDuration: duration + 's',
              filter: `blur(${blur}px) brightness(1.1)`,
              opacity,
            }}
          />
        )
      })}
    </div>
  )
}
