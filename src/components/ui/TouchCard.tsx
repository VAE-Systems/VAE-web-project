/**
 * Touch-Friendly Card Component
 *
 * Optimized card for mobile touch interactions
 */

import React from 'react'

interface TouchCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  disabled?: boolean
}

const TouchCard: React.FC<TouchCardProps> = ({
  children,
  onClick,
  className = '',
  padding = 'md',
  interactive = false,
  disabled = false
}) => {
  const baseClasses = 'bg-bg-secondary border border-border-primary rounded-lg transition-all duration-200'

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const interactiveClasses = interactive
    ? 'cursor-pointer hover:bg-bg-secondary/80 hover:border-vae-turquoise/50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50 focus:ring-offset-2 focus:ring-offset-bg-darker'
    : ''

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
      // Add haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(10)
      }
    }
  }

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${interactiveClasses} ${disabledClass} ${className}`}
      onClick={handleClick}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        minHeight: interactive ? '44px' : 'auto' // Minimum touch target
      }}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled}
    >
      {children}
    </div>
  )
}

export default TouchCard
