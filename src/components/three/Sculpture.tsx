import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import type { Group, Mesh } from 'three';
import { heroState } from './heroState';

interface RingProps {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  animate: boolean;
}

/* One orbit: a thin metal ring with a bead that travels around it */
function Ring({ radius, tilt, speed, color, animate }: RingProps) {
  const spin = useRef<Group>(null);

  useFrame((_, delta) => {
    if (animate && spin.current) spin.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={tilt}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, 0.011, 12, 180]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.22} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.055, 24, 24]} />
          <meshStandardMaterial color="#F4F0E8" metalness={1} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
}

interface SculptureProps {
  animate: boolean;
  position: [number, number, number];
  scale: number;
}

/* An armillary sphere: a faceted metal core inside three orbit rings */
export function Sculpture({ animate, position, scale }: SculptureProps) {
  const parallax = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!animate) return;
    const time = state.clock.elapsedTime;

    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }

    if (parallax.current) {
      const targetY = heroState.pointerX * 0.35 + heroState.scroll * Math.PI * 0.5;
      const targetX = heroState.pointerY * 0.2;
      parallax.current.rotation.y = MathUtils.damp(parallax.current.rotation.y, targetY, 3, delta);
      parallax.current.rotation.x = MathUtils.damp(parallax.current.rotation.x, targetX, 3, delta);
      parallax.current.position.y = MathUtils.damp(parallax.current.position.y, heroState.scroll * 1.4, 4, delta);
    }
  });

  return (
    <group position={position} scale={scale}>
      <group ref={parallax}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#1B2029" metalness={1} roughness={0.28} flatShading />
        </mesh>
        <mesh rotation={[0.4, 0.2, 0]}>
          <icosahedronGeometry args={[1.42, 1]} />
          <meshBasicMaterial color="#C5A46D" wireframe transparent opacity={0.12} />
        </mesh>

        <Ring radius={1.75} tilt={[1.15, 0.2, 0]} speed={0.22} color="#C5A46D" animate={animate} />
        <Ring radius={2.1} tilt={[0.5, -0.7, 0.3]} speed={-0.15} color="#C5A46D" animate={animate} />
        <Ring radius={2.45} tilt={[1.5, 0.9, 0]} speed={0.1} color="#527C68" animate={animate} />
      </group>
    </group>
  );
}
