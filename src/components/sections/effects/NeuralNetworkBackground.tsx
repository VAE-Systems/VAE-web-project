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
  // Rotation-Geschwindigkeit
  rotation: {
    baseX: { reduced: 0.0007, full: 0.002 },
    baseY: { reduced: 0.0009, full: 0.003 },
  },
  // Farben (Theme-aware)
  colors: { dark: 0x00ffa5, light: 0x00d3a1 },
}

interface Props {
  className?: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: NeuralNetworkBackground
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const NeuralNetworkBackground: React.FC<Props> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 }) // Ref statt State → keine Re-Renders
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

    const color = theme === 'dark' ? CONFIG.colors.dark : CONFIG.colors.light

    // 🔵 NEURONS: Kleine leuchtende Kugeln
    const neurons = new THREE.Group()
    const neuronGeo = new THREE.SphereGeometry(0.03, 8, 6)
    const neuronMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 })
    const neuronPositions: THREE.Vector3[] = []

    const neuronCount = CONFIG.neurons[mode]
    for (let i = 0; i < neuronCount; i++) {
      const mesh = new THREE.Mesh(neuronGeo, neuronMat.clone())
      const pos = new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10)
      mesh.position.copy(pos)
      neuronPositions.push(pos)
      neurons.add(mesh)
    }

    // 🔗 CONNECTIONS: Linien zwischen nahen Neuronen
    const connections = new THREE.Group()
    const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })
    const threshold = mode === 'reduced' ? CONFIG.connectionThreshold.reduced : CONFIG.connectionThreshold.full
    const maxDist = mode === 'reduced' ? CONFIG.connectionDistance.reduced : CONFIG.connectionDistance.full

    for (let i = 0; i < neuronPositions.length; i++) {
      for (let j = i + 1; j < neuronPositions.length; j++) {
        if (Math.random() > threshold && neuronPositions[i].distanceTo(neuronPositions[j]) < maxDist) {
          const geo = new THREE.BufferGeometry().setFromPoints([neuronPositions[i], neuronPositions[j]])
          const line = new THREE.Line(geo, lineMat.clone())
          // Midpoint für Cursor-Highlight
          ;(line.userData as { midpoint: THREE.Vector3 }).midpoint = new THREE.Vector3()
            .addVectors(neuronPositions[i], neuronPositions[j])
            .multiplyScalar(0.5)
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
      size: 1,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)

    scene.add(neurons, connections, particles)

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🎬 ANIMATION LOOP: Rotation, Pulsing, Mouse-Reaktion
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const animate = () => {
      if (!activeRef.current) return
      frameRef.current = requestAnimationFrame(animate)

      const mouse = mouseRef.current
      const mouseActivity = Math.abs(mouse.x) + Math.abs(mouse.y)

      // 📷 Camera folgt Maus sanft
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.04
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      // 🔄 Rotation (beschleunigt bei Mausaktivität)
      const influence = mode === 'reduced' ? 0.3 : 1 + mouseActivity * 0.8
      const rotX = (mode === 'reduced' ? CONFIG.rotation.baseX.reduced : CONFIG.rotation.baseX.full) * influence
      const rotY = (mode === 'reduced' ? CONFIG.rotation.baseY.reduced : CONFIG.rotation.baseY.full) * influence

      neurons.rotation.x += rotX
      neurons.rotation.y += rotY
      connections.rotation.x += rotX
      connections.rotation.y += rotY

      if (particleCount > 0) {
        particles.rotation.y +=
          (mode === 'reduced' ? 0.001 : 0.005) + mouseActivity * (mode === 'reduced' ? 0.002 : 0.01)
        particles.rotation.x +=
          (mode === 'reduced' ? 0.0006 : 0.003) + mouseActivity * (mode === 'reduced' ? 0.001 : 0.005)
      }

      // 💓 Pulsing Neurons + Cursor-Magnetismus
      const time = Date.now() * 0.001
      neurons.children.forEach((n, i) => {
        const mesh = n as THREE.Mesh
        const mat = mesh.material as THREE.MeshBasicMaterial
        const screenPos = mesh.position.clone().project(camera)
        const mouseDist = Math.sqrt((screenPos.x - mouse.x) ** 2 + (screenPos.y - mouse.y) ** 2)
        const magnet = mode === 'reduced' ? 0 : Math.max(0, 1 - mouseDist / 1.2)
        const pulse = Math.sin(time + i * 0.1) * (mode === 'reduced' ? 0.08 : 0.15)

        mat.opacity = 0.4 + pulse + magnet * (mode === 'reduced' ? 0.15 : 0.3)
        mesh.scale.setScalar(1 + pulse * 0.1 + magnet * (mode === 'reduced' ? 0.1 : 0.2))
      })

      // 🔗 Connection Highlight bei Cursor-Nähe
      connections.children.forEach(c => {
        const line = c as THREE.Line
        const mat = line.material as THREE.LineBasicMaterial
        const mid = (line.userData as { midpoint: THREE.Vector3 }).midpoint.clone().project(camera)
        const dist = Math.sqrt((mid.x - mouse.x) ** 2 + (mid.y - mouse.y) ** 2)
        const highlight = mode === 'reduced' ? 0 : Math.max(0, 1 - dist / 0.5)
        mat.opacity =
          0.15 + mouseActivity * (mode === 'reduced' ? 0.05 : 0.2) + highlight * (mode === 'reduced' ? 0.2 : 0.6)
      })

      renderer.render(scene, camera)
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🔁 SIDE-EFFECTS: Event-Listener
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // 🖱️ Mouse-Tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / mount.clientWidth) * 2 - 1
      mouseRef.current.y = -(((e.clientY - rect.top) / mount.clientHeight) * 2 - 1)
    }
    mount.addEventListener('mousemove', onMouseMove, { passive: true })

    // 👁️ Visibility-Tracking (pausiert wenn Tab versteckt)
    const onVisibility = () => {
      activeRef.current = document.visibilityState === 'visible'
      if (activeRef.current && frameRef.current == null) {
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
      mount.removeEventListener('mousemove', onMouseMove)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)

      // Dispose all GPU resources
      const disposeMaterial = (mat: THREE.Material | THREE.Material[]) => {
        if (Array.isArray(mat)) mat.forEach(m => m.dispose())
        else mat?.dispose?.()
      }

      neurons.children.forEach(n => {
        const mesh = n as THREE.Mesh
        mesh.geometry?.dispose?.()
        disposeMaterial(mesh.material)
      })

      connections.children.forEach(c => {
        const line = c as THREE.Line
        line.geometry?.dispose?.()
        disposeMaterial(line.material)
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
