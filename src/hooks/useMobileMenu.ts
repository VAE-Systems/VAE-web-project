/**
 * useMobileMenu Hook
 *
 * Manages mobile menu state with swipe gesture support
 */

import { useState, useCallback } from 'react'

interface MobileMenuConfig {
  enableSwipeGestures?: boolean
  closeOnRouteChange?: boolean
  preventBodyScroll?: boolean
}

export const useMobileMenu = (config: MobileMenuConfig = {}) => {
  const {
    enableSwipeGestures = true,
    closeOnRouteChange = true,
    preventBodyScroll = true
  } = config

  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    if (preventBodyScroll) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    }
  }, [preventBodyScroll])

  const close = useCallback(() => {
    setIsOpen(false)
    if (preventBodyScroll) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [preventBodyScroll])

  const toggle = useCallback(() => {
    if (isOpen) {
      close()
    } else {
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
    handleRouteChange
  }
}
