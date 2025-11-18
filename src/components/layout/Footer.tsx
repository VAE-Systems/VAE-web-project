import Reveal from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/buttons/MagneticButton'
import { Mail } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface FooterLink {
  label: string
  to: string
}

const footerNavigation: Record<'services' | 'resources' | 'company', FooterLink[]> = {
  services: [
    { label: 'Strategische Beratung', to: '/services/beratung' },
    { label: 'Infrastructure Setup', to: '/services/setup' },
    { label: 'Langfristige Betreuung', to: '/services/betreuung' },
    { label: '3-Monate Testphase', to: '/testphase' },
  ],
  resources: [
    { label: 'Consulting Solutions', to: '/#solutions' },
    { label: 'Case Studies', to: '/about/referenzen' },
    { label: 'Warum VAE', to: '/#warum' },
    { label: 'Tech Stack', to: '/#tech-stack' },
  ],
  company: [
    { label: 'Über uns', to: '/about' },
    { label: 'Kontakt', to: '/contact' },
    { label: 'Impressum', to: '/impressum' },
    { label: 'Datenschutz', to: '/privacy' },
  ],
}

const contactEmail = 'info@vae.systems'

const knowledgeResources = [
  {
    title: 'Automation Playbooks',
    description: 'Architektur-Notizen & Erfahrungsberichte für KI-Automatisierung.',
    to: '/ressourcen/blog',
    isExternal: false,
  },
  {
    title: 'FAQ & Troubleshooting',
    description: 'Antworten auf Integrations- & Betriebsfragen rund um VAE Systeme.',
    to: '/ressourcen/faq',
    isExternal: false,
  },
  {
    title: 'LinkedIn Updates',
    description: 'Produkt-Roadmap, Events und Einblicke direkt vom VAE Team.',
    to: 'https://www.linkedin.com/company/vae-systems',
    isExternal: true,
  },
] as const

/**
 * Footer Component
 *
 * Comprehensive footer with VAE Systems branding, services, tech stack,
 * newsletter signup, and company information
 */
