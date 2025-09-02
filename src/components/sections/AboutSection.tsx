import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface AboutSectionProps {
  className?: string
}

// Compact "About" teaser used on the home page (full story lives on About page)
const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <section className={`relative py-24 md:py-32 overflow-hidden ${className}`}>      
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {isLight ? (
          <></>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,hsla(var(--color-vae-turquoise),0.10),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_78%,hsla(var(--color-vae-turquoise),0.08),transparent_60%)]" />
          </>
        )}
      </div>
      <div className="container-vae relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="h2 heading-gradient">Über uns</h2>
          <p className="text-text-secondary leading-relaxed md:text-lg">
            Wir bauen modulare KI‑Automatisierungs&shy;systeme für Organisationen, die Souveränität
            über Datenflüsse & Infrastruktur behalten wollen. Unser Fokus: transparente Architekturen,
            dokumentierter Betrieb und reale Produktivität statt Pilot-Stau.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-text-muted">
            <span className="px-3 py-1 rounded-full bg-vae-turquoise/10 text-vae-turquoise/90 border border-vae-turquoise/25">Open Source First</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">On‑Prem Ready</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">Governance integriert</span>
          </div>
          <a href="/about" className="inline-flex items-center gap-2 btn-outline mt-2">
            Mehr erfahren
            <span className="material-symbols-outlined text-base">arrow_outward</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

