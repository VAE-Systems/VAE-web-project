/**
 * useAttentionSignal
 * 
 * Adds a periodic, viewport-aware sheen signal to a CTA element.
 * Features:
 * - Triggers a 1.3s sheen only when element is visible (>= 50% in viewport)
 * - Initial trigger after configurable delay
 * - Interval with jitter to avoid banner blindness
 * - Pause on hover/focus and on prefers-reduced-motion
 * - Session cap and stop after click
 * - Optional micro-nudge after N missed sheens (desktop only)
 */

import { useEffect, useRef } from 'react'
import { ANIMATION } from '../config'

export interface AttentionSignalOptions {
  intervalMs?: number
  initialDelayMs?: number
  jitterMs?: number
  maxRuns?: number
  nudgeAfter?: number
}

export const useAttentionSignal = (
  elRef: React.RefObject<HTMLElement>,
  {
    intervalMs = ANIMATION.DELAY.SIGNAL_INTERVAL,
    initialDelayMs = ANIMATION.DELAY.INITIAL_SIGNAL,
    jitterMs = 10_000,
    maxRuns = 6,
    nudgeAfter = 3,
  }: AttentionSignalOptions = {}
) => {
  const timers = useRef<{ tick?: ReturnType<typeof setTimeout> }>({})
  const runsRef = useRef(0)
  const missedRef = useRef(0)
  const pausedRef = useRef(false)
  const stoppedRef = useRef(false)
  const visibleRef = useRef(false)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    // Respect reduced motion
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const clearTick = () => {
      if (timers.current.tick) clearTimeout(timers.current.tick)
      timers.current.tick = undefined
    }

    const schedule = (delay: number) => {
      clearTick()
      if (stoppedRef.current) return
      timers.current.tick = setTimeout(() => {
        if (pausedRef.current || !visibleRef.current) {
          missedRef.current += 1
          // Reschedule soon (keep cadence) when paused or hidden
          schedule(intervalMs)
          return
        }
        // Fire sheen
        el.setAttribute('data-signal-state', 'on')
        runsRef.current += 1
        setTimeout(() => el.removeAttribute('data-signal-state'), 1350)

        // Micro nudge after several missed sheens without interaction (desktop only)
        const isDesktop = window.matchMedia('(pointer:fine)').matches
        if (isDesktop && missedRef.current >= nudgeAfter) {
          el.classList.add('signal-nudge')
          setTimeout(() => el.classList.remove('signal-nudge'), 160)
          missedRef.current = 0
        }

        // Stop if we reached the run cap
        if (runsRef.current >= maxRuns) {
          stoppedRef.current = true
          clearTick()
          return
        }

        // Next with jitter
        const jitter = (Math.random() * 2 - 1) * jitterMs
        schedule(Math.max(10_000, intervalMs + jitter))
      }, delay)
    }

    // Viewport observer
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.5
      },
      { threshold: [0, 0.5, 1] }
    )
    io.observe(el)

    // Pause on hover/focus
    const onEnter = () => { pausedRef.current = true }
    const onLeave = () => { pausedRef.current = false }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('focus', onEnter, true)
    el.addEventListener('blur', onLeave, true)

    // Stop after click
    const onClick = () => { stoppedRef.current = true; clearTick(); el.removeAttribute('data-signal-state') }
    el.addEventListener('click', onClick)

    // Kickoff (only if visible soon; otherwise first interval will catch it)
    schedule(initialDelayMs)

    return () => {
      clearTick()
      io.disconnect()
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('focus', onEnter, true)
      el.removeEventListener('blur', onLeave, true)
      el.removeEventListener('click', onClick)
    }
  }, [elRef, intervalMs, initialDelayMs, jitterMs, maxRuns, nudgeAfter])
}

