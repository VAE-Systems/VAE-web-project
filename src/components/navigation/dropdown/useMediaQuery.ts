import { useEffect, useState } from 'react'

const isClient = typeof window !== 'undefined'

export function useMediaQuery(query: string, defaultState = false): boolean {
  const getMatches = () => {
    if (!isClient || !window.matchMedia) return defaultState
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(getMatches)

  useEffect(() => {
    if (!isClient || !window.matchMedia) return undefined

    const mediaQueryList = window.matchMedia(query)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQueryList.matches)

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange)
    } else {
      mediaQueryList.addListener(handleChange)
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange)
      } else {
        mediaQueryList.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}
