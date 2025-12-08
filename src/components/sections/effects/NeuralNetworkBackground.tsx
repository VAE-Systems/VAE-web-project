/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃  NEURAL NETWORK BACKGROUND v2.0                                           ┃
 * ┃  Three.js-Canvas: Schwebende Neuronen, Multi-Wave, Burst-Events, Mouse.   ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 *
 * 🗺️ TERRITORIUM-KARTE
 * ├── ⛓️ Gates           → Reduced Motion, Low-Power, Mobile Detection
 * ├── 🏗️ Scene Setup     → THREE.Scene, Camera, Renderer (WebGL)
 * ├── 🧠 Neural Elements → Neuronen (Spheres), Connections (Lines), Particles
 * ├── 🌊 Multi-Wave      → Mehrere sich überlagernde Wellen
 * ├── ⚡ Burst Events    → Zufällige Aktivitäts-Explosionen
 * ├── 🖱️ Mouse Interact  → Cursor-Nähe-Glow (Desktop only)
 * ├── 🎬 Animation Loop  → requestAnimationFrame, Frame-Time normalisiert
 * ├── 🔁 Side-Effects    → Resize-Handler, Visibility-Tracking
 * └── 🧹 Cleanup         → GPU-Memory Disposal, Event-Listener Removal
 *
 * ⚠️ BUNDLE-IMPACT: ~150KB (Three.js) – daher lazy-loaded in HeroSection
 * 📍 THEME-AWARE: Türkis-Farbe passt sich Dark/Light Mode an
 * 📱 MOBILE-AWARE: Maus-Interaktion auf Touch-Devices deaktiviert
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
    baseX: { reduced: 0.0003, full: 0.0006 },
    baseY: { reduced: 0.0004, full: 0.0008 },
  },
  // Farben & Opacity (Theme-aware)
  colors: {
    dark: { hex: 0x00ffa5, neuronOpacity: 0.25, lineOpacity: 0.3, particleOpacity: 0.12 },
    light: { hex: 0x00997a, neuronOpacity: 0.45, lineOpacity: 0.5, particleOpacity: 0.25 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌊 MULTI-WAVE SYSTEM: Mehrere sich überlagernde Wellen
  // ═══════════════════════════════════════════════════════════════════════════
  multiWave: {
    enabled: true,
    waves: [
      { speed: 1.0, frequency: 0.3, amplitude: 0.35, direction: { x: 1, y: 0.2 } },
      { speed: 0.7, frequency: 0.25, amplitude: 0.25, direction: { x: -0.5, y: 1 } },
      { speed: 1.3, frequency: 0.4, amplitude: 0.2, direction: { x: 0.3, y: -0.8 } },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚡ BURST EVENTS: Zufällige Aktivitäts-Explosionen
  // ═══════════════════════════════════════════════════════════════════════════
  burst: {
    enabled: true,
    minInterval: 5000,
    maxInterval: 10000,
    duration: 2000,
    radius: 8,
    intensity: 3.0,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🖱️ MOUSE INTERACTION: Cursor-Nähe lässt Elemente aufleuchten
  // ═══════════════════════════════════════════════════════════════════════════
  mouse: {
    enabled: true,
    radius: 3.5,
    intensity: 2.5,
    smoothing: 0.08,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 📡 DATA FLOW: Primäre Lichtwelle durch Connections
  // ═══════════════════════════════════════════════════════════════════════════
  dataFlow: {
    enabled: true,
    waveSpeed: 0.8,
    waveWidth: 3.0,
    glowIntensity: 3.5,
    direction: { x: 1, y: 0.3 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌫️ DEPTH FOG: Tiefenbasierte Opacity-Reduktion
  // ═══════════════════════════════════════════════════════════════════════════
  depthFog: {
    enabled: true,
    near: 8,
    far: -6,
    minOpacity: 0.3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌱 NODE LIFECYCLE: Dynamisches Wachsen & Verschwinden von Nodes
  // ═══════════════════════════════════════════════════════════════════════════
  // FPS-IMPACT: ~1-2 FPS bei 15 aktiven Lifecycle-Nodes (Object Pooling minimiert GC)
  nodeLifecycle: {
    enabled: true,
    poolSize: 30, // Vorab erstellte Nodes (recycelbar)
    spawnRate: 0.5, // Nodes pro Sekunde (0.5 = alle 2 Sekunden)
    maxActiveNodes: 15, // Max gleichzeitig "lebende" Nodes
    maxConcurrentTransitions: 2, // Max gleichzeitig fadende Nodes (Performance)
    fadeInDuration: 1500, // ms für Einblenden (ease-in-out)
    lifespan: { min: 8000, max: 15000 }, // Lebensdauer in ms (random)
    fadeOutDuration: 2000, // ms für Ausblenden (ease-in-out)
    triggerBurst: true, // Spawn löst Burst-Effekt aus
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔗 DYNAMIC CONNECTIONS: Verbindungen die mit Nodes entstehen/verschwinden
  // ═══════════════════════════════════════════════════════════════════════════
  // FPS-IMPACT: ~0.5-1 FPS (nur Material-Opacity-Updates, keine Geometry-Änderungen)
  dynamicConnections: {
    enabled: true,
    poolSize: 50, // Vorab erstellte Lines (recycelbar)
    maxConnectionsPerNode: 3, // Max Verbindungen pro Lifecycle-Node
    searchRadius: 5.0, // Radius für Nearest-Neighbor-Suche
    fadeInDuration: 800, // ms für Connection-Einblenden
    fadeOutDuration: 600, // ms für Connection-Ausblenden
    growDuration: 400, // ms für Längenwachstum
    maxConcurrentGrows: 3, // Limit paralleler Grow-Animationen
    miniLoops: {
      enabled: true,
      chance: 0.25, // 25% Chance pro Spawn
    },
    gradientFlow: {
      enabled: true,
      hueShift: 0.05, // HSL Hue-Shift basierend auf Flow-Intensität
      lightnessBoost: 0.1, // Etwas heller bei starkem Flow
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🧲 CLUSTER SPAWN: Strukturen statt Scatter
  // ═══════════════════════════════════════════════════════════════════════════
  clusterSpawn: {
    enabled: true,
    probability: 0.7, // 70% der Spawns clustern
    minRadius: 1.5,
    maxRadius: 3.0,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🪜 LAYERED DEPTH: bevorzugte Z-Schichten
  // ═══════════════════════════════════════════════════════════════════════════
  zLayers: {
    enabled: true,
    layers: [-2, 0, 2],
    jitter: 0.35,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎯 DEGREE LIMIT: begrenzt Speichen pro Node
  // ═══════════════════════════════════════════════════════════════════════════
  degreeLimit: {
    enabled: true,
    desired: 3,
    jitter: 1, // ±1 zufällig
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌬️ SPAWN DRIFT: sanftes Einfliegen neuer Nodes
  // ═══════════════════════════════════════════════════════════════════════════
  spawnDrift: {
    enabled: true,
    duration: 1000,
    offset: 1.0, // Startversatz
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎨 COMMUNITY COLORING: leichte Farb-Shifts für Subnetze
  // ═══════════════════════════════════════════════════════════════════════════
  communityColor: {
    enabled: true,
    groups: 3,
    hueShift: 0.06, // ±Hue-Shift je nach Gruppe
    saturationMult: 1.0,
    lightnessMult: 1.05,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚡ MICRO BURST: kurzer Glow beim Spawn
  // ═══════════════════════════════════════════════════════════════════════════
  microBurst: {
    enabled: true,
    duration: 600,
    radius: 4,
    intensity: 1.5,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌓 CONTRAST TUNING: feine Anpassung
  // ═══════════════════════════════════════════════════════════════════════════
  contrast: {
    particleOpacityScale: 0.85,
    lineOpacityBoost: 1.05,
  },
}

interface Props {
  className?: string
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚪 ORCHESTRATOR: NeuralNetworkBackground
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔧 TYPE DEFINITIONS: Node Lifecycle State Machine
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type NodeState = 'dormant' | 'fadingIn' | 'alive' | 'fadingOut'

interface LifecycleNode {
  mesh: THREE.Mesh
  material: THREE.MeshBasicMaterial
  state: NodeState
  stateStartTime: number // Wann hat aktueller State begonnen
  targetLifespan: number // Wie lange soll Node "alive" bleiben
  desiredDegree: number // Ziel-Anzahl an Verbindungen
  currentDegree: number // Aktuelle Verbindungsanzahl
  driftTarget?: THREE.Vector3 // Zielposition für sanftes Einfliegen
  driftStart?: THREE.Vector3 // Startposition für Drift
  driftStartTime?: number
  communityId: number
  connections: number[] // Indices der zugehörigen Connections in connectionPool
}

interface LifecycleConnection {
  line: THREE.Line
  material: THREE.LineBasicMaterial
  active: boolean
  fadeState: 'none' | 'fadingIn' | 'fadingOut'
  fadeStartTime: number
  sourceNodeIndex: number // Lifecycle-Node Index (Startpunkt)
  targetNodeIndex: number // Lifecycle-Node Index, -1 wenn unassigned
  growState: 'none' | 'growing' | 'active'
  growStartTime: number
}

const NeuralNetworkBackground: React.FC<Props> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const activeRef = useRef(true)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const burstRef = useRef({ active: false, x: 0, y: 0, z: 0, startTime: 0, nextBurst: 0 })
  const microBurstRef = useRef({ active: false, x: 0, y: 0, z: 0, startTime: 0 })

  // 🌱 NODE LIFECYCLE REFS
  const lifecycleNodesRef = useRef<LifecycleNode[]>([])
  const lifecycleConnectionsRef = useRef<LifecycleConnection[]>([])
  const lastSpawnTimeRef = useRef(0)

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

    // Mobile Detection: Touch-Device = keine Maus-Interaktion
    const isMobile =
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(max-width: 768px)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0)

    // Feature-Flags basierend auf Mode & Device
    const enableMouse = CONFIG.mouse.enabled && !isMobile && mode === 'full'
    const enableBurst = CONFIG.burst.enabled && mode !== 'reduced'
    const enableMultiWave = CONFIG.multiWave.enabled && mode !== 'reduced'

    // 🌱 NODE LIFECYCLE: Komplett deaktiviert bei reduced, gedrosselt bei lowPower
    const enableNodeLifecycle = CONFIG.nodeLifecycle.enabled && mode !== 'reduced'
    const lifecycleSpawnRate =
      mode === 'lowPower' ? CONFIG.nodeLifecycle.spawnRate * 0.5 : CONFIG.nodeLifecycle.spawnRate
    const enableDynamicConnections = CONFIG.dynamicConnections.enabled && enableNodeLifecycle

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
    const baseNeuronColor = new THREE.Color(color)
    const baseLineColor = new THREE.Color(color)
    const baseLineHSL = { h: 0, s: 0, l: 0 }
    baseLineColor.getHSL(baseLineHSL)

    // 🔵 NEURONS: Mit individuellen Materials für Wave-Pulsing
    const neurons = new THREE.Group()
    const neuronGeo = new THREE.SphereGeometry(0.04, 8, 6)
    const neuronMaterials: THREE.MeshBasicMaterial[] = []
    const neuronPositions: THREE.Vector3[] = []

    const neuronCount = CONFIG.neurons[mode]
    for (let i = 0; i < neuronCount; i++) {
      // Jedes Neuron bekommt eigenes Material für individuelle Opacity
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: neuronOpacity,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      })
      neuronMaterials.push(mat)

      const mesh = new THREE.Mesh(neuronGeo, mat)
      const pos = new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10)

      // Basisfarbe setzen (wird bei Activation ggf. community-basiert angepasst)
      mat.color.copy(baseNeuronColor)
      mesh.position.copy(pos)
      mesh.userData.baseZ = pos.z // Für Depth Fog
      neuronPositions.push(pos)
      neurons.add(mesh)
    }

    // 🔗 CONNECTIONS: Mit individuellen Materials für Data Flow
    const connections = new THREE.Group()
    const connectionMaterials: THREE.LineBasicMaterial[] = []
    const connectionData: { midX: number; midY: number; midZ: number }[] = []
    const threshold = mode === 'reduced' ? CONFIG.connectionThreshold.reduced : CONFIG.connectionThreshold.full
    const maxDist = mode === 'reduced' ? CONFIG.connectionDistance.reduced : CONFIG.connectionDistance.full

    for (let i = 0; i < neuronPositions.length; i++) {
      for (let j = i + 1; j < neuronPositions.length; j++) {
        if (Math.random() > threshold && neuronPositions[i].distanceTo(neuronPositions[j]) < maxDist) {
          const mat = new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: lineOpacity,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
          })
          connectionMaterials.push(mat)

          const geo = new THREE.BufferGeometry().setFromPoints([neuronPositions[i], neuronPositions[j]])
          const line = new THREE.Line(geo, mat)

          // Speichere Midpoint für Wave-basiertes Data Flow
          const midX = (neuronPositions[i].x + neuronPositions[j].x) / 2
          const midY = (neuronPositions[i].y + neuronPositions[j].y) / 2
          const midZ = (neuronPositions[i].z + neuronPositions[j].z) / 2
          connectionData.push({ midX, midY, midZ })

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
      opacity: particleOpacity * CONFIG.contrast.particleOpacityScale,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)

    scene.add(neurons, connections, particles)

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🌱 NODE LIFECYCLE POOL: Vorab erstellte, recycelbare Nodes
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PERFORMANCE: Object Pooling verhindert GC-Spikes während Animation

    const lifecycleNodes: LifecycleNode[] = []
    const lifecycleGroup = new THREE.Group()

    if (enableNodeLifecycle) {
      const poolGeo = new THREE.SphereGeometry(0.05, 10, 8) // Etwas größer als statische Nodes

      for (let i = 0; i < CONFIG.nodeLifecycle.poolSize; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0, // Startet unsichtbar (dormant)
          blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        })

        const mesh = new THREE.Mesh(poolGeo, mat)
        // Starte außerhalb des sichtbaren Bereichs
        mesh.position.set(100, 100, 100)
        mesh.userData.baseZ = 0

        lifecycleNodes.push({
          mesh,
          material: mat,
          state: 'dormant',
          stateStartTime: 0,
          targetLifespan: 0,
          desiredDegree: CONFIG.degreeLimit.enabled
            ? Math.max(1, CONFIG.degreeLimit.desired + Math.round((Math.random() * 2 - 1) * CONFIG.degreeLimit.jitter))
            : 99,
          currentDegree: 0,
          driftTarget: undefined,
          driftStart: undefined,
          driftStartTime: undefined,
          communityId: CONFIG.communityColor.enabled
            ? Math.floor(Math.random() * Math.max(1, CONFIG.communityColor.groups))
            : 0,
          connections: [],
        })

        lifecycleGroup.add(mesh)
      }

      scene.add(lifecycleGroup)
      lifecycleNodesRef.current = lifecycleNodes
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🔗 DYNAMIC CONNECTION POOL: Vorab erstellte, recycelbare Verbindungen
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PERFORMANCE: Lines werden recycelt, nur Material.opacity ändert sich

    const lifecycleConnections: LifecycleConnection[] = []
    const lifecycleConnectionGroup = new THREE.Group()

    if (enableDynamicConnections) {
      for (let i = 0; i < CONFIG.dynamicConnections.poolSize; i++) {
        const mat = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0, // Startet unsichtbar
          blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        })

        // Dummy-Geometrie (wird bei Aktivierung aktualisiert)
        const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)])
        const line = new THREE.Line(geo, mat)

        lifecycleConnections.push({
          line,
          material: mat,
          active: false,
          fadeState: 'none',
          fadeStartTime: 0,
          sourceNodeIndex: -1,
          targetNodeIndex: -1,
          growState: 'none',
          growStartTime: 0,
        })

        lifecycleConnectionGroup.add(line)
      }

      scene.add(lifecycleConnectionGroup)
      lifecycleConnectionsRef.current = lifecycleConnections
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🎬 ANIMATION LOOP: Multi-Wave, Burst, Mouse, Frame-Time normalisiert
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    let lastTime = performance.now()

    // Initialisiere ersten Burst-Timer
    if (enableBurst) {
      const { minInterval, maxInterval } = CONFIG.burst
      burstRef.current.nextBurst = performance.now() + minInterval + Math.random() * (maxInterval - minInterval)
    }

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

      const time = now * 0.001

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🖱️ MOUSE SMOOTHING: Sanfte Interpolation zur Zielposition
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (enableMouse) {
        const { smoothing } = CONFIG.mouse
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * smoothing
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * smoothing
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // ⚡ BURST EVENT TRIGGER: Prüfe ob Zeit für neuen Burst
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (enableBurst) {
        const burst = burstRef.current
        const { minInterval, maxInterval, duration } = CONFIG.burst

        // Ist ein Burst aktiv und abgelaufen?
        if (burst.active && now - burst.startTime > duration) {
          burst.active = false
        }

        // Zeit für neuen Burst?
        if (!burst.active && now > burst.nextBurst) {
          burst.active = true
          burst.startTime = now
          // Zufällige Position im sichtbaren Bereich
          burst.x = (Math.random() - 0.5) * 12
          burst.y = (Math.random() - 0.5) * 8
          burst.z = (Math.random() - 0.5) * 6
          // Nächsten Burst planen
          burst.nextBurst = now + minInterval + Math.random() * (maxInterval - minInterval)
        }
      }

      // 🌀 MICRO BURST Ablauf
      if (CONFIG.microBurst.enabled && microBurstRef.current.active) {
        const mb = microBurstRef.current
        if (now - mb.startTime > CONFIG.microBurst.duration) {
          mb.active = false
        }
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🌱 NODE LIFECYCLE STATE MACHINE
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // States: dormant → fadingIn → alive → fadingOut → dormant (recycled)
      // PERFORMANCE: Max 2 concurrent transitions to prevent frame drops

      if (enableNodeLifecycle) {
        const lNodes = lifecycleNodesRef.current
        const lConns = lifecycleConnectionsRef.current
        const { maxActiveNodes, maxConcurrentTransitions, fadeInDuration, fadeOutDuration, lifespan, triggerBurst } =
          CONFIG.nodeLifecycle
        const {
          maxConnectionsPerNode,
          searchRadius,
          fadeInDuration: connFadeIn,
          fadeOutDuration: connFadeOut,
        } = CONFIG.dynamicConnections

        // ─────────────────────────────────────────────────────────────────────
        // 📊 Count active nodes and transitions
        // ─────────────────────────────────────────────────────────────────────
        let activeCount = 0
        let transitionCount = 0

        lNodes.forEach(node => {
          if (node.state === 'alive' || node.state === 'fadingIn' || node.state === 'fadingOut') {
            activeCount++
          }
          if (node.state === 'fadingIn' || node.state === 'fadingOut') {
            transitionCount++
          }
        })

        // ─────────────────────────────────────────────────────────────────────
        // 🌱 SPAWN: Aktiviere dormant Node wenn Bedingungen erfüllt
        // ─────────────────────────────────────────────────────────────────────
        const spawnInterval = 1000 / lifecycleSpawnRate // ms zwischen Spawns
        const timeSinceLastSpawn = now - lastSpawnTimeRef.current

        if (
          timeSinceLastSpawn > spawnInterval &&
          activeCount < maxActiveNodes &&
          transitionCount < maxConcurrentTransitions
        ) {
          // Finde ersten dormant Node
          const dormantNode = lNodes.find(n => n.state === 'dormant')

          if (dormantNode) {
            // 📍 Neue Position im sichtbaren Bereich (Cluster + Layered Z)
            let newPos: THREE.Vector3
            const activeTargets = lNodes.filter(
              ln => ln !== dormantNode && (ln.state === 'alive' || ln.state === 'fadingIn')
            )

            const useCluster =
              CONFIG.clusterSpawn.enabled && activeTargets.length > 0 && Math.random() < CONFIG.clusterSpawn.probability
            if (useCluster) {
              const ref = activeTargets[Math.floor(Math.random() * activeTargets.length)]
              const r =
                CONFIG.clusterSpawn.minRadius +
                Math.random() * (CONFIG.clusterSpawn.maxRadius - CONFIG.clusterSpawn.minRadius)
              const theta = Math.random() * Math.PI * 2
              const phi = Math.random() * Math.PI
              const dx = r * Math.sin(phi) * Math.cos(theta)
              const dy = r * Math.sin(phi) * Math.sin(theta)
              const dz = r * Math.cos(phi)
              newPos = new THREE.Vector3(ref.mesh.position.x + dx, ref.mesh.position.y + dy, ref.mesh.position.z + dz)
            } else {
              newPos = new THREE.Vector3(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 9,
                (Math.random() - 0.5) * 8
              )
            }

            // Snap auf bevorzugte Layer mit leichtem Jitter
            if (CONFIG.zLayers.enabled) {
              const { layers, jitter } = CONFIG.zLayers
              const nearest = layers.reduce((prev, curr) =>
                Math.abs(curr - newPos.z) < Math.abs(prev - newPos.z) ? curr : prev
              )
              newPos.z = nearest + (Math.random() * 2 - 1) * jitter
            }
            // Drift-Start: optional Offsets, damit Nodes einfliegen
            if (CONFIG.spawnDrift.enabled) {
              const offset = CONFIG.spawnDrift.offset
              const startPos = new THREE.Vector3(
                newPos.x + (Math.random() * 2 - 1) * offset,
                newPos.y + (Math.random() * 2 - 1) * offset,
                newPos.z + (Math.random() * 2 - 1) * offset
              )
              dormantNode.mesh.position.copy(startPos)
              dormantNode.driftStart = startPos.clone()
              dormantNode.driftTarget = newPos.clone()
              dormantNode.driftStartTime = now
            } else {
              dormantNode.mesh.position.copy(newPos)
              dormantNode.driftStart = undefined
              dormantNode.driftTarget = undefined
              dormantNode.driftStartTime = undefined
            }
            dormantNode.mesh.userData.baseZ = newPos.z

            // 🔄 State Transition: dormant → fadingIn
            dormantNode.state = 'fadingIn'
            dormantNode.stateStartTime = now
            dormantNode.targetLifespan = lifespan.min + Math.random() * (lifespan.max - lifespan.min)
            dormantNode.connections = []
            dormantNode.currentDegree = 0
            dormantNode.communityId = CONFIG.communityColor.enabled
              ? Math.floor(Math.random() * Math.max(1, CONFIG.communityColor.groups))
              : 0

            // Setze Community-Farb-Shift
            if (CONFIG.communityColor.enabled) {
              const hsl = { h: 0, s: 0, l: 0 }
              baseNeuronColor.getHSL(hsl)
              const shift =
                CONFIG.communityColor.hueShift * (dormantNode.communityId - (CONFIG.communityColor.groups - 1) / 2)
              const nh = (hsl.h + shift + 1) % 1
              const ns = hsl.s * CONFIG.communityColor.saturationMult
              const nl = hsl.l * CONFIG.communityColor.lightnessMult
              dormantNode.material.color.setHSL(nh, ns, nl)
            } else {
              dormantNode.material.color.copy(baseNeuronColor)
            }

            lastSpawnTimeRef.current = now

            // ⚡ Trigger Burst-Effekt an Node-Position
            if (triggerBurst && enableBurst) {
              burstRef.current.active = true
              burstRef.current.startTime = now
              burstRef.current.x = newPos.x
              burstRef.current.y = newPos.y
              burstRef.current.z = newPos.z
            }

            // ⚡ MICRO BURST beim Spawn
            if (CONFIG.microBurst.enabled) {
              microBurstRef.current.active = true
              microBurstRef.current.startTime = now
              microBurstRef.current.x = newPos.x
              microBurstRef.current.y = newPos.y
              microBurstRef.current.z = newPos.z
            }

            // 🔗 Finde Nearest Neighbors und erstelle Connections
            // Nur zwischen Lifecycle-Nodes (keine statischen Targets, keine Endpunkte ins Leere)
            if (enableDynamicConnections) {
              const targets: { pos: THREE.Vector3; index: number }[] = []

              // Aktive Lifecycle-Nodes (alive / fadingIn), ohne den spawnenden Node
              lNodes.forEach((ln, idx) => {
                if (
                  ln !== dormantNode &&
                  (ln.state === 'alive' || ln.state === 'fadingIn') &&
                  (!CONFIG.degreeLimit.enabled || ln.currentDegree < ln.desiredDegree)
                ) {
                  targets.push({ pos: ln.mesh.position, index: idx })
                }
              })

              const distances = targets
                .map(t => ({ ...t, dist: newPos.distanceTo(t.pos) }))
                .filter(t => t.dist < searchRadius && t.dist > 0.1)
                .sort((a, b) => a.dist - b.dist)

              const connectCount = Math.min(maxConnectionsPerNode, distances.length)

              for (let c = 0; c < connectCount; c++) {
                const freeConn = lConns.find(conn => !conn.active)
                if (!freeConn) break

                const target = distances[c]

                const positions = freeConn.line.geometry.attributes.position as THREE.BufferAttribute
                positions.setXYZ(0, newPos.x, newPos.y, newPos.z)
                positions.setXYZ(1, target.pos.x, target.pos.y, target.pos.z)
                positions.needsUpdate = true

                // 🔄 Aktiviere Connection mit Lifecycle-Endpoints + Grow
                freeConn.active = true
                freeConn.fadeState = 'fadingIn'
                freeConn.fadeStartTime = now
                freeConn.sourceNodeIndex = lNodes.indexOf(dormantNode)
                freeConn.targetNodeIndex = target.index
                if (CONFIG.dynamicConnections.enabled && CONFIG.dynamicConnections.growDuration > 0) {
                  freeConn.growState = 'growing'
                  freeConn.growStartTime = now
                } else {
                  freeConn.growState = 'active'
                  freeConn.growStartTime = now
                }

                const connIndex = lConns.indexOf(freeConn)
                dormantNode.connections.push(connIndex)
                lNodes[target.index]?.connections.push(connIndex)

                // Degree hochzählen, wenn begrenzt
                if (CONFIG.degreeLimit.enabled) {
                  dormantNode.currentDegree = Math.min(dormantNode.desiredDegree, dormantNode.currentDegree + 1)
                  const targetNode = lNodes[target.index]
                  if (targetNode) {
                    targetNode.currentDegree = Math.min(targetNode.desiredDegree, targetNode.currentDegree + 1)
                  }
                }
              }

              // 🔁 MINI LOOPS: Optional zusätzliche Querverbindung
              if (
                CONFIG.dynamicConnections.miniLoops.enabled &&
                Math.random() < CONFIG.dynamicConnections.miniLoops.chance
              ) {
                const loopCandidates = lNodes
                  .map((ln, idx) => ({ ln, idx }))
                  .filter(({ ln }) => ln.state === 'alive' || ln.state === 'fadingIn')
                  .filter(({ ln }) => !CONFIG.degreeLimit.enabled || ln.currentDegree < ln.desiredDegree)

                if (loopCandidates.length >= 2) {
                  // pick two distinct
                  const a = loopCandidates[Math.floor(Math.random() * loopCandidates.length)]
                  let b = loopCandidates[Math.floor(Math.random() * loopCandidates.length)]
                  let guard = 0
                  while (b.idx === a.idx && guard < 3) {
                    b = loopCandidates[Math.floor(Math.random() * loopCandidates.length)]
                    guard++
                  }
                  if (a.idx !== b.idx) {
                    const freeConn = lConns.find(conn => !conn.active)
                    if (freeConn) {
                      const positions = freeConn.line.geometry.attributes.position as THREE.BufferAttribute
                      const posA = a.ln.mesh.position
                      const posB = b.ln.mesh.position
                      positions.setXYZ(0, posA.x, posA.y, posA.z)
                      positions.setXYZ(1, posB.x, posB.y, posB.z)
                      positions.needsUpdate = true

                      freeConn.active = true
                      freeConn.fadeState = 'fadingIn'
                      freeConn.fadeStartTime = now
                      freeConn.sourceNodeIndex = a.idx
                      freeConn.targetNodeIndex = b.idx
                      freeConn.growState = CONFIG.dynamicConnections.growDuration > 0 ? 'growing' : 'active'
                      freeConn.growStartTime = now

                      const connIndex = lConns.indexOf(freeConn)
                      a.ln.connections.push(connIndex)
                      b.ln.connections.push(connIndex)

                      if (CONFIG.degreeLimit.enabled) {
                        a.ln.currentDegree = Math.min(a.ln.desiredDegree, a.ln.currentDegree + 1)
                        b.ln.currentDegree = Math.min(b.ln.desiredDegree, b.ln.currentDegree + 1)
                      }
                    }
                  }
                }
              }
            }
          }
        }

        // ─────────────────────────────────────────────────────────────────────
        // 🔄 UPDATE: State Machine für jeden aktiven Node
        // ─────────────────────────────────────────────────────────────────────
        lNodes.forEach(node => {
          if (node.state === 'dormant') return

          const elapsed = now - node.stateStartTime

          // 🌬️ DRIFT: sanft zur Zielposition während Fading In
          if (CONFIG.spawnDrift.enabled && node.driftTarget && node.driftStart && node.driftStartTime != null) {
            const driftProgress = Math.min(1, (now - node.driftStartTime) / CONFIG.spawnDrift.duration)
            const easedDrift = driftProgress * driftProgress * (3 - 2 * driftProgress)
            node.mesh.position.lerpVectors(node.driftStart, node.driftTarget, easedDrift)
          }

          // 📈 FADING IN: Opacity 0 → neuronOpacity (ease-in-out)
          if (node.state === 'fadingIn') {
            const progress = Math.min(1, elapsed / fadeInDuration)
            // Ease-in-out: 3t² - 2t³ (smoothstep)
            const eased = progress * progress * (3 - 2 * progress)
            node.material.opacity = neuronOpacity * eased * 1.5 // Etwas heller als statische

            if (progress >= 1) {
              // 🔄 State Transition: fadingIn → alive
              node.state = 'alive'
              node.stateStartTime = now
            }
          }

          // ⏱️ ALIVE: Warte auf Lifespan-Ende
          else if (node.state === 'alive') {
            // Halte volle Opacity mit leichtem Pulsieren
            const pulse = Math.sin(now * 0.002) * 0.1
            node.material.opacity = neuronOpacity * (1.4 + pulse)

            // Prüfe ob Lifespan abgelaufen UND genug Transition-Slots frei
            if (elapsed > node.targetLifespan && transitionCount < maxConcurrentTransitions) {
              // 🔄 State Transition: alive → fadingOut
              node.state = 'fadingOut'
              node.stateStartTime = now

              // 🔗 Starte Connection Fade-Out
              if (enableDynamicConnections) {
                node.connections.forEach(connIdx => {
                  const conn = lConns[connIdx]
                  if (conn && conn.active) {
                    conn.fadeState = 'fadingOut'
                    conn.fadeStartTime = now
                  }
                })
              }
            }
          }

          // 📉 FADING OUT: Opacity → 0 (ease-in-out)
          else if (node.state === 'fadingOut') {
            const progress = Math.min(1, elapsed / fadeOutDuration)
            const eased = progress * progress * (3 - 2 * progress)
            node.material.opacity = neuronOpacity * 1.4 * (1 - eased)

            if (progress >= 1) {
              // 🔄 State Transition: fadingOut → dormant (recycled)
              node.state = 'dormant'
              node.material.opacity = 0
              node.mesh.position.set(100, 100, 100) // Außerhalb sichtbarer Bereich
              node.connections = []
              node.currentDegree = 0
            }
          }
        })

        // ─────────────────────────────────────────────────────────────────────
        // 🔗 UPDATE: Connection Fade-Animationen + Endpoint-Validierung
        // ─────────────────────────────────────────────────────────────────────
        // WICHTIG: Connection nur gültig, wenn beide Lifecycle-Endpunkte existieren
        if (enableDynamicConnections) {
          let growingCount = 0
          lConns.forEach(conn => {
            if (!conn.active) return

            const sourceNode = lNodes[conn.sourceNodeIndex]
            const sourceValid = sourceNode && (sourceNode.state === 'alive' || sourceNode.state === 'fadingIn')

            const targetNode = conn.targetNodeIndex >= 0 ? lNodes[conn.targetNodeIndex] : undefined
            const targetValid = targetNode && (targetNode.state === 'alive' || targetNode.state === 'fadingIn')

            if ((!sourceValid || !targetValid) && conn.fadeState !== 'fadingOut') {
              conn.fadeState = 'fadingOut'
              conn.fadeStartTime = now
            }

            const elapsed = now - conn.fadeStartTime

            // 🌱 GROW: Längenwachstum der Connection
            if (conn.growState === 'growing') {
              growingCount++
              const growFactor = Math.min(1, (now - conn.growStartTime) / CONFIG.dynamicConnections.growDuration)
              const easedGrow = growFactor * growFactor * (3 - 2 * growFactor)

              if (sourceNode && targetNode) {
                const positions = conn.line.geometry.attributes.position as THREE.BufferAttribute
                const srcPos = sourceNode.mesh.position
                const tgtPos = targetNode.mesh.position
                positions.setXYZ(0, srcPos.x, srcPos.y, srcPos.z)
                positions.setXYZ(
                  1,
                  srcPos.x + (tgtPos.x - srcPos.x) * easedGrow,
                  srcPos.y + (tgtPos.y - srcPos.y) * easedGrow,
                  srcPos.z + (tgtPos.z - srcPos.z) * easedGrow
                )
                positions.needsUpdate = true
              }

              if (growFactor >= 1 || growingCount > CONFIG.dynamicConnections.maxConcurrentGrows) {
                conn.growState = 'active'
              }
            } else if (conn.growState === 'active') {
              // halte die Geometrie an den aktuellen Node-Positionen
              if (sourceNode && targetNode) {
                const positions = conn.line.geometry.attributes.position as THREE.BufferAttribute
                const srcPos = sourceNode.mesh.position
                const tgtPos = targetNode.mesh.position
                positions.setXYZ(0, srcPos.x, srcPos.y, srcPos.z)
                positions.setXYZ(1, tgtPos.x, tgtPos.y, tgtPos.z)
                positions.needsUpdate = true
              }
            }

            if (conn.fadeState === 'fadingIn') {
              const progress = Math.min(1, elapsed / connFadeIn)
              const eased = progress * progress * (3 - 2 * progress)
              conn.material.opacity = lineOpacity * 1.5 * eased

              if (progress >= 1) {
                conn.fadeState = 'none'
              }
            } else if (conn.fadeState === 'fadingOut') {
              const progress = Math.min(1, elapsed / connFadeOut)
              const eased = progress * progress * (3 - 2 * progress)
              conn.material.opacity = lineOpacity * 1.5 * (1 - eased)

              if (progress >= 1) {
                // 🔄 Recycle Connection - alle Referenzen zurücksetzen
                conn.active = false
                conn.fadeState = 'none'
                conn.material.opacity = 0
                conn.sourceNodeIndex = -1
                conn.targetNodeIndex = -1
                conn.growState = 'none'
                conn.growStartTime = 0

                // Degree zurücksetzen, wenn Limit aktiv
                if (CONFIG.degreeLimit.enabled) {
                  const s = sourceNode
                  const t = targetNode
                  if (s) s.currentDegree = Math.max(0, s.currentDegree - 1)
                  if (t) t.currentDegree = Math.max(0, t.currentDegree - 1)
                }
              }
            }
          })
        }
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🌊 NEURON EFFECTS: Multi-Wave + Burst + Mouse + Depth Fog
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      neurons.children.forEach((n, i) => {
        const mesh = n as THREE.Mesh
        const mat = neuronMaterials[i]
        if (!mat) return

        const pos = mesh.position

        // 🌫️ DEPTH FOG
        let depthFactor = 1
        if (CONFIG.depthFog.enabled) {
          const z = mesh.userData.baseZ as number
          const { near, far, minOpacity } = CONFIG.depthFog
          const normalizedZ = Math.max(0, Math.min(1, (z - far) / (near - far)))
          depthFactor = minOpacity + normalizedZ * (1 - minOpacity)
        }

        // 🌊 MULTI-WAVE: Überlagerte Wellen
        let waveEffect = 0
        if (enableMultiWave) {
          CONFIG.multiWave.waves.forEach(wave => {
            const dirLen = Math.sqrt(wave.direction.x ** 2 + wave.direction.y ** 2)
            const dirX = wave.direction.x / dirLen
            const dirY = wave.direction.y / dirLen
            const projectedPos = pos.x * dirX + pos.y * dirY
            const phase = projectedPos * wave.frequency + time * wave.speed
            waveEffect += Math.sin(phase) * wave.amplitude
          })
        }

        // ⚡ BURST EFFECT
        let burstEffect = 0
        if (enableBurst && burstRef.current.active) {
          const burst = burstRef.current
          const { duration, radius, intensity } = CONFIG.burst
          const dx = pos.x - burst.x
          const dy = pos.y - burst.y
          const dz = pos.z - burst.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const progress = (now - burst.startTime) / duration
          // Radiale Expansion + Fade-out
          const effectiveRadius = radius * progress
          if (dist < effectiveRadius) {
            const proximityFactor = 1 - dist / effectiveRadius
            const fadeOut = 1 - progress
            burstEffect = proximityFactor * fadeOut * intensity
          }
        }

        // ⚡ MICRO BURST EFFECT (kurz und lokal)
        let microBurstEffect = 0
        if (CONFIG.microBurst.enabled && microBurstRef.current.active) {
          const mb = microBurstRef.current
          const { duration, radius, intensity } = CONFIG.microBurst
          const dx = pos.x - mb.x
          const dy = pos.y - mb.y
          const dz = pos.z - mb.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const progress = (now - mb.startTime) / duration
          const effectiveRadius = radius * Math.max(0.3, 1 - progress * 0.3)
          if (dist < effectiveRadius) {
            const proximityFactor = 1 - dist / effectiveRadius
            const fadeOut = 1 - progress
            microBurstEffect = proximityFactor * fadeOut * intensity
          }
        }

        // 🖱️ MOUSE EFFECT
        let mouseEffect = 0
        if (enableMouse) {
          const { radius, intensity } = CONFIG.mouse
          const mouseX = mouseRef.current.x
          const mouseY = mouseRef.current.y
          const dx = pos.x - mouseX
          const dy = pos.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < radius) {
            mouseEffect = (1 - dist / radius) * intensity
          }
        }

        // Kombiniere alle Effekte
        mat.opacity = Math.min(
          1,
          neuronOpacity * (1 + waveEffect + burstEffect + microBurstEffect + mouseEffect) * depthFactor
        )
      })

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📡 CONNECTION EFFECTS: Data Flow + Burst + Mouse + Depth Fog
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const { waveSpeed: flowWaveSpeed, waveWidth, glowIntensity, direction } = CONFIG.dataFlow
      const flowDirLen = Math.sqrt(direction.x ** 2 + direction.y ** 2)
      const flowDirX = direction.x / flowDirLen
      const flowDirY = direction.y / flowDirLen
      const wavePosition = ((time * flowWaveSpeed * 10) % 40) - 20

      connectionMaterials.forEach((mat, i) => {
        const data = connectionData[i]
        if (!data) return

        // 🌫️ DEPTH FOG
        let depthFactor = 1
        if (CONFIG.depthFog.enabled) {
          const { near, far, minOpacity } = CONFIG.depthFog
          const normalizedZ = Math.max(0, Math.min(1, (data.midZ - far) / (near - far)))
          depthFactor = minOpacity + normalizedZ * (1 - minOpacity)
        }

        // 📡 DATA FLOW WAVE
        let flowEffect = 0
        if (CONFIG.dataFlow.enabled && mode !== 'reduced') {
          const projectedPos = data.midX * flowDirX + data.midY * flowDirY
          const distanceToWave = Math.abs(projectedPos - wavePosition)
          if (distanceToWave < waveWidth) {
            flowEffect = (1 - distanceToWave / waveWidth) * glowIntensity
          }
        }

        // ⚡ BURST EFFECT
        let burstEffect = 0
        if (enableBurst && burstRef.current.active) {
          const burst = burstRef.current
          const { duration, radius, intensity } = CONFIG.burst
          const dx = data.midX - burst.x
          const dy = data.midY - burst.y
          const dz = data.midZ - burst.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const progress = (now - burst.startTime) / duration
          const effectiveRadius = radius * progress
          if (dist < effectiveRadius) {
            const proximityFactor = 1 - dist / effectiveRadius
            const fadeOut = 1 - progress
            burstEffect = proximityFactor * fadeOut * intensity
          }
        }

        // ⚡ MICRO BURST EFFECT
        let microBurstEffect = 0
        if (CONFIG.microBurst.enabled && microBurstRef.current.active) {
          const mb = microBurstRef.current
          const { duration, radius, intensity } = CONFIG.microBurst
          const dx = data.midX - mb.x
          const dy = data.midY - mb.y
          const dz = data.midZ - mb.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          const progress = (now - mb.startTime) / duration
          const effectiveRadius = radius * Math.max(0.3, 1 - progress * 0.3)
          if (dist < effectiveRadius) {
            const proximityFactor = 1 - dist / effectiveRadius
            const fadeOut = 1 - progress
            microBurstEffect = proximityFactor * fadeOut * intensity
          }
        }

        // 🖱️ MOUSE EFFECT
        let mouseEffect = 0
        if (enableMouse) {
          const { radius, intensity } = CONFIG.mouse
          const mouseX = mouseRef.current.x
          const mouseY = mouseRef.current.y
          const dx = data.midX - mouseX
          const dy = data.midY - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < radius) {
            mouseEffect = (1 - dist / radius) * intensity
          }
        }

        // Kombiniere alle Effekte
        mat.opacity = Math.min(
          1,
          lineOpacity *
            CONFIG.contrast.lineOpacityBoost *
            (1 + flowEffect + burstEffect + microBurstEffect + mouseEffect) *
            depthFactor
        )
      })

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

    // 🖱️ Mouse-Handler (nur Desktop, nur wenn enableMouse)
    // Verwendet window statt mount, weil mount pointer-events-none hat
    const onMouseMove = (e: MouseEvent) => {
      if (!enableMouse) return
      // Konvertiere Screen-Coords zu 3D-World-Coords (vereinfacht)
      const rect = mount.getBoundingClientRect()
      // Nur reagieren wenn Maus im Hero-Bereich
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        return
      }
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      // Skaliere auf Scene-Koordinaten (Camera ist bei z=12, FOV=60)
      mouseRef.current.targetX = x * 12
      mouseRef.current.targetY = y * 8
    }
    if (enableMouse) {
      window.addEventListener('mousemove', onMouseMove)
    }

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
      if (enableMouse) window.removeEventListener('mousemove', onMouseMove)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)

      // Dispose geometry (shared)
      neuronGeo.dispose()

      // Dispose individual neuron materials
      neuronMaterials.forEach(mat => mat.dispose())

      // Dispose connection geometries & materials
      connections.children.forEach((c, i) => {
        const line = c as THREE.Line
        line.geometry?.dispose?.()
        connectionMaterials[i]?.dispose?.()
      })

      // 🌱 Dispose lifecycle nodes pool
      lifecycleNodesRef.current.forEach(node => {
        node.material?.dispose?.()
      })
      lifecycleNodesRef.current = []

      // 🔗 Dispose lifecycle connections pool
      lifecycleConnectionsRef.current.forEach(conn => {
        conn.line.geometry?.dispose?.()
        conn.material?.dispose?.()
      })
      lifecycleConnectionsRef.current = []

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
