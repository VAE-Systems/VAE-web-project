import React, { useState, useCallback, useRef, useEffect } from 'react'
import { FontSize, FontWeight, getTypographyClasses } from '../../types/typography'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  disabled?: boolean
  glowEffect?: boolean
  rippleEffect?: boolean
  scaleEffect?: boolean
  // Typography props
  textSize?: FontSize
  textWeight?: FontWeight
  // Accessibility
  ariaLabel?: string
  // Performance
  enableHardwareAcceleration?: boolean
}

/**
 * Enhanced Magnetic Button Component
 * Advanced hover effects with multiple interaction modes and typography integration
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  intensity = 0.05,
  disabled = false,
  glowEffect = false,
  rippleEffect = false,
  scaleEffect = false,
  textSize = 'sm',
  textWeight = 'semibold',
  ariaLabel,
  enableHardwareAcceleration = true,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const elementRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)

  // Generate typography classes
  const typographyClasses = getTypographyClasses({
    size: textSize,
    weight: textWeight,
  })

  // Performance optimization: Enable hardware acceleration
  useEffect(() => {
    if (enableHardwareAcceleration && elementRef.current) {
      elementRef.current.style.willChange = 'transform'
    }
  }, [enableHardwareAcceleration])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      })
    },
    [disabled]
  )

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!rippleEffect || !elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = {
        id: rippleIdRef.current++,
        x,
        y,
      }

      setRipples(prev => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 600)
    },
    [rippleEffect]
  )

  // Calculate dynamic transform with performance considerations
  const transform = `translate(${mousePos.x * intensity}px, ${mousePos.y * intensity}px)${
    scaleEffect && isHovered ? ' scale(1.05)' : ''
  }`

  // Combine all classes
  const combinedClasses = [
    'inline-block transition-all duration-300 ease-out',
    enableHardwareAcceleration ? 'will-change-transform' : '',
    glowEffect ? 'glow-hover' : '',
    rippleEffect ? 'btn-ripple' : '',
    typographyClasses,
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={elementRef}
      className={combinedClasses}
      style={{
        transform,
        boxShadow: glowEffect && isHovered ? '0 0 30px rgba(0, 255, 165, 0.4)' : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      aria-label={ariaLabel}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          // Trigger click behavior
        }
      }}
    >
      {children}

      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute animate-ping rounded-full bg-white/30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </div>
  )
}

export default MagneticButton
