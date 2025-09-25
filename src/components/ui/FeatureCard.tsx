import React from 'react'
import MagneticButton from './buttons/MagneticButton'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  magnetic?: boolean
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, className = '', magnetic = false }) => {
  const CardContent = () => (
    <div className={`card-vae p-6 text-center ${className}`}>
      <div className="mx-auto mb-6 h-12 w-12 text-vae-turquoise">{icon}</div>
      <h3 className="mb-3 text-lg font-semibold text-text-light">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
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
