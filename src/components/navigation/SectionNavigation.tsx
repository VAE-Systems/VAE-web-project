import Icon from '@/components/ui/Icon'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import React, { useCallback, useEffect, useState } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin)

interface SectionData {
  id: string
  iconName: string
  label: string
}

// Reihenfolge an neue Homepage-Story angepasst
const sections: SectionData[] = [
  { id: 'hero', iconName: 'home', label: 'Home' },
  { id: 'why-open-source', iconName: 'lightbulb', label: 'Warum Open Source?' },
  { id: 'services', iconName: 'settings', label: 'Services' },
  { id: 'social-proof', iconName: 'work', label: 'Projekte' },
  { id: 'process', iconName: 'timeline', label: 'Prozess' },
  { id: 'abschluss', iconName: 'check_circle', label: 'Kontakt' },
]

/**
 * Section Navigation - Einfaches, klares Konzept:
 * - Scroll-Position bestimmt welcher Button aktiv ist
 * - Klick scrollt zur Sektion
 * - Hover zeigt grüne Umrandung
 * - Mobile-optimiert: Kleinere Buttons, auto-hide Funktion
 */
const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const hideTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Kontinuierliche Sektion-Erkennung basierend auf Scroll-Position
  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY
      const headerOffset = 100

      let currentSection = sections[0].id

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)

        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = scrollY + rect.top

          if (scrollY + headerOffset >= elementTop - 50) {
            currentSection = section.id
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection()

          // Mobile Auto-Hide Logic: Verstecke beim Scrollen nach unten, zeige beim Scrollen nach oben
          const currentScrollY = window.scrollY
          if (window.innerWidth < 768) {
            // Nur auf Mobile
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
              // Scrolling down - verstecke Navigation
              setIsVisible(false)

              // Auto-show nach 2s Inaktivität
              if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
              hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(true)
              }, 2000)
            } else {
              // Scrolling up - zeige Navigation
              setIsVisible(true)
              if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
            }
          } else {
            // Desktop - immer sichtbar
            setIsVisible(true)
          }
          setLastScrollY(currentScrollY)

          ticking = false
        })
        ticking = true
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [lastScrollY])

  // Smooth scroll zur Sektion
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    // Zeige Navigation nach Klick (Mobile)
    setIsVisible(true)

    gsap.to(window, {
      scrollTo: { y: element.offsetTop - 80 },
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  return (
    <nav
      className={`
        fixed right-3 top-1/2 z-40 -translate-y-1/2 transition-all
        duration-300 ease-out md:right-6
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}
      `}
      aria-label="Section Navigation"
    >
      <div className="flex flex-col gap-2 md:gap-3">
        {sections.map(section => {
          const isActive = activeSection === section.id

          return (
            <div key={section.id} className="group relative">
              {/* Navigation Button - Kleinere Größe auf Mobile */}
              <button
                onClick={() => scrollToSection(section.id)}
                onMouseDown={e => e.preventDefault()} // Verhindert focus ring
                className={`
                  hover-lift press-bounce relative flex
                  h-9 w-9 items-center justify-center rounded-full border
                  outline-none backdrop-blur-xl transition-all
                  duration-150 hover:scale-105 hover:border-vae-turquoise
                  hover:bg-white/15 md:h-12
                  md:w-12
                  md:hover:-translate-x-1
                  ${
                    isActive
                      ? 'scale-105 border-vae-turquoise bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark text-bg-darker shadow-lg shadow-vae-turquoise/30 dark:text-white'
                      : 'bg-bg-primary/8 dark:bg-white/8 border-border-primary text-text-light dark:border-white/15 dark:text-white'
                  }
                `}
                aria-label={`Zu ${section.label} scrollen`}
              >
                <Icon name={section.iconName} size={16} className="md:!text-[18px]" />

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -left-1.5 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-vae-turquoise md:-left-2 md:h-6 md:w-1" />
                )}
              </button>

              {/* Tooltip - Nur auf Desktop */}
              <div
                className="
                  bg-bg-primary/95 border-border-primary
                  pointer-events-none absolute right-full top-1/2 z-10
                  mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border
                  px-3 py-2 text-sm font-medium text-text-light opacity-0 shadow-lg backdrop-blur-xl
                  transition-all duration-150 group-hover:-translate-x-1 group-hover:opacity-100
                  dark:border-white/10 dark:bg-bg-darker/95
                  dark:text-white md:block
                "
              >
                {section.label}

                {/* Tooltip arrow */}
                <div className="absolute left-full top-1/2 h-0 w-0 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-bg-darker/95" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress indicator - Schmaler auf Mobile */}
      <div className="bg-border-primary/10 absolute -right-0.5 bottom-0 top-0 w-0.5 overflow-hidden rounded-full dark:bg-white/10 md:-right-1">
        <div
          className="w-full bg-gradient-to-b from-vae-turquoise to-vae-turquoise-dark transition-all duration-200 ease-out"
          style={{
            height: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
          }}
        />
      </div>
    </nav>
  )
}

export default SectionNavigation
