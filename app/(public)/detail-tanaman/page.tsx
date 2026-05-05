"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect from /detail-tanaman to /list-tanaman since we now use /detail-tanaman/[id]
export default function DetailTanamanPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/list-tanaman");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <p className="text-sm text-primary/60">Mengalihkan...</p>
    </div>
  );
}
