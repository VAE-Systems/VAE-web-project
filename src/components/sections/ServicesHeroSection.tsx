import React from 'react'
import RippleGrid from './effects/RippleGrid'
// ParallaxBackdrop removed in light mode redesign
import { useTheme } from '@/contexts/ThemeContext'
import MaterialIcon from '../ui/MaterialIcon'
import Icon from '@/components/ui/Icon'
import { Link } from 'react-router-dom'
import CtaLink from '@/components/ui/CtaLink'

interface ServicesHeroSectionProps {
	innerRef?: React.Ref<HTMLDivElement>
}

const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({ innerRef }) => {
        const { theme } = useTheme()
        const isLight = theme === 'light'

        return (
                <section className={`relative flex items-center min-h-[calc(100vh-5rem)] pt-24 pb-16 sm:pt-32 sm:pb-24 md:pb-28 overflow-hidden border-b border-border-primary dark:border-white/5 hero-surface ${isLight ? 'bg-gradient-to-b from-white to-white/95' : 'bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker'}`}>
                        {/* Conditional overlay: light mode gets subtle vignette, dark mode gets strong contrast */}
                        <div className="pointer-events-none absolute inset-0 z-[1]">
                                {isLight ? (
                                        <>
                                                {/* light subtle vignette + soft blur to keep panel readable */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/12 to-white/10" />
                                                <div className="absolute inset-0 backdrop-blur-[2px] mix-blend-normal opacity-30" />
                                        </>
                                ) : (
                                        <>
                                                <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]" />
                                                <div className="absolute inset-0 backdrop-blur-[2px] mix-blend-luminosity opacity-60" />
                                        </>
                                )}
                        </div>
                        {isLight ? (
                                <div className="absolute inset-0 z-0 select-none">
                                        {/* Light mode: soft radial + light grid patterns */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(var(--vae-turquoise-rgb),0.12),transparent_62%)]" />
                                        <div className="absolute inset-0 opacity-[0.06] mix-blend-screen [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_44px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_44px)]" />
                                        <div className="absolute inset-0 opacity-10 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(var(--vae-turquoise-rgb),0.22),transparent_60%)]" />
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
                        <div className="relative container-vae z-[2]" ref={innerRef}>
                                <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10">
                                        <div className={`inline-block px-8 py-6 rounded-[2rem] backdrop-blur-md ${isLight ? 'bg-white/85 border border-black/10 ring-1 ring-black/10 shadow-[0_8px_40px_-18px_rgba(0,0,0,0.25)]' : 'bg-[linear-gradient(160deg,rgba(0,15,12,0.92),rgba(0,32,26,0.78))] ring-1 ring-vae-turquoise/25 border border-vae-turquoise/30 shadow-[0_0_60px_-18px_rgba(var(--vae-turquoise-rgb),0.5)]'}`}>
                                                <h1 className="h1 fluid-h1 mb-4">
                                                        <span className="block text-text-light">Services & Expertise</span>
                                                        <span className="block text-vae-turquoise">für nachhaltige KI-Infrastruktur.</span>
                                                </h1>
                                                <p className="text-lg md:text-xl text-text-secondary/90 leading-relaxed max-w-3xl mx-auto">
                                                        Von Analyse über Implementierung bis Lifecycle-Optimierung – modulare Service-Pakete für souveräne, lokale und skalierbare Automatisierung.
                                                </p>
                                        </div>
                                        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-vae-turquoise">
                                                <div className="flex items-center gap-2"><MaterialIcon icon="shield" className="w-7 h-7 sm:w-8 sm:h-8" /><span className="text-xs sm:text-sm font-medium">Datensouverän</span></div>
                                                <div className="flex items-center gap-2"><MaterialIcon icon="flash_on" className="w-7 h-7 sm:w-8 sm:h-8" /><span className="text-xs sm:text-sm font-medium">Schnell</span></div>
                                                <div className="flex items-center gap-2"><MaterialIcon icon="auto_awesome" className="w-7 h-7 sm:w-8 sm:h-8" /><span className="text-xs sm:text-sm font-medium">KI-powered</span></div>
                                        </div>
                                                                                {/* CTA Block (aligned with main landing hero style) */}
                                                                                <div className="space-y-5">
                                                                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                                                                <CtaLink
                                                                                                        ctaId="contact.schedule_call"
                                                                                                        ctx={{ fromPage: 'services', intent: 'strategy-call' }}
                                                                                                        className="btn-primary flex-1 text-center flex items-center justify-center shadow-[0_0_0_1px_rgba(0,255,165,0.4),0_0_24px_-4px_rgba(0,255,165,0.35)] hover:shadow-[0_0_0_1px_rgba(0,255,165,0.6),0_0_34px_-4px_rgba(0,255,165,0.55)]"
                                                                                                        data-green-signal="true"
                                                                                                >
                                                                                                       <Icon name="schedule" className="w-7 h-7 sm:w-8 sm:h-8 mr-3" />
                                                                                                        30‑Min Strategie‑Gespräch buchen
                                                                                                </CtaLink>
                                                                                                <Link
                                                                                                        to="/products"
                                                                                                        className={`flex-1 text-center flex items-center justify-center rounded-xl transition-colors ${isLight ? 'border border-black/10 text-text-secondary bg-white/60 hover:bg-white/80 hover:border-black/20' : 'backdrop-blur-sm border border-white/20 text-text-secondary hover:text-text-light bg-white/10 hover:bg-white/20'}`}
                                                                                                >
                                                                                                       <Icon name="apps" className="w-7 h-7 sm:w-8 sm:h-8 mr-3" />
                                                                                                        Produkte & Plattform
                                                                                                </Link>
                                                                                                <a
                                                                                                        href="#categories"
                                                                                                        className={`flex-1 text-center flex items-center justify-center rounded-xl transition-colors ${isLight ? 'border border-black/10 text-text-secondary bg-white/60 hover:bg-white/80 hover:border-black/20' : 'backdrop-blur-sm border border-white/20 text-text-secondary hover:text-text-light bg-white/10 hover:bg-white/20'}`}
                                                                                                >
                                                                                                       <Icon name="travel_explore" className="w-7 h-7 sm:w-8 sm:h-8 mr-3" />
                                                                                                        Services erkunden
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
                </section>
        )
}

export default ServicesHeroSection
