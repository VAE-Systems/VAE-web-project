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
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_35%,rgba(0,255,165,0.20),transparent_60%)]" />

      <div ref={containerRef} className="relative container-vae">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="relative">
            <div className="relative z-20 w-40 h-40 bg-gradient-to-br from-vae-turquoise via-vae-turquoise-light to-vae-turquoise rounded-3xl flex items-center justify-center shadow-2xl"
                 style={{ boxShadow:'0 0 40px rgba(0,255,165,0.45),0 0 90px rgba(0,255,165,0.18)' }}>
              <img src="/LOGO_01_white.svg" alt="VAE Systems" className="w-24 h-24 drop-shadow-lg" />
            </div>
            {/* Subtle rotating ring */}
            <div className="absolute inset-0 -z-10 animate-spin-slow" aria-hidden>
              <div className="w-full h-full rounded-[2rem] border border-vae-turquoise/30" />
            </div>
            <div className="absolute -inset-6 -z-20 blur-3xl bg-vae-turquoise/10 rounded-full" />
          </div>

          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
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
