"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, AdaptiveDpr, AdaptiveEvents, useScroll } from "@react-three/drei";
import * as THREE from "three";

interface NeuralParticle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  basePosition: THREE.Vector3;
  connections: number[];
}

// Generate deterministic random positions
function generateSeedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Neural Particle Network Component
function NeuralNetwork({ particleCount = 80, maxConnections = 3, connectionDistance = 3 }: { particleCount?: number; maxConnections?: number; connectionDistance?: number }) {
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  // Generate particles with deterministic randomness
  const { particles, positions, connections } = useMemo(() => {
    const random = generateSeedRandom(42);
    const particlesData: NeuralParticle[] = [];
    const positions = new Float32Array(particleCount * 3);
    const connectionsData: { start: THREE.Vector3; end: THREE.Vector3; opacity: number }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = (random() - 0.5) * 15;
      const y = (random() - 0.5) * 10;
      const z = (random() - 0.5) * 5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      particlesData.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3((random() - 0.5) * 0.002, (random() - 0.5) * 0.002, (random() - 0.5) * 0.001),
        basePosition: new THREE.Vector3(x, y, z),
        connections: []
      });
    }
    
    // Pre-calculate connections for performance
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = particlesData[i].position.distanceTo(particlesData[j].position);
        if (dist < connectionDistance) {
          connectionsData.push({
            start: particlesData[i].position.clone(),
            end: particlesData[j].position.clone(),
            opacity: Math.max(0.1, 1 - dist / connectionDistance)
          });
        }
      }
    }
    
    return { particles: particlesData, positions, connections: connectionsData };
  }, [particleCount, connectionDistance]);

  const { pointer } = useThree();
  const basePositionsRef = useRef(new Float32Array(positions.length));

  // Store base positions
  useEffect(() => {
    basePositionsRef.current = new Float32Array(positions);
  }, [positions]);

  // Animate particles
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const basePositions = basePositionsRef.current;
    
    for (let i = 0; i < particleCount; i++) {
      // Gentle floating motion
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;
      
      // Update position with subtle movement
      positions[ix] = basePositions[ix] + Math.sin(time * 0.3 + i) * 0.3;
      positions[iy] = basePositions[iy] + Math.cos(time * 0.2 + i * 0.5) * 0.3;
      positions[iz] = basePositions[iz] + Math.sin(time * 0.15 + i * 0.3) * 0.2;
      
      // Mouse parallax on desktop
      const mouseX = pointer.x * 0.5;
      const mouseY = pointer.y * 0.5;
      positions[ix] += mouseX * (Math.random() - 0.5) * 0.1;
      positions[iy] += mouseY * (Math.random() - 0.5) * 0.1;
    }
    
    // Update line geometry
    if (linesGeometryRef.current) {
      const positionsArray = linesGeometryRef.current.attributes.position.array as Float32Array;
      let idx = 0;
      for (const conn of connections) {
        positionsArray[idx++] = conn.start.x;
        positionsArray[idx++] = conn.start.y;
        positionsArray[idx++] = conn.start.z;
        positionsArray[idx++] = conn.end.x;
        positionsArray[idx++] = conn.end.y;
        positionsArray[idx++] = conn.end.z;
      }
      linesGeometryRef.current.attributes.position.needsUpdate = true;
      linesGeometryRef.current.setDrawRange(0, connections.length * 2);
    }
  });

  // Line geometry for connections
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const posArray = new Float32Array(connections.length * 6);
    geo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    geo.setDrawRange(0, connections.length * 2);
    return geo;
  }, [connections.length]);

  return (
    <group>
      {/* Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.08}
          color="#60a5fa"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      
      {/* Neural connections */}
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[lineGeometry.attributes.position.array, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// Floating geometric accents
function FloatingAccents() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle geometric shapes in corners */}
      <mesh position={[-6, -3, -2]} rotation={[0, 0, Math.PI / 4]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh position={[5, 2, -3]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh position={[-4, 4, -4]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} wireframe />
      </mesh>
    </group>
  );
}

// Camera drift effect
function CameraDrift() {
  const { camera } = useThree();
  const scroll = useScroll();
  const initialPosition = useRef(new THREE.Vector3(0, 0, 8));
  
  useEffect(() => {
    initialPosition.current.copy(camera.position);
  }, [camera]);
  
  useFrame(() => {
    const scrollOffset = scroll.offset;
    // Subtle camera movement on scroll
    camera.position.x = initialPosition.current.x + Math.sin(scrollOffset * Math.PI) * 0.5;
    camera.position.y = initialPosition.current.y + Math.sin(scrollOffset * Math.PI * 2) * 0.2;
  });
  
  return null;
}

// Main Neural Background Component
interface CinematicNeuralBackgroundProps {
  particleCount?: number;
  showOnMobile?: boolean;
}

export default function CinematicNeuralBackground({ 
  particleCount = 80,
  showOnMobile = false 
}: CinematicNeuralBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /mobile/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);
    
    // Adaptive DPR based on device capability
    const updateDPR = () => {
      if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
        const cores = navigator.hardwareConcurrency;
        setDpr(cores > 4 ? 2 : cores > 2 ? 1.5 : 1);
      }
    };
    updateDPR();
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Mobile fallback - render nothing or static
  if (isMobile && !showOnMobile) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: reducedMotion ? 0.5 : 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true,
        }}
        dpr={reducedMotion ? 1 : Math.min(dpr, 2)}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["transparent"]} />
        <fog attach="fog" args={["transparent", 5, 25]} />
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        {!reducedMotion && (
          <>
            <NeuralNetwork particleCount={reducedMotion ? 30 : particleCount} />
            <FloatingAccents />
            <CameraDrift />
          </>
        )}
        
        {/* Ambient light for subtle 3D elements */}
        <ambientLight intensity={0.3} />
      </Canvas>
    </div>
  );
}

