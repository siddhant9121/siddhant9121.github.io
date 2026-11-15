import { timeline } from '../data/content';
import { Section, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { StatusTag } from '../components/ui/StatusTag';

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        label="Education and professional development"
        title="Where I am, and what I am working towards."
      />

      <ol className="relative ml-1.5 border-l border-line">
        {timeline.map((item, index) => {
          const done = item.status === 'completed';
          return (
            <li key={item.title} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
              <span
                aria-hidden
                className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full ${
                  done ? 'bg-sage-light' : 'border border-gold bg-bg'
                }`}
              />
              <Reveal delay={Math.min(index, 4) * 0.05}>
                <div className="grid gap-x-8 gap-y-2 md:grid-cols-12">
                  <p className="text-sm text-mist md:col-span-2 md:pt-1.5">{item.period}</p>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-2xl leading-tight text-ivory md:text-3xl">{item.title}</h3>
                    <p className="mt-1 text-sm text-ivory/80">{item.organisation}</p>
                    <p className="mt-2 text-sm text-mist">{item.note}</p>
                  </div>
                  <div className="md:col-span-3 md:pt-1.5 md:text-right">
                    <StatusTag tone={done ? 'sage' : 'gold'}>{done ? 'Completed' : 'In progress'}</StatusTag>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
