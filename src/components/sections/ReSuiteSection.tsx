import React from 'react'
import { reSuiteIntro, reModules } from '../../content/reSuite'
import MailTeaserCard from './reSuite/MailTeaserCard'
import ModuleCard from './reSuite/ModuleCard'
import PackagesCta from './reSuite/PackagesCta'

const ReSuiteSection: React.FC = () => {
  return (
    <section
      id="re-suite"
      className="relative overflow-hidden border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker pb-24 pt-32"
    >
      <div className="container-vae max-w-5xl">
        {/* Mail‑Witz as Card */}
        <div className="mb-12 flex flex-col items-center justify-center">
          <MailTeaserCard />

          <h2 className="h2 heading-gradient mt-8 text-center">Re: Suite – Modular, betreibbar, transparent</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-lg text-text-secondary">{reSuiteIntro.intro}</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            {reSuiteIntro.bullets.map(b => (
              <span key={b} className="rounded-full bg-white/5 px-3 py-1 text-sm text-text-secondary">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Grid aller Re: Module */}
        <div className="mb-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
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
