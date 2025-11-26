'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float,
  Stars,
  Line,
} from '@react-three/drei'
import * as THREE from 'three'

// ============================================
// PARAMETRIC SURFACE - SUPERFICIE MATEMÁTICA
// ============================================
function ParametricWave() {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometryRef = useRef<THREE.PlaneGeometry>(null)
  
  useFrame((state) => {
    if (meshRef.current && geometryRef.current) {
      const positions = geometryRef.current.attributes.position
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = Math.sin(x * 2 + time) * 0.3 + Math.cos(y * 2 + time) * 0.3
        positions.setZ(i, z)
      }
      positions.needsUpdate = true
      geometryRef.current.computeVertexNormals()
      
      meshRef.current.rotation.x = -Math.PI / 3
      meshRef.current.rotation.z = time * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -3, 0]}>
      <planeGeometry ref={geometryRef} args={[12, 12, 40, 40]} />
      <meshBasicMaterial 
        color="#0056A6" 
        wireframe 
        transparent 
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ============================================
// WIREFRAME GEAR - Engranaje en alambre (EL QUE TE GUSTÓ)
// ============================================
function WireframeGear({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed
    }
  })

  const gearPoints = useMemo(() => {
    const points: [number, number, number][] = []
    const teeth = 12
    const innerRadius = 1
    const outerRadius = 1.4
    
    for (let i = 0; i <= teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2
      const angle2 = ((i + 0.3) / teeth) * Math.PI * 2
      const angle3 = ((i + 0.5) / teeth) * Math.PI * 2
      const angle4 = ((i + 0.8) / teeth) * Math.PI * 2
      
      points.push([Math.cos(angle1) * innerRadius, Math.sin(angle1) * innerRadius, 0])
      points.push([Math.cos(angle2) * outerRadius, Math.sin(angle2) * outerRadius, 0])
      points.push([Math.cos(angle3) * outerRadius, Math.sin(angle3) * outerRadius, 0])
      points.push([Math.cos(angle4) * innerRadius, Math.sin(angle4) * innerRadius, 0])
    }
    
    return points
  }, [])

  const innerCircle = useMemo(() => {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2
      points.push([Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, 0])
    }
    return points
  }, [])

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        <Line
          points={gearPoints}
          color="#0056A6"
          lineWidth={2.5}
          transparent
          opacity={0.85}
        />
        <Line
          points={innerCircle}
          color="#FFC300"
          lineWidth={2}
          transparent
          opacity={0.9}
        />
        <mesh>
          <circleGeometry args={[0.1, 16]} />
          <meshBasicMaterial color="#FFC300" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

// ============================================
// WIREFRAME HEXAGONAL NUT - Tuerca hexagonal
// ============================================
function WireframeHexNut({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  // Hexágono exterior
  const hexOuter = useMemo(() => {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      points.push([Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0])
    }
    return points
  }, [])

  // Hexágono exterior - cara trasera
  const hexOuterBack = useMemo(() => {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      points.push([Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, -0.5])
    }
    return points
  }, [])

  // Círculo interior (agujero de la tuerca)
  const innerCircle = useMemo(() => {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2
      points.push([Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0])
    }
    return points
  }, [])

  const innerCircleBack = useMemo(() => {
    const points: [number, number, number][] = []
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2
      points.push([Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, -0.5])
    }
    return points
  }, [])

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Cara frontal */}
        <Line points={hexOuter} color="#D7D8DA" lineWidth={3} transparent opacity={0.9} />
        <Line points={innerCircle} color="#FFC300" lineWidth={2} transparent opacity={0.8} />
        
        {/* Cara trasera */}
        <Line points={hexOuterBack} color="#D7D8DA" lineWidth={2} transparent opacity={0.6} />
        <Line points={innerCircleBack} color="#FFC300" lineWidth={1.5} transparent opacity={0.5} />
        
        {/* Líneas conectoras (bordes) */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <Line
              key={i}
              points={[
                [Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0],
                [Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, -0.5],
              ]}
              color="#D7D8DA"
              lineWidth={2}
              transparent
              opacity={0.7}
            />
          )
        })}
      </group>
    </Float>
  )
}

