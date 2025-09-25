import React from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import { motion } from 'framer-motion'
import { CalendarClock, Grid3x3, Handshake, ShieldCheck, MapPin, Code as CodeIcon } from 'lucide-react'
const NeuralNetworkBackground = React.lazy(() => import('./NeuralNetworkBackground'))
import { heroTitle, heroTypewriterTexts, heroDescription } from '../../content/home'

/**
 * Hero Section Component
 *
 * Modern hero section with VAE Systems branding and key value propositions
 * Simplified version without Three.js for better performance and maintainability
 */
const HeroSection: React.FC = () => {
  const typewriterTexts = [...heroTypewriterTexts]
  // Defer heavy WebGL background for LCP and respect reduced motion
  const [enableBg, setEnableBg] = React.useState(false)
  const reducedMotion = React.useMemo(
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    []
  )
  React.useEffect(() => {
    if (!reducedMotion) {
      const t = window.setTimeout(() => setEnableBg(true), 0)
      return () => window.clearTimeout(t)
    }
  }, [reducedMotion])

  return (
    <section
      id="hero"
      className="hero-surface from-bg-primary to-bg-primary overlay-diag overlay-grid relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-br via-bg-secondary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker"
    >
      {/* Neural Network Background Animation (lazy + optional) */}
      {!reducedMotion && enableBg && (
        <React.Suspense fallback={null}>
          <NeuralNetworkBackground />
        </React.Suspense>
      )}

      {/* Additional Background Layer for better text readability */}
      <div className="from-bg-primary/85 to-bg-primary/85 absolute inset-0 z-0 bg-gradient-to-br via-bg-secondary/75 dark:from-bg-darker/80 dark:via-bg-dark/70 dark:to-bg-darker/80"></div>

      {/* Light mode: neutral floating dots (no green) */}
      <div aria-hidden className="light-only absolute inset-0 z-0">
        <div className="floating-dot absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-black/10" />
        <div className="floating-dot bg-black/8 absolute left-[78%] top-[36%] h-3 w-3 rounded-md" />
        <div className="floating-dot absolute left-[28%] top-[62%] h-2 w-2 rounded-full bg-black/10" />
        <div className="floating-dot absolute left-[62%] top-[72%] h-2 w-2 rounded-full bg-black/10" />
        <div className="floating-dot absolute left-[8%] top-[44%] h-1.5 w-1.5 rounded-full bg-black/10" />
        <div className="floating-dot absolute left-[58%] top-[14%] h-2 w-2 rounded-full bg-black/10" />
      </div>

      <div className="container-vae relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                className="h1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block text-text-light">{heroTitle[0]}</span>
                <span className="block text-vae-turquoise">{heroTitle[1]}</span>
              </motion.h1>

              <motion.div
                className="min-h-[2rem] text-lg font-medium text-vae-turquoise md:text-xl lg:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <TypewriterEffect texts={typewriterTexts} reducedMotion={reducedMotion} />
              </motion.div>

              <motion.p
                className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroDescription.before}
                <span className="font-semibold text-vae-turquoise">{heroDescription.highlight}</span>
                {heroDescription.after}
              </motion.p>
            </div>

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <CtaLink
                  ctaId="contact.schedule_call"
                  ctx={{ fromPage: 'home', intent: 'strategy-call' }}
                  variant="primary"
                  className="flex flex-1 items-center justify-center text-center"
                  data-green-signal="true"
                >
                  <CalendarClock className="mr-3 h-7 w-7 sm:h-8 sm:w-8" />
                  30‑Min Strategie‑Gespräch buchen
                </CtaLink>
                <Link to="/products" className="btn-secondary flex flex-1 items-center justify-center text-center">
                  <Grid3x3 className="mr-3 h-7 w-7 sm:h-8 sm:w-8" />
                  Produkte & Plattform ansehen
                </Link>
                <Link to="/services" className="btn-outline flex flex-1 items-center justify-center text-center">
                  <Handshake className="mr-3 h-7 w-7 sm:h-8 sm:w-8" />
                  Services entdecken
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/services/custom-solutions"
                  className="rounded-full bg-vae-turquoise/10 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-vae-turquoise/20 hover:text-vae-turquoise"
                >
                  Custom Solutions
                </Link>
                <Link
                  to="/products#core"
                  className="rounded-full bg-vae-turquoise/10 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-vae-turquoise/20 hover:text-vae-turquoise"
                >
                  VAE CORE Architektur
                </Link>
                <CtaLink
                  ctaId="contact.quick_email"
                  ctx={{ fromPage: 'home' }}
                  variant="ghost"
                  className="bg-bg-primary/5 hover:bg-bg-primary/10 rounded-full px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:text-text-light dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white"
                />
              </div>
              <p className="max-w-md text-[11px] leading-relaxed text-text-muted">
                Unverbindlich & fokussiert: In <span className="font-medium text-text-secondary">15–30 Minuten</span>{' '}
                klären wir Zielbild, Reifegrad & nächste sinnvolle Schritte. Kein Pitch – klare Einordnung.
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="border-border-primary flex flex-wrap items-center gap-6 border-t pt-8 dark:border-bg-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-vae-turquoise" />
                <span className="text-sm text-text-secondary">DSGVO-konform</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-vae-turquoise" />
                <span className="text-sm text-text-secondary">Made in Germany</span>
              </div>
              <div className="flex items-center space-x-2">
                <CodeIcon className="h-6 w-6 text-vae-turquoise" />
                <span className="text-sm text-text-secondary">100% Open Source</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          ></motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Simple Typewriter Effect Component
 */
const TypewriterEffect: React.FC<{ texts: string[]; reducedMotion?: boolean }> = ({ texts, reducedMotion }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    if (reducedMotion) {
      // Render static headline without animation
      setCurrentText(texts[0] || '')
      return
    }
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentIndex]

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1))
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1))
          if (currentText === '') {
            setIsDeleting(false)
            setCurrentIndex(prev => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts, reducedMotion])

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
