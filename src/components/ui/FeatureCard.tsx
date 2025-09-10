import React from 'react'
import MagneticButton from './MagneticButton'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  magnetic?: boolean
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = '',
  magnetic = false
}) => {
  const CardContent = () => (
    <div className={`card-vae text-center p-6 ${className}`}>
      <div className="w-12 h-12 text-vae-turquoise mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text-light mb-3">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  )

  if (magnetic) {
    return (
      <MagneticButton>
        <CardContent />
      </MagneticButton>
    )
  }

  return <CardContent />
}

export default FeatureCard
