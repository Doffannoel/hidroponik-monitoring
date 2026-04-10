import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  Beaker,
  BookOpen,
  CheckCheck,
  Droplets,
  Eye,
  FlaskConical,
  Gauge,
  LayoutDashboard,
  Sprout,
  Sun,
  Thermometer,
  Waves,
  Wind,
  Zap,
} from 'lucide-react';

export type NavItem = { label: string; href: string; icon: LucideIcon };

export const appNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Tanaman Saya', href: '/list-tanaman', icon: Sprout },
];

export const topNavLinks = [
  { label: 'Kebun Saya', href: '/list-tanaman' },
  { label: 'Panduan', href: '/panduan' },
  { label: 'Dashboard', href: '/dashboard' },
];

export const dashboardSummary = {
  title: 'Beranda',
  dateLabel: 'Senin, 30 Maret 2026 — Diperbarui 2 menit lalu',
  metrics: [
    { title: 'Status Keseluruhan', value: 'Baik', description: 'Optimal', icon: Gauge, tone: 'success' as const },
    { title: 'Kontainer Aktif', value: '02', description: 'Unit', icon: Beaker, tone: 'neutral' as const },
    { title: 'Alert Aktif', value: '02', description: 'Laporan', icon: AlertTriangle, tone: 'danger' as const },
    { title: 'Hari Sejak Tanam', value: '18', description: 'Hari', icon: BookOpen, tone: 'neutral' as const },
  ],
  alerts: [
    {
      title: 'Kontainer 1 — Level air rendah (65%)',
      description: 'Tambahkan air segera untuk menjaga sirkulasi nutrisi.',
      cta: 'Lihat Detail',
      tone: 'danger' as const,
      icon: Droplets,
    },
    {
      title: 'Kontainer 2 — pH di atas normal (7.2)',
      description: 'Cek larutan nutrisi dan sesuaikan pH regulator.',
      cta: 'Lihat Detail',
      tone: 'neutral' as const,
      icon: FlaskConical,
    },
  ],
  activities: [
    {
      title: 'Penyesuaian sistem penyiraman',
      description: 'Sistem otomatis mendeteksi suhu tinggi.',
      time: 'Hari ini, 10:45',
      status: 'Dalam proses',
      icon: Eye,
      tone: 'neutral' as const,
    },
    {
      title: 'Pengecekan nutrisi',
      description: 'Penambahan larutan AB Mix pada Kontainer 1.',
      time: 'Hari ini, 08:20',
      status: 'Selesai',
      icon: CheckCheck,
      tone: 'success' as const,
    },
    {
      title: 'Penyesuaian pencahayaan',
      description: 'Siklus malam akan dimulai otomatis.',
      time: 'Nanti, 18:00',
      status: 'Akan datang',
      icon: Sun,
      tone: 'muted' as const,
    },
  ],
  helperCard: {
    title: 'Butuh bantuan merawat tanaman?',
    description: 'Pelajari cara menyeimbangkan pH dan EC untuk hasil panen yang maksimal di Panduan Hidroponik kami.',
    cta: 'Buka Panduan',
  },
};

export const plantListPage = {
  breadcrumb: ['Dashboard', 'Tanaman Saya'],
  plants: [
    {
      id: 'kontainer-1',
      name: 'Kontainer 1 — Selada',
      status: 'Optimal',
      tone: 'success' as const,
      avatar: '🥬',
      stats: [
        { label: 'pH Level', value: '6.5', suffix: 'OK', icon: FlaskConical, tone: 'neutral' as const },
        { label: 'Suhu', value: '24°C', suffix: 'OK', icon: Thermometer, tone: 'neutral' as const },
        { label: 'Nutrisi', value: '1.8', suffix: 'OK', icon: Zap, tone: 'neutral' as const },
        { label: 'Level Air', value: '65%', suffix: 'Low', icon: Droplets, tone: 'danger' as const },
      ],
    },
    {
      id: 'kontainer-2',
      name: 'Kontainer 2 — Pakcoy',
      status: 'Perhatian',
      tone: 'danger' as const,
      avatar: '🧑‍🌾',
      stats: [
        { label: 'pH Level', value: '7.2', suffix: 'High', icon: FlaskConical, tone: 'neutral' as const },
        { label: 'Suhu', value: '25°C', suffix: 'OK', icon: Thermometer, tone: 'neutral' as const },
        { label: 'Konduktivitas', value: '2.0', suffix: 'OK', icon: Waves, tone: 'neutral' as const },
        { label: 'Level Air', value: '85%', suffix: 'OK', icon: Droplets, tone: 'neutral' as const },
      ],
    },
  ],
};

export const plantDetailPage = {
  breadcrumb: ['Dashboard', 'Tanaman Saya', 'Container 1'],
  title: 'Bayam A',
  status: 'Healthy',
  metrics: [
    { label: 'Suhu', value: '19.4', unit: '°C', note: 'Suhu sudah baik', icon: Thermometer, tone: 'neutral' as const },
    { label: 'pH', value: '19.4', unit: 'pH', note: 'Tingkat pH sudah oke', icon: FlaskConical, tone: 'neutral' as const },
    { label: 'Nutrisi', value: '19.4', unit: 'PPM', note: 'nutrisi sudah oke', icon: Zap, tone: 'warning' as const },
    { label: 'Level Air', value: '19.4', unit: '%', note: 'Level air sudah baik', icon: Droplets, tone: 'info' as const },
  ],
  history: [
    { title: 'Reservoir Top-up', description: 'Added 2.5L RO water with adjusted A+B nutrient blend.', timestamp: 'Today, 08:30', icon: Droplets },
    { title: 'Light Cycle Adjustment', description: 'Delayed dark cycle by 1 hour to synchronize with peak harvest window.', timestamp: 'Yesterday, 22:00', icon: Sun },
    { title: 'Pruning Session', description: 'Removed lower fan leaves to improve airflow and vertical light penetration.', timestamp: 'Oct 24, 14:15', icon: Wind },
  ],
};
