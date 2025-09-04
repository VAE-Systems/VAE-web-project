/**
 * Touch-Friendly Card Component
 *
 * Optimized card for mobile touch interactions
 */

import React from 'react'
import TouchHandler from '../mobile/TouchHandler'

interface TouchCardProps {
  children: React.ReactNode
  onClick?: () => void
  onLongPress?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  disabled?: boolean
  longPressDelay?: number
  touchThreshold?: number
}

const TouchCard: React.FC<TouchCardProps> = ({
  children,
  onClick,
  onLongPress,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className = '',
  padding = 'md',
  interactive = false,
  disabled = false,
  longPressDelay,
  touchThreshold
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

  const minHeightClass = interactive ? 'min-h-[44px]' : ''

  const cardContent = (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${interactiveClasses} ${disabledClass} ${minHeightClass} touch-manipulation ${className}`}
      onClick={interactive ? handleClick : undefined}
      style={{
        WebkitTapHighlightColor: 'transparent'
      }}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled}
    >
      {children}
    </div>
  )

  // Wrap with TouchHandler if advanced touch features are needed
  if (onLongPress || onSwipeLeft || onSwipeRight || onSwipeUp || onSwipeDown) {
    return (
      <TouchHandler
        onTap={interactive ? handleClick : undefined}
        onLongPress={onLongPress}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        disabled={disabled}
        longPressDelay={longPressDelay}
        touchThreshold={touchThreshold}
        className={className}
      >
        {cardContent}
      </TouchHandler>
    )
  }

  return cardContent
}

export default TouchCard
