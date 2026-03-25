/**
 * DataSovereigntyVisual — Premium interactive Cloud vs. Self-Hosted toggle card
 * Pure React + GSAP + SVG. No Three.js.
 */

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KEYFRAME STYLES (injected once)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STYLE_ID = 'dsv-keyframes'

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    @keyframes dsv-packet-cloud-1 {
      0%   { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
      80%  { transform: translate(-52px, -36px) scale(0.55); opacity: 0.4; }
      100% { transform: translate(-58px, -40px) scale(0.3); opacity: 0; }
    }
    @keyframes dsv-packet-cloud-2 {
      0%   { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
      80%  { transform: translate(-12px, -52px) scale(0.55); opacity: 0.4; }
      100% { transform: translate(-14px, -58px) scale(0.3); opacity: 0; }
    }
    @keyframes dsv-packet-cloud-3 {
      0%   { transform: translate(0px, 0px) scale(1); opacity: 0.9; }
      80%  { transform: translate(42px, -38px) scale(0.55); opacity: 0.4; }
      100% { transform: translate(48px, -42px) scale(0.3); opacity: 0; }
    }
    @keyframes dsv-orbit-1 {
      0%   { transform: rotate(0deg)   translateX(38px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(38px) rotate(-360deg); }
    }
    @keyframes dsv-orbit-2 {
      0%   { transform: rotate(120deg)  translateX(38px) rotate(-120deg); }
      100% { transform: rotate(480deg)  translateX(38px) rotate(-480deg); }
    }
    @keyframes dsv-orbit-3 {
      0%   { transform: rotate(240deg)  translateX(38px) rotate(-240deg); }
      100% { transform: rotate(600deg)  translateX(38px) rotate(-600deg); }
    }
  `
  document.head.appendChild(style)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CLOUD SVG SCENE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CloudScene: React.FC = () => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {/* Cost counter — top right */}
    {/* (rendered by parent, passed via prop — see below) */}

    {/* Cloud icon + aura + packets */}
    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
      {/* Red aura behind cloud */}
      <div
        style={{
          position: 'absolute',
          inset: '-14px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,80,80,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Cloud SVG */}
      <svg
        viewBox="0 0 60 44"
        width="60"
        height="44"
        fill="none"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        <path
          d="M44 34H16a10 10 0 1 1 2.93-19.57A14 14 0 1 1 44 34z"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>

      {/* Data packet dots — animate toward cloud */}
      {[1, 2, 3].map(i => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '7px',
            height: '7px',
            marginTop: '-3.5px',
            marginLeft: '-3.5px',
            borderRadius: '50%',
            background: 'rgba(255,120,120,0.85)',
            animation: `dsv-packet-cloud-${i} 1.6s ease-in infinite`,
            animationDelay: `${(i - 1) * 0.52}s`,
          }}
        />
      ))}
    </div>

    {/* Caption */}
    <p
      style={{
        marginTop: '16px',
        fontSize: '11px',
        color: 'rgba(255,100,100,0.7)',
        textAlign: 'center',
        letterSpacing: '0.02em',
        lineHeight: 1.4,
      }}
    >
      Ihre Daten verlassen Ihr Unternehmen
    </p>
  </div>
)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SERVER SVG SCENE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ServerScene: React.FC = () => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {/* Server icon + aura + orbit dots */}
    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
      {/* Teal aura */}
      <div
        style={{
          position: 'absolute',
          inset: '-14px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Server rack SVG */}
      <svg
        viewBox="0 0 48 56"
        width="48"
        height="56"
        fill="none"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        {/* Rack outline */}
        <rect x="4" y="4" width="40" height="48" rx="3" stroke="#00d4aa" strokeWidth="1.5" />
        {/* 3 server slots */}
        {[14, 26, 38].map(y => (
          <g key={y}>
            <rect x="8" y={y - 5} width="32" height="9" rx="2" stroke="#00d4aa" strokeWidth="1" strokeOpacity="0.6" />
            {/* Status dot */}
            <circle cx="13" cy={y - 0.5} r="2" fill="#00d4aa" opacity="0.8" />
            {/* Line */}
            <line x1="18" y1={y - 0.5} x2="36" y2={y - 0.5} stroke="#00d4aa" strokeWidth="1" strokeOpacity="0.3" />
          </g>
        ))}
      </svg>

      {/* Orbit container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              marginTop: '-4px',
              marginLeft: '-4px',
              borderRadius: '50%',
              background: '#00d4aa',
              opacity: 0.75,
              animation: `dsv-orbit-${i} 2.8s linear infinite`,
            }}
          />
        ))}
      </div>
    </div>

    {/* Caption */}
    <p
      style={{
        marginTop: '16px',
        fontSize: '11px',
        color: 'rgba(0,212,170,0.7)',
        textAlign: 'center',
        letterSpacing: '0.02em',
        lineHeight: 1.4,
      }}
    >
      Ihre Daten. Ihr Server. Ihre Kontrolle.
    </p>
  </div>
)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ActiveMode = 'cloud' | 'self'

const DataSovereigntyVisual: React.FC = () => {
  const [mode, setMode] = useState<ActiveMode>('cloud')
  const [cost, setCost] = useState(1847)
  const visualRef = useRef<HTMLDivElement>(null)
  const prevMode = useRef<ActiveMode>('cloud')

  // Inject CSS keyframes once
  useEffect(() => {
    injectStyles()
  }, [])

  // Cost counter ticking up (cloud mode only)
  useEffect(() => {
    if (mode !== 'cloud') return
    const id = setInterval(() => {
      const delta = Math.floor(Math.random() * 6) + 3 // 3–8
      setCost(c => c + delta)
    }, 800)
    return () => clearInterval(id)
  }, [mode])

  // GSAP fade transition when mode changes
  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    if (prevMode.current === mode) return

    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.inOut' })
    prevMode.current = mode
  }, [mode])

  const handleSwitch = (next: ActiveMode) => {
    if (next === mode) return
    const el = visualRef.current
    if (el) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.15,
        ease: 'power1.in',
        onComplete: () => setMode(next),
      })
    } else {
      setMode(next)
    }
  }

  const formatCost = (n: number) => `€ ${n.toLocaleString('de-DE')} / mo`

  return (
    <div
      style={{
        background: '#080e0c',
        border: '1px solid rgba(0,212,170,0.15)',
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
      }}
    >
      {/* ── Toggle bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Cloud / SaaS button */}
        <button
          onClick={() => handleSwitch('cloud')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '8px',
            border: mode === 'cloud' ? '1px solid rgba(0,212,170,0.35)' : '1px solid transparent',
            background: mode === 'cloud' ? 'rgba(0,212,170,0.15)' : 'transparent',
            color: mode === 'cloud' ? '#00d4aa' : 'rgba(255,255,255,0.35)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            letterSpacing: '0.02em',
          }}
        >
          Cloud / SaaS
        </button>

        {/* Self-Hosted button */}
        <button
          onClick={() => handleSwitch('self')}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '8px',
            border: mode === 'self' ? '1px solid rgba(0,212,170,0.35)' : '1px solid transparent',
            background: mode === 'self' ? 'rgba(0,212,170,0.15)' : 'transparent',
            color: mode === 'self' ? '#00d4aa' : 'rgba(255,255,255,0.35)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            letterSpacing: '0.02em',
          }}
        >
          Self-Hosted
        </button>
      </div>

      {/* ── Visual area ── */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          overflow: 'hidden',
        }}
      >
        {/* Cost display — top right corner */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: mode === 'cloud' ? '#ff6b6b' : '#00d4aa',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
              transition: 'color 0.3s ease',
            }}
          >
            {mode === 'cloud' ? formatCost(cost) : '€ 290 / mo'}
          </span>
          {mode === 'self' && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#00d4aa',
                background: 'rgba(0,212,170,0.15)',
                border: '1px solid rgba(0,212,170,0.3)',
                borderRadius: '999px',
                padding: '2px 8px',
                letterSpacing: '0.04em',
              }}
            >
              GESPART: €1.557 / mo
            </span>
          )}
        </div>

        {/* Animated scene */}
        <div ref={visualRef} style={{ width: '100%', height: '100%' }}>
          {mode === 'cloud' ? <CloudScene /> : <ServerScene />}
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            lineHeight: 1.5,
            color: mode === 'cloud' ? 'rgba(255,255,255,0.35)' : 'rgba(0,212,170,0.8)',
            transition: 'color 0.3s ease',
          }}
        >
          {mode === 'cloud'
            ? 'Wechseln Sie, bevor die nächste Preiserhöhung kommt.'
            : 'Einmaliges Setup. Keine monatlichen Überraschungen.'}
        </p>
      </div>
    </div>
  )
}

export default DataSovereigntyVisual
