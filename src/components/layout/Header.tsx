import {
  ArrowUpRight,
  CalendarClock,
  Check as CheckIcon,
  ChevronDown,
  Menu as MenuIcon,
  Moon,
  Sparkle,
  Sun,
  X,
} from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import CtaLink from '@/components/ui/CtaLink'
import Icon from '@/components/ui/Icon'
import { useTheme } from '@/contexts/ThemeContext'
import { useAttentionSignal, useFocusTrap } from '@/hooks'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'

interface NavigationDropdownItem {
  label: string
  path: string
  description?: string
  icon?: string
  meta?: string
}

interface NavigationItem {
  label: string
  path?: string
  dropdown?: NavigationDropdownItem[]
  highlight?: boolean
}

const navigation: NavigationItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    dropdown: [
      {
        label: 'Infrastruktur Setup',
        path: '/infrastruktur',
        description: 'Produktionsreife Nextcloud-Suite, Governance & Security Framework – fertig dokumentiert.',
        icon: 'architecture',
        meta: 'Setup · 2–4 Wochen',
      },
      {
        label: 'AI-Workflow Optimierung',
        path: '/ki-optimierung',
        description: 'Automatisierte Prozesse, Retrieval-Pipelines und KPI-Dashboards für messbare Effekte.',
        icon: 'auto_awesome',
        meta: 'AI · 3–6 Wochen',
      },
      {
        label: 'Langzeit-Betreuung',
        path: '/betreuung',
        description: 'Release-Planung, Security-Checks und technischer Support im laufenden Betrieb.',
        icon: 'support_agent',
        meta: 'Care · Laufend',
      },
    ],
  },
  { label: 'VAE CORE', path: '/vae-core' },
  { label: '3-Monate Testphase', path: '/testphase', highlight: true },
  { label: 'Über uns', path: '/about' },
  { label: 'Kontakt', path: '/kontakt' },
]

