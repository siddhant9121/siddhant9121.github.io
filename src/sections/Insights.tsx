import { insights, type Insight } from '../data/content';
import { Section, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { StatusTag } from '../components/ui/StatusTag';

function Meta({ insight }: { insight: Insight }) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-mist">
      <span>{insight.date}</span>
      <span>{insight.readTime}</span>
    </p>
  );
}

function Tags({ insight }: { insight: Insight }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-mist">{insight.category}</p>
      {insight.status === 'draft' ? (
        <StatusTag tone="gold">Draft, not yet published</StatusTag>
      ) : (
        <StatusTag tone="sage">Published</StatusTag>
      )}
    </div>
  );
}

export function Insights() {
  const [lead, ...rest] = insights;

  return (
    <Section id="insights" className="bg-surface">
      <SectionHeading
        label="Research and insights"
        title="Notes I am writing as I learn."
        lede="These are working drafts. Nothing in this section has been published yet, and the titles may change."
      />

      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <article className="flex h-full flex-col rounded-sm border border-line bg-card p-8 md:p-10">
            <Tags insight={lead} />
            <h3 className="mt-8 font-display text-4xl leading-[1.1] text-ivory md:text-5xl">{lead.title}</h3>
            <p className="mt-6 flex-1 text-mist">{lead.description}</p>
            <div className="mt-10 border-t border-line pt-5">
              <Meta insight={lead} />
            </div>
          </article>
        </Reveal>

        <ul className="border-t border-line lg:col-span-7">
          {rest.map((insight, index) => (
            <li key={insight.title} className="border-b border-line">
              <Reveal delay={index * 0.06}>
                <article className="py-7">
                  <Tags insight={insight} />
                  <h3 className="mt-3 font-display text-2xl leading-tight text-ivory md:text-3xl">{insight.title}</h3>
                  <p className="mt-2 text-mist">{insight.description}</p>
                  <div className="mt-4">
                    <Meta insight={insight} />
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
