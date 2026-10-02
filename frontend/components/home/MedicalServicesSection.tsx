"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { motion } from "motion/react";

/**
 * รายการคลินิกและบริการทางการแพทย์
 */
const services = [
  { title: "ศูนย์ตรวจสุขภาพ", icon: Stethoscope, href: "/patient-services?dept=checkup" },
  { title: "คลินิกพิเศษนอกเวลา", icon: Clock, href: "/after-hours-clinic" },
  { title: "จองห้องพิเศษ", icon: Bed, href: "/patient-services?dept=specialroom" },
  { title: "โปรแกรมฉีดวัคซีน", icon: Syringe, href: "/patient-services?dept=vaccine" },
  { title: "ลงทะเบียนผู้ป่วยใหม่", icon: UserPlus, href: "/patient-services?dept=register" },
  { title: "คลินิกทันตกรรม", icon: Smile, href: "/patient-services?dept=dental" },
  { title: "คลินิกโรคหัวใจ", icon: HeartPulse, href: "/patient-services?dept=cardiology" },
  { title: "คลินิกจักษุและสายตา", icon: Eye, href: "/patient-services?dept=eye" },
  { title: "คลินิกกุมารเวช", icon: Baby, href: "/patient-services?dept=pediatrics" },
  { title: "คลินิกกระดูกและข้อ", icon: Bone, href: "/patient-services?dept=ortho" },
  { title: "คลินิกกายภาพบำบัด", icon: Activity, href: "/patient-services?dept=physio" },
  { title: "ศูนย์ศัลยกรรมผ่าตัด", icon: Scissors, href: "/patient-services?dept=surgery" },
  { title: "ศูนย์อุบัติเหตุ-ฉุกเฉิน", icon: ShieldAlert, href: "/patient-services?dept=emergency" },
  { title: "ศูนย์วินิจฉัยและเอ็กซเรย์", icon: Microscope, href: "/patient-services?dept=imaging" },
  { title: "ศูนย์ผิวหนังและความงาม", icon: Sparkles, href: "/patient-services?dept=derma" },
  { title: "ตรวจวิเคราะห์ห้องแล็บ", icon: FileText, href: "/patient-services?dept=lab" },
];

/**
 * คอมโพเนนต์ MedicalServicesSection (บริการทางการแพทย์)
 * - สไลด์เลื่อนซ้ายขวาได้ด้วยการใช้นิ้วลาก/เมาส์ลาก (Mouse/Touch Drag)
 * - มีปุ่มลูกศรควบคุมและจุด Indicators
 * - สามารถกด "ดูทั้งหมด" เพื่อแสดงแบบกริดได้
 */
export default function MedicalServicesSection() {
  const [activeDot, setActiveDot] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // สำหรับการลากด้วยเมาส์ (Mouse Drag)
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(x - startXRef.current) > 5) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => { isDraggingRef.current = false; };
  const handleMouseLeave = () => { isDraggingRef.current = false; };

  // เลื่อนด้วยปุ่มลูกศร
  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    const targetScroll =
      direction === "left"
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  // คำนวณหาตำแหน่งของ Dot Indicator
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    setActiveDot(Math.min(Math.round(progress * 3), 3));
  };

  const scrollToDot = (dotIndex: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    scrollRef.current.scrollTo({ left: (dotIndex / 3) * maxScroll, behavior: "smooth" });
  };

  return (
    <section className="relative pt-16 sm:pt-20 pb-[56px] px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-[#fffdfa] border-t border-orange-50/50">
      {/* พื้นหลังรูปภาพ FrameBg02 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/img/BG/FrameBg02.png"
          alt="Medical Services Background"
          fill
          priority
          className="object-cover object-center"
        />
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
            <div className="relative flex items-center justify-between gap-2 sm:gap-4 px-1 md:px-6 group/carousel">
              {/* ปุ่มเลื่อนซ้าย */}
              <button
                onClick={() => scrollByAmount("left")}
                className="hidden md:flex p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-20"
                aria-label="Previous services"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </button>

              {/* คอนเทนเนอร์แสดงรายการบริการ สามารถลากสไลด์ซ้าย-ขวาได้ */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto py-4 px-2 w-full snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Link
                      key={`${service.title}-${index}`}
                      href={service.href || "/medical-services"}
                      onClick={(e) => {
                        if (hasDraggedRef.current) e.preventDefault();
                      }}
                      className="snap-start flex-none w-[130px] sm:w-[150px] md:w-[170px] flex flex-col items-center text-center group cursor-pointer"
                    >
                      {/* ปุ่มวงกลมไอคอน */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-[#ffa154] to-[#f97316] group-hover:from-[#f97316] group-hover:to-[#ea580c] group-hover:opacity-80 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 relative border border-white/10 shrink-0 pointer-events-none">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" strokeWidth={1.5} />
                      </div>

                      {/* ชื่อนวัตกรรม/คลินิก */}
                      <div className="mt-3 sm:mt-4 h-10 sm:h-12 flex items-start justify-center w-full pointer-events-none">
                        <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f97316] transition-all duration-300 leading-snug tracking-tight block text-center">
                          {service.title}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* ปุ่มเลื่อนขวา */}
              <button
                onClick={() => scrollByAmount("right")}
                className="hidden md:flex p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-20"
                aria-label="Next services"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* จุดบอกตำแหน่งของการสไลด์ */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {[0, 1, 2, 3].map((dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToDot(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeDot === dotIdx
                      ? "w-8 bg-[#f97316]"
                      : "w-2.5 bg-orange-200 hover:bg-orange-300"
                  }`}
                  aria-label={`Go to services slide section ${dotIdx + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          /* มุมมองแสดงคลินิกทั้งหมด (Expanded Grid View) */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4 sm:gap-x-6 md:gap-x-8 place-items-start justify-items-center w-full px-2 sm:px-6 py-2"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={index}
                  href={service.href || "/medical-services"}
                  className="flex flex-col items-center text-center group cursor-pointer w-full"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-[#ffa154] to-[#f97316] group-hover:from-[#f97316] group-hover:to-[#ea580c] group-hover:opacity-80 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300 relative border border-white/10 shrink-0">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" strokeWidth={1.5} />
                  </div>

                  <div className="mt-3 sm:mt-4 h-10 sm:h-12 flex items-start justify-center w-full">
                    <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f97316] transition-all duration-300 leading-snug tracking-tight max-w-[130px] block text-center">
                      {service.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}

        {/* ปุ่มไปหน้าดูบริการทั้งหมด */}
        <div className="flex justify-center mt-[62px]">
          <Link
            href="/medical-services"
            className="inline-flex items-center justify-center w-[clamp(120px,12vw,200px)] min-w-[120px] max-w-[200px] px-4 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-[#f97316] text-[#f97316] hover:text-white border-2 border-[#f97316] font-medium text-sm sm:text-base rounded-full transition-all duration-300 shadow-xs hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:scale-98 text-center"
          >
            ดูทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}
