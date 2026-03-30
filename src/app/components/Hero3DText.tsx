"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function Animated3DText({ text, position, color = "#60a5fa", size = 1 }: {
  text: string;
  position: [number, number, number];
  color?: string;
  size?: number;
}) {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text
        ref={textRef}
        position={position}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={10}
        textAlign="center"
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Text>
    </Float>
  );
}

export default function Hero3DText({ headline, subheadline }: {
  headline: string;
  subheadline: string;
}) {
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "100%",
      zIndex: 2,
      pointerEvents: "none"
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />

        <Animated3DText
          text={headline}
          position={[0, 1, 0]}
          color="#60a5fa"
          size={1.5}
        />

        <Animated3DText
          text={subheadline}
          position={[0, -0.5, 0]}
          color="#8b5cf6"
          size={0.8}
        />

        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}