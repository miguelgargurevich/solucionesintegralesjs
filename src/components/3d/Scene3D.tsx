'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  Environment,
  Sparkles,
  Line
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
// FLOATING GEOMETRIC SHAPES
// ============================================
function FloatingGeometries() {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)
  const group3Ref = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group1Ref.current) {
      group1Ref.current.rotation.x = t * 0.3
      group1Ref.current.rotation.y = t * 0.2
      group1Ref.current.position.y = Math.sin(t * 0.5) * 0.5 + 2
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.x = -t * 0.2
      group2Ref.current.rotation.z = t * 0.3
      group2Ref.current.position.y = Math.cos(t * 0.4) * 0.5 - 1
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.y = t * 0.4
      group3Ref.current.rotation.z = -t * 0.2
      group3Ref.current.position.y = Math.sin(t * 0.6 + 1) * 0.5
    }
  })

  return (
    <>
      {/* Octahedron */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group ref={group1Ref} position={[-3, 2, 1]}>
          <mesh>
            <octahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial color="#FFC300" wireframe transparent opacity={0.8} />
          </mesh>
        </group>
      </Float>
      
      {/* Torus */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
        <group ref={group2Ref} position={[3.5, -1, 2]}>
          <mesh>
            <torusGeometry args={[0.5, 0.2, 8, 16]} />
            <meshBasicMaterial color="#0056A6" wireframe transparent opacity={0.7} />
          </mesh>
        </group>
      </Float>
      
      {/* Dodecahedron */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={group3Ref} position={[-2, -2, -2]}>
          <mesh>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial color="#FFC300" wireframe transparent opacity={0.6} />
          </mesh>
        </group>
      </Float>
    </>
  )
}

// ============================================
// PARTICLE FIELD - CAMPO DE PARTÍCULAS
// ============================================
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particleCount = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#0056A6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// ============================================
// CAMERA RIG WITH SMOOTH MOVEMENT
// ============================================
function CameraRig() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Movimiento suave de cámara
    camera.position.x = Math.sin(t * 0.1) * 2
    camera.position.y = Math.cos(t * 0.08) * 1 + 2
    camera.position.z = 10 + Math.sin(t * 0.05) * 2
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
// MAIN SCENE EXPORT
// ============================================
export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#0F1115']} />
        <fog attach="fog" args={['#0F1115', 8, 30]} />
        
        {/* Iluminación ambiental */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#0056A6" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FFC300" />
        
        <Suspense fallback={<LoadingFallback />}>
          {/* Cámara con movimiento */}
          <CameraRig />
          
          {/* Superficie paramétrica */}
          <ParametricWave />
          
          {/* Geometrías flotantes */}
          <FloatingGeometries />
          
          {/* Campo de partículas */}
          <ParticleField />
          
          {/* Sparkles adicionales */}
          <Sparkles
            count={200}
            scale={15}
            size={1.5}
            speed={0.3}
            color="#FFC300"
            opacity={0.5}
          />
          
          {/* Environment para reflexiones */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
