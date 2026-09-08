"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Doctor } from "@/lib/doctorsData";

/**
 * คอมโพเนนต์ DoctorTeamSection (ส่วนทีมแพทย์เชี่ยวชาญ)
 * ดึงข้อมูลจาก /api/doctors (จัดการผ่านหน้า admin)
 */
export default function DoctorTeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/doctors")
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled && json.ok && Array.isArray(json.data)) setDoctors(json.data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ดึงรายชื่อแพทย์ตัวอย่างมาแสดงในหน้าแรก
  const featuredDoctors = doctors.slice(0, 12);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, featuredDoctors.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleDoctors = featuredDoctors.slice(currentIndex, currentIndex + itemsPerPage);

  if (!loading && doctors.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อส่วนทีมแพทย์เชี่ยวชาญ */}
        <div className="flex flex-col items-center mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            ทีมแพทย์เชี่ยวชาญ
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
        </div>

        {/* รายการการ์ดแพทย์ พร้อมปุ่มเลื่อน ซ้าย - ขวา */}
        <div className="relative flex items-center justify-between gap-2 sm:gap-4 max-w-6xl mx-auto">
          {/* ปุ่มเลื่อนซ้าย */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
            aria-label="Previous doctors"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* กริดแสดงการ์ดแพทย์ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full py-2">
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-full aspect-[3/4] rounded-2xl bg-orange-50 border border-orange-100 animate-pulse mb-4" />
                    <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                    <div className="mt-2 h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))
              : visibleDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 via-[#ffedd5]/80 to-[#fed7aa]/40 border border-orange-100 shadow-sm group-hover:shadow-md group-hover:border-orange-300 transition-all duration-300 mb-4">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h4 className="text-[17px] font-bold text-gray-800 group-hover:text-[#f97316] transition-colors leading-snug">
                  {doctor.name}
                </h4>
                <p className="text-[13px] text-[#f97316] font-medium mt-0.5">
                  {doctor.position}
                </p>
                <p className="text-[13px] text-gray-500 mt-0.5 line-clamp-1">
                  {doctor.department}
                </p>
              </Link>
            ))}
          </div>

          {/* ปุ่มเลื่อนขวา */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
            aria-label="Next doctors"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* ปุ่มดูทั้งหมด */}
        <div className="flex justify-center mt-12">
          <Link
            href="/doctors"
            id="view-all-doctors-btn"
            className="px-10 py-2.5 sm:px-12 sm:py-3 bg-gradient-to-r from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] text-white font-medium text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:scale-98 inline-block text-center"
          >
            ดูทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}
