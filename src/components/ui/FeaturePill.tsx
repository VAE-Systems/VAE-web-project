import React from 'react'

type Props = {
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  variant?: 'neutral' | 'gold' | 'silver'
}

/**
 * Small rounded pill used to highlight included features like "Kundenaccount inkl.".
 * Designed for dark backgrounds (uses translucent white background and gold accent for the icon).
 */
export const FeaturePill: React.FC<Props> = ({ icon, children, className = '', variant = 'neutral' }) => {
  // Improved variant styling for better contrast on dark backgrounds.
  // Gold: warm accent, subtle glow.
  // Silver: cool, slightly bluish tint so it reads on dark backgrounds.
  const variantClasses =
    variant === 'gold'
      ? 'border border-amber-500/30 text-white bg-amber-500/6 shadow-[0_6px_20px_-12px_rgba(212,175,55,0.14)]'
      : variant === 'silver'
        ? 'border border-sky-400/25 text-white bg-sky-400/6'
        : 'border border-white/6 text-white bg-white/4'

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${variantClasses} ${className}`}
      role="status"
    >
      {/* optional icon kept for backwards compatibility, but default is no icon for the pill variant */}
      {icon && <span className="flex h-4 w-4 items-center justify-center">{icon}</span>}
      <span className="leading-4">{children}</span>
    </span>
  )
}

export default FeaturePill
