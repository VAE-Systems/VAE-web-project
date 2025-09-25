import React, { useEffect, useRef } from 'react'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  speed?: number
  delay?: number
}

/**
 * Floating Element Component
 * Creates a subtle floating animation effect
 */
const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  intensity = 8,
  speed = 3,
  delay = 0,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const startAnimation = () => {
      element.style.animation = `float ${speed}s ease-in-out infinite`
      element.style.animationDelay = `${delay}s`
    }

    const timer = setTimeout(startAnimation, delay * 1000)
    return () => clearTimeout(timer)
  }, [speed, delay])

  return (
    <div
      ref={elementRef}
      className={`inline-block ${className}`}
      style={
        {
          animation: `float ${speed}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          '--float-intensity': `${intensity}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

export default FloatingElement
