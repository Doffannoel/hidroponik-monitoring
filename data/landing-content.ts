import {
  BellRing,
  Building2,
  ChartNoAxesCombined,
  Flower2,
  Leaf,
  ScanLine,
  ShieldCheck,
  Sprout,
  TimerReset,
} from "lucide-react";

export const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Panduan", href: "/panduan" },
  { label: "Dashboard", href: "/dashboard" },
];

export const painPoints = [
  {
    title: "Lahan terbatas di perkotaan",
    description:
      "Keinginan untuk berkebun sering terhambat oleh sempitnya area apartemen atau rumah di kota besar.",
    icon: Building2,
  },
  {
    title: "Tidak ada waktu untuk perawatan rutin",
    description:
      "Kesibukan harian membuat penyiraman dan pemberian nutrisi tanaman sering terlewatkan.",
    icon: TimerReset,
  },
  {
    title: "Tanaman mati karena kurang pemantauan",
    description:
      "Tanpa data akurat, sulit mengetahui kebutuhan tanaman hingga akhirnya layu dan mati.",
    icon: Sprout,
  },
];

export const steps = [
  {
    number: "1",
    title: "Pasang Kit",
    description:
      "Pakai rangka vertikal dan pasang sensor pintar dalam waktu kurang dari 30 menit.",
  },
  {
    number: "2",
    title: "Hubungkan ke App",
    description:
      "Scan QR code, sambungkan ke WiFi rumah, dan dashboard monitoring langsung aktif.",
  },
  {
    number: "3",
    title: "Tanam & Pantau",
    description:
      "Tanam bibit kesukaanmu, biarkan sensor kami memantau kondisi tanaman secara otomatis.",
  },
];

export const features = [
  {
    title: "Monitoring Real-time",
    description:
      "Pantau pH, nutrisi, suhu, dan level air secara otomatis melalui sensor presisi tinggi yang terhubung 24/7.",
    icon: ChartNoAxesCombined,
    highlight: false,
    badges: ["OTOMATIS", "WIFI SYNC"],
  },
  {
    title: "Notifikasi Pintar",
    description:
      "Dapatkan peringatan instan di HP saat pompa error atau nutrisi berada di luar batas optimal.",
    icon: BellRing,
    highlight: true,
  },
  {
    title: "Hemat Tempat",
    description:
      "Desain vertikal modular yang sangat efisien, cocok untuk balkon apartemen atau pojok dapur.",
    icon: ScanLine,
    highlight: false,
  },
  {
    title: "Ramah Pemula",
    description:
      "Tanpa perlu keahlian teknis. Kami menyediakan panduan step-by-step dan dukungan komunitas hidroponik.",
    icon: ShieldCheck,
    highlight: false,
    imageLabel: "Beginner Friendly",
  },
];

export const testimonials = [
  {
    quote:
      "Luar biasa mudah! Sekarang saya bisa panen kangkung dan pakcoy segar langsung di balkon apartemen lantai 15.",
    name: "Andi Ramadhan",
    city: "Jakarta Selatan",
    initials: "AR",
  },
  {
    quote:
      "Setup-nya cuma sebentar. Dashboard di HP sangat membantu buat orang awam kayak saya yang sering lupa siram.",
    name: "Sari Putri",
    city: "Bandung",
    initials: "SP",
  },
  {
    quote:
      "Hemat waktu dan tenaga. Sensor pH-nya sangat akurat, sayuran saya tumbuh jauh lebih cepat dibanding cara konvensional.",
    name: "Budi Nugroho",
    city: "Surabaya",
    initials: "BN",
  },
];

export const footerLinks = {
  layanan: ["Tentang Kami", "Kebijakan Privasi"],
  bantuan: ["Syarat & Ketentuan", "Hubungi Kami"],
  sosial: ["Instagram", "TikTok"],
};

export const heroStats = [
  { label: "pH Level", value: "6.5" },
  { label: "Suhu", value: "24°C" },
  { label: "Level Air", value: "85%" },
];

export const heroBullets = [
  "Panen sayuran segar di rumah",
  "Monitoring otomatis dari smartphone",
  "Cocok untuk apartemen dan rumah kota",
];
