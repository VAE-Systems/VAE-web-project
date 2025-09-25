/**
 * Touch Handler Component
 *
 * Provides touch-optimized interactions for mobile devices
 * Handles touch events, gestures, and accessibility
 */

import React, { useEffect, useRef, useState } from 'react'

interface TouchHandlerProps {
  children: React.ReactNode
  onTap?: () => void
  onLongPress?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  className?: string
  disabled?: boolean
  longPressDelay?: number
  touchThreshold?: number
}

const TouchHandler: React.FC<TouchHandlerProps> = ({
  children,
  onTap,
  onLongPress,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className = '',
  disabled = false,
  longPressDelay = 500,
  touchThreshold = 50,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [isLongPress, setIsLongPress] = useState(false)
  const longPressTimerRef = useRef<NodeJS.Timeout>()

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return

    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setTouchEnd(null)
    setIsLongPress(false)

    // Start long press timer
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        setIsLongPress(true)
        onLongPress()
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(50)
        }
      }, longPressDelay)
    }
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || !touchStart) return

    const touch = e.touches[0]
    setTouchEnd({ x: touch.clientX, y: touch.clientY })

    // Cancel long press if moved too much
    if (longPressTimerRef.current) {
      const distance = Math.sqrt(Math.pow(touch.clientX - touchStart.x, 2) + Math.pow(touch.clientY - touchStart.y, 2))

      if (distance > 10) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = undefined
      }
    }
  }

  // Handle touch end
  const handleTouchEnd = (_e: React.TouchEvent) => {
    if (disabled || !touchStart || !touchEnd) return

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = undefined
    }

    // Don't trigger tap if it was a long press
    if (isLongPress) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > touchThreshold
    const isRightSwipe = distanceX < -touchThreshold
    const isUpSwipe = distanceY > touchThreshold
    const isDownSwipe = distanceY < -touchThreshold

    // Handle swipe gestures
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft()
      } else if (isRightSwipe && onSwipeRight) {
        onSwipeRight()
      }
    } else {
      // Vertical swipe
      if (isUpSwipe && onSwipeUp) {
        onSwipeUp()
      } else if (isDownSwipe && onSwipeDown) {
        onSwipeDown()
      }
    }

    // Handle tap (if no swipe detected)
    if (!isLeftSwipe && !isRightSwipe && !isUpSwipe && !isDownSwipe && onTap) {
      onTap()
    }

    // Reset touch states
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Handle touch cancel
  const handleTouchCancel = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = undefined
    }
    setTouchStart(null)
    setTouchEnd(null)
    setIsLongPress(false)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={elementRef}
      className={`touch-handler touch-manipulation select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-disabled={disabled}
    >
      {children}
    </div>
  )
}

export default TouchHandler
