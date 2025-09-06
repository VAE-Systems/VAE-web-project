import React from 'react'

interface StatCardProps {
  value: string
  label: string
  description?: string
  className?: string
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  description,
  className = ''
}) => {
  return (
    <div className={`card-vae text-center p-6 ${className}`} role="region" aria-labelledby={`stat-${value}`}>
      <div id={`stat-${value}`} className="text-3xl md:text-4xl font-bold text-vae-turquoise mb-2" aria-label={`${value} ${label}`}>
        {value}
      </div>
      <div className="text-sm text-text-secondary mb-2">{label}</div>
      {description && (
        <div className="text-xs text-text-muted">{description}</div>
      )}
    </div>
  )
}

export default StatCard
