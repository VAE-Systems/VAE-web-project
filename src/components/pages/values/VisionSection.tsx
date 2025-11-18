import Icon from '@/components/ui/Icon'
import { VISION_CONTENT } from '@/data/valuesData'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const visionIcons = [
  { name: 'shapes', label: 'Digitale Souveränität' },
  { name: 'handshake', label: 'Partnerschaften' },
  { name: 'layout-grid', label: 'Modulare Infrastruktur' },
  { name: 'sparkles', label: 'Innovation' },
]

export const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        gsap.set(content, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="vision-title"
      className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-bg-darker via-bg-dark to-bg-darker py-24 md:py-32"
    >
      {/* Subtiler Hintergrund-Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vae-turquoise/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-vae relative z-10">
        <div
          ref={contentRef}
          className="mx-auto max-w-5xl space-y-12 rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 backdrop-blur-xl md:px-16 md:py-20"
        >
          {/* Header */}
          <div className="space-y-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vae-turquoise">Unsere Vision</p>

            <h2
              id="vision-title"
              className="text-4xl font-semibold leading-tight text-text-light md:text-5xl lg:text-6xl"
            >
              {VISION_CONTENT.title}
            </h2>
          </div>

          {/* Quote */}
          <blockquote className="mx-auto max-w-3xl border-l-4 border-vae-turquoise/60 pl-6 text-xl italic leading-relaxed text-text-light/90 md:pl-8 md:text-2xl">
            {VISION_CONTENT.quote}
          </blockquote>

          {/* Description */}
          <p className="mx-auto max-w-4xl text-center text-base leading-relaxed text-text-secondary md:text-lg">
            {VISION_CONTENT.explanation}
          </p>

          {/* Icon Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
            {visionIcons.map(icon => (
              <div
                key={icon.name}
                className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
              >
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise/15 to-vae-turquoise/5 shadow-lg shadow-vae-turquoise/10 transition-all duration-300 group-hover:border-vae-turquoise/50 group-hover:shadow-vae-turquoise/20">
                    <Icon name={icon.name} className="text-vae-turquoise" size={32} />
                  </div>
                </div>

                <span className="text-center text-sm font-medium text-text-light/85 transition-colors duration-300 group-hover:text-text-light">
                  {icon.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
