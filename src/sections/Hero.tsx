import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Download } from 'lucide-react';
import { site } from '../data/site';
import { ButtonLink } from '../components/ui/ButtonLink';
import { SculptureFallback } from '../components/three/SculptureFallback';
import { heroState } from '../components/three/heroState';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import('../components/three/HeroCanvas'));

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/* Textbook identities, not data: nothing here can be mistaken for a result */
const formulae = [
  { text: 'EV = Σ FCFₜ / (1 + WACC)ᵗ + TV', position: 'right-[30%] top-[20%]', shift: -70 },
  { text: 'β = Cov(Rᵢ, Rₘ) / Var(Rₘ)', position: 'right-[5%] top-[36%]', shift: -130 },
  { text: 'ROE = Margin × Turnover × Leverage', position: 'right-[20%] bottom-[18%]', shift: -100 },
];

function FloatingFormula({
  text,
  position,
  shift,
  progress,
  delay,
}: {
  text: string;
  position: string;
  shift: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  delay: number;
}) {
  const y = useTransform(progress, [0, 1], [0, shift]);
  return (
    <motion.div data-hero className={`absolute hidden lg:block ${position}`} style={{ y }}>
      <p
        className="drift rounded-sm border border-line bg-surface/70 px-3 py-2 font-mono text-[11px] text-mist backdrop-blur-sm"
        style={{ animationDelay: `${delay}s` }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const entrance = useRef<gsap.core.Timeline | null>(null);

  const reduced = usePrefersReducedMotion();
  const compact = useMediaQuery('(max-width: 767px)');
  const [webgl] = useState(supportsWebGL);
  const [inView, setInView] = useState(true);

  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });

  /* Pause the 3D scene when the hero is off screen */
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  /* Entrance timeline and scroll-linked camera, only when motion is welcome */
  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-hero]', root.current);
      gsap.set(items, { autoAlpha: 0, y: 36 });

      entrance.current = gsap
        .timeline({ paused: true })
        .to(items, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.11, ease: 'power3.out' });

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          heroState.scroll = self.progress;
        },
      });

      gsap.to(content.current, {
        yPercent: -10,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      return () => {
        entrance.current = null;
        heroState.scroll = 0;
      };
    });

    return () => media.revert();
  }, []);

  useEffect(() => {
    if (ready) entrance.current?.play();
  }, [ready]);

  return (
    <section
      id="top"
      ref={root}
      aria-label="Introduction"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* 3D layer */}
      <div aria-hidden className="absolute inset-0">
        {webgl ? (
          <Suspense fallback={<SculptureFallback />}>
            <HeroCanvas active={inView} reduced={reduced} compact={compact} />
          </Suspense>
        ) : (
          <SculptureFallback />
        )}
      </div>

      {/* Scrims keep the text readable over the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-bg/60 md:hidden" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(90deg, #080A0D 0%, rgba(8,10,13,0.82) 38%, rgba(8,10,13,0) 72%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(180deg, rgba(8,10,13,0) 0%, #080A0D 100%)' }}
      />

      {/* Floating formulae */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {formulae.map((item, index) => (
          <FloatingFormula key={item.text} {...item} progress={scrollYProgress} delay={index * 1.7} />
        ))}
      </div>

      {/* Content */}
      <div ref={content} className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 md:px-10">
        <div className="max-w-2xl">
          <h1
            data-hero
            className="font-display text-[clamp(3rem,9vw,6.75rem)] font-medium uppercase leading-[0.92] tracking-[0.04em] text-ivory"
          >
            <span className="block">Siddhant</span>
            <span className="block">Singh</span>
          </h1>

          <p data-hero className="mt-8 font-display text-2xl italic text-gold md:text-3xl">
            {site.tagline}
          </p>

          <p data-hero className="mt-6 max-w-xl text-lg text-mist">
            {site.intro}
          </p>

          <div data-hero className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="#projects">Explore my work</ButtonLink>
            <ButtonLink href={site.resumeUrl} variant="outline" download>
              <Download size={16} aria-hidden />
              Download résumé
            </ButtonLink>
          </div>

          <ul data-hero className="mt-10 flex flex-wrap gap-8 text-sm text-mist">
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                LinkedIn <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                GitHub <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
