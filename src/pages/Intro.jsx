import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, AnimatePresence } from 'framer-motion';
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
import { ChevronDown, Star } from 'lucide-react';

// Counter component for animated stats
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

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
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const phrases = [
    { text: "My desk is a mess.", highlight: "mess" },
    { text: "I can't focus on anything.", highlight: "focus" },
    { text: "My back is killing me.", highlight: "killing" },
    { text: "Cables. Everywhere.", highlight: "Everywhere." },
    { text: "Fixora fixes all of it.", highlight: "fixes" }
  ];

  // Helper for staggered word animation
  const animEase = [0.25, 0.46, 0.45, 0.94];
  const renderHeadlineWord = (word, index, totalOffset = 0) => (
    <motion.span
      key={index}
      className="inline-block mr-[0.25em]"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: animEase, delay: (index + totalOffset) * 0.08 }}
    >
      {word}
    </motion.span>
  );

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-4xl font-extrabold tracking-tight">Fixora</div>
            <motion.div
              className="w-3 h-3 bg-lime rounded-full mt-4"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff_0%,#F7F7F2_45%,#EAEAE0_100%)] text-ink">
        {/* Mobile static gradient */}
        <div className="md:hidden absolute inset-0 z-0 bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" />
        
        {/* Desktop 3D Canvas */}
        <div className="hidden md:block absolute inset-0 z-0">
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

            <Suspense fallback={null} onLoad={() => setIsLoaded(true)}>
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

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-12 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto mt-[-5vh]">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: animEase }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-light bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-muted shadow-sm backdrop-blur-md md:bg-white/70 bg-[#1a1a1a]/80 md:text-slate-muted text-gray-300 md:border-border-light border-white/10"
            >
              <span className="h-2 w-2 rounded-full bg-lime" />
              Problem-First Shopping
            </motion.div>

            <h1 className="max-w-3xl text-[44px] sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold leading-[0.92] tracking-[-0.03em] md:text-ink text-white">
              <div>
                {['Stop', 'Suffering.'].map((w, i) => renderHeadlineWord(w, i, 0))}
              </div>
              <div className="md:bg-gradient-to-r md:from-ink md:via-[#4a4a4a] md:to-slate-muted bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {['Start', 'Fixing.'].map((w, i) => renderHeadlineWord(w, i, 2))}
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: animEase }}
              className="mt-7 max-w-xl text-base leading-7 md:text-slate-muted text-gray-400 font-medium sm:text-lg"
            >
              Tell us what's broken in your daily workflow. Our AI instantly curates the perfect premium tools to eliminate the annoyance—permanently.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: animEase }}
              className="mt-6 flex items-center gap-2 text-[13px] text-[#6B6B6B] font-medium"
            >
              <Star size={14} className="fill-[#C8F135] text-[#C8F135]" />
              <span>4.9 rating</span>
              <span className="w-1 h-1 rounded-full bg-[#6B6B6B]" />
              <span>10,000+ problems solved</span>
              <span className="w-1 h-1 rounded-full bg-[#6B6B6B]" />
              <span>Free AI recommendations</span>
            </motion.div>
          </div>
        </div>

        {/* Bouncing Down Arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <ChevronDown color="white" size={28} className="md:text-ink" style={{ stroke: 'currentColor' }} />
        </motion.div>
      </section>

      {/* Scroll Typography Section */}
      <section ref={containerRef} className="h-[500vh] bg-[#0A0A0A] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
          {phrases.map((phrase, i) => {
            const start = i * 0.2;
            const end = (i + 1) * 0.2;
            const fadeInStart = start;
            const fadeInEnd = start + 0.05;
            const fadeOutStart = end - 0.05;
            const fadeOutEnd = end;

            const opacity = useTransform(
              scrollYProgress,
              [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
              [0, 1, 1, 0]
            );
            
            const scale = useTransform(
              scrollYProgress,
              [fadeInStart, fadeInEnd],
              [0.95, 1]
            );

            // Split phrase to highlight keyword
            const words = phrase.text.split(' ');
            
            return (
              <motion.div
                key={i}
                style={{ opacity, scale }}
                className="absolute text-center max-w-[800px] w-full"
              >
                <h2 className="text-[42px] md:text-[80px] font-extrabold text-white tracking-tight leading-[1.1]">
                  {words.map((w, wIdx) => {
                    const isHighlight = w.replace(/[.,]/g, '') === phrase.highlight.replace(/[.,]/g, '');
                    return (
                      <span key={wIdx} className={isHighlight ? "text-[#C8F135]" : "text-white"}>
                        {w}{wIdx < words.length - 1 ? ' ' : ''}
                      </span>
                    );
                  })}
                </h2>
              </motion.div>
            );
          })}

          {/* Progress Indicator */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {phrases.map((_, i) => {
              const isActive = useTransform(
                scrollYProgress,
                [i * 0.2, (i + 1) * 0.2],
                [1, 0]
              );
              // We'll use a simpler approach for styling active dot
              return <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />;
            })}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[#0A0A0A] border-t border-[#1a1a1a] py-12 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-transparent md:divide-white/10">
            <div className="text-center px-4 flex flex-col items-center">
              <div className="text-[48px] font-extrabold text-white flex items-center">
                <AnimatedNumber value={10} />
                <span>,000+</span>
              </div>
              <div className="text-[13px] text-[#6B6B6B] mt-1 uppercase tracking-wider font-semibold">Problems Solved</div>
            </div>
            <div className="text-center px-4 flex flex-col items-center">
              <div className="text-[48px] font-extrabold text-white flex items-center">
                <AnimatedNumber value={98} />
                <span>%</span>
              </div>
              <div className="text-[13px] text-[#6B6B6B] mt-1 uppercase tracking-wider font-semibold">Success Rate</div>
            </div>
            <div className="text-center px-4 flex flex-col items-center">
              <div className="text-[48px] font-extrabold text-white flex items-center">
                <AnimatedNumber value={500} />
                <span>+</span>
              </div>
              <div className="text-[13px] text-[#6B6B6B] mt-1 uppercase tracking-wider font-semibold">Products</div>
            </div>
            <div className="text-center px-4 flex flex-col items-center">
              <div className="text-[48px] font-extrabold text-white flex items-center">
                <AnimatedNumber value={24} />
                <span className="text-[40px]">/</span>
                <AnimatedNumber value={7} />
              </div>
              <div className="text-[13px] text-[#6B6B6B] mt-1 uppercase tracking-wider font-semibold">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="min-h-screen bg-[#0A0A0A] relative flex flex-col items-center justify-center px-6 overflow-hidden z-10">
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)] opacity-50" />
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: animEase }}
            className="text-white text-[48px] font-extrabold tracking-tight mb-2"
          >
            Fixora
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: animEase }}
            className="text-[#6B6B6B] text-[18px] mb-12"
          >
            Stop suffering. Start fixing.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: animEase }}
          >
            <Link to="/store">
              <button className="h-[56px] px-8 rounded-full bg-[#C8F135] text-[#0A0A0A] font-bold text-[16px] shadow-[0_0_30px_rgba(200,241,53,0.3)] hover:shadow-[0_0_40px_rgba(200,241,53,0.5)] transition-all hover:scale-105 active:scale-95">
                Enter Store →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const ProgressDot = ({ index, scrollYProgress }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const activeIdx = Math.floor(v * 5);
      setIsActive(activeIdx === index || (activeIdx >= 5 && index === 4));
    });
  }, [scrollYProgress, index]);

  return (
    <div 
      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#C8F135] scale-125' : 'bg-white/30'}`}
    />
  );
};
