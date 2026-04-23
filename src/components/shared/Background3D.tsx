"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"

function AnimatedShapes() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#C5A059" />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={1.5} position={[4, 0, -5]}>
          <MeshDistortMaterial
            color="#C5A059"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[-5, 2, -10]} rotation={[0.5, 0.5, 0.5]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#222" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[2, -3, -15]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#C5A059" wireframe />
        </mesh>
      </Float>
    </>
  )
}

export function Background3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <AnimatedShapes />
      </Canvas>
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  )
}
