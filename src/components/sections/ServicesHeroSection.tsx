import React from 'react'
import RippleGrid from './effects/RippleGrid'
import { ParallaxBackdrop } from './BackgroundEffects'
import { useTheme } from '@/contexts/ThemeContext'
import MaterialIcon from '../ui/MaterialIcon'

interface ServicesHeroSectionProps {
	innerRef?: React.Ref<HTMLDivElement>
}

const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({ innerRef }) => {
    const { theme } = useTheme()
    const isLight = theme === 'light'
	const handleCTAClick = () => {
		const contactSection = document.getElementById('contact')
		if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
	}

        return (
                <section className={`relative flex items-center min-h-[calc(100vh-5rem)] pt-24 pb-16 sm:pt-32 sm:pb-24 md:pb-28 overflow-hidden border-b border-border-primary dark:border-white/5 hero-surface bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary dark:from-bg-darker dark:via-bg-dark dark:to-bg-darker `}>
                        {isLight ? (
                                <div className="absolute inset-0 z-0 opacity-80">
                                        <ParallaxBackdrop strength={10} />
                                </div>
                        ) : (
                                <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
                                        <RippleGrid
                                                enableRainbow={false}
                                                gridColor="#00ffa5"
                                                rippleIntensity={0.045}
                                                gridSize={9}
                                                gridThickness={14}
                                                mouseInteraction={true}
                                                mouseInteractionRadius={1.15}
                                                opacity={0.9}
                                        />
                                </div>
                        )}
                        <div className="relative container-vae" ref={innerRef}>
                                <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10">
                                        <h1 className="h1">
                                                <span className="block text-text-light">Services & Expertise</span>
                                                <span className="block text-vae-turquoise">für nachhaltige KI-Infrastruktur.</span>
                                        </h1>
                                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
                                                Von Analyse über Implementierung bis Lifecycle-Optimierung – modulare Service-Pakete für souveräne, lokale und skalierbare Automatisierung.
                                        </p>
                                        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-vae-turquoise">
                                                <div className="flex items-center gap-2"><MaterialIcon icon="shield" className="text-xl sm:text-2xl" /><span className="text-xs sm:text-sm font-medium">Datensouverän</span></div>
                                                <div className="flex items-center gap-2"><MaterialIcon icon="flash_on" className="text-xl sm:text-2xl" /><span className="text-xs sm:text-sm font-medium">Schnell</span></div>
                                                <div className="flex items-center gap-2"><MaterialIcon icon="auto_awesome" className="text-xl sm:text-2xl" /><span className="text-xs sm:text-sm font-medium">KI-powered</span></div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                <a href="#services" className="btn-primary px-8 py-4 sm:px-10" data-green-signal="true">Services entdecken</a>
                                                <button onClick={handleCTAClick} className="btn-secondary px-8 py-4 sm:px-10">Erstgespräch buchen</button>
                                        </div>
                                </div>
                        </div>
                </section>
        )
}

export default ServicesHeroSection
