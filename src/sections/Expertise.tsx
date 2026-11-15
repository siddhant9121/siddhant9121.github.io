import { expertise } from '../data/content';
import { Section, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { StatusTag } from '../components/ui/StatusTag';
import { TiltCard } from '../components/ui/TiltCard';

export function Expertise() {
  return (
    <Section id="expertise" className="bg-surface">
      <SectionHeading
        label="Financial expertise"
        title="What I can do, and what I am learning."
        lede="Each area is marked honestly. Some I have applied in projects; most I am still studying."
      />

      <Reveal className="mb-10 flex flex-wrap gap-x-8 gap-y-2">
        <StatusTag tone="sage">Applied in projects</StatusTag>
        <StatusTag tone="gold">Currently learning</StatusTag>
      </Reveal>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <Reveal delay={(index % 4) * 0.06} className="h-full">
                <TiltCard className="group flex flex-col rounded-sm border border-line bg-card p-6 transition-colors duration-500 hover:border-gold/60">
                  <Icon
                    size={22}
                    strokeWidth={1.25}
                    aria-hidden
                    className="text-mist transition-colors duration-500 group-hover:text-gold"
                    style={{ transform: 'translateZ(28px)' }}
                  />
                  <h3 className="mt-6 font-display text-2xl leading-tight text-ivory">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-mist">{item.description}</p>
                  <div className="mt-6 border-t border-line pt-4">
                    <StatusTag tone={item.status === 'applied' ? 'sage' : 'gold'}>
                      {item.status === 'applied' ? 'Applied in projects' : 'Currently learning'}
                    </StatusTag>
                  </div>
                </TiltCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
