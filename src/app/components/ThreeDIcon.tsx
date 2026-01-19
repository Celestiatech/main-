"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function ThreeDIcon({ 
  color = "#3b82f6", 
  secondaryColor = "#f97316",
  size = 60 
}: { 
  color?: string;
  secondaryColor?: string;
  size?: number;
}) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={secondaryColor} />
        <IconMesh color={color} secondaryColor={secondaryColor} />
      </Canvas>
    </div>
  );
}

function IconMesh({ color, secondaryColor }: { color: string; secondaryColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      {/* Accent sphere */}
      <mesh position={[0.6, 0.6, 0.3]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={secondaryColor} />
      </mesh>
    </Float>
  );
}

