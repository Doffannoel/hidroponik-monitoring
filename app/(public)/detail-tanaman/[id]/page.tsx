"use client";

import { use } from "react";
import { PlantDetailPage } from "@/components/dashboard/plant-detail";

export default function DetailTanamanDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const boxId = parseInt(resolvedParams.id, 10);

  if (isNaN(boxId)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-lg text-primary/60">ID tanaman tidak valid.</p>
      </div>
    );
  }

  return <PlantDetailPage boxId={boxId} />;
}
