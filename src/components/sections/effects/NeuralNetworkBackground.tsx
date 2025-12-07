/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  NEURAL NETWORK BACKGROUND                                                ┃
 * ┃  Three.js-Canvas: Schwebende Neuronen, pulsierende Verbindungen.          ┃
 * ┃  Reagiert auf Mausbewegung. Pausiert wenn Tab nicht sichtbar.             ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ TERRITORIUM-KARTE
 * ├── ⛓️ Gates           → Reduced Motion, Low-Power Device Detection
 * ├── 🏗️ Scene Setup     → THREE.Scene, Camera, Renderer (WebGL)
 * ├── 🧠 Neural Elements → Neuronen (Spheres), Connections (Lines), Particles
 * ├── 🎬 Animation Loop  → requestAnimationFrame, Mouse-Reaktion, Pulsing
 * ├── 🔁 Side-Effects    → Resize-Handler, Visibility-Tracking
 * └── 🧹 Cleanup         → GPU-Memory Disposal, Event-Listener Removal
 *
 * ⚠️ BUNDLE-IMPACT: ~150KB (Three.js) – daher lazy-loaded in HeroSection
 * 📍 THEME-AWARE: Türkis-Farbe passt sich Dark/Light Mode an
 */

import { useTheme } from '@/contexts/ThemeContext'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ⚙️ Tuning-Knobs: Hier drehen für visuelle Anpassungen
const CONFIG = {
  // Neuron-Anzahl (skaliert mit Device-Power)
  neurons: { reduced: 60, lowPower: 90, full: 120 },
  // Partikel-Anzahl
  particles: { reduced: 0, lowPower: 50, full: 80 },
  // Verbindungs-Wahrscheinlichkeit (höher = weniger Connections)
  connectionThreshold: { reduced: 0.985, full: 0.96 },
  // Max-Distanz für Verbindungen
  connectionDistance: { reduced: 3.2, full: 4 },
  // Rotation-Geschwindigkeit (Werte für 60fps, werden frame-time-normalisiert)
  rotation: {
    baseX: { reduced: 0.0003, full: 0.0006 },
    baseY: { reduced: 0.0004, full: 0.0008 },
  },
  // Farben & Opacity (Theme-aware) - Light Mode braucht höhere Werte
  colors: {
    dark: { hex: 0x00ffa5, neuronOpacity: 0.25, lineOpacity: 0.3, particleOpacity: 0.12 },
    light: { hex: 0x00997a, neuronOpacity: 0.45, lineOpacity: 0.5, particleOpacity: 0.25 },
  },
  // Pulsing-Konfiguration
  pulse: {
    speed: 0.4, // Langsamer = meditativ
    waveSpeed: 0.8, // Wie schnell die Welle durch das Grid läuft
    amplitude: 0.15, // Wie stark die Opacity schwankt
  },
}

