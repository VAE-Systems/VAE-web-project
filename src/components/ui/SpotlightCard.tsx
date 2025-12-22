import { useTheme } from '@/contexts/ThemeContext'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export interface SpotlightCardProps extends React.PropsWithChildren {
  title: string
  description: string
  to: string
  cta: string
  className?: string
  small?: boolean
  iconSlot?: React.ReactNode
  footerSlot?: React.ReactNode
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  title,
  description,
  to,
  cta,
  className = '',
  small,
  children,
  iconSlot,
  footerSlot,
}) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [coords, setCoords] = useState({ x: '50%', y: '40%' })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const handleMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCoords({ x: x + '%', y: y + '%' })
  }

  const slug = slugify(title)
  const headingId = `${slug}-title`

  return (
    <article
      id={slug}
      aria-labelledby={headingId}
      onMouseMove={reducedMotion ? undefined : handleMove}
      className={`group relative rounded-2xl border dark:border-white/10 ${isLight ? 'border-[#c5ccc8] bg-white/90' : 'bg-bg-primary/5 border-vae-turquoise/20 dark:bg-white/5'} overflow-hidden backdrop-blur-md transition-all duration-500 ${className} ${!reducedMotion ? (isLight ? 'hover:border-vae-turquoise/60 hover:shadow-[0_14px_46px_-14px_rgba(29,184,122,0.32)]' : 'hover:border-vae-turquoise/45 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_12px_44px_-10px_rgba(var(--vae-turquoise-rgb),0.4)]') : ''}`.trim()}
      style={
        reducedMotion ? undefined : ({ ['--sx' as any]: coords.x, ['--sy' as any]: coords.y } as React.CSSProperties)
      }
    >
      {!reducedMotion && (
        <div
          className={`pointer-events-none absolute -inset-px ${isLight ? 'bg-[radial-gradient(600px_circle_at_var(--sx)_var(--sy),rgba(29,184,122,0.12),transparent_70%)]' : 'bg-[radial-gradient(600px_circle_at_var(--sx)_var(--sy),rgba(var(--vae-turquoise-rgb),0.18),transparent_70%)]'} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />
      )}
      <div className="relative z-10 flex h-full flex-col p-6">
        {iconSlot && <div className="mb-4">{iconSlot}</div>}
        <h3 id={headingId} className="mb-2 text-sm font-semibold leading-snug text-text-light dark:text-white">
          {title}
        </h3>
        <p
          className={`mb-4 text-xs leading-relaxed text-text-secondary ${children ? '' : 'line-clamp-4'} flex-grow ${small ? 'mb-3' : ''}`}
        >
          {description}
        </p>
        {children && <div className="mb-5 space-y-1 text-[11px] text-text-muted">{children}</div>}
        {footerSlot && <div className="mb-4 mt-auto text-[10px] text-text-muted">{footerSlot}</div>}
        <Link to={to} className="btn-convert mt-auto inline-flex h-10 items-center gap-2 px-3 py-2 text-[10px]">
          {cta}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default SpotlightCard
