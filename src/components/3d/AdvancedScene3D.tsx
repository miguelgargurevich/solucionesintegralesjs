'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  Environment,
  Sparkles,
  Line,
  Text,
  useTexture
} from '@react-three/drei'
import * as THREE from 'three'

// ============================================
// HOLOGRAPHIC GRID FLOOR
// ============================================
function HolographicGrid() {
  const gridRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (gridRef.current) {
      // Subtle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      gridRef.current.scale.set(scale, 1, scale)
    }
  })

  const gridLines = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number]; color: string }[] = []
    const size = 20
    const divisions = 40
    const step = size / divisions
    
    // Horizontal lines
    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      const opacity = Math.abs(i) < 5 ? 0.4 : 0.15
      lines.push({
        start: [-size / 2, 0, i * step],
        end: [size / 2, 0, i * step],
        color: i === 0 ? '#FFC300' : '#0056A6'
      })
    }
    
    // Vertical lines
    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      lines.push({
        start: [i * step, 0, -size / 2],
        end: [i * step, 0, size / 2],
        color: i === 0 ? '#FFC300' : '#0056A6'
      })
    }
    
    return lines
  }, [])

  return (
    <group ref={gridRef} position={[0, -4, 0]}>
      {gridLines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color={line.color}
          lineWidth={line.color === '#FFC300' ? 2 : 0.5}
          transparent
          opacity={line.color === '#FFC300' ? 0.6 : 0.2}
        />
      ))}
    </group>
  )
}

// ============================================
// TECH CUBE WIREFRAME
// ============================================
function TechCube({ position, size = 1, rotationSpeed = 0.5 }: { 
  position: [number, number, number]
  size?: number
  rotationSpeed?: number 
}) {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.3
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.5
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.elapsedTime * rotationSpeed * 0.8
      innerRef.current.rotation.y = -state.clock.elapsedTime * rotationSpeed * 0.6
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Outer cube */}
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshBasicMaterial color="#0056A6" wireframe transparent opacity={0.6} />
        </mesh>
        {/* Inner cube */}
        <mesh ref={innerRef}>
          <boxGeometry args={[size * 0.6, size * 0.6, size * 0.6]} />
          <meshBasicMaterial color="#FFC300" wireframe transparent opacity={0.8} />
        </mesh>
        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[size * 0.15, 16, 16]} />
          <meshBasicMaterial color="#FFC300" />
        </mesh>
      </group>
    </Float>
  )
}

// ============================================
// CIRCUIT BOARD PATTERN
// ============================================
function CircuitPattern() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  const circuits = useMemo(() => {
    const paths: [number, number, number][][] = []
    
    // Generate circuit-like paths
    for (let i = 0; i < 15; i++) {
      const startX = (Math.random() - 0.5) * 8
      const startY = (Math.random() - 0.5) * 8
      const path: [number, number, number][] = [[startX, startY, 0]]
      
      let currentX = startX
      let currentY = startY
      
      for (let j = 0; j < 5; j++) {
        const direction = Math.random() > 0.5
        if (direction) {
          currentX += (Math.random() - 0.5) * 2
        } else {
          currentY += (Math.random() - 0.5) * 2
        }
        path.push([currentX, currentY, 0])
      }
      
      paths.push(path)
    }
    
    return paths
  }, [])

  const nodes = useMemo(() => {
    const n: [number, number, number][] = []
    circuits.forEach(circuit => {
      circuit.forEach(point => {
        if (Math.random() > 0.6) {
          n.push(point)
        }
      })
    })
    return n
  }, [circuits])

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {circuits.map((path, i) => (
        <Line
          key={i}
          points={path}
          color="#0056A6"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#FFC300" />
        </mesh>
      ))}
    </group>
  )
}

// ============================================
// MORPHING BLOB
// ============================================
function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null)
  const originalPositions = useRef<Float32Array | null>(null)
  
  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const positions = geometryRef.current.attributes.position
      const time = state.clock.elapsedTime
      
      if (!originalPositions.current) {
        originalPositions.current = positions.array.slice() as Float32Array
      }
      
      for (let i = 0; i < positions.count; i++) {
        const x = originalPositions.current[i * 3]
        const y = originalPositions.current[i * 3 + 1]
        const z = originalPositions.current[i * 3 + 2]
        
        const noise = Math.sin(x * 2 + time) * 0.1 + 
                     Math.cos(y * 2 + time * 1.3) * 0.1 + 
                     Math.sin(z * 2 + time * 0.7) * 0.1
        
        const length = Math.sqrt(x * x + y * y + z * z)
        const factor = 1 + noise
        
        positions.setXYZ(
          i,
          (x / length) * length * factor,
          (y / length) * length * factor,
          (z / length) * length * factor
        )
      }
      positions.needsUpdate = true
      geometryRef.current.computeVertexNormals()
      
      meshRef.current.rotation.y = time * 0.2
      meshRef.current.rotation.x = time * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[5, 0, 0]}>
        <icosahedronGeometry ref={geometryRef} args={[1.5, 4]} />
        <meshBasicMaterial 
          color="#0056A6" 
          wireframe 
          transparent 
          opacity={0.5}
        />
      </mesh>
    </Float>
  )
}

