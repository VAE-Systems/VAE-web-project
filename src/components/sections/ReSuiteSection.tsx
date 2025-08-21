import React from 'react'
import { Link } from 'react-router-dom'
import { reSuiteIntro, reModules } from '../../content/reSuite'
import MailTeaserCard from './MailTeaserCard'

const ReSuiteSection: React.FC = () => {
  return (
    <section id="re-suite" className="relative pt-32 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
      <div className="container-vae max-w-5xl">
        {/* Mail‑Witz as Card */}
        <div className="mb-12 flex flex-col items-center justify-center">
          <MailTeaserCard />

          <h2 className="h2 heading-gradient text-center mt-8">{reSuiteIntro.title}</h2>
          <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mt-2">
            {reSuiteIntro.intro}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            {reSuiteIntro.bullets.map(b => (
              <span key={b} className="text-sm bg-white/5 px-3 py-1 rounded-full text-text-secondary">{b}</span>
            ))}
          </div>
        </div>

        {/* Grid aller Re: Module */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mb-16">
          {reModules.map((mod) => (
            <article
              key={mod.slug}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-vae-turquoise/40 transition-all flex flex-col"
            >
              <header className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white text-lg">{mod.name}</h3>
                  <p className="text-xs uppercase tracking-wide text-vae-turquoise/70 mt-1">{mod.tagline}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium border bg-slate-700/10 text-slate-200 border-slate-700/20">
                  {mod.status || 'Concept'}
                </span>
              </header>

              <div className="text-sm text-text-secondary mb-3">
                <div className="mb-1"><span className="font-semibold text-white">Pain:</span> <span className="text-text-muted">{mod.pain}</span></div>
                <div className="mb-2"><span className="font-semibold text-white">Approach:</span> <span className="text-text-muted">{mod.approach}</span></div>
              </div>

              <ul className="space-y-2 mb-3 text-[13px] text-text-secondary">
                {mod.features.slice(0, 4).map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-vae-turquoise flex-shrink-0"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2"/></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-3">
                {mod.coreLayers.map(layer => (
                  <span key={layer} className="px-2 py-1 rounded text-[10px] bg-white/10 text-text-muted border border-white/10">{layer}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {mod.integrations.map(i => (
                  <span key={i} className="px-2 py-1 rounded-full text-[10px] font-medium border bg-white/5 text-text-secondary">{i}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {mod.demoFlow.map(step => (
                  <span key={step} className="px-3 py-1 rounded-full bg-white/3 text-xs text-white/90">{step}</span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                <Link to="/contact" className="btn-primary">Demo anfragen</Link>
                <Link to={`/products/solutions/${mod.slug}`} className="btn-secondary">Details</Link>
              </div>
            </article>
          ))}
        </div>

        {/* Packages / CTA */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-3">Packages</h4>
            <p className="text-sm text-text-secondary">Konfigurierte Bündel für typische Einsatzszenarien – modular kombinierbar.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Interesse geweckt?</h4>
              <p className="text-sm text-text-secondary mb-4">Vereinbare eine Demo oder ein unverbindliches Beratungsgespräch.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact" className="btn-primary">Demo anfragen</Link>
              <Link to="/products/vae-core" className="btn-secondary">VAE CORE ansehen</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReSuiteSection
