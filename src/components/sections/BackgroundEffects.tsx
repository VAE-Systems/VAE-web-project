import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const ParallaxBackdrop: React.FC<{ strength?: number }> = ({ strength = 12 }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * strength
      const y = (e.clientY / innerHeight - 0.5) * strength
      gsap.to(el, { x, y, duration: 1.2, ease: 'expo.out' })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [strength])
  return (
    <div ref={containerRef} className="bg-layered-parallax">
      <div className="parallax-layer layer-1" />
      <div className="parallax-layer layer-2" />
      <div className="parallax-layer layer-3" />
    </div>
  )
}

export const ParticleField: React.FC<{ count?: number }> = ({ count = 25 }) => {
  const spans = Array.from({ length: count })
  return (
    <div className="particle-field">
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
              opacity
            }}
          />
        )
      })}
    </div>
  )
}
