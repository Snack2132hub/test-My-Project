import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { RowDataPacket } from "mysql2";
import { ArrowLeft, Calendar, Award, GraduationCap, BookOpen, Briefcase } from "lucide-react";
import { Kanit } from "next/font/google";
import getPool from "@/lib/db";
import { getDoctorById, type Doctor } from "@/lib/doctorsData";
import { mapDoctorRow } from "@/lib/doctorsMap";

export const dynamic = "force-dynamic";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface DoctorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function loadDoctor(id: string): Promise<Doctor | undefined> {
  const numericId = Number(id);
  if (!Number.isNaN(numericId)) {
    try {
      const pool = getPool();
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM doctor_detail WHERE dr_id = ?",
        [numericId]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return mapDoctorRow(rows[0] as never);
      }
    } catch {
      // DB unavailable — fall back to bundled data
    }
  }
  return getDoctorById(id);
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { id } = await params;
  const doctor = await loadDoctor(id);

  if (!doctor) {
    notFound();
  }

  // กำหนดชื่อศูนย์การรักษา เช่น "ศูนย์ศัลยศาสตร์ออร์โธปิดิกส์"
  const centerTitle = doctor.department.startsWith("ศูนย์")
    ? doctor.department
    : `ศูนย์${doctor.department}`;

  return (
    <div className={`${kanit.className} min-h-screen bg-white pb-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* 1. แถบ Breadcrumb Navigation */}
        <nav
          id="doctor-detail-breadcrumb"
          className="text-xs sm:text-sm text-gray-500 mb-2 flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#f97316] transition-colors">
            หน้าแรก
          </Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-[#f97316] transition-colors">
            บุคลากรแพทย์
          </Link>
        </nav>

        {/* 2. ปุ่มย้อนกลับ "← กลับหน้าบุคลากรแพทย์" */}
        <div className="mb-6">
          <Link
            href="/doctors"
            id="back-to-doctors-btn"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#f97316] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>กลับหน้าบุคลากรแพทย์</span>
          </Link>
        </div>

        {/* 3. หัวข้อศูนย์การรักษา (แบบในรูปที่ 3 เช่น "ศูนย์ศัลยศาสตร์ออร์โธปิดิกส์") */}
        <h1
          id="doctor-center-heading"
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f97316] tracking-tight mb-7"
        >
          {centerTitle}
        </h1>

        {/* 4. เลย์เอาต์แบ่งเป็น 2 คอลัมน์ (ซ้าย: รูปแพทย์และข้อมูลตำแหน่ง, ขวา: รายละเอียดตารางออกตรวจและความเชี่ยวชาญ) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* คอลัมน์ซ้าย: รูปภาพแพทย์และชื่อ (ตามรูปที่ 3) */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            {/* การ์ดกรอบรูปภาพโทนสีส้มอ่อน (Peach Frame) */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 via-[#ffedd5]/80 to-[#fed7aa]/40 border border-orange-100 shadow-sm">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* ข้อมูลใต้รูป */}
            <div className="mt-4 w-full text-center">
              <h2 className="text-[15px] sm:text-base md:text-[17px] font-bold text-gray-900 leading-snug whitespace-nowrap">
                {doctor.name}
              </h2>
              <p className="text-sm sm:text-base font-medium text-[#f97316] mt-0.5">
                {doctor.position}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {doctor.department}
              </p>

              {/* ปุ่มติดต่อนัดหมายด่วน */}
              <div className="mt-6">
                <Link
                  href="/patient-services?dept=appointment"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium text-sm rounded-xl shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>นัดหมายแพทย์ท่านนี้</span>
                </Link>
              </div>
            </div>
          </div>

          {/* คอลัมน์ขวา: รายละเอียดแพทย์ (ตามรูปที่ 3) */}
          <div className="md:col-span-8 lg:col-span-8 space-y-7">
            {/* 4.1 กล่อง "ตารางออกตรวจ" (พื้นหลังสีส้มอ่อน กรอบสีส้มตามรูปที่ 3) */}
            {doctor.schedules && doctor.schedules.length > 0 && (
              <div
                id="doctor-schedule-box"
                className="bg-[#fff8f0] border border-[#fbd4b4] rounded-2xl p-5 sm:p-6 shadow-2xs"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f97316]" />
                  <span>ตารางออกตรวจ</span>
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 font-normal">
                  {doctor.schedules.map((schedule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#f97316] font-bold text-lg leading-none">•</span>
                      <span>{schedule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4.2 ส่วน "ความเชี่ยวชาญ" (Specialties) */}
            {doctor.specialties && doctor.specialties.length > 0 && (
              <div id="doctor-specialties-section" className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#f97316]" />
                  <span>ความเชี่ยวชาญ</span>
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  {doctor.specialties.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#f97316] font-bold text-lg leading-none">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4.3 ส่วน "ประวัติการศึกษา (education)" */}
            {doctor.education && doctor.education.length > 0 && (
              <div id="doctor-education-section" className="space-y-3 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#f97316]" />
                  <span>ประวัติการศึกษา (education)</span>
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-[#f97316] font-bold text-lg leading-none mt-0.5">•</span>
                      <span className="flex-1">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4.4 ส่วน "ตำแหน่งและบทบาทหน้าที่" (Positions) ถ้ามี */}
            {doctor.positions && doctor.positions.length > 0 && (
              <div id="doctor-positions-section" className="space-y-3 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#f97316]" />
                  <span>ตำแหน่งและบทบาทหน้าที่</span>
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                  {doctor.positions.map((pos, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#f97316] font-bold text-lg leading-none">•</span>
                      <span>{pos}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4.5 ส่วน "ผลงานทางวิชาการ (Publications)" ถ้ามี */}
            {doctor.contributions && doctor.contributions.length > 0 && (
              <div id="doctor-contributions-section" className="space-y-3 pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#f97316]" />
                  <span>ผลงานทางวิชาการ (Publications)</span>
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-gray-700">
                  {doctor.contributions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 italic text-gray-600">
                      <span className="text-[#f97316] font-bold text-lg leading-none mt-0.5">•</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
