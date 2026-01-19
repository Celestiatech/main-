"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface ThreeDCardProps {
  children: React.ReactNode;
  color?: string;
  height?: number;
}

function CardMesh({ hovered, color }: { hovered: boolean; color?: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const targetRotationX = hovered ? 0.1 : 0;
      const targetRotationY = hovered ? 0.1 : 0;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main card body */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[2.2, 3, 0.1]} />
        <meshStandardMaterial
          color={color || "#ffffff"}
          transparent
          opacity={0.95}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Glowing edge on hover */}
      {hovered && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.25, 3.05, 0.08]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </mesh>
      )}
      
      {/* Floating particles effect */}
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[1, 1.2, 0.2]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[-1, -1.2, 0.2]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeDCard({ children, color = "#ffffff", height = 300 }: ThreeDCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ 
        height,
        perspective: "1000px",
        cursor: "pointer"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ 
        position: "relative", 
        height: "100%", 
        width: "100%",
        transformStyle: "preserve-3d",
        transform: hovered ? "perspective(1000px) rotateX(5deg) rotateY(5deg) scale3d(1.02, 1.02, 1.02)" : "perspective(1000px)",
        transition: "transform 0.3s ease"
      }}>
        {/* 3D Background */}
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%",
          zIndex: 0
        }}>
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#60a5fa" />
            <CardMesh hovered={hovered} color={color} />
          </Canvas>
        </div>
        
        {/* Content overlay */}
        <div style={{ 
          position: "relative", 
          zIndex: 1,
          height: "100%",
          padding: "24px",
          boxSizing: "border-box"
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

