"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardAppShell } from "@/components/dashboard/app-shell";
import {
  MetricIcon,
  SurfaceCard,
  ToneBadge,
} from "@/components/dashboard/shared";
import { BookOpen, Gauge, Beaker, AlertTriangle, Calendar, Droplets, FlaskConical } from "lucide-react";
import { apiGetBoxes, apiGetAlerts, apiResolveAlert } from "@/lib/api";
import type { Box, Alert } from "@/lib/types";

export function DashboardOverview() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [boxesData, alertsData] = await Promise.all([
          apiGetBoxes(),
          apiGetAlerts({ resolved: false }),
        ]);
        setBoxes(boxesData);
        setAlerts(alertsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Compute dynamic metrics
  const activeBoxCount = boxes.length;
  const activeAlertCount = alerts.length;

  const handleResolveAlert = async (alertId: number) => {
    try {
      await apiResolveAlert(alertId);
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    } catch (err) {
      console.error("Failed to resolve alert", err);
      alert("Gagal menyelesaikan alert.");
    }
  };

  // Calculate days since earliest plant
  const daysSincePlant = boxes.length > 0
    ? Math.max(
        ...boxes.map((b) => {
          const start = new Date(b.start_date).getTime();
          const now = Date.now();
          return Math.floor((now - start) / (1000 * 60 * 60 * 24));
        })
      )
    : 0;

  const overallStatus = activeAlertCount > 0 ? "Perhatian" : "Baik";
  const overallTone = activeAlertCount > 0 ? "danger" as const : "success" as const;

  const now = new Date();
  const dateLabel = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const metrics = [
    {
      title: "Status Keseluruhan",
      value: overallStatus,
      description: overallTone === "success" ? "Optimal" : "Ada Alert",
      icon: Gauge,
      tone: overallTone,
    },
    {
      title: "Kontainer Aktif",
      value: String(activeBoxCount).padStart(2, "0"),
      description: "Unit",
      icon: Beaker,
      tone: "success" as const,
    },
    {
      title: "Alert Aktif",
      value: String(activeAlertCount).padStart(2, "0"),
      description: "Peringatan",
      icon: AlertTriangle,
      tone: activeAlertCount > 0 ? "danger" as const : "success" as const,
    },
    {
      title: "Hari Sejak Tanam",
      value: String(daysSincePlant),
      description: "Hari",
      icon: Calendar,
      tone: "success" as const,
    },
  ];

  // Map backend alerts to display format
  const alertTypeLabels: Record<string, string> = {
    ph_low: "pH terlalu rendah",
    ph_high: "pH terlalu tinggi",
    tds_low: "TDS terlalu rendah",
    tds_high: "TDS terlalu tinggi",
  };

  const alertDisplayItems = alerts.slice(0, 5).map((alert) => {
    const box = boxes.find((b) =>
      b.devices.some((d) => d.device_id === alert.device_id)
    );
    const boxName = box?.name || `Device ${alert.device_id}`;
    const label = alertTypeLabels[alert.alert_type] || alert.alert_type;
    const isPh = alert.alert_type.startsWith("ph");

    return {
      id: alert.id,
      title: `${boxName} — ${label} (${alert.value})`,
      description: `Threshold: ${alert.threshold}. Cek dan sesuaikan segera.`,
      cta: "Lihat Detail",
      tone: (isPh ? "danger" : "neutral") as "danger" | "neutral",
      icon: isPh ? FlaskConical : Droplets,
      boxId: box?.id,
    };
  });

  if (loading) {
    return (
      <DashboardAppShell currentPath="/dashboard" title="Beranda" subtitle="Memuat data...">
        <div className="mt-5 grid gap-4 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <SurfaceCard key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-full bg-primary/8" />
                  <div className="h-6 w-16 rounded-full bg-primary/8" />
                </div>
                <div className="mt-6">
                  <div className="h-4 w-24 rounded bg-primary/8" />
                  <div className="mt-2 h-12 w-16 rounded bg-primary/8" />
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </DashboardAppShell>
    );
  }

  if (error) {
    return (
      <DashboardAppShell currentPath="/dashboard" title="Beranda">
        <div className="mt-5 rounded-[28px] bg-[#FBE8E6] px-6 py-5 text-[#D14D45]">
          <p className="font-semibold">Gagal memuat data</p>
          <p className="mt-1 text-sm opacity-75">{error}</p>
        </div>
      </DashboardAppShell>
    );
  }

  return (
    <DashboardAppShell
      currentPath="/dashboard"
      title="Beranda"
      subtitle={`${dateLabel} — Diperbarui baru saja`}
    >
      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => (
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
              {!["Kontainer Aktif", "Hari Sejak Tanam"].includes(
                metric.title,
              ) && (
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
              )}
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

      {/* Alerts Section */}
      <div className="mt-7">
        <h2 className="text-2xl md:text-[34px] font-black tracking-tight text-primary">
          Alerts
        </h2>
        <div className="mt-4 space-y-4">
          {alertDisplayItems.length === 0 ? (
            <div className="rounded-[28px] bg-[#EBF0E6] px-6 py-5 text-primary/80">
              <p className="font-semibold">🎉 Tidak ada alert aktif</p>
              <p className="mt-1 text-sm opacity-75">Semua parameter dalam kondisi normal.</p>
            </div>
          ) : (
            alertDisplayItems.map((alert) => {
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
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{alert.title}</p>
                      <p className="mt-1 text-sm opacity-75">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {alert.boxId && (
                      <Link
                        href={`/detail-tanaman/${alert.boxId}`}
                        className="text-sm font-semibold md:whitespace-nowrap"
                      >
                        {alert.cta}
                      </Link>
                    )}
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      className="rounded-full bg-white/50 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-white/80 shrink-0"
                    >
                      Tandai Selesai
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <h2 className="text-2xl md:text-[34px] font-black tracking-tight text-primary">
            Kontainer Terbaru
          </h2>
          <SurfaceCard className="mt-4 p-6">
            <div className="space-y-6">
              {boxes.length === 0 ? (
                <p className="text-sm text-textSoft">Belum ada kontainer. Tambahkan di halaman Tanaman Saya.</p>
              ) : (
                boxes.slice(0, 3).map((box) => {
                  const latestDevice = box.devices?.[0]?.latest;
                  return (
                    <div
                      key={box.id}
                      className="flex items-start justify-between gap-4 border-b border-primary/8 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <MetricIcon icon={Beaker} tone="neutral" />
                        <div>
                          <p className="font-semibold text-primary">
                            {box.name}
                          </p>
                          <p className="mt-1 text-sm text-textSoft">
                            {box.plant_type.charAt(0).toUpperCase() + box.plant_type.slice(1)} · {box.device_id}
                          </p>
                          {latestDevice && (
                            <p className="mt-1 text-xs text-primary/35">
                              pH: {latestDevice.ph ?? "-"} · TDS: {latestDevice.tds ?? "-"} · Air: {latestDevice.water_level ?? "-"}%
                            </p>
                          )}
                        </div>
                      </div>
                      <Link href={`/detail-tanaman/${box.id}`}>
                        <ToneBadge tone="success">Detail</ToneBadge>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </SurfaceCard>
        </div>
        <SurfaceCard className="overflow-hidden bg-primary p-7 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <BookOpen className="h-6 w-6 text-white/70" />
          </div>
          <h3 className="mt-8 text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Tahukah Kamu?
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/75">
            Tanaman hidroponik bisa tumbuh 30–50% lebih cepat dibanding tanaman yang ditanam di tanah karena nutrisi langsung diserap oleh akar.
          </p>
        </SurfaceCard>
      </div>
    </DashboardAppShell>
  );
}
