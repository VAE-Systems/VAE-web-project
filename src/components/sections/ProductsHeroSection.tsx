import React, { useRef } from 'react'
import FaultyTerminal from './effects/FaultyTerminal'

/**
 * ProductsHeroSection
 * Focused hero for the products page using central VAE logo and subtle animated background.
 */
const ProductsHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // (Optional future: GSAP or Intersection observers can be added here.)

  return (
    <>
    {/* Negative top margin zieht das Hero unter den fixen Header (h-20=5rem); zusätzliche pt gleicht es optisch aus. */}
    <section className="relative -mt-20 pt-52 pb-24 overflow-hidden border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
      {/* Animated backdrop */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen select-none">
        <FaultyTerminal 
          scale={1.2}
          gridMul={[2,1]}
          digitSize={1.1}
          timeScale={0.35}
          scanlineIntensity={0.6}
          glitchAmount={0.9}
          flickerAmount={0.8}
          noiseAmp={0.4}
          brightness={0.9}
          tint="#00ffa5"
          mouseReact={true}
          mouseStrength={0.5} /* stärkeres Hover/Bewegungs‑Feedback */
          className="w-full h-full"
        />
      </div>
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_35%,rgba(var(--vae-turquoise-rgb),0.20),transparent_60%)]" />

      <div ref={containerRef} className="relative container-vae">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="relative flex items-center justify-center">
            <div
              className="relative w-56 h-56 rounded-[3rem] flex flex-col items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.45)] border border-white/10 bg-[linear-gradient(140deg,rgba(var(--vae-turquoise-rgb),0.18),rgba(var(--vae-turquoise-rgb),0.08)_40%,rgba(0,40,30,0.35))] backdrop-blur-xl"
            >
              <img
                src="/App_Logo_light.svg"
                alt="VAE Systems App Icon"
                className="w-40 h-40 drop-shadow-[0_0_22px_rgba(var(--vae-turquoise-rgb),0.55)]"
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
            <div className="absolute inset-0 -z-10 rounded-3xl bg-[linear-gradient(135deg,rgba(5,12,10,0.72),rgba(8,20,18,0.55))] backdrop-blur-sm border border-white/5 shadow-[0_0_40px_-10px_rgba(var(--vae-turquoise-rgb),0.25)]" />
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
