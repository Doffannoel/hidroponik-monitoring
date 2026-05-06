"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
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
import { FlaskConical, Droplets, Waves } from "lucide-react";
import { apiGetBoxes, apiCreateBox, apiUpdateBox, apiUploadBoxImage } from "@/lib/api";
import type { Box, PlantType, FertilizerAmount } from "@/lib/types";

export function PlantsListPage() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState<
    { mode: "create" } | { mode: "edit"; boxId: number } | null
  >(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  // Fetch boxes from API
  useEffect(() => {
    async function fetchBoxes() {
      try {
        const data = await apiGetBoxes();
        setBoxes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    }
    fetchBoxes();
  }, []);

  const activeBox =
    modalState?.mode === "edit"
      ? boxes.find((b) => b.id === modalState.boxId)
      : undefined;

  const openCreateModal = () => {
    setModalError("");
    setModalState({ mode: "create" });
  };
  const openEditModal = (boxId: number) => {
    setModalError("");
    setModalState({ mode: "edit", boxId });
  };
  const closeModal = () => setModalState(null);

  const handleSubmit = async (values: PlantFormValues) => {
    setModalLoading(true);
    setModalError("");

    try {
      if (modalState?.mode === "edit" && activeBox) {
        // Update existing box
        const updated = await apiUpdateBox(activeBox.id, {
          name: values.name || activeBox.name,
          plant_type: values.plantType as PlantType,
          fertilizer_amount: values.fertilizer as FertilizerAmount,
        });

        // Handle image upload if a new file was selected
        if (values.imageFile) {
          const { image_url } = await apiUploadBoxImage(activeBox.id, values.imageFile);
          updated.image_url = image_url;
        }

        setBoxes((current) =>
          current.map((box) => (box.id === activeBox.id ? { ...box, ...updated } : box))
        );
      } else {
        // Create new box
        const newBox = await apiCreateBox({
          name: values.name,
          device_id: values.kitId,
          start_date: values.plantedAt,
          plant_type: values.plantType as PlantType,
          fertilizer_amount: values.fertilizer as FertilizerAmount,
        });

        // Handle image upload if a new file was selected
        if (values.imageFile) {
          const { image_url } = await apiUploadBoxImage(newBox.id, values.imageFile);
          newBox.image_url = image_url;
        }

        setBoxes((current) => [...current, newBox]);
      }
      closeModal();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (modalState?.mode !== "edit" || !activeBox) return;
    if (!confirm("Apakah Anda yakin ingin menghapus kontainer ini?")) return;
    
    setModalLoading(true);
    setModalError("");
    try {
      await import("@/lib/api").then((m) => m.apiDeleteBox(activeBox.id));
      setBoxes((current) => current.filter((box) => box.id !== activeBox.id));
      closeModal();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Gagal menghapus.");
    } finally {
      setModalLoading(false);
    }
  };

  // Helper: get latest sensor data for a box
  const getLatestSensor = (box: Box) => {
    const latest = box.devices?.[0]?.latest;
    return {
      ph: latest?.ph ?? null,
      tds: latest?.tds ?? null,
      water_level: latest?.water_level ?? null,
    };
  };

  // Determine if values are within threshold
  const getBoxStatus = (box: Box): { label: string; tone: "success" | "danger" } => {
    const sensor = getLatestSensor(box);
    if (sensor.ph === null && sensor.tds === null && sensor.water_level === null) {
      return { label: "Menunggu Data", tone: "success" };
    }
    // Simple check — could be expanded with actual thresholds
    return { label: "Aktif", tone: "success" };
  };

  if (loading) {
    return (
      <DashboardAppShell currentPath="/list-tanaman">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <SurfaceCard key={i} className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-[22px] bg-primary/8" />
                    <div className="flex-1 space-y-2">
                      <div className="h-6 w-40 rounded bg-primary/8" />
                      <div className="h-4 w-20 rounded bg-primary/8" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-20 rounded-[24px] bg-primary/5" />
                    ))}
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </DashboardAppShell>
    );
  }

  return (
    <DashboardAppShell currentPath="/list-tanaman">
      <PlantFormModal
        open={modalState !== null}
        mode={modalState?.mode === "edit" ? "edit" : "create"}
        loading={modalLoading}
        error={modalError}
        values={
          modalState?.mode === "edit" && activeBox
            ? {
                name: activeBox.name,
                kitId: activeBox.device_id,
                image: activeBox.image_url || "/images/Lettuce.png",
                plantedAt: activeBox.start_date,
                plantType: activeBox.plant_type,
                fertilizer: activeBox.fertilizer_amount as "5ml" | "10ml",
              }
            : {
                plantType: "bayam",
                fertilizer: "5ml",
                image: "/images/Lettuce.png",
              }
        }
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
      <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
        <Breadcrumbs items={["Dashboard", "Tanaman Saya"]} />

        {error && (
          <div className="mb-4 rounded-[28px] bg-[#FBE8E6] px-6 py-5 text-[#D14D45]">
            <p className="font-semibold">Gagal memuat data</p>
            <p className="mt-1 text-sm opacity-75">{error}</p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {boxes.map((box) => {
            const sensor = getLatestSensor(box);
            const status = getBoxStatus(box);
            const plantLabel =
              box.plant_type.charAt(0).toUpperCase() + box.plant_type.slice(1);

            const stats = [
              {
                label: "pH Level",
                value: sensor.ph !== null ? String(sensor.ph) : "-",
                suffix: sensor.ph !== null ? "OK" : "",
                icon: FlaskConical,
                tone: "neutral" as const,
              },
              {
                label: "TDS (PPM)",
                value: sensor.tds !== null ? String(sensor.tds) : "-",
                suffix: sensor.tds !== null ? "OK" : "",
                icon: Waves,
                tone: "neutral" as const,
              },
              {
                label: "Level Air",
                value:
                  sensor.water_level !== null
                    ? `${sensor.water_level}%`
                    : "-",
                suffix:
                  sensor.water_level !== null
                    ? sensor.water_level < 70
                      ? "Low"
                      : "OK"
                    : "",
                icon: Droplets,
                tone:
                  sensor.water_level !== null && sensor.water_level < 70
                    ? ("danger" as const)
                    : ("neutral" as const),
              },
            ];

            return (
              <SurfaceCard key={box.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#FFFF] text-4xl">
                      <Image
                        src={box.image_url || "/images/Lettuce.png"}
                        alt={box.name}
                        width={64}
                        height={64}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-primary">
                        {box.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <ToneBadge tone={status.tone}>{status.label}</ToneBadge>
                        <span className="text-xs text-primary/40">{plantLabel}</span>
                      </div>
                    </div>
                  </div>
                  <KebabButton
                    ariaLabel={`Edit ${box.name}`}
                    onClick={() => openEditModal(box.id)}
                  />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={clsx(
                        "rounded-[24px] px-4 py-4",
                        stat.tone === "danger"
                          ? "bg-[#FBE8E6] text-[#D14D45]"
                          : "bg-[#EFF3EC] text-primary",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <MetricIcon
                          icon={stat.icon}
                          tone={stat.tone === "danger" ? "danger" : "neutral"}
                        />
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] opacity-45">
                            {stat.label}
                          </p>
                          <p className="mt-1 text-2xl font-black tracking-tight">
                            {stat.value}{" "}
                            <span className="text-sm font-semibold opacity-65">
                              {stat.suffix}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/detail-tanaman/${box.id}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primarySoft px-6 py-4 text-sm font-semibold text-white"
                >
                  Lihat Detail
                </Link>
              </SurfaceCard>
            );
          })}
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="mt-7 w-full rounded-[32px] border-2 border-dashed border-primary/20 bg-[#F8FBF5] px-6 py-14 text-center transition hover:border-primary/35 hover:bg-[#F3F8EE]"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
            +
          </div>
          <h3 className="mt-6 text-2xl font-black tracking-tight text-primary">
            + Tambah Unit Baru
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-textSoft">
            Hubungkan reservoir IoT baru ke sistem untuk mulai monitoring
            otomatis.
          </p>
        </button>
      </div>
    </DashboardAppShell>
  );
}
