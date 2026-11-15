import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative scroll-mt-20 py-24 md:py-36 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  label: string;
  title: string;
  lede?: string;
}

export function SectionHeading({ label, title, lede }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 max-w-3xl md:mb-20">
      <p className="flex items-center gap-4 text-sm text-gold">
        <span aria-hidden className="h-px w-10 bg-gold" />
        {label}
      </p>
      <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] text-ivory md:text-6xl">{title}</h2>
      {lede && <p className="mt-6 max-w-2xl text-lg text-mist">{lede}</p>}
    </Reveal>
  );
}
