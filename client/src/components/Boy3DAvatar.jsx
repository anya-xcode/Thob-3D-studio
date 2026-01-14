import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

function BoyModel({ shirtColor, pantsColor, shoesColor, outfit }) {
  // Define outfit styles
  const outfits = {
    casual: {
      shirtType: 'box',
      pantsType: 'regular'
    },
    formal: {
      shirtType: 'formal',
      pantsType: 'suit'
    },
    sporty: {
      shirtType: 'tshirt',
      pantsType: 'shorts'
    }
  };

  const currentOutfit = outfits[outfit] || outfits.casual;

  return (
    <group position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.7} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>
      
      {/* Body - Changes based on outfit */}
      {currentOutfit.shirtType === 'formal' ? (
        // Formal shirt with collar
        <>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.6, 1, 0.4]} />
            <meshStandardMaterial color={shirtColor} roughness={0.3} />
          </mesh>
          {/* Collar */}
          <mesh position={[0, 1.25, 0.15]}>
            <boxGeometry args={[0.35, 0.1, 0.05]} />
            <meshStandardMaterial color={shirtColor} roughness={0.3} />
          </mesh>
        </>
      ) : currentOutfit.shirtType === 'tshirt' ? (
        // T-shirt
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.32, 0.35, 1, 32]} />
          <meshStandardMaterial color={shirtColor} roughness={0.6} />
        </mesh>
      ) : (
        // Casual shirt
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.6, 1, 0.4]} />
          <meshStandardMaterial color={shirtColor} roughness={0.5} />
        </mesh>
      )}
      
      {/* Arms */}
      <mesh position={[-0.4, 0.8, 0]}>
        <capsuleGeometry args={[0.08, 0.7, 8, 16]} />
        <meshStandardMaterial color={shirtColor} roughness={0.5} />
      </mesh>
      <mesh position={[0.4, 0.8, 0]}>
        <capsuleGeometry args={[0.08, 0.7, 8, 16]} />
        <meshStandardMaterial color={shirtColor} roughness={0.5} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.4, 0.35, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.7} />
      </mesh>
      <mesh position={[0.4, 0.35, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.7} />
      </mesh>
      
      {/* Legs - Changes based on outfit */}
      {currentOutfit.pantsType === 'shorts' ? (
        // Shorts
        <>
          <mesh position={[-0.15, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
            <meshStandardMaterial color={pantsColor} roughness={0.6} />
          </mesh>
          <mesh position={[0.15, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
            <meshStandardMaterial color={pantsColor} roughness={0.6} />
          </mesh>
          {/* Lower legs (skin) */}
          <mesh position={[-0.15, -0.5, 0]}>
            <capsuleGeometry args={[0.09, 0.5, 8, 16]} />
            <meshStandardMaterial color="#ffdbac" roughness={0.7} />
          </mesh>
          <mesh position={[0.15, -0.5, 0]}>
            <capsuleGeometry args={[0.09, 0.5, 8, 16]} />
            <meshStandardMaterial color="#ffdbac" roughness={0.7} />
          </mesh>
        </>
      ) : (
        // Regular/Suit pants
        <>
          <mesh position={[-0.15, -0.2, 0]}>
            <capsuleGeometry args={[0.1, 1, 8, 16]} />
            <meshStandardMaterial color={pantsColor} roughness={currentOutfit.pantsType === 'suit' ? 0.4 : 0.6} />
          </mesh>
          <mesh position={[0.15, -0.2, 0]}>
            <capsuleGeometry args={[0.1, 1, 8, 16]} />
            <meshStandardMaterial color={pantsColor} roughness={currentOutfit.pantsType === 'suit' ? 0.4 : 0.6} />
          </mesh>
        </>
      )}
      
      {/* Shoes */}
      <mesh position={[-0.15, -0.8, 0.05]}>
        <boxGeometry args={[0.22, 0.1, 0.3]} />
        <meshStandardMaterial color={shoesColor} roughness={0.3} />
      </mesh>
      <mesh position={[0.15, -0.8, 0.05]}>
        <boxGeometry args={[0.22, 0.1, 0.3]} />
        <meshStandardMaterial color={shoesColor} roughness={0.3} />
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

export default function Boy3DAvatar({ shirtColor = '#4a90e2', pantsColor = '#2c3e50', shoesColor = '#34495e', outfit = 'casual' }) {
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
          <BoyModel shirtColor={shirtColor} pantsColor={pantsColor} shoesColor={shoesColor} outfit={outfit} />
          
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
