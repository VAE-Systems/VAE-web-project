import React from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from './MagneticButton'
import { ServiceData } from '../../types'

interface ServiceCardProps {
  service: ServiceData
  servicePath: Record<string, string>
  superscripts: Record<string, string>
}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ service, servicePath, superscripts }) => {
  return (
    <div className="group relative p-8 rounded-2xl bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10 backdrop-blur-sm overflow-hidden flex flex-col h-full transition-all duration-500 hover:border-vae-turquoise/40 hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_12px_44px_-10px_rgba(var(--vae-turquoise-rgb),0.4)]">
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)]" />
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-vae-turquoise/20 text-vae-turquoise flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">{service.iconName}</span>
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-vae-turquoise/80">{service.title.split(' – ')[0]}</span>
        </div>
        <span className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium tracking-wide">{service.badge}</span>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-lg font-semibold text-text-light dark:text-white mb-3 leading-tight">{service.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">{service.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {service.stats.map((st, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg font-bold text-vae-turquoise mb-1">{st.value}</div>
              <div className="text-[11px] text-text-muted leading-tight">
                {st.desc}
                {st.note && <sup className="text-vae-turquoise/60 text-[10px] ml-1">{superscripts[st.note]}</sup>}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="text-xs font-medium text-text-light dark:text-white mb-2">Schwerpunkte:</div>
          <div className="flex flex-wrap gap-2">
            {service.features.map(f => (
              <span key={f} className="px-2 py-1 rounded-md bg-vae-turquoise/10 text-vae-turquoise text-[10px] font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>

        <MagneticButton className="mt-auto">
          <Link
            to={servicePath[service.key] || '/services'}
            className="btn-convert gap-2"
            aria-label={`${service.title} – Details ansehen`}
            data-pulse={service.key === 'consulting'}
          >
            {service.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
        </MagneticButton>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.10),transparent_70%)]" />
    </div>
  )
})

ServiceCard.displayName = 'ServiceCard'

export default ServiceCard
