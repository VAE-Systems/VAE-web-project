import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Header Component
 * 
 * Features:
 * - Fixed position with backdrop blur effect
 * - Responsive navigation with mobile menu
 * - Scroll-based styling changes
 * - Material Symbols icons
 * - VAE brand colors and styling
 */
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'Über uns' },
    { path: '/contact', label: 'Kontakt' },
  ]

  const isActivePath = (path: string) => {
    return location.pathname === path
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-glass border-b border-vae-turquoise/30' 
          : 'bg-transparent border-b border-vae-turquoise/10'
      }`}
    >
      <div className="container-vae">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-4 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="h-10 group-hover:glow-turquoise transition-all duration-300">
              <img 
                src="/LOGO_01_white.svg" 
                alt="VAE Systems Logo" 
                className="h-full w-auto"
              />
            </div>
            <div className="hidden md:block border-l border-vae-turquoise/30 pl-4">
              <div className="text-xs leading-tight tracking-wider">
                <div className="text-vae-turquoise font-medium">VERSATILE AI</div>
                <div className="text-vae-turquoise font-medium">ENHANCED</div>
                <div className="text-vae-turquoise font-medium">SYSTEMS_</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact" className="btn-primary">
              <span className="material-symbols-outlined mr-2">
                rocket_launch
              </span>
              Projekt starten
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-light hover:text-vae-turquoise transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-bg-secondary backdrop-glass">
            <nav className="py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                    isActivePath(item.path)
                      ? 'text-vae-turquoise bg-vae-turquoise/10'
                      : 'text-text-secondary hover:text-vae-turquoise hover:bg-bg-secondary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-4 pt-4">
                <Link 
                  to="/contact" 
                  className="btn-primary w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="material-symbols-outlined mr-2">
                    rocket_launch
                  </span>
                  Projekt starten
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
