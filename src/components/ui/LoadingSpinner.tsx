import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'base' | 'lg'
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'base',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    base: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div
      className={`loading-spinner ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Lädt..."
    >
      <span className="sr-only">Lädt...</span>
    </div>
  )
}

export default LoadingSpinner
