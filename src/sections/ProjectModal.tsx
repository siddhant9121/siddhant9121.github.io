import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../data/content';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  /* Focus management: move focus in, trap Tab, restore focus on close */
  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[70] flex items-end justify-center bg-bg/80 backdrop-blur-sm md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-sm border border-line bg-surface md:rounded-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header, laid out like the masthead of a research note */}
            <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-line bg-surface px-6 py-5 md:px-10">
              <div>
                <p className="text-sm text-gold">
                  <span className="font-mono">{project.index}</span>
                  <span className="mx-3 text-line" aria-hidden>
                    |
                  </span>
                  {project.category}
                </p>
                <h3 id="project-title" className="mt-2 font-display text-4xl leading-tight text-ivory">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-mist">{project.period}</p>
              </div>
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-line text-mist transition-colors hover:border-gold hover:text-gold"
              >
                <X size={18} aria-hidden />
              </button>
            </header>

            <div className="space-y-10 px-6 py-8 md:px-10 md:py-10">
              <section>
                <h4 className="text-sm font-medium text-gold">Overview</h4>
                <p className="mt-3 font-display text-2xl leading-snug text-ivory">{project.overview}</p>
              </section>

              <section>
                <h4 className="text-sm font-medium text-gold">Problem statement</h4>
                <p className="mt-3 text-mist">{project.problem}</p>
              </section>

              <section>
                <h4 className="text-sm font-medium text-gold">Methodology</h4>
                <ol className="mt-3 space-y-3">
                  {project.methodology.map((step, index) => (
                    <li key={step} className="flex gap-4 text-mist">
                      <span className="font-mono text-sm text-ivory">{String(index + 1).padStart(2, '0')}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h4 className="text-sm font-medium text-gold">Key findings</h4>
                {project.results.length > 0 && (
                  <dl className="mt-4 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                    {project.results.map((result) => (
                      <div key={result.label} className="flex flex-col-reverse gap-1 bg-card p-5">
                        <dt className="text-sm text-mist">{result.label}</dt>
                        <dd className="font-display text-3xl text-ivory">{result.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {project.resultsNote && <p className="mt-4 text-sm text-mist">{project.resultsNote}</p>}
              </section>

              <section>
                <h4 className="text-sm font-medium text-gold">Technologies</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li key={technology} className="rounded-sm border border-line px-3 py-1 text-sm text-mist">
                      {technology}
                    </li>
                  ))}
                </ul>
              </section>

              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-gold px-5 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-bg"
              >
                View the repository on GitHub <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
