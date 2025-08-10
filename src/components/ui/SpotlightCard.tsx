import React, { useState } from 'react'
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

const SpotlightCard: React.FC<SpotlightCardProps> = ({ title, description, to, cta, className = '', small, children, iconSlot, footerSlot }) => {
  const [coords, setCoords] = useState({ x: '50%', y: '40%' })
  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCoords({ x: x + '%', y: y + '%' })
  }
  return (
    <div
      onMouseMove={handleMove}
      className={`relative group rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-vae-turquoise/45 hover:shadow-[0_0_0_1px_rgba(0,255,165,0.25),0_12px_44px_-10px_rgba(0,255,165,0.4)] ${className}`}
      style={{ ['--sx' as any]: coords.x, ['--sy' as any]: coords.y }}
    >
      <div
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(600px circle at var(--sx) var(--sy), rgba(0,255,165,0.18), transparent 70%)' }}
      />
      <div className="relative z-10 p-6 flex flex-col h-full">
        {iconSlot && <div className="mb-4">{iconSlot}</div>}
        <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{title}</h3>
        <p className={`text-xs text-text-secondary leading-relaxed mb-4 ${children ? '' : 'line-clamp-4'} flex-grow ${small ? 'mb-3' : ''}`}>{description}</p>
        {children && <div className="mb-5 text-[11px] text-text-muted space-y-1">{children}</div>}
        {footerSlot && <div className="mt-auto mb-4 text-[10px] text-text-muted">{footerSlot}</div>}
        <Link to={to} className="btn-convert text-[10px] gap-2 py-2 px-3 h-10 inline-flex items-center mt-auto">{cta}<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7H7" stroke="currentColor" strokeWidth="2"/></svg></Link>
      </div>
    </div>
  )
}

export default SpotlightCard
