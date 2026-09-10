"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { TreatmentCenter } from "@/lib/treatmentCentersData";
import { type UICenter, toUICenter } from "@/lib/centerView";
import CenterView from "@/components/patient-services/CenterView";

export default function SpecialCenterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug ?? "");

  const [centers, setCenters] = useState<UICenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/centers")
      .then((r) => r.json())
      .then((json) => {
        const rows: TreatmentCenter[] = json?.ok && Array.isArray(json.data) ? json.data : [];
        setCenters(rows.map(toUICenter));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <CenterView
      centers={centers}
      selectedSlug={slug}
      onSelectCenter={(s) => router.push(`/special-centers/${s}`)}
      loading={loading}
      sidebarHeading="ศูนย์รักษาพิเศษ"
      pageHeading="ศูนย์รักษาพิเศษ"
      breadcrumbLabel="ศูนย์รักษาพิเศษ"
      breadcrumbHref="/special-centers"
    />
  );
}
