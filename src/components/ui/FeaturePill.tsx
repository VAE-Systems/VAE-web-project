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
  // Variants stay subtle and readable on hell/dunkel:
  // - gold: warm Akzent, transparenter Hintergrund
  // - silver: kühler, neutraler Ton
  // - neutral: minimale Linie, dezente Fläche
  const variantClasses =
    variant === 'gold'
      ? 'border border-amber-400/50 bg-amber-400/10 text-amber-900 shadow-[0_8px_28px_-16px_rgba(212,175,55,0.18)] dark:border-amber-300/60 dark:bg-amber-300/12 dark:text-white'
      : variant === 'silver'
        ? 'border border-slate-300/70 bg-slate-100/60 text-slate-900 dark:border-white/20 dark:bg-white/5 dark:text-white'
        : 'border border-black/10 bg-white/70 text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-white'

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
