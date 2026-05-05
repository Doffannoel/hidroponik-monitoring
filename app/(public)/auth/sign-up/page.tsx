"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthSell";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import PasswordStrength from "@/components/auth/PasswordStrength";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialGoogleButton from "@/components/auth/SocialGoogleButton";
import { apiRegister } from "@/lib/api";

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    try {
      await apiRegister({
        email: form.email,
        full_name: form.fullName,
        password: form.password,
        confirm_password: form.confirmPassword,
      });
      router.push("/auth/sign-in");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registrasi gagal. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      left={<AuthBrandPanel />}
      right={
        <AuthCard title="Daftar" subtitle="Buat akun baru Anda">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <AuthInput
              label="Nama Lengkap"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Budi Santoso"
              icon="👤"
            />

            <AuthInput
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@tikus-kota.com"
              icon="✉️"
            />

            <div>
              <AuthInput
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon="🔒"
                showToggle
              />
              <PasswordStrength password={form.password} />
            </div>

            <AuthInput
              label="Konfirmasi Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              icon="🔁"
              showToggle
            />

            <label className="flex items-start gap-3 text-sm leading-6 text-[#6a7467]">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-[#cfd7c8] text-[#2f5f17] focus:ring-[#2f5f17]"
              />
              <span>
                Saya setuju dengan{" "}
                <Link
                  href="/syarat-ketentuan"
                  className="font-medium text-[#2b5515] underline underline-offset-2"
                >
                  Syarat &amp; Ketentuan
                </Link>{" "}
                Tikus Kota.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-full bg-[linear-gradient(90deg,#214d10_0%,#3d7120_100%)] text-sm font-bold text-white shadow-lg transition hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Buat Akun"}
            </button>

            <AuthDivider text="ATAU DAFTAR DENGAN" />
            <SocialGoogleButton />

            <p className="text-center text-sm text-[#667660]">
              Sudah punya akun?{" "}
              <Link href="/auth/sign-in" className="font-bold text-[#2b5515]">
                Masuk
              </Link>
            </p>
          </form>
        </AuthCard>
      }
    />
  );
}
