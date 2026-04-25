"use client";

import Link from "next/link";
import React, { useState } from "react";
import AuthShell from "@/components/auth/AuthSell";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialGoogleButton from "@/components/auth/SocialGoogleButton";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "", agree: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <AuthShell
      left={<AuthBrandPanel />}
      right={
        <AuthCard title="Masuk" subtitle="Silakan masuk ke akun Anda">
          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@tikus-kota.com"
              icon="✉️"
            />

            <AuthInput
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              icon="🔒"
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
                  Syarat & Ketentuan
                </Link>{" "}
                Innofarm
              </span>
            </label>

            <button
              type="submit"
              className="h-14 w-full rounded-full bg-[linear-gradient(90deg,#214d10_0%,#3d7120_100%)] text-sm font-bold text-white shadow-lg transition hover:opacity-95"
            >
              Masuk
            </button>

            <AuthDivider text="ATAU DAFTAR DENGAN" />
            <SocialGoogleButton />

            <p className="text-center text-sm text-[#667660]">
              Belum punya akun?{" "}
              <Link href="/auth/sign-up" className="font-bold text-[#2b5515]">
                Daftar
              </Link>
            </p>
          </form>
        </AuthCard>
      }
    />
  );
}