// ============================================
// WIREFRAME CHAIN LINK - Eslabón de cadena
// ============================================
function WireframeChainLink({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.15
    }
  })

  // Forma de eslabón - dos semicírculos conectados
  const chainShape = useMemo(() => {
    const points: [number, number, number][] = []
    
    // Semicírculo superior
    for (let i = 0; i <= 16; i++) {
      const angle = (i / 16) * Math.PI
      points.push([Math.cos(angle) * 0.4, 0.8 + Math.sin(angle) * 0.4, 0])
    }
    
    // Línea derecha
    points.push([-0.4, 0.8, 0])
    points.push([-0.4, -0.8, 0])
    
    // Semicírculo inferior
    for (let i = 0; i <= 16; i++) {
      const angle = Math.PI + (i / 16) * Math.PI
      points.push([Math.cos(angle) * 0.4, -0.8 + Math.sin(angle) * 0.4, 0])
    }
    
    // Línea izquierda para cerrar
    points.push([0.4, -0.8, 0])
    points.push([0.4, 0.8, 0])
    
    return points
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <group ref={groupRef} position={position} scale={scale}>
        <Line points={chainShape} color="#0056A6" lineWidth={3} transparent opacity={0.85} />
        {/* Línea interior para dar profundidad */}
        <Line 
          points={chainShape.map(p => [p[0] * 0.7, p[1] * 0.85, p[2]] as [number, number, number])} 
          color="#FFC300" 
          lineWidth={1.5} 
          transparent 
          opacity={0.5} 
        />
      </group>
    </Float>
  )
}

// ============================================
// WIREFRAME SPRING - Resorte en espiral
// ============================================
function WireframeSpring({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
    }
  })

  const springPoints = useMemo(() => {
    const points: [number, number, number][] = []
    const coils = 5
    const segments = 100
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = t * Math.PI * 2 * coils
      const y = t * 2.5 - 1.25
      const radius = 0.6
      
      points.push([
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ])
    }
    return points
  }, [])

  return (
    <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={scale}>
        <Line points={springPoints} color="#D7D8DA" lineWidth={2.5} transparent opacity={0.8} />
      </group>
    </Float>
  )
}

// ============================================
// SMOOTH CAMERA
// ============================================
function SmoothCamera() {
  const { camera, pointer } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    const baseX = Math.sin(t * 0.03) * 0.5
    const baseY = Math.cos(t * 0.02) * 0.3
    const baseZ = 7
    
    const mouseX = pointer.x * 1
    const mouseY = pointer.y * 0.5
    
    camera.position.x += (baseX + mouseX - camera.position.x) * 0.015
    camera.position.y += (baseY + mouseY - camera.position.y) * 0.015
    camera.position.z += (baseZ - camera.position.z) * 0.015
    
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ============================================
// MAIN SCENE EXPORT
// ============================================
export default function IndustrialScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Fondo oscuro profundo */}
        <color attach="background" args={['#050507']} />
        
        {/* Fog sutil */}
        <fog attach="fog" args={['#050507', 6, 18]} />
        
        {/* Iluminación mínima */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#0056A6" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#FFC300" />
        
        <Suspense fallback={null}>
          {/* Cámara suave */}
          <SmoothCamera />
          
          {/* ⭐ ESTRELLAS DE FONDO */}
          <Stars
            radius={50}
            depth={80}
            count={1500}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />
          
          {/* SUPERFICIE PARAMÉTRICA - Ola matemática de fondo */}
          <ParametricWave />
          
          {/* ENGRANAJES - El que te gustó */}
          <WireframeGear position={[-2.5, 0.8, 0]} scale={0.7} rotationSpeed={0.15} />
          {/* <WireframeGear position={[2.8, -0.3, -1]} scale={0.5} rotationSpeed={-0.12} /> */}
          
          {/* TUERCA HEXAGONAL */}
          {/* <WireframeHexNut position={[0, 0.5, 1]} scale={0.8} rotationSpeed={0.1} /> */}
          
          {/* ESLABÓN DE CADENA */}
          {/* <WireframeChainLink position={[-1.5, -1, 0.5]} scale={0.9} rotationSpeed={0.08} /> */}
          
          {/* RESORTE */}
          {/* <WireframeSpring position={[2, 1.5, 0]} scale={0.6} rotationSpeed={0.12} /> */}
        </Suspense>
      </Canvas>
    </div>
  )
}
