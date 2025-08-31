import React from 'react'
import { Link } from 'react-router-dom'
import type { ReModule } from '../../../content/reSuite'
import { useTheme } from '@/contexts/ThemeContext'

interface ModuleCardProps {
  module: ReModule
}

const baseCard = 'p-6 rounded-2xl bg-bg-primary/5 dark:bg-white/5 border border-border-primary dark:border-white/10'

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
  <article className={`${baseCard} ${isLight ? 'hover:border-black/15 hover:shadow-[0_12px_40px_-14px_rgba(0,0,0,0.30)]' : 'hover:border-vae-turquoise/40'} transition-all flex flex-col`}>
    <header className="flex items-start justify-between mb-3">
      <div>
        <h3 className="font-semibold text-text-light dark:text-white text-lg">{module.name}</h3>
        <p className={`text-xs uppercase tracking-wide mt-1 ${isLight ? 'text-text-muted' : 'text-vae-turquoise/70'}`}>{module.tagline}</p>
      </div>
      <span className="px-2 py-1 rounded-full text-xs font-medium border bg-bg-primary/10 dark:bg-slate-700/10 text-text-secondary dark:text-slate-200 border-border-primary dark:border-slate-700/20">
        {module.status || 'Concept'}
      </span>
    </header>

    <div className="text-sm text-text-secondary mb-3">
      <div className="mb-1">
        <span className="font-semibold text-text-light dark:text-white">Pain:</span>{' '}
        <span className="text-text-muted">{module.pain}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-text-light dark:text-white">Approach:</span>{' '}
        <span className="text-text-muted">{module.approach}</span>
      </div>
    </div>

    <ul className="space-y-2 mb-3 text-[13px] text-text-secondary">
      {module.features.slice(0, 4).map((f) => (
        <li key={f} className="flex items-start gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`${isLight ? 'text-text-secondary' : 'text-vae-turquoise'} flex-shrink-0`}>
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>{f}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-2 mb-3">
      {module.coreLayers.map((layer) => (
        <span key={layer} className="px-2 py-1 rounded text-[10px] bg-bg-primary/10 dark:bg-white/10 text-text-muted border border-border-primary dark:border-white/10">
          {layer}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {module.integrations.map((i) => (
        <span key={i} className="px-2 py-1 rounded-full text-[10px] font-medium border bg-bg-primary/5 dark:bg-white/5 text-text-secondary">
          {i}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {module.demoFlow.map((step) => (
        <span key={step} className="px-3 py-1 rounded-full bg-bg-primary/3 dark:bg-white/3 text-xs text-text-secondary dark:text-white/90">
          {step}
        </span>
      ))}
    </div>

    <div className="mt-auto flex items-center gap-3">
      <Link to="/contact" className="btn-primary btn-compact whitespace-nowrap">Demo anfragen</Link>
      <Link to={`/products/solutions/${module.slug}`} className="btn-secondary btn-compact whitespace-nowrap">
        Details
      </Link>
    </div>
  </article>
  )
}

export default ModuleCard
