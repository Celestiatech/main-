"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ThreeDIconProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  geometry?: "box" | "sphere" | "cylinder";
}

function IconMesh({ color, secondaryColor, hovered }: { color?: string; secondaryColor?: string; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.elapsedTime * 0.3;
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(hovered ? 1.3 : 1.1);
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={glowRef} scale={1.1}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial 
          color={color || "#3b82f6"} 
          transparent 
          opacity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Outer wireframe shape */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color={color || "#3b82f6"}
            transparent
            opacity={0.7}
            wireframe={hovered}
            emissive={color || "#3b82f6"}
            emissiveIntensity={hovered ? 0.8 : 0.2}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      {/* Inner core */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={innerRef} position={[0, 0, 0]} scale={hovered ? 0.6 : 0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={secondaryColor || "#f97316"}
            emissive={secondaryColor || "#f97316"}
            emissiveIntensity={hovered ? 1 : 0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>
      
      {/* Ring effect when hovered */}
      {hovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.5}>
          <torusGeometry args={[0.8, 0.02, 16, 100]} />
          <meshBasicMaterial color={color || "#3b82f6"} transparent opacity={0.8} />
        </mesh>
      )}
      
      {/* Sparkle effects */}
      {hovered && (
        <>
          <Float speed={4} rotationIntensity={1} floatIntensity={0.5}>
            <mesh position={[1, 0.5, 0]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </Float>
          <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[-0.8, -0.5, 0.5]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </Float>
        </>
      )}
    </group>
  );
}

export default function ThreeDIcon({ 
  color = "#3b82f6", 
  secondaryColor = "#f97316", 
  size = 80 
}: ThreeDIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ 
        width: size, 
        height: size,
        cursor: "pointer",
        transition: "transform 0.3s ease"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" />
        <IconMesh color={color} secondaryColor={secondaryColor} hovered={hovered} />
      </Canvas>
    </div>
  );
}

