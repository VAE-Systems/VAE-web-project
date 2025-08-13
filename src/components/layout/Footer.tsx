import React from 'react'
import { NewsletterForm } from '../forms'
import { Link } from 'react-router-dom'

/**
 * Footer Component
 * 
 * Comprehensive footer with VAE Systems branding, services, tech stack,
 * newsletter signup, and company information
 */
const Footer: React.FC = () => {
  const techStack = [
    'Python', 'FastAPI', 'Temporal', 'Docker', 'Kubernetes',
    'PostgreSQL', 'Open Source AI', 'VAE Core'
  ]

  // Newsletter success/error handlers
  const handleNewsletterSuccess = (subscriptionId: string) => {
    console.log('Newsletter subscription successful:', subscriptionId)
    // TODO: Add analytics tracking, show toast notification, etc.
  }

  const handleNewsletterError = (error: string) => {
    console.error('Newsletter subscription error:', error)
    // TODO: Add error tracking, show error notification, etc.
  }

  return (
    <footer className="bg-bg-darker border-t border-bg-secondary" role="contentinfo">
      <div className="container-vae py-16">
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="xl:col-span-2 lg:col-span-2 md:col-span-3">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-12">
                <img 
                  src="/LOGO_02_white.svg" 
                  alt="VAE Systems Logo" 
                  className="h-full w-auto"
                />
              </div>
              <div className="border-l border-vae-turquoise/30 pl-4">
                <div className="text-xs leading-tight tracking-wider">
                  <div className="text-vae-turquoise font-medium">VERSATILE AI</div>
                  <div className="text-vae-turquoise font-medium">ENHANCED</div>
                  <div className="text-vae-turquoise font-medium">SYSTEMS_</div>
                </div>
              </div>
            </div>
            
            <p className="text-text-muted mb-6 leading-relaxed">
              Individuelle KI-Automatisierungssysteme für Unternehmen, die ihre digitale 
              Infrastruktur selbst besitzen wollen. Lokales Hosting, Open-Source-KI und 
              semantische Arbeitsräume mit VAE Core.
            </p>
            
            <div className="mb-6">
              <a
                href="mailto:juliandini@vae-systems.com"
                className="text-vae-turquoise hover:text-vae-turquoise-300 transition-colors"
              >juliandini@vae-systems.com</a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6" aria-label="Social Links">
              <a
                href="https://github.com/VAE-Systems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-vae-turquoise transition-colors"
                title="GitHub"
              >
                <span className="material-symbols-outlined" aria-hidden="true">code</span><span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/company/vae-systems" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-vae-turquoise transition-colors"
                title="LinkedIn"
              >
                <span className="material-symbols-outlined" aria-hidden="true">business</span><span className="sr-only">LinkedIn</span>
              </a>
            </div>

            {/* System Status */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-text-secondary">Alle Systeme operativ</span>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gradient mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services/consulting" className="text-text-secondary hover:text-vae-turquoise transition-colors">Beratung</Link></li>
                <li><Link to="/services/trainings" className="text-text-secondary hover:text-vae-turquoise transition-colors">Schulungen & Workshops</Link></li>
                <li><Link to="/services/custom-solutions" className="text-text-secondary hover:text-vae-turquoise transition-colors">Custom Solutions</Link></li>
                <li><Link to="/services#comparison" className="text-text-secondary hover:text-vae-turquoise transition-colors">Vergleich & Reifegrad</Link></li>
              </ul>
            </div>
          </nav>

          {/* Produkte */}
          <nav aria-label="Produkte" className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gradient mb-4">Produkte</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Link to="/products/vae-core" className="text-text-secondary hover:text-vae-turquoise transition-colors">VAE Core Plattform</Link>
                  <span className="px-2 py-0.5 bg-vae-turquoise/20 text-vae-turquoise text-[10px] rounded-full tracking-wide">Beta</span>
                </li>
                <li><Link to="/products/solutions" className="text-text-secondary hover:text-vae-turquoise transition-colors">Solutions</Link></li>
                <li><Link to="/products/tools" className="text-text-secondary hover:text-vae-turquoise transition-colors">Tools & Komponenten</Link></li>
                <li><Link to="/products/showcases" className="text-text-secondary hover:text-vae-turquoise transition-colors">Showcases</Link></li>
              </ul>
            </div>
          </nav>

          {/* Tech Stack (Badges) */}
          <div aria-label="Technologien">
            <h4 className="text-lg font-semibold mb-4 text-gradient">Tech Stack</h4>
            <ul className="flex flex-wrap gap-2 text-sm">
              {techStack.map((tech) => (
                <li key={tech} className="px-3 py-1 bg-bg-secondary text-text-light rounded-lg border border-bg-secondary hover:border-vae-turquoise/30 transition-colors" title={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          {/* Unternehmen & Rechtliches + Newsletter */}
          <div className="space-y-10 xl:col-span-1 lg:col-span-1">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">Unternehmen</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-text-secondary hover:text-vae-turquoise transition-colors">Über uns</Link></li>
                <li><Link to="/contact" className="text-text-secondary hover:text-vae-turquoise transition-colors">Kontakt</Link></li>
                <li><Link to="/impressum" className="text-text-secondary hover:text-vae-turquoise transition-colors">Impressum</Link></li>
                <li><Link to="/privacy" className="text-text-secondary hover:text-vae-turquoise transition-colors">Datenschutz</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">VAE News</h4>
              <p className="text-text-muted mb-4 text-xs leading-relaxed">
                Releases, Architektur-Notizen & Events (ca. 1× Monat). Abmeldung jederzeit.
              </p>
              <NewsletterForm
                inline={true}
                onSuccess={handleNewsletterSuccess}
                onError={handleNewsletterError}
                useMockApi={true}
                className="mb-3"
              />
              <p className="text-[10px] text-text-muted">Mit Absenden bestätigst du unsere <a href="/privacy#newsletter" className="text-vae-turquoise hover:underline">Datenschutzhinweise</a>.</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-bg-secondary pt-8">
          <div className="space-y-3 text-center">
            <p className="text-text-secondary text-sm">&copy; 2025 VAE Systems UG (haftungsbeschränkt). Alle Rechte vorbehalten.</p>
            <p className="text-text-muted text-[11px]">Alle Marken & Logos gehören ihren jeweiligen Inhabern. Nutzung dient ausschließlich der referenziellen Nennung eingesetzter Technologien.</p>
            <p className="text-text-secondary text-xs">DSGVO-konforme Datenverarbeitung • Made in Germany</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
