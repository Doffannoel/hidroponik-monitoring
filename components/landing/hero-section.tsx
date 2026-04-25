import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { heroBullets, heroStats } from "@/data/landing-content";

export function HeroSection() {
  return (
    <section className="section-space pt-10 sm:pt-14">
      <div className="container-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            {/*  */}
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight text-primary sm:text-6xl lg:text-7xl">
              Tanam Sayuran
              <br />
              Segar di Rumah,
              <br />
              <span className="text-primary/45">Tanpa Repot</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-textSoft">
              Kit hidroponik vertikal pintar dengan monitoring otomatis langsung
              dari smartphone kamu. Solusi berkebun masa depan untuk warga kota.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-primarySoft px-8 py-4 text-sm font-semibold text-white shadow-soft transition hover:opacity-95"
              >
                Beli Kit Sekarang
              </Link>
              <Link
                href="#cara-kerja"
                className="inline-flex items-center justify-center rounded-full border border-borderSoft bg-surface px-8 py-4 text-sm font-semibold text-primary transition hover:bg-white"
              >
                Lihat Cara Kerja
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {heroBullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-3 text-sm text-primary/80"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primarySoft" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-8 z-10 w-44 rounded-[24px] bg-card p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/50">
                Live Status
              </p>
              <div className="mt-4 space-y-4">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xs text-primary/50">{stat.label}</p>
                    <p className="mt-1 text-lg font-bold text-primary">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base overflow-hidden rounded-[36px] bg-[#D9E8CE] p-3 sm:p-4">
              <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#153407]">
                <Image
                  src="/images/hero-image.png"
                  alt="Kit hidroponik vertikal"
                  fill
                  className="object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/5 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-[24px] border border-white/20 bg-white/12 p-4 text-white backdrop-blur-md">
                  <p className="text-sm font-semibold">Monitoring aktif 24/7</p>
                  <p className="mt-1 text-sm text-white/80">
                    Sensor memantau nutrisi, level air, dan suhu secara
                    otomatis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
