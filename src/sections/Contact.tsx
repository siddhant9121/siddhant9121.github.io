import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { site } from '../data/site';
import { Section, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';

interface Fields {
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
    errors.email = 'Enter an email address, like name@example.com.';
  }
  if (fields.message.trim().length < 20) errors.message = 'Write at least 20 characters.';
  return errors;
}

const inputClass =
  'mt-2 w-full rounded-sm border bg-card px-4 py-3 text-ivory placeholder:text-mist/50 transition-colors focus:border-gold focus:outline-none';

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setSent(false);
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    /* No server: the message opens in the visitor's own email app */
    const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name.trim()}`);
    const body = encodeURIComponent(`${fields.message.trim()}\n\n${fields.name.trim()}\n${fields.email.trim()}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const borderFor = (key: keyof Fields) => (errors[key] ? 'border-danger' : 'border-line');

  return (
    <Section id="contact" className="bg-surface">
      <SectionHeading
        label="Contact"
        title="Let’s talk."
        lede="I am looking for opportunities in finance and investment research from 2027. Email is the fastest way to reach me."
      />

      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 break-all font-display text-2xl text-ivory underline decoration-line underline-offset-8 transition-colors hover:decoration-gold md:text-3xl"
          >
            <Mail size={20} strokeWidth={1.25} aria-hidden className="shrink-0 text-gold" />
            {site.email}
          </a>

          <ul className="mt-10 border-t border-line">
            <li className="border-b border-line">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 text-ivory transition-colors hover:text-gold"
              >
                LinkedIn <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
            <li className="border-b border-line">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 text-ivory transition-colors hover:text-gold"
              >
                GitHub <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
            <li className="border-b border-line">
              <a
                href={site.resumeUrl}
                download
                className="flex items-center justify-between py-4 text-ivory transition-colors hover:text-gold"
              >
                Download résumé <Download size={16} aria-hidden />
              </a>
            </li>
          </ul>

          <p className="mt-6 text-sm text-mist">{site.location}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-sm text-mist">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`${inputClass} ${borderFor('name')}`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-2 text-sm text-danger">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm text-mist">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(event) => update('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`${inputClass} ${borderFor('email')}`}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-2 text-sm text-danger">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm text-mist">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={6}
                value={fields.message}
                onChange={(event) => update('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${inputClass} resize-y ${borderFor('message')}`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-2 text-sm text-danger">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                className="rounded-sm bg-gold px-6 py-3 text-sm font-medium tracking-wide text-bg transition-colors duration-300 hover:bg-ivory"
              >
                Open in my email app
              </button>
              <p role="status" className="text-sm text-mist">
                {sent ? 'Your email app should now be open with the message ready to send.' : ''}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
