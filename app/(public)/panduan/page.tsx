import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <PagePlaceholder
        title="panduan"
        description="Halaman ini sudah disiapkan strukturnya agar mudah dilanjutkan pada fase berikutnya. Nanti kita bisa isi dengan UI dan logic sesuai kebutuhan fitur."
      />
      <SiteFooter />
    </main>
  );
}
