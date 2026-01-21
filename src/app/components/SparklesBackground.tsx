"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface SparklesBackgroundProps {
  color?: string;
  count?: number;
  scale?: number;
  size?: number;
  speed?: number;
  opacity?: number;
  sectionRef?: React.RefObject<HTMLElement>;
  zIndex?: number;
}

function SparklesContent({ 
  color = "#60a5fa", 
  count = 100,
  scale = 10,
  size = 3,
  speed = 0.4,
  opacity = 0.5,
  mouseRef
}: { 
  color: string; 
  count: number;
  scale: number;
  size: number;
  speed: number;
  opacity: number;
  mouseRef: React.MutableRefObject<THREE.Vector2>;
}) {
  const meshRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle mouse interaction
      const mouseX = mouseRef.current.x * 0.5;
      const mouseY = mouseRef.current.y * 0.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouseX, 0.02);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouseY, 0.02);
    }
  });

  return (
    <Sparkles 
      ref={meshRef}
      count={count}
      scale={scale}
      size={size}
      speed={speed}
      opacity={opacity}
      color={color}
    />
  );
}

export default function SparklesBackground({
  color = "#60a5fa",
  count = 100,
  scale = 10,
  size = 3,
  speed = 0.4,
  opacity = 0.5,
  zIndex = 0
}: SparklesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    setMounted(true);
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex,
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <SparklesContent
          color={color}
          count={count}
          scale={scale}
          size={size}
          speed={speed}
          opacity={opacity}
          mouseRef={mouseRef}
        />
      </Canvas>
    </div>
  );
}

