/**
 * Smart focus management - only show focus rings when using keyboard navigation
 * Auto-hide focus rings after inactivity
 */
export class FocusManager {
  private isUsingKeyboard = false
  private hideTimeout: NodeJS.Timeout | null = null
  private activeElement: Element | null = null

  constructor() {
    this.init()
  }

  private init() {
    // Detect keyboard usage
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('mousedown', this.handleMouseDown.bind(this))
    document.addEventListener('touchstart', this.handleTouchStart.bind(this))
    
    // Handle focus events
    document.addEventListener('focusin', this.handleFocusIn.bind(this))
    document.addEventListener('focusout', this.handleFocusOut.bind(this))
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Tab key indicates keyboard navigation
    if (e.key === 'Tab') {
      this.isUsingKeyboard = true
      document.body.classList.add('using-keyboard')
    }
  }

  private handleMouseDown() {
    this.isUsingKeyboard = false
    document.body.classList.remove('using-keyboard')
  }

  private handleTouchStart() {
    this.isUsingKeyboard = false
    document.body.classList.remove('using-keyboard')
  }

  private handleFocusIn(e: FocusEvent) {
    const target = e.target as Element
    this.activeElement = target

    if (this.isUsingKeyboard) {
      target.classList.add('focus-visible')
      this.startAutoHideTimer()
    }
  }

  private handleFocusOut(e: FocusEvent) {
    const target = e.target as Element
    target.classList.remove('focus-visible')
    this.clearAutoHideTimer()
  }

  private startAutoHideTimer() {
    this.clearAutoHideTimer()
    this.hideTimeout = setTimeout(() => {
      if (this.activeElement) {
        this.activeElement.classList.remove('focus-visible')
      }
    }, 3000) // Hide after 3 seconds
  }

  private clearAutoHideTimer() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
      this.hideTimeout = null
    }
  }
}

// Initialize focus manager
export const initializeFocusManager = () => {
  if (typeof window !== 'undefined') {
    new FocusManager()
  }
}
