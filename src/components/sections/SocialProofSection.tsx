import Icon from '@/components/ui/Icon'
import { referenceInsights, referenceProjects } from '@/content/home'
import React from 'react'

const SocialProofSection: React.FC = () => {
  return (
    <section
      id="social-proof"
      className="relative border-t border-gray-200 bg-white py-20 dark:border-white/5 dark:bg-bg-darker sm:py-28"
    >
      <div className="container-vae">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Social Proof</p>
          <h2 className="fluid-h2 mt-3 font-semibold text-gray-900 dark:text-text-light">Projekte & Referenzen</h2>
        </header>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {referenceProjects.map(project => (
            <article
              key={project.id}
              className="group flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-lg hover:shadow-vae-turquoise/10 dark:border-white/10 dark:bg-white/5 dark:shadow-vae-turquoise/20"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {project.logo ? (
                    <img
                      src={project.logo}
                      alt={`${project.client} Logo`}
                      className={[
                        'h-14 w-auto max-w-[180px] transition-transform duration-300 group-hover:scale-110',
                        (project.invertOnDark || project.invertOnLight) && 'filter',
                        project.invertOnDark && 'dark:invert',
                        project.invertOnLight && 'invert',
                        project.invertOnLight && 'dark:invert-0',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-sm font-semibold uppercase tracking-[0.35em] text-gray-700 dark:bg-white/10 dark:text-white/70">
                      {project.client
                        .split(' ')
                        .map(word => word.charAt(0))
                        .join('')
                        .slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-text-secondary">{project.client}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">
                      {project.status}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-text-secondary">
                  {project.badge}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-text-light">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-text-secondary">
                {project.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-text-secondary">
                {project.highlights.map(highlight => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vae-turquoise" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              {project.role && <p className="mt-4 text-xs text-gray-500 dark:text-text-muted">{project.role}</p>}
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {referenceInsights.map(insight => (
            <div
              key={insight.id}
              className="group flex flex-col gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-vae-turquoise/60 hover:shadow-md dark:border-white/10 dark:bg-white/[0.05]"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-vae-turquoise/15 text-vae-turquoise transition-transform duration-300 group-hover:scale-110">
                <Icon name={insight.icon} size={20} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-900 dark:text-text-light">
                {insight.title}
              </p>
              <p className="text-sm text-gray-700 dark:text-text-secondary">{insight.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-text-muted">
          Detaillierte Case Studies und Kundenzitate folgen. Aktuell im Aufbau.
        </p>
      </div>
    </section>
  )
}

export default SocialProofSection
