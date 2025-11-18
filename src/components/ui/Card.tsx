import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/classNames'
import React, { useMemo } from 'react'
import Button from './Button'

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
  title?: string
  lead?: string
  body?: string
  bullets?: string[]
  badge?: string
  link?: string
  cta?: string
  children?: React.ReactNode
  className?: string
  animate?: boolean
  accent?: boolean // emphasize heading in brand green
}

/**
 * Reusable Card component for Services / Products
 * Keeps visual style consistent across pages.
 *
 * Note:
 * - `as` allows rendering the Card as a specific HTML element (e.g. 'li') to preserve semantics.
 * - forwards native HTML attributes (data-*, aria-*, id, etc.) to the root element.
 */
const Card: React.FC<CardProps> = ({
  as = 'article',
  title,
  lead,
  body,
  bullets = [],
  badge,
  link,
  cta = 'Mehr dazu',
  children,
  className = '',
  animate = true,
  accent = false,
  ...rest
}) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const Tag = as

  const baseClass = useMemo(
    () =>
      cn(
        'group relative rounded-2xl border backdrop-blur-md p-7 flex flex-col h-full overflow-hidden transition-all duration-400',
        isLight ? 'border-border-primary bg-white/60' : 'border-vae-turquoise/20 bg-vae-turquoise/5',
        isLight
          ? 'hover:border-black/15 hover:shadow-[0_12px_40px_-14px_rgba(var(--color-black-rgb),0.30)]'
          : 'hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_8px_36px_-8px_rgba(var(--vae-turquoise-rgb),0.35)]',
        className
      ),
    [isLight, className]
  )

  return React.createElement(
    Tag,
    { ...rest, className: baseClass, 'data-animate': animate ? true : undefined },
    <>
      {!isLight && (
        <div className="pointer-events-none absolute -inset-px bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      {(title || badge) && (
        <div className="relative z-10 mb-5 flex items-center justify-between">
          {title && (
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-text-muted' : 'text-vae-turquoise/80'}`}
            >
              {title}
            </span>
          )}
          {badge && (
            <span
              className={`rounded-md px-2 py-1 text-[10px] font-medium tracking-wide ${isLight ? 'border border-black/10 bg-black/5 text-text-secondary' : 'bg-vae-turquoise/10 text-vae-turquoise'}`}
            >
              {badge}
            </span>
          )}
        </div>
      )}

      {lead && (
        <h3
          className={`relative z-10 mb-3 text-xl font-bold leading-snug md:text-2xl ${accent ? 'text-vae-turquoise' : 'text-text-light'}`}
        >
          {lead}
        </h3>
      )}
      {body && <p className="relative z-10 mb-5 text-sm leading-relaxed text-text-secondary">{body}</p>}

      {bullets.length > 0 && (
        <ul className="relative z-10 mb-6 space-y-2">
          {bullets.map(b => (
            <li key={b} className="flex items-center gap-2 text-[12px] text-text-secondary">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className={`${isLight ? 'text-text-secondary' : 'text-vae-turquoise'} flex-shrink-0`}
              >
                <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      )}

      {children}

      {link ? (
        <div className="mt-auto">
          <Button
            to={link}
            variant="convert"
            className="inline-flex gap-2 text-[11px]"
            aria-label={`${cta} - ${lead || title || ''}`}
          >
            {cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default Card
