import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture, Html } from '@react-three/drei';
import { Suspense, useState } from 'react';
import * as THREE from 'three';

interface ResearchPoint {
  position: [number, number, number];
  title: string;
  description: string;
}

interface PlanetProps {
  textureUrl: string;
  color: string;
  researchPoints: ResearchPoint[];
}

interface PinProps {
  position: [number, number, number];
  point: ResearchPoint;
}

function Pin({ position, point }: PinProps) {
  const [hovered, setHovered] = useState(false);
  
  // Calculate rotation to point towards planet center
  const direction = new THREE.Vector3(...position).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
  const rotation = new THREE.Euler().setFromQuaternion(quaternion);
  
  return (
    <group position={position} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Pin stick (cylinder) */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.01, 0.015, 0.16, 16]} />
        <meshStandardMaterial 
          color={hovered ? "#ff1a1a" : "#ff0000"}
          emissive={hovered ? "#ff1a1a" : "#ff0000"}
          emissiveIntensity={hovered ? 1.2 : 0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Pin head (sphere) */}
      <mesh 
        position={[0, 0.18, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshStandardMaterial 
          color={hovered ? "#ff1a1a" : "#ff0000"}
          emissive={hovered ? "#ff3333" : "#ff0000"}
          emissiveIntensity={hovered ? 1.5 : 1.0}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      
      {/* Glow effect */}
      {hovered && (
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.08, 20, 20]} />
          <meshBasicMaterial 
            color="#ff3333"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
      
      {/* Hover tooltip */}
      {hovered && (
        <Html
          position={[0, 0.3, 0]}
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-md shadow-xl px-3 py-2 animate-fade-in" style={{ width: 'auto', maxWidth: '250px', textAlign: 'center' }}>
            <h3 className="font-semibold text-foreground" style={{ fontSize: '9px', lineHeight: '1.3' }}>{point.title}</h3>
          </div>
        </Html>
      )}
    </group>
  );
}

function Planet({ textureUrl, color, researchPoints }: PlanetProps) {
  const texture = useTexture(textureUrl);
  
  // Configure texture for better quality with equirectangular maps
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial 
        map={texture}
        roughness={0.9}
        metalness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
      {/* Research pins */}
      {researchPoints.map((point, index) => (
        <Pin 
          key={index}
          position={point.position}
          point={point}
        />
      ))}
    </Sphere>
  );
}

interface InteractivePlanetProps {
  textureUrl: string;
  color: string;
  researchPoints: ResearchPoint[];
}

export function InteractivePlanet({ textureUrl, color, researchPoints }: InteractivePlanetProps) {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, -3, -5]} intensity={0.3} />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color={color} />
          
          <Planet 
            textureUrl={textureUrl} 
            color={color}
            researchPoints={researchPoints}
          />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={false}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Arraste para rotacionar • Scroll para zoom • Passe o mouse nos alfinetes
      </p>
    </div>
  );
}
