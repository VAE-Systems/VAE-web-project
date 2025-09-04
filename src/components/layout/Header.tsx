import React, { useState, useEffect, useRef } from 'react'
import CtaLink from '@/components/ui/CtaLink'
import { Link, useLocation } from 'react-router-dom'
import { productCategories } from '../navigation/productCategories'
import { serviceCategories } from '../navigation/serviceCategories'
import { blogCategories } from '../navigation/blogCategories'
import { useAttentionSignal, useFocusTrap } from '@/hooks'
import { useTheme } from '@/contexts/ThemeContext'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'
import { useMobileMenu } from '@/hooks/useMobileMenu'

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
  const location = useLocation()
  const [productsOpen, setProductsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const productsTriggerRef = useRef<HTMLElement>(null)
  const servicesTriggerRef = useRef<HTMLElement>(null)
  const blogTriggerRef = useRef<HTMLElement>(null)
  const productsMegaRef = useRef<HTMLDivElement>(null)
  const servicesMegaRef = useRef<HTMLDivElement>(null)
  const blogMegaRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()
  const ctaRef = React.useRef<HTMLAnchorElement>(null)

  // Mobile menu with swipe gestures
  const {
    isOpen: isMobileMenuOpen,
    close: closeMobileMenu,
    toggle: toggleMobileMenu,
    handleSwipeLeft,
    handleSwipeRight,
    handleRouteChange
  } = useMobileMenu()

  // Swipe gesture handling for mobile menu
  const mobileMenuRef = useSwipeGesture(
    handleSwipeLeft, // Swipe left to close
    handleSwipeRight, // Swipe right to open
    undefined, // No up swipe
    undefined, // No down swipe
    { threshold: 50, restraint: 100, allowedTime: 300 }
  ) as React.RefObject<HTMLDivElement>
  
  // Hover-intent helpers: add a small close delay to avoid flicker
  const hoverTimers = useRef<{ products?: ReturnType<typeof setTimeout>; services?: ReturnType<typeof setTimeout>; blog?: ReturnType<typeof setTimeout> }>({})
  const openMenu = (menu: 'products' | 'services' | 'blog') => {
    if (menu === 'products' && hoverTimers.current.products) {
      clearTimeout(hoverTimers.current.products)
      hoverTimers.current.products = undefined
    }
    if (menu === 'services' && hoverTimers.current.services) {
      clearTimeout(hoverTimers.current.services)
      hoverTimers.current.services = undefined
    }
    if (menu === 'blog' && hoverTimers.current.blog) {
      clearTimeout(hoverTimers.current.blog)
      hoverTimers.current.blog = undefined
    }
    if (menu === 'products') { setProductsOpen(true); setServicesOpen(false); setBlogOpen(false) }
    if (menu === 'services') { setServicesOpen(true); setProductsOpen(false); setBlogOpen(false) }
    if (menu === 'blog') { setBlogOpen(true); setProductsOpen(false); setServicesOpen(false) }
  }
  const scheduleClose = (menu: 'products' | 'services' | 'blog', delay = 180) => {
    if (menu === 'products') {
      if (hoverTimers.current.products) clearTimeout(hoverTimers.current.products)
      hoverTimers.current.products = setTimeout(() => setProductsOpen(false), delay)
    } else if (menu === 'services') {
      if (hoverTimers.current.services) clearTimeout(hoverTimers.current.services)
      hoverTimers.current.services = setTimeout(() => setServicesOpen(false), delay)
    } else if (menu === 'blog') {
      if (hoverTimers.current.blog) clearTimeout(hoverTimers.current.blog)
      hoverTimers.current.blog = setTimeout(() => setBlogOpen(false), delay)
    }
  }
  useFocusTrap(
    productsOpen,
    productsMegaRef,
    () => {
      setProductsOpen(false)
      productsTriggerRef.current?.focus()
    },
    { initialFocus: 'first' }
  )
  useFocusTrap(
    servicesOpen,
    servicesMegaRef,
    () => {
      setServicesOpen(false)
      servicesTriggerRef.current?.focus()
    },
    { initialFocus: 'first' }
  )
  useFocusTrap(
    blogOpen,
    blogMegaRef,
    () => {
      setBlogOpen(false)
      blogTriggerRef.current?.focus()
    },
    { initialFocus: 'first' }
  )

  // Attention signal for CTA
  useAttentionSignal(ctaRef, { intervalMs: 60_000, initialDelayMs: 7_000, jitterMs: 10_000, maxRuns: 6, nudgeAfter: 3 })

  // Close on outside click
  useEffect(() => {
    if (!productsOpen) return
    const handleClick = (e: MouseEvent) => {
      if (
        productsMegaRef.current &&
        !productsMegaRef.current.contains(e.target as Node) &&
        !productsTriggerRef.current?.contains(e.target as Node)
      ) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [productsOpen])

  useEffect(() => {
    if (!servicesOpen) return
    const handleClick = (e: MouseEvent) => {
      if (
        servicesMegaRef.current &&
        !servicesMegaRef.current.contains(e.target as Node) &&
        !servicesTriggerRef.current?.contains(e.target as Node)
      ) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [servicesOpen])

  useEffect(() => {
    if (!blogOpen) return
    const handleClick = (e: MouseEvent) => {
      if (
        blogMegaRef.current &&
        !blogMegaRef.current.contains(e.target as Node) &&
        !blogTriggerRef.current?.contains(e.target as Node)
      ) {
        setBlogOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [blogOpen])

  // Handle scroll effect
  // Close on location (route) change
  useEffect(() => {
    setProductsOpen(false)
    setServicesOpen(false)
    setBlogOpen(false)
    handleRouteChange()
  }, [location.pathname, location.hash, handleRouteChange])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
  if (productsOpen) setProductsOpen(false)
  if (servicesOpen) setServicesOpen(false)
  if (blogOpen) setBlogOpen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services', hasMega: true, mega: 'services' as const },
    { path: '/products', label: 'Products', hasMega: true, mega: 'products' as const },
    { path: '/blog', label: 'Blog', hasMega: true, mega: 'blog' as const },
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
          ? `${theme === 'light' ? 'bg-white/85' : ''} backdrop-glass border-b ${theme === 'light' ? 'border-black/10' : 'border-vae-turquoise/30'}`
          : `bg-transparent border-b ${theme === 'light' ? 'border-black/10' : 'border-vae-turquoise/10'}`
      }`}
    >
      <div className="container-vae">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-4 group"
            onClick={() => closeMobileMenu()}
          >
            <div className="h-10 group-hover:glow-turquoise transition-all duration-300">
              <img 
                src={'/LOGO_01_white.svg'} 
                alt="VAE Systems Logo" 
                className="h-full w-auto light-invert"
                loading="eager"
                decoding="async"
                fetchPriority="high"
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
                  onMouseEnter={() => openMenu(item.mega)}
                  onMouseLeave={() => scheduleClose(item.mega)}
                >
                  <Link
                    id={item.mega === 'products' ? 'products-trigger' : item.mega === 'services' ? 'services-trigger' : 'blog-trigger'}
                    ref={item.mega === 'products' ? (productsTriggerRef as any) : item.mega === 'services' ? (servicesTriggerRef as any) : (blogTriggerRef as any)}
                    to={item.path}
                    className={`nav-link flex items-center gap-1 ${isActivePath(item.path) ? 'active' : ''}`}
                    aria-haspopup="dialog"
                    aria-expanded={item.mega === 'products' ? productsOpen : item.mega === 'services' ? servicesOpen : blogOpen}
                    aria-controls={item.mega === 'products' ? 'products-mega' : item.mega === 'services' ? 'services-mega' : 'blog-mega'}
                    onFocus={() => openMenu(item.mega)}
                    onBlur={() => scheduleClose(item.mega)}
                  >
                    <span className="nav-link-text">{item.label}</span>
                    <span
                      className={`material-symbols-outlined text-base transition-transform duration-300 ${item.mega === 'products' ? (productsOpen ? 'rotate-180' : '') : item.mega === 'services' ? (servicesOpen ? 'rotate-180' : '') : (blogOpen ? 'rotate-180' : '')}`}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </Link>
                  {item.mega === 'products' && productsOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-[var(--z-dropdown)]">
                      <div
                        ref={productsMegaRef}
                        id="products-mega"
                        className="mega-panel w-[920px] rounded-2xl border border-border-primary dark:border-white/10 backdrop-blur-xl bg-[linear-gradient(135deg,rgba(var(--color-white-rgb),0.98),rgba(248,248,248,0.96))] dark:bg-[linear-gradient(135deg,rgba(10,15,15,0.92),rgba(10,25,20,0.90))] shadow-2xl shadow-black/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 focus:outline-none surface-glass-panel"
                        role="dialog"
                        aria-label="Products Menu"
                        aria-modal="false"
                        onMouseEnter={() => openMenu('products')}
                        onMouseLeave={() => scheduleClose('products')}
                      >
                        <div className="p-8 grid grid-cols-4 gap-6">
                        {productCategories.map(cat => (
                          <Link
                            key={cat.key}
                            to={
                              cat.key === 'solutions' ? '/products/solutions'
                              : cat.key === 'tools' ? '/products/tools'
                              : cat.key === 'core' ? '/products/vae-core'
                              : cat.key === 'built' ? '/products/showcases'
                              : '/products'
                            }
                            className="group flex flex-col text-left"
                            onClick={() => setProductsOpen(false)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-sm font-semibold text-text-light dark:text-white leading-tight group-hover:text-vae-turquoise transition-colors">{cat.title}</h3>
                                <p className="text-[10px] uppercase tracking-wide text-vae-turquoise/70 mt-1">{cat.tagline}</p>
                              </div>
                              {cat.badge && (
                                <span className="px-2 py-0.5 text-[9px] font-semibold rounded-full bg-vae-turquoise/15 text-vae-turquoise border border-vae-turquoise/30">{cat.badge}</span>
                              )}
                            </div>
                            <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-4 group-hover:text-text-light dark:group-hover:text-white/90 transition-colors motion-safe:transition-opacity motion-safe:duration-300">{cat.description}</p>
                            <ul className="space-y-1.5 mb-4 text-[11px]">
                              {cat.points.slice(0,3).map(p => (
                                <li key={p} className="flex items-start gap-1.5 text-text-muted group-hover:text-text-light dark:group-hover:text-white/80 transition-colors">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-auto inline-flex items-center text-[11px] font-medium text-vae-turquoise group-hover:text-text-light dark:group-hover:text-white transition-colors">
                              {cat.cta}
                              <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </div>
                          </Link>
                        ))}
                        </div>
                        <div className="px-8 pb-6 pt-4 border-t border-border-primary dark:border-white/10 flex items-center justify-between text-[11px] text-text-muted">
                          <span className="uppercase tracking-wider">VAE Product Suite</span>
                          <Link to="/products" onClick={() => setProductsOpen(false)} className="text-vae-turquoise hover:text-text-light dark:hover:text-white font-medium inline-flex items-center">Alle Produkte<span className="material-symbols-outlined text-xs ml-1">arrow_forward</span></Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.mega === 'services' && servicesOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-[var(--z-dropdown)]">
                      <div
                        ref={servicesMegaRef}
                        id="services-mega"
                        className="mega-panel w-[760px] rounded-2xl border border-border-primary dark:border-white/10 backdrop-blur-xl bg-[linear-gradient(135deg,rgba(var(--color-white-rgb),0.98),rgba(248,248,248,0.96))] dark:bg-[linear-gradient(135deg,rgba(15,15,18,0.92),rgba(10,30,25,0.90))] shadow-2xl shadow-black/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 focus:outline-none surface-glass-panel"
                        role="dialog"
                        aria-label="Services Menu"
                        aria-modal="false"
                        onMouseEnter={() => openMenu('services')}
                        onMouseLeave={() => scheduleClose('services')}
                      >
                        <div className="p-8 grid grid-cols-3 gap-6">
                        {serviceCategories.map(cat => (
                          <Link
                            key={cat.key}
                            to={
                              cat.key === 'trainings' ? '/services/trainings'
                              : cat.key === 'consulting' ? '/services/consulting'
                              : cat.key === 'custom' ? '/services/custom-solutions'
                              : '/services'
                            }
                            className="group flex flex-col text-left"
                            onClick={() => setServicesOpen(false)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-sm font-semibold text-text-light dark:text-white leading-tight group-hover:text-vae-turquoise transition-colors">{cat.title}</h3>
                                <p className="text-[10px] uppercase tracking-wide text-vae-turquoise/70 mt-1">{cat.tagline}</p>
                              </div>
                            </div>
                            <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-4 group-hover:text-text-light dark:group-hover:text-white/90 transition-colors">{cat.description}</p>
                            <ul className="space-y-1.5 mb-4 text-[11px]">
                              {cat.points.slice(0,4).map(p => (
                                <li key={p} className="flex items-start gap-1.5 text-text-muted group-hover:text-text-light dark:group-hover:text-white/80 transition-colors">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-auto inline-flex items-center text-[11px] font-medium text-vae-turquoise group-hover:text-text-light dark:group-hover:text-white transition-colors">
                              {cat.cta}
                              <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </div>
                          </Link>
                        ))}
                        </div>
                        <div className="px-8 pb-6 pt-4 border-t border-border-primary dark:border-white/10 flex items-center justify-between text-[11px] text-text-muted">
                          <span className="uppercase tracking-wider">VAE Services</span>
                          <Link to="/services" onClick={() => setServicesOpen(false)} className="text-vae-turquoise hover:text-text-light dark:hover:text-white font-medium inline-flex items-center">Alle Services<span className="material-symbols-outlined text-xs ml-1">arrow_forward</span></Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.mega === 'blog' && blogOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-[var(--z-dropdown)]">
                      <div
                        ref={blogMegaRef}
                        id="blog-mega"
                        className="mega-panel w-[920px] rounded-2xl border border-border-primary dark:border-white/10 backdrop-blur-xl bg-[linear-gradient(135deg,rgba(var(--color-white-rgb),0.98),rgba(248,248,248,0.96))] dark:bg-[linear-gradient(135deg,rgba(10,15,15,0.92),rgba(10,25,20,0.90))] shadow-2xl shadow-black/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 focus:outline-none surface-glass-panel"
                        role="dialog"
                        aria-label="Blog Menu"
                        aria-modal="false"
                        onMouseEnter={() => openMenu('blog')}
                        onMouseLeave={() => scheduleClose('blog')}
                      >
                        <div className="p-8 grid grid-cols-4 gap-6">
                        {blogCategories.map(cat => (
                          <Link
                            key={cat.key}
                            to={
                              cat.key === 'blog' ? '/blog'
                              : cat.key === 'aktuelles' ? '/blog/aktuelles'
                              : cat.key === 'media' ? '/blog/media'
                              : cat.key === 'kurse' ? '/blog/kurse'
                              : '/blog'
                            }
                            className="group flex flex-col text-left"
                            onClick={() => setBlogOpen(false)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-sm font-semibold text-text-light dark:text-white leading-tight group-hover:text-vae-turquoise transition-colors">{cat.title}</h3>
                                <p className="text-[10px] uppercase tracking-wide text-vae-turquoise/70 mt-1">{cat.tagline}</p>
                              </div>
                              {cat.badge && (
                                <span className={`px-2 py-0.5 text-[9px] font-semibold rounded-full border ${
                                  cat.badge === 'Live'
                                    ? 'bg-vae-turquoise/15 text-vae-turquoise border-vae-turquoise/30'
                                    : 'bg-orange-500/15 text-orange-400 border-orange-500/30'
                                }`}>
                                  {cat.badge}
                                </span>
                              )}
                              {cat.comingSoon && (
                                <span className="px-2 py-0.5 text-[9px] font-semibold rounded-full bg-gray-500/15 text-gray-400 border border-gray-500/30">
                                  Soon
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-4 group-hover:text-text-light dark:group-hover:text-white/90 transition-colors motion-safe:transition-opacity motion-safe:duration-300">{cat.description}</p>
                            <ul className="space-y-1.5 mb-4 text-[11px]">
                              {cat.points.slice(0,3).map(p => (
                                <li key={p} className="flex items-start gap-1.5 text-text-muted group-hover:text-text-light dark:group-hover:text-white/80 transition-colors">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-auto inline-flex items-center text-[11px] font-medium text-vae-turquoise group-hover:text-text-light dark:group-hover:text-white transition-colors">
                              {cat.cta}
                              <span className="material-symbols-outlined text-xs ml-1 transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                            </div>
                          </Link>
                        ))}
                        </div>
                        <div className="px-8 pb-6 pt-4 border-t border-border-primary dark:border-white/10 flex items-center justify-between text-[11px] text-text-muted">
                          <span className="uppercase tracking-wider">VAE Blog</span>
                          <Link to="/blog" onClick={() => setBlogOpen(false)} className="text-vae-turquoise hover:text-text-light dark:hover:text-white font-medium inline-flex items-center">Alle Beiträge<span className="material-symbols-outlined text-xs ml-1">arrow_forward</span></Link>
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
                  <span className="nav-link-text">{item.label}</span>
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <CtaLink
            ctaId="contact.schedule_call"
            ref={ctaRef as unknown as React.Ref<HTMLAnchorElement>}
            className={`${theme === 'light' ? 'box-decoration-clone' : 'btn-primary'} hidden md:inline-flex items-center space-x-3 !text-sm md:!py-2 md:!px-6 font-medium`}
            data-green-signal="true"
            aria-label="Direkt Termin buchen (extern)"
          >
            <span className="material-symbols-outlined mr-2">schedule</span>
            Kostenloses Erstgespräch
          </CtaLink>

          {/* Theme Toggle Button */}
          <button
            className="p-2 text-text-light hover:text-vae-turquoise transition-colors duration-300"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-trigger"
            className="md:hidden p-2 text-text-light hover:text-vae-turquoise transition-colors duration-300"
            onClick={() => toggleMobileMenu()}
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
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="navigation"
            className="md:hidden border-t border-bg-secondary backdrop-glass"
          >
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
                  onClick={() => closeMobileMenu()}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="px-4 pt-4 space-y-4">
                {/* Blog Button in Mobile Menu */}
                <Link
                  to="/blog"
                  className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-text-secondary hover:text-vae-turquoise hover:bg-bg-secondary transition-colors duration-300"
                  onClick={() => closeMobileMenu()}
                >
                  <span className="material-symbols-outlined mr-2">
                    article
                  </span>
                  Blog
                </Link>

                {/* Theme Toggle in Mobile Menu */}
                <button
                  className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-text-secondary hover:text-vae-turquoise hover:bg-bg-secondary transition-colors duration-300"
                  onClick={() => {
                    toggleTheme()
                    closeMobileMenu()
                  }}
                >
                  <span className="material-symbols-outlined mr-2">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                  </span>
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                
                <Link
                  to="/contact"
                  className={`${theme === 'light' ? 'btn-outline' : 'btn-primary'} w-full justify-center`}
                  onClick={() => closeMobileMenu()}
                >
                  <span className="material-symbols-outlined mr-2">schedule</span>
                  Erstgespräch buchen
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
