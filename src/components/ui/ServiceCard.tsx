import React from 'react'
import { Link } from 'react-router-dom'
import { ServiceData } from '../../types'
import Icon from './Icon'
import MagneticButton from './MagneticButton'

interface ServiceCardProps {
  service: ServiceData
  servicePath: Record<string, string>
  superscripts: Record<string, string>
}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ service, servicePath, superscripts }) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[#b7c1bc] bg-white p-8 backdrop-blur-sm transition-all duration-500 hover:border-vae-turquoise hover:shadow-[0_10px_22px_rgba(18,24,20,0.10)] dark:border dark:border-white/10 dark:bg-white/5 dark:hover:border-vae-turquoise/40 dark:hover:shadow-[0_0_0_1px_rgba(var(--vae-turquoise-rgb),0.25),0_12px_44px_-10px_rgba(var(--vae-turquoise-rgb),0.4)]">
      <div className="pointer-events-none absolute -inset-px hidden bg-[radial-gradient(circle_at_30%_25%,rgba(var(--vae-turquoise-rgb),0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:block" />
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vae-turquoise/20 text-vae-turquoise">
            <Icon name={service.iconName} className="text-vae-turquoise" size={24} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-vae-turquoise/80">
            {service.title.split(' – ')[0]}
          </span>
        </div>
        <span className="rounded-md bg-vae-turquoise/10 px-2 py-1 text-[10px] font-medium tracking-wide text-vae-turquoise">
          {service.badge}
        </span>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="mb-3 text-lg font-semibold leading-tight text-text-light dark:text-white">{service.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-text-secondary">{service.description}</p>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {service.stats.map((st, idx) => (
            <div key={idx} className="text-center">
              <div className="mb-1 text-lg font-bold text-vae-turquoise">{st.value}</div>
              <div className="text-[11px] leading-tight text-text-muted">
                {st.desc}
                {st.note && <sup className="ml-1 text-[10px] text-vae-turquoise/60">{superscripts[st.note]}</sup>}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="mb-2 text-xs font-medium text-text-light dark:text-white">Schwerpunkte:</div>
          <div className="flex flex-wrap gap-2">
            {service.features.map(f => (
              <span
                key={f}
                className="rounded-md bg-vae-turquoise/10 px-2 py-1 text-[10px] font-medium text-vae-turquoise"
              >
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
              <path d="M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 6h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
        </MagneticButton>
      </div>
      <div className="pointer-events-none absolute inset-0 hidden rounded-2xl bg-[radial-gradient(circle_at_30%_22%,rgba(var(--vae-turquoise-rgb),0.10),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:block" />
    </div>
  )
})

ServiceCard.displayName = 'ServiceCard'

export default ServiceCard
