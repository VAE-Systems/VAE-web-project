import React from 'react'
import { motion } from 'framer-motion'

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Main Glow Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vae-turquoise/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Secondary Glow */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-vae-turquoise/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,165,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="container-vae relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block text-text-light">Lokale KI-Infrastruktur</span>
                <span className="block text-gradient">für deutsche Unternehmen.</span>
              </motion.h1>

              <motion.div
                className="text-xl lg:text-2xl text-vae-turquoise font-medium min-h-[2rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <TypewriterEffect texts={typewriterTexts} />
              </motion.div>

              <motion.p
                className="text-lg text-text-secondary max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Individuelle KI-Automatisierungssysteme für Unternehmen, die ihre digitale 
                Infrastruktur selbst besitzen wollen. Lokales Hosting, Open-Source-KI und 
                semantische Arbeitsräume mit <span className="text-vae-turquoise font-semibold">VAEKTRA CORE</span>.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a 
                href="mailto:kontakt@vae-systems.com?subject=Kostenlose%20KI-Beratung%20Anfrage&body=Hallo%20VAE%20Systems%20Team,%0A%0AIch%20interessiere%20mich%20für%20eine%20kostenlose%20KI-Beratung.%0A%0AMein%20Name:%20%0AMein%20Unternehmen:%20%0AMeine%20Telefonnummer:%20%0A%0AKurze%20Beschreibung%20meines%20Projekts:%0A%0A%0AVielen%20Dank!"
                className="btn-primary text-center"
              >
                <span className="material-symbols-outlined mr-2">
                  psychology
                </span>
                Kostenlose KI-Beratung
              </a>
              <button className="btn-secondary">
                <span className="material-symbols-outlined mr-2">
                  play_circle
                </span>
                VAEKTRA CORE Demo
              </button>
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
            <NetworkVisualization />
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

/**
 * Simplified Network Visualization
 */
const NetworkVisualization: React.FC = () => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Central Logo */}
      <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-vae-turquoise to-vae-turquoise-700 rounded-2xl flex items-center justify-center glow-turquoise">
        <img 
          src="/LOGO_01_white.svg" 
          alt="VAE Core" 
          className="w-16 h-16"
        />
      </div>

      {/* Orbiting Elements */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-12 h-12 bg-bg-secondary border border-vae-turquoise/30 rounded-lg flex items-center justify-center"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
          }}
          animate={{
            rotate: 360,
            x: Math.cos((index * 60) * Math.PI / 180) * 120 - 24,
            y: Math.sin((index * 60) * Math.PI / 180) * 120 - 24,
          }}
          transition={{
            duration: 20 + index * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="material-symbols-outlined text-vae-turquoise text-sm">
            {['psychology', 'storage', 'security', 'analytics', 'code', 'cloud'][index]}
          </span>
        </motion.div>
      ))}

      {/* Connection Lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {[...Array(6)].map((_, index) => {
            const angle = (index * 60) * Math.PI / 180
            const x = 200 + Math.cos(angle) * 120
            const y = 200 + Math.sin(angle) * 120
            return (
              <motion.line
                key={index}
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke="rgba(0,255,165,0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default HeroSection
