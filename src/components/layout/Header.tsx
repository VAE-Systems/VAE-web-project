import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { productCategories } from '../navigation/productCategories'
import { serviceCategories } from '../navigation/serviceCategories'
import { useFocusTrap } from '@/hooks'

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
  const [productsOpen, setProductsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const productsTimeout = useRef<number | null>(null)
  const servicesTimeout = useRef<number | null>(null)
  const productsMegaRef = useRef<HTMLDivElement>(null)
  const servicesMegaRef = useRef<HTMLDivElement>(null)
  useFocusTrap(productsOpen, productsMegaRef, () => setProductsOpen(false), { initialFocus: 'none' })
  useFocusTrap(servicesOpen, servicesMegaRef, () => setServicesOpen(false), { initialFocus: 'none' })

  // Close on outside click
  useEffect(() => {
    if (!productsOpen) return
    const handleClick = (e: MouseEvent) => {
      if (productsMegaRef.current && !productsMegaRef.current.contains(e.target as Node)) {
        const trigger = document.getElementById('products-trigger')
        if (trigger && trigger.contains(e.target as Node)) return
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [productsOpen])

  useEffect(() => {
    if (!servicesOpen) return
    const handleClick = (e: MouseEvent) => {
      if (servicesMegaRef.current && !servicesMegaRef.current.contains(e.target as Node)) {
        const trigger = document.getElementById('services-trigger')
        if (trigger && trigger.contains(e.target as Node)) return
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [servicesOpen])

  const openProducts = () => {
    if (productsTimeout.current) window.clearTimeout(productsTimeout.current)
    setProductsOpen(true)
    setServicesOpen(false)
  }
  const closeProducts = () => {
    if (productsTimeout.current) window.clearTimeout(productsTimeout.current)
    productsTimeout.current = window.setTimeout(() => setProductsOpen(false), 120)
  }
  const openServices = () => {
    if (servicesTimeout.current) window.clearTimeout(servicesTimeout.current)
    setServicesOpen(true)
    setProductsOpen(false)
  }
  const closeServices = () => {
    if (servicesTimeout.current) window.clearTimeout(servicesTimeout.current)
    servicesTimeout.current = window.setTimeout(() => setServicesOpen(false), 120)
  }

  // Handle scroll effect
  // Close on location (route) change
  useEffect(() => {
  setProductsOpen(false)
  setServicesOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
  if (productsOpen) setProductsOpen(false)
  if (servicesOpen) setServicesOpen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services', hasMega: true, mega: 'services' as const },
    { path: '/products', label: 'Products', hasMega: true, mega: 'products' as const },
    { path: '/about', label: 'Über uns' },
    { path: '/contact', label: 'Kontakt' },
  ]

  const isActivePath = (path: string) => {
    if (path === '/products') return location.pathname.startsWith('/products')
    if (path === '/services') return location.pathname.startsWith('/services')
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
                src="/LOGO_02_white.svg" 
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
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              item.hasMega ? (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={item.mega === 'products' ? openProducts : openServices}
                  onMouseLeave={item.mega === 'products' ? closeProducts : closeServices}
                  onFocus={item.mega === 'products' ? openProducts : openServices}
                  onBlur={item.mega === 'products' ? closeProducts : closeServices}
                >
                  <Link
                    id={item.mega === 'products' ? 'products-trigger' : 'services-trigger'}
                    to={item.path}
                    className={`nav-link flex items-center gap-1 ${isActivePath(item.path) ? 'active' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={item.mega === 'products' ? productsOpen : servicesOpen}
                    aria-controls={item.mega === 'products' ? 'products-mega' : 'services-mega'}
                    onClick={() => {
                      if (item.mega === 'products') {
                        setProductsOpen(false)
                      } else {
                        setServicesOpen(false)
                      }
                    }}
                  >
                    {item.label}
                    <span className={`material-symbols-outlined text-base transition-transform duration-300 ${(item.mega === 'products' ? productsOpen : servicesOpen) ? 'rotate-180' : ''}`}>expand_more</span>
                  </Link>
                  {item.mega === 'products' && productsOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-[var(--z-dropdown)]"
                      onMouseEnter={openProducts}
                      onMouseLeave={closeProducts}
                    >
                      <div 
                        ref={productsMegaRef}
                        id="products-mega"
                        className="mega-panel w-[920px] rounded-2xl border border-white/10 backdrop-blur-xl bg-[linear-gradient(135deg,rgba(10,15,15,0.92),rgba(10,25,20,0.90))] shadow-2xl shadow-black/40 ring-1 ring-white/10 focus:outline-none"
                        role="dialog"
                        aria-label="Products Menu"
                        aria-modal="false"
                      >
                        <div className="p-8 grid grid-cols-4 gap-6">
                        {productCategories.map(cat => (
                          <div key={cat.key} className="group flex flex-col text-left">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-vae-turquoise transition-colors">{cat.title}</h3>
                                <p className="text-[10px] uppercase tracking-wide text-vae-turquoise/70 mt-1">{cat.tagline}</p>
                              </div>
                              {cat.badge && (
                                <span className="px-2 py-0.5 text-[9px] font-semibold rounded-full bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/30">{cat.badge}</span>
                              )}
                            </div>
                            <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-4 group-hover:text-white/90 transition-colors motion-safe:transition-opacity motion-safe:duration-300">{cat.description}</p>
                            <ul className="space-y-1.5 mb-4 text-[11px]">
                              {cat.points.slice(0,3).map(p => (
                                <li key={p} className="flex items-start gap-1.5 text-text-muted group-hover:text-white/80 transition-colors">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                            <Link 
                              to={
                                cat.key === 'solutions' ? '/products/solutions'
                                : cat.key === 'tools' ? '/products/tools'
                                : cat.key === 'core' ? '/products/vae-core'
                                : cat.key === 'built' ? '/products/showcases'
                                : '/products'
                              }
                              className="mt-auto inline-flex items-center text-[11px] font-medium text-vae-turquoise hover:text-white transition-colors group/link"
                              onClick={() => setProductsOpen(false)}
                            >
                              {cat.cta}
                              <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-300 group-hover/link:translate-x-1">arrow_forward</span>
                            </Link>
                          </div>
                        ))}
                        </div>
                        <div className="px-8 pb-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-text-muted">
                          <span className="uppercase tracking-wider">VAE Product Suite</span>
                          <Link to="/products" onClick={() => setProductsOpen(false)} className="text-vae-turquoise hover:text-white font-medium inline-flex items-center">Alle Produkte<span className="material-symbols-outlined text-xs ml-1">arrow_forward</span></Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.mega === 'services' && servicesOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-[var(--z-dropdown)]"
                      onMouseEnter={openServices}
                      onMouseLeave={closeServices}
                    >
                      <div 
                        ref={servicesMegaRef}
                        id="services-mega"
                        className="mega-panel w-[760px] rounded-2xl border border-white/10 backdrop-blur-xl bg-[linear-gradient(135deg,rgba(15,15,18,0.92),rgba(10,30,25,0.90))] shadow-2xl shadow-black/40 ring-1 ring-white/10 focus:outline-none"
                        role="dialog"
                        aria-label="Services Menu"
                        aria-modal="false"
                      >
                        <div className="p-8 grid grid-cols-3 gap-6">
                        {serviceCategories.map(cat => (
                          <div key={cat.key} className="group flex flex-col text-left">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-vae-turquoise transition-colors">{cat.title}</h3>
                                <p className="text-[10px] uppercase tracking-wide text-vae-turquoise/70 mt-1">{cat.tagline}</p>
                              </div>
                            </div>
                            <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-4 group-hover:text-white/90 transition-colors">{cat.description}</p>
                            <ul className="space-y-1.5 mb-4 text-[11px]">
                              {cat.points.slice(0,4).map(p => (
                                <li key={p} className="flex items-start gap-1.5 text-text-muted group-hover:text-white/80 transition-colors">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                            <Link 
                              to={
                                cat.key === 'trainings' ? '/services/trainings'
                                : cat.key === 'consulting' ? '/services/consulting'
                                : cat.key === 'custom' ? '/services/custom-solutions'
                                : '/services'
                              }
                              className="mt-auto inline-flex items-center text-[11px] font-medium text-vae-turquoise hover:text-white transition-colors group/link"
                              onClick={() => setServicesOpen(false)}
                            >
                              {cat.cta}
                              <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-300 group-hover/link:translate-x-1">arrow_forward</span>
                            </Link>
                          </div>
                        ))}
                        </div>
                        <div className="px-8 pb-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-text-muted">
                          <span className="uppercase tracking-wider">VAE Services</span>
                          <Link to="/services" onClick={() => setServicesOpen(false)} className="text-vae-turquoise hover:text-white font-medium inline-flex items-center">Alle Services<span className="material-symbols-outlined text-xs ml-1">arrow_forward</span></Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              )
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
            id="mobile-menu-trigger"
            className="md:hidden p-2 text-text-light hover:text-vae-turquoise transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" role="navigation" className="md:hidden border-t border-bg-secondary backdrop-glass">
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
