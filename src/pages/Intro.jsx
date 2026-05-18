import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  OrbitControls,
  ContactShadows,
  Sparkles,
  Center,
  MeshTransmissionMaterial,
  RoundedBox,
} from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

function PremiumDesk() {
  const group = useRef();
  const glowRef = useRef();
  const monitorRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.position.y = Math.sin(t * 0.9) * 0.035;
      group.current.rotation.y = Math.sin(t * 0.25) * 0.08;
    }

    if (monitorRef.current) {
      monitorRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
    }

    if (glowRef.current?.material) {
      glowRef.current.material.emissiveIntensity = 1.6 + Math.sin(t * 2.2) * 0.35;
    }
  });

  const wood = useMemo(() => new THREE.Color('#d8c3a5'), []);

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
  );
}

export default function Intro() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff_0%,#F7F7F2_45%,#EAEAE0_100%)] text-ink">
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          dpr={[1, 1.2]}
          camera={{ position: [0, 1.55, 5.6], fov: 42 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#F7F7F2']} />
          <fog attach="fog" args={['#F7F7F2', 6, 14]} />

          <ambientLight intensity={0.6} />
          <hemisphereLight intensity={0.4} groundColor="#b9b29f" color="#ffffff" />
          <directionalLight
            position={[4, 7, 4]}
            intensity={1.2}
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
              blur={2.5}
              far={3.2}
              resolution={256}
              frames={1}
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
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-12 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-light bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-muted shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-lime" />
            Problem-First Shopping
          </div>

          <h1 className="max-w-3xl text-[44px] sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink">
            Stop Suffering.
            <br />
            <span className="bg-gradient-to-r from-ink via-[#4a4a4a] to-slate-muted bg-clip-text text-transparent">
              Start Fixing.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-slate-muted font-medium sm:text-lg">
            Tell us what's broken in your daily workflow. Our AI instantly curates the perfect premium tools to eliminate the annoyance—permanently.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/store">
              <button className="rounded-full bg-lime px-8 py-4 text-sm font-bold text-ink shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Enter Store →
              </button>
            </Link>

            <Link to="/products">
              <button className="rounded-full border border-border-light bg-white/70 px-8 py-4 text-sm font-semibold text-ink shadow-sm backdrop-blur-md transition-transform hover:scale-[1.02] active:scale-[0.98] hover:bg-white">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
