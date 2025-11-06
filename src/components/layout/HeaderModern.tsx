/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VAE SYSTEMS - MODERN HEADER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Komplett neu gedachter Header inspiriert von modernen SaaS-Designs (Xurrent)
 *
 * FEATURES:
 * - Clean, minimalistisches Design
 * - Mega-Menu mit Feature-Cards
 * - Magnetic CTA Button mit Wackel-Animation
 * - Optimales Logo für Dark/Light Mode
 * - Smooth Micro-Interactions
 * - Mobile-First Responsive Design
 */

import { useTheme } from '@/contexts/ThemeContext'
import { useAttentionSignal } from '@/hooks'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import { ArrowRight, Calendar, ChevronDown, Mail, Menu, Moon, Rocket, Shield, Sun, Users, X, Zap } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TYPES & INTERFACES
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface MegaMenuItem {
  title: string
  description: string
  path: string
  icon: React.ReactNode
  badge?: string
}

interface NavItem {
  label: string
  path?: string
  megaMenu?: {
    title: string
    description: string
    items: MegaMenuItem[]
    footer?: {
      label: string
      path: string
    }
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NAVIGATION CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 */
const NAVIGATION: NavItem[] = [
  {
    label: 'Platform',
    megaMenu: {
      title: 'Services',
      description: 'Delivery orchestriert',
      items: [
        {
          title: 'Infrastruktur Setup',
          description: 'Produktionsreife Nextcloud-Suite mit Governance',
          path: '/infrastruktur',
          icon: <Shield className="h-5 w-5" />,
          badge: '2–4 Wochen',
        },
        {
          title: 'AI-Workflow Optimierung',
          description: 'Orchestrierte Agenten und KPI-Telemetrie',
          path: '/ki-optimierung',
          icon: <Zap className="h-5 w-5" />,
          badge: '3–6 Wochen',
        },
        {
          title: 'Langzeit-Betreuung',
          description: 'Security-Screenings und technischer Support',
          path: '/betreuung',
          icon: <Users className="h-5 w-5" />,
          badge: 'Laufend',
        },
        {
          title: 'Alle Services',
          description: 'Komplette Service-Übersicht entdecken',
          path: '/services',
          icon: <Rocket className="h-5 w-5" />,
        },
      ],
    },
  },
  {
    label: 'Resources',
    megaMenu: {
      title: 'Ressourcen',
      description: 'Guided Experience',
      items: [
        {
          title: 'Über uns',
          description: 'Team, Prinzipien und Architektur-Standards',
          path: '/about',
          icon: <Users className="h-5 w-5" />,
        },
        {
          title: 'Kontakt',
          description: 'Direkter Zugang zum Core-Team',
          path: '/kontakt',
          icon: <Mail className="h-5 w-5" />,
        },
      ],
    },
  },
  {
    label: 'VAE CORE',
    path: '/vae-core',
  },
]

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MAGNETIC BUTTON COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, href, onClick, className = '' }) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  const baseClasses = `
    relative inline-flex items-center gap-2 px-6 py-3 rounded-xl
    bg-gradient-to-r from-vae-turquoise to-emerald-400
    text-gray-900 font-bold text-sm
    shadow-lg shadow-vae-turquoise/30
    transition-all duration-300 ease-out
    hover:shadow-xl hover:shadow-vae-turquoise/50
    active:scale-95
    overflow-hidden
    group
    ${className}
  `

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shine effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </>
  )

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {content}
    </button>
  )
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MAIN HEADER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
const HeaderModern: React.FC = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()

  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)

  const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  // Attention Signal for CTA
  useAttentionSignal(ctaRef, {
    intervalMs: 30000,
    initialDelayMs: 3000,
    maxRuns: 10,
  })

  /**
   * Scroll Detection
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Close menus on route change
   */
  useEffect(() => {
    setActiveMegaMenu(null)
    setMobileSubmenu(null)
    closeMobileMenu()
  }, [location.pathname, closeMobileMenu])

  /**
   * Mega Menu Handlers
   */
  const handleMegaMenuEnter = useCallback((label: string) => {
    if (megaMenuTimeout.current) {
      clearTimeout(megaMenuTimeout.current)
    }
    setActiveMegaMenu(label)
  }, [])

  const handleMegaMenuLeave = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 150)
  }, [])

  /**
   * Check if route is active
   */
  const isActive = useCallback(
    (path?: string) => {
      if (!path) return false
      return location.pathname === path || location.pathname.startsWith(`${path}/`)
    },
    [location.pathname]
  )

  const isDark = theme === 'dark'

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          MAIN HEADER
          ═══════════════════════════════════════════════════════════════════ */}
      <header
        className={`
          fixed left-0 right-0 top-0 z-50
          transition-all duration-500 ease-out
          ${
            isScrolled
              ? isDark
                ? 'border-b border-white/5 bg-[#0a0f14]/95 shadow-lg shadow-black/20 backdrop-blur-xl'
                : 'border-b border-black/5 bg-white/95 shadow-lg shadow-black/5 backdrop-blur-xl'
              : isDark
                ? 'bg-[#0a0f14]/80 backdrop-blur-md'
                : 'bg-white/80 backdrop-blur-md'
          }
        `}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* ═══════════════════════════════════════════════════════════
                LOGO
                ═══════════════════════════════════════════════════════ */}
            <Link to="/" className="group flex items-center gap-4">
              {/* Logo */}
              <div className="relative h-14 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/App_Logo_light.svg"
                  alt="VAE Systems"
                  className={`h-full w-auto transition-all duration-300 ${
                    isDark
                      ? 'brightness-0 drop-shadow-[0_0_20px_rgba(0,255,165,0.25)] invert'
                      : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                  }`}
                />
              </div>

              {/* Brand Text */}
              <div className="hidden flex-col border-l border-vae-turquoise/30 pl-4 md:flex">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">
                  Versatile AI
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Enhanced</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Systems</span>
              </div>
            </Link>

            {/* ═══════════════════════════════════════════════════════════
                DESKTOP NAVIGATION
                ═══════════════════════════════════════════════════════ */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAVIGATION.map(item => {
                const hasMenu = !!item.megaMenu
                const isMenuOpen = activeMegaMenu === item.label

                if (hasMenu) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleMegaMenuEnter(item.label)}
                      onMouseLeave={handleMegaMenuLeave}
                    >
                      <button
                        className={`
                          flex items-center gap-1 rounded-lg px-4 py-2
                          text-sm font-medium
                          transition-all duration-200
                          ${
                            isMenuOpen
                              ? 'bg-vae-turquoise/10 text-vae-turquoise'
                              : isDark
                                ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                                : 'text-gray-700 hover:bg-black/5 hover:text-gray-900'
                          }
                        `}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Mega Menu */}
                      {isMenuOpen && item.megaMenu && (
                        <div className="absolute left-1/2 top-full w-screen max-w-md -translate-x-1/2 pt-2">
                          <div
                            className={`
                              overflow-hidden rounded-2xl shadow-2xl
                              ${
                                isDark
                                  ? 'bg-[#0f1419]/98 border border-white/10 backdrop-blur-xl'
                                  : 'bg-white/98 border border-black/5 backdrop-blur-xl'
                              }
                            `}
                          >
                            {/* Header */}
                            <div className="border-current/10 border-b px-6 py-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3
                                    className={`text-sm font-bold uppercase tracking-wider ${
                                      isDark ? 'text-gray-400' : 'text-gray-600'
                                    }`}
                                  >
                                    {item.megaMenu.title}
                                  </h3>
                                  <p className="mt-0.5 text-xs font-medium text-vae-turquoise">
                                    {item.megaMenu.description}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-3">
                              {item.megaMenu.items.map(menuItem => (
                                <Link
                                  key={menuItem.path}
                                  to={menuItem.path}
                                  className={`
                                    group flex items-start gap-3 rounded-xl p-3
                                    transition-all duration-200
                                    ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}
                                  `}
                                  onClick={() => setActiveMegaMenu(null)}
                                >
                                  {/* Icon */}
                                  <div
                                    className={`
                                    mt-0.5 rounded-lg p-2
                                    ${isDark ? 'bg-vae-turquoise/10' : 'bg-vae-turquoise/10'}
                                    text-vae-turquoise
                                  `}
                                  >
                                    {menuItem.icon}
                                  </div>

                                  {/* Content */}
                                  <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                      <h4
                                        className={`text-sm font-semibold ${
                                          isDark ? 'text-white' : 'text-gray-900'
                                        } transition-colors group-hover:text-vae-turquoise`}
                                      >
                                        {menuItem.title}
                                      </h4>
                                      {menuItem.badge && (
                                        <span
                                          className={`
                                          rounded-full px-2 py-0.5 text-[10px] font-medium
                                          ${isDark ? 'bg-white/10 text-gray-400' : 'bg-black/5 text-gray-600'}
                                        `}
                                        >
                                          {menuItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {menuItem.description}
                                    </p>
                                  </div>

                                  {/* Arrow */}
                                  <ArrowRight
                                    className={`
                                      mt-1 h-4 w-4 -translate-x-2 opacity-0
                                      transition-all duration-200
                                      group-hover:translate-x-0 group-hover:opacity-100
                                      ${isDark ? 'text-gray-500' : 'text-gray-400'}
                                    `}
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path!}
                    className={`
                      rounded-lg px-4 py-2 text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive(item.path)
                          ? 'bg-vae-turquoise/10 text-vae-turquoise'
                          : isDark
                            ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                            : 'text-gray-700 hover:bg-black/5 hover:text-gray-900'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* ═══════════════════════════════════════════════════════════
                ACTION BUTTONS
                ═══════════════════════════════════════════════════════ */}
            <div className="flex items-center gap-3">
              {/* CTA Button - Desktop */}
              <div className="hidden lg:block">
                <MagneticButton href="https://cal.com/vae-systems/strategie" className="animate-wiggle">
                  <Calendar className="h-4 w-4" />
                  <span>Strategie-Gespräch</span>
                </MagneticButton>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`
                  rounded-lg p-2.5 transition-all duration-200
                  ${
                    isDark
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-gray-700 hover:bg-black/5 hover:text-gray-900'
                  }
                `}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`
                  rounded-lg p-2.5 transition-all duration-200 lg:hidden
                  ${
                    isDark
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-gray-700 hover:bg-black/5 hover:text-gray-900'
                  }
                `}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE MENU
          ═══════════════════════════════════════════════════════════════════ */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />

          {/* Menu Panel */}
          <div
            className={`
            absolute bottom-4 left-4 right-4 top-20
            overflow-y-auto rounded-2xl
            ${
              isDark
                ? 'bg-[#0f1419]/98 border border-white/10 backdrop-blur-xl'
                : 'bg-white/98 border border-black/5 backdrop-blur-xl'
            }
          `}
          >
            <div className="space-y-4 p-6">
              {/* Mobile Navigation */}
              {NAVIGATION.map(item => (
                <div key={item.label}>
                  {item.megaMenu ? (
                    <div>
                      <button
                        onClick={() => setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)}
                        className={`
                          flex w-full items-center justify-between rounded-xl px-4 py-3
                          text-base font-semibold transition-all duration-200
                          ${isDark ? 'text-white hover:bg-white/5' : 'text-gray-900 hover:bg-black/5'}
                        `}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            mobileSubmenu === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {mobileSubmenu === item.label && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.megaMenu.items.map(subItem => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={closeMobileMenu}
                              className={`
                                flex items-start gap-3 rounded-lg p-3
                                transition-all duration-200
                                ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}
                              `}
                            >
                              <div className="rounded-lg bg-vae-turquoise/10 p-1.5 text-vae-turquoise">
                                {subItem.icon}
                              </div>
                              <div className="flex-1">
                                <div className="mb-0.5 flex items-center gap-2">
                                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {subItem.title}
                                  </span>
                                  {subItem.badge && (
                                    <span
                                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                        isDark ? 'bg-white/10 text-gray-400' : 'bg-black/5 text-gray-600'
                                      }`}
                                    >
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {subItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      onClick={closeMobileMenu}
                      className={`
                        block rounded-xl px-4 py-3 text-base font-semibold
                        transition-all duration-200
                        ${
                          isActive(item.path)
                            ? 'bg-vae-turquoise/10 text-vae-turquoise'
                            : isDark
                              ? 'text-white hover:bg-white/5'
                              : 'text-gray-900 hover:bg-black/5'
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4">
                <a
                  href="https://cal.com/vae-systems/strategie"
                  className="
                    flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-vae-turquoise
                    to-emerald-400 px-6 py-4
                    font-bold text-gray-900
                    shadow-lg shadow-vae-turquoise/30
                  "
                >
                  <Calendar className="h-5 w-5" />
                  <span>Strategie-Gespräch buchen</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderModern
