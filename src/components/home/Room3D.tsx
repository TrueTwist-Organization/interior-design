"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, MeshWobbleMaterial, ContactShadows, PresentationControls } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

function AbstractRoom() {
  return (
    <group rotation={[0, -Math.PI / 4, 0]}>
      {/* Central Geometric Design Element */}
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[0, 0, 0]} castShadow>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color="#6366f1"
            speed={2}
            distort={0.4}
            radius={1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Aesthetic Floating Cubes */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2, 1, -2]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.5} transparent opacity={0.6} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-2, -1, 1]} rotation={[0, Math.PI / 3, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshWobbleMaterial color="#f43f5e" speed={1} factor={0.6} metalness={0.8} />
        </mesh>
      </Float>

      {/* Floor reflection effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#030712" roughness={0.1} metalness={0.2} />
      </mesh>
      
      <ContactShadows 
        position={[0, -1.99, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={10} 
        resolution={256} 
        color="#000000" 
      />
    </group>
  )
}

export default function Room3D() {
  return (
    <div className="w-full h-[500px] md:h-[700px] lg:h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
        
        <PresentationControls
          global
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <AbstractRoom />
        </PresentationControls>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
