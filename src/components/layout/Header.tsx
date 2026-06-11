import { DropdownMenu } from '@/components/navigation/dropdown/DropdownMenu'
import { MENU_DATA } from '@/components/navigation/dropdown/menuData'
import { BOOKING_LINKS } from '@/config/booking'
import { useTheme } from '@/contexts/ThemeContext'
import { useAttentionSignal } from '@/hooks'
import { Calendar, LogIn, Menu, Moon, Sun, X } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const CTA_URL = BOOKING_LINKS.ERSTBERATUNG
const LOGIN_URL = 'https://nc.intern.vae.systems/login?clear=1'

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
  const positionRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [shouldWiggle, setShouldWiggle] = useState(false)
  const wiggleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [canUseMagnet, setCanUseMagnet] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = window.matchMedia('(pointer: fine)')

    const updateCapability = () => {
      setCanUseMagnet(!motionQuery.matches && pointerQuery.matches)
    }

    updateCapability()

    const addListener = (media: MediaQueryList, handler: () => void) => {
      if (media.addEventListener) {
        media.addEventListener('change', handler)
      } else if (media.addListener) {
        media.addListener(handler)
      }
    }

    const removeListener = (media: MediaQueryList, handler: () => void) => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handler)
      } else if (media.removeListener) {
        media.removeListener(handler)
      }
    }

    addListener(motionQuery, updateCapability)
    addListener(pointerQuery, updateCapability)

    return () => {
      removeListener(motionQuery, updateCapability)
      removeListener(pointerQuery, updateCapability)
    }
  }, [])

  useEffect(() => {
    const startWiggleTimer = () => {
      if (wiggleTimerRef.current) {
        clearTimeout(wiggleTimerRef.current)
      }

      wiggleTimerRef.current = setTimeout(() => {
        if (!isHovered) {
          setShouldWiggle(true)
          setTimeout(() => setShouldWiggle(false), 500)
        }
        startWiggleTimer()
      }, 20000)
    }

    startWiggleTimer()

    return () => {
      if (wiggleTimerRef.current) {
        clearTimeout(wiggleTimerRef.current)
      }
    }
  }, [isHovered])

  const scheduleTransform = useCallback(() => {
    if (frameRef.current != null) return
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      if (!buttonRef.current || !canUseMagnet) return
      const { x, y } = positionRef.current
      buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    })
  }, [buttonRef, canUseMagnet])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!buttonRef.current || !canUseMagnet) return
      const rect = buttonRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      positionRef.current = { x: x * 0.25, y: y * 0.25 }
      scheduleTransform()
    },
    [buttonRef, canUseMagnet, scheduleTransform]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setShouldWiggle(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    positionRef.current = { x: 0, y: 0 }
    if (frameRef.current != null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
    setIsHovered(false)
  }, [buttonRef])

  useEffect(() => {
    return () => {
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!canUseMagnet && buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
  }, [canUseMagnet, buttonRef])

  const baseClasses = `
    relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5
    bg-vae-turquoise
    text-black font-black text-[11px] uppercase tracking-[0.14em]
    transition-all duration-200 ease-out
    hover:bg-vae-turquoise/85
    active:scale-[0.98]
    ${shouldWiggle && !isHovered ? 'animate-wiggle-attention' : ''}
    ${className}
  `

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
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
    >
      {content}
    </button>
  )
}

