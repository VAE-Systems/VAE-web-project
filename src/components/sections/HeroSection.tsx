import React from 'react'
import { Link } from 'react-router-dom'
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
                className="h1"
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
                semantische Arbeitsräume mit <span className="text-vae-turquoise font-semibold">VAE CORE</span>.
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
    { icon: 'storage', label: 'VAE CORE', distance: 120 },
    { icon: 'security', label: 'DSGVO-konform', distance: 110 },
    { icon: 'analytics', label: 'Analytics', distance: 95 },
    { icon: 'code', label: 'Open Source', distance: 105 },
    { icon: 'cloud', label: 'Local Hosting', distance: 115 }
  ]

  // Respect user preference for reduced motion
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // hover state to highlight related line
  const [hovered, setHovered] = React.useState<number | null>(null)

  // responsive radius multiplier
  const getMultiplier = () => {
    if (typeof window === 'undefined') return 1
    const w = window.innerWidth
    if (w >= 1280) return 1.15
    if (w >= 768) return 1
    return 0.75
  }

  const multiplier = getMultiplier()

  // deterministic jitter per index (smaller degrees to avoid overlap)
  const jitterDeg = (i:number) => ((i % 2 === 0 ? -3 : 3) + (i % 3))

  // build positions with simple collision avoidance (iterative repulsion)
  const positions = (() => {
    // base placement in px relative to center (viewBox 400)
    const pts: { x: number; y: number; angleRad: number; r: number; icon?: string; label?: string }[] = services.map((s, i) => {
      const baseAngleDeg = i * (360 / services.length)
      const angleRad = (baseAngleDeg + jitterDeg(i)) * Math.PI / 180
      const r = s.distance * multiplier + 44 // ensure outside central logo
      return { x: Math.cos(angleRad) * r, y: Math.sin(angleRad) * r, angleRad, r, icon: s.icon, label: s.label }
    })

    // simple iterative repulsion to avoid overlaps
    const nodePx = 64 // visual node diameter in px for spacing
    const minDist = nodePx * 0.9 // minimum allowed distance between centers
    const iterations = 8
    for (let it = 0; it < iterations; it++) {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          let dx = b.x - a.x
          let dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001
          if (dist < minDist) {
            // push them apart proportionally
            const overlap = (minDist - dist) * 0.5
            const nx = dx / dist
            const ny = dy / dist
            a.x -= nx * overlap
            a.y -= ny * overlap
            b.x += nx * overlap
            b.y += ny * overlap
          }
        }

        // also ensure nodes stay outside a minimum radius from center (prevent being behind logo)
        const minRadius = 70 // px
        const dCenter = Math.sqrt(pts[i].x * pts[i].x + pts[i].y * pts[i].y)
        if (dCenter < minRadius) {
          const factor = (minRadius / (dCenter || 1))
          pts[i].x *= factor
          pts[i].y *= factor
        }
      }
    }

    // Convert to percent positions for CSS (viewBox 400)
    return pts.map(p => {
      return {
        x: p.x,
        y: p.y,
        leftPct: 50 + p.x / 4,
        topPct: 50 + p.y / 4,
        icon: p.icon,
        label: p.label,
        angleRad: p.angleRad
      }
    })
  })()

  const center = { x: 200, y: 200 }

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Background SVG with paths (draw animation) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(0,255,165)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="rgb(0,255,165)" stopOpacity="0.12" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {positions.map((p, i) => {
            const d = `M ${center.x} ${center.y} L ${center.x + p.x} ${center.y + p.y}`
            // Use motion.path for a smooth draw; respect reduced-motion
            return (
              <motion.path
                key={i}
                d={d}
                stroke="url(#lineGradient)"
                strokeWidth={1.8}
                strokeLinecap="round"
                fill="none"
                style={{ filter: 'url(#softGlow)' }}
                initial={prefersReduced ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0.6 }}
                animate={hovered === i ? { pathLength: 1, opacity: 1 } : (prefersReduced ? { pathLength: 1, opacity: 0.9 } : { pathLength: 1, opacity: 0.75 })}
                transition={{ duration: prefersReduced ? 0 : 1.2, delay: prefersReduced ? 0 : 0.12 * i, ease: 'easeOut' }}
              />
            )
          })}
        </svg>
      </div>

      {/* Central Logo (on top) */}
      <motion.div
        className="relative z-10 w-36 h-36 rounded-3xl flex items-center justify-center pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,165,0.12), rgba(0,255,165,0.06))',
          boxShadow: '0 8px 36px rgba(0,255,165,0.08), inset 0 -6px 30px rgba(255,255,255,0.03)',
          backdropFilter: 'blur(6px)'
        }}
        initial={prefersReduced ? {} : { scale: 0.92, rotate: -20, opacity: 0 }}
        animate={prefersReduced ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        whileHover={prefersReduced ? {} : { scale: 1.03 }}
      >
        <img src="/LOGO_02_white.svg" alt="VAE Systems" className="w-20 h-20 drop-shadow-lg" />
      </motion.div>

      {/* Nodes */}
      {positions.map((p, i) => {
        const floatAnim = prefersReduced ? {} : {
          y: [0, -6, 0, 4, 0],
        }
        const floatTrans = prefersReduced ? {} : {
          duration: 6 + (i * 0.4),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2 + i * 0.2
        }

        return (
          <motion.div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            role="button"
            tabIndex={0}
            aria-label={p.label || ''}
            className="absolute w-16 h-16 rounded-xl flex flex-col items-center justify-center pointer-events-auto z-60"
            style={{
              top: `${p.topPct}%`,
              left: `${p.leftPct}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            animate={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ type: prefersReduced ? undefined : 'spring', stiffness: 120, damping: 16, delay: 0.9 + i * 0.07 }}
          >
            <motion.div
              className="w-full h-full rounded-xl flex flex-col items-center justify-center"
              initial={false}
              animate={floatAnim}
              transition={floatTrans}
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: hovered === i ? '0 8px 30px rgba(0,255,165,0.14)' : 'inset 0 -6px 18px rgba(255,255,255,0.02)',
                backdropFilter: 'blur(6px)'
              }}
            >
              <span className="material-symbols-outlined text-vae-turquoise text-lg">{p.icon}</span>
              <span className="text-xs text-text-secondary mt-1 font-medium">{(p.label || '').split(' ')[0]}</span>

              {/* subtle hover ring */}
              <motion.div
                aria-hidden
                className="absolute -inset-1 rounded-xl"
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  boxShadow: '0 0 40px rgba(0,255,165,0.12)',
                  borderRadius: '12px',
                  pointerEvents: 'none'
                }}
              />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Soft central glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 bg-vae-turquoise/8 rounded-full blur-3xl animate-pulse filter" />
      </div>
    </div>
  )
}

export default HeroSection
