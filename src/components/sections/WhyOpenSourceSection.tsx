import React from 'react'
import { openSourceAdvantages, openSourcePainPoints } from '@/content/home'

const WhyOpenSourceSection: React.FC = () => {
  const scrollToTech = React.useCallback(() => {
    const target = document.getElementById('tech-showcase')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section
      id="why-open-source"
      className="border-border-primary from-bg-primary relative border-t bg-gradient-to-b to-bg-secondary py-20 dark:border-white/5 dark:from-bg-darker dark:to-bg-dark/80 sm:py-28"
    >
      <div className="container-vae">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-vae-turquoise/70">Warum Open Source?</p>
          <h2 className="fluid-h2 mt-3 text-balance font-semibold text-text-light">
            Warum wechseln Unternehmen von SaaS zu Open Source?
          </h2>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <article className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-[0_30px_120px_-50px_rgba(5,212,182,0.35)] backdrop-blur-sm">
            <header className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-200/80">Das Problem</p>
              <h3 className="text-2xl font-semibold text-text-light">Das SaaS-Dilemma</h3>
            </header>
            <ul className="space-y-5 text-sm leading-relaxed text-text-secondary">
              {openSourcePainPoints.map(point => (
                <li key={point.title}>
                  <p className="font-semibold text-text-light">{point.title}</p>
                  <p>{point.description}</p>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-vae-turquoise/20 bg-vae-turquoise/5 p-8 backdrop-blur-sm">
            <header className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-vae-turquoise/80">Die Lösung</p>
              <h3 className="text-2xl font-semibold text-text-light">Die Open-Source-Alternative</h3>
            </header>
            <ul className="space-y-5 text-sm leading-relaxed text-text-secondary">
              {openSourceAdvantages.map(point => (
                <li key={point.title}>
                  <p className="font-semibold text-text-light">{point.title}</p>
                  <p>{point.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button
                type="button"
                onClick={scrollToTech}
                className="text-sm font-semibold text-vae-turquoise underline-offset-4 transition hover:underline"
              >
                Tech-Stack ansehen ↓
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default WhyOpenSourceSection
