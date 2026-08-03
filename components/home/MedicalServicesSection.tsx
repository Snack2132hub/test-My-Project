"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Clock,
  Bed,
  Syringe,
  UserPlus,
  Smile,
  HeartPulse,
  Eye,
  Baby,
  Bone,
  Activity,
  Scissors,
  ShieldAlert,
  Microscope,
  Sparkles,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * รายการคลินิกและบริการทางการแพทย์
 * สามารถแก้ไข/เพิ่มรายการบริการได้จากอาร์เรย์นี้
 */
const services = [
  // หมวดหมู่ชุดที่ 1
  {
    title: "ศูนย์ตรวจสุขภาพ",
    icon: Stethoscope,
  },
  {
    title: "คลินิกพิเศษนอกเวลา",
    icon: Clock,
  },
  {
    title: "จองห้องพิเศษ",
    icon: Bed,
  },
  {
    title: "โปรแกรมฉีดวัคซีน",
    icon: Syringe,
  },
  {
    title: "ลงทะเบียนผู้ป่วยใหม่",
    icon: UserPlus,
  },
  {
    title: "คลินิกทันตกรรม",
    icon: Smile,
  },
  {
    title: "คลินิกโรคหัวใจ",
    icon: HeartPulse,
  },
  {
    title: "คลินิกจักษุและสายตา",
    icon: Eye,
  },
  // หมวดหมู่ชุดที่ 2
  {
    title: "คลินิกกุมารเวช",
    icon: Baby,
  },
  {
    title: "คลินิกกระดูกและข้อ",
    icon: Bone,
  },
  {
    title: "คลินิกกายภาพบำบัด",
    icon: Activity,
  },
  {
    title: "ศูนย์ศัลยกรรมผ่าตัด",
    icon: Scissors,
  },
  {
    title: "ศูนย์อุบัติเหตุ-ฉุกเฉิน",
    icon: ShieldAlert,
  },
  {
    title: "ศูนย์วินิจฉัยและเอ็กซเรย์",
    icon: Microscope,
  },
  {
    title: "ศูนย์ผิวหนังและความงาม",
    icon: Sparkles,
  },
  {
    title: "ตรวจวิเคราะห์ห้องแล็บ",
    icon: FileText,
  },
];

/**
 * คอมโพเนนต์ MedicalServicesSection (บริการทางการแพทย์)
 * - แสดงปุ่มวงกลมสีส้มไอคอนบริการ
 * - สามารถเลื่อนสไลด์ทีละ 5 รายการ หรือกดดูทั้งหมดเพื่อขยายกริดได้
 */
export default function MedicalServicesSection() {
  const [servicePage, setServicePage] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);

  const itemsPerPage = 5; // แสดง 1 แถวละ 5 ไอเทม
  const totalServicePages = Math.ceil(services.length / itemsPerPage);

  const handleNextService = () => {
    setServicePage((prev) => (prev + 1) % totalServicePages);
  };

  const handlePrevService = () => {
    setServicePage((prev) => (prev - 1 + totalServicePages) % totalServicePages);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-[#fffdfa] border-t border-orange-50/50">
      {/* พื้นหลังรูปภาพเบลอโปร่งแสง */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
          alt="Hospital Corridor Background"
          fill
          className="object-cover opacity-[0.05] filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbf8f3]/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* หัวข้อส่วนบริการทางการแพทย์ */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#334155] tracking-tight">
            บริการทางการแพทย์
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-4 rounded-full shadow-xs"></div>
        </div>

        {/* โหมด Carousel สไลด์ / โหมดแสดงทั้งหมด */}
        {!showAllServices ? (
          <>
            <div className="relative flex items-center justify-between gap-2 sm:gap-4 px-1 md:px-6">
              {/* ปุ่มเลื่อนซ้าย */}
              <button
                onClick={handlePrevService}
                className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
                aria-label="Previous services page"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* คอนเทนเนอร์แสดงรายการบริการ (1 แถว 5 รายการ) */}
              <div className="w-full px-2 sm:px-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={servicePage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4 sm:gap-x-6 md:gap-x-8 place-items-start justify-items-center w-full py-2"
                  >
                    {services
                      .slice(
                        servicePage * itemsPerPage,
                        (servicePage + 1) * itemsPerPage
                      )
                      .map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                          <div
                            key={`${service.title}-${index}`}
                            className="flex flex-col items-center text-center group cursor-pointer w-full"
                          >
                            {/* ปุ่มวงกลมไอคอน */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] group-hover:from-[#f97316] group-hover:to-[#ea580c] group-hover:opacity-80 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 relative border border-white/10 shrink-0">
                              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white stroke-[1.5] relative z-10" />
                            </div>

                            {/* ชื่อนวัตกรรม/คลินิก - กำหนดความสูงและจัดชิดบนไม่ให้ดันไอคอน */}
                            <div className="mt-3 sm:mt-4 h-10 sm:h-12 flex items-start justify-center w-full">
                              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f97316] group-hover:opacity-80 transition-all duration-300 leading-snug tracking-tight max-w-[130px] block text-center">
                                {service.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ปุ่มเลื่อนขวา */}
              <button
                onClick={handleNextService}
                className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
                aria-label="Next services page"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* จุดบอกตำแหน่งของการสไลด์ (ต่อหน้า หน้าละ 5 รายการ) */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalServicePages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setServicePage(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    servicePage === idx
                      ? "w-8 bg-[#f97316]"
                      : "w-2.5 bg-orange-200 hover:bg-orange-300"
                  }`}
                  aria-label={`Go to services page ${idx + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          /* มุมมองแสดงคลินิกทั้งหมด (Expanded View) */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4 sm:gap-x-6 md:gap-x-8 place-items-start justify-items-center w-full px-2 sm:px-6 py-2"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group cursor-pointer w-full"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] group-hover:from-[#f97316] group-hover:to-[#ea580c] group-hover:opacity-80 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 relative border border-white/10 shrink-0">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white stroke-[1.5] relative z-10" />
                  </div>

                  <div className="mt-3 sm:mt-4 h-10 sm:h-12 flex items-start justify-center w-full">
                    <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f97316] group-hover:opacity-80 transition-all duration-300 leading-snug tracking-tight max-w-[130px] block text-center">
                      {service.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ปุ่มสลับแสดง/ซ่อน ดูทั้งหมด */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="px-10 py-3 sm:px-12 sm:py-3.5 bg-white hover:bg-[#f97316] text-[#f97316] hover:text-white border-2 border-[#f97316] font-medium text-sm sm:text-base rounded-full transition-all duration-300 shadow-xs hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:scale-98"
          >
            {showAllServices ? "ย่อลง" : "ดูทั้งหมด"}
          </button>
        </div>
      </div>
    </section>
  );
}
