import React, { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import FaultyTerminal from './effects/FaultyTerminal'
// ParallaxBackdrop removed in light mode redesign
import { productsHeroContent } from '@/content/productsHero'
import { Link } from 'react-router-dom'

/**
 * ProductsHeroSection
 * Focused hero for the products page using central VAE logo and subtle animated background.
 */
const ProductsHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // (Optional future: GSAP or Intersection observers can be added here.)
 
  const isLight = theme === 'light'

  return (
    <>
    {/* Negative top margin zieht das Hero unter den fixen Header (h-20=5rem).
        Viewport based Mindesthöhe + responsive Innenabstände sorgen für bessere Responsivität. */}
  <section className={`relative -mt-20 flex items-center min-h-[calc(100vh-5rem)] pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-24 overflow-hidden border-b border-border-primary dark:border-white/5 hero-surface ${isLight ? 'bg-gradient-to-b from-white to-white/95' : 'bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker'}`}>
      {/* Overlay for improved text contrast; use muted/light variants when in light mode */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {isLight ? (
          <>
            {/* light subtle vignette + soft blur to keep panel readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/12 to-white/10" />
            <div className="absolute inset-0 backdrop-blur-[2px] mix-blend-normal opacity-30" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]" />
            <div className="absolute inset-0 backdrop-blur-[2px] mix-blend-luminosity opacity-55" />
          </>
        )}
      </div>
      {/* Background: light mode soft; dark mode terminal */}
      {isLight ? (
        <div className="absolute inset-0 z-0 select-none">
          {/* Soft base gradient already via section; add subtle radial & light grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-screen [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_44px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_44px)]" />
          <div className="absolute inset-0 opacity-10 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(var(--vae-turquoise-rgb),0.22),transparent_60%)]" />
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
            className="w-full h-full"
          />
        </div>
      )}
  <div className={`absolute inset-0 pointer-events-none ${isLight ? 'bg-[radial-gradient(circle_at_25%_20%,rgba(var(--vae-turquoise-rgb),0.08),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(var(--vae-turquoise-rgb),0.06),transparent_60%)]' : 'bg-[radial-gradient(circle_at_75%_35%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]'}`} />

  <div ref={containerRef} className="relative container-vae z-[2]">
        <div className="flex flex-col items-center text-center gap-8">


          <div className="space-y-8 max-w-4xl relative">
            {/* Panel now mirrors Services hero style */}
            <div className={`inline-block px-8 py-6 rounded-[2rem] backdrop-blur-md ${isLight ? 'bg-white/85 border border-black/10 ring-1 ring-black/10 shadow-[0_8px_40px_-18px_rgba(0,0,0,0.25)]' : 'bg-[linear-gradient(160deg,rgba(0,15,12,0.92),rgba(0,32,26,0.78))] ring-1 ring-vae-turquoise/25 border border-vae-turquoise/30 shadow-[0_0_60px_-18px_rgba(var(--vae-turquoise-rgb),0.5)]'} space-y-4 text-center w-full`}>
              <h1 className="h1 mb-4">
                <span className="block text-text-light">{productsHeroContent.title.main}</span>
                <span className="block text-vae-turquoise">{productsHeroContent.title.sub}</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary/90 leading-relaxed max-w-3xl mx-auto">
                {productsHeroContent.description}
              </p>
            </div>
            {/* CTA block moved outside panel to mirror Services hero layout */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" data-green-signal="true" className="btn-primary flex-1 text-center flex items-center justify-center shadow-[0_0_0_1px_rgba(0,255,165,0.4),0_0_24px_-4px_rgba(0,255,165,0.35)] hover:shadow-[0_0_0_1px_rgba(0,255,165,0.6),0_0_34px_-4px_rgba(0,255,165,0.55)]">
                  <span className="material-symbols-outlined mr-2">schedule</span>
                  30‑Min Strategie‑Gespräch buchen
                </Link>
                <Link to="/services" className={`flex-1 text-center flex items-center justify-center rounded-xl transition-colors ${isLight ? 'border border-black/10 text-text-secondary bg-white/60 hover:bg-white/80 hover:border-black/20' : 'backdrop-blur-sm border border-white/20 text-text-secondary hover:text-text-light bg-white/10 hover:bg-white/20'}`}>
                  <span className="material-symbols-outlined mr-2">handshake</span>
                  Services & Expertise
                </Link>
                <a href="#products" className={`flex-1 text-center flex items-center justify-center rounded-xl transition-colors ${isLight ? 'border border-black/10 text-text-secondary bg-white/60 hover:bg-white/80 hover:border-black/20' : 'backdrop-blur-sm border border-white/20 text-text-secondary hover:text-text-light bg-white/10 hover:bg-white/20'}`}> 
                  <span className="material-symbols-outlined mr-2">category</span>
                  Produkte entdecken
                </a>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/services/custom-solutions" className="px-4 py-2 rounded-full bg-vae-turquoise/10 hover:bg-vae-turquoise/20 text-xs font-medium text-text-secondary hover:text-vae-turquoise transition-colors">Custom Solutions</Link>
                <Link to="/products/vae-core" className="px-4 py-2 rounded-full bg-vae-turquoise/10 hover:bg-vae-turquoise/20 text-xs font-medium text-text-secondary hover:text-vae-turquoise transition-colors">VAE CORE Architektur</Link>
              </div>
              <p className="text-[11px] text-text-muted/80 leading-relaxed max-w-md mx-auto">
                In <span className="text-text-secondary font-medium">15–30 Minuten</span> klären wir Zielbild, Reifegrad & nächste sinnvolle Schritte – kein Pitch, klare Einordnung.
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
