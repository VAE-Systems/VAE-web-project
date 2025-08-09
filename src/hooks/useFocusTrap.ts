import { useEffect } from 'react'

/**
 * useFocusTrap
 * Traps focus within a container while active (e.g., dropdown, modal, menu)
 */
interface FocusTrapOptions {
  initialFocus?: 'first' | 'container' | 'none'
}

export const useFocusTrap = (
  active: boolean, 
  containerRef: React.RefObject<HTMLElement>, 
  onEscape?: () => void,
  options: FocusTrapOptions = { initialFocus: 'none' }
) => {
  useEffect(() => {
    if (!active || !containerRef.current) return
    const container = containerRef.current
    const selectors = [
      'a[href]','button:not([disabled])','textarea:not([disabled])','input:not([disabled])','select:not([disabled])','[tabindex]:not([tabindex="-1"])'
    ]
    let focusable = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
    if (focusable.length === 0) return
    const first = focusable[0]
    if (options.initialFocus === 'first') {
      first.focus()
    } else if (options.initialFocus === 'container') {
      container.focus()
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.()
      }
      if (e.key !== 'Tab') return
      focusable = Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
      if (focusable.length === 0) return
  const firstEl = focusable[0]
  const lastEl = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [active, containerRef, onEscape, options.initialFocus])
}
