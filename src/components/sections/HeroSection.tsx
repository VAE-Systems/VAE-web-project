import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NeuralNetworkBackground from './NeuralNetworkBackground'
import { getHeroSubline, heroSublineVariants } from '../../content/homeHero'

/**
 * Hero Section Component
 * 
 * Modern hero section with VAE Systems branding and key value propositions
 * Simplified version without Three.js for better performance and maintainability
 */
const HeroSection: React.FC = () => {
  const typewriterTexts = [
    '100% Open Source',
    'DSGVO-konform',
    'Maximale Kontrolle',
    'Enterprise-Grade Security'
  ]

  const [sublineVariant, setSublineVariant] = React.useState('A')

  React.useEffect(() => {
    const stored = localStorage.getItem('hero-subline-variant')
    if (stored && getHeroSubline(stored)) {
      setSublineVariant(stored)
      return
    }
    const ids = heroSublineVariants.map(v => v.id)
    const random = ids[Math.floor(Math.random() * ids.length)]
    localStorage.setItem('hero-subline-variant', random)
    setSublineVariant(random)
  }, [])

  const heroSubline = getHeroSubline(sublineVariant)

  return (
    <section 
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker"
    >
      {/* Neural Network Background Animation */}
      <NeuralNetworkBackground />
      
      {/* Additional Background Layer for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-darker/80 via-bg-dark/70 to-bg-darker/80" style={{ zIndex: 2 }}></div>

      <div className="container-vae relative" style={{ zIndex: 10 }}>
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
                <span className="block text-text-light">Lokale KI-Infrastruktur</span>
                <span className="block text-gradient">{heroSubline}</span>
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
                Individuelle KI-Automatisierungssysteme für Unternehmen, die ihre digitale 
                Infrastruktur selbst besitzen wollen. Lokales Hosting, Open-Source-KI und 
                semantische Arbeitsräume mit <span className="text-vae-turquoise font-semibold">VAE Core</span>.
              </motion.p>
            </div>

            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact"
                  className="btn-primary text-center flex-1 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined mr-2">schedule</span>
                  30‑Min Strategie‑Gespräch buchen
                </Link>
                <Link 
                  to="/products"
                  className="btn-secondary flex-1 text-center flex items-center justify-center"
                >
                  <span className="material-symbols-outlined mr-2">apps</span>
                  Produkte & Plattform ansehen
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link to="/services" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-text-secondary hover:text-white transition-colors">Services Übersicht</Link>
                <Link to="/services/custom-solutions" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-text-secondary hover:text-white transition-colors">Custom Solutions</Link>
                <Link to="/products#core" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-text-secondary hover:text-white transition-colors">VAE CORE Architektur</Link>
                <a href="mailto:kontakt@vae-systems.com?subject=Kurzfrage%20zu%20KI%20Projekt" className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-text-secondary hover:text-white transition-colors">Direkte Frage per Mail</a>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed max-w-md">
                Unverbindlich & fokussiert: In <span className="text-text-secondary font-medium">15–30 Minuten</span> klären wir Zielbild, Reifegrad & nächste sinnvolle Schritte. Kein Pitch – klare Einordnung.
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-8 border-t border-bg-secondary"
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
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}



export default HeroSection
