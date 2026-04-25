"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Bell, Search, UserCircle2 } from "lucide-react";
import { appNavItems, topNavLinks } from "@/data/dashboard-content";

export function DashboardAppShell({
  currentPath,
  title,
  subtitle,
  children,
}: {
  currentPath: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto flex min-h-screen max-w-[1440px] bg-[#EEF2EC]">
        <aside className="hidden w-[248px] border-r border-primary/6 bg-[#E9EEE7] px-7 py-5 lg:block">
          <Link href="/" className="block w-fit">
            <Image
              src="/images/logo.png"
              alt="Logo perusahaan"
              width={180}
              height={54}
              priority
              className="h-20 w-auto object-contain"
            />
          </Link>
          <nav className="mt-12 space-y-3">
            {appNavItems.map(
              (item: { label: string; href: string; icon: LucideIcon }) => {
                const Icon = item.icon;
                const active = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      active
                        ? "bg-white text-primary shadow-sm"
                        : "text-primary/50 hover:bg-white/70 hover:text-primary",
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        active ? "bg-primary/10" : "bg-white/70",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.label.toUpperCase()}
                  </Link>
                );
              },
            )}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-10">
            <nav className="flex flex-wrap items-center gap-6 text-sm text-primary/65">
              {topNavLinks.map((item: { label: string; href: string }) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "transition hover:text-primary",
                    currentPath === item.href && "font-semibold text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex h-11 w-11 items-center justify-center rounded-full text-primary">
                <UserCircle2 className="h-5 w-5" />
              </button>
            </div>
          </header>
          {(title || subtitle) && (
            <div className="px-6 pb-2 sm:px-8 lg:px-10">
              {title ? (
                <h1 className="text-[40px] font-black tracking-tight text-primary">
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <p className="mt-1 text-sm text-textSoft">{subtitle}</p>
              ) : null}
            </div>
          )}
          <main className="flex-1 px-6 pb-8 sm:px-8 lg:px-10 lg:pb-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
