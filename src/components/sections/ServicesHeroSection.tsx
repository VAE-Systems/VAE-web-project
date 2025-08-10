import React from 'react'
import RippleGrid from './effects/RippleGrid'
import MaterialIcon from '../ui/MaterialIcon'

interface ServicesHeroSectionProps {
	innerRef?: React.Ref<HTMLDivElement>
}

const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({ innerRef }) => {
	const handleCTAClick = () => {
		const contactSection = document.getElementById('contact')
		if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<section className="relative pt-32 pb-28 overflow-hidden border-b border-white/5 bg-gradient-to-br from-bg-darker via-bg-dark to-bg-darker">
			<div className="absolute inset-0 opacity-80 mix-blend-screen">
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
			<div className="relative container-vae" ref={innerRef}>
				<div className="max-w-5xl mx-auto text-center space-y-10">
					<h1 className="h1">
						<span className="block text-text-light">Services &amp; Expertise</span>
						<span className="block text-gradient">für nachhaltige KI-Infrastruktur.</span>
					</h1>
					<p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
						Von Analyse über Implementierung bis Lifecycle-Optimierung – modulare Service-Pakete für souveräne, lokale und skalierbare Automatisierung.
					</p>
					<div className="flex flex-wrap justify-center items-center gap-8 text-vae-turquoise">
						<div className="flex items-center gap-2"><MaterialIcon icon="shield" className="text-2xl" /><span className="text-sm font-medium">Datensouverän</span></div>
						<div className="flex items-center gap-2"><MaterialIcon icon="flash_on" className="text-2xl" /><span className="text-sm font-medium">Schnell</span></div>
						<div className="flex items-center gap-2"><MaterialIcon icon="auto_awesome" className="text-2xl" /><span className="text-sm font-medium">KI-powered</span></div>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a href="#services" className="btn-primary px-10 py-4">Services entdecken</a>
						<button onClick={handleCTAClick} className="btn-secondary px-10 py-4">Projekt starten</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ServicesHeroSection

