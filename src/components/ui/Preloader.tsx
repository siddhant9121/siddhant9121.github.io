import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* Covers the page until the fonts are ready, so the hero never
   animates in with fallback type. Never waits more than 3 seconds. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();

    Promise.all([wait(900), Promise.race([fonts, wait(3000)])]).then(() => {
      if (cancelled) return;
      setVisible(false);
      onDone();
    });

    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[90] grid place-items-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-48 text-center">
            <p className="font-display text-3xl tracking-[0.25em] text-ivory">SS</p>
            <div className="mt-5 h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
