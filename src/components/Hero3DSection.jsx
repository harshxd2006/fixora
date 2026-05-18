import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  OrbitControls,
  ContactShadows,
  Sparkles,
  Center,
  MeshTransmissionMaterial,
  RoundedBox,
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { Link } from 'react-router-dom'

function PremiumDesk() {
  const group = useRef()
  const glowRef = useRef()
  const monitorRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (group.current) {
      group.current.position.y = Math.sin(t * 0.9) * 0.035
      group.current.rotation.y = Math.sin(t * 0.25) * 0.08
    }

    if (monitorRef.current) {
      monitorRef.current.rotation.z = Math.sin(t * 0.8) * 0.02
    }

    if (glowRef.current?.material) {
      glowRef.current.material.emissiveIntensity = 1.6 + Math.sin(t * 2.2) * 0.35
    }
  })

  const wood = useMemo(() => new THREE.Color('#d8c3a5'), [])

  return (
    <group ref={group}>
      <mesh position={[0, -0.72, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.5, 0.16, 2.35]} />
        <meshStandardMaterial color={wood} roughness={0.62} metalness={0.03} />
      </mesh>

      <mesh position={[0, -0.82, 0]} receiveShadow>
        <boxGeometry args={[4.5, 0.05, 2.35]} />
        <meshStandardMaterial color="#b89a72" roughness={0.8} metalness={0.02} />
      </mesh>

      <mesh position={[0.35, -0.33, -0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.22, 0.48]} />
        <meshStandardMaterial color="#c7c7c7" roughness={0.25} metalness={0.8} />
      </mesh>

      <group ref={monitorRef} position={[0.35, 0.14, -0.15]} rotation={[-0.08, -0.1, 0.03]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.48, 0.92, 0.08]} />
          <meshStandardMaterial color="#151515" roughness={0.3} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[1.26, 0.7, 0.01]} />
          <meshStandardMaterial
            color="#0b0d0f"
            emissive="#ccff00"
            emissiveIntensity={1.15}
            roughness={0.12}
            metalness={0.05}
          />
        </mesh>
      </group>

      <group position={[-0.95, -0.28, -0.05]} rotation={[-0.16, -0.12, 0.05]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.18, 0.05, 0.8]} />
          <meshStandardMaterial color="#181818" roughness={0.35} metalness={0.55} />
        </mesh>
        <mesh position={[0, 0.27, -0.34]} rotation={[-0.9, 0, 0]} castShadow>
          <boxGeometry args={[1.16, 0.76, 0.04]} />
          <meshStandardMaterial color="#0e0e10" roughness={0.2} metalness={0.65} />
        </mesh>
        <mesh position={[0, 0.27, -0.318]} rotation={[-0.9, 0, 0]}>
          <boxGeometry args={[1.03, 0.6, 0.01]} />
          <meshStandardMaterial
            color="#0b0b0d"
            emissive="#9eff00"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0}
          />
        </mesh>
      </group>

      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.22}>
        <group position={[1.15, -0.48, 0.45]} rotation={[-0.12, 0.65, 0.06]}>
          <RoundedBox args={[0.62, 0.08, 1.15]} radius={0.08} smoothness={8} castShadow receiveShadow>
            <meshStandardMaterial color="#0f1115" roughness={0.2} metalness={0.7} />
          </RoundedBox>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.48, 0.01, 0.98]} />
            <MeshTransmissionMaterial
              thickness={0.45}
              roughness={0.1}
              transmission={1}
              ior={1.35}
              chromaticAberration={0.04}
              anisotropy={0.05}
              distortion={0.08}
              distortionScale={0.12}
              temporalDistortion={0.1}
              transparent
            />
          </mesh>
        </group>
      </Float>

      <mesh position={[0.95, -0.47, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.26, 0.58]} />
        <meshStandardMaterial color="#222222" roughness={0.55} metalness={0.2} />
      </mesh>

      <mesh ref={glowRef} position={[-1.45, -0.08, 0.55]} rotation={[0.08, 0.45, -0.05]} castShadow>
        <RoundedBox args={[1.2, 0.18, 0.4]} radius={0.08} smoothness={10}>
          <meshStandardMaterial
            color="#0d0f0c"
            emissive="#ccff00"
            emissiveIntensity={1.8}
            roughness={0.25}
            metalness={0.05}
          />
        </RoundedBox>
      </mesh>

      <Sparkles count={28} speed={0.45} size={1.8} scale={[6, 3, 4]} color="#ccff00" />

      <group position={[0.75, 0.15, -0.9]}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#ccff00"
            emissive="#ccff00"
            emissiveIntensity={1.2}
            roughness={0.35}
            metalness={0.15}
          />
        </mesh>
      </group>
    </group>
  )
}

export default function Hero3DSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff_0%,#f3f3ee_45%,#eceae2_100%)] text-neutral-900">
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 1.55, 5.6], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#f5f3ed']} />
          <fog attach="fog" args={['#f5f3ed', 6, 14]} />

          <ambientLight intensity={1.25} />
          <hemisphereLight intensity={0.85} groundColor="#b9b29f" color="#ffffff" />
          <directionalLight
            position={[4, 7, 4]}
            intensity={2.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />
          <pointLight position={[-2, 1.5, 2]} intensity={1.8} color="#ccff00" distance={7} />
          <pointLight position={[2.5, 1.2, -1]} intensity={0.8} color="#ffffff" distance={6} />

          <Suspense fallback={null}>
            <Environment preset="studio" />
            <Center>
              <PremiumDesk />
            </Center>
            <ContactShadows
              position={[0, -0.99, 0]}
              opacity={0.42}
              scale={14}
              blur={2.8}
              far={3.2}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 4.2}
            autoRotate
            autoRotateSpeed={0.45}
          />

          <EffectComposer>
            <Bloom intensity={0.8} luminanceThreshold={0.16} luminanceSmoothing={0.88} />
            <Vignette eskil={false} offset={0.2} darkness={0.65} />
            <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
            <ChromaticAberration offset={new THREE.Vector2(0.0004, 0.0002)} />
          </EffectComposer>
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
            Problem-First Shopping
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-neutral-950 sm:text-6xl md:text-7xl lg:text-8xl">
            Stop Suffering.
            <br />
            <span className="bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
              Start Fixing.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
            Describe your problem, AI finds the fix. Built to feel premium, futuristic, and easy to explore.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/problems">
              <button className="rounded-full bg-[#ccff00] px-8 py-4 text-sm font-bold text-black shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]">
                View All Problems →
              </button>
            </Link>

            <Link to="/about">
              <button className="rounded-full border border-black/10 bg-white/55 px-8 py-4 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Watch Demo
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden font-mono text-[10px] text-neutral-500 lg:block">
        <div>SYS.LOC // FILTERS_ACTIVE</div>
        <div>RENDER_ENGINE // THREE_JS_R3F</div>
        <div className="text-[#ccff00]">● AI_CURATION_LIVE</div>
      </div>
    </section>
  )
}
