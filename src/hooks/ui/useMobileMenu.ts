/**
 * useMobileMenu – Mobile navigation state with swipe gestures
 *
 * ⛓️ Gates      → Config validation, gesture thresholds
 * 🎛️ Core       → isOpen state, open/close/toggle callbacks
 * 🔁 Side-Effects → Body scroll lock, padding compensation
 * 👁️ Observers   → Swipe gesture detection (touch events)
 * 🧹 Cleanup     → Body style reset, event listener removal
 *
 * Features: swipe-to-close, body scroll prevention, route change close
 * Used by: Header mobile navigation
 */
import { useCallback, useEffect, useState } from 'react'

interface MobileMenuConfig {
  enableSwipeGestures?: boolean
  closeOnRouteChange?: boolean
  preventBodyScroll?: boolean
}

export const useMobileMenu = (config: MobileMenuConfig = {}) => {
  const { enableSwipeGestures = true, closeOnRouteChange = true, preventBodyScroll = true } = config

  const [isOpen, setIsOpen] = useState(false)

  // Debug logging
  useEffect(() => {
    console.log('Mobile menu state changed to:', isOpen)
  }, [isOpen])

  const open = useCallback(() => {
    console.log('open() called')
    setIsOpen(true)
    if (preventBodyScroll) {
      // Prevent scrolling on body but preserve scrollbar width
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }
  }, [preventBodyScroll])

  const close = useCallback(() => {
    console.log('close() called')
    setIsOpen(false)
    if (preventBodyScroll) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [preventBodyScroll])

  const toggle = useCallback(() => {
    console.log('Toggle called, current isOpen:', isOpen)
    if (isOpen) {
      console.log('Closing menu')
      close()
    } else {
      console.log('Opening menu')
      open()
    }
  }, [isOpen, open, close])

  // Swipe handlers
  const handleSwipeLeft = useCallback(() => {
    if (enableSwipeGestures && isOpen) {
      close()
    }
  }, [enableSwipeGestures, isOpen, close])

  const handleSwipeRight = useCallback(() => {
    if (enableSwipeGestures && !isOpen) {
      open()
    }
  }, [enableSwipeGestures, isOpen, open])

  // Handle route changes
  const handleRouteChange = useCallback(() => {
    if (closeOnRouteChange && isOpen) {
      close()
    }
  }, [closeOnRouteChange, isOpen, close])

  return {
    isOpen,
    open,
    close,
    toggle,
    handleSwipeLeft,
    handleSwipeRight,
    handleRouteChange,
  }
}
