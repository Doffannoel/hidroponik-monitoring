"use client";

import { useEffect, useState } from "react";
import { DashboardAppShell } from "@/components/dashboard/app-shell";
import {
  Breadcrumbs,
  KebabButton,
  MetricIcon,
  SurfaceCard,
  ToneBadge,
} from "@/components/dashboard/shared";
import {
  PlantFormModal,
  type PlantFormValues,
} from "@/components/dashboard/plant-form-modal";

import {
  Beaker,
  Waves,
  Droplets,
  Package,
  RefreshCw,
} from "lucide-react";

import { apiGetBox, apiUpdateBox, apiGetDeviceHistory, apiUploadBoxImage, createDeviceWebSocket } from "@/lib/api";
import type { Box, DeviceHistoryEntry, PlantType, FertilizerAmount, WsMessage } from "@/lib/types";

import { useRouter } from "next/navigation";

interface PlantDetailPageProps {
  boxId: number;
}

export function PlantDetailPage({ boxId }: PlantDetailPageProps) {
  const router = useRouter();
  const [box, setBox] = useState<Box | null>(null);
  const [history, setHistory] = useState<DeviceHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    let ws: WebSocket | null = null;

    async function fetchData() {
      try {
        const boxData = await apiGetBox(boxId);
        setBox(boxData);

        // Fetch device history if there's a device
        const deviceId = boxData.devices?.[0]?.device_id;
        if (deviceId) {
          try {
            const historyData = await apiGetDeviceHistory(deviceId, 50);
            setHistory(historyData);
          } catch {
            // History fetch might fail if no data yet — that's ok
          }

          // Setup WebSocket
          ws = createDeviceWebSocket(deviceId);
          if (ws) {
            ws.onmessage = (event) => {
              try {
                const data = JSON.parse(event.data) as WsMessage;
                if (data.type === "sensor") {
                  setBox((prev) => {
                    if (!prev) return prev;
                    
                    const newBox = { ...prev };
                    if (!newBox.devices || newBox.devices.length === 0) return newBox;
                    
                    const device = { ...newBox.devices[0] };
                    device.latest = {
                      ...device.latest,
                      ph: data.sensor_type === "ph" ? data.value : device.latest?.ph ?? null,
                      tds: data.sensor_type === "tds" ? data.value : device.latest?.tds ?? null,
                      water_level: data.sensor_type === "waterlevel" ? data.value : device.latest?.water_level ?? null,
                      updated_at: new Date().toISOString()
                    };
                    
                    newBox.devices[0] = device;
                    return newBox;
                  });
                }
              } catch (e) {
                console.error("WS parse error", e);
              }
            };
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [boxId]);

  const handleEditSubmit = async (values: PlantFormValues) => {
    if (!box) return;
    setModalLoading(true);
    setModalError("");

    try {
      const updated = await apiUpdateBox(box.id, {
        name: values.name || box.name,
        plant_type: values.plantType as PlantType,
        fertilizer_amount: values.fertilizer as FertilizerAmount,
      });

      if (values.imageFile) {
        const { image_url } = await apiUploadBoxImage(box.id, values.imageFile);
        updated.image_url = image_url;
      }

      setBox((prev) => (prev ? { ...prev, ...updated } : prev));
      setIsModalOpen(false);
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!box) return;
    if (!confirm("Apakah Anda yakin ingin menghapus kontainer ini?")) return;
    
    setModalLoading(true);
    setModalError("");
    try {
      await import("@/lib/api").then((m) => m.apiDeleteBox(box.id));
      router.push("/list-tanaman");
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Gagal menghapus.");
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardAppShell currentPath="/list-tanaman">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-48 rounded bg-primary/8" />
            <div className="h-12 w-64 rounded bg-primary/8" />
            <div className="grid gap-5 sm:grid-cols-2">
              {[1, 2, 3].map((i) => (
                <SurfaceCard key={i} className="p-6">
                  <div className="h-20 rounded bg-primary/5" />
                </SurfaceCard>
              ))}
            </div>
          </div>
        </div>
      </DashboardAppShell>
    );
  }

  if (error || !box) {
    return (
      <DashboardAppShell currentPath="/list-tanaman">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
          <div className="rounded-[28px] bg-[#FBE8E6] px-6 py-5 text-[#D14D45]">
            <p className="font-semibold">Gagal memuat data</p>
            <p className="mt-1 text-sm opacity-75">{error || "Box tidak ditemukan."}</p>
          </div>
        </div>
      </DashboardAppShell>
    );
  }

  const latestSensor = box.devices?.[0]?.latest;
  const plantLabel = box.plant_type.charAt(0).toUpperCase() + box.plant_type.slice(1);

  const metrics = [
    {
      label: "pH",
      icon: Beaker,
      tone: "info" as const,
      value: latestSensor?.ph !== null && latestSensor?.ph !== undefined ? String(latestSensor.ph) : "-",
      unit: "",
      note: latestSensor?.ph ? "Data sensor" : "Menunggu data",
    },
    {
      label: "TDS",
      icon: Waves,
      tone: "info" as const,
      value: latestSensor?.tds !== null && latestSensor?.tds !== undefined ? String(latestSensor.tds) : "-",
      unit: "PPM",
      note: latestSensor?.tds ? "Data sensor" : "Menunggu data",
    },
    {
      label: "Level Air",
      icon: Droplets,
      tone: "success" as const,
      value: latestSensor?.water_level !== null && latestSensor?.water_level !== undefined ? String(latestSensor.water_level) : "-",
      unit: "%",
      note: latestSensor?.water_level ? "Data sensor" : "Menunggu data",
    },
  ];

  return (
    <DashboardAppShell currentPath="/list-tanaman">
      <PlantFormModal
        open={isModalOpen}
        mode="edit"
        loading={modalLoading}
        error={modalError}
        values={{
          name: box.name,
          kitId: box.device_id,
          image: box.image_url || "/images/Lettuce.png",
          plantedAt: box.start_date,
          plantType: box.plant_type,
          fertilizer: box.fertilizer_amount as "5ml" | "10ml",
        }}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEditSubmit}
        onDelete={handleDelete}
      />
      <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
        <Breadcrumbs items={["Dashboard", "Tanaman Saya", box.name]} />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-[44px] font-black tracking-tight text-primary">
              {box.name}
            </h1>
            <p className="text-sm text-textSoft">
              {plantLabel} · Device: {box.device_id} · Pupuk: {box.fertilizer_amount}
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <ToneBadge tone="success">{plantLabel}</ToneBadge>
            <KebabButton
              ariaLabel="Edit plant"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {metrics.map((metric) => (
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
                  {plantLabel} — {box.name}
                </p>
                {latestSensor?.updated_at && (
                  <p className="text-xs text-white/50">
                    Terakhir update: {new Date(latestSensor.updated_at).toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sensor History */}
        <SurfaceCard className="mt-6 p-6 sm:p-7">
          <h2 className="text-[34px] font-black tracking-tight text-primary">
            Riwayat Sensor
          </h2>
          <div className="mt-5 space-y-5">
            {history.length === 0 ? (
              <p className="text-sm text-textSoft">Belum ada riwayat sensor.</p>
            ) : (
              history.slice(0, 10).map((entry, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border-b border-primary/8 pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <MetricIcon icon={RefreshCw} tone="neutral" />
                    <div>
                      <p className="font-semibold text-primary">
                        Data Sensor
                      </p>
                      <p className="mt-1 max-w-2xl text-sm text-textSoft">
                        pH: {entry.ph ?? "-"} · TDS: {entry.tds ?? "-"} PPM · Air: {entry.water_level ?? "-"}%
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/35">
                    {new Date(entry.created_at).toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            )}
          </div>
          {history.length > 10 && (
            <button className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-primary/70">
              Lihat semua riwayat →
            </button>
          )}
        </SurfaceCard>
      </div>
    </DashboardAppShell>
  );
}
