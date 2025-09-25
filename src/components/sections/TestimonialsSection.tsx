import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials, testimonialsHero, testimonialsCTA } from '../../content/testimonials'

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        gsap.set([headerRef.current, statsRef.current, testimonialsRef.current, ctaRef.current], { opacity: 1, y: 0 })
        return
      }

      if (!sectionRef.current) return

      // Header Animation mit scrub
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1,
            toggleActions: 'play none none reverse',
          },
          force3D: true,
        }
      )

      // Stats Animation - Batch für bessere Performance
      if (statsRef.current) {
        const statItems = statsRef.current.children
        gsap.set(statItems, { opacity: 0, y: 60, scale: 0.8 })
        ScrollTrigger.batch(statItems, {
          start: 'top 95%',
          onEnter: batch =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              duration: 0.8,
              stagger: 0.1,
              force3D: true,
            }),
          once: true,
        })
      }

      // Testimonials Animation - Batch für bessere Performance
      if (testimonialsRef.current) {
        const testimonialCards = testimonialsRef.current.children
        gsap.set(testimonialCards, { opacity: 0, y: 80, scale: 0.9 })
        ScrollTrigger.batch(testimonialCards, {
          start: 'top 95%',
          onEnter: batch =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              duration: 0.8,
              stagger: 0.1,
              force3D: true,
            }),
          once: true,
        })
      }

      // CTA Animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.8,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
            },
            force3D: true,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])
  // Testimonials are now imported from content/testimonials.ts

  const successMetrics = [
    {
      value: '340%',
      label: 'Durchschnittlicher ROI',
      description: 'unserer KI-Implementierungen',
    },
    {
      value: '65%',
      label: 'Kostenreduktion',
      description: 'durch Open Source Migration',
    },
    {
      value: '99.9%',
      label: 'Uptime',
      description: 'bei lokalen Hosting-Lösungen',
    },
    {
      value: '24h',
      label: 'Support Response',
      description: 'Antwortzeit garantiert',
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={index < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className="text-yellow-400"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))
  }

  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-br from-bg-darker via-bg-dark to-bg-secondary py-24"
      ref={sectionRef}
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_25%_25%,hsla(var(--color-vae-turquoise),0.06),transparent_50%),radial-gradient(circle_at_75%_75%,hsla(var(--color-vae-turquoise),0.04),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center" ref={headerRef}>
          <h2 className="h2 heading-gradient mb-4">Erfolgsgeschichten</h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-300">{testimonialsHero.subtitle}</p>
        </div>

        {/* Success Metrics */}
        <div className="mb-20 grid grid-cols-2 gap-8 lg:grid-cols-4" ref={statsRef}>
          {successMetrics.map((metric, index) => (
            <div
              key={index}
              className="from-bg-primary/5 to-bg-primary/2 dark:to-white/2 border-border-primary rounded-2xl border bg-gradient-to-br p-6 text-center backdrop-blur-xl dark:border-white/10 dark:from-white/5"
            >
              <div className="mb-2 text-3xl font-bold text-vae-turquoise md:text-4xl">{metric.value}</div>
              <div className="mb-1 font-semibold text-text-light dark:text-white">{metric.label}</div>
              <div className="text-sm text-gray-400">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="from-bg-primary/8 dark:from-white/8 to-bg-primary/4 dark:to-white/4 border-border-primary rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-xl transition-all duration-300 hover:border-vae-turquoise/30 dark:border-white/15"
            >
              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">{renderStars(testimonial.rating)}</div>

              {/* Content */}
              <blockquote className="mb-6 leading-relaxed text-gray-300">"{testimonial.content}"</blockquote>

              {/* Project Tag */}
              <div className="mb-4 inline-block rounded-full bg-vae-turquoise/10 px-3 py-1 text-sm font-medium text-vae-turquoise">
                {testimonial.project}
              </div>

              {/* Author */}
              <div className="border-border-primary border-t pt-4 dark:border-white/10">
                <div className="font-semibold text-text-light dark:text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.position}</div>
                <div className="text-sm text-vae-turquoise">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center" ref={ctaRef}>
          <div className="rounded-2xl border border-vae-turquoise/20 bg-gradient-to-r from-vae-turquoise/10 to-vae-turquoise/5 p-8">
            <h3 className="mb-4 text-2xl font-semibold text-text-light dark:text-white">
              Werden Sie unser nächster Erfolg
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-300">{testimonialsCTA.description}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-vae-turquoise px-8 py-3 font-semibold text-bg-darker transition-all duration-300 hover:-translate-y-1 hover:bg-vae-turquoise-dark hover:shadow-lg hover:shadow-vae-turquoise/30 dark:text-white">
                Projekt besprechen
              </button>
              <button className="rounded-lg border border-vae-turquoise px-8 py-3 font-semibold text-vae-turquoise transition-all duration-300 hover:bg-vae-turquoise/10">
                Referenzen anfordern
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
