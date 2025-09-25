import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'base' | 'lg'
  className?: string
  color?: 'turquoise' | 'white' | 'muted'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'base', className = '', color = 'turquoise' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    base: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const colorClasses = {
    turquoise: 'border-vae-turquoise',
    white: 'border-white',
    muted: 'border-text-muted',
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full border-2 border-t-transparent`}
        style={{
          animation: 'spin 1s linear infinite',
        }}
        role="status"
        aria-label="Lädt..."
      >
        <span className="sr-only">Lädt...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner
