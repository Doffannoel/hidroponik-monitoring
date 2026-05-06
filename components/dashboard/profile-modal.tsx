"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Mail, Shield, UserCircle2, CheckCircle2 } from "lucide-react";
import { apiGetMe } from "@/lib/api";
import type { User } from "@/lib/types";

export function ProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    async function fetchUser() {
      setLoading(true);
      setError("");
      try {
        const data = await apiGetMe();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [open]);

  useEffect(() => {
    if (!open) return;

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-[400px] overflow-hidden rounded-[24px] bg-[#F4F7F2] shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/50 p-1.5 text-primary backdrop-blur-sm transition hover:bg-white"
          aria-label="Tutup"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Cover */}
        <div className="h-24 bg-[linear-gradient(90deg,#214d10_0%,#3d7120_100%)]" />

        <div className="px-6 pb-6 pt-0">
          {/* Avatar Section */}
          <div className="relative -mt-12 flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#F4F7F2] bg-white text-primary/40 shadow-sm">
              {loading ? (
                <div className="h-full w-full animate-pulse bg-primary/10" />
              ) : user?.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name || "Profile"}
                  fill
                  className="object-cover"
                />
              ) : (
                <UserCircle2 className="h-12 w-12" />
              )}
            </div>
          </div>

          <div className="mt-4 text-center">
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-32 animate-pulse rounded bg-primary/10" />
                <div className="h-4 w-48 animate-pulse rounded bg-primary/10" />
              </div>
            ) : error ? (
              <div className="rounded-xl bg-[#FBE8E6] p-3 text-sm font-medium text-[#D14D45]">
                {error}
              </div>
            ) : user ? (
              <>
                <h2
                  id="profile-modal-title"
                  className="text-xl font-black tracking-tight text-primary"
                >
                  {user.full_name}
                </h2>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-textSoft">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF0E6] px-3 py-1 text-xs font-semibold text-[#24480B]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Akun Aktif
                  </span>
                  {user.is_staff && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      <Shield className="h-3.5 w-3.5" />
                      Staff
                    </span>
                  )}
                </div>

                <div className="mt-6 rounded-2xl bg-white p-4 text-left shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary/50">
                    Keamanan
                  </h3>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-primary">
                      Metode Masuk
                    </span>
                    <span className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                      {user.has_password ? "Email & Password" : "Google OAuth"}
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
