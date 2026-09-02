import { AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DropdownContent } from './DropdownContent'
import { DropdownMenuItem } from './DropdownMenuItem'
import { DropdownMenu as DropdownMenuType, MENU_DATA } from './menuData'
import { useMediaQuery } from './useMediaQuery'

const HOVER_DEBOUNCE_MS = 80
const CLOSE_DELAY_MS = 120

interface DropdownMenuProps {
  menus?: DropdownMenuType[]
  className?: string
  initialOpenMenuId?: string | null
  initialActiveItems?: Partial<Record<string, string>>
  isHeaderScrolled?: boolean
}

const buildInitialActiveState = (menuList: DropdownMenuType[]) =>
  menuList.reduce<Record<string, string>>((acc, menu) => {
    acc[menu.id] = menu.menuItems[0]?.id ?? ''
    return acc
  }, {})

const mergeInitialActiveState = (menuList: DropdownMenuType[], overrides?: Partial<Record<string, string>>) => {
  const base = buildInitialActiveState(menuList)
  if (!overrides) return base
  return Object.entries(overrides).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value) {
      acc[key] = value
    }
    return acc
  }, base)
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menus = MENU_DATA,
  className,
  initialOpenMenuId = null,
  initialActiveItems,
}) => {
  // 🔧 FIX: Breakpoint von 768px auf 1024px geändert, um mit Header's lg: Klassen zu matchen
  // Vorher: isDesktop war true ab 768px, aber CSS zeigte Desktop erst ab 1024px (lg:)
  // Das führte zu inkonsistentem Verhalten auf Tablets (768-1023px)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [openMenuId, setOpenMenuId] = useState<string | null>(initialOpenMenuId)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<string, boolean>>({})
  const [activeContentByMenu, setActiveContentByMenu] = useState<Record<string, string>>(() =>
    mergeInitialActiveState(menus, initialActiveItems)
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const itemRefs = useRef<Record<string, (HTMLAnchorElement | null)[]>>({})
  const panelContentRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const panelRefCallbacks = useRef<Record<string, (node: HTMLDivElement | null) => void>>({})
  const [panelHeights, setPanelHeights] = useState<Record<string, number>>({})
  const [panelRefVersion, setPanelRefVersion] = useState(0)
  const [preventHoverClose, setPreventHoverClose] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  const activeContentCache = useMemo(() => activeContentByMenu, [activeContentByMenu])
  const isTouchDevice = useMemo(() => typeof window !== 'undefined' && 'ontouchstart' in window, [])

  useEffect(() => {
    setActiveContentByMenu(mergeInitialActiveState(menus, initialActiveItems))
  }, [menus, initialActiveItems])

  useEffect(() => {
    setOpenMenuId(initialOpenMenuId ?? null)
  }, [initialOpenMenuId])

  useEffect(() => {
    if (!openMenuId) return undefined

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenMenuId(null)
        setPreventHoverClose(false)
        setIsPinned(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [openMenuId])

  useEffect(() => {
    if (!isDesktop) {
      setOpenMenuId(null)
      setPreventHoverClose(false)
      setIsPinned(false)
    }
  }, [isDesktop])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') {
      return undefined
    }

    if (!openMenuId) {
      return undefined
    }

    const node = panelContentRefs.current[openMenuId]
    if (!node) {
      return undefined
    }

    let frameId: number | null = null

    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (!entry) return
      const nextHeight = entry.contentRect.height

      if (frameId != null) {
        cancelAnimationFrame(frameId)
      }

      frameId = requestAnimationFrame(() => {
        setPanelHeights(prev => {
          if (Math.abs((prev[openMenuId] ?? 0) - nextHeight) < 0.5) {
            return prev
          }
          return { ...prev, [openMenuId]: nextHeight }
        })
      })
    })

    observer.observe(node)

    return () => {
      if (frameId != null) {
        cancelAnimationFrame(frameId)
      }
      observer.disconnect()
    }
  }, [openMenuId, panelRefVersion])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
      setPreventHoverClose(false)
      setIsPinned(false)
    }
  }, [])

  const setMenuActiveItem = useCallback((menuId: string, itemId: string) => {
    setActiveContentByMenu(prev => {
      if (prev[menuId] === itemId) return prev
      return { ...prev, [menuId]: itemId }
    })
  }, [])

  const handleMenuItemHover = (menuId: string, itemId: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setMenuActiveItem(menuId, itemId), HOVER_DEBOUNCE_MS)
  }

  const openMenu = (menuId: string, options?: { pinned?: boolean }) => {
    const pinned = options?.pinned ?? false
    const wasPinnedCurrentMenu = isPinned && openMenuId === menuId
    if (isPinned && !pinned && openMenuId !== null && openMenuId !== menuId) {
      return
    }
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setOpenMenuId(menuId)
    const nextPinned = pinned || wasPinnedCurrentMenu
    setIsPinned(nextPinned)
    setPreventHoverClose(nextPinned)
  }

  const closeMenu = () => {
    if (isPinned || preventHoverClose) return
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenuId(null)
      setIsPinned(false)
      setPreventHoverClose(false)
    }, CLOSE_DELAY_MS)
  }

  const forceCloseMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setOpenMenuId(null)
    setIsPinned(false)
    setPreventHoverClose(false)
  }

  const handleTriggerKeyDown =
    (menuId: string, hasItems: boolean) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!hasItems) return

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (openMenuId === menuId) {
          forceCloseMenu()
        } else {
          openMenu(menuId, { pinned: true })
          itemRefs.current[menuId]?.[0]?.focus()
        }
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        openMenu(menuId, { pinned: true })
        itemRefs.current[menuId]?.[0]?.focus()
      }

      if (event.key === 'Escape') {
        forceCloseMenu()
        triggerRefs.current[menuId]?.blur()
      }
    }

  const handleMenuItemKeyDown =
    (menuId: string, itemIndex: number, totalItems: number) => (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const nextIndex = (itemIndex + 1) % totalItems
        itemRefs.current[menuId]?.[nextIndex]?.focus()
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const prevIndex = (itemIndex - 1 + totalItems) % totalItems
        itemRefs.current[menuId]?.[prevIndex]?.focus()
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        forceCloseMenu()
        triggerRefs.current[menuId]?.focus()
      }
    }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const toggleMobileSection = (menuId: string) => {
    setExpandedMobileMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }))
  }

  const getPanelRefHandler = useCallback((menuId: string) => {
    if (!panelRefCallbacks.current[menuId]) {
      panelRefCallbacks.current[menuId] = (node: HTMLDivElement | null) => {
        if (panelContentRefs.current[menuId] === node) return
        panelContentRefs.current[menuId] = node
        setPanelRefVersion(prev => prev + 1)
      }
    }

    return panelRefCallbacks.current[menuId]
  }, [])

  const renderDesktopMenu = () => (
    <div className="hidden w-full items-center justify-end gap-6 lg:flex" role="menubar" aria-label="Hauptnavigation">
      {menus.map(menu => {
        const activeContentId = activeContentCache[menu.id] || menu.menuItems[0]?.id
        const panelVisible = openMenuId === menu.id
        const panelHeight = panelHeights[menu.id]

        return (
          <div
            key={menu.id}
            className="relative"
            {...(!isTouchDevice && {
              onMouseEnter: () => openMenu(menu.id, { pinned: false }),
              onMouseLeave: closeMenu,
            })}
            onFocusCapture={() => openMenu(menu.id, { pinned: false })}
          >
            <button
              type="button"
              ref={node => {
                triggerRefs.current[menu.id] = node
              }}
              className={`group inline-flex items-center gap-2 px-1 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-bg-darker ${
                panelVisible
                  ? 'text-vae-turquoise'
                  : 'text-gray-700 hover:text-gray-900 dark:text-white/80 dark:hover:text-white'
              }`}
              aria-haspopup="true"
              aria-expanded={panelVisible}
              aria-controls={`${menu.id}-panel`}
              onClick={() => {
                if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
                if (openMenuId === menu.id && isPinned) {
                  forceCloseMenu()
                  return
                }
                openMenu(menu.id, { pinned: true })
              }}
              onKeyDown={handleTriggerKeyDown(menu.id, menu.menuItems.length > 0)}
            >
              {menu.label}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  panelVisible
                    ? 'rotate-180 text-vae-turquoise'
                    : 'text-gray-500 group-hover:text-gray-700 dark:text-white/50 dark:group-hover:text-white/80'
                }`}
              />
            </button>

            <div
              id={`${menu.id}-panel`}
              role="menu"
              aria-hidden={!panelVisible}
              className={`absolute left-1/2 top-full z-[1000] mt-3 w-[calc(100vw-2rem)] -translate-x-1/2 md:w-[min(calc(100vw-2rem),36rem)] min-[900px]:w-[min(calc(100vw-2rem),38rem)] ${
                menu.id === 'leistungen'
                  ? 'lg:left-0 lg:w-[min(calc(100vw-1rem),40rem)] lg:translate-x-0 min-[1150px]:left-1/2 min-[1150px]:-translate-x-1/2'
                  : 'lg:w-[min(calc(100vw-2rem),40rem)]'
              } overflow-hidden rounded-2xl border shadow-lg backdrop-blur-xl transition-[height,opacity,transform] duration-300 ease-out min-[1150px]:w-[min(calc(100vw-2rem),44rem)] min-[1200px]:w-[min(calc(100vw-2rem),48rem)] xl:w-[min(calc(100vw-2rem),56rem)] ${
                panelVisible
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-2 opacity-0'
              } border-line bg-bg-dark/95 shadow-black/5 dark:border-white/10 dark:bg-[hsla(0,0%,6%,0.98)] dark:shadow-black/40`}
              style={{ height: panelHeight ? `${panelHeight}px` : undefined }}
            >
              <div ref={getPanelRefHandler(menu.id)}>
                {/* Subtitle Header - elegant am Anfang des Dropdowns */}
                {menu.subtitle && (
                  <div className="border-b border-line bg-white px-6 py-3 dark:border-white/10 dark:bg-vae-black">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-text-muted dark:text-white/65">
                      {menu.subtitle}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-4 p-4 lg:flex-row">
                  <div className="lg:w-[40%]">
                    <ul className="space-y-2" role="menu" aria-label={`${menu.label} Navigation`}>
                      {menu.menuItems.map((item, index) => (
                        <DropdownMenuItem
                          key={item.id}
                          item={item}
                          isActive={activeContentId === item.id}
                          onHover={itemId => handleMenuItemHover(menu.id, itemId)}
                          onKeyDown={handleMenuItemKeyDown(menu.id, index, menu.menuItems.length)}
                          onClick={forceCloseMenu}
                          itemRef={node => {
                            if (!itemRefs.current[menu.id]) itemRefs.current[menu.id] = []
                            itemRefs.current[menu.id][index] = node
                          }}
                        />
                      ))}
                    </ul>
                  </div>

                  <div className="lg:w-[60%]">
                    <AnimatePresence mode="wait">
                      <DropdownContent key={activeContentId} content={menu.content[activeContentId || '']} />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderMobileMenu = () => (
    <div className="w-full lg:hidden" aria-label="Mobile Navigation">
      <button
        type="button"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        className="flex w-full items-center justify-between rounded-full border border-line bg-white/95 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-text-light shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-black/20 dark:focus-visible:ring-offset-bg-darker"
      >
        <span>Menü</span>
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isMobileMenuOpen && (
        <div className="mt-4 space-y-3 rounded-3xl border border-line bg-white/95 p-4 text-text-light shadow-xl shadow-black/5 dark:border-white/10 dark:bg-bg-darker/90 dark:text-white dark:shadow-black/40">
          {menus.map(menu => {
            const isExpanded = expandedMobileMenus[menu.id]
            const activeContentId = activeContentCache[menu.id] || menu.menuItems[0]?.id

            return (
              <div
                key={menu.id}
                className="overflow-hidden rounded-2xl border border-line bg-white/90 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-black/20"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-text-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-white dark:focus-visible:ring-offset-bg-darker"
                  aria-expanded={isExpanded}
                  aria-controls={`${menu.id}-mobile-panel`}
                  onClick={() => toggleMobileSection(menu.id)}
                >
                  {menu.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-vae-turquoise' : 'text-text-muted dark:text-white/60'
                    }`}
                  />
                </button>

                <div
                  id={`${menu.id}-mobile-panel`}
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="min-h-0 space-y-4 px-4 pb-4 text-text-secondary dark:text-white/80">
                    <ul className="space-y-2">
                      {menu.menuItems.map(item => (
                        <li key={item.id}>
                          <a
                            href={item.href}
                            onFocus={() => setMenuActiveItem(menu.id, item.id)}
                            onMouseEnter={() => setMenuActiveItem(menu.id, item.id)}
                            className="block rounded-xl border border-line bg-white/95 px-4 py-3 text-sm font-medium text-text-light transition-all duration-200 hover:border-vae-turquoise/50 hover:text-vae-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40 dark:hover:text-white dark:focus-visible:ring-offset-bg-darker"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <DropdownContent content={menu.content[activeContentId || '']} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  return (
    <div ref={containerRef} className={`w-full ${className ?? ''}`}>
      {renderDesktopMenu()}
      {renderMobileMenu()}
    </div>
  )
}
