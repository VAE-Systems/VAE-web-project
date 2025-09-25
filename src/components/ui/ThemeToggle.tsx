import React from 'react'
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/classNames'

export interface ThemeToggleProps {
  className?: string
  label?: string
  variant?: 'icon' | 'button'
}

const srOnly = 'sr-only'

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  label = 'Darstellung umschalten',
  variant = 'icon',
}) => {
  const { theme, toggleTheme, isReady } = useTheme()

  const isDark = theme === 'dark'
  const title = isDark ? 'Wechsel zu hellem Modus' : 'Wechsel zu dunklem Modus'

  const baseClasses =
    'inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/40 p-2 text-slate-100 shadow-sm transition-colors hover:border-emerald-400 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 dark:border-slate-500/70 dark:bg-slate-700/40 dark:text-slate-50'
  const buttonVariantClasses = variant === 'button' ? 'px-3 py-2 text-sm font-medium gap-2 rounded-md' : undefined
  const iconWrapperClasses = cn(
    !isReady && 'motion-safe:animate-pulse',
    'transition-transform duration-300 ease-in-out'
  )

  return (
    <button
      type="button"
      className={cn(baseClasses, buttonVariantClasses, className)}
      aria-label={label}
      title={title}
      onClick={toggleTheme}
      disabled={!isReady}
    >
      <span className={iconWrapperClasses}>
        {isDark ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
      </span>
      {variant === 'button' && (
        <span className="ml-2 text-xs font-semibold uppercase tracking-wide">{isDark ? 'Dark' : 'Light'}</span>
      )}
      <span className={srOnly}>{label}</span>
    </button>
  )
}
