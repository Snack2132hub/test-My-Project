"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

/**
 * คอมโพเนนต์ AfterHoursClinicSection (ส่วนคลินิกพิเศษนอกเวลา)
 * - ปุ่มสลับเลือกตารางบริการ "เดือนนี้" / "เดือนหน้า"
 * - การ์ดรูปโปสเตอร์ตารางบริการ พร้อมป๊อบอัพขยายรูปตารางเวลา
 * - การ์ดข้อมูลสาระสำคัญเพิ่มเติม
 */
export default function AfterHoursClinicSection() {
  // State สลับตารางบริการประจำเดือน
  const [selectedClinicMonth, setSelectedClinicMonth] = useState<"thisMonth" | "nextMonth">("thisMonth");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ปิด modal เมื่อกด ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const currentScheduleSrc =
    selectedClinicMonth === "thisMonth"
      ? "/img/AfterHoursClinicSection/smc/smc_july.png"
      : "/img/AfterHoursClinicSection/smc/smc_apr.png";

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden border-t border-orange-100/80">
      {/* พื้นหลังรูปภาพ 1438_594.png */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/img/BG/1438_594.png"
          alt="After Hours Clinic Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* หัวข้อส่วนคลินิกพิเศษนอกเวลา */}
        <div className="flex flex-col items-start mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            คลินิกพิเศษนอกเวลา
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* คอลัมน์ซ้าย: รูปภาพโปสเตอร์ตารางให้บริการประจำเดือน (คลิกเปิดป๊อบอัพได้) */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-orange-100 bg-white group cursor-pointer transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={currentScheduleSrc}
                  alt="ตารางคลินิกพิเศษนอกเวลา"
                  fill
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Hover overlay indicator */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-[#f97316] text-white text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                    คลิกเพื่อดูตารางขนาดใหญ่
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* คอลัมน์ขวา: ปุ่มสลับเดือน และ การ์ดข้อมูลบริการ */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-6 self-start">
            {/* ปุ่มสลับเดือน (เดือนนี้ / เดือนหน้า) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedClinicMonth("thisMonth")}
                className={`px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer shadow-xs ${
                  selectedClinicMonth === "thisMonth"
                    ? "bg-linear-to-r from-[#ffa154] to-[#f97316] text-white shadow-orange-200/60 shadow-md"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
                }`}
              >
                เดือนนี้
              </button>

              <button
                onClick={() => setSelectedClinicMonth("nextMonth")}
                className={`px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                  selectedClinicMonth === "nextMonth"
                    ? "bg-linear-to-r from-[#ffa154] to-[#f97316] text-white shadow-orange-200/60 shadow-md"
                    : "bg-white text-[#f97316] hover:bg-orange-50 border border-[#f97316]/60 shadow-xs"
                }`}
              >
                เดือนหน้า <ChevronRight className="w-4 h-4 inline" strokeWidth={2.5} />
              </button>
            </div>

            {/* การ์ดข้อมูลข่าวสารและรายละเอียด 3 รายการ */}
            <div className="flex flex-col gap-4 mt-1">
              {/* รายการที่ 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                  <Image
                    src="/img/AfterHoursClinicSection/lo.png"
                    alt="LG Icon"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug">
                  จองคิวตรวจผ่าน แอปพลิเคชัน &quot;หมอพร้อม&quot;
                </span>
              </div>

              {/* รายการที่ 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                  <Image
                    src="/img/AfterHoursClinicSection/money.png"
                    alt="LG Icon"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug">
                  อาคารผู้ป่วยนอก ชั้น 3 เวลา 16.00-20.00 น.
                </span>
              </div>

              {/* รายการที่ 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                  <Image
                    src="/img/AfterHoursClinicSection/mp.png"
                    alt="LG Icon"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug">
                  ค่าบริการเริ่มต้นที่ 350 บาท
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal ป๊อบอัพรูปตารางเวลาขนาดใหญ่ (แสดงเฉพาะตัวรูปภาพ พร้อมปุ่มลูกศรซ้าย-ขวาสำหรับสลับเดือน) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          {/* ปุ่มปิดมุมบนขวา */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-xl group"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
          </button>

          {/* ปุ่มลูกศรซ้ายสำหรับสลับเดือน */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedClinicMonth((prev) => (prev === "thisMonth" ? "nextMonth" : "thisMonth"));
            }}
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-60 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-2xl group hover:scale-110 active:scale-95"
            aria-label="Previous month"
            title="สลับดูตารางเดือนอื่น"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          {/* ปุ่มลูกศรขวาสำหรับสลับเดือน */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedClinicMonth((prev) => (prev === "thisMonth" ? "nextMonth" : "thisMonth"));
            }}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-60 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-2xl group hover:scale-110 active:scale-95"
            aria-label="Next month"
            title="สลับดูตารางเดือนอื่น"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </button>

          {/* กล่องแสดงรูปตารางเวลา เพียวๆ ไม่มีกรอบซ้ายขวา */}
          <div
            className="relative flex items-center justify-center max-h-[92vh] max-w-[90vw] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentScheduleSrc}
              alt="ตารางคลินิกพิเศษนอกเวลา ขยายใหญ่"
              className="max-h-[90vh] max-w-[86vw] w-auto h-auto object-contain rounded-2xl shadow-2xl select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}
