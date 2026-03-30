"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sphere,
  Torus,
  Box,
  Octahedron,
  TorusKnot,
  Stars,
  Sparkles,
  Text,
  Icosahedron,
  Dodecahedron,
  Tetrahedron,
  Plane,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function RotatingRing() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <mesh>
        <torusGeometry args={[3, 0.3, 16, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#60a5fa"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[3.2, 0.25, 16, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#a78bfa"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh rotation={[0, 0, (Math.PI / 3) * 2]}>
        <torusGeometry args={[2.8, 0.25, 16, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#22d3ee"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[5, 5, -3]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#fb923c"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function FloatingShape({ position, color, shape = 'sphere', size = 1 }: {
  position: [number, number, number];
  color: string;
  shape?: 'sphere' | 'cube' | 'torus' | 'octahedron' | 'icosahedron' | 'dodecahedron' | 'tetrahedron';
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4 + position[0];
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + position[1];
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3 + position[2];
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 2;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.6 + position[1]) * 1.5;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.7 + position[2]) * 1.5;
      meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.scale.y = 1 + Math.cos(state.clock.elapsedTime + position[1]) * 0.3;
      meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 1.2 + position[2]) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'cube': return <boxGeometry args={[size, size, size]} />;
      case 'torus': return <torusGeometry args={[size, size * 0.3, 32, 64]} />;
      case 'octahedron': return <octahedronGeometry args={[size]} />;
      case 'icosahedron': return <icosahedronGeometry args={[size]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[size]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[size]} />;
      default: return <sphereGeometry args={[size, 64, 64]} />;
    }
  }, [shape, size]);

  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.85}
          wireframe={Math.random() > 0.7}
        />
      </mesh>
    </Float>
  );
}

function RotatingRings() {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const group3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group1Ref.current) {
      group1Ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      group1Ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      group2Ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.z = state.clock.elapsedTime * 0.25;
      group3Ref.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <>
      <group ref={group1Ref} position={[0, 0, -8]}>
        <mesh>
          <torusGeometry args={[4, 0.4, 32, 64]} />
          <meshStandardMaterial color="#3b82f6" emissive="#60a5fa" emissiveIntensity={0.4} metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[4.5, 0.35, 32, 64]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#a78bfa" emissiveIntensity={0.4} metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
      <group ref={group2Ref} position={[0, 2, -12]}>
        <mesh>
          <torusGeometry args={[5, 0.35, 32, 64]} />
          <meshStandardMaterial color="#06b6d4" emissive="#22d3ee" emissiveIntensity={0.4} metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[4.2, 0.3, 32, 64]} />
          <meshStandardMaterial color="#f97316" emissive="#fb923c" emissiveIntensity={0.4} metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
      <group ref={group3Ref} position={[-5, -3, -10]}>
        <mesh>
          <torusGeometry args={[3.5, 0.3, 32, 64]} />
          <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.4} metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
          <torusGeometry args={[3.8, 0.32, 32, 64]} />
          <meshStandardMaterial color="#ec4899" emissive="#f472b6" emissiveIntensity={0.4} metalness={0.95} roughness={0.05} />
        </mesh>
      </group>
    </>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      [0.4, 0.7, 1.0],    // Blue
      [0.8, 0.4, 1.0],    // Purple
      [0.2, 0.8, 0.6],    // Cyan
      [1.0, 0.6, 0.2],    // Orange
      [0.2, 0.9, 0.5],    // Green
      [1.0, 0.3, 0.8],    // Magenta
    ];

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 150;
      positions[i + 1] = (Math.random() - 0.5) * 150;
      positions[i + 2] = (Math.random() - 0.5) * 150;

      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const [r, g, b] = colorPalette[colorIndex];
      colors[i] = r;
      colors[i + 1] = g;
      colors[i + 2] = b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        transparent
        opacity={0.9}
        sizeAttenuation
        vertexColors
      />
    </points>
  );
}

function MouseParallax() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 5, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 5, 0.08);
  });

  return null;
}

