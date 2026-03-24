/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  HERO SECTION                                                             ┃
 * ┃  Der erste Berührungspunkt. Hier entscheidet sich, ob jemand bleibt.      ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ TERRITORIUM-KARTE
 * ├── ⛓️ Gates        → Accessibility-Checks, Device-Detection
 * ├── 🎛️ Core-State   → Was diesen Hero "lebendig" macht
 * ├── 👁️ Observers    → Lazy-Loading & Visibility-Tracking
 * ├── 🎨 Layers       → Visueller Stack (Background → Overlays → Content)
 * └── 🚪 Orchestrator → Die Section selbst, die alles zusammenführt
 *
 * 📍 CONTENT-QUELLE: src/content/home.ts
 * 📍 BACKGROUND: ./effects/NeuralNetworkBackground.tsx (Three.js, ~150KB lazy)
 */

import MagneticButton from '@/components/ui/buttons/MagneticButton'
import CtaLink from '@/components/ui/CtaLink'
import { heroDescription, heroEyebrow, heroTitle, heroTypewriterTexts } from '@/content/home'
import { useTheme } from '@/contexts/ThemeContext'
import { CalendarClock, CheckCheck, ChevronDown } from 'lucide-react'
import React from 'react'
import GeometricBackground from '../effects/GeometricBackground'
import DataSovereigntyVisual from './DataSovereigntyVisual'

const NeuralNetworkBackground = React.lazy(() => import('../effects/NeuralNetworkBackground'))

// ⚙️ Tuning-Knobs: Hier drehen für Timing-Änderungen
const TIMING = {
  bgActivationDelay: 150, // ms nach Viewport-Entry
  bgThreshold: 0.35, // Viewport-% für Background-Trigger
  visibilityThresholds: [0.1, 0.5] as number[], // Für Typewriter-Pause
}

