/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  SERVICES HERO SECTION                                                    ┃
 * ┃  Hero für /services → RippleGrid-Effekt (dark) oder soft radial (light).  ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * └── RippleGrid           → Interactive grid animation (dark mode)
 *
 * ⛓️ GATES
 * └── theme check          → Light vs. Dark Mode unterschiedliche Backgrounds
 *
 * 🎨 LAYERS
 * ├── Background (theme-conditional)
 * │   ├── Light: Radial gradients + grid pattern
 * │   └── Dark: RippleGrid with mouse interaction
 * ├── Overlay gradients    → Vignette + contrast
 * └── Content container    → Headline, subline, CTAs
 */

import React from 'react'
import RippleGrid from '../effects/RippleGrid'
// ParallaxBackdrop removed in light mode redesign
import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import MaterialIcon from '@/components/ui/MaterialIcon'
import { useTheme } from '@/contexts/ThemeContext'
import { Link } from 'react-router-dom'

interface ServicesHeroSectionProps {
  innerRef?: React.Ref<HTMLDivElement>
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — ServicesHeroSection
// ═══════════════════════════════════════════════════════════════════════════
const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({ innerRef }) => {
  const { theme } = useTheme()
  // ⛓️ GATE — Theme Check für Background-Auswahl
  const isLight = theme === 'light'

  return (
    <section
      className={`border-border-primary hero-surface relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden border-b pb-16 pt-24 dark:border-white/5 sm:pb-24 sm:pt-32 md:pb-28 ${isLight ? 'bg-gradient-to-b from-white to-white/95' : 'from-bg-primary to-bg-primary bg-gradient-to-br via-bg-secondary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker'}`}
    >
      {/* Conditional overlay: light mode gets subtle vignette, dark mode gets strong contrast */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {isLight ? (
          <>
            {/* light subtle vignette + soft blur to keep panel readable */}
            <div className="via-white/12 absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />
            <div className="absolute inset-0 opacity-30 mix-blend-normal backdrop-blur-[2px]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]" />
            <div className="absolute inset-0 opacity-60 mix-blend-luminosity backdrop-blur-[2px]" />
          </>
        )}
      </div>
      {isLight ? (
        <div className="absolute inset-0 z-0 select-none">
          {/* Light mode: soft radial + light grid patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(var(--vae-turquoise-rgb),0.20),transparent_62%)]" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-screen [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_44px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_44px)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(var(--vae-turquoise-rgb),0.22),transparent_60%)] opacity-10" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 opacity-55 mix-blend-screen">
          <RippleGrid
            enableRainbow={false}
            gridColor="#00ffa5"
            rippleIntensity={0.045}
            gridSize={9}
            gridThickness={14}
            mouseInteraction={true}
            mouseInteractionRadius={1.15}
            opacity={0.75}
          />
        </div>
      )}
      <div className="container-vae relative z-[2]" ref={innerRef}>
        <div className="mx-auto max-w-5xl space-y-8 text-center sm:space-y-10">
          <div
            className={`inline-block rounded-[2rem] px-8 py-6 backdrop-blur-md ${isLight ? 'border border-black/10 bg-white/85 shadow-[0_8px_40px_-18px_rgba(0,0,0,0.25)] ring-1 ring-black/10' : 'border border-vae-turquoise/30 bg-[linear-gradient(160deg,rgba(0,15,12,0.92),rgba(0,32,26,0.78))] shadow-[0_0_60px_-18px_rgba(var(--vae-turquoise-rgb),0.5)] ring-1 ring-vae-turquoise/25'}`}
          >
            <h1 className="h1 fluid-h1 mb-4">
              <span className="block text-text-light">Services & Betreuung</span>
              <span className="block text-vae-turquoise">für Ihre digitale Arbeitsumgebung.</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary/90 md:text-xl">
              Wir richten Ihre Open-Source-Infrastruktur ein, erweitern sie mit AI-Workflows und betreuen alle Systeme
              langfristig. Transparent, dokumentiert und immer mit Fokus auf messbaren Geschäftsnutzen.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-vae-turquoise sm:gap-8">
            <div className="flex items-center gap-2">
              <MaterialIcon icon="shield" className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="text-xs font-medium sm:text-sm">Datensouverän</span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon icon="flash_on" className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="text-xs font-medium sm:text-sm">Schnell</span>
            </div>
            <div className="flex items-center gap-2">
              <MaterialIcon icon="auto_awesome" className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="text-xs font-medium sm:text-sm">KI-powered</span>
            </div>
          </div>
          {/* CTA Block (aligned with main landing hero style) */}
          <div className="space-y-5">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/leistungen/strategie"
                className="btn-primary flex flex-1 items-center justify-center text-center shadow-[0_0_0_1px_rgba(0,255,165,0.4),0_0_24px_-4px_rgba(0,255,165,0.35)] hover:shadow-[0_0_0_1px_rgba(0,255,165,0.6),0_0_34px_-4px_rgba(0,255,165,0.55)]"
              >
                <Icon name="auto_awesome" className="mr-3 h-7 w-7 sm:h-8 sm:w-8" />
                Mehr zur Strategieberatung
              </Link>
              <CtaLink
                ctaId="contact.schedule_call"
                ctx={{ fromPage: 'services', intent: 'strategy-call' }}
                variant="custom"
                className={`flex flex-1 items-center justify-center rounded-xl text-center transition-colors ${
                  isLight
                    ? 'border border-black/10 bg-white/60 text-text-secondary hover:border-black/20 hover:bg-white/80'
                    : 'border border-white/20 bg-white/10 text-text-secondary backdrop-blur-sm hover:bg-white/20 hover:text-text-light'
                }`}
              >
                <Icon name="schedule" className="mr-3 h-7 w-7 sm:h-8 sm:w-8" />
                Strategiegespräch vereinbaren
              </CtaLink>
              <a
                href="#categories"
                className={`flex flex-1 items-center justify-center rounded-xl text-center transition-colors ${isLight ? 'border border-black/10 bg-white/60 text-text-secondary hover:border-black/20 hover:bg-white/80' : 'border border-white/20 bg-white/10 text-text-secondary backdrop-blur-sm hover:bg-white/20 hover:text-text-light'}`}
              >
                <Icon name="travel_explore" className="mr-3 h-7 w-7 sm:h-8 sm:w-8" />
                Services erkunden
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/leistungen/infrastruktur"
                className="rounded-full bg-vae-turquoise/10 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-vae-turquoise/20 hover:text-vae-turquoise"
              >
                Infrastruktur Setup
              </Link>
              <Link
                to="/leistungen/strategie"
                className="rounded-full bg-vae-turquoise/10 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-vae-turquoise/20 hover:text-vae-turquoise"
              >
                AI-Workflows
              </Link>
              <Link
                to="/leistungen/betreuung"
                className="rounded-full bg-vae-turquoise/10 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-vae-turquoise/20 hover:text-vae-turquoise"
              >
                Betreuung & Ausbau
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesHeroSection
