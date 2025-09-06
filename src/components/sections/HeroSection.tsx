import React from 'react'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'
import MagneticButton from '@/components/ui/MagneticButton'
import { motion } from 'framer-motion'
const NeuralNetworkBackground = React.lazy(() => import('./NeuralNetworkBackground'))
import {
  heroTitle,
  heroTypewriterTexts,
  heroDescription
} from '../../content/home'

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
    () => (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
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
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden hero-surface bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker overlay-diag overlay-grid"
    >
      {/* Neural Network Background Animation (lazy + optional) */}
      {!reducedMotion && enableBg && (
        <React.Suspense fallback={null}>
          <NeuralNetworkBackground />
        </React.Suspense>
      )}
      
      {/* Additional Background Layer for better text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-bg-primary/85 via-bg-secondary/75 to-bg-primary/85 dark:from-bg-darker/80 dark:via-bg-dark/70 dark:to-bg-darker/80"></div>

      {/* Light mode: neutral floating dots (no green) */}
      <div aria-hidden className="light-only absolute inset-0 z-0">
        <div className="floating-dot absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-black/10" />
        <div className="floating-dot absolute top-[36%] left-[78%] w-3 h-3 rounded-md bg-black/8" />
        <div className="floating-dot absolute top-[62%] left-[28%] w-2 h-2 rounded-full bg-black/10" />
        <div className="floating-dot absolute top-[72%] left-[62%] w-2 h-2 rounded-full bg-black/10" />
        <div className="floating-dot absolute top-[44%] left-[8%] w-1.5 h-1.5 rounded-full bg-black/10" />
        <div className="floating-dot absolute top-[14%] left-[58%] w-2 h-2 rounded-full bg-black/10" />
      </div>

      <div className="container-vae relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                className="text-lg md:text-xl lg:text-2xl text-vae-turquoise font-medium min-h-[2rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <TypewriterEffect texts={typewriterTexts} />
              </motion.div>

              <motion.p
                className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroDescription.before}
                <span className="text-vae-turquoise font-semibold">
                  {heroDescription.highlight}
                </span>
                {heroDescription.after}
              </motion.p>
            </div>

            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton>
                  <CtaLink
                    ctaId="contact.schedule_call"
                    ctx={{ fromPage: 'home', intent: 'strategy-call' }}
                    variant="primary"
                    className="text-center flex-1 flex items-center justify-center"
                    data-green-signal="true"
                  >
                    <span className="material-symbols-outlined mr-2">schedule</span>
                    30‑Min Strategie‑Gespräch buchen
                  </CtaLink>
                </MagneticButton>
                <MagneticButton>
                  <Link 
                    to="/products"
                    className="btn-secondary flex-1 text-center flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined mr-2">apps</span>
                    Produkte & Plattform ansehen
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    to="/services"
                    className="btn-outline flex-1 text-center flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined mr-2">handshake</span>
                    Services entdecken
                  </Link>
                </MagneticButton>
              </div>
              <div className="flex flex-wrap gap-2">
                <MagneticButton intensity={0.03}>
                  <Link to="/services/custom-solutions" className="px-4 py-2 rounded-full bg-vae-turquoise/10 hover:bg-vae-turquoise/20 text-xs font-medium text-text-secondary hover:text-vae-turquoise transition-colors">Custom Solutions</Link>
                </MagneticButton>
                <MagneticButton intensity={0.03}>
                  <Link to="/products#core" className="px-4 py-2 rounded-full bg-vae-turquoise/10 hover:bg-vae-turquoise/20 text-xs font-medium text-text-secondary hover:text-vae-turquoise transition-colors">VAE CORE Architektur</Link>
                </MagneticButton>
                <MagneticButton intensity={0.03}>
                  <CtaLink
                    ctaId="contact.quick_email"
                    ctx={{ fromPage: 'home' }}
                    variant="ghost"
                    className="px-4 py-2 rounded-full bg-bg-primary/5 hover:bg-bg-primary/10 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-medium text-text-secondary hover:text-text-light dark:hover:text-white transition-colors"
                  />
                </MagneticButton>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed max-w-md">
                Unverbindlich & fokussiert: In <span className="text-text-secondary font-medium">15–30 Minuten</span> klären wir Zielbild, Reifegrad & nächste sinnvolle Schritte. Kein Pitch – klare Einordnung.
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-8 border-t border-border-primary dark:border-bg-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-vae-turquoise">
                  security
                </span>
                <span className="text-sm text-text-secondary">DSGVO-konform</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-vae-turquoise">
                  location_on
                </span>
                <span className="text-sm text-text-secondary">Made in Germany</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-vae-turquoise">
                  code
                </span>
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
          >
     
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Simple Typewriter Effect Component
 */
const TypewriterEffect: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
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
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  return (
    <span className="inline-block" aria-live="polite">
      {currentText}
      <span className="animate-pulse" aria-hidden="true">|</span>
    </span>
  )
}



export default HeroSection
