import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Points } from 'three';

interface ParticlesProps {
  count: number;
  animate: boolean;
}

/* A sparse field of gold dust behind the sculpture */
export function Particles({ count, animate }: ParticlesProps) {
  const points = useRef<Points>(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 18;
      array[i * 3 + 1] = (Math.random() - 0.5) * 10;
      array[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (animate && points.current) points.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={points} key={count}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#C5A46D"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
