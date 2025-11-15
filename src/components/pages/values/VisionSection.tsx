import Icon from '@/components/ui/Icon'
import { VISION_CONTENT } from '@/data/valuesData'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const visionIcons = [
  { name: 'public', label: 'Digitale Souveränität' },
  { name: 'handshake', label: 'Partnerschaften' },
  { name: 'hub', label: 'Modulare Infrastruktur' },
  { name: 'auto_awesome', label: 'Innovation' },
]

export const VisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const icons = iconsRef.current?.querySelectorAll('[data-vision-icon]')
    const content = contentRef.current

    if (!section || !icons || !content) return

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        gsap.set([icons, content], { opacity: 1, scale: 1, y: 0 })
        return
      }

      // Icons Animation - von hinten einfliegen und größer werden
      icons.forEach((icon, i) => {
        gsap.fromTo(
          icon,
          {
            scale: 0,
            opacity: 0,
            rotateY: -180,
            z: -500,
          },
          {
            scale: 1,
            opacity: 0.15,
            rotateY: 0,
            z: 0,
            duration: 1.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              once: true,
            },
            delay: i * 0.15,
          }
        )
      })

      // Content Animation
      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: 40,
        },
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
          delay: 0.4,
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="vision-title"
      className="relative overflow-hidden border-t border-black/5 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 py-32 dark:border-white/5 dark:from-bg-darker dark:via-[#081013] dark:to-bg-darker"
    >
      {/* Background Icons Grid - große Icons im Hintergrund */}
      <div ref={iconsRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-full">
          {visionIcons.map((icon, i) => (
            <div
              key={icon.name}
              data-vision-icon
              className="absolute"
              style={{
                left: `${15 + i * 23}%`,
                top: `${20 + (i % 2) * 30}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex h-48 w-48 items-center justify-center rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 opacity-25 blur-2xl dark:border-vae-turquoise/25 dark:bg-vae-turquoise/20 md:h-64 md:w-64">
                <Icon name={icon.name} className="text-vae-black/50 dark:text-white/70" size={120} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container-vae relative z-10 flex flex-col items-center text-center">
        <div
          ref={contentRef}
          className="max-w-4xl space-y-8 rounded-[32px] border border-black/10 bg-white/90 px-8 py-12 shadow-[0_25px_70px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-white/[0.05] dark:via-white/[0.03] dark:to-transparent dark:shadow-[0_25px_70px_rgba(0,0,0,0.4)] md:px-12 md:py-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Unsere Vision</p>
          <h2
            id="vision-title"
            className="text-3xl font-semibold text-vae-black dark:text-white md:text-4xl lg:text-5xl"
          >
            {VISION_CONTENT.title}
          </h2>
          <blockquote className="border-l-4 border-vae-turquoise pl-6 text-left text-lg italic leading-relaxed text-vae-black/90 dark:text-white/90 md:text-xl">
            {VISION_CONTENT.quote}
          </blockquote>
          <p className="text-base leading-relaxed text-vae-black/75 dark:text-white/75 md:text-lg">
            {VISION_CONTENT.explanation}
          </p>

          {/* Icon Labels */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {visionIcons.map(icon => (
              <div key={icon.name} className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-vae-turquoise/30 bg-vae-turquoise/10 text-vae-turquoise shadow-lg shadow-vae-turquoise/10 dark:border-vae-turquoise/40 dark:bg-vae-turquoise/15">
                  <Icon name={icon.name} className="text-vae-turquoise" size={28} />
                </div>
                <span className="text-sm font-medium text-vae-black/80 dark:text-white/80">{icon.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
