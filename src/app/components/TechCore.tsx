"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Text, Line, Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface TechItem {
  name: string;
  category: "frontend" | "backend" | "mobile" | "emerging";
  color: string;
}

interface TechCoreProps {
  techItems?: TechItem[];
  size?: number;
}

interface OrbitingTechProps {
  item: TechItem;
  index: number;
  totalItems: number;
  radius: number;
  speed: number;
  onHover: (item: TechItem | null) => void;
  hoveredItem: TechItem | null;
}

// Inner component that uses useThree - must be inside Canvas
function OrbitingTechInner({ item, index, totalItems, radius, speed, onHover, hoveredItem }: OrbitingTechProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  const angle = (index / totalItems) * Math.PI * 2;
  const yOffset = Math.sin(index * 0.5) * 1.5;
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const currentAngle = angle + time * speed;
      
      groupRef.current.position.x = Math.cos(currentAngle) * radius;
      groupRef.current.position.z = Math.sin(currentAngle) * radius;
      groupRef.current.position.y = yOffset + Math.sin(time * 0.5 + index) * 0.3;
      
      // Look at camera
      groupRef.current.lookAt(camera.position);
    }
    
    // Scale animation on hover
    if (meshRef.current) {
      const targetScale = isHovered || hoveredItem === item ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handlePointerOver = () => {
    setIsHovered(true);
    onHover(item);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    onHover(null);
    document.body.style.cursor = "default";
  };

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1.2, 0.4, 0.1]} />
        <meshStandardMaterial
          color={item.color}
          emissive={item.color}
          emissiveIntensity={isHovered || hoveredItem === item ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Tech name label */}
      {(isHovered || hoveredItem === item) && (
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {item.name}
        </Text>
      )}
    </group>
  );
}

// Connection lines - must be inside Canvas
function ConnectionLinesInner({ items, radius }: { items: TechItem[]; radius: number }) {
  return (
    <group>
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 0.5) * 1.5;
        
        return (
          <Line
            key={item.name}
            points={[[0, 0, 0], [x, y, z]]}
            color={item.color}
            transparent
            opacity={0.2}
            lineWidth={1}
          />
        );
      })}
    </group>
  );
}

// Scene content - wraps all 3D elements
function TechCoreScene({ 
  items, 
  radius, 
  speed, 
  hoveredItem, 
  setHoveredItem,
  reducedMotion 
}: { 
  items: TechItem[]; 
  radius: number; 
  speed: number;
  hoveredItem: TechItem | null;
  setHoveredItem: (item: TechItem | null) => void;
  reducedMotion: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      {/* Central glowing core */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <CentralCore />
      </Float>
      
      {/* Orbiting tech items */}
      {!reducedMotion && (
        <>
          <ConnectionLinesInner items={items} radius={radius} />
          
          {items.map((item, index) => (
            <OrbitingTechInner
              key={item.name}
              item={item}
              index={index}
              totalItems={items.length}
              radius={radius}
              speed={speed}
              onHover={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          ))}
        </>
      )}
      
      {/* Subtle environment */}
      <Environment preset="city" />
      
      {/* Contact shadows */}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.3}
        scale={15}
        blur={2}
        far={10}
      />
      
      {/* Orbit controls for user exploration */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={!hoveredItem}
        autoRotateSpeed={0.3}
      />
    </>
  );
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      ringRef.current.rotation.y = -state.clock.elapsedTime * 0.15;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          thickness={0.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#3b82f6"
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Rotating ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
      </mesh>
      
      {/* Horizontal ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function TechCore({ 
  techItems = [],
  size = 400 
}: TechCoreProps) {
  const [hoveredItem, setHoveredItem] = useState<TechItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Default tech items if none provided
  const defaultTechItems: TechItem[] = [
    { name: "React", category: "frontend", color: "#61dafb" },
    { name: "TypeScript", category: "frontend", color: "#3178c6" },
    { name: "Node.js", category: "backend", color: "#339933" },
    { name: "Python", category: "backend", color: "#3776ab" },
    { name: "AWS", category: "emerging", color: "#ff9900" },
    { name: "Flutter", category: "mobile", color: "#02569b" },
    { name: "AI/ML", category: "emerging", color: "#ff6b6b" },
    { name: "GraphQL", category: "frontend", color: "#e535ab" },
  ];

  const items = techItems.length > 0 ? techItems : defaultTechItems;
  const radius = 4;
  const speed = 0.2;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    mediaQuery.addEventListener("change", (e) => setReducedMotion(e.matches));
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", () => {});
    };
  }, []);

  // Don't render on mobile for performance
  if (isMobile) {
    return null;
  }

  return (
    <div 
      style={{ 
        width: "100%", 
        height: size,
        position: "relative",
        opacity: reducedMotion ? 0.5 : 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={reducedMotion ? 1 : Math.min(window.devicePixelRatio, 2)}
        frameloop="always"
      >
        <color attach="background" args={["transparent"]} />
        
        <TechCoreScene 
          items={items}
          radius={radius}
          speed={speed}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          reducedMotion={reducedMotion}
        />
      </Canvas>
      
      {/* Tooltip for non-3D fallback */}
      {hoveredItem && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            background: hoveredItem.color,
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {hoveredItem.name} - {hoveredItem.category}
        </div>
      )}
    </div>
  );
}

