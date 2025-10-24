import React from 'react'
import { Mail } from 'lucide-react'
import { NewsletterForm } from '../forms'
import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'

/**
 * Footer Component
 *
 * Comprehensive footer with VAE Systems branding, services, tech stack,
 * newsletter signup, and company information
 */
const Footer: React.FC = () => {
  const techStack = [
    'Python',
    'FastAPI',
    'Temporal',
    'Docker',
    'Kubernetes',
    'PostgreSQL',
    'Open Source AI',
    'VAE Core',
  ]

  // Newsletter success/error handlers
  const handleNewsletterSuccess = (subscriptionId: string) => {
    console.log('Newsletter subscription successful:', subscriptionId)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'footer_newsletter',
      })
    }
    // TODO: Add toast notification system
  }

  const handleNewsletterError = (error: string) => {
    console.error('Newsletter subscription error:', error)
    // Analytics tracking for errors
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'newsletter_error', {
        event_category: 'engagement',
        event_label: error,
      })
    }
    // TODO: Add error notification system
  }

  return (
    <footer className="border-t border-bg-secondary bg-bg-darker" role="contentinfo">
      <div className="container-vae py-12 md:py-16">
        <Reveal.Group
          stagger={0.08}
          className="mb-12 grid gap-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
        >
          {/* Brand Section */}
          <Reveal preset="fadeUp" className="md:col-span-3 lg:col-span-2 xl:col-span-2">
            <div className="mb-6 flex items-center space-x-4">
              <div className="h-14 md:h-16">
                <img
                  src={'/App_Logo_light.svg'}
                  alt="VAE Systems Logo"
                  className="light-invert h-full w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="border-l border-vae-turquoise/30 pl-4">
                <div className="text-xs leading-tight tracking-wider">
                  <div className="font-medium text-vae-turquoise">VERSATILE AI</div>
                  <div className="font-medium text-vae-turquoise">ENHANCED</div>
                  <div className="font-medium text-vae-turquoise">SYSTEMS_</div>
                </div>
              </div>
            </div>

            <p className="mb-6 leading-relaxed text-text-muted">
              Individuelle KI-Automatisierungssysteme für Unternehmen, die ihre digitale Infrastruktur selbst besitzen
              wollen. Lokales Hosting, Open-Source-KI und semantische Arbeitsräume mit VAE Core.
            </p>

            <div className="mb-6">
              <a
                href="mailto:juliandini@vae-systems.com"
                className="hover-lift press-bounce inline-flex items-center gap-2 text-vae-turquoise transition-colors duration-200 hover:text-vae-turquoise-300"
                data-analytics="contact-email"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>juliandini@vae-systems.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mb-6 flex space-x-4" aria-label="Social Links">
              <a
                href="https://github.com/VAE-Systems"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift press-bounce text-text-muted transition-colors duration-200 hover:text-vae-turquoise"
                title="GitHub - VAE Systems Open Source"
                data-analytics="social-github"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
                  <title>GitHub Logo</title>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="sr-only">GitHub Profil von VAE Systems</span>
              </a>
              <a
                href="https://www.linkedin.com/company/vae-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift press-bounce text-text-muted transition-colors duration-200 hover:text-vae-turquoise"
                title="LinkedIn - VAE Systems Unternehmensprofil"
                data-analytics="social-linkedin"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" role="img">
                  <title>LinkedIn Logo</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn Unternehmensprofil von VAE Systems</span>
              </a>
            </div>

            {/* System Status */}
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-sm text-text-secondary">Alle Systeme operativ</span>
            </div>
          </Reveal>

          {/* Services */}
          <Reveal preset="fadeUp" as="nav" aria-label="Services" className="space-y-6">
            <div>
              <h4 className="mb-4 text-lg font-semibold text-text-light">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/services/consulting"
                    className="text-text-secondary transition-colors hover:text-vae-turquoise"
                  >
                    Beratung
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/trainings"
                    className="text-text-secondary transition-colors hover:text-vae-turquoise"
                  >
                    Schulungen & Workshops
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/custom-solutions"
                    className="text-text-secondary transition-colors hover:text-vae-turquoise"
                  >
                    Custom Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services#comparison"
                    className="text-text-secondary transition-colors hover:text-vae-turquoise"
                  >
                    Vergleich & Reifegrad
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Produkte */}
          <Reveal preset="fadeUp" as="nav" aria-label="Produkte" className="space-y-6">
            <div>
              <h4 className="mb-4 text-lg font-semibold text-text-light">Produkte</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Link
                    to="/products/vae-core"
                    className="text-text-secondary transition-colors hover:text-vae-turquoise"
                  >
                    VAE Core Plattform
                  </Link>
                  <span className="rounded-full bg-vae-turquoise/20 px-2 py-0.5 text-[10px] tracking-wide text-vae-turquoise">
                    Q2/2026
                  </span>
                </li>
                <li>
                  <Link
                    to="/products/solutions"
                    className="text-text-secondary transition-colors hover:text-vae-turquoise"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/products/tools" className="text-text-secondary transition-colors hover:text-vae-turquoise">
                    Tools & Komponenten
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/showcases"
                    className="text-text-secondary transition-colors hover:text-vae-turquoise"
                  >
                    Showcases
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Tech Stack (Badges) */}
          <Reveal preset="fadeUp" aria-label="Technologien">
            <h4 className="mb-4 text-lg font-semibold text-text-light">Tech Stack</h4>
            <ul className="flex flex-wrap gap-2 text-sm">
              {techStack.map(tech => (
                <li
                  key={tech}
                  className="rounded-lg border border-bg-secondary bg-bg-secondary px-3 py-1 text-text-light transition-colors hover:border-vae-turquoise/30"
                  title={tech}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Unternehmen & Rechtliches + Newsletter */}
          <Reveal preset="fadeUp" className="min-w-0 space-y-10 lg:col-span-1 xl:col-span-1">
            <div>
              <h4 className="mb-4 text-lg font-semibold text-text-light">Unternehmen</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="text-text-secondary transition-colors hover:text-vae-turquoise">
                    Über uns
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-text-secondary transition-colors hover:text-vae-turquoise">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link to="/impressum" className="text-text-secondary transition-colors hover:text-vae-turquoise">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-text-secondary transition-colors hover:text-vae-turquoise">
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold text-text-light">VAE News</h4>
              <p className="mb-4 text-xs leading-relaxed text-text-muted">
                Releases, Architektur-Notizen & Events (ca. 1× Monat). Abmeldung jederzeit.
              </p>
              <NewsletterForm
                inline={true}
                onSuccess={handleNewsletterSuccess}
                onError={handleNewsletterError}
                useMockApi={true}
                className="mb-3"
              />
              <p className="text-[10px] text-text-muted">
                Mit Absenden bestätigst du unsere{' '}
                <a href="/privacy#newsletter" className="text-vae-turquoise hover:underline">
                  Datenschutzhinweise
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Reveal.Group>

        {/* Footer Bottom */}
        <div className="border-t border-bg-secondary pt-8">
          <div className="space-y-3 text-center">
            <p className="text-sm text-text-secondary">
              &copy; {new Date().getFullYear()} VAE Systems UG (haftungsbeschränkt)
            </p>
            <p className="text-xs text-text-muted md:text-[11px]">
              Inhalte und Gestaltung dieser Website sind urheberrechtlich geschützt.
              <br className="hidden md:block" />
              Marken und Logos Dritter dienen ausschließlich der Referenz.
            </p>
            <p className="text-xs text-text-secondary">DSGVO-konforme Datenverarbeitung • Made in Germany</p>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
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
