"use client";

import { useRef, useEffect, useMemo, useState, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, ScrollControls, Scroll } from "@react-three/drei";
import * as THREE from "three";

interface ScrollCameraJourneyProps {
  children: React.ReactNode;
  pages?: number;
  damping?: number;
  sectionIds?: string[];
}

function AnimatedScene({ sectionIds }: { sectionIds?: string[] }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 8));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  // Camera positions for each section
  const cameraPositions = useMemo(() => [
    new THREE.Vector3(0, 0, 8),    // Hero
    new THREE.Vector3(2, -2, 6),   // Services
    new THREE.Vector3(-2, -6, 5),  // Awards
    new THREE.Vector3(0, -12, 4),  // Portfolio
    new THREE.Vector3(1, -18, 5),  // Process
    new THREE.Vector3(-1, -24, 6), // Testimonials
  ], []);
  
  const scroll = useScroll();
  
  useFrame(() => {
    const scrollOffset = scroll.offset;
    
    // Calculate which section we're in
    const sectionCount = cameraPositions.length;
    const sectionIndex = Math.min(Math.floor(scrollOffset * sectionCount), sectionCount - 1);
    const sectionProgress = (scrollOffset * sectionCount) % 1;
    
    // Interpolate between camera positions
    const startPos = cameraPositions[sectionIndex];
    const endPos = cameraPositions[Math.min(sectionIndex + 1, sectionCount - 1)];
    
    targetPosition.current.lerpVectors(startPos, endPos, sectionProgress);
    
    // Smooth camera movement with spring-like easing
    const dampingFactor = 0.05;
    currentPosition.current.lerp(targetPosition.current, dampingFactor);
    
    // Use set() instead of copy() to avoid mutation warnings
    camera.position.set(
      currentPosition.current.x,
      currentPosition.current.y,
      currentPosition.current.z
    );
    
    // Subtle look-at interpolation
    const lookY = -scrollOffset * 30;
    targetLookAt.current.set(0, lookY, 0);
    currentLookAt.current.lerp(targetLookAt.current, dampingFactor * 0.5);
    camera.lookAt(currentLookAt.current);
  });

  return (
    <group ref={groupRef}>
      {sectionIds?.map((id, i) => (
        <group key={id} position={[0, -i * 10, 0]}>
          <mesh visible={false}>
            <planeGeometry args={[20, 10]} />
            <meshBasicMaterial />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ParallaxElements() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scroll = useScroll();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = -scroll.offset * viewport.height * 3;
      groupRef.current.rotation.z = scroll.offset * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-viewport.width / 3, 0, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#1e3a8a" transparent opacity={0.1} />
      </mesh>
      <mesh position={[viewport.width / 3, -10, -8]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function ScrollCameraJourney({
  children,
  pages = 5,
  damping = 0.1,
  sectionIds
}: ScrollCameraJourneyProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease-in" }}>
      <ScrollControls
        pages={pages}
        damping={damping}
        horizontal={false}
        infinite={false}
      >
        <Suspense fallback={null}>
          <Scroll>
            <AnimatedScene sectionIds={sectionIds} />
            <ParallaxElements />
          </Scroll>
        </Suspense>
        
        <Scroll html style={{ width: "100%" }}>
          {children}
        </Scroll>
      </ScrollControls>
    </div>
  );
}

export function useScrollCamera() {
  return useScroll();
}

