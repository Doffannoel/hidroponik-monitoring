"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { PlantType, FertilizerAmount } from "@/lib/types";

export type PlantFormMode = "create" | "edit";

export type PlantFormValues = {
  name: string;
  kitId: string;
  image: string;
  plantedAt: string;
  plantType: string;
  fertilizer: "5ml" | "10ml";
};

const PLANT_TYPES: { value: PlantType; label: string }[] = [
  { value: "selada", label: "Selada" },
  { value: "bayam", label: "Bayam" },
  { value: "kangkung", label: "Kangkung" },
  { value: "tomat", label: "Tomat" },
  { value: "cabai", label: "Cabai" },
  { value: "strawberry", label: "Strawberry" },
  { value: "basil", label: "Basil" },
];

const defaultValues: PlantFormValues = {
  name: "",
  kitId: "",
  image: "/images/Lettuce.png",
  plantedAt: "",
  plantType: "bayam",
  fertilizer: "5ml",
};

export function PlantFormModal({
  open,
  mode,
  values,
  onClose,
  onSubmit,
  loading = false,
  error = "",
}: {
  open: boolean;
  mode: PlantFormMode;
  values?: Partial<PlantFormValues>;
  onClose: () => void;
  onSubmit: (values: PlantFormValues) => void;
  loading?: boolean;
  error?: string;
}) {
  const [form, setForm] = useState<PlantFormValues>(defaultValues);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm({
      name: values?.name ?? "",
      kitId: values?.kitId ?? "",
      image: values?.image ?? "/images/Lettuce.png",
      plantedAt: values?.plantedAt ?? "",
      plantType: values?.plantType ?? "bayam",
      fertilizer: values?.fertilizer ?? "5ml",
    });
  }, [open, values]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const updateField = <K extends keyof PlantFormValues>(
    key: K,
    value: PlantFormValues[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField(
        "image",
        typeof reader.result === "string" ? reader.result : "",
      );
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      ...form,
      name: form.name.trim(),
      kitId: form.kitId.trim(),
      image: form.image || "/images/Lettuce.png",
      plantedAt: form.plantedAt.trim(),
      plantType: form.plantType,
      fertilizer: form.fertilizer,
    });
  };

  const title = mode === "edit" ? "Perbarui Info Kit" : "Tambahkan Kit Baru";
  const buttonLabel = mode === "edit" ? "Perbarui" : "Tambahkan";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-[360px] rounded-[20px] bg-[#F6F8F0] px-5 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="plant-form-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-black transition hover:bg-black/5"
          aria-label="Tutup"
        >
          <X className="h-7 w-7" />
        </button>

        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt="Logo perusahaan"
            width={72}
            height={72}
            className="h-14 w-14 object-contain"
            priority
          />
          <h2
            id="plant-form-title"
            className="mt-4 text-[24px] font-black tracking-tight text-[#35521C]"
          >
            {title}
          </h2>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <label className="block">
            <span className="mb-1.5 block text-[13px] text-[#3C3C3C]">
              Nama Kontainer
            </span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="h-10 w-full rounded-[6px] border border-[#C7CFD7] bg-white px-3.5 text-sm outline-none transition focus:border-[#36561B] focus:ring-2 focus:ring-[#36561B]/10"
              placeholder="Kontainer C"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] text-[#3C3C3C]">
              Device ID
            </span>
            <input
              value={form.kitId}
              onChange={(event) => updateField("kitId", event.target.value)}
              className="h-10 w-full rounded-[6px] border border-[#C7CFD7] bg-white px-3.5 text-sm outline-none transition focus:border-[#36561B] focus:ring-2 focus:ring-[#36561B]/10"
              placeholder="node1"
              disabled={mode === "edit"}
            />
          </label>

          <div className="block">
            <span className="mb-1.5 block text-[13px] text-[#3C3C3C]">
              Tambahkan Gambar
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) =>
                handleImageUpload(event.target.files?.[0] ?? null)
              }
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-[6px] border border-dashed border-[#C7CFD7] bg-white px-3.5 py-2.5 text-left text-sm text-[#3C3C3C] transition hover:border-[#36561B] hover:bg-[#FBFDF8] focus:outline-none focus:ring-2 focus:ring-[#36561B]/10"
            >
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[10px] bg-[#EFF4EA] text-xs font-semibold text-[#36561B]">
                {form.image ? (
                  <Image
                    src={form.image}
                    alt="Preview gambar"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "+"
                )}
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-[#223D0C]">
                  {form.image && form.image !== "/images/Lettuce.png"
                    ? "Gambar dipilih"
                    : "Klik untuk upload gambar"}
                </span>
                <span className="mt-0.5 block text-xs text-[#6F7D6A]">
                  JPG, PNG, atau WebP
                </span>
              </span>
            </button>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-[13px] text-[#3C3C3C]">
              Tanggal Mulai Penanaman
            </span>
            <input
              type="date"
              value={form.plantedAt}
              onChange={(event) => updateField("plantedAt", event.target.value)}
              className="h-10 w-full rounded-[6px] border border-[#C7CFD7] bg-white px-3.5 text-sm outline-none transition focus:border-[#36561B] focus:ring-2 focus:ring-[#36561B]/10"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] text-[#3C3C3C]">
              Jenis Tanaman
            </span>
            <select
              value={form.plantType}
              onChange={(event) => updateField("plantType", event.target.value)}
              className="h-11 w-full rounded-[6px] border border-[#C7CFD7] bg-white px-4 text-sm outline-none transition focus:border-[#36561B] focus:ring-2 focus:ring-[#36561B]/10"
            >
              {PLANT_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-2 block text-[13px] text-[#3C3C3C]">
              Jenis Pupuk
            </span>
            <div className="flex items-center gap-6 text-sm text-[#2C2C2C]">
              {(["5ml", "10ml"] as const).map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="fertilizer"
                    checked={form.fertilizer === option}
                    onChange={() => updateField("fertilizer", option)}
                    className="h-4 w-4 accent-[#223D0C]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 h-12 w-full rounded-full bg-[linear-gradient(180deg,#2D5A0E_0%,#24480B_100%)] text-sm font-semibold text-white shadow-[0_16px_30px_rgba(37,76,13,0.25)] transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Memproses..." : buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
