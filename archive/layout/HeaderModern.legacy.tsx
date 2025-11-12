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
import { ArrowRight, Calendar, ChevronDown, Mail, Menu, Moon, Shield, Sun, Users, X, Zap } from 'lucide-react'
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

interface CategoryItem {
  id: string
  label: string
  icon: React.ReactNode
  color: 'turquoise' | 'coral' | 'magenta' | 'blue'
}

interface NavItem {
  label: string
  path?: string
  megaMenu?: {
    title: string
    description: string
    categories?: CategoryItem[]
    content?: Record<string, MegaMenuItem[]>
    items?: MegaMenuItem[]
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
    label: 'Services',
    megaMenu: {
      title: 'Unsere Services',
      description: 'End-to-End Begleitung',
      categories: [
        {
          id: 'beratung',
          label: 'Strategische Beratung',
          icon: <Users className="h-5 w-5" />,
          color: 'turquoise',
        },
        {
          id: 'setup',
          label: 'Infrastructure Setup',
          icon: <Shield className="h-5 w-5" />,
          color: 'coral',
        },
        {
          id: 'betreuung',
          label: 'Langfristige Betreuung',
          icon: <Zap className="h-5 w-5" />,
          color: 'magenta',
        },
      ],
      content: {
        beratung: [
          {
            title: 'Strategische Beratung',
            description:
              'Kostenlose Erstanalyse, fundierte IST-Analyse und konkrete Strategieentwicklung für KI-Integration, Digitalisierung und Prozessautomatisierung – mit transparenten Handlungsoptionen statt leerer Versprechen.',
            path: '/services/beratung',
            icon: <Users className="h-5 w-5" />,
            badge: 'Kostenlos starten',
          },
        ],
        setup: [
          {
            title: 'Infrastructure Setup',
            description:
              'Produktionsreife Cloud-Infrastruktur mit CRM, HR, Chat-Systemen und kompletter Governance. DSGVO-konform und Secure by Design.',
            path: '/services/setup',
            icon: <Shield className="h-5 w-5" />,
            badge: 'Foundation',
          },
        ],
        betreuung: [
          {
            title: 'Langfristige Betreuung',
            description:
              'Kontinuierlicher Support, Security-Monitoring und Lifecycle-Management für Ihre Infrastruktur im laufenden Betrieb.',
            path: '/services/betreuung',
            icon: <Zap className="h-5 w-5" />,
            badge: 'Support',
          },
        ],
      },
    },
  },
  {
    label: 'Resources',
    megaMenu: {
      title: 'Ressourcen',
      description: 'Know-how & Referenzen',
      categories: [
        {
          id: 'tech-stack',
          label: 'Tech Stack',
          icon: <Shield className="h-5 w-5" />,
          color: 'turquoise',
        },
        {
          id: 'referenzen',
          label: 'Referenzen',
          icon: <Users className="h-5 w-5" />,
          color: 'coral',
        },
        {
          id: 'faq',
          label: 'FAQ',
          icon: <Mail className="h-5 w-5" />,
          color: 'blue',
        },
      ],
      content: {
        'tech-stack': [
          {
            title: 'Unser Tech Stack',
            description:
              'Moderne Technologien und Best Practices. Von Cloud-Infrastruktur bis zu KI-Integration – transparent dokumentiert.',
            path: '/resources/tech-stack',
            icon: <Shield className="h-5 w-5" />,
          },
        ],
        referenzen: [
          {
            title: 'Referenzen & Projekte',
            description:
              'Erfolgreiche Projekte und Kundenfeedback. Erfahren Sie, wie wir anderen Unternehmen geholfen haben.',
            path: '/about/referenzen',
            icon: <Users className="h-5 w-5" />,
          },
        ],
        faq: [
          {
            title: 'Häufig gestellte Fragen',
            description: 'Antworten auf die wichtigsten Fragen zu unseren Services, Preisen und Arbeitsweise.',
            path: '/resources/faq',
            icon: <Mail className="h-5 w-5" />,
          },
        ],
      },
    },
  },
  {
    label: 'Über uns',
    path: '/about',
  },
  {
    label: 'Kontakt',
    path: '/contact',
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
  forwardRef?: React.RefObject<HTMLAnchorElement | HTMLButtonElement>
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, href, onClick, className = '', forwardRef }) => {
  const internalRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const buttonRef = forwardRef || internalRef
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [shouldWiggle, setShouldWiggle] = useState(false)
  const wiggleTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Wiggle Logic: Nur wenn NICHT gehovert, nach 20s
  useEffect(() => {
    const startWiggleTimer = () => {
      if (wiggleTimerRef.current) {
        clearTimeout(wiggleTimerRef.current)
      }

      wiggleTimerRef.current = setTimeout(() => {
        if (!isHovered) {
          setShouldWiggle(true)
          setTimeout(() => setShouldWiggle(false), 500) // Animation dauert 0.5s
        }
        startWiggleTimer() // Restart timer
      }, 20000) // 20 Sekunden
    }

    startWiggleTimer()

    return () => {
      if (wiggleTimerRef.current) {
        clearTimeout(wiggleTimerRef.current)
      }
    }
  }, [isHovered])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setPosition({ x: x * 0.3, y: y * 0.3 })
    },
    [buttonRef]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setShouldWiggle(false) // Stop wiggle sofort beim Hover
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const baseClasses = `
    cta-sheen
    relative inline-flex items-center gap-2 px-6 py-3 rounded-xl
    bg-gradient-to-r from-vae-turquoise to-emerald-400
    text-gray-900 font-bold text-sm
    shadow-lg shadow-vae-turquoise/30
    transition-all duration-300 ease-out
    hover:shadow-xl hover:shadow-vae-turquoise/50
    active:scale-95
    overflow-hidden
    group
    ${shouldWiggle && !isHovered ? 'animate-wiggle-attention' : ''}
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
        onMouseEnter={handleMouseEnter}
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
      onMouseEnter={handleMouseEnter}
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
 * TWO-COLUMN MEGA MENU COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
interface TwoColumnMegaMenuProps {
  categories: CategoryItem[]
  content: Record<string, MegaMenuItem[]>
  isDark: boolean
  onClose: () => void
}

const TwoColumnMegaMenu: React.FC<TwoColumnMegaMenuProps> = ({ categories, content, isDark, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string>(categories[0]?.id || '')

  const getCategoryColor = (color: CategoryItem['color'], isDark: boolean, isHovered: boolean) => {
    const baseColors = {
      turquoise: isDark
        ? `bg-vae-turquoise/10 text-vae-turquoise border-vae-turquoise/20 ${isHovered ? 'bg-vae-turquoise/20 border-vae-turquoise/40' : ''}`
        : `bg-vae-turquoise/8 text-vae-turquoise border-vae-turquoise/25 ${isHovered ? 'bg-vae-turquoise/15 border-vae-turquoise/50' : ''}`,
      coral: isDark
        ? `bg-orange-500/10 text-orange-400 border-orange-500/20 ${isHovered ? 'bg-orange-500/20 border-orange-500/40' : ''}`
        : `bg-orange-500/8 text-orange-600 border-orange-500/25 ${isHovered ? 'bg-orange-500/15 border-orange-500/50' : ''}`,
      magenta: isDark
        ? `bg-pink-500/10 text-pink-400 border-pink-500/20 ${isHovered ? 'bg-pink-500/20 border-pink-500/40' : ''}`
        : `bg-pink-500/8 text-pink-600 border-pink-500/25 ${isHovered ? 'bg-pink-500/15 border-pink-500/50' : ''}`,
      blue: isDark
        ? `bg-blue-500/10 text-blue-400 border-blue-500/20 ${isHovered ? 'bg-blue-500/20 border-blue-500/40' : ''}`
        : `bg-blue-500/8 text-blue-600 border-blue-500/25 ${isHovered ? 'bg-blue-500/15 border-blue-500/50' : ''}`,
    }
    return baseColors[color]
  }

  const previewItems = content[hoveredCategory] || []

  return (
    <div className="grid grid-cols-[200px_1fr] gap-5 p-5">
      {/* Left Column - Category Navigation */}
      <div className="space-y-2">
        {categories.map(category => {
          const isHovered = hoveredCategory === category.id
          return (
            <Link
              key={category.id}
              to={content[category.id]?.[0]?.path || '#'}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onClick={onClose}
              className={`
                block w-full rounded-xl border p-3.5 transition-all duration-300
                ${getCategoryColor(category.color, isDark, isHovered)}
                ${isHovered ? 'scale-105 shadow-lg' : 'hover:scale-102'}
              `}
            >
              <div className="flex items-center gap-2.5">
                <div className="shrink-0">{category.icon}</div>
                <span className="text-sm font-semibold leading-tight">{category.label}</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Right Column - Preview/Info Window */}
      <div
        className={`
        rounded-xl border p-5 transition-all duration-300
        ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}
      `}
      >
        {previewItems.length > 0 ? (
          <div className="space-y-4">
            {previewItems.map((item, index) => (
              <div key={index}>
                <div className="mb-3 flex items-start gap-3">
                  <div
                    className={`
                    rounded-lg p-2.5
                    ${isDark ? 'bg-vae-turquoise/10' : 'bg-vae-turquoise/10'}
                    text-vae-turquoise
                  `}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex items-center gap-2">
                      <h4 className={`text-base font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      {item.badge && (
                        <span
                          className={`
                          rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider
                          ${isDark ? 'bg-vae-turquoise/15 text-vae-turquoise' : 'bg-vae-turquoise/15 text-vae-turquoise'}
                        `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* CTA Link */}
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    inline-flex items-center gap-2 text-sm font-semibold text-vae-turquoise
                    transition-all duration-200 hover:gap-3
                  `}
                >
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={`py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-sm">Keine Informationen verfügbar</p>
          </div>
        )}
      </div>
    </div>
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
                ? 'border-b border-white/5 bg-[hsl(0,0%,6%)]/95 shadow-lg shadow-black/20 backdrop-blur-xl'
                : 'bg-white/98 shadow-black/8 border-b border-black/10 shadow-lg backdrop-blur-xl'
              : isDark
                ? 'bg-[hsl(0,0%,6%)]/80 backdrop-blur-md'
                : 'border-b border-black/5 bg-white/90 backdrop-blur-md'
          }
        `}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* ═══════════════════════════════════════════════════════════
                LOGO
                ═══════════════════════════════════════════════════════ */}
            <Link to="/" className="group flex items-center gap-1">
              {/* Logo */}
              <div className="relative h-[4.6rem] transition-transform duration-300 group-hover:scale-105 md:h-[5.2rem]">
                <img
                  src="/App_Logo_light.svg"
                  alt="VAE Systems"
                  className="light-invert h-full w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 dark:drop-shadow-[0_0_20px_rgba(0,255,165,0.25)]"
                />
              </div>

              {/* Brand Text */}
              <div className="hidden flex-col border-l border-vae-turquoise/30 pl-3 md:flex">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">
                  Versatile AI
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Enhanced</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Systems</span>
              </div>
            </Link>

            {/* ═══════════════════════════════════════════════════════════
                DESKTOP NAVIGATION

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
                                : 'text-gray-800 hover:bg-black/5 hover:text-gray-900'
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
                        <div className="absolute left-1/2 top-full w-screen max-w-2xl -translate-x-1/2 pt-2">
                          <div
                            className={`
                              overflow-hidden rounded-2xl shadow-2xl
                              ${
                                isDark
                                  ? 'border border-white/10 bg-[hsl(0,0%,8%)] backdrop-blur-xl'
                                  : 'border border-black/10 bg-white backdrop-blur-xl'
                              }
                            `}
                          >
                            {/* Header */}
                            <div className="border-current/10 border-b px-6 py-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3
                                    className={`text-sm font-bold uppercase tracking-wider ${
                                      isDark ? 'text-gray-300' : 'text-gray-600'
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

                            {/* 2-Column Layout or Single Column */}
                            {item.megaMenu.categories && item.megaMenu.content ? (
                              <TwoColumnMegaMenu
                                categories={item.megaMenu.categories}
                                content={item.megaMenu.content}
                                isDark={isDark}
                                onClose={() => setActiveMegaMenu(null)}
                              />
                            ) : item.megaMenu.items ? (
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
                                    <div
                                      className={`
                                      mt-0.5 rounded-lg p-2
                                      ${isDark ? 'bg-vae-turquoise/10' : 'bg-vae-turquoise/10'}
                                      text-vae-turquoise
                                    `}
                                    >
                                      {menuItem.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="mb-1 flex items-center gap-2">
                                        <h4
                                          className={`text-sm font-semibold ${
                                            isDark ? 'text-gray-100' : 'text-gray-900'
                                          } transition-colors group-hover:text-vae-turquoise`}
                                        >
                                          {menuItem.title}
                                        </h4>
                                        {menuItem.badge && (
                                          <span
                                            className={`
                                            rounded-full px-2 py-0.5 text-[10px] font-medium
                                            ${isDark ? 'bg-white/15 text-gray-300' : 'bg-black/8 text-gray-700'}
                                          `}
                                          >
                                            {menuItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {menuItem.description}
                                      </p>
                                    </div>
                                    <ArrowRight
                                      className={`
                                        mt-1 h-4 w-4 -translate-x-2 opacity-0
                                        transition-all duration-200
                                        group-hover:translate-x-0 group-hover:opacity-100
                                        ${isDark ? 'text-gray-400' : 'text-gray-400'}
                                      `}
                                    />
                                  </Link>
                                ))}
                              </div>
                            ) : null}
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
                            : 'text-gray-800 hover:bg-black/5 hover:text-gray-900'
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
            <div className="flex items-center gap-4">
              {/* CTA Button - Desktop */}
              <div className="hidden lg:block">
                <MagneticButton
                  href="https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz"
                  forwardRef={ctaRef as React.RefObject<HTMLAnchorElement>}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Beratung buchen</span>
                </MagneticButton>
              </div>

              {/* Separator (nur desktop sichtbar) */}
              <div className="hidden h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-white/20 lg:block" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`
                  rounded-lg p-2.5 transition-all duration-300
                  ${
                    isDark
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-gray-800 hover:bg-black/5 hover:text-gray-900'
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
                  rounded-lg p-2.5 transition-all duration-300 lg:hidden
                  ${
                    isDark
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-gray-800 hover:bg-black/5 hover:text-gray-900'
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
                ? 'border border-white/10 bg-[hsl(0,0%,8%)] backdrop-blur-xl'
                : 'border border-black/10 bg-white shadow-xl backdrop-blur-xl'
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
                          {/* Check if we have categories/content structure or simple items */}
                          {item.megaMenu.categories && item.megaMenu.content
                            ? // Render all items from all categories in mobile
                              Object.entries(item.megaMenu.content).flatMap(([_categoryId, items]) =>
                                items.map(subItem => (
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
                                        <span
                                          className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                                        >
                                          {subItem.title}
                                        </span>
                                        {subItem.badge && (
                                          <span
                                            className={`rounded-full px-1.5 py-0.5 text-[10px] ${isDark ? 'bg-white/10 text-gray-300' : 'bg-black/8 text-gray-700'}`}
                                          >
                                            {subItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))
                              )
                            : item.megaMenu.items
                              ? item.megaMenu.items.map(subItem => (
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
                                        <span
                                          className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                                        >
                                          {subItem.title}
                                        </span>
                                        {subItem.badge && (
                                          <span
                                            className={`rounded-full px-1.5 py-0.5 text-[10px] ${isDark ? 'bg-white/10 text-gray-300' : 'bg-black/8 text-gray-700'}`}
                                          >
                                            {subItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))
                              : null}
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
                  href="https://nc.intern.vae.systems/apps/calendar/appointment/RgxJERqNkfZz"
                  className="
                    flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-vae-turquoise
                    to-emerald-400 px-6 py-4
                    font-bold text-gray-900
                    shadow-lg shadow-vae-turquoise/30
                  "
                >
                  <Calendar className="h-5 w-5" />
                  <span>Beratung buchen</span>
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
