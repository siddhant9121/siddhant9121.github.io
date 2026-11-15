import { useCallback, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '../data/content';
import { Section, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { StatusTag } from '../components/ui/StatusTag';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section id="projects">
      <SectionHeading
        label="Selected projects"
        title="Research notes, with the code behind them."
        lede="Open a project for the problem, the method and the results."
      />

      <ol className="border-t border-line">
        {projects.map((project, index) => (
          <li key={project.id} className="border-b border-line">
            <Reveal delay={index * 0.05}>
              <button
                type="button"
                onClick={() => setSelected(project)}
                aria-haspopup="dialog"
                className="group grid w-full gap-x-8 gap-y-3 py-8 text-left transition-colors duration-500 hover:bg-surface md:grid-cols-12 md:items-baseline md:px-4 md:py-10"
              >
                <span className="font-mono text-sm text-gold md:col-span-1">{project.index}</span>

                <span className="md:col-span-4">
                  <span className="block font-display text-3xl leading-tight text-ivory transition-colors duration-500 group-hover:text-gold md:text-4xl">
                    {project.name}
                  </span>
                  <span className="mt-2 block text-sm text-mist">{project.category}</span>
                </span>

                <span className="text-mist md:col-span-5">{project.overview}</span>

                <span className="flex items-center justify-between gap-4 text-sm text-mist md:col-span-2 md:flex-col md:items-end">
                  <span>{project.period}</span>
                  {project.pending ? (
                    <StatusTag tone="gold">Details pending</StatusTag>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-ivory transition-colors duration-500 group-hover:text-gold">
                      Read note <ArrowUpRight size={14} aria-hidden />
                    </span>
                  )}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ol>

      <ProjectModal project={selected} onClose={close} />
    </Section>
  );
}
