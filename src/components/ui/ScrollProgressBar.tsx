import { motion, useScroll, useSpring } from 'framer-motion'
import React from 'react'

/**
 * ScrollProgressBar Component
 *
 * Zeigt eine animierte Progress-Bar am oberen Bildschirmrand,
 * die den Scroll-Fortschritt der Seite visualisiert.
 *
 * Features:
 * - Smooth Spring-Animation via Framer Motion
 * - Gradient-Effekt mit VAE-Turquoise
 * - Respektiert prefers-reduced-motion
 * - Fixed positioning, z-index über Header
 */
const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll()

  // Smooth Spring-Animation für flüssige Bewegung
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[1035] h-1 origin-left bg-gradient-to-r from-vae-turquoise via-vae-turquoise-dark to-vae-turquoise"
      style={{
        scaleX,
        boxShadow: '0 0 12px rgba(0, 255, 165, 0.5)',
      }}
      initial={{ scaleX: 0 }}
      aria-hidden="true"
    />
  )
}

export default ScrollProgressBar