export default function Global3DBackground() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      pointerEvents: "none"
    }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #f5f3ff 100%)" }}
        dpr={[1, 2]}
      >
        <MouseParallax />

        {/* Intense Lighting Setup */}
        <ambientLight intensity={0.7} />
        <pointLight position={[20, 20, 20]} intensity={1.8} color="#2563eb" decay={1.5} />
        <pointLight position={[-20, -20, -20]} intensity={1.5} color="#7c3aed" decay={1.5} />
        <pointLight position={[0, 0, 20]} intensity={1.6} color="#0891b2" decay={1.5} />
        <pointLight position={[20, -20, 0]} intensity={1.2} color="#d97706" decay={1.5} />
        <pointLight position={[-20, 20, 0]} intensity={1.2} color="#059669" decay={1.5} />
        <pointLight position={[0, -20, 10]} intensity={1.2} color="#db2777" decay={1.5} />
        <spotLight position={[0, 25, 10]} angle={0.6} penumbra={1} intensity={1.2} color="#ffffff" />
        <spotLight position={[0, -25, 10]} angle={0.6} penumbra={1} intensity={1.0} color="#2563eb" />
        <directionalLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />

        {/* Extreme Background */}
        <Stars radius={200} depth={80} count={8000} factor={12} saturation={0.5} fade speed={1.5} />
        <ParticleField />

        {/* Rotating Rings */}
        <RotatingRings />

        {/* 30+ Floating Shapes for Maximum Impact */}
        {/* Blue Palette */}
        <FloatingShape position={[-15, 5, -10]} color="#2563eb" shape="sphere" size={1.3} />
        <FloatingShape position={[15, -5, -15]} color="#60a5fa" shape="cube" size={1.5} />
        <FloatingShape position={[0, 10, -18]} color="#1e3a8a" shape="torus" size={1.8} />
        
        {/* Purple Palette */}
        <FloatingShape position={[-10, -8, -12]} color="#7c3aed" shape="octahedron" size={1.4} />
        <FloatingShape position={[12, 8, -16]} color="#9333ea" shape="icosahedron" size={1.2} />
        <FloatingShape position={[-18, 0, -14]} color="#c4b5fd" shape="dodecahedron" size={1.1} />
        
        {/* Cyan Palette */}
        <FloatingShape position={[8, -12, -10]} color="#0891b2" shape="tetrahedron" size={1.3} />
        <FloatingShape position={[-12, 6, -20]} color="#14b8a6" shape="sphere" size={1.0} />
        <FloatingShape position={[14, -8, -8]} color="#06b6d4" shape="cube" size={1.4} />
        
        {/* Orange/Warm Palette */}
        <FloatingShape position={[-8, 10, -15]} color="#d97706" shape="torus" size={1.2} />
        <FloatingShape position={[10, -3, -17]} color="#f59e0b" shape="octahedron" size={1.1} />
        <FloatingShape position={[18, 12, -12]} color="#fbbf24" shape="icosahedron" size={0.9} />
        
        {/* Green Palette */}
        <FloatingShape position={[-14, -6, -9]} color="#059669" shape="sphere" size={1.1} />
        <FloatingShape position={[6, 14, -19]} color="#10b981" shape="dodecahedron" size={1.0} />
        <FloatingShape position={[-6, -10, -11]} color="#6ee7b7" shape="tetrahedron" size={1.2} />
        
        {/* Pink/Magenta Palette */}
        <FloatingShape position={[16, 6, -13]} color="#db2777" shape="cube" size={1.3} />
        <FloatingShape position={[-10, 12, -17]} color="#ec4899" shape="torus" size={1.1} />
        <FloatingShape position={[4, -14, -10]} color="#f472b6" shape="octahedron" size={1.0} />
        
        {/* Indigo Palette */}
        <FloatingShape position={[12, 0, -14]} color="#4f46e5" shape="icosahedron" size={1.2} />
        <FloatingShape position={[-16, 8, -16]} color="#6366f1" shape="sphere" size={0.9} />
        <FloatingShape position={[8, -16, -12]} color="#a5b4fc" shape="dodecahedron" size={1.1} />
        
        {/* Additional Mix */}
        <FloatingShape position={[0, -12, -8]} color="#14b8a6" shape="tetrahedron" size={1.4} />
        <FloatingShape position={[-18, 10, -20]} color="#d97706" shape="sphere" size={1.0} />
        <FloatingShape position={[18, -12, -15]} color="#7c3aed" shape="cube" size={1.2} />
        <FloatingShape position={[-4, 16, -11]} color="#059669" shape="torus" size={1.3} />
        <FloatingShape position={[14, 14, -18]} color="#db2777" shape="octahedron" size={1.1} />
        <FloatingShape position={[-14, -14, -9]} color="#0891b2" shape="icosahedron" size={1.0} />

        {/* Massive Sparkles */}
        <Sparkles count={300} scale={40} size={4} speed={0.7} opacity={0.8} color="#2563eb" />
        <Sparkles count={250} scale={45} size={3.5} speed={0.5} opacity={0.7} color="#7c3aed" />
        <Sparkles count={200} scale={35} size={3} speed={0.3} opacity={0.6} color="#0891b2" />
        <Sparkles count={150} scale={50} size={2.5} speed={0.4} opacity={0.5} color="#d97706" />
        <FloatingShape position={[-4, 10, -9]} color="#ec4899" shape="dodecahedron" size={1.0} />
        <FloatingShape position={[14, -8, -7]} color="#84cc16" shape="sphere" size={0.9} />
        <FloatingShape position={[-14, 3, -15]} color="#f59e0b" shape="cube" size={1.5} />
        <FloatingShape position={[6, -10, -10]} color="#6366f1" shape="torus" size={1.1} />
        <FloatingShape position={[0, -3, -16]} color="#14b8a6" shape="octahedron" size={1.2} />
        <FloatingShape position={[10, 10, -12]} color="#a855f7" shape="icosahedron" size={0.8} />
        <FloatingShape position={[-10, -10, -11]} color="#0ea5e9" shape="dodecahedron" size={0.9} />

        {/* Enhanced Fog for atmospheric depth */}
        <fog attach="fog" args={["#f0f9ff", 30, 120]} />

        {/* Extreme Post-processing effects for god mode */}
        <EffectComposer>
          <Bloom 
            intensity={1.2}
            luminanceThreshold={0.4} 
            luminanceSmoothing={0.95}
            height={512}
            mipmapBlur={true}
          />
          <ChromaticAberration offset={[0.008, 0.008]} />
          <Noise opacity={0.15} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}