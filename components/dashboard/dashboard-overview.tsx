import Link from "next/link";
import { DashboardAppShell } from "@/components/dashboard/app-shell";
import { dashboardSummary } from "@/data/dashboard-content";
import {
  MetricIcon,
  SurfaceCard,
  ToneBadge,
} from "@/components/dashboard/shared";

import { BookOpen } from "lucide-react";

export function DashboardOverview() {
  return (
    <DashboardAppShell
      currentPath="/dashboard"
      title={dashboardSummary.title}
      subtitle={dashboardSummary.dateLabel}
    >
      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        {dashboardSummary.metrics.map((metric) => (
          <SurfaceCard key={metric.title} className="p-6">
            <div className="flex items-center justify-between gap-4">
              <MetricIcon
                icon={metric.icon}
                tone={
                  metric.tone === "danger"
                    ? "danger"
                    : metric.tone === "success"
                      ? "success"
                      : "neutral"
                }
              />
              <ToneBadge
                tone={
                  metric.tone === "danger"
                    ? "danger"
                    : metric.tone === "success"
                      ? "success"
                      : "neutral"
                }
              >
                {metric.description}
              </ToneBadge>
            </div>
            <p className="mt-8 text-sm text-primary/60">{metric.title}</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-primary">
                {metric.value}
              </span>
              {metric.title !== "Status Keseluruhan" ? (
                <span className="pb-2 text-sm text-primary/35">
                  {metric.description}
                </span>
              ) : null}
            </div>
          </SurfaceCard>
        ))}
      </div>
      <div className="mt-7">
        <h2 className="text-[34px] font-black tracking-tight text-primary">
          Alerts
        </h2>
        <div className="mt-4 space-y-4">
          {dashboardSummary.alerts.map((alert) => {
            const Icon = alert.icon;
            const toneClasses =
              alert.tone === "danger"
                ? "bg-[#FBE8E6] text-[#D14D45]"
                : "bg-[#EBF0E6] text-primary/80";
            return (
              <div
                key={alert.title}
                className={[
                  "flex flex-col gap-4 rounded-[28px] px-6 py-5 md:flex-row md:items-center md:justify-between",
                  toneClasses,
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/70">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{alert.title}</p>
                    <p className="mt-1 text-sm opacity-75">
                      {alert.description}
                    </p>
                  </div>
                </div>
                <Link
                  href="/detail-tanaman"
                  className="text-sm font-semibold md:whitespace-nowrap"
                >
                  {alert.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <h2 className="text-[34px] font-black tracking-tight text-primary">
            Log Aktivitas Terbaru
          </h2>
          <SurfaceCard className="mt-4 p-6">
            <div className="space-y-6">
              {dashboardSummary.activities.map((activity) => {
                const statusTone =
                  activity.tone === "success"
                    ? "success"
                    : activity.tone === "muted"
                      ? "muted"
                      : "neutral";
                return (
                  <div
                    key={activity.title}
                    className="flex items-start justify-between gap-4 border-b border-primary/8 pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <MetricIcon
                        icon={activity.icon}
                        tone={
                          activity.tone === "success" ? "success" : "neutral"
                        }
                      />
                      <div>
                        <p className="font-semibold text-primary">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-sm text-textSoft">
                          {activity.description}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-primary/35">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <ToneBadge tone={statusTone}>{activity.status}</ToneBadge>
                  </div>
                );
              })}
            </div>
          </SurfaceCard>
        </div>
        <SurfaceCard className="overflow-hidden bg-primary p-7 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <BookOpen className="h-6 w-6 text-white/70" />
          </div>
          <h3 className="mt-8 text-4xl font-black leading-tight tracking-tight">
            {dashboardSummary.helperCard.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/75">
            {dashboardSummary.helperCard.description}
          </p>
          <Link
            href="/panduan"
            className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-primary"
          >
            {dashboardSummary.helperCard.cta}
          </Link>
        </SurfaceCard>
      </div>
    </DashboardAppShell>
  );
}
