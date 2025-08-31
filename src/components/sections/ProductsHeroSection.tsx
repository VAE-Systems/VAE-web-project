import React, { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import FaultyTerminal from './effects/FaultyTerminal'
import { ParallaxBackdrop } from './BackgroundEffects'

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
    <section className={`relative -mt-20 flex items-center min-h-[calc(100vh-5rem)] pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-24 overflow-hidden border-b border-border-primary dark:border-white/5 hero-surface bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker `}>
      {/* Background: Apple-like soft orbs in light mode, terminal in dark */}
      {isLight ? (
        <div className="absolute inset-0 z-0 opacity-80 select-none">
          <ParallaxBackdrop strength={10} />
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
      <div className={`absolute inset-0 pointer-events-none ${isLight ? 'bg-[radial-gradient(circle_at_75%_35%,rgba(0,0,0,0.05),transparent_62%)]' : 'bg-[radial-gradient(circle_at_75%_35%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]'}`} />

      <div ref={containerRef} className="relative container-vae">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
          <div className="relative flex items-center justify-center">
            <div className={`relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[3rem] flex flex-col items-center justify-center gap-3 backdrop-blur-xl border border-border-primary dark:border-white/10 ${isLight ? 'shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] bg-[linear-gradient(140deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.08))]' : 'shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.45)] bg-[linear-gradient(140deg,rgba(var(--vae-turquoise-rgb),0.18),rgba(var(--vae-turquoise-rgb),0.08)_40%,rgba(0,40,30,0.35))]'}`}>
              <img
                src={theme === 'dark' ? '/LOGO_01_white.svg' : '/App_Logo_light.svg'}
                alt="VAE Systems App Icon"
                className={`relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[3rem] flex flex-col items-center justify-center gap-3 backdrop-blur-xl border border-border-primary dark:border-white/10 ${isLight ? 'shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] bg-[linear-gradient(140deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.08))]' : 'shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.45)] bg-[linear-gradient(140deg,rgba(var(--vae-turquoise-rgb),0.18),rgba(var(--vae-turquoise-rgb),0.08)_40%,rgba(0,40,30,0.35))]'}`}
              />
              <div className={`absolute inset-0 rounded-[3rem] ring-1 pointer-events-none ${isLight ? 'ring-black/10' : 'ring-vae-turquoise/30'}`} />
              <div className={`absolute -inset-4 rounded-[3.5rem] blur-3xl opacity-60 ${isLight ? 'bg-black/10' : 'bg-vae-turquoise/15'}`} />
            </div>
            <div className={`absolute inset-0 -z-10 ${isLight ? '' : 'animate-spin-slow'} rounded-full`} aria-hidden>
              <div className="w-full h-full rounded-full border border-vae-turquoise/20" />
            </div>
          </div>

          <div className="space-y-6 max-w-3xl relative">
            {/* Content panel: light = soft card, dark = contrast panel */}
            <div
              className={`absolute inset-0 -z-10 rounded-3xl backdrop-blur-sm border border-border-primary dark:border-white/5 ${
                isLight
                  ? 'bg-white/65 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.25)]'
                  : 'bg-[linear-gradient(135deg,rgba(5,12,10,0.72),rgba(8,20,18,0.55))] shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.25)]'
              }`}
            />
            <h1 className="h1">
              <span className="block text-text-light">Modulare KI-Produkte</span>
              <span className="block text-gradient">vom Kernel bis zur Plattform.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Bausteine, Integrationslayer und vollständige Workflows: Stellen Sie sich Ihre lokale, souveräne KI-Infrastruktur zusammen – exakt so weit automatisiert wie Ihr aktueller Reifegrad es zulässt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#products" className={`${isLight ? 'btn-outline' : 'btn-primary'} text-center`}>Produkte entdecken</a>
              <a href="mailto:kontakt@vae-systems.com" className="btn-secondary text-center">Beratung starten</a>
            </div>
          </div>
        </div>
      </div>
  </section>
  </>
  )
}

export default ProductsHeroSection
