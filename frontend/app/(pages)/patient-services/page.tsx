"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { TreatmentCenter } from "@/lib/treatmentCentersData";
import { type UICenter, toUICenter } from "@/lib/centerView";
import CenterView from "@/components/patient-services/CenterView";

function PatientServicesContent() {
  const searchParams = useSearchParams();
  const [centers, setCenters] = useState<UICenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState(searchParams?.get("dept") || "emergency");

  useEffect(() => {
    fetch("/api/treatment-centers")
      .then((r) => r.json())
      .then((json) => {
        const rows: TreatmentCenter[] = json?.ok && Array.isArray(json.data) ? json.data : [];
        setCenters(rows.map(toUICenter));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const dept = searchParams?.get("dept");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (dept) setSelectedSlug(dept);
  }, [searchParams]);

  return (
    <CenterView
      centers={centers}
      selectedSlug={selectedSlug}
      onSelectCenter={setSelectedSlug}
      loading={loading}
      sidebarHeading="ศูนย์รักษาเฉพาะทาง"
      pageHeading="ศูนย์บริการผู้ป่วย - ศูนย์รักษาเฉพาะทาง"
      breadcrumbLabel="ศูนย์รักษาเฉพาะทาง"
      breadcrumbHref="/specialized-centers"
    />
  );
}

export default function PatientServicesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">กำลังโหลดข้อมูลศูนย์บริการผู้ป่วย...</div>}>
      <PatientServicesContent />
    </Suspense>
  );
}
