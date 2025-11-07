/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VAE SYSTEMS - HEADER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Hauptnavigation mit:
 * - Logo & Brand-Text (VERSATILE AI | ENHANCED | SYSTEMS als Blöcke)
 * - Desktop Navigation Pills mit Dropdown-Menüs
 * - Mobile-Menü mit Swipe-Gesten
 * - Theme-Toggle (Light/Dark Mode)
 * - CTA-Button ("30-Min Strategie-Gespräch")
 *
 * STYLING-KLASSEN:
 * - .nav-link: Normale Navigation-Links (Home, VAE CORE, etc.)
 * - .nav-link--active: Aktiver Link-State
 * - .nav-link--expanded: Wenn Dropdown geöffnet ist
 * - .nav-testphase: Hervorgehobener CTA-Link (3-Monate Testphase)
 * - .dropdown-menu: Dropdown-Container (Glassmorphism-Effekt)
 * - .dropdown-card: Einzelne Dropdown-Items
 *
 * Diese Klassen sind in /src/styles/ui-enhancements.css definiert und können
 * dort angepasst werden, um das Design zu ändern (Farben, Shadows, etc.)
 */

// ══════════════════════════════════════════════════════════════════════════
// IMPORTS - Icons und Komponenten
// ══════════════════════════════════════════════════════════════════════════
import {
  ArrowUpRight, // Icon: Pfeil nach oben-rechts (für Dropdown-Items)
  CalendarClock, // Icon: Kalender mit Uhr (für CTA-Button)
  Check as CheckIcon, // Icon: Häkchen (für aktive Items)
  ChevronDown, // Icon: Pfeil nach unten (für Dropdown-Trigger)
  Menu as MenuIcon, // Icon: Hamburger-Menü (Mobile)
  Moon, // Icon: Mond (Dark Mode)
  Sparkle, // Icon: Funkeln (für Testphase-Button)
  Sun, // Icon: Sonne (Light Mode)
  X, // Icon: X zum Schließen (Mobile)
} from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import { useTheme } from '@/contexts/ThemeContext'
import { useAttentionSignal, useFocusTrap } from '@/hooks'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'

// ══════════════════════════════════════════════════════════════════════════
// TYPESCRIPT INTERFACES - Definieren die Struktur der Navigation
// ══════════════════════════════════════════════════════════════════════════

/**
 * NavigationDropdownItem
 * Einzelnes Item in einem Dropdown-Menü (z.B. "Infrastruktur Setup")
 */
interface NavigationDropdownItem {
  label: string // Name des Items (z.B. "Infrastruktur Setup")
  path: string // Link-Ziel (z.B. "/infrastruktur")
  description?: string // Beschreibungstext unter dem Label
  icon?: string // Material Icon Name (z.B. "architecture")
  meta?: string // Zusatzinfo (z.B. "Foundation · 2–4 Wochen")
}

/**
 * NavigationDropdownIntro
 * Header-Bereich eines Dropdown-Menüs (optional)
 */
interface NavigationDropdownIntro {
  eyebrow?: string // Kleiner Text oben (z.B. "Service-Suite")
  badgeLabel?: string // Badge-Text (z.B. "Delivery orchestriert")
  badgeVariant?: 'accent' | 'neutral' | 'soft' // Badge-Stil (Farbe)
}

/**
 * NavigationItem
 * Haupt-Navigationseintrag (z.B. "Services", "Home", etc.)
 */
interface NavigationItem {
  label: string // Angezeigter Text (z.B. "Services")
  path?: string // Direkter Link (wenn kein Dropdown)
  dropdown?: NavigationDropdownItem[] // Array von Dropdown-Items
  dropdownIntro?: NavigationDropdownIntro // Header des Dropdowns
  dropdownFooter?: { label: string; path: string } // Footer-Link im Dropdown
  highlight?: boolean // Ob als CTA-Button dargestellt (z.B. Testphase)
}

