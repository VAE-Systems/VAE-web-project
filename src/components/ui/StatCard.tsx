import React from 'react'

interface StatCardProps {
  value: string
  label: string
  description?: string
  className?: string
}

const StatCard: React.FC<StatCardProps> = ({ value, label, description, className = '' }) => {
  return (
    <div className={`card-vae p-6 text-center ${className}`} role="region" aria-labelledby={`stat-${value}`}>
      <div
        id={`stat-${value}`}
        className="mb-2 text-3xl font-bold text-vae-turquoise md:text-4xl"
        aria-label={`${value} ${label}`}
      >
        {value}
      </div>
      <div className="mb-2 text-sm text-text-secondary">{label}</div>
      {description && <div className="text-xs text-text-muted">{description}</div>}
    </div>
  )
}

export default StatCard
