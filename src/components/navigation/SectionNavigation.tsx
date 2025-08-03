import React, { useEffect, useState, useCallback } from 'react'
import { Icons } from '../ui/MaterialIcon'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin)

interface SectionData {
  id: string
  icon: keyof typeof Icons
  label: string
}

const sections: SectionData[] = [
  { id: 'hero', icon: 'Home', label: 'Home' },
  { id: 'services', icon: 'Settings', label: 'Services' },
  { id: 'tech-stack', icon: 'Code', label: 'Tech Stack' },
  { id: 'about', icon: 'People', label: 'Über Uns' },
  { id: 'testimonials', icon: 'Message', label: 'Testimonials' },
  { id: 'faq', icon: 'HelpOutline', label: 'FAQ' },
  { id: 'contact', icon: 'Email', label: 'Kontakt' }
]

/**
 * Section Navigation Component
 * 
 * Floating navigation mit smooth scrolling und aktiver Sektion-Erkennung
 * Verwendet Intersection Observer für bessere Performance
 */
const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id)
  const [isVisible, setIsVisible] = useState(true)

  // Intersection Observer für aktive Sektion
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Optimiert für bessere Erkennung
      threshold: [0.1, 0.5]
    }

    const observer = new IntersectionObserver((entries) => {
      // Finde die Sektion mit der größten Intersection Ratio
      let maxRatio = 0
      let currentSection = sections[0].id

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          currentSection = entry.target.id
        }
      })

      setActiveSection(currentSection)
    }, observerOptions)

    // Beobachte alle Sektionen
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Smooth Scroll mit GSAP
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    // Offset für fixed header
    const headerOffset = 80
    const targetPosition = element.offsetTop - headerOffset

    gsap.to(window, {
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      duration: 1.2,
      ease: "power3.inOut"
    })

    // Setze aktive Sektion sofort für besseres UX
    setActiveSection(id)
  }, [])

  // Auto-hide bei Scroll nach unten
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Zeige Navigation wenn:
      // - Am Anfang der Seite (< 100px)
      // - Nach oben gescrollt wird
      // - In den letzten 200px der Seite
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const isNearBottom = currentScrollY + windowHeight > documentHeight - 200
      
      setIsVisible(
        currentScrollY < 100 || 
        currentScrollY < lastScrollY || 
        isNearBottom
      )
      
      lastScrollY = currentScrollY
    }

    const throttledScroll = gsap.utils.throttle(handleScroll, 100)
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  return (
    <nav 
      className={`
        fixed top-1/2 right-6 -translate-y-1/2 z-50
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
      `}
      aria-label="Section Navigation"
    >
      <div className="flex flex-col gap-4">
        {sections.map((section) => {
          const IconComponent = Icons[section.icon]
          const isActive = activeSection === section.id
          
          return (
            <div key={section.id} className="relative group">
              {/* Navigation Button */}
              <button
                onClick={() => scrollToSection(section.id)}
                className={`
                  relative w-12 h-12 rounded-full 
                  backdrop-blur-xl border transition-all duration-300
                  flex items-center justify-center
                  hover:scale-110 hover:-translate-x-1
                  focus:outline-none focus:ring-2 focus:ring-vae-turquoise/50
                  ${isActive
                    ? 'bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark border-vae-turquoise text-bg-darker shadow-lg shadow-vae-turquoise/30 scale-110'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-vae-turquoise/50'
                  }
                `}
                aria-label={`Scroll to ${section.label}`}
                title={section.label}
              >
                <IconComponent 
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
                className={`
                  absolute right-full mr-4 top-1/2 -translate-y-1/2
                  px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                  bg-bg-darker/90 backdrop-blur-xl border border-white/10 text-white
                  opacity-0 pointer-events-none transition-all duration-300
                  group-hover:opacity-100 group-hover:-translate-x-2
                  shadow-lg
                `}
              >
                {section.label}
                
                {/* Tooltip arrow */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-bg-darker/90 border-y-4 border-y-transparent" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress indicator */}
      <div className="absolute -right-1 top-0 bottom-0 w-0.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-vae-turquoise to-vae-turquoise-dark transition-all duration-500 ease-out"
          style={{
            height: `${(sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100}%`
          }}
        />
      </div>
    </nav>
  )
}

export default SectionNavigation
