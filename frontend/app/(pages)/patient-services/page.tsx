"use client";
import "@/app/(pages)/pages.css";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { TreatmentCenter } from "@/lib/treatmentCentersData";
import { type UICenter, toUICenter } from "@/lib/centerView";
import CenterView from "@/components/patient-services/CenterView";

function PatientServicesContent() {
  const searchParams = useSearchParams();
  const [centers, setCenters] = useState<UICenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState(searchParams?.get("dept") || "obgyn");

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
    if (dept) setSelectedSlug(dept);
  }, [searchParams]);

  const handleSelectCenter = (slug: string) => {
    setSelectedSlug(slug);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("dept", slug);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <CenterView
      centers={centers}
      selectedSlug={selectedSlug}
      onSelectCenter={handleSelectCenter}
      loading={loading}
      sidebarHeading="ศูนย์รักษาเฉพาะทาง"
      pageHeading="ศูนย์บริการผู้ป่วย - ศูนย์รักษาเฉพาะทาง"
      breadcrumbLabel="ศูนย์การรักษาเฉพาะทาง"
      breadcrumbHref="/specialized-centers"
      showSidebar={false}
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
