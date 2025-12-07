/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  PRODUCTS HERO SECTION                                                    ┃
 * ┃  Hero für /products → Fokus auf VAE-Logo + animiertem Hintergrund.        ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🎛️ CORE
 * ├── productsHeroContent  → Texte aus content/productsHero
 * └── FaultyTerminal       → Animated terminal background (dark mode)
 *
 * ⛓️ GATES
 * └── theme check          → Light vs. Dark Mode unterschiedliche Backgrounds
 *
 * 🎨 LAYERS
 * ├── Background (theme-conditional)
 * │   ├── Light: Soft radial + grid
 * │   └── Dark: FaultyTerminal effect
 * ├── Overlay gradients    → Contrast enhancement
 * └── Content (headline, subline, CTAs)
 */

import { useTheme } from '@/contexts/ThemeContext'
import React, { useRef } from 'react'
import FaultyTerminal from '../effects/FaultyTerminal'
// ParallaxBackdrop removed in light mode redesign
import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import { productsHeroContent } from '@/content/productsHero'
import { Link } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════════════════
// 🚪 ORCHESTRATOR — ProductsHeroSection
// ═══════════════════════════════════════════════════════════════════════════
const ProductsHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // ⛓️ GATE — Theme Check für Background-Auswahl
  const isLight = theme === 'light'

  return (
    <>
      {/* Negative top margin zieht das Hero unter den fixen Header (h-20=5rem).
        Viewport based Mindesthöhe + responsive Innenabstände sorgen für bessere Responsivität. */}
      <section
        className={`border-border-primary hero-surface relative -mt-20 flex min-h-[calc(100vh-5rem)] items-center overflow-hidden border-b pb-16 pt-32 dark:border-white/5 sm:pb-20 sm:pt-40 md:pb-24 md:pt-52 ${isLight ? 'bg-gradient-to-b from-white to-white/95' : 'from-bg-primary to-bg-primary bg-gradient-to-br via-bg-secondary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker'}`}
      >
        {/* Overlay for improved text contrast; use muted/light variants when in light mode */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          {isLight ? (
            <>
              {/* light subtle vignette + soft blur to keep panel readable */}
              <div className="via-white/12 absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />
              <div className="absolute inset-0 opacity-30 mix-blend-normal backdrop-blur-[2px]" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]" />
              <div className="absolute inset-0 opacity-55 mix-blend-luminosity backdrop-blur-[2px]" />
            </>
          )}
        </div>
        {/* Background: light mode soft; dark mode terminal */}
        {isLight ? (
          <div className="absolute inset-0 z-0 select-none">
            {/* Soft base gradient already via section; add subtle radial & light grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]" />
            <div className="absolute inset-0 opacity-[0.06] mix-blend-screen [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_44px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_44px)]" />
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(var(--vae-turquoise-rgb),0.22),transparent_60%)] opacity-10" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 select-none opacity-40 mix-blend-screen">
            <FaultyTerminal
              scale={1.2}
              gridMul={[2, 1]}
              digitSize={1.1}
              timeScale={0.35}
              scanlineIntensity={0.6}
              glitchAmount={0.9}
              flickerAmount={0.8}
              noiseAmp={0.4}
              brightness={0.9}
              tint="#00ffa5"
              mouseReact={true}
              mouseStrength={0.5}
              className="h-full w-full"
            />
          </div>
        )}
        <div
          className={`pointer-events-none absolute inset-0 ${isLight ? 'bg-[radial-gradient(circle_at_25%_20%,rgba(var(--vae-turquoise-rgb),0.08),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(var(--vae-turquoise-rgb),0.06),transparent_60%)]' : 'bg-[radial-gradient(circle_at_75%_35%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]'}`}
        />

        <div ref={containerRef} className="container-vae relative z-[2]">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="relative max-w-4xl space-y-8">
              {/* Panel now mirrors Services hero style */}
              <div
                className={`inline-block rounded-[2rem] px-8 py-6 backdrop-blur-md ${isLight ? 'border border-black/10 bg-white/85 shadow-[0_8px_40px_-18px_rgba(0,0,0,0.25)] ring-1 ring-black/10' : 'border border-vae-turquoise/30 bg-[linear-gradient(160deg,rgba(0,15,12,0.92),rgba(0,32,26,0.78))] shadow-[0_0_60px_-18px_rgba(var(--vae-turquoise-rgb),0.5)] ring-1 ring-vae-turquoise/25'} w-full space-y-4 text-center`}
              >
                <h1 className="h1 fluid-h1 mb-4">
                  <span className="block text-text-light">{productsHeroContent.title.main}</span>
                  <span className="block text-vae-turquoise">{productsHeroContent.title.sub}</span>
                </h1>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-text-secondary/90 md:text-xl">
                  {productsHeroContent.description}
                </p>
              </div>
              {/* CTA block moved outside panel to mirror Services hero layout */}
              <div className="space-y-5">
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <CtaLink
                    ctaId="contact.schedule_call"
                    ctx={{ fromPage: 'products', intent: 'strategy-call' }}
                    variant="custom"
                    className="btn-primary flex flex-1 items-center justify-center text-center shadow-[0_0_0_1px_rgba(0,255,165,0.4),0_0_24px_-4px_rgba(0,255,165,0.35)] hover:shadow-[0_0_0_1px_rgba(0,255,165,0.6),0_0_34px_-4px_rgba(0,255,165,0.55)]"
                    data-green-signal="true"
                  >
                    <Icon name="schedule" className="mr-2" />
                    30‑Min Strategie‑Gespräch buchen
                  </CtaLink>
                  <Link
                    to="/leistungen/infrastruktur"
                    className={`flex flex-1 items-center justify-center rounded-xl text-center transition-colors ${isLight ? 'border border-black/10 bg-white/60 text-text-secondary hover:border-black/20 hover:bg-white/80' : 'border border-white/20 bg-white/10 text-text-secondary backdrop-blur-sm hover:bg-white/20 hover:text-text-light'}`}
                  >
                    <Icon name="handshake" className="mr-2" />
                    Services & Expertise
                  </Link>
                  <a
                    href="#solutions"
                    className={`flex flex-1 items-center justify-center rounded-xl text-center transition-colors ${isLight ? 'border border-black/10 bg-white/60 text-text-secondary hover:border-black/20 hover:bg-white/80' : 'border border-white/20 bg-white/10 text-text-secondary backdrop-blur-sm hover:bg-white/20 hover:text-text-light'}`}
                  >
                    <Icon name="category" className="mr-2" />
                    Produkte entdecken
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    to="/leistungen/strategie"
                    className="rounded-full bg-vae-turquoise/10 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-vae-turquoise/20 hover:text-vae-turquoise"
                  >
                    Custom Solutions
                  </Link>
                  <Link
                    to="/vae-core"
                    className="rounded-full bg-vae-turquoise/10 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-vae-turquoise/20 hover:text-vae-turquoise"
                  >
                    VAE CORE Architektur
                  </Link>
                </div>
                <p className="mx-auto max-w-md text-[11px] leading-relaxed text-text-muted/80">
                  In <span className="font-medium text-text-secondary">15–30 Minuten</span> klären wir Zielbild,
                  Reifegrad & nächste sinnvolle Schritte – kein Pitch, klare Einordnung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsHeroSection
