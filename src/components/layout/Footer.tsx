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
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'footer_newsletter'
      })
    }
    // TODO: Add toast notification system
  }

  const handleNewsletterError = (error: string) => {
    console.error('Newsletter subscription error:', error)
    // Analytics tracking for errors
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'newsletter_error', {
        event_category: 'engagement',
        event_label: error
      })
    }
    // TODO: Add error notification system
  }

  return (
    <footer className="bg-bg-darker border-t border-bg-secondary" role="contentinfo">
      <div className="container-vae py-12 md:py-16">
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="xl:col-span-2 lg:col-span-2 md:col-span-3">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-12">
                <img 
                  src={'/LOGO_01_white.svg'} 
                  alt="VAE Systems Logo" 
                  className="h-full w-auto light-invert"
                  loading="lazy"
                  decoding="async"
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
                className="text-vae-turquoise hover:text-vae-turquoise-300 transition-colors duration-200 inline-flex items-center gap-2"
                data-analytics="contact-email"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">mail</span>
                <span>juliandini@vae-systems.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6" aria-label="Social Links">
              <a
                href="https://github.com/VAE-Systems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-vae-turquoise transition-colors duration-200"
                title="GitHub - VAE Systems Open Source"
                data-analytics="social-github"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
                  <title>GitHub Logo</title>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="sr-only">GitHub Profil von VAE Systems</span>
              </a>
              <a
                href="https://www.linkedin.com/company/vae-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-vae-turquoise transition-colors duration-200"
                title="LinkedIn - VAE Systems Unternehmensprofil"
                data-analytics="social-linkedin"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
                  <title>LinkedIn Logo</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="sr-only">LinkedIn Unternehmensprofil von VAE Systems</span>
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
              <h4 className="text-lg font-semibold text-text-light mb-4">Services</h4>
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
              <h4 className="text-lg font-semibold text-text-light mb-4">Produkte</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Link to="/products/vae-core" className="text-text-secondary hover:text-vae-turquoise transition-colors">VAE Core Plattform</Link>
                  <span className="px-2 py-0.5 bg-vae-turquoise/20 text-vae-turquoise text-[10px] rounded-full tracking-wide">Q2/2026</span>
                </li>
                <li><Link to="/products/solutions" className="text-text-secondary hover:text-vae-turquoise transition-colors">Solutions</Link></li>
                <li><Link to="/products/tools" className="text-text-secondary hover:text-vae-turquoise transition-colors">Tools & Komponenten</Link></li>
                <li><Link to="/products/showcases" className="text-text-secondary hover:text-vae-turquoise transition-colors">Showcases</Link></li>
              </ul>
            </div>
          </nav>

          {/* Tech Stack (Badges) */}
          <div aria-label="Technologien">
            <h4 className="text-lg font-semibold mb-4 text-text-light">Tech Stack</h4>
            <ul className="flex flex-wrap gap-2 text-sm">
              {techStack.map((tech) => (
                <li key={tech} className="px-3 py-1 bg-bg-secondary text-text-light rounded-lg border border-bg-secondary hover:border-vae-turquoise/30 transition-colors" title={tech}>{tech}</li>
              ))}
            </ul>
          </div>

          {/* Unternehmen & Rechtliches + Newsletter */}
          <div className="space-y-10 xl:col-span-1 lg:col-span-1 min-w-0">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-text-light">Unternehmen</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-text-secondary hover:text-vae-turquoise transition-colors">Über uns</Link></li>
                <li><Link to="/contact" className="text-text-secondary hover:text-vae-turquoise transition-colors">Kontakt</Link></li>
                <li><Link to="/impressum" className="text-text-secondary hover:text-vae-turquoise transition-colors">Impressum</Link></li>
                <li><Link to="/privacy" className="text-text-secondary hover:text-vae-turquoise transition-colors">Datenschutz</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-text-light">VAE News</h4>
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
            <p className="text-text-secondary text-sm">
              &copy; {new Date().getFullYear()} VAE Systems UG (haftungsbeschränkt)
            </p>
            <p className="text-text-muted text-xs md:text-[11px]">
              Inhalte und Gestaltung dieser Website sind urheberrechtlich geschützt.
              <br className="hidden md:block" />
              Marken und Logos Dritter dienen ausschließlich der Referenz.
            </p>
            <p className="text-text-secondary text-xs">DSGVO-konforme Datenverarbeitung • Made in Germany</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span>System Status: Online</span>
              </span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString('de-DE')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
