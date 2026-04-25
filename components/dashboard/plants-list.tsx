"use client";

import { useState } from "react";
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
import { plantListPage } from "@/data/dashboard-content";
import { plantDetailPage } from "@/data/dashboard-content";

export function PlantsListPage() {
  type PlantCard = (typeof plantListPage.plants)[number];

  const [plants, setPlants] = useState<PlantCard[]>(plantListPage.plants);
  const [modalState, setModalState] = useState<
    { mode: "create" } | { mode: "edit"; index: number } | null
  >(null);

  const activePlant =
    modalState?.mode === "edit" ? plants[modalState.index] : undefined;

  const openCreateModal = () => setModalState({ mode: "create" });
  const openEditModal = (index: number) =>
    setModalState({ mode: "edit", index });

  const closeModal = () => setModalState(null);

  const handleSubmit = (values: PlantFormValues) => {
    if (modalState?.mode === "edit" && activePlant) {
      setPlants((current) =>
        current.map((plant, index) =>
          index === modalState.index
            ? {
                ...plant,
                name: values.name || plant.name,
                avatarSrc: values.image || plant.avatarSrc,
              }
            : plant,
        ),
      );
      closeModal();
      return;
    }

    setPlants((current) => [
      ...current,
      {
        id: values.kitId || `kontainer-${current.length + 1}`,
        name: values.name || `Kontainer ${current.length + 1}`,
        status: "Baru",
        tone: "success" as const,
        avatarSrc: values.image || "/images/Lettuce.png",
        stats: current[0]?.stats ?? plantListPage.plants[0].stats,
      },
    ]);
    closeModal();
  };

  return (
    <DashboardAppShell currentPath="/list-tanaman">
      <PlantFormModal
        open={modalState !== null}
        mode={modalState?.mode === "edit" ? "edit" : "create"}
        values={
          modalState?.mode === "edit" && activePlant
            ? {
                name: activePlant.name,
                kitId: activePlant.id,
                image: activePlant.avatarSrc,
                plantedAt: "",
                plantType: activePlant.name.includes("Pakcoy")
                  ? "Pakcoy"
                  : activePlant.name.includes("Selada")
                    ? "Selada"
                    : "Bayam",
                fertilizer: "5ml",
              }
            : {
                plantType: "Bayam",
                fertilizer: "5ml",
                image: "/images/Lettuce.png",
              }
        }
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
      <div className="mx-auto max-w-5xl rounded-[32px] bg-[#F4F7F2] p-6 sm:p-8">
        <Breadcrumbs items={plantDetailPage.breadcrumb} />
        <div className="grid gap-6 lg:grid-cols-2">
          {plants.map((plant, index) => (
            <SurfaceCard key={plant.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#FFFF] text-4xl">
                    <Image
                      src={plant.avatarSrc}
                      alt={plant.name}
                      width={64}
                      height={64}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-primary">
                      {plant.name}
                    </h2>
                    <ToneBadge tone={plant.tone}>{plant.status}</ToneBadge>
                  </div>
                </div>
                <KebabButton
                  ariaLabel={`Edit ${plant.name}`}
                  onClick={() => openEditModal(index)}
                />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {plant.stats.map((stat) => (
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
                href="/detail-tanaman"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primarySoft px-6 py-4 text-sm font-semibold text-white"
              >
                Lihat Detail
              </Link>
            </SurfaceCard>
          ))}
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
