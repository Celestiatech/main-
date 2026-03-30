"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function LogoMesh({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (meshRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cube */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.5}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#3b82f6"
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      </Float>
      
      {/* Inner glowing core */}
      <mesh position={[0, 0, 0]} scale={0.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
      </mesh>
      
      {/* Corner accents */}
      {[[0.5, 0.5, 0.5], [-0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, 0.5, -0.5]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeDAnimatedLogo({ size = 60 }: { size?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        <LogoMesh hovered={hovered} />
      </Canvas>
    </div>
  );
}

