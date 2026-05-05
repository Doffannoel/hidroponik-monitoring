"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  icon,
  name,
  value,
  onChange,
  showToggle = false,
}: {
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = showToggle || type === "password";
  const actualType = isPasswordField ? (showPassword ? "text" : "password") : type;
  const inputClassName =
    "h-full w-full bg-transparent text-sm text-[#20301d] outline-none placeholder:text-[#a1aa9d]";

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#586354]">
        {label}
      </span>

      <div className="flex h-14 items-center rounded-2xl border border-[#e5e8e1] bg-[#eef1eb] px-4 transition focus-within:border-[#5e8e41] focus-within:bg-white">
        <span className="mr-3 text-lg text-[#9aa493] grayscale">{icon}</span>
        <input
          key={actualType}
          type={actualType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClassName}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-3 flex items-center text-lg text-[#8b9587] transition hover:text-[#274f14]"
            title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
    </label>
  );
}
