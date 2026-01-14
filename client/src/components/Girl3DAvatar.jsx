import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

function GirlModel({ dressColor, shoesColor, hairColor, outfit }) {
  // Define outfit styles
  const outfits = {
    dress: {
      topType: 'dress',
      bottomType: 'none'
    },
    casual: {
      topType: 'tshirt',
      bottomType: 'jeans'
    },
    formal: {
      topType: 'blouse',
      bottomType: 'skirt'
    }
  };

  const currentOutfit = outfits[outfit] || outfits.dress;

  return (
    <group position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffe0bd" roughness={0.7} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.75, -0.05]}>
        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>
      
      {/* Body - Changes based on outfit */}
      {currentOutfit.topType === 'dress' ? (
        // Dress
        <>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.55, 0.95, 0.35]} />
            <meshStandardMaterial color={dressColor} roughness={0.5} />
          </mesh>
          {/* Dress flare */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.45, 0.3, 0.3, 32]} />
            <meshStandardMaterial color={dressColor} roughness={0.5} />
          </mesh>
        </>
      ) : currentOutfit.topType === 'blouse' ? (
        // Formal blouse
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.3]} />
          <meshStandardMaterial color={dressColor} roughness={0.3} />
        </mesh>
      ) : (
        // Casual T-shirt
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.28, 0.3, 0.8, 32]} />
          <meshStandardMaterial color={dressColor} roughness={0.6} />
        </mesh>
      )}
      
      {/* Arms */}
      <mesh position={[-0.38, 0.85, 0]}>
        <capsuleGeometry args={[0.08, 0.7, 8, 16]} />
        <meshStandardMaterial color="#ffe0bd" roughness={0.7} />
      </mesh>
      <mesh position={[0.38, 0.85, 0]}>
        <capsuleGeometry args={[0.08, 0.7, 8, 16]} />
        <meshStandardMaterial color="#ffe0bd" roughness={0.7} />
      </mesh>
      
      {/* Bottom - Changes based on outfit */}
      {currentOutfit.bottomType === 'jeans' ? (
        // Jeans
        <>
          <mesh position={[-0.13, -0.2, 0]}>
            <capsuleGeometry args={[0.09, 1, 8, 16]} />
            <meshStandardMaterial color="#4a5f7f" roughness={0.7} />
          </mesh>
          <mesh position={[0.13, -0.2, 0]}>
            <capsuleGeometry args={[0.09, 1, 8, 16]} />
            <meshStandardMaterial color="#4a5f7f" roughness={0.7} />
          </mesh>
        </>
      ) : currentOutfit.bottomType === 'skirt' ? (
        // Skirt
        <>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.4, 0.25, 0.4, 32]} />
            <meshStandardMaterial color={dressColor} roughness={0.4} />
          </mesh>
          {/* Legs showing below skirt */}
          <mesh position={[-0.13, -0.35, 0]}>
            <capsuleGeometry args={[0.09, 0.8, 8, 16]} />
            <meshStandardMaterial color="#ffe0bd" roughness={0.7} />
          </mesh>
          <mesh position={[0.13, -0.35, 0]}>
            <capsuleGeometry args={[0.09, 0.8, 8, 16]} />
            <meshStandardMaterial color="#ffe0bd" roughness={0.7} />
          </mesh>
        </>
      ) : (
        // Dress (legs showing)
        <>
          <mesh position={[-0.13, -0.25, 0]}>
            <capsuleGeometry args={[0.09, 0.95, 8, 16]} />
            <meshStandardMaterial color="#ffe0bd" roughness={0.7} />
          </mesh>
          <mesh position={[0.13, -0.25, 0]}>
            <capsuleGeometry args={[0.09, 0.95, 8, 16]} />
            <meshStandardMaterial color="#ffe0bd" roughness={0.7} />
          </mesh>
        </>
      )}
      
      {/* Shoes */}
      <mesh position={[-0.13, -0.8, 0.05]}>
        <boxGeometry args={[0.2, 0.1, 0.28]} />
        <meshStandardMaterial color={shoesColor} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0.13, -0.8, 0.05]}>
        <boxGeometry args={[0.2, 0.1, 0.28]} />
        <meshStandardMaterial color={shoesColor} roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.1, 1.65, 0.28]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.1, 1.65, 0.28]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
}

export default function Girl3DAvatar({ dressColor = '#e91e63', shoesColor = '#9c27b0', hairColor = '#8b4513', outfit = 'dress' }) {
  return (
    <div style={{ width: '100%', height: '500px', borderRadius: '20px', overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, 0.5, 4], fov: 45 }}>
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight
            position={[-5, 5, 2]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          <pointLight position={[0, 2, -2]} intensity={0.3} />
          
          {/* 3D Model */}
          <GirlModel dressColor={dressColor} shoesColor={shoesColor} hairColor={hairColor} outfit={outfit} />
          
          {/* Ground Shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={3}
            blur={2}
            far={4}
          />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          {/* Environment */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
