"use client";

import TreatmentCentersManager from "@/components/admin/TreatmentCentersManager";

/**
 * จัดการ "ศูนย์รักษาพิเศษ" — ฟอร์ม/เนื้อหาเหมือนศูนย์รักษาเฉพาะทางทุกอย่าง
 * แต่เก็บคนละตาราง (hospital_centers ผ่าน /api/centers)
 */
export default function CentersManager() {
  return <TreatmentCentersManager endpoint="/api/centers" heading="จัดการศูนย์รักษาพิเศษ" />;
}
