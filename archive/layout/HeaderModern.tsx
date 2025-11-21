import { DropdownMenu } from '@/components/navigation/dropdown/DropdownMenu'
import { MENU_DATA } from '@/components/navigation/dropdown/menuData'
import { useTheme } from '@/contexts/ThemeContext'
import { useAttentionSignal } from '@/hooks'
import { Calendar, LogIn, Menu, Moon, Sun, X } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const CTA_URL = '/contact#booking'
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
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [shouldWiggle, setShouldWiggle] = useState(false)
  const wiggleTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      setPosition({ x: x * 0.3, y: y * 0.3 })
    },
    [buttonRef]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setShouldWiggle(false)
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
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
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
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {content}
    </button>
  )
}

const HeaderModern: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hideOnMobile, setHideOnMobile] = useState(false)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const bodyOverflowRef = useRef<string | null>(null)
  const lastScrollY = useRef(0)

  useAttentionSignal(ctaRef, {
    intervalMs: 30000,
    initialDelayMs: 3000,
    maxRuns: 10,
  })

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY || 0
      const isDesktop = window.innerWidth >= 1024
      setIsScrolled(current > 20)

      if (!isDesktop) {
        const delta = current - lastScrollY.current
        if (current > 80 && delta > 4) {
          setHideOnMobile(true)
        } else if (delta < -4) {
          setHideOnMobile(false)
        }
        lastScrollY.current = current
      } else {
        setHideOnMobile(false)
      }

      setIsMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Scroll lock while sheet is open
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    if (bodyOverflowRef.current === null) {
      bodyOverflowRef.current = document.body.style.overflow
    }
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = bodyOverflowRef.current
    }
    return () => {
      document.body.style.overflow = bodyOverflowRef.current ?? ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) {
      setHideOnMobile(false)
    }
  }, [isMobileMenuOpen])

  // Focus trap for sheet
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

  return (
    <header
      className={`
        duration-400 fixed left-0 right-0 top-0 z-50 transition-transform ease-out
        ${hideOnMobile ? '-translate-y-full lg:translate-y-0' : 'translate-y-0'}
        transition-colors
        ${
          isScrolled
            ? isDark
              ? 'border-b border-white/10 bg-[hsla(0,0%,6%,0.98)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md'
              : 'bg-white/98 border-b border-gray-200/80 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)] backdrop-blur-md'
            : isDark
              ? 'border-white/8 border-b bg-[hsla(0,0%,6%,0.95)] backdrop-blur-md'
              : 'bg-white/96 border-b border-gray-200/60 backdrop-blur-md'
        }
      `}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Mobile compact bar */}
        <div className="flex items-center justify-between gap-4 py-3 lg:hidden">
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative h-12">
              <img
                src="/App_Logo_light.svg"
                alt="VAE Systems"
                className="light-invert h-full w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200 ${
              isDark
                ? 'border-white/10 bg-white/[0.06] text-white hover:border-vae-turquoise/50 hover:text-vae-turquoise'
                : 'border-gray-200/90 bg-white text-gray-800 shadow-sm hover:border-vae-turquoise hover:text-vae-turquoise'
            }`}
            aria-label="Menü öffnen"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop layout */}
        <div className="hidden flex-col gap-4 py-4 lg:flex lg:h-20 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="group flex items-center gap-1">
              <div className="relative h-[4.6rem] transition-transform duration-300 group-hover:scale-105 md:h-[5.2rem]">
                <img
                  src="/App_Logo_light.svg"
                  alt="VAE Systems"
                  className="light-invert h-full w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-300 dark:drop-shadow-[0_0_20px_rgba(0,255,165,0.25)]"
                />
              </div>
              <div className="hidden flex-col border-l border-vae-turquoise/30 pl-3 md:flex">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">
                  Versatile AI
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Enhanced</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-vae-turquoise">Systems</span>
              </div>
            </Link>
          </div>

          <div className="flex w-full flex-col gap-4 lg:flex-1 lg:flex-row lg:items-center lg:gap-6">
            <DropdownMenu className="hidden w-full lg:block" />
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <MagneticButton href={CTA_URL} forwardRef={ctaRef as React.RefObject<HTMLAnchorElement>}>
              <Calendar className="h-4 w-4" />
              <span>Beratung buchen</span>
            </MagneticButton>

            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-white/20" />

            <button
              onClick={toggleTheme}
              className={`rounded-full border p-2.5 shadow-sm transition-all duration-300 ${
                isDark
                  ? 'border-white/15 bg-white/[0.08] text-gray-300 hover:bg-white/[0.12] hover:text-white'
                  : 'border-gray-200/80 bg-white/90 text-gray-700 hover:border-vae-turquoise hover:bg-white hover:text-vae-turquoise'
              }`}
              aria-label="Darstellung wechseln"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile bottom-sheet menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <div
        ref={sheetRef}
        className={`bg-bg-darker/98 fixed inset-x-0 bottom-0 z-[9999] origin-bottom rounded-t-3xl border-t border-white/10 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Hauptmenü"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-vae-turquoise">Menü</span>
          </div>
          <button
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-vae-turquoise/40 hover:text-vae-turquoise"
            aria-label="Menü schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[78vh] overflow-y-auto px-5 pb-6">
          <div className="space-y-6">
            <div className="grid gap-4">
              {navSections.map(section => (
                <div key={section.id} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vae-turquoise">
                      {section.label}
                    </p>
                    {section.subtitle && <span className="text-xs font-medium text-white/60">{section.subtitle}</span>}
                  </div>
                  <div className="mt-3 grid gap-2">
                    {section.menuItems.map(item => (
                      <Link
                        key={item.id}
                        to={item.href}
                        onClick={closeMenu}
                        className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-sm font-semibold text-white transition hover:border-vae-turquoise/40 hover:text-vae-turquoise"
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
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-vae-turquoise to-emerald-400 px-4 py-3 text-sm font-semibold text-gray-900 shadow-lg shadow-vae-turquoise/30 transition hover:shadow-vae-turquoise/50"
              >
                <Calendar className="h-4 w-4" />
                Beratung buchen
              </a>
              <a
                href={LOGIN_URL}
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-vae-turquoise/40 hover:text-vae-turquoise"
              >
                <LogIn className="h-4 w-4" />
                Kundenlogin
              </a>
              <button
                onClick={() => {
                  toggleTheme()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-vae-turquoise/40 hover:text-vae-turquoise"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderModern
