import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle2, Pencil } from 'lucide-react';

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

export function KebabButton({
  onClick,
  ariaLabel = "Edit",
}: {
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-primary/50 transition hover:bg-black/10 hover:text-primary"
    >
      <Pencil className="h-4 w-4" />
    </button>
  );
}

export function StatusPopup({
  open,
  title,
  message,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-[28px] bg-[#F7FAF5] p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-popup-title"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E3F4D6] text-[#2D5B0D]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3
          id="status-popup-title"
          className="mt-4 text-2xl font-black tracking-tight text-primary"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-textSoft">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#2D5A0E_0%,#24480B_100%)] px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,76,13,0.25)] transition hover:opacity-95"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
