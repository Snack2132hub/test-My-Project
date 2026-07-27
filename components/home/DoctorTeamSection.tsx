"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ข้อมูลรายชื่อและรูปภาพแพทย์
 * สามารถเพิ่ม/แก้ไข/ลบ ข้อมูลแพทย์ได้จากอาร์เรย์นี้
 */
const doctors = [
  {
    id: 1,
    name: "นพ.ปิยะพงษ์ อินทร์อัครพัฒน์",
    position: "นายแพทย์ชำนาญการ",
    specialty: "ศัลยศาสตร์ออร์โธปิดิกส์",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "พญ.รจิตา หาญตระกูล",
    position: "นายแพทย์ชำนาญการ",
    specialty: "อายุรกรรม",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "นพ.วารินทร์ จันทร์ประเสริฐ",
    position: "นายแพทย์ชำนาญการ",
    specialty: "กุมารเวชกรรม",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "พญ.วิฒนา บงกชพร",
    position: "นายแพทย์ชำนาญการ",
    specialty: "เวชศาสตร์ครอบครัว",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
  },
];

/**
 * คอมโพเนนต์ DoctorTeamSection (ส่วนทีมแพทย์เชี่ยวชาญ)
 * แสดงการ์ดรูปภาพแพทย์ 4 ท่านพร้อมตำแหน่งและความเชี่ยวชาญ
 */
export default function DoctorTeamSection() {
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
            className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
            aria-label="Previous doctors"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* กริดแสดงการ์ดแพทย์ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full py-2">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 to-[#ffedd5]/90 border border-orange-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  {/* 📌 [จุดเปลี่ยนรูปแพทย์] 
                      สามารถเปลี่ยน src ของรูปหมอในอาร์เรย์ doctors ด้านบน 
                  */}
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{doctor.position}</p>
                <p className="text-xs text-gray-500">{doctor.specialty}</p>
              </div>
            ))}
          </div>

          {/* ปุ่มเลื่อนขวา */}
          <button
            className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
            aria-label="Next doctors"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* ปุ่มดูทั้งหมด */}
        <div className="flex justify-center mt-12">
          <button className="px-10 py-2.5 sm:px-12 sm:py-3 bg-gradient-to-r from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] text-white font-medium text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:scale-98">
            ดูทั้งหมด
          </button>
        </div>
      </div>
    </section>
  );
}
