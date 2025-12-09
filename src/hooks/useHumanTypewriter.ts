import { useEffect, useRef, useState } from 'react'

interface UseHumanTypewriterOptions {
  /**
   * Array of strings to cycle through
   */
  phrases: readonly string[]
  /**
   * Base typing speed in milliseconds (randomized per character)
   * @default 65
   */
  baseSpeed?: number
  /**
   * Speed variation range in milliseconds (+/-)
   * @default 30
   */
  speedVariation?: number
  /**
   * Additional pause after word boundaries (spaces) in milliseconds
   * @default 200
   */
  wordPauseMs?: number
  /**
   * Additional pause after punctuation in milliseconds
   * @default 300
   */
  punctuationPauseMs?: number
  /**
   * Pause between phrases (before erasing) in milliseconds
   * @default 2000
   */
  phrasePauseMs?: number
  /**
   * Erasing speed multiplier (faster than typing)
   * @default 0.5
   */
  eraseSpeedMultiplier?: number
  /**
   * Pause the typewriter (keeps current text)
   */
  paused?: boolean
  /**
   * Respect reduced motion preference
   */
  reducedMotion?: boolean
}

/**
 * Human-like typewriter effect with variable speed and word pauses.
 * Simulates natural typing rhythm: faster within words, pauses between words.
 */
export function useHumanTypewriter({
  phrases,
  baseSpeed = 65,
  speedVariation = 30,
  wordPauseMs = 200,
  punctuationPauseMs = 300,
  phrasePauseMs = 2000,
  eraseSpeedMultiplier = 0.5,
  paused = false,
  reducedMotion = false,
}: UseHumanTypewriterOptions) {
  const [displayText, setDisplayText] = useState('')
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!phrases || phrases.length === 0) return

    // Respect reduced motion: show first phrase statisch und ohne Timer
    if (reducedMotion) {
      setDisplayText(phrases[0] ?? '')
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    // Pause handling
    if (paused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    const currentPhrase = phrases[currentPhraseIndex]

    const tick = () => {
      if (isDeleting) {
        // Erasing: faster, uniform speed
        setDisplayText(prev => prev.slice(0, -1))

        if (displayText.length === 0) {
          // Done erasing, move to next phrase
          setIsDeleting(false)
          setCurrentPhraseIndex(prev => (prev + 1) % phrases.length)
          timeoutRef.current = setTimeout(tick, baseSpeed)
        } else {
          // Continue erasing
          const eraseSpeed = baseSpeed * eraseSpeedMultiplier
          timeoutRef.current = setTimeout(tick, eraseSpeed)
        }
      } else {
        // Typing
        if (displayText.length < currentPhrase.length) {
          const prevChar = displayText.length > 0 ? displayText[displayText.length - 1] : ''

          setDisplayText(currentPhrase.slice(0, displayText.length + 1))

          // Calculate delay for next character with human-like variation
          let delay = baseSpeed + (Math.random() * speedVariation * 2 - speedVariation)

          // Add pause after word boundaries (space)
          if (prevChar === ' ') {
            delay += wordPauseMs
          }

          // Add pause after punctuation
          if (/[.,!?;:]/.test(prevChar)) {
            delay += punctuationPauseMs
          }

          timeoutRef.current = setTimeout(tick, delay)
        } else {
          // Done typing, pause before erasing
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
            tick()
          }, phrasePauseMs)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, baseSpeed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    currentPhraseIndex,
    displayText,
    isDeleting,
    phrases,
    baseSpeed,
    speedVariation,
    wordPauseMs,
    punctuationPauseMs,
    phrasePauseMs,
    eraseSpeedMultiplier,
    paused,
    reducedMotion,
  ])

  return displayText
}