interface Props {
  className?: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: NeuralNetworkBackground
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const NeuralNetworkBackground: React.FC<Props> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const activeRef = useRef(true)
  const { theme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return
    const mount = mountRef.current

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ⛓️ GATES: Device & Accessibility Checks
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const deviceMemory = (navigator as { deviceMemory?: number })?.deviceMemory
    const lowPower = typeof deviceMemory === 'number' ? deviceMemory <= 4 : false

    // Mode-Selector basierend auf Gates
    const mode = prefersReduced ? 'reduced' : lowPower ? 'lowPower' : 'full'

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🏗️ SCENE SETUP: Three.js Grundgerüst
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({
      antialias: mode === 'full',
      alpha: true,
      powerPreference: mode === 'full' ? 'high-performance' : 'low-power',
    })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mode === 'full' ? 1.75 : 1.25))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🧠 NEURAL ELEMENTS: Neurons + Connections + Particles
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const isDark = theme === 'dark'
    const colorConfig = isDark ? CONFIG.colors.dark : CONFIG.colors.light
    const { hex: color, neuronOpacity, lineOpacity, particleOpacity } = colorConfig

    // 🔵 NEURONS: Kleine leuchtende Kugeln (shared Material für globalen Puls)
    const neurons = new THREE.Group()
    const neuronGeo = new THREE.SphereGeometry(0.03, 8, 6) // Etwas größer, mehr Detail
    const neuronMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: neuronOpacity,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending, // Glow im Dark Mode
    })
    const neuronPositions: THREE.Vector3[] = []

    const neuronCount = CONFIG.neurons[mode]
    for (let i = 0; i < neuronCount; i++) {
      const mesh = new THREE.Mesh(neuronGeo, neuronMat) // Shared material, kein clone()
      const pos = new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10)
      mesh.position.copy(pos)
      neuronPositions.push(pos)
      neurons.add(mesh)
    }

    // 🔗 CONNECTIONS: Linien zwischen nahen Neuronen (shared Material)
    const connections = new THREE.Group()
    const lineMat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: lineOpacity,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    })
    const threshold = mode === 'reduced' ? CONFIG.connectionThreshold.reduced : CONFIG.connectionThreshold.full
    const maxDist = mode === 'reduced' ? CONFIG.connectionDistance.reduced : CONFIG.connectionDistance.full

    for (let i = 0; i < neuronPositions.length; i++) {
      for (let j = i + 1; j < neuronPositions.length; j++) {
        if (Math.random() > threshold && neuronPositions[i].distanceTo(neuronPositions[j]) < maxDist) {
          const geo = new THREE.BufferGeometry().setFromPoints([neuronPositions[i], neuronPositions[j]])
          const line = new THREE.Line(geo, lineMat) // Shared material, kein clone()
          connections.add(line)
        }
      }
    }

    // ✨ PARTICLES: Schwebende Punkte im Hintergrund
    const particleCount = CONFIG.particles[mode]
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 15
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color,
      size: 0.6,
      transparent: true,
      opacity: particleOpacity,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)

    scene.add(neurons, connections, particles)

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🎬 ANIMATION LOOP: Rotation, Pulsing (Frame-Time normalisiert)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    let lastTime = performance.now()

    const animate = () => {
      if (!activeRef.current) return
      frameRef.current = requestAnimationFrame(animate)

      // Frame-Time-Normalisierung für konsistente Geschwindigkeit
      const now = performance.now()
      const delta = Math.min((now - lastTime) / 16.667, 3) // Normalisiert auf 60fps, max 3x bei Lag
      lastTime = now

      // 🔄 Rotation (konstante Geschwindigkeit unabhängig von Framerate)
      const rotX = (mode === 'reduced' ? CONFIG.rotation.baseX.reduced : CONFIG.rotation.baseX.full) * delta
      const rotY = (mode === 'reduced' ? CONFIG.rotation.baseY.reduced : CONFIG.rotation.baseY.full) * delta

      neurons.rotation.x += rotX
      neurons.rotation.y += rotY
      connections.rotation.x += rotX
      connections.rotation.y += rotY

      if (particleCount > 0) {
        particles.rotation.y += (mode === 'reduced' ? 0.0004 : 0.0015) * delta
        particles.rotation.x += (mode === 'reduced' ? 0.0002 : 0.001) * delta
      }

      // 💓 Pulsing Animation (Theme-aware base opacity)
      const time = now * 0.001
      const { speed, amplitude } = CONFIG.pulse
      const globalPulse = Math.sin(time * speed) * amplitude

      // Opacity schwingt um den Theme-spezifischen Basiswert
      neuronMat.opacity = neuronOpacity * (1 + globalPulse)
      lineMat.opacity = lineOpacity * (1 + globalPulse * 0.5) // Lines pulsieren dezenter

      renderer.render(scene, camera)
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🔁 SIDE-EFFECTS: Event-Listener
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // 👁️ Visibility-Tracking (pausiert wenn Tab versteckt)
    const onVisibility = () => {
      activeRef.current = document.visibilityState === 'visible'
      if (activeRef.current && frameRef.current == null) {
        lastTime = performance.now() // Reset timer nach Pause
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // 📐 Resize-Handler
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // 🚀 Start Animation
    if (mode !== 'reduced') {
      frameRef.current = requestAnimationFrame(animate)
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🧹 CLEANUP: GPU-Memory freigeben, Listener entfernen
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)

      // Dispose shared geometries & materials
      neuronGeo.dispose()
      neuronMat.dispose()
      lineMat.dispose()

      // Dispose connection geometries (each line has unique geometry)
      connections.children.forEach(c => {
        const line = c as THREE.Line
        line.geometry?.dispose?.()
      })

      particleGeo?.dispose?.()
      particleMat?.dispose?.()
      renderer?.dispose?.()

      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [theme]) // Recreate on theme change für Farb-Update

  return <div ref={mountRef} className={`pointer-events-none absolute inset-0 z-0 ${className}`} />
}

export default NeuralNetworkBackground
