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
  { id: 'testphase', iconName: 'workspace_premium', label: 'Testphase' },
  { id: 'outcomes', iconName: 'insights', label: 'Ergebnisse' },
  { id: 'services', iconName: 'settings', label: 'Services' },
  { id: 'process', iconName: 'timeline', label: 'Prozess' },
  { id: 'abschluss', iconName: 'check_circle', label: 'Nächste Schritte' },
]

/**
 * Section Navigation - Einfaches, klares Konzept:
 * - Scroll-Position bestimmt welcher Button aktiv ist
 * - Klick scrollt zur Sektion
 * - Hover zeigt grüne Umrandung
 * - Kein "Hängen" nach Klicks, keine Ziel-Markierungen
 */
const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id)

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
          ticking = false
        })
        ticking = true
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Smooth scroll zur Sektion
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    gsap.to(window, {
      scrollTo: { y: element.offsetTop - 80 },
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  return (
    <nav className="fixed right-6 top-1/2 z-50 -translate-y-1/2" aria-label="Section Navigation">
      <div className="flex flex-col gap-3">
        {sections.map(section => {
          const isActive = activeSection === section.id

          return (
            <div key={section.id} className="group relative">
              {/* Navigation Button */}
              <button
                onClick={() => scrollToSection(section.id)}
                onMouseDown={e => e.preventDefault()} // Verhindert focus ring
                className={`
                  hover-lift press-bounce relative flex
                  h-12 w-12 items-center justify-center
                  rounded-full border outline-none
                  backdrop-blur-xl transition-all duration-150 hover:-translate-x-1
                  hover:scale-105 hover:border-vae-turquoise
                  hover:bg-white/15
                  ${
                    isActive
                      ? 'scale-105 border-vae-turquoise bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark text-bg-darker shadow-lg shadow-vae-turquoise/30 dark:text-white'
                      : 'bg-bg-primary/8 dark:bg-white/8 border-border-primary text-text-light dark:border-white/15 dark:text-white'
                  }
                `}
                aria-label={`Zu ${section.label} scrollen`}
              >
                <Icon name={section.iconName} size={18} />

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -left-2 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-vae-turquoise" />
                )}
              </button>

              {/* Tooltip */}
              <div
                className="
                  bg-bg-primary/95 border-border-primary pointer-events-none absolute right-full
                  top-1/2 z-10 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg
                  border px-3 py-2 text-sm font-medium text-text-light opacity-0 shadow-lg
                  backdrop-blur-xl transition-all duration-150 group-hover:-translate-x-1
                  group-hover:opacity-100 dark:border-white/10
                  dark:bg-bg-darker/95 dark:text-white
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

      {/* Progress indicator - reagiert sofort */}
      <div className="bg-border-primary/10 absolute -right-1 bottom-0 top-0 w-0.5 overflow-hidden rounded-full dark:bg-white/10">
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
