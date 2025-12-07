/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  MAGNETIC BUTTON                                                          ┃
 * ┃  Wrapper der Buttons magnetisch zum Cursor zieht. Micro-Interaction.      ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ TERRITORIUM-KARTE
 * ├── ⛓️ Gate         → Reduced Motion Check, Disabled State
 * ├── 🎛️ Core        → Position-Berechnung (Offset * Intensity)
 * ├── 🎨 Effects     → Glow, Ripple, Scale (optional)
 * └── 🔁 Side-Effect → DOM Transform (kein Re-Render)
 *
 * ⚙️ TUNING: intensity prop (0.02 - 0.12 optimal)
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/classNames'
import { prefersReducedMotion } from '@/utils/motion'
import { type TypographyPreset } from '@design-system/typography'

// ⚙️ Tuning-Knobs
const MIN_INTENSITY = 0
const MAX_INTENSITY = 0.2
const DEFAULT_INTENSITY = 0.075

const clampIntensity = (value: number) => Math.min(Math.max(value, MIN_INTENSITY), MAX_INTENSITY)

interface Ripple {
  id: number
  x: number
  y: number
}

export interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number
  glowEffect?: boolean
  rippleEffect?: boolean
  scaleEffect?: boolean
  textStyle?: TypographyPreset
  enableHardwareAcceleration?: boolean
  disabled?: boolean
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: MagneticButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  (
    {
      className,
      children,
      intensity = DEFAULT_INTENSITY,
      glowEffect = false,
      rippleEffect = false,
      scaleEffect = true,
      textStyle = 'label',
      enableHardwareAcceleration = true,
      disabled = false,
      onClick,
      style,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => buttonRef.current as HTMLDivElement, [])

    const positionRef = useRef({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [ripples, setRipples] = useState<Ripple[]>([])
    const animationFrame = useRef<number>()
    const rippleTimeouts = useRef<Map<number, number>>(new Map())

    // ⛓️ GATE: Reduced Motion
    const reduceMotion = useRef<boolean>(prefersReducedMotion())
    const resolvedIntensity = reduceMotion.current ? 0 : clampIntensity(intensity)

    // 🎛️ CORE: Magnet-Berechnung
    const handlePointerMove = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        // ⛓️ GATE: Disabled oder keine Intensity
        if (disabled || !buttonRef.current || resolvedIntensity === 0) return

        const computePosition = () => {
          if (!buttonRef.current) return
          const rect = buttonRef.current.getBoundingClientRect()
          const offsetX = event.clientX - rect.left - rect.width / 2
          const offsetY = event.clientY - rect.top - rect.height / 2

          positionRef.current = {
            x: offsetX * resolvedIntensity,
            y: offsetY * resolvedIntensity,
          }

          // 🔁 SIDE-EFFECT: Direkte DOM-Manipulation (kein Re-Render)
          const translate = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`
          const scale = scaleEffect && isHovered ? ' scale(1.02)' : ''
          buttonRef.current.style.transform = `${translate}${scale}`
        }

        if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
        animationFrame.current = window.requestAnimationFrame(computePosition)
      },
      [disabled, resolvedIntensity, scaleEffect, isHovered]
    )

    // 🔁 SIDE-EFFECT: Reset bei Leave
    const handlePointerLeave = useCallback(() => {
      setIsHovered(false)
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
      positionRef.current = { x: 0, y: 0 }
      if (buttonRef.current) buttonRef.current.style.transform = 'translate3d(0, 0, 0)'
    }, [])

    const handlePointerEnter = useCallback(() => {
      if (!disabled) setIsHovered(true)
    }, [disabled])

    // 🎨 EFFECT: Ripple bei Click
    const handleClickInternal = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return

        if (rippleEffect && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect()
          const rippleId = window.performance.now()
          const ripple: Ripple = {
            id: rippleId,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          }

          setRipples(prev => [...prev, ripple])

          const timeout = window.setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== rippleId))
            rippleTimeouts.current.delete(rippleId)
          }, 600)

          rippleTimeouts.current.set(rippleId, timeout)
        }

        onClick?.(event)
      },
      [disabled, rippleEffect, onClick]
    )

    // 🔁 SIDE-EFFECT: Hardware Acceleration Hint
    useEffect(() => {
      if (!buttonRef.current || !enableHardwareAcceleration) return
      const node = buttonRef.current
      const prev = node.style.willChange
      node.style.willChange = 'transform'
      return () => {
        node.style.willChange = prev
      }
    }, [enableHardwareAcceleration])

    // 🧹 CLEANUP
    useEffect(
      () => () => {
        if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
        rippleTimeouts.current.forEach(t => window.clearTimeout(t))
        rippleTimeouts.current.clear()
      },
      []
    )

    const containerStyle = useMemo(() => ({ ...style }), [style])

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🎨 RENDER
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    return (
      <div
        ref={buttonRef as React.RefObject<HTMLDivElement>}
        className={cn(
          'relative inline-block transition-transform duration-300 ease-out',
          glowEffect && 'hover:drop-shadow-[0_0_16px_rgba(52,211,153,0.4)]',
          disabled && 'pointer-events-none opacity-60',
          className
        )}
        style={containerStyle}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onMouseEnter={handlePointerEnter}
        onClick={handleClickInternal}
        {...rest}
      >
        <div className="relative z-10">{children}</div>

        {/* 🎨 EFFECT: Ripple Overlay */}
        {rippleEffect && (
          <span className="pointer-events-none absolute inset-0">
            {ripples.map(ripple => (
              <span
                key={ripple.id}
                className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-[ripple_0.6s_ease-out_forwards] rounded-full bg-emerald-400/30 opacity-80"
                style={{ left: ripple.x, top: ripple.y }}
              />
            ))}
          </span>
        )}
      </div>
    )
  }
)

MagneticButton.displayName = 'MagneticButton'

export default MagneticButton
export type { TypographyPreset } from '@design-system/typography'
