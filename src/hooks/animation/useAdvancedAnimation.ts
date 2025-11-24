import { useEffect, useRef, useState } from 'react'

interface UseAdvancedAnimationOptions {
  trigger?: 'hover' | 'scroll' | 'click' | 'load'
  delay?: number
  duration?: number
  easing?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  stagger?: number
  repeat?: boolean
}

/**
 * Advanced Animation Hook with multiple trigger types and effects
 */
export const useAdvancedAnimation = (options: UseAdvancedAnimationOptions = {}) => {
  const {
    trigger = 'load',
    delay = 0,
    duration = 600,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    direction = 'up',
    distance = 30,
    stagger = 0,
    repeat = false,
  } = options

  const [isAnimated, setIsAnimated] = useState(false)
  const [isTriggered, setIsTriggered] = useState(trigger === 'load')
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const getInitialTransform = () => {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`
        case 'down':
          return `translateY(-${distance}px)`
        case 'left':
          return `translateX(${distance}px)`
        case 'right':
          return `translateX(-${distance}px)`
        case 'fade':
          return 'scale(0.9)'
        default:
          return `translateY(${distance}px)`
      }
    }

    const getFinalTransform = () => {
      switch (direction) {
        case 'fade':
          return 'scale(1)'
        default:
          return 'translateX(0) translateY(0)'
      }
    }

    // Set initial state
    element.style.opacity = '0'
    element.style.transform = getInitialTransform()
    element.style.transition = `all ${duration}ms ${easing} ${delay}ms`

    const animate = () => {
      element.style.opacity = '1'
      element.style.transform = getFinalTransform()
      setIsAnimated(true)
    }

    const handleTrigger = () => {
      if (!isTriggered) {
        setIsTriggered(true)
        setTimeout(animate, delay)
      }
    }

    // Handle different trigger types
    switch (trigger) {
      case 'load':
        setTimeout(animate, delay)
        break

      case 'hover':
        element.addEventListener('mouseenter', handleTrigger)
        return () => element.removeEventListener('mouseenter', handleTrigger)

      case 'click':
        element.addEventListener('click', handleTrigger)
        return () => element.removeEventListener('click', handleTrigger)

      case 'scroll':
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              handleTrigger()
              if (!repeat) observer.disconnect()
            }
          },
          { threshold: 0.1 }
        )
        observer.observe(element)
        return () => observer.disconnect()
    }

    return () => {
      // Cleanup
      element.style.transition = ''
    }
  }, [trigger, delay, duration, easing, direction, distance, stagger, repeat, isTriggered])

  return {
    ref: elementRef,
    isAnimated,
    isTriggered,
    trigger: () => setIsTriggered(true),
  }
}

/**
 * Hook for staggered animations on multiple elements
 */
export const useStaggeredAnimation = (count: number, options: Omit<UseAdvancedAnimationOptions, 'stagger'> = {}) => {
  const elements = Array.from({ length: count }, () =>
    useAdvancedAnimation({
      ...options,
      delay: options.delay || 0,
    })
  )

  return elements
}

/**
 * Hook for morphing animations
 */
export const useMorphAnimation = (shapes: string[], options: { duration?: number } = {}) => {
  const { duration = 2000 } = options
  const [currentShape, setCurrentShape] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || shapes.length === 0) return

    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length)
    }, duration)

    return () => clearInterval(interval)
  }, [shapes.length, duration])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.style.borderRadius = shapes[currentShape]
  }, [currentShape, shapes])

  return {
    ref: elementRef,
    currentShape,
    setShape: setCurrentShape,
  }
}
