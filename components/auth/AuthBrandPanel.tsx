import { Link } from "lucide-react";
import Image from "next/image";
import authBg from "@/public/images/auth-bg.png";

export default function AuthBrandPanel() {
  return (
    <div className="relative flex h-full min-h-screen overflow-hidden bg-[#214d10] text-white">
      <Image
        src={authBg}
        alt="Background hidroponik Tikus Kota"
        fill
        priority
        className="object-fill"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,26,5,0.45)_0%,rgba(16,52,7,0.68)_100%)]" />

      <div className="relative z-10 flex w-full flex-col justify-between p-8 xl:p-14">
        <div className="max-w-md py-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 backdrop-blur-sm">
              <Image
                src="/images/logo.png"
                alt="Logo Vertigrow"
                width={50}
                height={50}
                className="h-30 w-auto object-contain"
              />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">Vertigrow</p>
          </div>

          <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight xl:text-6xl">
            Mulai
            <br />
            Perjalanan
            <br />
            <span className="text-[#C4EFA3]">Hidroponikmu</span>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-8 text-white/85">
            Ubah sudut sempit menjadi kebun produktif. Pantau, pelajari, dan
            panen hasil kerja kerasmu bersama komunitas urban.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Pengguna
              </p>
              <p className="mt-2 text-4xl font-extrabold leading-none">
                12.4k+
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Hasil Panen
              </p>
              <p className="mt-2 text-4xl font-extrabold leading-none">85.0k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
