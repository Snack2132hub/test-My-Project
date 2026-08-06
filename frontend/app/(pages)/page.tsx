"use client";

import { useEffect, useState } from "react";

import HeroBanner from "@/components/home/HeroBanner";
import ActionButtonsBar from "@/components/home/ActionButtonsBar";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import MedicalServicesSection from "@/components/home/MedicalServicesSection";
import HealthCheckupSection from "@/components/home/HealthCheckupSection";
import OnlineAppointmentSection from "@/components/home/OnlineAppointmentSection";
import DoctorTeamSection from "@/components/home/DoctorTeamSection";
import AfterHoursClinicSection from "@/components/home/AfterHoursClinicSection";
import NewsAndActivitiesSection from "@/components/home/NewsAndActivitiesSection";
import ProcurementAndContactSection from "@/components/home/ProcurementAndContactSection";
import ScrollToTop from "@/components/home/ScrollToTop";

type DbDebugPayload = {
  ok: boolean;
  table?: string;
  data?: {
    dr_id?: number;
    dr_img?: string | null;
  } | null;
  message?: string;
};

/**
 * หน้าหลัก (Home Page) โรงพยาบาลปากช่องนานา
 * รวบรวมส่วนประกอบต่างๆ (Components) จากโฟลเดอร์ components/home เพื่อความเป็นระเบียบและง่ายต่อการแก้ไข
 */
export default function Home() {
  const [showDbTestPanel, setShowDbTestPanel] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [dbError, setDbError] = useState<string>("");
  const [connectedTable, setConnectedTable] = useState<string>("-");
  const [doctorId, setDoctorId] = useState<string>("-");
  const [doctorImage, setDoctorImage] = useState<string>("-");
  const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);

  useEffect(() => {
    // window.location is only available post-hydration, so this can't be derived during render
    // without a server/client mismatch — an effect-based sync from the URL is unavoidable here.
    const query = new URLSearchParams(window.location.search);
    if (query.get("dbtest") === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoadingDoctor(true);
      setShowDbTestPanel(true);
    }
  }, []);

  useEffect(() => {
    if (!showDbTestPanel) return;

    let isMounted = true;
    const checkDbConnection = async () => {
      try {
        const response = await fetch("/api/doctors?debug=1", { cache: "no-store" });
        const payload = (await response.json()) as DbDebugPayload;

        if (!response.ok || !payload.ok) {
          throw new Error(payload.message || "Failed to connect database");
        }

        if (isMounted) {
          setIsDbConnected(true);
          setDbError("");
          setConnectedTable(payload.table || "-");
          setDoctorId(
            payload.data?.dr_id !== undefined && payload.data?.dr_id !== null
              ? String(payload.data.dr_id)
              : "-"
          );
          setDoctorImage(payload.data?.dr_img || "-");
        }
      } catch (error) {
        if (isMounted) {
          setIsDbConnected(false);
          setDbError(error instanceof Error ? error.message : "Unknown error");
          setConnectedTable("-");
          setDoctorId("-");
          setDoctorImage("-");
        }
      } finally {
        if (isMounted) {
          setIsLoadingDoctor(false);
        }
      }
    };

    checkDbConnection();
    return () => {
      isMounted = false;
    };
  }, [showDbTestPanel]);

  return (
    <div className="flex flex-col w-full bg-slate-50 flex-1">
      {/* 1. สไลเดอร์แบนเนอร์ภาพต้อนรับหน้าแรก */}
      <HeroBanner />

      {/* 2. แถบปุ่มทางลัดด่วน (นัดหมายแพทย์, ศูนย์การรักษา, โปรโมชั่น) */}
      <ActionButtonsBar />

      {/* 3. ส่วนข่าวประกาศสำคัญ */}
      <AnnouncementsSection />

      {/* 4. ส่วนบริการทางการแพทย์และคลินิกต่างๆ */}
      <MedicalServicesSection />

      {/* 5. ส่วนโปรแกรมตรวจสุขภาพและฉีดวัคซีน */}
      <HealthCheckupSection />

      {/* 6. ส่วนระบบนัดหมายออนไลน์ (ในเวลาราชการ / นอกเวลาราชการ) */}
      <OnlineAppointmentSection />

      {/* 7. ส่วนแนะนำทีมแพทย์เชี่ยวชาญ */}
      <DoctorTeamSection />

      {/* 8. ส่วนคลินิกพิเศษนอกเวลา (ตารางประจำเดือน) */}
      <AfterHoursClinicSection />

      {/* 9. ส่วนข่าวสารและกิจกรรมภายในโรงพยาบาล */}
      <NewsAndActivitiesSection />

      {/* 10. ส่วนข่าวจัดซื้อจัดจ้าง สมัครงาน สื่อวิดีโอ และ ติดต่อเรา */}
      <ProcurementAndContactSection />

      {/* ปุ่มเลื่อนกลับขึ้นบนสุด */}
      <ScrollToTop />

      {showDbTestPanel && (
        <aside className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-xl">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-lg" style={{ color: "#0f172a" }}>
            {isLoadingDoctor && (
              <p className="mt-3 text-sm text-emerald-800" style={{ color: "#166534" }}>
                กำลังโหลดข้อมูล...
              </p>
            )}

            {!isLoadingDoctor && (
              <div className="mt-1 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <p style={{ color: "#0f172a" }}>
                  <strong>สถานะ:</strong> {isDbConnected ? "เชื่อมต่อฐานข้อมูลสำเร็จ" : "เชื่อมต่อไม่สำเร็จ"}
                </p>
                <p style={{ color: "#0f172a" }}>
                  <strong>ตารางที่เชื่อม:</strong> {connectedTable}
                </p>
                <p style={{ color: "#0f172a" }}>
                  <strong>รหัสแพทย์:</strong> {doctorId}
                </p>
                <p style={{ color: "#0f172a" }}>
                  <strong>รูปภาพ:</strong> {doctorImage}
                </p>
              </div>
            )}

            {!isLoadingDoctor && dbError && (
              <p className="mt-3 text-sm font-medium text-red-600" style={{ color: "#dc2626" }}>
                รายละเอียดข้อผิดพลาด: {dbError}
              </p>
            )}
          </div>
        </aside>
      )}

    </div>
  );
}
