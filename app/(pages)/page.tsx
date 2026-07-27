"use client";

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

/**
 * หน้าหลัก (Home Page) โรงพยาบาลปากช่องนานา
 * รวบรวมส่วนประกอบต่างๆ (Components) จากโฟลเดอร์ components/home เพื่อความเป็นระเบียบและง่ายต่อการแก้ไข
 */
export default function Home() {
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
    </div>
  );
}
