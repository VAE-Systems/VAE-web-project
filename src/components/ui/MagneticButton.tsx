import React, { useCallback, useRef, useState } from 'react'

export interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  disabled?: boolean
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  intensity = 0.05,
  disabled = false
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (disabled || !elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setPosition({ x: x * intensity, y: y * intensity })
  }, [intensity, disabled])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }, [])

  const transform = `translate(${position.x}px, ${position.y}px)`

  return (
    <div
      ref={elementRef}
      className={`inline-block transition-transform duration-300 ease-out ${disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'} ${className}`}
      style={{
        transform,
        willChange: isHovered ? 'transform' : 'auto'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default MagneticButton