// 🏷️ Social Proof am unteren Rand
const trustBadges = ['Self-Hosted-First', 'DSGVO-konform', 'Made in Germany']

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: HeroSection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HeroSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  // ⛓️ GATE: Accessibility-Check (einmalig bei Mount)
  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    []
  )

  // 🎛️ CORE-STATE: Was den Hero "an" oder "aus" schaltet
  const [enableBg, setEnableBg] = React.useState(false) // Three.js laden?
  const [heroVisible, setHeroVisible] = React.useState(true) // Für Typewriter-Pause
  const longestTypewriterPhrase = React.useMemo(
    () => heroTypewriterTexts.reduce((longest, current) => (current.length > longest.length ? current : longest), ''),
    []
  )

  // 👁️ OBSERVER: Lazy-Load des Neural Network Background
  // → Aktiviert erst wenn Section zu 35% sichtbar ist
  React.useEffect(() => {
    if (reducedMotion) return
    if (typeof window === 'undefined') return

    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      const t = window.setTimeout(() => setEnableBg(true), 120)
      return () => window.clearTimeout(t)
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

  // 👁️ OBSERVER: Visibility-Tracking für Typewriter-Pause
  // → Spart CPU wenn User nach unten scrollt
  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry?.isIntersecting ?? false), {
      threshold: TIMING.visibilityThresholds,
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // 🔁 SIDE-EFFECT: Scroll zu #services
  const scrollToServices = React.useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🎨 RENDER: Layer-Stack von hinten nach vorne
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="from-bg-primary via-bg-primary/90 relative isolate z-0 overflow-hidden bg-gradient-to-b to-bg-secondary dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker"
    >
      {/* 🌐 LAYER 0: Background – Neural Network (dark) oder Geometric (light) */}
      {!reducedMotion &&
        enableBg &&
        (isLight ? (
          <GeometricBackground />
        ) : (
          <React.Suspense fallback={null}>
            <NeuralNetworkBackground />
          </React.Suspense>
        ))}

      {/* 🌑 LAYER 1: Dark Overlay (Gradient) - im Light Mode viel schwächer */}
      <div className="via-black/2 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 to-transparent dark:from-black/35" />

      {/* 🌫️ LAYER 2: Noise & Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(0,255,200,0.06),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(0,220,255,0.05),transparent_40%)]" />
      </div>

      {/* 📝 LAYER 3: Content */}
      <div className="container-vae relative z-10 py-24 sm:py-32 lg:py-40">
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* ── LEFT COLUMN: Messaging + CTAs + Trust ── */}
          <div className="flex flex-1 flex-col items-center gap-10 text-center lg:items-start lg:text-left">
            {/* MESSAGING BLOCK */}
            <div className="space-y-6">
              {/* Eyebrow: Brand Slogan */}
              <p className="text-xs font-bold uppercase tracking-[0.45em] text-vae-turquoise/90 sm:text-sm">
                {heroEyebrow}
              </p>

              {/* H1: Plakativ — Zeile 1 normal, Zeile 2 in Box (dark: weiße Box, light: schwarze Box) */}
              <h1 className="text-balance leading-none">
                <span className="mb-2 block text-4xl font-black uppercase leading-none tracking-tight text-text-light sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                  {heroTitle[0]}
                </span>
                <span className="inline-block bg-text-light px-3 py-1 dark:bg-white sm:px-5 sm:py-2">
                  <span className="block text-4xl font-black uppercase leading-none tracking-tight text-bg-darker dark:text-black sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                    {heroTitle[1]}
                  </span>
                </span>
              </h1>

              {/* Typewriter: Rotierende USPs — plakativ, Box-Style */}
              <div className="flex justify-center lg:justify-start">
                <div
                  className="inline-block bg-text-light px-4 py-2 dark:bg-vae-turquoise sm:px-6 sm:py-3"
                  aria-live="polite"
                >
                  <span
                    className="inline-grid"
                    style={{ minWidth: `${Math.max(longestTypewriterPhrase.length, 12)}ch` }}
                  >
                    <span
                      className="invisible select-none text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
                      aria-hidden
                    >
                      {longestTypewriterPhrase}
                    </span>
                    <span className="col-start-1 row-start-1 inline-flex items-center gap-2">
                      <span className="text-3xl font-black uppercase leading-none tracking-tight text-bg-darker dark:text-black sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                        <TypewriterEffect
                          texts={heroTypewriterTexts}
                          reducedMotion={reducedMotion}
                          paused={!heroVisible}
                        />
                      </span>
                      <span className="inline-block h-8 w-[3px] animate-pulse bg-bg-darker dark:bg-black" aria-hidden />
                    </span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mx-auto max-w-xl text-base font-medium leading-relaxed text-text-secondary sm:text-lg lg:mx-0 lg:text-xl">
                {heroDescription}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
              <MagneticButton className="w-full sm:flex-1">
                <CtaLink
                  ctaId="contact.schedule_call"
                  ctx={{ fromPage: 'home', intent: 'calendly-hero' }}
                  variant="custom"
                  className="btn-primary flex w-full items-center justify-center gap-3 px-8 py-4 text-base font-semibold"
                >
                  <CalendarClock className="h-5 w-5" />
                  Kostenlose Beratung buchen (45 Min)
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

            {/* TRUST BADGES */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold tracking-[0.3em] text-vae-turquoise dark:text-vae-turquoise/70 lg:justify-start">
              {trustBadges.map(badge => (
                <span key={badge} className="inline-flex items-center gap-2 uppercase">
                  <CheckCheck className="h-5 w-5 text-vae-turquoise" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: 3D Visual ── */}
          {!reducedMotion && (
            <div className="w-full max-w-[340px] shrink-0 sm:max-w-[380px] lg:max-w-[420px]">
              <DataSovereigntyVisual />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 TYPEWRITER EFFECT (klassisch, konstante Geschwindigkeit)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TypewriterEffect: React.FC<{
  texts: readonly string[]
  reducedMotion?: boolean
  paused?: boolean
}> = ({ texts, reducedMotion, paused }) => {
  const [idx, setIdx] = React.useState(0)
  const [display, setDisplay] = React.useState('')
  const [deleting, setDeleting] = React.useState(false)
  const timer = React.useRef<number | null>(null)

  const clear = React.useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = null
  }, [])

  React.useEffect(() => {
    if (reducedMotion) {
      setDisplay(texts[0] || '')
      return clear
    }
    if (paused) return clear

    const full = texts[idx]
    timer.current = window.setTimeout(
      () => {
        if (!deleting) {
          const next = full.substring(0, display.length + 1)
          setDisplay(next)
          if (next === full) timer.current = window.setTimeout(() => setDeleting(true), 1800)
        } else {
          const next = full.substring(0, display.length - 1)
          setDisplay(next || '\u00a0')
          if (next === '') {
            setDeleting(false)
            setIdx(prev => (prev + 1) % texts.length)
          }
        }
      },
      deleting ? 70 : 110
    )

    return clear
  }, [display, idx, deleting, texts, reducedMotion, paused, clear])

  React.useEffect(() => clear, [clear])

  return <span className="inline-block">{display || '\u00a0'}</span>
}
