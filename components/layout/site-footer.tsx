import { footerLinks } from "@/data/landing-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/8 py-12">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
        <div>
          <h3 className="text-2xl font-extrabold text-primary">Tikus Kota</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-textSoft">
            Hidroponik cerdas yang dirancang khusus untuk warga kota yang ingin hidup lebih sehat dan hijau di lahan terbatas.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-primary">Layanan</h4>
          <ul className="mt-4 space-y-3 text-sm text-textSoft">
            {footerLinks.layanan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-primary">Bantuan</h4>
          <ul className="mt-4 space-y-3 text-sm text-textSoft">
            {footerLinks.bantuan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-primary">Ikuti Kami</h4>
          <ul className="mt-4 space-y-3 text-sm text-textSoft">
            {footerLinks.sosial.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-shell mt-10 border-t border-primary/8 pt-6 text-center text-xs text-textSoft">
        © 2024 Tikus Kota. Hidroponik Cerdas untuk Kehidupan Urban.
      </div>
    </footer>
  );
}
