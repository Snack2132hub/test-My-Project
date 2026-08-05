"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

/**
 * คอมโพเนนต์ AfterHoursClinicSection (ส่วนคลินิกพิเศษนอกเวลา)
 * - ปุ่มสลับเลือกตารางบริการ "เดือนนี้" / "เดือนหน้า"
 * - การ์ดรูปโปสเตอร์ตารางบริการ
 * - การ์ดข้อมูลสาระสำคัญเพิ่มเติม
 */
export default function AfterHoursClinicSection() {
  // State สลับตารางบริการประจำเดือน
  const [selectedClinicMonth, setSelectedClinicMonth] = useState<"thisMonth" | "nextMonth">("thisMonth");

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-slate-50/50 border-t border-slate-100">
      {/* ฉากหลังรูปภาพเบลอโปร่งแสง */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
          alt="Hospital Background"
          fill
          className="object-cover opacity-[0.06] filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/90" />
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
          {/* คอลัมน์ซ้าย: รูปภาพโปสเตอร์ตารางให้บริการประจำเดือน */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-orange-100 bg-white group">
              <div className="relative aspect-[4/3] w-full">
                {/* 📌 [จุดเปลี่ยนรูปโปสเตอร์ตารางคลินิกพิเศษนอกเวลา] 
                    สามารถเปลี่ยน src ตามเดือน เช่น:
                    - เดือนนี้: "/img/clinic/schedule_this_month.png"
                    - เดือนหน้า: "/img/clinic/schedule_next_month.png"
                */}
                <Image
                  src={
                    selectedClinicMonth === "thisMonth"
                      ? "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000"
                      : "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                  }
                  alt="ตารางคลินิกพิเศษนอกเวลา"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
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
                    ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-orange-200/60 shadow-md"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
                }`}
              >
                เดือนนี้
              </button>

              <button
                onClick={() => setSelectedClinicMonth("nextMonth")}
                className={`px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                  selectedClinicMonth === "nextMonth"
                    ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-orange-200/60 shadow-md"
                    : "bg-white text-[#f97316] hover:bg-orange-50 border border-[#f97316]/60 shadow-xs"
                }`}
              >
                เดือนหน้า <ChevronRight className="w-4 h-4 inline stroke-[2.5]" />
              </button>
            </div>

            {/* การ์ดข้อมูลข่าวสารและรายละเอียด 3 รายการ */}
            <div className="flex flex-col gap-4 mt-1">
              {/* รายการที่ 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  LG
                </div>
                <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug group-hover:text-[#f97316] transition-colors">
                  จองคิวตรวจผ่าน แอปพลิเคชัน &quot;หมอพร้อม&quot;
                </span>
              </div>

              {/* รายการที่ 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  LG
                </div>
                <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug group-hover:text-[#f97316] transition-colors">
                  อาคารผู้ป่วยนอก ชั้น 3 เวลา 16.00-20.00 น.
                </span>
              </div>

              {/* รายการที่ 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  LG
                </div>
                <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug group-hover:text-[#f97316] transition-colors">
                  ค่าบริการเริ่มต้นที่ 350 บาท
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
