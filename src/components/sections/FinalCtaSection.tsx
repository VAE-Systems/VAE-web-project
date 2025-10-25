import Icon from '@/components/ui/Icon'
import { finalCtaHome } from '@/content/home'
import React from 'react'
import { Link } from 'react-router-dom'
import MagneticButton from '../ui/buttons/MagneticButton'

interface FinalCtaSectionProps {
  className?: string
  id?: string
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ className = '', id = 'abschluss' }) => {
  const { eyebrow, title, description, primary, secondary } = finalCtaHome

  return (
    <section
      id={id}
      className={`from-bg-primary to-bg-primary relative overflow-hidden border-t border-vae-turquoise/10 bg-gradient-to-b via-bg-secondary/80 py-20 dark:from-bg-darker dark:via-bg-dark/80 dark:to-bg-darker sm:py-28 ${className}`.trim()}
      aria-labelledby="final-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div
          className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(var(--vae-turquoise-rgb),0.22),transparent_65%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(var(--vae-turquoise-rgb),0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--vae-turquoise-rgb),0.08)_1px,transparent_1px)] bg-[size:120px_120px] mix-blend-soft-light"
          aria-hidden
        />
      </div>
      <div className="container-vae">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vae-turquoise/70">{eyebrow}</p>
          <h2 id="final-cta-heading" className="fluid-h2 mt-4 text-balance font-bold text-text-light dark:text-white">
            {title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">{description}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <MagneticButton className="w-full sm:w-auto">
              <Link to={primary.to} className="btn-primary flex min-w-[240px] items-center justify-center gap-3">
                <Icon name="calendar_month" size={18} className="text-bg-primary" />
                {primary.label}
              </Link>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <a
                href={secondary.to}
                className="btn-outline flex min-w-[240px] items-center justify-center gap-3"
                rel="noopener noreferrer"
              >
                <Icon name="mail" size={18} />
                {secondary.label}
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
