/**
 * useSwipeGesture Hook
 *
 * Detects swipe gestures for mobile menu interactions
 */

import { useEffect, useRef, useState } from 'react'

interface SwipeConfig {
  threshold?: number
  restraint?: number
  allowedTime?: number
}

interface SwipeState {
  startX: number
  startY: number
  startTime: number
  endX: number
  endY: number
  endTime: number
}

export const useSwipeGesture = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  config: SwipeConfig = {}
) => {
  const {
    threshold = 50,
    restraint = 100,
    allowedTime = 300
  } = config

  const [swipeState, setSwipeState] = useState<SwipeState | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    setSwipeState({
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      endX: 0,
      endY: 0,
      endTime: 0
    })
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!swipeState) return

    const touch = e.changedTouches[0]
    const endState = {
      ...swipeState,
      endX: touch.clientX,
      endY: touch.clientY,
      endTime: Date.now()
    }

    const deltaX = endState.startX - endState.endX
    const deltaY = endState.startY - endState.endY
    const elapsedTime = endState.endTime - endState.startTime

    // Check if swipe is within time and distance limits
    if (elapsedTime <= allowedTime) {
      // Horizontal swipe
      if (Math.abs(deltaX) >= threshold && Math.abs(deltaY) <= restraint) {
        if (deltaX > 0) {
          onSwipeLeft?.()
        } else {
          onSwipeRight?.()
        }
      }
      // Vertical swipe
      else if (Math.abs(deltaY) >= threshold && Math.abs(deltaX) <= restraint) {
        if (deltaY > 0) {
          onSwipeUp?.()
        } else {
          onSwipeDown?.()
        }
      }
    }

    setSwipeState(null)
  }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [swipeState, threshold, restraint, allowedTime, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  return elementRef
}
