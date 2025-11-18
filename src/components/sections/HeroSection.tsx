import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import { CalendarClock, CheckCheck, ChevronDown } from 'lucide-react'
import React from 'react'
import { heroBenefits, heroDescription, heroTitle, heroTypewriterTexts } from '../../content/home'
import MagneticButton from '../ui/buttons/MagneticButton'
const NeuralNetworkBackground = React.lazy(() => import('./NeuralNetworkBackground'))

const trustBadges = ['100% Open Source', 'DSGVO-konform', 'Made in Germany']

const HeroSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [enableBg, setEnableBg] = React.useState(false)
  const [heroVisible, setHeroVisible] = React.useState(true)
  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    []
  )

  React.useEffect(() => {
    if (reducedMotion) return
    if (typeof window === 'undefined') return

    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      const timeout = window.setTimeout(() => setEnableBg(true), 120)
      return () => window.clearTimeout(timeout)
    }

    let timeout: number | null = null
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          observer.disconnect()
          timeout = window.setTimeout(() => setEnableBg(true), 150)
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timeout) window.clearTimeout(timeout)
    }
  }, [reducedMotion])

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        setHeroVisible(entry?.isIntersecting ?? false)
      },
      { threshold: [0.1, 0.5] }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const scrollToServices = React.useCallback(() => {
    const target = document.getElementById('services')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="from-bg-primary via-bg-primary/90 relative isolate overflow-hidden bg-gradient-to-b to-bg-secondary dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker"
    >
      {!reducedMotion && enableBg && (
        <React.Suspense fallback={null}>
          <NeuralNetworkBackground />
        </React.Suspense>
      )}
      {/* Reduzierter Kontrast mit sanfteren Gradienten */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen dark:opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(var(--vae-turquoise-rgb),0.03),transparent_60%)]" />
      </div>
      {/* Soft Overlay für noch sanfteren Kontrast */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-bg-darker/10 dark:bg-bg-darker/20" />
      <div className="container-vae relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center gap-10 text-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-vae-turquoise/80">Open Source · KI</p>
            <h1 className="fluid-h1 text-balance font-bold text-text-light">
              <span className="block">{heroTitle[0]}</span>
              <span className="block text-vae-turquoise">{heroTitle[1]}</span>
            </h1>
            <div className="min-h-[2.2rem] text-lg font-medium text-vae-turquoise md:text-xl lg:text-2xl">
              <TypewriterEffect texts={heroTypewriterTexts} reducedMotion={reducedMotion} paused={!heroVisible} />
            </div>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {heroDescription}
            </p>
          </div>

          <ul className="grid w-full gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {heroBenefits.map(benefit => (
              <li
                key={benefit.title}
                className="border-border-primary/60 bg-bg-primary/30 rounded-2xl border p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-vae-turquoise/50 hover:shadow-[0_14px_40px_-24px_rgba(var(--vae-turquoise-rgb),0.8)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-vae-turquoise/15 text-vae-turquoise">
                  <Icon name={benefit.icon} size={20} />
                </div>
                <p className="text-base font-semibold text-text-light">{benefit.title}</p>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <MagneticButton className="flex-1">
              <CtaLink
                ctaId="contact.schedule_call"
                ctx={{ fromPage: 'home', intent: 'calendly-hero' }}
                variant="custom"
                className="btn-primary flex w-full items-center justify-center gap-3 text-base"
              >
                <CalendarClock className="h-5 w-5" />
                Kostenlose Beratung buchen (45 Min)
              </CtaLink>
            </MagneticButton>
            <MagneticButton className="flex-1">
              <button
                type="button"
                onClick={scrollToServices}
                className="btn-outline flex w-full items-center justify-center gap-2 text-base"
              >
                Services ansehen
                <ChevronDown className="h-5 w-5" />
              </button>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold tracking-[0.35em] text-text-secondary">
            {trustBadges.map(badge => (
              <span key={badge} className="inline-flex items-center gap-2 uppercase">
                <CheckCheck className="h-4 w-4 text-vae-turquoise" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TypewriterEffect: React.FC<{ texts: readonly string[]; reducedMotion?: boolean; paused?: boolean }> = ({
  texts,
  reducedMotion,
  paused,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  React.useEffect(() => {
    if (reducedMotion) {
      setCurrentText(texts[0] || '')
      clearTimer()
      return
    }

    if (paused) {
      clearTimer()
      return
    }

    timeoutRef.current = window.setTimeout(
      () => {
        const fullText = texts[currentIndex]

        if (!isDeleting) {
          const next = fullText.substring(0, currentText.length + 1)
          setCurrentText(next)
          if (next === fullText) {
            timeoutRef.current = window.setTimeout(() => setIsDeleting(true), 1800)
          }
        } else {
          const next = fullText.substring(0, currentText.length - 1)
          setCurrentText(next)
          if (next === '') {
            setIsDeleting(false)
            setCurrentIndex(prev => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 60 : 110
    )

    return () => clearTimer()
  }, [currentText, currentIndex, isDeleting, texts, reducedMotion, paused, clearTimer])

  React.useEffect(() => () => clearTimer(), [clearTimer])

  return (
    <span className="inline-block" aria-live="polite">
      {currentText}
      <span className="animate-pulse" aria-hidden="true">
        |
      </span>
    </span>
  )
}

export default HeroSection