const Footer: React.FC = () => {
  const [isNewsletterNoticeOpen, setIsNewsletterNoticeOpen] = useState(false)

  const openNewsletterNotice = () => setIsNewsletterNoticeOpen(true)
  const closeNewsletterNotice = () => setIsNewsletterNoticeOpen(false)

  useEffect(() => {
    if (!isNewsletterNoticeOpen || typeof window === 'undefined') {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeNewsletterNotice()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isNewsletterNoticeOpen])

  return (
    <footer className="border-t border-bg-secondary bg-bg-darker" role="contentinfo">
      <div className="container-vae py-12 md:py-16">
        <Reveal.Group
          stagger={0.08}
          className="mb-12 grid gap-8 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
        >
          {/* Brand Section */}
          <Reveal preset="fadeUp" className="md:col-span-3 lg:col-span-2 xl:col-span-2">
            <div className="mb-6 flex items-center gap-1">
              <div className="h-[4.6rem] md:h-[5.2rem]">
                <img
                  src={'/App_Logo_light.svg'}
                  alt="VAE Systems Logo"
                  className="light-invert h-full w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="border-l border-vae-turquoise/30 pl-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">
                    Versatile AI
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Enhanced</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Systems</span>
                </div>
              </div>
            </div>

            <p className="mb-6 leading-relaxed text-text-muted">
              Individuelle KI-Automatisierungssysteme für Unternehmen, die ihre digitale Infrastruktur selbst besitzen
              wollen. Lokales Hosting, Open-Source-KI und semantische Arbeitsräume mit VAE Core.
            </p>

            <div className="mb-6">
              <a
                href={`mailto:${contactEmail}`}
                className="hover-lift press-bounce inline-flex items-center gap-2 text-vae-turquoise transition-colors duration-200 hover:text-vae-turquoise-300"
                data-analytics="contact-email"
                aria-label="Kontakt per E-Mail"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{contactEmail}</span>
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
                {footerNavigation.services.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-text-secondary transition-colors hover:text-vae-turquoise">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Resources */}
          <Reveal preset="fadeUp" as="nav" aria-label="Ressourcen" className="space-y-6">
            <div>
              <h4 className="mb-4 text-lg font-semibold text-text-light">Ressourcen</h4>
              <ul className="space-y-2 text-sm">
                {footerNavigation.resources.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-text-secondary transition-colors hover:text-vae-turquoise">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Knowledge Resources */}
          <Reveal preset="fadeUp" aria-label="Knowledge Resources">
            <h4 className="mb-4 text-lg font-semibold text-text-light">Knowledge Hub</h4>
            <ul className="space-y-3 text-sm">
              {knowledgeResources.map(resource => {
                const content = (
                  <>
                    <span className="font-medium text-text-light">{resource.title}</span>
                    <span className="block text-xs text-text-muted">{resource.description}</span>
                  </>
                )

                return (
                  <li key={resource.title}>
                    {resource.isExternal ? (
                      <a
                        href={resource.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-xl border border-bg-secondary bg-bg-secondary/40 px-4 py-3 transition-colors hover:border-vae-turquoise/40 hover:bg-bg-secondary/70"
                      >
                        {content}
                        <span className="mt-1 inline-flex items-center text-[10px] uppercase tracking-[0.25em] text-vae-turquoise">
                          Folgen
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={resource.to}
                        className="group block rounded-xl border border-bg-secondary bg-bg-secondary/40 px-4 py-3 transition-colors hover:border-vae-turquoise/40 hover:bg-bg-secondary/70"
                      >
                        {content}
                        <span className="mt-1 inline-flex items-center text-[10px] uppercase tracking-[0.25em] text-vae-turquoise">
                          Mehr lesen
                        </span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Unternehmen & Rechtliches + Newsletter */}
          <Reveal preset="fadeUp" className="min-w-0 space-y-10 lg:col-span-1 xl:col-span-1">
            <div>
              <h4 className="mb-4 text-lg font-semibold text-text-light">Unternehmen</h4>
              <ul className="space-y-2 text-sm">
                {footerNavigation.company.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-text-secondary transition-colors hover:text-vae-turquoise">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold text-text-light">VAE News</h4>
              <p className="mb-4 text-xs leading-relaxed text-text-muted">
                Releases, Architektur-Notizen & Events (ca. 1× Monat). Abmeldung jederzeit.
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={openNewsletterNotice}
                  className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-left transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <span className="flex-1 text-sm text-text-muted/70">Ihre E-Mail</span>
                  <span className="rounded-lg bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-text-light/90 transition-colors group-hover:bg-white/[0.12] group-hover:text-white">
                    →
                  </span>
                </button>
                <p className="text-[10px] text-text-muted">
                  Aktuell geschlossene Beta. Wir informieren dich, sobald neue Plätze frei werden.
                </p>
              </div>
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

      {isNewsletterNoticeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-locked-title"
          aria-describedby="newsletter-locked-description"
          onClick={closeNewsletterNotice}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-bg-darker/95 p-6 text-left shadow-2xl backdrop-blur-md"
            onClick={event => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h3 id="newsletter-locked-title" className="text-lg font-semibold text-text-light">
                Newsletter aktuell gesperrt
              </h3>
              <button
                type="button"
                onClick={closeNewsletterNotice}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-text-light"
                aria-label="Hinweis schließen"
              >
                &times;
              </button>
            </div>
            <p id="newsletter-locked-description" className="mb-6 text-sm leading-relaxed text-text-muted">
              Unser Newsletter befindet sich gerade in einer geschlossenen Beta. Folge uns gerne auf LinkedIn für
              Updates oder stöbere im Blog, um aktuelle Architektur- und Automatisierungsbeiträge zu entdecken.
            </p>
            <div className="flex flex-col gap-3">
              <MagneticButton intensity={0.075}>
                <a
                  href="https://www.linkedin.com/company/vae-systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex w-full items-center justify-center"
                >
                  Auf LinkedIn folgen
                </a>
              </MagneticButton>
              <MagneticButton intensity={0.075}>
                <Link
                  to="/ressourcen/blog"
                  onClick={closeNewsletterNotice}
                  className="btn-ghost inline-flex w-full items-center justify-center"
                >
                  Blog besuchen
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
