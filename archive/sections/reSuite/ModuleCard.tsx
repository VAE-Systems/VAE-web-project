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
    <article
      className={`${baseCard} ${isLight ? 'hover:border-black/15 hover:shadow-[0_12px_40px_-14px_rgba(var(--color-black-rgb),0.30)]' : 'hover:border-vae-turquoise/40'} flex flex-col transition-all`}
    >
      <header className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-light dark:text-white">{module.name}</h3>
          <p
            className={`mt-1 text-xs uppercase tracking-wide ${isLight ? 'text-text-muted' : 'text-vae-turquoise/70'}`}
          >
            {module.tagline}
          </p>
        </div>
        <span className="bg-bg-primary/10 border-border-primary rounded-full border px-2 py-1 text-xs font-medium text-text-secondary dark:border-slate-700/20 dark:bg-slate-700/10 dark:text-slate-200">
          {module.status || 'Concept'}
        </span>
      </header>

      <div className="mb-3 text-sm text-text-secondary">
        <div className="mb-1">
          <span className="font-semibold text-text-light dark:text-white">Pain:</span>{' '}
          <span className="text-text-muted">{module.pain}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-text-light dark:text-white">Approach:</span>{' '}
          <span className="text-text-muted">{module.approach}</span>
        </div>
      </div>

      <ul className="mb-3 space-y-2 text-[13px] text-text-secondary">
        {module.features.slice(0, 4).map(f => (
          <li key={f} className="flex items-start gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className={`${isLight ? 'text-text-secondary' : 'text-vae-turquoise'} flex-shrink-0`}
            >
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mb-3 flex flex-wrap gap-2">
        {module.coreLayers.map(layer => (
          <span
            key={layer}
            className="bg-bg-primary/10 border-border-primary rounded border px-2 py-1 text-[10px] text-text-muted dark:border-white/10 dark:bg-white/10"
          >
            {layer}
          </span>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {module.integrations.map(i => (
          <span
            key={i}
            className="bg-bg-primary/5 rounded-full border px-2 py-1 text-[10px] font-medium text-text-secondary dark:bg-white/5"
          >
            {i}
          </span>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {module.demoFlow.map(step => (
          <span
            key={step}
            className="bg-bg-primary/3 dark:bg-white/3 rounded-full px-3 py-1 text-xs text-text-secondary dark:text-white/90"
          >
            {step}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3">
        <Link to="/contact" className="btn-primary btn-compact whitespace-nowrap">
          Demo anfragen
        </Link>
        <Link to={`/products/solutions/${module.slug}`} className="btn-secondary btn-compact whitespace-nowrap">
          Details
        </Link>
      </div>
    </article>
  )
}

export default ModuleCard
