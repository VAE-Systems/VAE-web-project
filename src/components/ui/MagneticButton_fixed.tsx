import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { FontSize, FontWeight, getTypographyClasses } from '../../types/typography'

/**
 * Props for the MagneticButton component
 * @interface MagneticButtonProps
 */
interface MagneticButtonProps {
  /** The content to be rendered inside the button */
  children: React.ReactNode
  /** Additional CSS classes for styling */
  className?: string
  /** Magnetic effect intensity (0.01 - 0.1 recommended) */
  intensity?: number
  /** Whether the button is disabled */
  disabled?: boolean
  /** Enable glow effect on hover */
  glowEffect?: boolean
  /** Enable ripple effect on click */
  rippleEffect?: boolean
  /** Enable scale effect on hover */
  scaleEffect?: boolean
  /** Typography size for the button text */
  textSize?: FontSize
  /** Typography weight for the button text */
  textWeight?: FontWeight
  /** Accessibility label for screen readers */
  ariaLabel?: string
  /** Enable hardware acceleration for better performance */
  enableHardwareAcceleration?: boolean
}

/**
 * Ripple effect data structure
 * @interface Ripple
 */
interface Ripple {
  /** Unique identifier for the ripple */
  id: number
  /** X coordinate of the ripple center */
  x: number
  /** Y coordinate of the ripple center */
  y: number
}

/**
 * Enhanced Magnetic Button Component with Advanced Interactions
 *
 * Features:
 * - Magnetic hover effect that follows cursor
 * - Optional glow, ripple, and scale effects
 * - Hardware acceleration for smooth performance
 * - Accessibility support
 * - Memory leak prevention
 * - Bug-free animations
 *
 * @component
 * @example
 * ```tsx
 * <MagneticButton
 *   glowEffect
 *   rippleEffect
 *   scaleEffect
 *   intensity={0.08}
 * >
 *   Enhanced Button
 * </MagneticButton>
 * ```
 *
 * @param {MagneticButtonProps} props - The component props
 * @returns {JSX.Element} The rendered magnetic button
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
  // State management with stable references
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Refs for DOM manipulation
  const elementRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)
  const animationFrameRef = useRef<number>()
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Memoized typography classes to prevent unnecessary recalculations
  const typographyClasses = useMemo(
    () =>
      getTypographyClasses({
        size: textSize,
        weight: textWeight,
      }),
    [textSize, textWeight]
  )

  // Stable event handlers using useCallback
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !elementRef.current) return

      // Cancel previous animation frame for smooth performance
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!elementRef.current) return

        const rect = elementRef.current.getBoundingClientRect()
        const newPos = {
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2,
        }

        // Only update if position actually changed significantly to prevent unnecessary renders
        setMousePos(prevPos => {
          const threshold = 0.5 // Minimum movement threshold
          if (Math.abs(prevPos.x - newPos.x) > threshold || Math.abs(prevPos.y - newPos.y) > threshold) {
            return newPos
          }
          return prevPos
        })
      })
    },
    [disabled]
  )

  const handleMouseLeave = useCallback(() => {
    // Smooth transition back to center
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
    setIsAnimating(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setIsAnimating(true)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!rippleEffect || !elementRef.current || disabled) return

      const rect = elementRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x,
        y,
      }

      setRipples(prev => [...prev, newRipple])

      // Clean up ripple after animation with proper timeout management
      timeoutRef.current = setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 600)
    },
    [rippleEffect, disabled]
  )

  // Performance optimization: Hardware acceleration management
  useEffect(() => {
    if (enableHardwareAcceleration && elementRef.current) {
      elementRef.current.style.willChange = 'transform'
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.style.willChange = 'auto'
      }
    }
  }, [enableHardwareAcceleration])

  // Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Calculate transform with smooth transitions
  const transform = useMemo(() => {
    const translateX = mousePos.x * intensity
    const translateY = mousePos.y * intensity
    const scale = scaleEffect && isHovered ? 1.05 : 1

    return `translate(${translateX}px, ${translateY}px) scale(${scale})`
  }, [mousePos.x, mousePos.y, intensity, scaleEffect, isHovered])

  // Memoized class names for stable rendering
  const combinedClasses = useMemo(
    () =>
      [
        'inline-block',
        'transition-all duration-300 ease-out',
        enableHardwareAcceleration ? 'will-change-transform' : '',
        glowEffect ? 'glow-hover' : '',
        rippleEffect ? 'btn-ripple' : '',
        typographyClasses,
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        isAnimating ? 'animating' : '',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [enableHardwareAcceleration, glowEffect, rippleEffect, typographyClasses, disabled, isAnimating, className]
  )

  // Memoized styles for stable rendering
  const buttonStyles = useMemo(
    () => ({
      transform,
      boxShadow: glowEffect && isHovered ? '0 0 30px rgba(0, 255, 165, 0.4)' : undefined,
      // Ensure stable rendering by including all dynamic styles
      transition: isAnimating
        ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
        : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
    [transform, glowEffect, isHovered, isAnimating]
  )

  return (
    <div
      ref={elementRef}
      className={combinedClasses}
      style={buttonStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      aria-label={ariaLabel}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault()
          // Trigger click behavior can be extended with onClick prop
        }
      }}
    >
      {children}

      {/* Ripple Effects - Only render when needed */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            // Ensure smooth animation with proper timing
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      ))}
    </div>
  )
}

export default MagneticButton

// Export types for external usage
export type { MagneticButtonProps }