const Header: React.FC = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const [isScrolled, setIsScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)

  const servicesTriggerRef = useRef<HTMLButtonElement>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const {
    isOpen: isMobileMenuOpen,
    close: closeMobileMenu,
    toggle: toggleMobileMenu,
    handleSwipeLeft,
    handleSwipeRight,
  } = useMobileMenu()

  const mobileMenuRef = useSwipeGesture(handleSwipeLeft, handleSwipeRight, undefined, undefined, {
    threshold: 50,
    restraint: 100,
    allowedTime: 300,
  }) as React.RefObject<HTMLDivElement>

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openServicesMenu = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
    setServicesOpen(true)
  }, [])

  const closeServicesMenu = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
    setServicesOpen(false)
  }, [])

  const scheduleServicesClose = useCallback((delay = 160) => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
    }
    hoverTimer.current = setTimeout(() => {
      setServicesOpen(false)
      hoverTimer.current = null
    }, delay)
  }, [])

  useFocusTrap(
    servicesOpen,
    servicesDropdownRef,
    () => {
      closeServicesMenu()
      servicesTriggerRef.current?.focus()
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
    if (!servicesOpen) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(target) &&
        !servicesTriggerRef.current?.contains(target)
      ) {
        closeServicesMenu()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [servicesOpen, closeServicesMenu])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48)
      if (window.scrollY > 48) {
        closeServicesMenu()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [closeServicesMenu])

  useEffect(() => {
    closeMobileMenu()
    closeServicesMenu()
    setMobileDropdownOpen(null)
  }, [location.pathname, location.hash, closeMobileMenu, closeServicesMenu])

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

  const handleMobileNavClick = useCallback(() => {
    closeMobileMenu()
    setMobileDropdownOpen(null)
  }, [closeMobileMenu])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${theme === 'light' ? 'bg-white/85' : 'bg-bg-darker/85'} backdrop-glass border-b ${theme === 'light' ? 'border-black/10' : 'border-vae-turquoise/30'} shadow-[0_22px_48px_-36px_rgba(15,23,42,0.65)]`
          : `border-b bg-transparent ${theme === 'light' ? 'border-black/10' : 'border-vae-turquoise/10'} shadow-[0_18px_42px_-36px_rgba(15,23,42,0.45)]`
      }`}
    >
      <div className="container-vae relative">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="group flex items-center gap-4 pr-2" onClick={handleMobileNavClick}>
            <div className="group-hover:glow-turquoise relative h-14 transition-all duration-300 sm:h-16">
              <img
                src="/App_Logo_light.svg"
                alt="VAE Systems Logo"
                className="light-invert h-full w-auto drop-shadow-[0_10px_28px_rgba(45,212,191,0.22)]"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="hidden border-l border-vae-turquoise/25 pl-4 md:block">
              <div className="space-y-1 text-[10px] uppercase tracking-[0.35em] text-vae-turquoise/70">
                <div className="text-[11px] font-semibold tracking-[0.28em] text-vae-turquoise">Versatile AI</div>
                <div className="text-[11px] font-semibold tracking-[0.28em] text-vae-turquoise">Enhanced</div>
                <div className="text-[11px] font-semibold tracking-[0.28em] text-vae-turquoise">Systems</div>
              </div>
            </div>
          </Link>

          <nav className="relative hidden items-center space-x-6 md:flex xl:space-x-10">
            {navigation.map(item => {
              const isActive = isNavItemActive(item)

              if (item.dropdown?.length) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={() => scheduleServicesClose()}
                  >
                    <button
                      type="button"
                      ref={servicesTriggerRef}
                      className={`nav-link flex items-center gap-1 ${isActive ? 'nav-link--active' : ''}`}
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onFocus={openServicesMenu}
                      onBlur={() => scheduleServicesClose()}
                      onClick={() => (servicesOpen ? closeServicesMenu() : openServicesMenu())}
                    >
                      <span className="nav-link-text">{item.label}</span>
                      <ChevronDown
                        className={`text-base transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                        size={18}
                      />
                    </button>

                    {servicesOpen && (
                      <div
                        ref={servicesDropdownRef}
                        id="services-menu"
                        role="menu"
                        aria-label="Services Navigation"
                        className="dropdown-menu absolute left-1/2 top-full z-[60] mt-5 min-w-[360px] -translate-x-1/2 rounded-2xl border border-white/10 bg-white/95 px-6 py-5 shadow-[0_26px_60px_-35px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-white/15 dark:bg-bg-darker/95"
                        onMouseEnter={openServicesMenu}
                        onMouseLeave={() => scheduleServicesClose()}
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-[11px] uppercase tracking-[0.35em] text-text-muted">Service-Suite</span>
                          <span className="rounded-full bg-vae-turquoise/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-vae-turquoise">
                            End-to-End Betreuung
                          </span>
                        </div>
                        <ul className="grid gap-3" role="none">
                          {item.dropdown.map(subItem => {
                            const active = isPathActive(subItem.path)
                            return (
                              <li key={subItem.path} role="none">
                                <Link
                                  to={subItem.path}
                                  className={`group flex items-start gap-4 rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 ${
                                    active
                                      ? 'border-vae-turquoise/50 bg-vae-turquoise/10 shadow-[0_10px_30px_-15px_rgba(var(--vae-turquoise-rgb),0.55)]'
                                      : 'hover:border-vae-turquoise/35 hover:bg-vae-turquoise/5 dark:hover:bg-white/5'
                                  }`}
                                  role="menuitem"
                                  onClick={() => {
                                    closeServicesMenu()
                                    handleMobileNavClick()
                                  }}
                                >
                                  <span
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                      active ? 'bg-vae-turquoise text-white' : 'bg-vae-turquoise/10 text-vae-turquoise'
                                    }`}
                                  >
                                    <Icon name={subItem.icon ?? 'auto_awesome'} size={18} />
                                  </span>
                                  <span className="flex-1">
                                    <span className="flex items-center gap-2 text-sm font-semibold text-text-light">
                                      {subItem.label}
                                      {subItem.meta && (
                                        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-vae-turquoise/80">
                                          {subItem.meta}
                                        </span>
                                      )}
                                    </span>
                                    {subItem.description && (
                                      <span className="mt-1 block text-xs leading-snug text-text-secondary">
                                        {subItem.description}
                                      </span>
                                    )}
                                  </span>
                                  <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full border border-transparent transition-all ${
                                      active
                                        ? 'border-vae-turquoise/60 bg-vae-turquoise/15 text-vae-turquoise'
                                        : 'text-text-secondary group-hover:text-vae-turquoise'
                                    }`}
                                  >
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
                        <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-vae-turquoise/15 bg-vae-turquoise/5 px-4 py-3">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-vae-turquoise/80">
                              Übersicht
                            </p>
                            <p className="text-xs text-text-secondary">Vergleichen Sie alle Module & Abhängigkeiten.</p>
                          </div>
                          <Link
                            to="/services"
                            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-vae-turquoise/40 px-4 py-2 text-sm font-semibold text-vae-turquoise transition-colors hover:border-vae-turquoise hover:text-vae-turquoise/80"
                            role="menuitem"
                            onClick={() => {
                              closeServicesMenu()
                              handleMobileNavClick()
                            }}
                          >
                            Alle Services
                          </Link>
                        </div>
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
                    className={`nav-testphase ${isActive ? 'nav-testphase--active' : ''}`}
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
                  className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                  onClick={handleMobileNavClick}
                >
                  <span className="nav-link-text">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center space-x-4 md:flex">
            <CtaLink
              ctaId="contact.schedule_call"
              ref={ctaRef as unknown as React.Ref<HTMLAnchorElement>}
              className={`${
                theme === 'light' ? 'box-decoration-clone' : 'btn-primary'
              } inline-flex items-center space-x-3 !text-sm font-medium md:!px-6 md:!py-2`}
              data-green-signal="true"
              aria-label="Direkt Termin buchen (extern)"
            >
              <CalendarClock className="mr-2 h-4 w-4" />
              30-Min Strategie-Gespräch
            </CtaLink>

            <button
              className="rounded-lg p-2 text-text-light transition-colors duration-300 hover:bg-bg-secondary hover:text-vae-turquoise"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <button
              className="touch-manipulation rounded-lg p-2 text-text-light transition-colors duration-300 hover:bg-bg-secondary hover:text-vae-turquoise active:bg-bg-secondary"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              id="mobile-menu-trigger"
              className="group relative z-50 touch-manipulation rounded-lg p-3 text-text-light transition-all duration-300 hover:bg-bg-secondary hover:text-vae-turquoise active:bg-bg-secondary"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuVisible ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobileMenuVisible}
              aria-controls="mobile-menu"
            >
              {mobileMenuVisible ? (
                <X className="h-6 w-6 rotate-180 transition-transform duration-300" />
              ) : (
                <MenuIcon className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuVisible && (
        <>
          <div
            className="fixed inset-0 top-16 z-30 bg-black/50 backdrop-blur-sm dark:bg-black/70 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
            className="fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-hidden md:hidden"
          >
            <div
              className={`border-border-primary flex h-full transform flex-col border-t bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-vae-turquoise/30 dark:bg-bg-darker/95 dark:shadow-black/40 ${
                mobileMenuVisible ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <nav className="flex h-full flex-col overflow-y-auto overscroll-contain px-4 py-6">
                <div className="mb-8 space-y-3">
                  {navigation.map(item => {
                    const isItemActive = isNavItemActive(item)

                    if (item.dropdown?.length) {
                      const expanded = mobileDropdownOpen === item.label
                      return (
                        <div
                          key={item.label}
                          className="rounded-xl border border-white/10 bg-white/[0.04] dark:border-white/10 dark:bg-white/[0.02]"
                        >
                          <button
                            type="button"
                            className={`flex w-full items-center justify-between gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-colors ${
                              expanded || isItemActive ? 'text-vae-turquoise' : 'text-text-light'
                            }`}
                            onClick={() => setMobileDropdownOpen(expanded ? null : item.label)}
                            aria-expanded={expanded}
                            aria-controls="mobile-services-menu"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180 text-vae-turquoise' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                          <div
                            id="mobile-services-menu"
                            className={`${expanded ? 'grid' : 'hidden'} gap-2 border-t border-white/10 px-3 py-3`}
                          >
                            {item.dropdown.map(subItem => {
                              const subActive = isPathActive(subItem.path)
                              return (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  className={`group flex items-start gap-3 rounded-xl border border-transparent px-4 py-4 text-sm transition-all ${
                                    subActive
                                      ? 'border-vae-turquoise/50 bg-vae-turquoise text-white shadow-lg shadow-vae-turquoise/25'
                                      : 'text-text-light hover:border-vae-turquoise/35 hover:bg-bg-secondary/80 hover:text-vae-turquoise dark:text-text-light dark:hover:bg-white/5'
                                  }`}
                                  onClick={handleMobileNavClick}
                                >
                                  <span
                                    className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                                      subActive ? 'bg-white/20 text-white' : 'bg-vae-turquoise/15 text-vae-turquoise'
                                    }`}
                                  >
                                    <Icon name={subItem.icon ?? 'auto_awesome'} size={18} />
                                  </span>
                                  <span className="flex-1">
                                    <span className="block text-base font-semibold">{subItem.label}</span>
                                    {subItem.description && (
                                      <span className="mt-1 block text-xs leading-snug text-text-secondary dark:text-text-muted">
                                        {subItem.description}
                                      </span>
                                    )}
                                    {subItem.meta && (
                                      <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.3em] text-vae-turquoise/70">
                                        {subItem.meta}
                                      </span>
                                    )}
                                  </span>
                                  {subActive && <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0" aria-hidden="true" />}
                                </Link>
                              )
                            })}
                            <Link
                              to="/services"
                              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-text-muted underline-offset-4 transition-colors hover:text-vae-turquoise dark:text-text-secondary"
                              onClick={handleMobileNavClick}
                            >
                              <span>Alle Services im Überblick</span>
                            </Link>
                          </div>
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
                          className={`nav-testphase flex min-h-[52px] w-full touch-manipulation items-center justify-center px-6 py-4 text-base font-semibold transition-all duration-300 ${
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
                        className={`group flex min-h-[52px] touch-manipulation items-center justify-between rounded-xl px-6 py-4 text-base font-medium transition-all duration-300 ${
                          isItemActive
                            ? 'bg-vae-turquoise text-white shadow-lg shadow-vae-turquoise/20'
                            : 'text-text-light hover:bg-bg-secondary hover:text-vae-turquoise active:bg-bg-secondary/80 dark:text-text-light dark:hover:bg-white/5 dark:active:bg-white/10'
                        }`}
                        onClick={handleMobileNavClick}
                      >
                        <span>{item.label}</span>
                        {isItemActive && <CheckIcon className="h-4 w-4 opacity-80" aria-hidden="true" />}
                      </Link>
                    )
                  })}
                </div>

                <div className="via-border-primary mb-8 h-px bg-gradient-to-r from-transparent to-transparent dark:via-white/20" />

                <div className="mt-auto space-y-4">
                  <CtaLink
                    ctaId="contact.schedule_call"
                    className="flex min-h-[52px] w-full touch-manipulation items-center justify-center rounded-xl bg-vae-turquoise px-6 py-4 text-base font-semibold text-white shadow-lg shadow-vae-turquoise/30 transition-all duration-300 hover:bg-vae-turquoise-dark hover:shadow-vae-turquoise/40 active:bg-vae-turquoise-dark"
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
