import React from 'react'
import { Zap } from 'lucide-react'

interface TimeSavedBadgeProps {
  text: string
  className?: string
}

/**
 * TimeSavedBadge Component
 *
 * Displays a badge with lightning icon and time saved text
 * Used for highlighting time savings in comparisons
 */
const TimeSavedBadge: React.FC<TimeSavedBadgeProps> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Zap className="w-5 h-5 text-vae-turquoise" />
      <span className="text-sm text-vae-turquoise font-medium">{text}</span>
    </div>
  )
}

export default TimeSavedBadge