// ============================================
// SINE WAVE RIBBONS
// ============================================
function SineWaveRibbons() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.x = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.5) * 0.3
      })
    }
  })

  const ribbons = useMemo(() => {
    const r: { points: [number, number, number][]; color: string }[] = []
    
    for (let ribbon = 0; ribbon < 5; ribbon++) {
      const points: [number, number, number][] = []
      const yOffset = (ribbon - 2) * 1.5
      
      for (let i = 0; i <= 100; i++) {
        const t = i / 100
        const x = (t - 0.5) * 10
        const y = Math.sin(t * Math.PI * 4 + ribbon) * 0.5 + yOffset
        const z = Math.cos(t * Math.PI * 2) * 2
        points.push([x, y, z])
      }
      
      r.push({
        points,
        color: ribbon % 2 === 0 ? '#0056A6' : '#FFC300'
      })
    }
    
    return r
  }, [])

  return (
    <group ref={groupRef} position={[-5, 0, 0]}>
      {ribbons.map((ribbon, i) => (
        <Line
          key={i}
          points={ribbon.points}
          color={ribbon.color}
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  )
}

// ============================================
// CONSTELLATION NETWORK
// ============================================
function ConstellationNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const { stars, connections } = useMemo(() => {
    const s: { pos: [number, number, number]; size: number }[] = []
    const c: [[number, number, number], [number, number, number]][] = []
    
    // Generate star positions
    for (let i = 0; i < 30; i++) {
      s.push({
        pos: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12
        ],
        size: Math.random() * 0.05 + 0.02
      })
    }
    
    // Generate connections between nearby stars
    for (let i = 0; i < s.length; i++) {
      for (let j = i + 1; j < s.length; j++) {
        const dist = Math.sqrt(
          Math.pow(s[i].pos[0] - s[j].pos[0], 2) +
          Math.pow(s[i].pos[1] - s[j].pos[1], 2) +
          Math.pow(s[i].pos[2] - s[j].pos[2], 2)
        )
        if (dist < 4 && Math.random() > 0.5) {
          c.push([s[i].pos, s[j].pos])
        }
      }
    }
    
    return { stars: s, connections: c }
  }, [])

  return (
    <group ref={groupRef} position={[0, 2, -3]}>
      {/* Stars */}
      {stars.map((star, i) => (
        <mesh key={`star-${i}`} position={star.pos}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#FFC300' : '#0056A6'} />
        </mesh>
      ))}
      {/* Connections */}
      {connections.map((conn, i) => (
        <Line
          key={`conn-${i}`}
          points={conn}
          color="#0056A6"
          lineWidth={0.5}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  )
}

// ============================================
// PULSING RINGS
// ============================================
function PulsingRings() {
  const rings = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (rings.current) {
      rings.current.children.forEach((ring, i) => {
        const mesh = ring as THREE.Mesh
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 - i * 0.3) * 0.1
        mesh.scale.set(scale, scale, 1)
        const material = mesh.material as THREE.MeshBasicMaterial
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 - i * 0.3) * 0.2
      })
    }
  })

  return (
    <group ref={rings} position={[0, 0, 0]}>
      {[1, 1.5, 2, 2.5, 3].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.02, radius, 64]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? '#0056A6' : '#FFC300'} 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// ============================================
// ANIMATED AXES
// ============================================
function AnimatedAxes() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1
      groupRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* X axis */}
      <Line points={[[-5, 0, 0], [5, 0, 0]]} color="#FF4444" lineWidth={1} transparent opacity={0.3} />
      {/* Y axis */}
      <Line points={[[0, -5, 0], [0, 5, 0]]} color="#44FF44" lineWidth={1} transparent opacity={0.3} />
      {/* Z axis */}
      <Line points={[[0, 0, -5], [0, 0, 5]]} color="#4444FF" lineWidth={1} transparent opacity={0.3} />
    </group>
  )
}

// ============================================
// ADVANCED CAMERA RIG
// ============================================
function AdvancedCameraRig() {
  const { camera, mouse } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Base orbit
    const baseX = Math.sin(t * 0.1) * 3
    const baseY = Math.cos(t * 0.08) * 2 + 3
    const baseZ = 12 + Math.sin(t * 0.05) * 3
    
    // Mouse influence
    const mouseInfluence = 2
    const targetX = baseX + mouse.x * mouseInfluence
    const targetY = baseY + mouse.y * mouseInfluence
    
    // Smooth interpolation
    camera.position.x += (targetX - camera.position.x) * 0.02
    camera.position.y += (targetY - camera.position.y) * 0.02
    camera.position.z += (baseZ - camera.position.z) * 0.02
    
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ============================================
// LOADING COMPONENT
// ============================================
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#0056A6" wireframe />
    </mesh>
  )
}

// ============================================
// MAIN ADVANCED SCENE EXPORT
// ============================================
export default function AdvancedScene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 3, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#0F1115']} />
        <fog attach="fog" args={['#0F1115', 10, 35]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#0056A6" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#FFC300" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" />
        
        <Suspense fallback={<LoadingFallback />}>
          {/* Camera with mouse interaction */}
          <AdvancedCameraRig />
          
          {/* Holographic grid floor */}
          <HolographicGrid />
          
          {/* Tech cubes */}
          <TechCube position={[-3, 1, 2]} size={1.2} rotationSpeed={0.4} />
          <TechCube position={[3, -1, -2]} size={0.8} rotationSpeed={0.6} />
          <TechCube position={[0, 2, -1]} size={1} rotationSpeed={0.5} />
          
          {/* Circuit pattern background */}
          <CircuitPattern />
          
          {/* Morphing blob */}
          <MorphingBlob />
          
          {/* Sine wave ribbons */}
          <SineWaveRibbons />
          
          {/* Constellation network */}
          <ConstellationNetwork />
          
          {/* Pulsing rings */}
          <PulsingRings />
          
          {/* Animated axes */}
          <AnimatedAxes />
          
          {/* Sparkles */}
          <Sparkles
            count={300}
            scale={20}
            size={1.5}
            speed={0.2}
            color="#FFC300"
            opacity={0.4}
          />
          
          {/* Environment */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
