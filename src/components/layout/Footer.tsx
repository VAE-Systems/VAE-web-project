import React from 'react'
import { NewsletterForm } from '../forms'

/**
 * Footer Component
 * 
 * Comprehensive footer with VAE Systems branding, services, tech stack,
 * newsletter signup, and company information
 */
const Footer: React.FC = () => {
  const techStack = [
    'Python', 'FastAPI', 'Temporal', 'Docker', 'K8s', 
    'PostgreSQL', 'Open Source AI', 'VAEKTRA CORE'
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
    <footer className="bg-bg-darker border-t border-bg-secondary">
      <div className="container-vae py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-12">
                <img 
                  src="/LOGO_01_white.svg" 
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
              semantische Arbeitsräume mit VAEKTRA CORE.
            </p>
            
            <div className="mb-6">
              <a 
                href="mailto:info@vae-systems.com" 
                className="text-vae-turquoise hover:text-vae-turquoise-300 transition-colors"
              >
                info@vae-systems.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="text-text-muted hover:text-vae-turquoise transition-colors"
                title="GitHub"
              >
                <span className="material-symbols-outlined">code</span>
              </a>
              <a 
                href="#" 
                className="text-text-muted hover:text-vae-turquoise transition-colors"
                title="LinkedIn"
              >
                <span className="material-symbols-outlined">business</span>
              </a>
            </div>

            {/* System Status */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-text-secondary">Alle Systeme operativ</span>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gradient">Services</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary hover:text-vae-turquoise transition-colors cursor-pointer">
                  VAEKTRA CORE
                </span>
                <span className="px-2 py-1 bg-vae-turquoise/20 text-vae-turquoise text-xs rounded-full">
                  Coming Soon
                </span>
              </div>
              <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                Infrastrukturberatung
              </a>
              <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                Open Source Arbeits-/Serversysteme
              </a>
              <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                Einführung für junge Unternehmen
              </a>
              <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                KI-Beratung & Integration
              </a>
              <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                Local Hosting Solutions
              </a>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gradient">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-bg-secondary text-text-light text-sm rounded-lg border border-bg-secondary hover:border-vae-turquoise/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter & Quick Links Section */}
          <div className="space-y-8">
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">VAEKTRA Updates</h4>
              <p className="text-text-muted mb-4 text-sm">
                Bleiben Sie informiert über neue Features und Tech-Updates.
              </p>
              
              <NewsletterForm
                inline={true}
                onSuccess={handleNewsletterSuccess}
                onError={handleNewsletterError}
                useMockApi={true}
                className="mb-4"
              />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gradient">Unternehmen</h4>
              <div className="space-y-3">
                <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                  Über uns
                </a>
                <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                  Kontakt
                </a>
                <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                  Datenschutz
                </a>
                <a href="#" className="block text-text-secondary hover:text-vae-turquoise transition-colors">
                  Impressum
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-bg-secondary pt-8">
          <p className="text-center text-text-secondary text-sm">
            &copy; 2025 VAE Systems UG (haftungsbeschränkt). Alle Rechte vorbehalten. • 
            DSGVO-konforme Datenverarbeitung • Made in Germany
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
