"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function ServiceCard3D({ title, description, icon, index }: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1 + index * 0.5) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 4, 0.2]} />
          <meshStandardMaterial
            color={hovered ? "#60a5fa" : "#1e293b"}
            emissive={hovered ? "#60a5fa" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Icon */}
        <Text
          position={[0, 1.5, 0.11]}
          fontSize={0.8}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>

        {/* Title */}
        <Text
          position={[0, 0.5, 0.11]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          position={[0, -1, 0.11]}
          fontSize={0.25}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {description}
        </Text>
      </Float>
    </group>
  );
}

export default function ServiceCard({ title, description, icon, index }: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) {
  return (
    <div className="service-card-container" style={{
      width: "300px",
      height: "400px",
      position: "relative",
      cursor: "pointer"
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#60a5fa" />

        <ServiceCard3D
          title={title}
          description={description}
          icon={icon}
          index={index}
        />

        <EffectComposer>
          <Bloom intensity={0.3} luminanceThreshold={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}