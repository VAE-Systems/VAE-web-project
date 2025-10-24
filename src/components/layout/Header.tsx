import React, { useState, useEffect, useRef } from 'react'
import CtaLink from '@/components/ui/CtaLink'
import { Link, useLocation } from 'react-router-dom'
import { productCategories } from '../navigation/productCategories'
import {
  ChevronDown,
  ArrowRight,
  CalendarClock,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  Check as CheckIcon,
} from 'lucide-react'
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

  // Debug: Simple local state for mobile menu
  const [debugMobileMenuOpen, setDebugMobileMenuOpen] = useState(false)

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
  const hoverTimers = useRef<{
    products?: ReturnType<typeof setTimeout>
    services?: ReturnType<typeof setTimeout>
    blog?: ReturnType<typeof setTimeout>
  }>({})
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
    if (menu === 'products') {
      setProductsOpen(true)
      setServicesOpen(false)
      setBlogOpen(false)
    }
    if (menu === 'services') {
      setServicesOpen(true)
      setProductsOpen(false)
      setBlogOpen(false)
    }
    if (menu === 'blog') {
      setBlogOpen(true)
      setProductsOpen(false)
      setServicesOpen(false)
    }
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
  // Close mobile menu on location (route) change
  useEffect(() => {
    console.log('Route change effect triggered, closing mobile menu')
    closeMobileMenu()
  }, [location.pathname, location.hash, closeMobileMenu])

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
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${theme === 'light' ? 'bg-white/85' : ''} backdrop-glass border-b ${theme === 'light' ? 'border-black/10' : 'border-vae-turquoise/30'}`
          : `border-b bg-transparent ${theme === 'light' ? 'border-black/10' : 'border-vae-turquoise/10'}`
      }`}
    >
      <div className="container-vae relative">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo/Brand */}
          <Link to="/" className="group flex items-center space-x-4" onClick={() => closeMobileMenu()}>
            <div className="group-hover:glow-turquoise h-12 transition-all duration-300 sm:h-14">
              <img
                src={'/App_Logo_light.svg'}
                alt="VAE Systems Logo"
                className="light-invert h-full w-auto"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="hidden border-l border-vae-turquoise/30 pl-4 md:block">
              <div className="text-xs leading-tight tracking-wider">
                <div className="font-medium text-vae-turquoise">VERSATILE AI</div>
                <div className="font-medium text-vae-turquoise">ENHANCED</div>
                <div className="font-medium text-vae-turquoise">SYSTEMS_</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="relative hidden items-center space-x-8 md:flex">
            {navItems.map(item =>
              item.hasMega ? (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => openMenu(item.mega)}
                  onMouseLeave={() => scheduleClose(item.mega)}
                >
                  <Link
                    id={
                      item.mega === 'products'
                        ? 'products-trigger'
                        : item.mega === 'services'
                          ? 'services-trigger'
                          : 'blog-trigger'
                    }
                    ref={
                      item.mega === 'products'
                        ? (productsTriggerRef as any)
                        : item.mega === 'services'
                          ? (servicesTriggerRef as any)
                          : (blogTriggerRef as any)
                    }
                    to={item.path}
                    className={`nav-link flex items-center gap-1 ${isActivePath(item.path) ? 'active' : ''}`}
                    aria-haspopup="dialog"
                    aria-expanded={
                      item.mega === 'products' ? productsOpen : item.mega === 'services' ? servicesOpen : blogOpen
                    }
                    aria-controls={
                      item.mega === 'products'
                        ? 'products-mega'
                        : item.mega === 'services'
                          ? 'services-mega'
                          : 'blog-mega'
                    }
                    onFocus={() => openMenu(item.mega)}
                    onBlur={() => scheduleClose(item.mega)}
                  >
                    <span className="nav-link-text">{item.label}</span>
                    <ChevronDown
                      className={`text-base transition-transform duration-300 ${item.mega === 'products' ? (productsOpen ? 'rotate-180' : '') : item.mega === 'services' ? (servicesOpen ? 'rotate-180' : '') : blogOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                      size={18}
                    />
                  </Link>
                  {item.mega === 'products' && productsOpen && (
                    <div className="absolute left-1/2 top-full z-[var(--z-dropdown)] mt-4 -translate-x-1/2">
                      <div
                        ref={productsMegaRef}
                        id="products-mega"
                        className="mega-panel border-border-primary surface-glass-panel w-[920px] rounded-2xl border bg-[linear-gradient(135deg,rgba(var(--color-white-rgb),0.98),rgba(248,248,248,0.96))] shadow-2xl shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl focus:outline-none dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(10,15,15,0.92),rgba(10,25,20,0.90))] dark:shadow-black/40 dark:ring-white/10"
                        role="dialog"
                        aria-label="Products Menu"
                        aria-modal="false"
                        onMouseEnter={() => openMenu('products')}
                        onMouseLeave={() => scheduleClose('products')}
                      >
                        <div className="grid grid-cols-4 gap-6 p-8">
                          {productCategories.map(cat => (
                            <Link
                              key={cat.key}
                              to={
                                cat.key === 'solutions'
                                  ? '/products/solutions'
                                  : cat.key === 'tools'
                                    ? '/products/tools'
                                    : cat.key === 'core'
                                      ? '/products/vae-core'
                                      : cat.key === 'built'
                                        ? '/products/showcases'
                                        : '/products'
                              }
                              className="group flex flex-col text-left"
                              onClick={() => setProductsOpen(false)}
                            >
                              <div className="mb-3 flex items-start justify-between">
                                <div>
                                  <h3 className="text-sm font-semibold leading-tight text-text-light transition-colors group-hover:text-vae-turquoise dark:text-white">
                                    {cat.title}
                                  </h3>
                                  <p className="mt-1 text-xs uppercase tracking-wide text-vae-turquoise/70">
                                    {cat.tagline}
                                  </p>
                                </div>
                                {cat.badge && (
                                  <span className="rounded-full border border-vae-turquoise/30 bg-vae-turquoise/15 px-2 py-0.5 text-[9px] font-semibold text-vae-turquoise">
                                    {cat.badge}
                                  </span>
                                )}
                              </div>
                              <p className="mb-3 line-clamp-4 text-xs leading-relaxed text-text-secondary transition-colors group-hover:text-text-light motion-safe:transition-opacity motion-safe:duration-300 dark:group-hover:text-white/90">
                                {cat.description}
                              </p>
                              <ul className="mb-4 space-y-1.5 text-xs">
                                {cat.points.slice(0, 3).map(p => (
                                  <li
                                    key={p}
                                    className="flex items-start gap-1.5 text-text-muted transition-colors group-hover:text-text-light dark:group-hover:text-white/80"
                                  >
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-auto inline-flex items-center text-xs font-medium text-vae-turquoise transition-colors group-hover:text-text-light dark:group-hover:text-white">
                                {cat.cta}
                                <ArrowRight
                                  className="ml-1 text-xs transition-transform duration-300 group-hover:translate-x-1"
                                  size={14}
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-border-primary flex items-center justify-between border-t px-8 pb-6 pt-4 text-xs text-text-muted dark:border-white/10">
                          <span className="uppercase tracking-wider">VAE Product Suite</span>
                          <Link
                            to="/products"
                            onClick={() => setProductsOpen(false)}
                            className="inline-flex items-center font-medium text-vae-turquoise hover:text-text-light dark:hover:text-white"
                          >
                            Alle Produkte
                            <ArrowRight className="ml-1 text-xs" size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.mega === 'services' && servicesOpen && (
                    <div className="absolute left-1/2 top-full z-[var(--z-dropdown)] mt-4 -translate-x-1/2">
                      <div
                        ref={servicesMegaRef}
                        id="services-mega"
                        className="mega-panel border-border-primary surface-glass-panel w-[760px] rounded-2xl border bg-[linear-gradient(135deg,rgba(var(--color-white-rgb),0.98),rgba(248,248,248,0.96))] shadow-2xl shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl focus:outline-none dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,15,18,0.92),rgba(10,30,25,0.90))] dark:shadow-black/40 dark:ring-white/10"
                        role="dialog"
                        aria-label="Services Menu"
                        aria-modal="false"
                        onMouseEnter={() => openMenu('services')}
                        onMouseLeave={() => scheduleClose('services')}
                      >
                        <div className="grid grid-cols-3 gap-6 p-8">
                          {serviceCategories.map(cat => (
                            <Link
                              key={cat.key}
                              to={
                                cat.key === 'trainings'
                                  ? '/services/trainings'
                                  : cat.key === 'consulting'
                                    ? '/services/consulting'
                                    : cat.key === 'custom'
                                      ? '/services/custom-solutions'
                                      : '/services'
                              }
                              className="group flex flex-col text-left"
                              onClick={() => setServicesOpen(false)}
                            >
                              <div className="mb-3 flex items-start justify-between">
                                <div>
                                  <h3 className="text-sm font-semibold leading-tight text-text-light transition-colors group-hover:text-vae-turquoise dark:text-white">
                                    {cat.title}
                                  </h3>
                                  <p className="mt-1 text-xs uppercase tracking-wide text-vae-turquoise/70">
                                    {cat.tagline}
                                  </p>
                                </div>
                              </div>
                              <p className="mb-3 line-clamp-4 text-xs leading-relaxed text-text-secondary transition-colors group-hover:text-text-light dark:group-hover:text-white/90">
                                {cat.description}
                              </p>
                              <ul className="mb-4 space-y-1.5 text-xs">
                                {cat.points.slice(0, 3).map(p => (
                                  <li
                                    key={p}
                                    className="flex items-start gap-1.5 text-text-muted transition-colors group-hover:text-text-light dark:group-hover:text-white/80"
                                  >
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-auto inline-flex items-center text-xs font-medium text-vae-turquoise transition-colors group-hover:text-text-light dark:group-hover:text-white">
                                {cat.cta}
                                <ArrowRight
                                  className="ml-1 text-xs transition-transform duration-300 group-hover:translate-x-1"
                                  size={14}
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-border-primary flex items-center justify-between border-t px-8 pb-6 pt-4 text-xs text-text-muted dark:border-white/10">
                          <span className="uppercase tracking-wider">VAE Product Suite</span>
                          <Link
                            to="/products"
                            onClick={() => setProductsOpen(false)}
                            className="inline-flex items-center font-medium text-vae-turquoise hover:text-text-light dark:hover:text-white"
                          >
                            Alle Produkte
                            <ArrowRight className="ml-1 text-xs" size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.mega === 'blog' && blogOpen && (
                    <div className="absolute left-1/2 top-full z-[var(--z-dropdown)] mt-4 -translate-x-1/2">
                      <div
                        ref={blogMegaRef}
                        id="blog-mega"
                        className="mega-panel border-border-primary surface-glass-panel w-[920px] rounded-2xl border bg-[linear-gradient(135deg,rgba(var(--color-white-rgb),0.98),rgba(248,248,248,0.96))] shadow-2xl shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl focus:outline-none dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(10,15,15,0.92),rgba(10,25,20,0.90))] dark:shadow-black/40 dark:ring-white/10"
                        role="dialog"
                        aria-label="Blog Menu"
                        aria-modal="false"
                        onMouseEnter={() => openMenu('blog')}
                        onMouseLeave={() => scheduleClose('blog')}
                      >
                        <div className="grid grid-cols-4 gap-6 p-8">
                          {blogCategories.map(cat => (
                            <Link
                              key={cat.key}
                              to={
                                cat.key === 'blog'
                                  ? '/blog'
                                  : cat.key === 'aktuelles'
                                    ? '/blog/aktuelles'
                                    : cat.key === 'media'
                                      ? '/blog/media'
                                      : cat.key === 'kurse'
                                        ? '/blog/kurse'
                                        : '/blog'
                              }
                              className="group flex flex-col text-left"
                              onClick={() => setBlogOpen(false)}
                            >
                              <div className="mb-3 flex items-start justify-between">
                                <div>
                                  <h3 className="text-sm font-semibold leading-tight text-text-light transition-colors group-hover:text-vae-turquoise dark:text-white">
                                    {cat.title}
                                  </h3>
                                  <p className="mt-1 text-xs uppercase tracking-wide text-vae-turquoise/70">
                                    {cat.tagline}
                                  </p>
                                </div>
                                {cat.badge && (
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold ${
                                      cat.badge === 'Live'
                                        ? 'border-vae-turquoise/30 bg-vae-turquoise/15 text-vae-turquoise'
                                        : 'border-orange-500/30 bg-orange-500/15 text-orange-400'
                                    }`}
                                  >
                                    {cat.badge}
                                  </span>
                                )}
                                {cat.comingSoon && (
                                  <span className="rounded-full border border-gray-500/30 bg-gray-500/15 px-2 py-0.5 text-[9px] font-semibold text-gray-400">
                                    Soon
                                  </span>
                                )}
                              </div>
                              <p className="mb-3 line-clamp-4 text-xs leading-relaxed text-text-secondary transition-colors group-hover:text-text-light motion-safe:transition-opacity motion-safe:duration-300 dark:group-hover:text-white/90">
                                {cat.description}
                              </p>
                              <ul className="mb-4 space-y-1.5 text-xs">
                                {cat.points.slice(0, 3).map(p => (
                                  <li
                                    key={p}
                                    className="flex items-start gap-1.5 text-text-muted transition-colors group-hover:text-text-light dark:group-hover:text-white/80"
                                  >
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-vae-turquoise/70 group-hover:bg-vae-turquoise" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-auto inline-flex items-center text-xs font-medium text-vae-turquoise transition-colors group-hover:text-text-light dark:group-hover:text-white">
                                {cat.cta}
                                <ArrowRight
                                  className="ml-1 text-xs transition-transform duration-300 group-hover:translate-x-1"
                                  size={14}
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-border-primary flex items-center justify-between border-t px-8 pb-6 pt-4 text-xs text-text-muted dark:border-white/10">
                          <span className="uppercase tracking-wider">VAE Blog</span>
                          <Link
                            to="/blog"
                            onClick={() => setBlogOpen(false)}
                            className="inline-flex items-center font-medium text-vae-turquoise hover:text-text-light dark:hover:text-white"
                          >
                            Alle Beiträge
                            <ArrowRight className="ml-1 text-xs" size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.path} to={item.path} className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}>
                  <span className="nav-link-text">{item.label}</span>
                </Link>
              )
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* CTA Button */}
            <CtaLink
              ctaId="contact.schedule_call"
              ref={ctaRef as unknown as React.Ref<HTMLAnchorElement>}
              className={`${theme === 'light' ? 'box-decoration-clone' : 'btn-primary'} inline-flex items-center space-x-3 !text-sm font-medium md:!px-6 md:!py-2`}
              data-green-signal="true"
              aria-label="Direkt Termin buchen (extern)"
            >
              <CalendarClock className="mr-2 h-4 w-4" />
              30-Min Strategie-Gespräch
            </CtaLink>

            {/* Theme Toggle Button */}
            <button
              className="rounded-lg p-2 text-text-light transition-colors duration-300 hover:bg-bg-secondary hover:text-vae-turquoise"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Toggle Button - Mobile */}
            <button
              className="touch-manipulation rounded-lg p-2 text-text-light transition-colors duration-300 hover:bg-bg-secondary hover:text-vae-turquoise active:bg-bg-secondary"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-trigger"
              className="group relative z-50 touch-manipulation rounded-lg p-3 text-text-light transition-all duration-300 hover:bg-bg-secondary hover:text-vae-turquoise active:bg-bg-secondary"
              onClick={() => {
                console.log('Mobile menu button clicked, current state:', isMobileMenuOpen)
                console.log('Debug state:', debugMobileMenuOpen)
                setDebugMobileMenuOpen(!debugMobileMenuOpen)
                toggleMobileMenu()
              }}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen || debugMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen || debugMobileMenuOpen ? (
                <X className="h-6 w-6 rotate-180 transition-transform duration-300" />
              ) : (
                <MenuIcon className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {(isMobileMenuOpen || debugMobileMenuOpen) && (
          <>
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 top-16 z-30 bg-black/50 backdrop-blur-sm dark:bg-black/70 md:hidden"
              onClick={() => {
                closeMobileMenu()
                setDebugMobileMenuOpen(false)
              }}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <div
              ref={mobileMenuRef}
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation menu"
              className="fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-hidden md:hidden"
            >
              {/* Slide-in panel */}
              <div
                className={`border-border-primary h-full transform border-t bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-vae-turquoise/30 dark:bg-bg-darker dark:shadow-black/40 ${
                  isMobileMenuOpen || debugMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <nav className="flex h-full flex-col overflow-y-auto overscroll-contain px-4 py-6">
                  {/* Navigation Links */}
                  <div className="mb-8 space-y-2">
                    {navItems.map(item => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`group flex min-h-[52px] touch-manipulation items-center rounded-xl px-6 py-4 text-base font-medium transition-all duration-300 ${
                          isActivePath(item.path)
                            ? 'bg-vae-turquoise text-white shadow-lg shadow-vae-turquoise/20'
                            : 'text-text-light hover:bg-bg-secondary hover:text-vae-turquoise active:bg-bg-secondary/80 dark:text-text-light dark:hover:bg-white/5 dark:active:bg-white/10'
                        }`}
                        onClick={() => {
                          closeMobileMenu()
                          setDebugMobileMenuOpen(false)
                        }}
                      >
                        <span className="flex-1">{item.label}</span>
                        {isActivePath(item.path) && <CheckIcon className="h-4 w-4 opacity-80" />}
                      </Link>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="via-border-primary mb-8 h-px bg-gradient-to-r from-transparent to-transparent dark:via-white/20" />

                  {/* CTA Section */}
                  <div className="mt-auto space-y-4">
                    <CtaLink
                      ctaId="contact.schedule_call"
                      className="flex min-h-[52px] w-full touch-manipulation items-center justify-center rounded-xl bg-vae-turquoise px-6 py-4 text-base font-semibold text-white shadow-lg shadow-vae-turquoise/30 transition-all duration-300 hover:bg-vae-turquoise-dark hover:shadow-vae-turquoise/40 active:bg-vae-turquoise-dark"
                      onClick={() => {
                        closeMobileMenu()
                        setDebugMobileMenuOpen(false)
                      }}
                      aria-label="Direkt Termin buchen (extern)"
                    >
                      <CalendarClock className="mr-3 h-5 w-5" />
                      30-Min Strategie-Gespräch
                    </CtaLink>

                    {/* Company Info */}
                    <div className="pt-4 text-center">
                      <p className="mb-2 text-xs text-text-secondary">VAE Systems</p>
                      <p className="text-xs text-text-muted">Versatile AI Enhanced Systems</p>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
