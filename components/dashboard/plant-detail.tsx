import { DashboardAppShell } from "@/components/dashboard/app-shell";
import {
  Breadcrumbs,
  KebabButton,
  MetricIcon,
  SurfaceCard,
  ToneBadge,
} from "@/components/dashboard/shared";

import {
  Beaker,
  Zap,
  Thermometer,
  Droplets,
  Package,
  RefreshCw,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  icon: LucideIcon;
  tone: "info" | "success" | "neutral" | "danger" | "warning";
  value: string | number;
  unit: string;
  note: string;
}

interface HistoryItem {
  title: string;
  description: string;
  icon: LucideIcon;
  timestamp: string;
}

interface PlantDetail {
  breadcrumb: Array<{ label: string; href?: string }>;
  title: string;
  status: string;
  metrics: Metric[];
  history: HistoryItem[];
}

const plantDetailPage: PlantDetail = {
  breadcrumb: [{ label: "Dashboard" }, { label: "Tanaman" }],
  title: "Bayam",
  status: "Sehat",
  metrics: [
    {
      label: "pH",
      icon: Beaker,
      tone: "info",
      value: "6.5",
      unit: "",
      note: "Optimal",
    },
    {
      label: "EC",
      icon: Zap,
      tone: "info",
      value: "1.2",
      unit: "mS/cm",
      note: "Normal",
    },
    {
      label: "Suhu",
      icon: Thermometer,
      tone: "success",
      value: "25",
      unit: "°C",
      note: "Ideal",
    },
    {
      label: "Kelembaban",
      icon: Droplets,
      tone: "success",
      value: "65",
      unit: "%",
      note: "Sehat",
    },
  ],
  history: [
    {
      title: "Panen",
      description: "Tanaman siap dipanen",
      icon: Package,
      timestamp: "2 hari lalu",
    },
    {
      title: "Update",
      description: "Data sensor diperbarui",
      icon: RefreshCw,
      timestamp: "1 jam lalu",
    },
  ],
};

export function PlantDetailPage() {
  return (
    <DashboardAppShell currentPath="/list-tanaman">
      <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
        <Breadcrumbs
          items={plantDetailPage.breadcrumb.map((item) => item.label)}
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-[44px] font-black tracking-tight text-primary">
            {plantDetailPage.title}
          </h1>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <ToneBadge tone="success">{plantDetailPage.status}</ToneBadge>
            <KebabButton />
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {plantDetailPage.metrics.map((metric) => (
              <SurfaceCard key={metric.label} className="p-6">
                <div className="flex items-center gap-3">
                  <MetricIcon icon={metric.icon} tone={metric.tone} />
                  <p className="font-semibold text-primary">{metric.label}</p>
                </div>
                <div className="mt-5 flex items-end gap-1 text-primary">
                  <span className="text-5xl font-black tracking-tight">
                    {metric.value}
                  </span>
                  <span className="pb-2 text-base font-semibold opacity-55">
                    {metric.unit}
                  </span>
                </div>
                <p className="mt-2 text-sm text-textSoft">{metric.note}</p>
              </SurfaceCard>
            ))}
          </div>
          <div className="overflow-hidden rounded-[28px] bg-[#0E2210] p-4 shadow-[0_20px_40px_rgba(23,57,1,0.15)]">
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(161,204,119,0.35),_transparent_45%),linear-gradient(180deg,#0E2210_0%,#09150A_100%)] p-6 text-center">
              <div className="text-[110px] leading-none">🌿</div>
              <div className="mt-3 space-y-2 text-white/80">
                <p className="text-sm uppercase tracking-[0.25em]">
                  Live Plant Preview
                </p>
                <p className="text-lg font-semibold text-white">
                  Bayam tumbuh sehat
                </p>
              </div>
            </div>
          </div>
        </div>
        <SurfaceCard className="mt-6 p-6 sm:p-7">
          <h2 className="text-[34px] font-black tracking-tight text-primary">
            Riwayat
          </h2>
          <div className="mt-5 space-y-5">
            {plantDetailPage.history.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 border-b border-primary/8 pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <MetricIcon icon={item.icon} tone="neutral" />
                  <div>
                    <p className="font-semibold text-primary">{item.title}</p>
                    <p className="mt-1 max-w-2xl text-sm text-textSoft">
                      {item.description}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/35">
                  {item.timestamp}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-primary/70">
            View full history →
          </button>
        </SurfaceCard>
      </div>
    </DashboardAppShell>
  );
}
