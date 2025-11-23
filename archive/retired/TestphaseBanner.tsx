import { testphaseBanner } from '@/content/home'
import { CheckCircle2, Sparkle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from '../ui/buttons/MagneticButton'

const TestphaseBanner: React.FC = () => {
  const { headline, description, inclusions, pricingHeadline, pricingDetails, primaryCta, secondaryCta } =
    testphaseBanner

  return (
    <section
      id="testphase"
      className="relative overflow-hidden border-y border-vae-turquoise/30 bg-gradient-to-br from-vae-turquoise via-vae-turquoise/95 to-vae-turquoise-dark py-24 text-bg-darker"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsla(0,0%,100%,0.45),transparent_55%),radial-gradient(circle_at_80%_30%,hsla(0,0%,100%,0.25),transparent_60%),radial-gradient(circle_at_50%_80%,hsla(0,0%,100%,0.2),transparent_65%)]" />
      </div>

      <div className="container-vae relative flex flex-col gap-16 lg:flex-row lg:items-center">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            <Sparkle className="h-4 w-4" /> Pilotprogramm
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">{headline}</h2>
          <p className="text-base leading-relaxed text-white/90 md:text-lg">{description}</p>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">Enthaltene Leistungen</h3>
            <ul className="mt-4 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
              {inclusions.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-bg-darker/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6 rounded-2xl bg-white/10 p-8 backdrop-blur-lg">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">{pricingHeadline}</h3>
            <p className="mt-3 text-lg font-medium text-white">{pricingDetails}</p>
          </div>

          <div className="flex flex-col gap-3">
            <MagneticButton>
              <Link
                to="/testphase"
                className="btn-primary flex items-center justify-center gap-2 text-center text-base"
              >
                <Sparkle className="h-5 w-5" />
                {primaryCta}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/testphase#leistungen"
                className="btn-outline flex items-center justify-center text-center text-base text-white"
              >
                {secondaryCta}
              </Link>
            </MagneticButton>
          </div>

          <p className="text-[12px] leading-relaxed text-white/70">
            Nach der Testphase entscheiden Sie frei: Vollservice für €489/Monat, Infrastruktur-only für €149/Monat oder
            kostenfrei beenden – immer inklusive Dokumentation, Runbooks und sauberem Datenexport.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TestphaseBanner
