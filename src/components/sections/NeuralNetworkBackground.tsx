import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/contexts/ThemeContext'

interface NeuralNetworkBackgroundProps {
  className?: string
}

const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  // Avoid React state to prevent rerenders; use ref for mouse
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)
  const activeRef = useRef(true)
  const { theme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return

    const currentMount = mountRef.current

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / currentMount.clientWidth) * 2 - 1
      const y = -(((event.clientY - rect.top) / currentMount.clientHeight) * 2 - 1)
      mouseRef.current.x = x
      mouseRef.current.y = y
    }

    currentMount.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Respect reduced motion and low-power environments
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const deviceMemory = (navigator as any)?.deviceMemory as number | undefined
    const lowPowerDevice = typeof deviceMemory === 'number' ? deviceMemory <= 4 : false

    // Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: !lowPowerDevice, alpha: true, powerPreference: lowPowerDevice ? 'low-power' : 'high-performance' })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    const cappedDpr = Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1.25 : 1.75)
    renderer.setPixelRatio(prefersReduced ? 1 : cappedDpr)
    renderer.setClearColor(0x000000, 0) // Transparent background
    currentMount.appendChild(renderer.domElement)

    // Neural Network Setup - Theme-aware colors
    // Use brand turquoise in both themes; slightly calmer in light to avoid harshness
    const turquoiseColor = theme === 'dark' ? 0x00ffa5 : 0x00d3a1
    const neurons = new THREE.Group()
    const neuronGeometry = new THREE.SphereGeometry(0.03, 8, 6)
    const neuronMaterial = new THREE.MeshBasicMaterial({ 
      color: turquoiseColor,
      transparent: true,
      opacity: 0.6 
    })

    // Connection Lines
    const connections = new THREE.Group()
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: turquoiseColor,
      transparent: true, 
      opacity: 0.2 
    })

    // Particle System
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = prefersReduced ? 0 : (lowPowerDevice ? 50 : 80)
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 15
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      color: turquoiseColor,
      size: 1,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    })
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)

    // Create Neurons
    const neuronPositions: THREE.Vector3[] = []
    const neuronCount = prefersReduced ? 60 : (lowPowerDevice ? 90 : 120)
    for (let i = 0; i < neuronCount; i++) {
      const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial.clone())
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10
      )
      neuron.position.copy(position)
      neuronPositions.push(position)
      neurons.add(neuron)
    }

    // Create Connections
    for (let i = 0; i < neuronPositions.length; i++) {
      for (let j = i + 1; j < neuronPositions.length; j++) {
        if (Math.random() > (prefersReduced ? 0.985 : 0.96)) {
          const distance = neuronPositions[i].distanceTo(neuronPositions[j])
          if (distance < (prefersReduced ? 3.2 : 4)) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              neuronPositions[i],
              neuronPositions[j]
            ])
            const line = new THREE.Line(geometry, lineMaterial.clone())
            ;(line.userData as { midpoint?: THREE.Vector3 }).midpoint =
              new THREE.Vector3()
                .addVectors(neuronPositions[i], neuronPositions[j])
                .multiplyScalar(0.5)
            connections.add(line)
          }
        }
      }
    }

    scene.add(neurons)
    scene.add(connections)
    scene.add(particleSystem)
    camera.position.z = 12

    // Animation Loop
    const animate = () => {
      if (!activeRef.current) return
      frameRef.current = requestAnimationFrame(animate)
      const mouse = mouseRef.current
      
      // Mouse-responsive camera movement
      const targetX = mouse.x * 2.5
      const targetY = mouse.y * 1.5
      
      camera.position.x += (targetX - camera.position.x) * 0.04
      camera.position.y += (targetY - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)
      
      // Rotation
      const mouseActivity = Math.abs(mouse.x) + Math.abs(mouse.y)
      const mouseInfluence = prefersReduced ? 0.3 : (1 + mouseActivity * 0.8)
      const baseRotX = prefersReduced ? 0.0007 : 0.002
      const baseRotY = prefersReduced ? 0.0009 : 0.003
      neurons.rotation.x += baseRotX * mouseInfluence
      neurons.rotation.y += baseRotY * mouseInfluence
      connections.rotation.x += baseRotX * mouseInfluence
      connections.rotation.y += baseRotY * mouseInfluence
      
      // Particle System Rotation
      if (particleCount > 0) {
        particleSystem.rotation.y += (prefersReduced ? 0.001 : 0.005) + mouseActivity * (prefersReduced ? 0.002 : 0.01)
        particleSystem.rotation.x += (prefersReduced ? 0.0006 : 0.003) + mouseActivity * (prefersReduced ? 0.001 : 0.005)
      }
      
      // Pulsing Neurons
      const time = Date.now() * 0.001
      neurons.children.forEach((neuron, index) => {
        const mesh = neuron as THREE.Mesh
        const material = mesh.material as THREE.MeshBasicMaterial
        
        const neuronPos = mesh.position.clone().project(camera)
        const mouseDistance = Math.sqrt(
          Math.pow(neuronPos.x - mouse.x, 2) + 
          Math.pow(neuronPos.y - mouse.y, 2)
        )
        
        const magneticForce = prefersReduced ? 0 : Math.max(0, 1 - mouseDistance / 1.2)
        const pulse = Math.sin(time + index * 0.1) * (prefersReduced ? 0.08 : 0.15)
        
        material.opacity = 0.4 + pulse + magneticForce * (prefersReduced ? 0.15 : 0.3)
        
        const scale = 1 + pulse * 0.1 + magneticForce * (prefersReduced ? 0.1 : 0.2)
        mesh.scale.setScalar(scale)
      })

      // Connection opacity with cursor highlight
      connections.children.forEach((connection) => {
        const line = connection as THREE.Line
        const material = line.material as THREE.LineBasicMaterial
        const mouseActivity = Math.abs(mouse.x) + Math.abs(mouse.y)
        const mid = (line.userData as { midpoint: THREE.Vector3 }).midpoint
        const screenMid = mid.clone().project(camera)
        const dist = Math.sqrt(
          Math.pow(screenMid.x - mouse.x, 2) +
          Math.pow(screenMid.y - mouse.y, 2)
        )
        const highlight = prefersReduced ? 0 : Math.max(0, 1 - dist / 0.5)
        material.opacity = 0.15 + mouseActivity * (prefersReduced ? 0.05 : 0.2) + highlight * (prefersReduced ? 0.2 : 0.6)
      })

      renderer.render(scene, camera)
    }

    // Start/stop with page visibility for battery/perf
    const onVisibility = () => {
      activeRef.current = document.visibilityState === 'visible'
      if (activeRef.current && frameRef.current == null) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Kick off loop if not reduced
    if (!prefersReduced) {
      frameRef.current = requestAnimationFrame(animate)
    }

    // Handle Resize
    const handleResize = () => {
      if (!currentMount) return
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (currentMount) currentMount.removeEventListener('mousemove', handleMouseMove)
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current)
      // Dispose resources to avoid GPU/CPU leaks
      try {
        neurons.children.forEach((n) => {
          const mesh = n as THREE.Mesh
          ;(mesh.geometry as THREE.BufferGeometry)?.dispose?.()
          const mat = mesh.material as THREE.Material | THREE.Material[]
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
          else mat?.dispose?.()
        })
        connections.children.forEach((c) => {
          const line = c as THREE.Line
          ;(line.geometry as THREE.BufferGeometry)?.dispose?.()
          const mat = line.material as THREE.Material | THREE.Material[]
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
          else mat?.dispose?.()
        })
        particleGeometry?.dispose?.()
        particleMaterial?.dispose?.()
        renderer?.dispose?.()
      } catch {}
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement)
    }
    // Recreate on theme changes to update colors
  }, [theme])

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{}}
    />
  )
}

export default NeuralNetworkBackground
