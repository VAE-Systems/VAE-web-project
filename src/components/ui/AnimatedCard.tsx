import React, { useState, useRef } from 'react'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: 'lift' | 'glow' | 'morph' | 'tilt'
  animationDelay?: number
  interactive?: boolean
}

/**
 * Animated Card Component with multiple hover effects
 */
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hoverEffect = 'lift',
  animationDelay = 0,
  interactive = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })
  }

  const getTransform = () => {
    if (!interactive) return {}

    switch (hoverEffect) {
      case 'tilt':
        if (isHovered && cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect()
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = (mousePos.y - centerY) / 10
          const rotateY = (centerX - mousePos.x) / 10
          return {
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
          }
        }
        return { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)' }

      case 'lift':
        return {
          transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)',
        }

      case 'glow':
        return {
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)',
        }

      case 'morph':
        return {
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }

      default:
        return {}
    }
  }

  const getBoxShadow = () => {
    if (!interactive) return {}

    switch (hoverEffect) {
      case 'glow':
        return {
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0, 255, 165, 0.2), 0 0 30px rgba(0, 255, 165, 0.1)'
            : '0 4px 20px rgba(0,0,0,0.08)',
        }

      case 'lift':
        return {
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0, 255, 165, 0.1)'
            : '0 4px 20px rgba(0,0,0,0.08)',
        }

      default:
        return {
          boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.08)',
        }
    }
  }

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-500 ease-out will-change-transform ${
        hoverEffect === 'morph' ? 'morph-shape' : ''
      } ${className}`}
      style={{
        ...getTransform(),
        ...getBoxShadow(),
        animationDelay: `${animationDelay}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
    >
      {/* Interactive background effect */}
      {interactive && (
        <div
          className="rounded-inherit pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 165, 0.08) 0%, transparent 70%)`
              : 'none',
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default AnimatedCard
