import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Custom hook for Intersection Observer
 * Useful for lazy loading, animations, and performance optimizations
 */
export const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
  const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = true } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<Element>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting

        if (triggerOnce && hasIntersected) return

        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && triggerOnce) {
          setHasIntersected(true)
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected])

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected,
  }
}

/**
 * Hook for scroll-based animations
 */
export const useScrollAnimation = (
  animationClass: string = 'animate-in',
  options: UseIntersectionObserverOptions = {}
) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
    ...options,
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (isIntersecting) {
      element.classList.add(animationClass)
    }
  }, [isIntersecting, animationClass, ref])

  return ref
}

/**
 * Hook for lazy loading images
 */
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    if (isIntersecting && src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
    }
  }, [isIntersecting, src])

  return {
    ref,
    src: imageSrc,
    isLoaded,
  }
}
