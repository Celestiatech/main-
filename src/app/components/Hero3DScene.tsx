"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Octahedron, Icosahedron, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  geometry: "sphere" | "torus" | "box" | "octahedron" | "icosahedron";
  speed?: number;
  scale?: number;
}

function FloatingShape({ position, color, geometry, speed = 1, scale = 1 }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const Geometry = useMemo(() => {
    switch (geometry) {
      case "sphere":
        return Sphere;
      case "torus":
        return Torus;
      case "box":
        return Box;
      case "octahedron":
        return Octahedron;
      case "icosahedron":
        return Icosahedron;
      default:
        return Sphere;
    }
  }, [geometry]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Geometry args={[1, 32]}>
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={hovered ? 0.9 : 0.6}
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Geometry>
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  // Use useMemo to ensure stable random positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = 12345; // Fixed seed for deterministic behavior
    let random = seed;
    const randomFn = () => {
      random = (random * 16807) % 2147483647;
      return (random - 1) / 2147483646;
    };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (randomFn() - 0.5) * 20;
      pos[i * 3 + 1] = (randomFn() - 0.5) * 20;
      pos[i * 3 + 2] = (randomFn() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.6} />
    </points>
  );
}

function AnimatedRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ringRef} position={[3, -2, -3]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function InteractiveCube() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      const targetScale = hovered ? 1.3 : 1;
      cubeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={cubeRef}
      position={[-4, 2, -2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? "#60a5fa" : "#3b82f6"}
        wireframe={hovered}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function MouseFollower() {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.pointer.x * viewport.width) / 2;
      const y = (state.pointer.y * viewport.height) / 2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </mesh>
  );
}

export default function Hero3DScene() {
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
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#60a5fa" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#f97316" />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        {/* Sparkles effect */}
        <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#60a5fa" />
        
        {/* Floating geometric shapes */}
        <FloatingShape position={[4, -1, -4]} color="#3b82f6" geometry="icosahedron" speed={0.8} scale={0.8} />
        <FloatingShape position={[-3, 3, -5]} color="#f97316" geometry="octahedron" speed={1} scale={0.6} />
        <FloatingShape position={[2, 4, -6]} color="#8b5cf6" geometry="sphere" speed={0.6} scale={0.5} />
        <FloatingShape position={[-5, -2, -3]} color="#06b6d4" geometry="torus" speed={1.2} scale={0.7} />
        <FloatingShape position={[5, 2, -5]} color="#10b981" geometry="box" speed={0.9} scale={0.4} />
        
        {/* Additional floating shapes for more depth */}
        <FloatingShape position={[0, -3, -7]} color="#ec4899" geometry="icosahedron" speed={0.5} scale={0.5} />
        <FloatingShape position={[-4, -1, -6]} color="#fbbf24" geometry="sphere" speed={0.7} scale={0.3} />
        
        {/* Interactive elements */}
        <InteractiveCube />
        <AnimatedRing />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Mouse follower glow */}
        <MouseFollower />
        
        {/* Fog for depth */}
        <fog attach="fog" args={["#1a1a2e", 5, 20]} />
      </Canvas>
    </div>
  );
}

