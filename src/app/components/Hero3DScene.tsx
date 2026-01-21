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
} from "@react-three/drei";
import * as THREE from "three";

// ======== GLOWING SPHERE ========
function GlowingSphere({ position, color, size = 0.5, offset = 0 }: { position: [number, number, number]; color: string; size?: number; offset?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const y = position[1] + Math.sin(state.clock.elapsedTime * 2 + offset) * 0.3;
      meshRef.current.position.y = y;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// ======== INTERACTIVE CUBE ========
function InteractiveCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[-5, 2, -2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? "#60a5fa" : "#3b82f6"}
        wireframe={hovered}
        emissive={hovered ? "#60a5fa" : "#3b82f6"}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// ======== TORUS KNOT ========
function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={[5, -1, -3]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[0.6, 0.2, 64, 8]} />
        <meshStandardMaterial
          color={hovered ? "#f97316" : "#ea580c"}
          emissive={hovered ? "#f97316" : "#ea580c"}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// ======== MOUSE FOLLOWER ========
function MouseFollower() {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.1);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 2, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  );
}

// ======== MAIN COMPONENT ========
export default function Hero3DScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ 
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      zIndex: 1,
      pointerEvents: "none",
      mixBlendMode: "screen"
    }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]} // Limit pixel ratio for performance
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#60a5fa" />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        {/* Sparkles effect */}
        <Sparkles count={80} scale={12} size={4} speed={0.4} opacity={0.5} color="#60a5fa" />
        
        {/* Interactive elements */}
        {/* <InteractiveCube /> */}
        {/* <FloatingTorusKnot /> */}
        
        {/* Glowing spheres */}
        {/* <GlowingSphere position={[4, -2, -4]} color="#3b82f6" size={0.6} offset={0} />
        <GlowingSphere position={[-4, 3, -3]} color="#f97316" size={0.5} offset={1} />
        <GlowingSphere position={[2, 4, -5]} color="#8b5cf6" size={0.4} offset={2} />
        <GlowingSphere position={[-3, -3, -4]} color="#06b6d4" size={0.55} offset={3} />
         */}
        {/* Mouse follower */}
        <MouseFollower />
        
        {/* Fog for depth */}
        <fog attach="fog" args={["#0f172a", 8, 25]} />
      </Canvas>
    </div>
  );
}

