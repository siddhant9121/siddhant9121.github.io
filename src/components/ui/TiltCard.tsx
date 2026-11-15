import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

/* Tilts toward the pointer. Disabled on touch screens and under reduced motion. */
export function TiltCard({ children, className = '' }: TiltCardProps) {
  const reduced = usePrefersReducedMotion();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const enabled = finePointer && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), spring);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="h-full" style={{ perspective: 900 }}>
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`h-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
