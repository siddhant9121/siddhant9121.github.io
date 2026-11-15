import { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { MathUtils } from 'three';
import { heroState } from './heroState';
import { Sculpture } from './Sculpture';
import { Particles } from './Particles';

interface HeroCanvasProps {
  /* false pauses rendering while the hero is off screen */
  active: boolean;
  /* true renders one still frame and no motion */
  reduced: boolean;
  /* true on small screens: fewer particles, lower resolution */
  compact: boolean;
}

/* Eases the camera toward the pointer and pulls it back on scroll */
function CameraRig() {
  useFrame((state, delta) => {
    const { camera } = state;
    camera.position.x = MathUtils.damp(camera.position.x, heroState.pointerX * 0.45, 2.5, delta);
    camera.position.y = MathUtils.damp(camera.position.y, -heroState.pointerY * 0.3, 2.5, delta);
    camera.position.z = MathUtils.damp(camera.position.z, 7 + heroState.scroll * 2.5, 3, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* With frameloop="demand" nothing redraws by itself, so request a few
   frames while the environment map and fonts settle. */
function StillFrame() {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    const timers = [100, 400, 1000].map((ms) => window.setTimeout(() => invalidate(), ms));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [invalidate]);
  return null;
}

export default function HeroCanvas({ active, reduced, compact }: HeroCanvasProps) {
  useEffect(() => {
    if (reduced || compact) return;
    const onMove = (event: PointerEvent) => {
      heroState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      heroState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, compact]);

  return (
    <Canvas
      dpr={[1, compact ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} color="#F4F0E8" />
      <pointLight position={[-4, -2, 3]} intensity={20} color="#C5A46D" />

      {/* Reflections for the metal, generated locally: no HDR download */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={4} color="#F4F0E8" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#C5A46D" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#527C68" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>

      <Sculpture
        animate={!reduced}
        position={compact ? [0, 0.7, 0] : [2.1, 0.1, 0]}
        scale={compact ? 0.72 : 1}
      />
      <Particles count={compact ? 220 : 650} animate={!reduced} />

      {reduced ? <StillFrame /> : <CameraRig />}
    </Canvas>
  );
}
