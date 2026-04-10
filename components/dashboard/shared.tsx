import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { MoreVertical } from 'lucide-react';

export function Breadcrumbs({ items }: { items: string[] }) {
  return <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/35">{items.map((item, index) => <div key={item + index} className="flex items-center gap-2">{index > 0 ? <span>•</span> : null}<span>{item}</span></div>)}</div>;
}

export function ToneBadge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'success' | 'danger' | 'muted' | 'warning' | 'info' }) {
  const styles = { neutral: 'bg-primary/8 text-primary/70', success: 'bg-[#BEE59E] text-[#2D5B0D]', danger: 'bg-[#FAD9D6] text-[#C84D47]', muted: 'bg-black/5 text-primary/45', warning: 'bg-[#EFD8A7] text-[#8C6517]', info: 'bg-[#CDEBFA] text-[#2478A0]' } as const;
  return <span className={clsx('inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide', styles[tone])}>{children}</span>;
}

export function SurfaceCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={clsx('rounded-[30px] bg-[#F7FAF5] shadow-[0_12px_36px_rgba(23,57,1,0.05)]', className)}>{children}</section>;
}

export function MetricIcon({ icon: Icon, tone = 'neutral' }: { icon: LucideIcon; tone?: 'neutral' | 'success' | 'danger' | 'warning' | 'info' }) {
  const tones = { neutral: 'bg-primary/8 text-primary', success: 'bg-[#E3F4D6] text-[#2D5B0D]', danger: 'bg-[#FCE7E5] text-[#D14D45]', warning: 'bg-[#F3E5BA] text-[#9A6A00]', info: 'bg-[#DDF2FC] text-[#2A7FA7]' } as const;
  return <span className={clsx('flex h-11 w-11 items-center justify-center rounded-full', tones[tone])}><Icon className="h-5 w-5" /></span>;
}

export function KebabButton() { return <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-primary/50 transition hover:bg-black/10 hover:text-primary"><MoreVertical className="h-4 w-4" /></button>; }
