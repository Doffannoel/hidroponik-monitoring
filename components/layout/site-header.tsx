"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navItems } from "@/data/landing-content";

export function SiteHeader() {
  const pathname = usePathname();

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-primary/5 bg-surface/90 backdrop-blur">
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo perusahaan"
            width={160}
            height={160}
            priority
            className="h-30 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = isActivePath(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  "text-sm font-medium transition",
                  isActive
                    ? "text-primary"
                    : "text-primary/60 hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/sign-in"
            className="inline-flex min-w-32 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
}
