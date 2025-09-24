import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'

import { prefersReducedMotion } from '@/utils/motion'
import { cn } from '@/lib/classNames'
import { getTypographyStyle, type TypographyPreset } from '@design-system/typography'

interface Ripple {
  id: number
  x: number
  y: number
}

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Strength of the magnetic offset; values between 0.02 and 0.12 work best */
  intensity?: number
  /** Enables a subtle glow on hover */
  glowEffect?: boolean
  /** Enables a ripple feedback on click */
  rippleEffect?: boolean
  /** Slightly scale the button while hovering */
  scaleEffect?: boolean
  /** Typography preset sourced from the design-system tokens */
  textStyle?: TypographyPreset
  /** Enable hardware acceleration by hinting `will-change` */
  enableHardwareAcceleration?: boolean
}

const MIN_INTENSITY = 0
const MAX_INTENSITY = 0.2
const DEFAULT_INTENSITY = 0.075

const clampIntensity = (value: number) =>
  Math.min(Math.max(value, MIN_INTENSITY), MAX_INTENSITY)

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(({ 
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
}, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement, [])

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const animationFrame = useRef<number>()
  const rippleTimeouts = useRef<Map<number, number>>(new Map())
  const reduceMotion = useRef<boolean>(prefersReducedMotion())

  const resolvedIntensity = reduceMotion.current ? 0 : clampIntensity(intensity)

  const handlePointerMove = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current || resolvedIntensity === 0) return

    const computePosition = () => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      const offsetX = event.clientX - rect.left - rect.width / 2
      const offsetY = event.clientY - rect.top - rect.height / 2
      setPosition({
        x: offsetX * resolvedIntensity,
        y: offsetY * resolvedIntensity
      })
    }

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }

    animationFrame.current = window.requestAnimationFrame(computePosition)
  }, [disabled, resolvedIntensity])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
    setPosition({ x: 0, y: 0 })
  }, [])

  const handlePointerEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true)
    }
  }, [disabled])

  const handleClickInternal = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (rippleEffect && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const rippleId = window.performance.now()
      const ripple: Ripple = {
        id: rippleId,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }

      setRipples(previous => [...previous, ripple])

      const timeout = window.setTimeout(() => {
        setRipples(previous => previous.filter(item => item.id !== rippleId))
        rippleTimeouts.current.delete(rippleId)
      }, 600)

      rippleTimeouts.current.set(rippleId, timeout)
    }

    if (onClick) {
      onClick(event)
    }
  }, [disabled, rippleEffect, onClick])

  useEffect(() => {
    if (!buttonRef.current || !enableHardwareAcceleration) return
    const node = buttonRef.current
    const previousWillChange = node.style.willChange
    node.style.willChange = 'transform'
    return () => {
      node.style.willChange = previousWillChange
    }
  }, [enableHardwareAcceleration])

  useEffect(() => () => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
    rippleTimeouts.current.forEach(timeout => window.clearTimeout(timeout))
    rippleTimeouts.current.clear()
  }, [])

  const transform = useMemo(() => {
    if (resolvedIntensity === 0) return undefined
    const translate = `translate3d(${position.x}px, ${position.y}px, 0)`
    const scale = scaleEffect && isHovered ? ' scale(1.04)' : ''
    return `${translate}${scale}`
  }, [isHovered, position.x, position.y, resolvedIntensity, scaleEffect])

  const typographyStyle = useMemo(() => getTypographyStyle(textStyle), [textStyle])

  return (
    <button
      ref={buttonRef}
      type="button"
      className={cn(
        'relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent bg-slate-900/80 px-4 py-2 text-slate-100 transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 dark:bg-slate-800/80',
        glowEffect && 'shadow-[0_0_24px_rgba(0,255,165,0.35)] hover:shadow-[0_0_32px_rgba(0,255,165,0.45)]',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-emerald-400/60',
        className
      )}
      style={{
        transform,
        ...typographyStyle,
        ...style
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onMouseEnter={handlePointerEnter}
      onClick={handleClickInternal}
      disabled={disabled}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {rippleEffect && (
        <span className="pointer-events-none absolute inset-0">
          {ripples.map(ripple => (
            <span
              key={ripple.id}
              className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 opacity-80 animate-[ripple_0.6s_ease-out_forwards]"
              style={{ left: ripple.x, top: ripple.y }}
            />
          ))}
        </span>
      )}
    </button>
  )
})

MagneticButton.displayName = 'MagneticButton'

export default MagneticButton
export type { TypographyPreset } from '@design-system/typography'
