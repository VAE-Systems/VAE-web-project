import React, { useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import FaultyTerminal from './effects/FaultyTerminal'

/**
 * ProductsHeroSection
 * Focused hero for the products page using central VAE logo and subtle animated background.
 */
const ProductsHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // (Optional future: GSAP or Intersection observers can be added here.)

  return (
    <>
    {/* Negative top margin zieht das Hero unter den fixen Header (h-20=5rem).
        Viewport based Mindesthöhe + responsive Innenabstände sorgen für bessere Responsivität. */}
    <section className="relative -mt-20 flex items-center min-h-[calc(100vh-5rem)] pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-24 overflow-hidden border-b border-border-primary dark:border-white/5 hero-surface bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker overlay-diag overlay-grid">
      {/* Animated backdrop */}
      <div className={`absolute inset-0 z-0 select-none ${theme === 'dark' ? 'opacity-40 mix-blend-screen' : 'opacity-40 mix-blend-multiply'}`}>
        <FaultyTerminal 
          scale={1.2}
          gridMul={[2,1]}
          digitSize={1.1}
          timeScale={0.35}
          scanlineIntensity={theme === 'dark' ? 0.6 : 0.35}
          glitchAmount={theme === 'dark' ? 0.9 : 0.6}
          flickerAmount={theme === 'dark' ? 0.8 : 0.4}
          noiseAmp={theme === 'dark' ? 0.4 : 0.25}
          brightness={theme === 'dark' ? 0.9 : 0.8}
          tint={theme === 'dark' ? '#00ffa5' : '#006b5a'}
          mouseReact={true}
          mouseStrength={0.5}
          className="w-full h-full"
        />
      </div>
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_35%,rgba(var(--vae-turquoise-rgb),0.20),transparent_60%)]" />

      <div ref={containerRef} className="relative container-vae">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
          <div className="relative flex items-center justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[3rem] flex flex-col items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.45)] border border-border-primary dark:border-white/10 bg-[linear-gradient(140deg,rgba(var(--vae-turquoise-rgb),0.18),rgba(var(--vae-turquoise-rgb),0.08)_40%,rgba(0,40,30,0.35))] backdrop-blur-xl">
              <img
                src={theme === 'dark' ? '/LOGO_01_white.svg' : '/App_Logo_light.svg'}
                alt="VAE Systems App Icon"
                className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[3rem] flex flex-col items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.45)] border border-border-primary dark:border-white/10 bg-[linear-gradient(140deg,rgba(var(--vae-turquoise-rgb),0.18),rgba(var(--vae-turquoise-rgb),0.08)_40%,rgba(0,40,30,0.35))] backdrop-blur-xl"
              />
              <div className="absolute inset-0 rounded-[3rem] ring-1 ring-vae-turquoise/30 pointer-events-none" />
              <div className="absolute -inset-4 rounded-[3.5rem] bg-vae-turquoise/15 blur-3xl opacity-60" />
            </div>
            <div className="absolute inset-0 -z-10 animate-spin-slow rounded-full" aria-hidden>
              <div className="w-full h-full rounded-full border border-vae-turquoise/20" />
            </div>
          </div>

          <div className="space-y-6 max-w-3xl relative">
            {/* Kontrast-Panel */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-[linear-gradient(135deg,rgba(5,12,10,0.72),rgba(8,20,18,0.55))] dark:bg-[linear-gradient(135deg,rgba(5,12,10,0.72),rgba(8,20,18,0.55))] backdrop-blur-sm border border-border-primary dark:border-white/5 shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.25)]" />
            <h1 className="h1">
              <span className="block text-text-light">Modulare KI-Produkte</span>
              <span className="block text-gradient">vom Kernel bis zur Plattform.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Bausteine, Integrationslayer und vollständige Workflows: Stellen Sie sich Ihre lokale, souveräne KI-Infrastruktur zusammen – exakt so weit automatisiert wie Ihr aktueller Reifegrad es zulässt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#products" className="btn-primary text-center">Produkte entdecken</a>
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
