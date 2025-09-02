/**
 * Touch-Friendly Button Component
 *
 * Optimized button for mobile touch interactions
 */

import React from 'react'

interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

const TouchButton: React.FC<TouchButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-darker active:scale-95'

  const variantClasses = {
    primary: 'bg-vae-turquoise text-bg-darker hover:bg-vae-turquoise/90 focus:ring-vae-turquoise',
    secondary: 'bg-bg-secondary text-text-light hover:bg-bg-secondary/80 focus:ring-bg-secondary',
    outline: 'border-2 border-vae-turquoise text-vae-turquoise hover:bg-vae-turquoise hover:text-bg-darker focus:ring-vae-turquoise',
    ghost: 'text-text-light hover:bg-bg-secondary focus:ring-bg-secondary'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[44px] min-w-[44px]', // 44px minimum for touch targets
    md: 'px-6 py-3 text-base min-h-[48px] min-w-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px] min-w-[56px]'
  }

  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default TouchButton
