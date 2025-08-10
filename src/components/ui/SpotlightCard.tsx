import React, { useRef, useState } from 'react'

interface Position { x: number; y: number }

export interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string
  spotlightColor?: string // rgba(r,g,b,a)
  intensity?: number // 0..1 multiplier for opacity
  radius?: number // percentage fallback radius (default 70)
  variant?: 'accent' | 'neutral' | 'subtle'
  blur?: number // px blur amount
}

/**
 * SpotlightCard
 * Interaktiver Hintergrund-Spot (radial gradient) folgt Mausposition.
 * Keyboard-Fokus erzeugt zentrierten Spot. Barrierefrei & performant.
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor,
  intensity = 0.55,
  radius = 70,
  variant = 'accent',
  blur = 40
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const updatePosition: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!ref.current || isFocused) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleEnter = () => setOpacity(intensity)
  const handleLeave = () => setOpacity(0)
  const handleFocus = () => {
    setIsFocused(true)
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPos({ x: rect.width / 2, y: rect.height / 2 })
    }
    setOpacity(intensity)
  }
  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  // derive color if not given
  const derivedColor = spotlightColor || (
    variant === 'accent'
      ? 'rgba(0,239,213,0.38)'
      : variant === 'neutral'
      ? 'rgba(255,255,255,0.25)'
      : 'rgba(255,255,255,0.15)'
  )

  const layeredGradient = `radial-gradient(circle at ${pos.x}px ${pos.y}px, ${derivedColor} 0%, rgba(0,0,0,0) ${radius}%)`

  return (
    <div
      ref={ref}
      onMouseMove={updatePosition}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      className={`relative isolate overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vae-turquoise/50 ${className}`}
    >
      {/* Spotlight Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out will-change-transform"
        style={{
          opacity,
          background: layeredGradient,
          filter: `blur(${blur}px)`,
          mixBlendMode: 'plus-lighter'
        }}
      />
      {/* Soft ambient overlay to avoid harsh edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(140deg,rgba(255,255,255,0.02),rgba(255,255,255,0))' }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  )
}

export default SpotlightCard
