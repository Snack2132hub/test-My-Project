"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Search, X, Stethoscope } from "lucide-react";
import { Kanit } from "next/font/google";
import {
  Doctor,
  DOCTORS_DATA,
  POSITION_LEVELS,
  MEDICAL_CENTERS,
} from "@/lib/doctorsData";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function DoctorsDirectoryContent() {
  const searchParams = useSearchParams();
  const initialDept = searchParams.get("dept") || "ทั้งหมด";
  const initialPosition = searchParams.get("level") || "ทั้งหมด";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);
  const [selectedCenter, setSelectedCenter] = useState(initialDept);

  // กรองรายชื่อแพทย์ตามเงื่อนไขที่เลือก
  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter((doctor) => {
      // ค้นหาตามข้อความ (ชื่อ, แผนก, ความเชี่ยวชาญ)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = doctor.name.toLowerCase().includes(query);
        const matchDept = doctor.department.toLowerCase().includes(query);
        const matchSpec = doctor.specialties.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchPos = doctor.position.toLowerCase().includes(query);
        if (!matchName && !matchDept && !matchSpec && !matchPos) {
          return false;
        }
      }

      // กรองตามระดับความเชี่ยวชาญ
      if (selectedPosition !== "ทั้งหมด") {
        if (!doctor.position.includes(selectedPosition)) {
          return false;
        }
      }

      // กรองตามศูนย์การรักษา
      if (selectedCenter !== "ทั้งหมด") {
        const deptNorm = doctor.departmentCategory || doctor.department;
        if (
          !deptNorm.includes(selectedCenter) &&
          !doctor.department.includes(selectedCenter)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedPosition, selectedCenter]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedPosition("ทั้งหมด");
    setSelectedCenter("ทั้งหมด");
  };

  return (
    <div className={`${kanit.className} min-h-screen bg-white pb-24`}>
      {/* Container หลัก */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Breadcrumb Navigation */}
        <nav
          id="doctors-breadcrumb"
          className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#f97316] transition-colors">
            หน้าแรก
          </Link>
          <span>/</span>
          <span className="text-[#f97316] font-medium">บุคลากรแพทย์</span>
        </nav>

        {/* ส่วนหัวเรื่อง & ตัวกรอง (ค้นหาแพทย์) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-gray-100">
          {/* หัวข้อด้านซ้าย */}
          <div className="max-w-xl">
            <h1
              id="doctors-page-title"
              className="text-3xl sm:text-4xl font-bold text-[#f97316] tracking-tight"
            >
              บุคลากรแพทย์
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1.5 font-light">
              ค้นหาโดยชื่อ ค้นหาจากความเชี่ยวชาญ หรือค้นหาจากศูนย์
            </p>
          </div>

          {/* แถบตัวกรองและช่องค้นหาด้านขวา */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-end gap-3 lg:gap-4">
            {/* ช่องค้นหาชื่อแพทย์ */}
            <div className="relative min-w-[200px] sm:min-w-[220px]">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                ค้นหาชื่อ / ความเชี่ยวชาญ
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="doctor-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="พิมพ์ค้นหาแพทย์..."
                  className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#f97316]/60 focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 rounded-xl outline-hidden text-gray-800 placeholder-gray-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                    aria-label="ล้างการค้นหา"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* ดรอปดาวน์ 1: ระดับความเชี่ยวชาญ (Frame 1000005985) */}
            <div className="min-w-[170px] sm:min-w-[190px]">
              <label
                htmlFor="filter-position-level"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                ระดับความเชี่ยวชาญ
              </label>
              <div className="relative">
                <select
                  id="filter-position-level"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#f97316] text-[#f97316] font-medium text-sm rounded-xl px-4 py-2 pr-9 outline-hidden focus:ring-2 focus:ring-orange-200 cursor-pointer shadow-2xs hover:bg-orange-50/40 transition-colors"
                >
                  {POSITION_LEVELS.map((level) => (
                    <option key={level} value={level} className="text-gray-800 font-normal">
                      {level}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#f97316] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
              </div>
            </div>

            {/* ดรอปดาวน์ 2: ศูนย์การรักษา (Frame 1000005992) */}
            <div className="min-w-[170px] sm:min-w-[190px]">
              <label
                htmlFor="filter-medical-center"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                ศูนย์การรักษา
              </label>
              <div className="relative">
                <select
                  id="filter-medical-center"
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#f97316] text-[#f97316] font-medium text-sm rounded-xl px-4 py-2 pr-9 outline-hidden focus:ring-2 focus:ring-orange-200 cursor-pointer shadow-2xs hover:bg-orange-50/40 transition-colors"
                >
                  {MEDICAL_CENTERS.map((center) => (
                    <option key={center} value={center} className="text-gray-800 font-normal">
                      {center}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#f97316] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* แถบแจ้งจำนวนผลลัพธ์และตัวกรองที่เลือก */}
        <div className="flex items-center justify-between mt-6 mb-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>
              พบแพทย์ทั้งหมด <strong className="text-[#f97316] font-bold">{filteredDoctors.length}</strong> ท่าน
            </span>
            {(selectedPosition !== "ทั้งหมด" || selectedCenter !== "ทั้งหมด" || searchQuery) && (
              <span className="text-xs bg-orange-100/70 text-[#f97316] px-2.5 py-0.5 rounded-full font-medium">
                กำลังกรองผลลัพธ์
              </span>
            )}
          </div>

          {(selectedPosition !== "ทั้งหมด" || selectedCenter !== "ทั้งหมด" || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs sm:text-sm text-gray-500 hover:text-[#f97316] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              ล้างตัวกรองทั้งหมด
            </button>
          )}
        </div>

        {/* ตารางแสดงการ์ดแพทย์ (4 คอลัมน์ตามรูปที่ 1) */}
        {filteredDoctors.length > 0 ? (
          <div
            id="doctors-grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredDoctors.map((doctor: Doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                id={`doctor-card-${doctor.id}`}
                className="group flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 focus:outline-hidden"
              >
                {/* กรอบรูปภาพทรงสี่เหลี่ยมแนวตั้ง โทนส้มอุ่น (Peach Frame ตามแบบในภาพ 1) */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 via-[#ffedd5]/80 to-[#fed7aa]/40 border border-orange-100/90 shadow-2xs group-hover:shadow-md group-hover:border-orange-300 transition-all duration-300">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={doctor.id === 401 || doctor.id === 101}
                  />
                </div>

                {/* ข้อมูลใต้รูป */}
                <div className="mt-3.5 w-full px-1">
                  <h2 className="text-[17px] font-bold text-gray-800 group-hover:text-[#f97316] transition-colors leading-snug">
                    {doctor.name}
                  </h2>
                  <p className="text-[13px] text-[#f97316] font-medium mt-0.5">
                    {doctor.position}
                  </p>
                  <p className="text-[13px] text-gray-500 mt-0.5 line-clamp-1">
                    {doctor.department}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* กรณีไม่พบแพทย์ตามเงื่อนไขที่ค้นหา */
          <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#f97316] mb-4">
              <Stethoscope className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">ไม่พบรายชื่อแพทย์ที่ตรงกับเงื่อนไข</h3>
            <p className="text-sm text-gray-500 mb-6">
              กรุณาลองเปลี่ยนคำค้นหา หรือเลือกตัวกรองระดับความเชี่ยวชาญและศูนย์การรักษาใหม่อีกครั้ง
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl text-sm font-medium transition-colors shadow-xs"
            >
              ดูรายชื่อแพทย์ทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DoctorsDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">
          กำลังโหลดข้อมูลบุคลากรแพทย์...
        </div>
      }
    >
      <DoctorsDirectoryContent />
    </Suspense>
  );
}
