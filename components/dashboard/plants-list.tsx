import Link from 'next/link';
import clsx from 'clsx';
import { DashboardAppShell } from '@/components/dashboard/app-shell';
import { plantListPage } from '@/data/dashboard-content';
import { Breadcrumbs, KebabButton, MetricIcon, SurfaceCard, ToneBadge } from '@/components/dashboard/shared';

export function PlantsListPage() {
  return (
    <DashboardAppShell currentPath="/list-tanaman">
      <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
        <Breadcrumbs items={plantListPage.breadcrumb} />
        <div className="grid gap-6 lg:grid-cols-2">{plantListPage.plants.map((plant) => <SurfaceCard key={plant.id} className="p-6"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#D8EBC8] text-4xl"><span>{plant.avatar}</span></div><div><h2 className="text-2xl font-black tracking-tight text-primary">{plant.name}</h2><ToneBadge tone={plant.tone}>{plant.status}</ToneBadge></div></div><KebabButton /></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{plant.stats.map((stat) => <div key={stat.label} className={clsx('rounded-[24px] px-4 py-4', stat.tone === 'danger' ? 'bg-[#FBE8E6] text-[#D14D45]' : 'bg-[#EFF3EC] text-primary')}><div className="flex items-center gap-3"><MetricIcon icon={stat.icon} tone={stat.tone === 'danger' ? 'danger' : 'neutral'} /><div><p className="text-[11px] uppercase tracking-[0.18em] opacity-45">{stat.label}</p><p className="mt-1 text-2xl font-black tracking-tight">{stat.value} <span className="text-sm font-semibold opacity-65">{stat.suffix}</span></p></div></div></div>)}</div><Link href="/detail-tanaman" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primarySoft px-6 py-4 text-sm font-semibold text-white">Lihat Detail</Link></SurfaceCard>)}</div>
        <div className="mt-7 rounded-[32px] border-2 border-dashed border-primary/20 bg-[#F8FBF5] px-6 py-14 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">+</div><h3 className="mt-6 text-2xl font-black tracking-tight text-primary">+ Tambah Unit Baru</h3><p className="mx-auto mt-2 max-w-sm text-sm text-textSoft">Hubungkan reservoir IoT baru ke sistem untuk mulai monitoring otomatis.</p></div>
      </div>
    </DashboardAppShell>
  );
}