const HeaderModern: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hideOnMobile, setHideOnMobile] = useState(false)
  const lastScrollState = useRef(false)
  const scrollRafRef = useRef<number | null>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const bodyOverflowRef = useRef<string | null>(null)
  const lockedScrollY = useRef(0)
  const lastScrollY = useRef(0)
  const mobileMenuOpenRef = useRef(false)

  // Sync ref with state
  useEffect(() => {
    mobileMenuOpenRef.current = isMobileMenuOpen
  }, [isMobileMenuOpen])

  useAttentionSignal(ctaRef, {
    intervalMs: 30000,
    initialDelayMs: 3000,
    maxRuns: 10,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const ENTER_THRESHOLD = 28
    const EXIT_THRESHOLD = 10

    const evaluateScrollState = () => {
      scrollRafRef.current = null
      const currentScroll = window.scrollY || 0
      const nextState = lastScrollState.current ? currentScroll > EXIT_THRESHOLD : currentScroll > ENTER_THRESHOLD

      if (nextState !== lastScrollState.current) {
        lastScrollState.current = nextState
        setIsScrolled(nextState)
      }

      const isDesktop = window.innerWidth >= 1024
      if (!isDesktop) {
        // Wenn das Mobile-Menü offen ist, Header nicht verstecken
        if (!mobileMenuOpenRef.current) {
          const delta = currentScroll - lastScrollY.current
          if (currentScroll > 80 && delta > 4) {
            setHideOnMobile(true)
          } else if (delta < -4) {
            setHideOnMobile(false)
          }
        }
        lastScrollY.current = currentScroll
      } else {
        setHideOnMobile(false)
      }

      // Menü schließen beim Scrollen (nur wenn es offen ist)
      if (mobileMenuOpenRef.current) {
        setIsMobileMenuOpen(false)
        // Nach dem Schließen sicherstellen, dass Header sichtbar bleibt
        setHideOnMobile(false)
      }
    }

    const handleScroll = () => {
      if (scrollRafRef.current != null) return
      scrollRafRef.current = window.requestAnimationFrame(evaluateScrollState)
    }

    evaluateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', evaluateScrollState)

    return () => {
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', evaluateScrollState)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const body = document.body
    const root = document.documentElement

    if (isMobileMenuOpen) {
      // Speichere aktuelle Scroll-Position
      lockedScrollY.current = window.scrollY

      // Verhindere Scrollen ohne Position-Jump
      body.style.overflow = 'hidden'
      root.style.overflow = 'hidden'
      body.style.touchAction = 'none'

      // Speichere ursprüngliche Werte nur beim ersten Mal
      if (bodyOverflowRef.current === null) bodyOverflowRef.current = body.style.overflow
    } else {
      // Stelle Scrolling wieder her
      body.style.overflow = ''
      root.style.overflow = ''
      body.style.touchAction = ''

      // Stelle Scroll-Position wieder her (falls gespeichert)
      // Nutze requestAnimationFrame um Layout-Thrashing zu vermeiden
      if (lockedScrollY.current > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: lockedScrollY.current, behavior: 'instant' as ScrollBehavior })
        })
      }
    }

    return () => {
      // Cleanup: Stelle sicher, dass Scrolling wieder funktioniert
      body.style.overflow = ''
      root.style.overflow = ''
      body.style.touchAction = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) setHideOnMobile(false)
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined
    previouslyFocused.current = document.activeElement as HTMLElement | null
    const focusableSelectors =
      'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),input,select,textarea,label[tabindex="0"]'
    const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(focusableSelectors)
    focusables?.[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        return
      }
      if (event.key !== 'Tab' || !focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [isMobileMenuOpen])

  const isDark = theme === 'dark'
  const navSections = useMemo(() => MENU_DATA ?? [], [])
  const closeMenu = () => setIsMobileMenuOpen(false)

  // Smart logo click handler: scroll to hero if on homepage, otherwise navigate
  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname === '/') {
        e.preventDefault()
        const heroSection = document.getElementById('hero')
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    },
    [location.pathname]
  )

  return (
    <>
      <header
        className={`
        duration-400 fixed left-0 right-0 top-0 z-[1030] transition-transform ease-out
        ${hideOnMobile && !isMobileMenuOpen ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'}
        transition-colors
        ${
          isScrolled
            ? isDark
              ? 'border-b border-white/10 bg-[hsla(0,0%,6%,0.98)] shadow-sm backdrop-blur-xl'
              : 'bg-[#faf8f4]/97 border-b border-[#c5c9c6] shadow-sm backdrop-blur-sm'
            : isDark
              ? 'border-white/8 border-b bg-[hsla(0,0%,6%,0.96)] backdrop-blur-lg'
              : 'bg-[#faf8f4]/98 border-b border-[#d5d2ce] backdrop-blur-sm'
        }
      `}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Mobile compact bar */}
          <div className="flex items-center justify-between gap-4 py-3 lg:hidden">
            <Link to="/" onClick={handleLogoClick} className="group flex items-center gap-1">
              <div className="relative h-12 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/App_Logo_light.svg"
                  alt="VAE Systems"
                  className="light-invert h-full w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300"
                />
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition-all duration-200 ${
                isDark
                  ? 'border-white/15 bg-transparent text-white hover:border-vae-turquoise/60 hover:text-vae-turquoise'
                  : 'border-black/20 bg-transparent text-[#1a2320] hover:border-vae-turquoise hover:text-vae-turquoise'
              }`}
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="hidden flex-col gap-4 py-4 lg:flex lg:h-20 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" onClick={handleLogoClick} className="group flex items-center gap-1">
                <div className="relative h-[4.6rem] transition-transform duration-300 group-hover:scale-105 md:h-[5.2rem]">
                  <img
                    src="/App_Logo_light.svg"
                    alt="VAE Systems"
                    className="light-invert h-full w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 dark:drop-shadow-[0_0_20px_rgba(0,255,165,0.25)]"
                  />
                </div>
                <div className="hidden flex-col border-l border-vae-turquoise/40 pl-3 min-[1148px]:flex">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-vae-turquoise drop-shadow-[0_1px_0_rgba(0,0,0,0.08)] dark:text-vae-turquoise/85 dark:drop-shadow-none min-[1200px]:text-[9.5px] min-[1200px]:tracking-[0.19em] min-[1280px]:text-[10px] min-[1280px]:tracking-[0.2em] min-[1350px]:text-[11px] min-[1350px]:tracking-[0.22em]">
                    Versatile <span className="-ml-0.5 inline-block">AI</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-vae-turquoise drop-shadow-[0_1px_0_rgba(0,0,0,0.08)] dark:text-vae-turquoise/80 dark:drop-shadow-none min-[1200px]:text-[9.5px] min-[1200px]:tracking-[0.19em] min-[1280px]:text-[10px] min-[1280px]:tracking-[0.2em] min-[1350px]:text-[11px] min-[1350px]:tracking-[0.22em]">
                    Enhanced
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-vae-turquoise drop-shadow-[0_1px_0_rgba(0,0,0,0.08)] dark:text-vae-turquoise/80 dark:drop-shadow-none min-[1200px]:text-[9.5px] min-[1200px]:tracking-[0.19em] min-[1280px]:text-[10px] min-[1280px]:tracking-[0.2em] min-[1350px]:text-[11px] min-[1350px]:tracking-[0.22em]">
                    Systems
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden w-full flex-col gap-4 lg:flex lg:flex-1 lg:flex-row lg:items-center lg:gap-6">
              <DropdownMenu className="w-full" isHeaderScrolled={isScrolled} />
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 bg-transparent px-1 py-2 text-[11px] font-black uppercase tracking-[0.18em] shadow-none transition-all duration-200 ${
                  isDark ? 'text-white/60 hover:text-vae-turquoise' : 'text-gray-600 hover:text-vae-turquoise'
                }`}
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Kundenlogin</span>
              </a>

              <MagneticButton href={CTA_URL} forwardRef={ctaRef as React.RefObject<HTMLAnchorElement>}>
                <Calendar className="h-4 w-4" />
                <span>Beratung buchen</span>
              </MagneticButton>

              <button
                onClick={toggleTheme}
                className={`rounded-xl p-2 transition-all duration-200 ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Darstellung wechseln"
                data-theme-toggle
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom-sheet menu is rendered outside the transforming header so it correctly fills the viewport */}
      {isMobileMenuOpen && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Modal dialog wrapper
        <div
          className="fixed inset-0 z-[9999] lg:hidden"
          role="dialog"
          aria-modal="true"
          onKeyDown={e => e.key === 'Escape' && closeMenu()}
        >
          {}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeMenu}
            onKeyDown={e => e.key === 'Escape' && closeMenu()}
            role="button"
            tabIndex={0}
            aria-label="Menü schließen"
          />
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events -- Modal document container */}
          <div
            ref={sheetRef}
            className={`absolute bottom-0 left-0 right-0 top-0 flex flex-col overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.55)] ${isDark ? 'bg-[#030806] text-white' : 'bg-[#faf8f4] text-gray-900'}`}
            role="document"
            aria-label="Hauptmenü"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex flex-shrink-0 items-center justify-between px-5 pb-2 pt-5">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-vae-turquoise">Menü</span>
              <button
                onClick={closeMenu}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition hover:border-vae-turquoise/40 hover:text-vae-turquoise ${isDark ? 'border-white/10 bg-white/5 text-white' : 'border-gray-200/90 bg-transparent text-gray-800'}`}
                aria-label="Menü schließen"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
              <div className="space-y-6">
                <div className="grid gap-4">
                  {navSections.map(section => (
                    <div
                      key={section.id}
                      className={`border p-4 ${isDark ? 'border-white/8 bg-white/[0.02]' : 'border-gray-200/80 bg-white/95'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise">
                          {section.label}
                        </p>
                        {section.subtitle && (
                          <span className={`text-xs font-medium ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                            {section.subtitle}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 grid gap-2">
                        {section.menuItems.map(item => (
                          <Link
                            key={item.id}
                            to={item.href}
                            onClick={closeMenu}
                            className={`rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:border-vae-turquoise/40 hover:text-vae-turquoise ${isDark ? 'border-white/8 bg-transparent text-white/80' : 'border-gray-200 bg-transparent text-gray-700'}`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3">
                  <a
                    href={CTA_URL}
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-vae-turquoise px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-vae-turquoise/85"
                  >
                    <Calendar className="h-4 w-4" />
                    Beratung buchen
                  </a>
                  <a
                    href={LOGIN_URL}
                    onClick={closeMenu}
                    className={`flex w-full items-center justify-center gap-2 bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] shadow-none transition hover:text-vae-turquoise ${isDark ? 'text-white/70' : 'text-gray-700'}`}
                  >
                    <LogIn className="h-4 w-4" />
                    Kundenlogin
                  </a>
                  <button
                    onClick={() => {
                      toggleTheme()
                    }}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition hover:border-vae-turquoise/40 hover:text-vae-turquoise ${isDark ? 'border-white/15 bg-transparent text-white/70' : 'border-gray-200 bg-transparent text-gray-700'}`}
                  >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
                <div className="h-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderModern
