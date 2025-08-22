import React from 'react'
import { reSuiteIntro, reModules } from '../../content/reSuite'
import MailTeaserCard from './reSuite/MailTeaserCard'
import ModuleCard from './reSuite/ModuleCard'
import PackagesCta from './reSuite/PackagesCta'

const ReSuiteSection: React.FC = () => {
  return (
    <section id="re-suite" className="relative pt-32 pb-24 border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker overflow-hidden">
      <div className="container-vae max-w-5xl">
        {/* Mail‑Witz as Card */}
        <div className="mb-12 flex flex-col items-center justify-center">
          <MailTeaserCard />

          <h2 className="h2 heading-gradient text-center mt-8">Re: Suite – Modular, betreibbar, transparent</h2>
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
          {reModules.map(mod => (
            <ModuleCard key={mod.slug} module={mod} />
          ))}
        </div>

        {/* Packages / CTA */}
        <PackagesCta />
      </div>
    </section>
  )
}

export default ReSuiteSection
