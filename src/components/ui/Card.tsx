import React from 'react'
import Button from './Button'
import { useTheme } from '@/contexts/ThemeContext'

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
const Card: React.FC<CardProps> = ({ as = 'article', title, lead, body, bullets = [], badge, link, cta = 'Mehr dazu', children, className = '', animate = true, accent = false, ...rest }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const Tag = as
  const baseClass = (
    `group relative rounded-2xl border ${isLight ? 'border-border-primary' : 'border-vae-turquoise/20'} ` +
    `${isLight ? 'bg-white/60' : 'bg-vae-turquoise/5'} backdrop-blur-md p-7 flex flex-col h-full overflow-hidden transition-all duration-400 ` +
    `${isLight ? 'hover:border-black/15 hover:shadow-[0_12px_40px_-14px_rgba(0,0,0,0.30)]' : 'hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_8px_36px_-8px_rgba(var(--vae-turquoise-rgb),0.35)]'} ` +
    className
  ).trim()

  return React.createElement(
    Tag,
    { ...rest, className: baseClass, 'data-animate': animate ? true : undefined },
    <>
      {!isLight && (
        <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
      )}
      {(title || badge) && (
        <div className="flex items-center justify-between mb-5 relative z-10">
          {title && (
            <span className={`text-xs font-semibold tracking-wider uppercase ${isLight ? 'text-text-muted' : 'text-vae-turquoise/80'}`}>{title}</span>
          )}
          {badge && (
            <span className={`px-2 py-1 rounded-md text-[10px] font-medium tracking-wide ${isLight ? 'bg-black/5 text-text-secondary border border-black/10' : 'bg-vae-turquoise/10 text-vae-turquoise'}`}>{badge}</span>
          )}
        </div>
      )}

      {lead && <h3 className={`text-xl md:text-2xl font-bold mb-3 leading-snug relative z-10 ${accent ? 'text-vae-turquoise' : 'text-text-light'}`}>{lead}</h3>}
      {body && <p className="text-sm text-text-secondary leading-relaxed mb-5 relative z-10">{body}</p>}

      {bullets.length > 0 && (
        <ul className="space-y-2 mb-6 relative z-10">
          {bullets.map(b => (
            <li key={b} className="flex items-center gap-2 text-[12px] text-text-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`${isLight ? 'text-text-secondary' : 'text-vae-turquoise'} flex-shrink-0`}><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
              {b}
            </li>
          ))}
        </ul>
      )}

      {children}

      {link ? (
        <div className="mt-auto">
          <Button to={link} variant="convert" className="inline-flex gap-2 text-[11px]" aria-label={`${cta} - ${lead || title || ''}`}>
            {cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default Card
