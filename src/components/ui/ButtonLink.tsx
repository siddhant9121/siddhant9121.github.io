import type { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  external?: boolean;
  download?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  external = false,
  download = false,
  className = '',
}: ButtonLinkProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300';
  const styles =
    variant === 'solid'
      ? 'bg-gold text-bg hover:bg-ivory'
      : 'border border-line text-ivory hover:border-gold hover:text-gold';

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
    </a>
  );
}
