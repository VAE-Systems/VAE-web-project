import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { CTA } from '@/data/valuesData'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const CTASection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-vae-turquoise/10 bg-gradient-to-b from-bg-darker via-bg-dark/90 to-bg-darker py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--vae-turquoise-rgb),0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--vae-turquoise-rgb),0.08)_1px,transparent_1px)] bg-[size:120px_120px] mix-blend-soft-light" />
      </div>

      <div className="container-vae">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vae-turquoise/70">Nächster Schritt</p>
          <h2 className="mt-4 text-3xl font-semibold text-text-light md:text-4xl">{CTA.heading}</h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">{CTA.copy}</p>

          <MagneticButton className="mt-10 inline-flex w-full sm:w-auto">
            <Link to={CTA.href} className="btn-primary flex min-w-[260px] items-center justify-center gap-3">
              <ArrowRight className="h-4 w-4" />
              {CTA.text}
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
