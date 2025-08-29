import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/contexts/ThemeContext'

interface NeuralNetworkBackgroundProps {
  className?: string
}

const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return

    const currentMount = mountRef.current

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / currentMount.clientWidth) * 2 - 1
      const y = -(((event.clientY - rect.top) / currentMount.clientHeight) * 2 - 1)
      setMousePosition({ x, y })
    }

    currentMount.addEventListener('mousemove', handleMouseMove)

    let frameId: number

    // Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0) // Transparent background
    currentMount.appendChild(renderer.domElement)

    // Neural Network Setup - Theme-aware colors
    const turquoiseColor = theme === 'dark' ? 0x00ffa5 : 0x006b4a // Darker turquoise for light mode
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
    const particleCount = 80
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
    for (let i = 0; i < 120; i++) {
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
        if (Math.random() > 0.96) {
          const distance = neuronPositions[i].distanceTo(neuronPositions[j])
          if (distance < 4) {
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
      frameId = requestAnimationFrame(animate)
      
      // Mouse-responsive camera movement
      const targetX = mousePosition.x * 2.5
      const targetY = mousePosition.y * 1.5
      
      camera.position.x += (targetX - camera.position.x) * 0.04
      camera.position.y += (targetY - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)
      
      // Rotation
      const mouseActivity = Math.abs(mousePosition.x) + Math.abs(mousePosition.y)
      const mouseInfluence = 1 + mouseActivity * 0.8
      neurons.rotation.x += 0.002 * mouseInfluence
      neurons.rotation.y += 0.003 * mouseInfluence
      connections.rotation.x += 0.002 * mouseInfluence
      connections.rotation.y += 0.003 * mouseInfluence
      
      // Particle System Rotation
      particleSystem.rotation.y += 0.005 + mouseActivity * 0.01
      particleSystem.rotation.x += 0.003 + mouseActivity * 0.005
      
      // Pulsing Neurons
      const time = Date.now() * 0.001
      neurons.children.forEach((neuron, index) => {
        const mesh = neuron as THREE.Mesh
        const material = mesh.material as THREE.MeshBasicMaterial
        
        const neuronPos = mesh.position.clone().project(camera)
        const mouseDistance = Math.sqrt(
          Math.pow(neuronPos.x - mousePosition.x, 2) + 
          Math.pow(neuronPos.y - mousePosition.y, 2)
        )
        
        const magneticForce = Math.max(0, 1 - mouseDistance / 1.2)
        const pulse = Math.sin(time + index * 0.1) * 0.15
        
        material.opacity = 0.4 + pulse + magneticForce * 0.3
        
        const scale = 1 + pulse * 0.1 + magneticForce * 0.2
        mesh.scale.setScalar(scale)
      })

      // Connection opacity with cursor highlight
      connections.children.forEach((connection) => {
        const line = connection as THREE.Line
        const material = line.material as THREE.LineBasicMaterial
        const mouseActivity = Math.abs(mousePosition.x) + Math.abs(mousePosition.y)
        const mid = (line.userData as { midpoint: THREE.Vector3 }).midpoint
        const screenMid = mid.clone().project(camera)
        const dist = Math.sqrt(
          Math.pow(screenMid.x - mousePosition.x, 2) +
          Math.pow(screenMid.y - mousePosition.y, 2)
        )
        const highlight = Math.max(0, 1 - dist / 0.5)
        material.opacity = 0.15 + mouseActivity * 0.2 + highlight * 0.6
      })

      renderer.render(scene, camera)
    }

    animate()

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
      if (currentMount) {
        currentMount.removeEventListener('mousemove', handleMouseMove)
      }
      cancelAnimationFrame(frameId)
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement)
      }
    }
  }, [mousePosition.x, mousePosition.y])

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}

export default NeuralNetworkBackground
