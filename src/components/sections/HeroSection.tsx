import React from 'react'
import { motion } from 'framer-motion'
import NeuralNetworkBackground from './NeuralNetworkBackground'

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
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker"
    >
      {/* Neural Network Background Animation */}
      <NeuralNetworkBackground />
      
      {/* Additional Background Layer for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-darker/80 via-bg-dark/70 to-bg-darker/80" style={{ zIndex: 2 }}></div>

      <div className="container-vae relative" style={{ zIndex: 10 }}>
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
 * Enhanced Network Visualization with growing nodes
 */
const NetworkVisualization: React.FC = () => {
  const services = [
    { icon: 'psychology', label: 'KI-Beratung', distance: 100 },
    { icon: 'storage', label: 'VAEKTRA CORE', distance: 120 },
    { icon: 'security', label: 'DSGVO-konform', distance: 110 },
    { icon: 'analytics', label: 'Analytics', distance: 95 },
    { icon: 'code', label: 'Open Source', distance: 105 },
    { icon: 'cloud', label: 'Local Hosting', distance: 115 }
  ]

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Connection Lines Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {services.map((service, index) => {
            const angle = (index * 60) * Math.PI / 180
            const centerX = 200
            const centerY = 200
            const endX = centerX + Math.cos(angle) * service.distance
            const endY = centerY + Math.sin(angle) * service.distance

            return (
              <motion.line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.5, 
                  delay: 0.8 + index * 0.15,
                  ease: "easeOut"
                }}
              />
            )
          })}
          
          {/* Define gradient for lines */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 255, 165, 0.8)" />
              <stop offset="100%" stopColor="rgba(0, 255, 165, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Central VAE Logo */}
      <motion.div 
        className="relative z-20 w-36 h-36 bg-gradient-to-br from-vae-turquoise via-vae-turquoise-light to-vae-turquoise rounded-3xl flex items-center justify-center shadow-2xl"
        style={{ 
          boxShadow: '0 0 40px rgba(0, 255, 165, 0.4), 0 0 80px rgba(0, 255, 165, 0.2)' 
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src="/LOGO_01_white.svg" 
          alt="VAE Systems" 
          className="w-20 h-20 drop-shadow-lg"
        />
      </motion.div>

      {/* Service Nodes */}
      {services.map((service, index) => {
        const angle = (index * 60) * Math.PI / 180
        const x = Math.cos(angle) * service.distance
        const y = Math.sin(angle) * service.distance

        return (
          <motion.div
            key={index}
            className="absolute w-16 h-16 bg-gradient-to-br from-bg-secondary to-bg-darker border-2 border-vae-turquoise/40 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm group hover:border-vae-turquoise hover:bg-vae-turquoise/10 transition-all duration-300 cursor-pointer z-10"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(${x - 32}px, ${y - 32}px)`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.2 + index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 20px rgba(0, 255, 165, 0.3)'
            }}
          >
            <span className="material-symbols-outlined text-vae-turquoise text-lg group-hover:scale-110 transition-transform">
              {service.icon}
            </span>
            <span className="text-xs text-text-secondary group-hover:text-vae-turquoise transition-colors mt-1 font-medium text-center">
              {service.label.split(' ')[0]}
            </span>
            
            {/* Node Pulse Effect */}
            <motion.div
              className="absolute inset-0 bg-vae-turquoise/20 rounded-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                delay: 2 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )
      })}

      {/* Central Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 bg-vae-turquoise/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  )
}

export default HeroSection
