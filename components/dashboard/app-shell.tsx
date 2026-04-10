import Link from 'next/link';
import clsx from 'clsx';
import { Bell, Search, UserCircle2 } from 'lucide-react';
import { appNavItems, topNavLinks } from '@/data/dashboard-content';

export function DashboardAppShell({ currentPath, title, subtitle, children }: { currentPath: string; title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto flex min-h-screen max-w-[1440px] bg-[#EEF2EC]">
        <aside className="hidden w-[248px] border-r border-primary/6 bg-[#E9EEE7] px-7 py-8 lg:block">
          <Link href="/" className="block text-[34px] font-black leading-[0.9] tracking-tight text-primary">Tikus<br />Kota</Link>
          <nav className="mt-12 space-y-3">
            {appNavItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.href;
              return (
                <Link key={item.href} href={item.href} className={clsx('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition', active ? 'bg-white text-primary shadow-sm' : 'text-primary/50 hover:bg-white/70 hover:text-primary')}>
                  <span className={clsx('flex h-8 w-8 items-center justify-center rounded-full', active ? 'bg-primary/10' : 'bg-white/70')}><Icon className="h-4 w-4" /></span>
                  {item.label.toUpperCase()}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-10">
            <nav className="flex flex-wrap items-center gap-6 text-sm text-primary/65">
              {topNavLinks.map((item) => <Link key={item.href} href={item.href} className={clsx('transition hover:text-primary', currentPath === item.href && 'font-semibold text-primary')}>{item.label}</Link>)}
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-sm"><Bell className="h-4 w-4" /></button>
              <div className="hidden items-center gap-3 rounded-full bg-white px-4 py-3 text-sm text-primary/40 shadow-sm sm:flex"><Search className="h-4 w-4 text-primary/60" /><span>Cari data tanaman...</span></div>
              <button className="flex h-11 w-11 items-center justify-center rounded-full text-primary"><UserCircle2 className="h-5 w-5" /></button>
            </div>
          </header>
          {(title || subtitle) && <div className="px-6 pb-2 sm:px-8 lg:px-10">{title ? <h1 className="text-[40px] font-black tracking-tight text-primary">{title}</h1> : null}{subtitle ? <p className="mt-1 text-sm text-textSoft">{subtitle}</p> : null}</div>}
          <main className="flex-1 px-6 pb-8 sm:px-8 lg:px-10 lg:pb-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
