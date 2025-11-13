import { useEffect, useRef, useState } from 'react'

interface FadeInOptions {
  threshold?: number
  delay?: number
}

export const useFadeIn = ({ threshold = 0.2 }: FadeInOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}
