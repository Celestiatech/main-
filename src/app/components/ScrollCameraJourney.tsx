"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, ScrollControls, Scroll, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ScrollCameraJourneyProps {
  children: React.ReactNode;
  pages?: number;
  damping?: number;
  sectionIds?: string[];
}

function AnimatedScene({ scroll, sectionIds }: { scroll: any; sectionIds?: string[] }) {
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
  
  useFrame((state, delta) => {
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
    
    camera.position.copy(currentPosition.current);
    
    // Subtle look-at interpolation
    const lookY = -scrollOffset * 30;
    targetLookAt.current.set(0, lookY, 0);
    currentLookAt.current.lerp(targetLookAt.current, dampingFactor * 0.5);
    camera.lookAt(currentLookAt.current);
  });

  return (
    <group ref={groupRef}>
      {/* Section markers for debugging */}
      {sectionIds?.map((id, i) => (
        <group key={id} position={[0, -i * 10, 0]}>
          {/* Invisible marker for scroll tracking */}
          <mesh visible={false}>
            <planeGeometry args={[20, 10]} />
            <meshBasicMaterial />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Section Fade System
interface SectionFadeProps {
  scroll: any;
  sections: { id: string; position: [number, number, number] }[];
}

function SectionFadeSystem({ scroll, sections }: SectionFadeProps) {
  return (
    <group>
      {sections.map((section, index) => (
        <FadeTransition
          key={section.id}
          scroll={scroll}
          index={index}
          totalSections={sections.length}
          position={section.position}
        />
      ))}
    </group>
  );
}

function FadeTransition({ 
  scroll, 
  index, 
  totalSections,
  position 
}: { 
  scroll: any; 
  index: number; 
  totalSections: number;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const scrollOffset = scroll.offset;
    const progress = scrollOffset * totalSections;
    const sectionStart = index;
    const sectionEnd = index + 1;
    
    // Calculate opacity based on scroll position
    let opacity = 0;
    if (progress >= sectionStart - 0.5 && progress <= sectionEnd + 0.5) {
      // Fade in
      if (progress < sectionStart) {
        opacity = (progress - (sectionStart - 1)) * 2;
      }
      // Fade out
      else if (progress > sectionEnd) {
        opacity = 1 - (progress - sectionEnd) * 2;
      }
      // Fully visible
      else {
        opacity = 1;
      }
    }
    
    // Clamp and smooth
    opacity = Math.max(0, Math.min(1, opacity));
    
    if (meshRef.current.material) {
      const material = meshRef.current.material as THREE.Material;
      material.opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[30, 15]} />
      <meshBasicMaterial transparent opacity={0} color="transparent" />
    </mesh>
  );
}

// Background Elements that move with scroll
function ParallaxElements({ scroll }: { scroll: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  useFrame(() => {
    if (groupRef.current) {
      // Parallax movement opposite to scroll
      groupRef.current.position.y = -scroll.offset * viewport.height * 3;
      groupRef.current.rotation.z = scroll.offset * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle background orbs */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-viewport.width / 3, 0, -5]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#1e3a8a" transparent opacity={0.1} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[viewport.width / 3, -10, -8]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ScrollCameraJourney({
  children,
  pages = 5,
  damping = 0.1,
  sectionIds
}: ScrollCameraJourneyProps) {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Define section positions for fade system
  const sections = [
    { id: "hero", position: [0, 0, 0] as [number, number, number] },
    { id: "services", position: [0, -10, 0] as [number, number, number] },
    { id: "awards", position: [0, -20, 0] as [number, number, number] },
    { id: "portfolio", position: [0, -30, 0] as [number, number, number] },
    { id: "process", position: [0, -40, 0] as [number, number, number] },
    { id: "testimonials", position: [0, -50, 0] as [number, number, number] },
    { id: "contact", position: [0, -60, 0] as [number, number, number] },
  ];

  return (
    <ScrollControls
      pages={pages}
      damping={damping}
      horizontal={false}
      infinite={false}
    >
      <Scroll>
        <AnimatedScene scroll={scrollRef.current || { offset: 0 }} sectionIds={sectionIds} />
        <ParallaxElements scroll={scrollRef.current || { offset: 0 }} />
      </Scroll>
      
      <Scroll html style={{ width: "100%" }}>
        {children}
      </Scroll>
    </ScrollControls>
  );
}

// Hook to access scroll state
export function useScrollCamera() {
  const scroll = useScroll();
  return scroll;
}

