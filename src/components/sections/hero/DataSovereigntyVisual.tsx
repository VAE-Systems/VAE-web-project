import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const VAE_TEAL = 0x00d4aa
const VAE_TEAL_HEX = '#00d4aa'

interface FloatingTag {
  label: string
  icon: React.ReactNode
}

const FLOATING_TAGS: FloatingTag[] = [
  {
    label: 'Ihre Daten',
    icon: (
      <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
        <rect x="1" y="5" width="9" height="7" rx="1.5" stroke={VAE_TEAL_HEX} strokeWidth="1.2" />
        <path d="M3.5 5V3.5a2 2 0 0 1 4 0V5" stroke={VAE_TEAL_HEX} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="5.5" cy="8.5" r="1" fill={VAE_TEAL_HEX} />
      </svg>
    ),
  },
  {
    label: 'Open Source',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2 6.5L4.5 9L10 3"
          stroke={VAE_TEAL_HEX}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'DSGVO',
    icon: (
      <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
        <path
          d="M5.5 1L1 3v4c0 2.5 1.9 4.8 4.5 5.5C8.1 11.8 10 9.5 10 7V3L5.5 1z"
          stroke={VAE_TEAL_HEX}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 6.5L5 8L7.5 5"
          stroke={VAE_TEAL_HEX}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FLOATING TAG COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FloatingTagProps {
  tag: FloatingTag
  initialX: number
  initialY: number
  driftX: number
  driftY: number
  duration: number
  delay: number
}

const FloatingTagEl: React.FC<FloatingTagProps> = ({ tag, initialX, initialY, driftX, driftY, duration, delay }) => {
  const elRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    gsap.set(el, { x: initialX, y: initialY, opacity: 0 })

    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay })

    tl.to(el, { opacity: 0.72, duration: 1.2, ease: 'power2.out' }, 0)
    tl.to(
      el,
      {
        x: initialX + driftX,
        y: initialY + driftY,
        duration,
        ease: 'sine.inOut',
      },
      0
    )

    return () => {
      tl.kill()
    }
  }, [initialX, initialY, driftX, driftY, duration, delay])

  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '5px 10px',
          borderRadius: '999px',
          background: 'rgba(10, 18, 16, 0.82)',
          border: `1px solid rgba(0, 212, 170, 0.35)`,
          backdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap',
        }}
      >
        {tag.icon}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: 'rgba(0, 212, 170, 0.85)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {tag.label}
        </span>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THREE.JS CUBE SCENE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function useCubeScene(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0, 5.5)

    // ── Wireframe Cube ──────────────────────────────────────────────────────

    // EdgesGeometry gives us clean wireframe edges without diagonals
    const boxGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2)
    const edgesGeo = new THREE.EdgesGeometry(boxGeo)
    const edgesMat = new THREE.LineBasicMaterial({
      color: VAE_TEAL,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const wireframe = new THREE.LineSegments(edgesGeo, edgesMat)
    scene.add(wireframe)

    // ── Inner glow lines (slightly smaller cube, lower opacity) ─────────────
    const innerEdgesGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.0, 2.0, 2.0))
    const innerEdgesMat = new THREE.LineBasicMaterial({
      color: VAE_TEAL,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const innerWire = new THREE.LineSegments(innerEdgesGeo, innerEdgesMat)
    scene.add(innerWire)

    // ── Pulsing core sphere ─────────────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(0.06, 16, 16)
    const coreMat = new THREE.MeshBasicMaterial({
      color: VAE_TEAL,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    // ── Outer glow halo around core ─────────────────────────────────────────
    const haloGeo = new THREE.SphereGeometry(0.18, 16, 16)
    const haloMat = new THREE.MeshBasicMaterial({
      color: VAE_TEAL,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    })
    const halo = new THREE.Mesh(haloGeo, haloMat)
    scene.add(halo)

    // ── Dispose helper ──────────────────────────────────────────────────────
    boxGeo.dispose()

    // ── Animation loop ──────────────────────────────────────────────────────
    let rafId: number
    let elapsed = 0
    let lastTime = performance.now()

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      const now = performance.now()
      const dt = Math.min((now - lastTime) / 1000, 0.05) // seconds, capped
      lastTime = now
      elapsed += dt

      // Very slow rotation — barely perceptible, intentional
      wireframe.rotation.x += 0.0008
      wireframe.rotation.y += 0.0015
      innerWire.rotation.x = wireframe.rotation.x
      innerWire.rotation.y = wireframe.rotation.y

      // Pulsing core — gentle sine breath
      const pulse = 0.75 + 0.25 * Math.sin(elapsed * 1.8)
      coreMat.opacity = pulse
      haloMat.opacity = 0.05 + 0.06 * Math.sin(elapsed * 1.4)
      const s = 0.85 + 0.3 * Math.sin(elapsed * 1.8)
      core.scale.setScalar(s)
      halo.scale.setScalar(0.9 + 0.2 * Math.sin(elapsed * 1.4))

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize handler ──────────────────────────────────────────────────────
    const onResize = () => {
      if (!canvas) return
      const nw = canvas.clientWidth
      const nh = canvas.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh, false)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)

      // GPU memory cleanup
      edgesGeo.dispose()
      edgesMat.dispose()
      innerEdgesGeo.dispose()
      innerEdgesMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      haloGeo.dispose()
      haloMat.dispose()
      renderer.dispose()
    }
  }, [canvasRef])
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TAG LAYOUT — deterministic positions relative to the canvas area
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TAG_CONFIGS = [
  // "Ihre Daten" — upper-left orbit
  { initialX: 18, initialY: 52, driftX: -12, driftY: -18, duration: 9, delay: 0 },
  // "Open Source" — lower-right orbit
  { initialX: 230, initialY: 150, driftX: 14, driftY: 10, duration: 11, delay: 1.4 },
  // "DSGVO" — upper-right
  { initialX: 255, initialY: 40, driftX: 10, driftY: -14, duration: 10, delay: 2.8 },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STAT ROW COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface StatRowProps {
  value: string
  label: string
  isLast?: boolean
}

const StatRow: React.FC<StatRowProps> = ({ value, label, isLast }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '14px 20px',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Hover background bar sliding in from left */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 212, 170, 0.08)',
          transform: hovered ? 'translateX(0%)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          position: 'relative',
          fontSize: '22px',
          fontWeight: 700,
          color: '#00d4aa',
          minWidth: '72px',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          position: 'relative',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.02em',
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DataSovereigntyVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useCubeScene(canvasRef)

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        background: '#080e0c',
        border: '1px solid rgba(0, 212, 170, 0.15)',
        borderRadius: '16px',
        padding: 0,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Top half: Three.js canvas area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          background: 'radial-gradient(circle at 50% 60%, rgba(0,212,170,0.12) 0%, transparent 65%)',
          overflow: 'hidden',
        }}
      >
        {/* Three.js canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Floating SVG tags */}
        {FLOATING_TAGS.map((tag, i) => {
          const cfg = TAG_CONFIGS[i]
          if (!cfg) return null
          return (
            <FloatingTagEl
              key={tag.label}
              tag={tag}
              initialX={cfg.initialX}
              initialY={cfg.initialY}
              driftX={cfg.driftX}
              driftY={cfg.driftY}
              duration={cfg.duration}
              delay={cfg.delay}
            />
          )
        })}
      </div>

      {/* Bottom half: Stat rows */}
      <div
        style={{
          borderTop: '1px solid rgba(0, 212, 170, 0.1)',
        }}
      >
        <StatRow value="68%" label="Zeitersparnis in Workflows" />
        <StatRow value="€2.400" label="monatliche SaaS-Einsparung" />
        <StatRow value="100%" label="Datenkontrolle" isLast />
      </div>

      {/* Footer line */}
      <div
        style={{
          padding: '12px 20px',
          borderTop: '1px solid rgba(0,212,170,0.1)',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            color: 'rgba(0,212,170,0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Self-Hosted · DSGVO-konform · Made in Germany
        </span>
      </div>
    </div>
  )
}

export default DataSovereigntyVisual
