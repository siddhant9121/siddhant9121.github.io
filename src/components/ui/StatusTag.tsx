import type { ReactNode } from 'react';

interface StatusTagProps {
  tone: 'sage' | 'gold';
  children: ReactNode;
}

/* sage, filled dot = done or applied. gold, hollow dot = still in progress. */
export function StatusTag({ tone, children }: StatusTagProps) {
  const text = tone === 'sage' ? 'text-sage-light' : 'text-gold';
  const dot = tone === 'sage' ? 'bg-sage-light' : 'border border-gold';

  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium ${text}`}>
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
