import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Section, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { usePrefersReducedMotion } from '../hooks';

const strengths = [
  { title: 'Analytical thinking', text: 'Breaking a question into parts that can be tested.' },
  { title: 'Business fundamentals', text: 'Asking how a company earns its money before modelling it.' },
  { title: 'Financial statement analysis', text: 'Reading the three statements together, not one at a time.' },
  { title: 'Quantitative reasoning', text: 'Statistics and hypothesis testing, used to check a claim.' },
  { title: 'Technology-driven research', text: 'Python and SQL to gather, clean and analyse financial data.' },
];

/* Three planes in CSS 3D: a valuation rests on the statements,
   and the statements rest on the business. */
function LayerStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-54, -26]);
  const layers = ['The business', 'Financial statements', 'Valuation'];

  return (
    <div ref={ref} aria-hidden className="relative mx-auto h-80 w-full max-w-sm" style={{ perspective: 1100 }}>
      <motion.div
        className="absolute left-1/2 top-[58%] h-48 w-48"
        style={{
          x: '-50%',
          y: '-50%',
          rotateX: 60,
          rotateZ: reduced ? -40 : rotateZ,
          transformStyle: 'preserve-3d',
        }}
      >
        {layers.map((label, index) => {
          const top = index === layers.length - 1;
          return (
            <div
              key={label}
              className={`absolute inset-0 border ${top ? 'border-gold bg-gold/10' : 'border-line bg-card/70'}`}
              style={{ transform: `translateZ(${index * 58}px)` }}
            >
              <span className={`absolute left-3 top-2 font-mono text-[10px] ${top ? 'text-gold' : 'text-mist'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function About() {
  return (
    <Section id="about">
      <SectionHeading label="About" title="An engineer learning to value businesses." />

      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="space-y-6 text-lg text-mist lg:col-span-7">
          <p className="font-display text-2xl leading-snug text-ivory md:text-3xl">
            I am in the final year of a B.Tech in AI and Data Science, and I am moving towards finance and investment
            research.
          </p>
          <p>
            Engineering taught me to work with data: to build a model, test it, and distrust a result until it survives
            a proper check. My projects kept drawing me to financial questions, first pricing risk in equity returns,
            then detecting money laundering in transaction data.
          </p>
          <p>
            That work showed me what the data alone cannot say. A model can measure how a stock moves, but not what the
            business behind it is worth. So I am now learning the other half: financial statements, valuation and
            corporate finance. I am studying DCF valuation and preparing for CFA Level I.
          </p>
          <p>
            I am at the start of this path, not the end of it. What I bring today is a quantitative foundation, working
            code, and the habit of checking my own conclusions.
          </p>
        </Reveal>

        <div className="lg:col-span-5">
          <LayerStack />
          <Reveal>
            <dl className="mt-6 border-t border-line">
              {strengths.map((item) => (
                <div key={item.title} className="border-b border-line py-4">
                  <dt className="font-medium text-ivory">{item.title}</dt>
                  <dd className="mt-1 text-sm text-mist">{item.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
