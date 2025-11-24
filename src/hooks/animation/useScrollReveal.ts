import { loadGsap, type GsapModules } from '@/utils/gsapLoader'
import { useEffect, useRef, useState } from 'react'

export interface UseScrollRevealOptions {
  /** Trigger-Element (Standard: das Element selbst) */
  trigger?: string | HTMLElement
  /** Start-Position für Animation (Standard: 'top 80%') */
  start?: string
  /** Nur einmal animieren? (Standard: true) */
  once?: boolean
  /** Animation beim Scrollen zurück umkehren? (Standard: false) */
  toggleActions?: string
  /** Verzögerung vor Start in Sekunden (Standard: 0) */
  delay?: number
  /** Dauer der Animation in Sekunden (Standard: 0.8) */
  duration?: number
  /** Easing-Funktion (Standard: 'power3.out') */
  ease?: string
  /** Y-Offset für Fade-In (Standard: 30) */
  y?: number
  /** Opacity-Start (Standard: 0) */
  opacity?: number
  /** Skalierung bei Start (Standard: 1) */
  scale?: number
  /** Rotation bei Start in Grad (Standard: 0) */
  rotation?: number
  /** Blur-Effekt bei Start in px (Standard: 0) */
  blur?: number
  /** Stagger für mehrere Elemente (Standard: 0) */
  stagger?: number
  /** Marker für Debugging anzeigen? (Standard: false) */
  markers?: boolean
}

/**
 * useScrollReveal Hook
 *
 * Erstellt automatische Scroll-basierte Reveal-Animationen
 * mit GSAP ScrollTrigger. Respektiert prefers-reduced-motion.
 *
 * @example
 * ```tsx
 * const ref = useScrollReveal<HTMLDivElement>({
 *   y: 50,
 *   opacity: 0,
 *   duration: 1
 * })
 *
 * return <div ref={ref}>Content</div>
 * ```
 */
export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const elementRef = useRef<T>(null)
  const [gsapLoaded, setGsapLoaded] = useState<GsapModules | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Respektiere prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Zeige Element sofort ohne Animation (kein GSAP laden)
      element.style.opacity = '1'
      element.style.transform = 'translateY(0) scale(1)'
      return
    }

    // Lazy-load GSAP nur wenn benötigt
    loadGsap().then(modules => {
      setGsapLoaded(modules)
    })
  }, [])

  useEffect(() => {
    if (!gsapLoaded) return
    const element = elementRef.current
    if (!element) return

    const { gsap } = gsapLoaded

    const {
      trigger = element,
      start = 'top 80%',
      once = true,
      toggleActions = 'play none none none',
      delay = 0,
      duration = 0.8,
      ease = 'power3.out',
      y = 30,
      opacity = 0,
      scale = 1,
      rotation = 0,
      blur = 0,
      stagger = 0,
      markers = false,
    } = options

    // Initial State setzen
    const initialState: any = {
      opacity,
      y,
      scale,
      rotation,
    }

    if (blur > 0) {
      initialState.filter = `blur(${blur}px)`
    }

    gsap.gsap.set(element, initialState)

    // Animation erstellen
    const animation = gsap.gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      filter: 'blur(0px)',
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: once ? toggleActions : 'play reverse play reverse',
        markers,
      },
    })

    return () => {
      if (!gsapLoaded) return
      animation.kill()
      gsapLoaded.ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element || st.trigger === trigger) {
          st.kill()
        }
      })
    }
  }, [options, gsapLoaded])

  return elementRef
}

/**
 * useScrollRevealBatch Hook
 *
 * Erstellt Batch-Animationen für mehrere Elemente
 * (z.B. Grid-Items, Listen-Items).
 *
 * @example
 * ```tsx
 * const containerRef = useScrollRevealBatch<HTMLDivElement>({
 *   selector: '.grid-item',
 *   stagger: 0.15,
 *   y: 40
 * })
 *
 * return (
 *   <div ref={containerRef}>
 *     <div className="grid-item">Item 1</div>
 *     <div className="grid-item">Item 2</div>
 *   </div>
 * )
 * ```
 */
export function useScrollRevealBatch<T extends HTMLElement>(options: UseScrollRevealOptions & { selector: string }) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const elements = container.querySelectorAll(options.selector)
      gsap.set(elements, { opacity: 1, y: 0 })
      return
    }

    const {
      selector,
      start = 'top 80%',
      once = true,
      duration = 0.8,
      ease = 'power3.out',
      y = 30,
      opacity = 0,
      stagger = 0.15,
    } = options

    const elements = container.querySelectorAll(selector)

    gsap.set(elements, { opacity, y })

    ScrollTrigger.batch(elements, {
      onEnter: batch => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          overwrite: true,
        })
      },
      start,
      once,
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger && container.contains(st.trigger as HTMLElement)) {
          st.kill()
        }
      })
    }
  }, [options])

  return containerRef
}

/**
 * useParallax Hook
 *
 * Erstellt Parallax-Scroll-Effekte für Elemente.
 *
 * @example
 * ```tsx
 * const ref = useParallax<HTMLDivElement>({
 *   speed: 0.5,
 *   direction: 'vertical'
 * })
 *
 * return <div ref={ref}>Parallax Content</div>
 * ```
 */
export function useParallax<T extends HTMLElement>(options: {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  start?: string
  end?: string
}) {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const { speed = 0.5, direction = 'vertical', start = 'top bottom', end = 'bottom top' } = options

    const yPercent = direction === 'vertical' ? speed * 100 : 0
    const xPercent = direction === 'horizontal' ? speed * 100 : 0

    gsap.fromTo(
      element,
      {
        yPercent: -yPercent,
        xPercent: -xPercent,
      },
      {
        yPercent,
        xPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) {
          st.kill()
        }
      })
    }
  }, [options])

  return elementRef
}