// ══════════════════════════════════════════════════════════════════════════
// NAVIGATION KONFIGURATION
// ══════════════════════════════════════════════════════════════════════════
/**
 * Hier wird die komplette Navigation definiert.
 *
 * STRUKTUR:
 * - Einfacher Link: { label: 'Home', path: '/' }
 * - Dropdown-Menü: { label: 'Services', dropdown: [...], dropdownIntro: {...} }
 * - Highlight-CTA: { label: '3-Monate Testphase', path: '/testphase', highlight: true }
 *
 * Um die Navigation zu ändern:
 * 1. Neue Items hinzufügen/entfernen in diesem Array
 * 2. Für Dropdowns: dropdown-Array mit Items füllen
 * 3. Icons aus Material Symbols (https://fonts.google.com/icons)
 */
const navigation: NavigationItem[] = [
  // ────────────────────────────────────────────────────────────────────────
  // HOME - Einfacher Link zur Startseite
  // ────────────────────────────────────────────────────────────────────────
  { label: 'Home', path: '/' },

  // ────────────────────────────────────────────────────────────────────────
  // SERVICES - Dropdown-Menü mit 3 Service-Kategorien
  // ────────────────────────────────────────────────────────────────────────
  {
    label: 'Services',
    dropdownIntro: {
      eyebrow: 'Service-Suite', // Kleiner Text oben
      badgeLabel: 'Delivery orchestriert', // Badge rechts oben
      badgeVariant: 'accent', // Badge-Farbe (accent = türkis)
    },
    dropdownFooter: {
      label: 'Alle Services', // Link-Text im Footer
      path: '/services', // Footer-Link-Ziel
    },
    dropdown: [
      {
        label: 'Infrastruktur Setup',
        path: '/infrastruktur',
        description: 'Produktionsreife Nextcloud-Suite mit Governance, Compliance-Layer und Dokumentation.',
        icon: 'architecture', // Material Symbol Icon
        meta: 'Foundation · 2–4 Wochen', // Zusatzinfo unten
      },
      {
        label: 'AI-Workflow Optimierung',
        path: '/ki-optimierung',
        description: 'Retrieval-Augmented Prozesse, orchestrierte Agenten und KPI-Telemetrie in Echtzeit.',
        icon: 'auto_awesome',
        meta: 'Automation · 3–6 Wochen',
      },
      {
        label: 'Langzeit-Betreuung',
        path: '/betreuung',
        description: 'Lifecycle-Steuerung, Security-Screenings und technischer Support im laufenden Betrieb.',
        icon: 'support_agent',
        meta: 'Care · Laufend',
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // VAE CORE - Einfacher Link
  // ────────────────────────────────────────────────────────────────────────
  { label: 'VAE CORE', path: '/vae-core' },

  // ────────────────────────────────────────────────────────────────────────
  // RESSOURCEN - Dropdown-Menü mit 2 Items
  // ────────────────────────────────────────────────────────────────────────
  {
    label: 'Ressourcen',
    dropdownIntro: {
      eyebrow: 'Guided Experience',
      badgeLabel: 'Direkter Draht',
      badgeVariant: 'soft', // Badge-Farbe (soft = gedämpft)
    },
    dropdown: [
      {
        label: 'Über uns',
        path: '/about',
        description: 'Team, Prinzipien und Architektur-Standards des VAE-Kollektivs.',
        icon: 'insights',
        meta: 'Inside VAE',
      },
      {
        label: 'Kontakt',
        path: '/kontakt',
        description: 'Schneller Zugang zu unserem Core-Team für Beratung & Workshops.',
        icon: 'forward_to_inbox',
        meta: 'Kontakt',
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  // TESTPHASE - Hervorgehobener CTA-Button (highlight: true)
  // ────────────────────────────────────────────────────────────────────────
  // Wird als türkiser Button mit Sparkle-Icon dargestellt
  // CSS-Klasse: .nav-testphase (siehe ui-enhancements.css)
  { label: '3-Monate Testphase', path: '/testphase', highlight: true },
]

const headerMetaSegments: Array<{ icon: string; label: string; className?: string }> = [
  { icon: 'timeline', label: 'Temporal orchestrierte Workflows' },
  { icon: 'security', label: 'ISO 27001 · DSGVO ready', className: 'hidden lg:flex' },
  { icon: 'insights', label: 'Realtime KPI Telemetrie', className: 'hidden xl:flex' },
]

// ══════════════════════════════════════════════════════════════════════════
// HEADER COMPONENT - Hauptfunktion
// ══════════════════════════════════════════════════════════════════════════
const Header: React.FC = () => {
  // ──────────────────────────────────────────────────────────────────────
  // HOOKS & STATES
  // ──────────────────────────────────────────────────────────────────────
  const location = useLocation() // Aktuelle Route (von React Router)
  const { theme, toggleTheme } = useTheme() // Theme Context (light/dark)

  // State für visuelle Zustände
  const [isScrolled, setIsScrolled] = useState(false) // Ob Seite gescrollt ist
  const [openDropdown, setOpenDropdown] = useState<string | null>(null) // Welches Desktop-Dropdown offen ist
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null) // Welches Mobile-Dropdown offen ist

  // Refs für Dropdown-Management (DOM-Referenzen)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({}) // Dropdown-Trigger-Buttons
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({}) // Dropdown-Container
  const focusTrapRef = useRef<HTMLDivElement | null>(null) // Für Keyboard-Navigation
  const activeDropdownRef = useRef<string | null>(null) // Aktuell offenes Dropdown
  const ctaRef = useRef<HTMLAnchorElement>(null) // CTA-Button Ref

  // Mobile Menu Hook (öffnen/schließen/toggle)
  const {
    isOpen: isMobileMenuOpen,
    close: closeMobileMenu,
    toggle: toggleMobileMenu,
    handleSwipeLeft, // Swipe-Gesten für Mobile
    handleSwipeRight,
  } = useMobileMenu()

  // Swipe-Gesten für Mobile Menu
  const mobileMenuRef = useSwipeGesture(handleSwipeLeft, handleSwipeRight, undefined, undefined, {
    threshold: 50, // Mindest-Swipe-Distanz in Pixeln
    restraint: 100, // Maximale Abweichung von der Swipe-Richtung
    allowedTime: 300, // Maximale Zeit für Swipe-Geste
  }) as React.RefObject<HTMLDivElement>

  // Timer für verzögertes Schließen von Dropdowns (Hover-Effekt)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ──────────────────────────────────────────────────────────────────────
  // DROPDOWN MANAGEMENT - Funktionen zum Öffnen/Schließen von Dropdowns
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Löscht den Hover-Timer (verhindert verzögertes Schließen)
   */
  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }, [])

  /**
   * Öffnet ein Dropdown sofort
   * @param label - Name des Dropdown-Items (z.B. "Services")
   */
  const handleOpenDropdown = useCallback(
    (label: string) => {
      clearHoverTimer()
      setOpenDropdown(label)
    },
    [clearHoverTimer]
  )

  /**
   * Schließt das aktive Dropdown sofort
   */
  const closeDropdown = useCallback(() => {
    clearHoverTimer()
    setOpenDropdown(null)
  }, [clearHoverTimer])

  /**
   * Schließt Dropdown mit Verzögerung (für smooth Hover-Effekt)
   * @param delay - Verzögerung in Millisekunden (Standard: 160ms)
   */
  const scheduleDropdownClose = useCallback(
    (delay = 160) => {
      clearHoverTimer()
      hoverTimer.current = setTimeout(() => {
        setOpenDropdown(null)
        hoverTimer.current = null
      }, delay)
    },
    [clearHoverTimer]
  )

  /**
   * Registriert einen Trigger-Button (für Focus-Management)
   * @param label - Name des Dropdown-Items
   */
  const registerTriggerRef = useCallback(
    (label: string) => (node: HTMLButtonElement | null) => {
      triggerRefs.current[label] = node
    },
    []
  )

  /**
   * Registriert einen Dropdown-Container (für Focus-Management)
   * @param label - Name des Dropdown-Items
   */
  const registerDropdownRef = useCallback(
    (label: string) => (node: HTMLDivElement | null) => {
      dropdownRefs.current[label] = node
      if (openDropdown === label) {
        focusTrapRef.current = node
      }
    },
    [openDropdown]
  )

  useEffect(() => {
    activeDropdownRef.current = openDropdown
    focusTrapRef.current = openDropdown ? (dropdownRefs.current[openDropdown] ?? null) : null
  }, [openDropdown])

  useFocusTrap(
    Boolean(openDropdown),
    focusTrapRef,
    () => {
      const label = activeDropdownRef.current
      closeDropdown()
      if (label && triggerRefs.current[label]) {
        triggerRefs.current[label]?.focus()
      }
    },
    { initialFocus: 'first' }
  )

  useAttentionSignal(ctaRef, {
    intervalMs: 60_000,
    initialDelayMs: 7_000,
    jitterMs: 10_000,
    maxRuns: 6,
    nudgeAfter: 3,
  })

  useEffect(() => {
    if (!openDropdown) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdownEl = dropdownRefs.current[openDropdown]
      const triggerEl = triggerRefs.current[openDropdown]

      if (dropdownEl && dropdownEl.contains(target)) {
        return
      }

      if (triggerEl && triggerEl.contains(target)) {
        return
      }

      closeDropdown()
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openDropdown, closeDropdown])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48)
      if (window.scrollY > 48) {
        closeDropdown()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [closeDropdown])

  useEffect(() => {
    closeMobileMenu()
    closeDropdown()
    setMobileDropdownOpen(null)
  }, [location.pathname, location.hash, closeMobileMenu, closeDropdown])

  const isPathActive = useCallback(
    (path: string) => {
      if (path === '/') {
        return location.pathname === '/'
      }
      return location.pathname === path || location.pathname.startsWith(`${path}/`)
    },
    [location.pathname]
  )

  const isNavItemActive = useCallback(
    (item: NavigationItem) => {
      if (item.dropdown?.length) {
        const activeSub = item.dropdown.some(subItem => isPathActive(subItem.path))
        return activeSub || location.pathname === '/services'
      }
      if (!item.path) return false
      return isPathActive(item.path)
    },
    [isPathActive, location.pathname]
  )

  const mobileMenuVisible = isMobileMenuOpen

  const primaryDesktopItems = useMemo(() => navigation.filter(item => !item.highlight), [])
  const highlightDesktopItems = useMemo(() => navigation.filter(item => item.highlight), [])

  const isDarkMode = theme === 'dark'
  const headerSurface = isDarkMode
    ? isScrolled
      ? 'border-white/12 bg-bg-darker/90 shadow-[0_26px_58px_-30px_rgba(8,12,24,0.85)]'
      : 'border-white/10 bg-bg-darker/75 shadow-[0_48px_96px_-52px_rgba(8,12,24,0.85)]'
    : isScrolled
      ? 'border-black/12 bg-white/98 shadow-[0_28px_60px_-30px_rgba(15,23,42,0.25)]'
      : 'border-black/8 bg-white/90 shadow-[0_42px_82px_-46px_rgba(15,23,42,0.25)]'
  const headerClassName = `fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-[28px] backdrop-saturate-150 transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${headerSurface}`

  const navFloatingClass = [
    'nav-floating-container flex items-center justify-center gap-2 border px-3 py-1.5 transition-all duration-500',
    isDarkMode
      ? isScrolled
        ? 'border-white/12 shadow-[0_20px_48px_-26px_rgba(8,12,24,0.65)]'
        : 'border-white/10 shadow-[0_32px_68px_-34px_rgba(8,12,24,0.6)]'
      : isScrolled
        ? 'border-black/15 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.25)]'
        : 'border-black/12 shadow-[0_32px_74px_-36px_rgba(15,23,42,0.25)]',
    isScrolled ? 'scale-[0.985]' : 'scale-100',
  ].join(' ')

  const themeButtonClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white/80 text-text-primary shadow-sm transition-all duration-300 hover:border-vae-turquoise hover:text-vae-turquoise dark:border-white/15 dark:bg-white/[0.08] dark:text-white'

  const handleMobileNavClick = useCallback(() => {
    closeMobileMenu()
    closeDropdown()
    setMobileDropdownOpen(null)
  }, [closeMobileMenu, closeDropdown])

  return (
    <header className={headerClassName}>
      <div className="hidden md:block">
        <div className="container-vae">
          <div
            className={`grid grid-cols-[auto,1fr,auto] items-center gap-6 pb-3 pt-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? 'pointer-events-none -translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <span className="flex items-center gap-2 rounded-full bg-vae-turquoise/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-vae-turquoise dark:bg-vae-turquoise/20">
              <Sparkle className="h-3.5 w-3.5" aria-hidden="true" />
              VAEKTRA CORE
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-medium text-text-secondary dark:text-white/60">
              {headerMetaSegments.map(segment => (
                <span key={segment.label} className={`flex items-center gap-2 ${segment.className ?? ''}`}>
                  <Icon name={segment.icon} className="h-4 w-4 text-vae-turquoise" aria-hidden="true" />
                  <span>{segment.label}</span>
                </span>
              ))}
            </div>
            <Link
              to="/kontakt"
              className="text-text-primary inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold transition-colors hover:border-vae-turquoise hover:text-vae-turquoise dark:border-white/20 dark:text-white"
            >
              <span>Direkter Kontakt</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-vae">
        <div className="flex items-center justify-between gap-3 py-3 md:grid md:h-[96px] md:grid-cols-[auto,1fr,auto] md:items-center md:gap-6 md:py-0">
          <Link
            to="/"
            className="dark:border-white/12 group flex items-center gap-4 rounded-2xl border border-black/15 bg-white/80 px-3 py-2 transition-all duration-300 hover:border-vae-turquoise/40 hover:bg-white/90 dark:bg-white/[0.06] md:px-4"
            onClick={handleMobileNavClick}
          >
            <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-[0_26px_60px_-36px_rgba(15,23,42,0.35)] transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_32px_70px_-36px_rgba(0,255,165,0.35)] dark:bg-gradient-to-br dark:from-white/[0.08] dark:to-white/[0.02] md:h-16 md:w-16">
              <img
                src="/App_Logo_light.svg"
                alt="VAE Systems Logo"
                className="light-invert h-9 w-auto md:h-12"
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="flex flex-col leading-tight md:hidden">
              <span className="text-text-primary text-sm font-semibold dark:text-white">VAE Systems</span>
              <span className="text-xs font-medium text-text-muted dark:text-white/60">AI & Automation Fabric</span>
            </span>
            <span className="hidden flex-col border-l border-white/60 pl-4 leading-relaxed md:flex">
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-vae-turquoise">
                Versatile AI
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-vae-turquoise/90">
                Enhanced
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-vae-turquoise/75">
                Systems
              </span>
            </span>
          </Link>

          <nav className="relative hidden justify-center md:flex" aria-label="Hauptnavigation">
            <div className={navFloatingClass}>
              <ul className="flex items-center gap-2">
                {primaryDesktopItems.map(item => {
                  const isActive = isNavItemActive(item)

                  if (item.dropdown?.length) {
                    const isDropdownOpen = openDropdown === item.label
                    const dropdownId = `${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-menu`
                    return (
                      <li
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => handleOpenDropdown(item.label)}
                        onMouseLeave={() => scheduleDropdownClose()}
                      >
                        <button
                          type="button"
                          ref={registerTriggerRef(item.label)}
                          className={`nav-link flex items-center gap-1 ${isActive ? 'nav-link--active' : ''} ${
                            isDropdownOpen ? 'nav-link--expanded' : ''
                          }`}
                          aria-haspopup="menu"
                          aria-expanded={isDropdownOpen}
                          aria-controls={dropdownId}
                          onFocus={() => handleOpenDropdown(item.label)}
                          onBlur={() => scheduleDropdownClose()}
                          onClick={() => (isDropdownOpen ? closeDropdown() : handleOpenDropdown(item.label))}
                        >
                          <span className="nav-link-text">{item.label}</span>
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                              isDropdownOpen ? 'rotate-180 text-vae-turquoise' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>

                        {isDropdownOpen && (
                          <div
                            ref={registerDropdownRef(item.label)}
                            id={dropdownId}
                            role="menu"
                            aria-label={`${item.label} Navigation`}
                            className="dropdown-menu absolute left-1/2 top-full z-[60] mt-5 min-w-[360px] -translate-x-1/2 rounded-3xl border px-6 py-6 backdrop-blur-2xl"
                            onMouseEnter={() => handleOpenDropdown(item.label)}
                            onMouseLeave={() => scheduleDropdownClose()}
                            onFocusCapture={clearHoverTimer}
                            onBlurCapture={() => scheduleDropdownClose()}
                          >
                            {(item.dropdownIntro?.eyebrow || item.dropdownIntro?.badgeLabel) && (
                              <div className="mb-5 flex items-center justify-between gap-4">
                                {item.dropdownIntro?.eyebrow && (
                                  <span className="text-[11px] uppercase tracking-[0.35em] text-text-muted">
                                    {item.dropdownIntro.eyebrow}
                                  </span>
                                )}
                                {item.dropdownIntro?.badgeLabel && (
                                  <span
                                    className={`dropdown-badge dropdown-badge--${item.dropdownIntro.badgeVariant ?? 'neutral'}`}
                                  >
                                    {item.dropdownIntro.badgeLabel}
                                  </span>
                                )}
                              </div>
                            )}
                            <ul className="grid gap-3" role="none">
                              {item.dropdown.map(subItem => {
                                const active = isPathActive(subItem.path)
                                return (
                                  <li key={subItem.path} role="none">
                                    <Link
                                      to={subItem.path}
                                      className={`dropdown-card group ${active ? 'dropdown-card--active' : ''}`}
                                      role="menuitem"
                                      onClick={() => {
                                        closeDropdown()
                                        handleMobileNavClick()
                                      }}
                                    >
                                      <span className="dropdown-card__icon">
                                        <Icon name={subItem.icon ?? 'auto_awesome'} size={18} />
                                      </span>
                                      <span className="dropdown-card__body">
                                        <span className="dropdown-card__title-row">
                                          <span className="dropdown-card__title">{subItem.label}</span>
                                          {subItem.meta && (
                                            <span className="dropdown-card__meta-chip">{subItem.meta}</span>
                                          )}
                                        </span>
                                        {subItem.description && (
                                          <p className="dropdown-card__description">{subItem.description}</p>
                                        )}
                                      </span>
                                      <span className="dropdown-card__trailing">
                                        {active ? (
                                          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                                        ) : (
                                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                            {item.dropdownFooter && (
                              <div className="border-white/12 mt-5 flex items-center justify-between gap-4 rounded-2xl border bg-white/10 px-4 py-3 text-sm text-text-secondary transition-all duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-text-secondary">
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-vae-turquoise/80">
                                    Übersicht
                                  </p>
                                  <p className="text-xs text-text-muted">
                                    Vergleichen Sie Module, Laufzeiten und Integrationen.
                                  </p>
                                </div>
                                <Link
                                  to={item.dropdownFooter.path}
                                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-vae-turquoise/40 px-4 py-2 text-sm font-semibold text-vae-turquoise transition-colors hover:border-vae-turquoise hover:text-vae-turquoise/80"
                                  role="menuitem"
                                  onClick={() => {
                                    closeDropdown()
                                    handleMobileNavClick()
                                  }}
                                >
                                  {item.dropdownFooter.label}
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    )
                  }

                  if (!item.path) {
                    return null
                  }

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                        onClick={handleMobileNavClick}
                      >
                        <span className="nav-link-text">{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          <div className="flex items-center gap-2 md:justify-end md:gap-3">
            <div className="hidden items-center gap-3 md:flex">
              {highlightDesktopItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path!}
                  className={`nav-testphase ${isNavItemActive(item) ? 'nav-testphase--active' : ''}`}
                  onClick={handleMobileNavClick}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkle className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </span>
                </Link>
              ))}

              <CtaLink
                ctaId="contact.schedule_call"
                ref={ctaRef as unknown as React.Ref<HTMLAnchorElement>}
                className="text-text-primary dark:border-white/12 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-5 py-2 text-sm font-semibold shadow-[0_18px_44px_-28px_rgba(15,23,42,0.35)] transition-all duration-300 hover:border-vae-turquoise hover:text-vae-turquoise dark:bg-white/[0.08] dark:text-white"
                data-green-signal="true"
                aria-label="Direkt Termin buchen (extern)"
              >
                <CalendarClock className="h-4 w-4" />
                30-Min Strategie-Gespräch
              </CtaLink>

              <button
                className={themeButtonClass}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <button
              className={themeButtonClass}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              id="mobile-menu-trigger"
              className="text-text-primary inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white/80 shadow-sm transition-all duration-300 hover:border-vae-turquoise hover:text-vae-turquoise active:scale-[0.98] dark:border-white/15 dark:bg-white/[0.08] dark:text-white md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuVisible ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobileMenuVisible}
              aria-controls="mobile-menu"
            >
              {mobileMenuVisible ? (
                <X className="h-5 w-5 rotate-180 transition-transform duration-300" />
              ) : (
                <MenuIcon className="h-5 w-5 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuVisible && (
        <>
          <div
            className="fixed inset-0 top-[5rem] z-30 bg-black/50 backdrop-blur-sm dark:bg-black/70 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
            className="fixed inset-x-0 top-[5rem] z-40 h-[calc(100vh-5rem)] overflow-hidden md:hidden"
          >
            <div
              className={`border-border-primary bg-white/98 flex h-full transform flex-col border-t shadow-2xl transition-transform duration-300 ease-out dark:border-vae-turquoise/30 dark:bg-bg-darker/95 dark:shadow-black/40 ${
                mobileMenuVisible ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <nav className="flex h-full flex-col overflow-y-auto overscroll-contain px-4 py-6">
                <div className="mb-8 space-y-3">
                  {navigation.map(item => {
                    const isItemActive = isNavItemActive(item)

                    if (item.dropdown?.length) {
                      const expanded = mobileDropdownOpen === item.label
                      const mobileDropdownId = `mobile-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-menu`
                      return (
                        <div
                          key={item.label}
                          className="border-black/12 rounded-2xl border bg-white/85 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
                        >
                          <button
                            type="button"
                            className={`flex w-full items-center justify-between gap-2 rounded-2xl px-5 py-4 text-base font-semibold transition-colors ${
                              expanded || isItemActive ? 'text-vae-turquoise' : 'text-text-light'
                            }`}
                            onClick={() => setMobileDropdownOpen(expanded ? null : item.label)}
                            aria-expanded={expanded}
                            aria-controls={mobileDropdownId}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180 text-vae-turquoise' : ''}`}
                              aria-hidden="true"
                            />
                          </button>

                          {expanded && (
                            <div
                              id={mobileDropdownId}
                              className="space-y-3 border-t border-black/10 px-5 py-4 dark:border-white/10"
                            >
                              {item.dropdown.map(subItem => (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  className={`flex flex-col gap-1 rounded-xl px-3 py-3 text-sm ${
                                    isPathActive(subItem.path)
                                      ? 'bg-vae-turquoise/10 text-vae-turquoise'
                                      : 'text-text-secondary dark:text-text-light'
                                  }`}
                                  onClick={handleMobileNavClick}
                                >
                                  <span className="font-semibold">{subItem.label}</span>
                                  {subItem.description && (
                                    <span className="text-xs text-text-muted dark:text-text-secondary">
                                      {subItem.description}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }

                    if (!item.path) {
                      return null
                    }

                    if (item.highlight) {
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`nav-testphase flex min-h-[52px] w-full items-center justify-center px-6 py-4 text-base font-semibold transition-all duration-300 ${
                            isItemActive ? 'nav-testphase--active' : ''
                          }`}
                          onClick={handleMobileNavClick}
                        >
                          <span className="flex items-center gap-2">
                            <Sparkle className="h-4 w-4" aria-hidden="true" />
                            {item.label}
                          </span>
                        </Link>
                      )
                    }

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between rounded-2xl border border-white/40 px-5 py-4 text-base font-semibold transition-colors ${
                          isItemActive
                            ? 'bg-vae-turquoise/10 text-vae-turquoise'
                            : 'bg-white/70 text-text-light dark:bg-white/[0.04]'
                        }`}
                        onClick={handleMobileNavClick}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-auto space-y-4">
                  <CtaLink
                    ctaId="contact.schedule_call"
                    className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-vae-turquoise px-6 py-4 text-base font-semibold text-white shadow-lg shadow-vae-turquoise/30 transition-all duration-300 hover:bg-vae-turquoise-dark hover:shadow-vae-turquoise/40"
                    onClick={handleMobileNavClick}
                    aria-label="Direkt Termin buchen (extern)"
                  >
                    <CalendarClock className="mr-3 h-5 w-5" />
                    30-Min Strategie-Gespräch
                  </CtaLink>

                  <div className="pt-4 text-center">
                    <p className="mb-2 text-xs text-text-secondary">VAE Systems</p>
                    <p className="text-xs text-text-muted">Versatile AI Enhanced Systems</p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
