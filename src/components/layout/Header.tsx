import { DropdownMenu } from '@/components/navigation/dropdown/DropdownMenu'
import { useTheme } from '@/contexts/ThemeContext'
import { useAttentionSignal } from '@/hooks'
import { Calendar, Moon, Sun } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const CTA_URL = '/termin-buchen'

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
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useAttentionSignal(ctaRef, {
    intervalMs: 30000,
    initialDelayMs: 3000,
    maxRuns: 10,
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDark = theme === 'dark'

  return (
    <header
      className={`
        fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-out
        ${
          isScrolled
            ? isDark
              ? 'bg-[hsl(0,0%,6%)]/98 border-b border-white/10 shadow-sm backdrop-blur-xl'
              : 'border-b border-gray-200/70 bg-white shadow-sm backdrop-blur-sm'
            : isDark
              ? 'border-white/8 bg-[hsl(0,0%,6%)]/96 border-b backdrop-blur-lg'
              : 'bg-white/98 border-b border-gray-100/80 backdrop-blur-sm'
        }
      `}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 lg:h-20 lg:flex-row lg:items-center lg:gap-8">
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

            <button
              onClick={toggleTheme}
              className={`p-2 transition-all duration-200 lg:hidden ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
              aria-label="Darstellung wechseln"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex w-full flex-col gap-4 lg:flex-1 lg:flex-row lg:items-center lg:gap-6">
            <DropdownMenu className="w-full" />

            <div className="flex items-center gap-3 lg:hidden">
              <a
                href={CTA_URL}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isDark
                    ? 'text-vae-turquoise hover:text-vae-turquoise/80'
                    : 'text-vae-turquoise hover:text-vae-turquoise/80'
                }`}
              >
                <Calendar className="h-4 w-4" />
                Beratung buchen
              </a>
            </div>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            <MagneticButton href={CTA_URL} forwardRef={ctaRef as React.RefObject<HTMLAnchorElement>}>
              <Calendar className="h-4 w-4" />
              <span>Beratung buchen</span>
            </MagneticButton>

            <button
              onClick={toggleTheme}
              className={`p-2 transition-all duration-200 ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
              aria-label="Darstellung wechseln"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderModern
