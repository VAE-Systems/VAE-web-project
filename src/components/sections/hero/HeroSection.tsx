import MagneticButton from '@/components/ui/buttons/MagneticButton'
import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import { heroBenefits, heroDescription, heroEyebrow, heroTitle } from '@/content/home'
import { useTheme } from '@/contexts/ThemeContext'
import { ArrowRight, CalendarClock, CheckCheck, ChevronDown } from 'lucide-react'
import React from 'react'
import GeometricBackground from '../effects/GeometricBackground'

const NeuralNetworkBackground = React.lazy(() => import('../effects/NeuralNetworkBackground'))

const TIMING = {
  bgActivationDelay: 150,
  bgThreshold: 0.35,
}

const trustBadges = ['Hosting in Deutschland', 'Open-Source-First', 'Keine Tool-Abhängigkeit']

const HeroSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    []
  )

  const [enableBg, setEnableBg] = React.useState(false)

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
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect()
          timeout = window.setTimeout(() => setEnableBg(true), TIMING.bgActivationDelay)
        }
      },
      { threshold: TIMING.bgThreshold }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timeout) window.clearTimeout(timeout)
    }
  }, [reducedMotion])

  const scrollToServices = React.useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="from-bg-primary via-bg-primary/90 relative isolate z-0 overflow-hidden bg-gradient-to-b to-bg-secondary dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker"
    >
      {!reducedMotion &&
        enableBg &&
        (isLight ? (
          <GeometricBackground />
        ) : (
          <React.Suspense fallback={null}>
            <NeuralNetworkBackground />
          </React.Suspense>
        ))}

      <div className="via-black/2 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-black/30" />
      <div className="pointer-events-none absolute inset-0 opacity-45 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(0,255,200,0.06),transparent_32%),radial-gradient(circle_at_70%_80%,rgba(0,220,255,0.05),transparent_36%)]" />
      </div>

      <div className="container-vae relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="relative mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:gap-14">
          <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.38em] text-vae-turquoise/90 sm:text-sm">
                {heroEyebrow}
              </p>

              <h1 className="max-w-4xl text-balance leading-none">
                <span className="mb-2 block text-4xl font-black leading-none tracking-tight text-text-light sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                  {heroTitle[0]}
                </span>
                <span className="bg-vae-turquoise/12 inline-flex rounded-2xl border border-vae-turquoise/30 px-3 py-1.5 shadow-[0_18px_60px_-30px_rgba(var(--vae-turquoise-rgb),0.55)] sm:px-5 sm:py-2.5">
                  <span className="block text-4xl font-black leading-none tracking-tight text-vae-turquoise sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                    {heroTitle[1]}
                  </span>
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0 lg:text-[1.15rem]">
                {heroDescription}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {trustBadges.map(badge => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary"
                  >
                    <CheckCheck className="h-4 w-4 text-vae-turquoise" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
              <MagneticButton className="w-full sm:flex-1">
                <CtaLink
                  ctaId="contact.schedule_call"
                  ctx={{ fromPage: 'home', intent: 'calendly-hero' }}
                  variant="custom"
                  className="btn-primary flex w-full items-center justify-center gap-3 px-8 py-4 text-base font-semibold shadow-[0_18px_48px_-26px_rgba(var(--vae-turquoise-rgb),0.75)]"
                >
                  <CalendarClock className="h-5 w-5" />
                  Erstgespräch buchen
                </CtaLink>
              </MagneticButton>

              <MagneticButton className="w-full sm:flex-1">
                <button
                  type="button"
                  onClick={scrollToServices}
                  className="btn-outline flex w-full items-center justify-center gap-2 px-6 py-3 text-base"
                >
                  Services ansehen
                  <ChevronDown className="h-5 w-5" />
                </button>
              </MagneticButton>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[440px] lg:max-w-none">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_80px_-36px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-vae-turquoise/90">
                    Was Sie am Ende haben
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-text-light">
                    Eine tragfähige Infrastruktur statt weiterer Tools.
                  </h2>
                </div>
                <span className="rounded-full border border-vae-turquoise/20 bg-vae-turquoise/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-vae-turquoise">
                  3-6 Wochen
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {heroBenefits.map(benefit => (
                  <div
                    key={benefit.title}
                    className="border-white/8 hover:bg-black/28 rounded-2xl border bg-black/20 p-4 transition-colors hover:border-vae-turquoise/25"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-vae-turquoise/12 mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-vae-turquoise">
                        <Icon name={benefit.icon} size={20} />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-text-light">{benefit.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-white/8 mt-5 rounded-2xl border bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
                  Typische Ausgangslage
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Zu viele Tools, steigende SaaS-Kosten, unklare Datenflüsse und kein sauberer Plan für Automatisierung
                  oder KI.
                </p>
                <button
                  type="button"
                  onClick={scrollToServices}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-vae-turquoise transition-colors hover:text-vae-turquoise/80"
                >
                  Die drei Wege ansehen
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
