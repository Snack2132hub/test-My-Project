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
                       ? "/img/AfterHoursClinicSection/smc/smc_july.png"
                      : "/img/AfterHoursClinicSection/smc/smc_apr.png"
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
                    src="/img/AfterHoursClinicSection/LG.png"
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
                    src="/img/AfterHoursClinicSection/LG.png"
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
                    src="/img/AfterHoursClinicSection/LG.png"
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
    </section>
  );
}
