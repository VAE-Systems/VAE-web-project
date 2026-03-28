import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollProgressLine: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return

    gsap.set(el, { scaleY: 0 })
    gsap.to(el, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '3px',
        height: '100vh',
        zIndex: 9999,
        background: 'rgba(0,212,170,0.08)',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={lineRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #00d4aa, rgba(0,212,170,0.4))',
          transformOrigin: 'top',
        }}
      />
    </div>
  )
}

export default ScrollProgressLine
