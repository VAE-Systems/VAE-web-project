import React, { useEffect, useState, useCallback } from 'react'
import MaterialIcon from '../ui/MaterialIcon'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

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
  { id: 'outcomes', iconName: 'insights', label: 'Outcomes' },
  { id: 'case-studies', iconName: 'work', label: 'Cases' },
  { id: 'services', iconName: 'settings', label: 'Services' },
  { id: 'process', iconName: 'timeline', label: 'Prozess' },
  { id: 'products', iconName: 'inventory_2', label: 'Produkte' },
  { id: 'tech-stack', iconName: 'code', label: 'Tech' },
  { id: 'about', iconName: 'people', label: 'Über Uns' },
  { id: 'faq', iconName: 'help_outline', label: 'FAQ' },
  { id: 'contact', iconName: 'email', label: 'Kontakt' }
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
      ease: "power2.out"
    })
  }, [])

  return (
    <nav 
      className="fixed top-1/2 right-6 -translate-y-1/2 z-50"
      aria-label="Section Navigation"
    >
      <div className="flex flex-col gap-3">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          
          return (
            <div key={section.id} className="relative group">
              {/* Navigation Button */}
              <button
                onClick={() => scrollToSection(section.id)}
                onMouseDown={(e) => e.preventDefault()} // Verhindert focus ring
                className={`
                  relative w-12 h-12 rounded-full 
                  backdrop-blur-xl border transition-all duration-150
                  flex items-center justify-center
                  hover:scale-105 hover:-translate-x-1
                  hover:border-vae-turquoise hover:bg-white/15
                  outline-none
                  ${isActive
                    ? 'bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark text-bg-darker shadow-lg shadow-vae-turquoise/30 scale-105 border-vae-turquoise'
                    : 'bg-white/8 border-white/15 text-white'
                  }
                `}
                aria-label={`Zu ${section.label} scrollen`}
              >
                <MaterialIcon 
                  icon={section.iconName}
                  size={18} 
                  weight={isActive ? 600 : 400}
                  filled={isActive}
                />
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-vae-turquoise rounded-full" />
                )}
              </button>

              {/* Tooltip */}
              <div 
                className="
                  absolute right-full mr-3 top-1/2 -translate-y-1/2
                  px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                  bg-bg-darker/95 backdrop-blur-xl border border-white/10 text-white
                  opacity-0 pointer-events-none transition-all duration-150
                  group-hover:opacity-100 group-hover:-translate-x-1
                  shadow-lg z-10
                "
              >
                {section.label}
                
                {/* Tooltip arrow */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-bg-darker/95 border-y-4 border-y-transparent" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress indicator - reagiert sofort */}
      <div className="absolute -right-1 top-0 bottom-0 w-0.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-vae-turquoise to-vae-turquoise-dark transition-all duration-200 ease-out"
          style={{
            height: `${(sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100}%`
          }}
        />
      </div>
    </nav>
  )
}

export default SectionNavigation
