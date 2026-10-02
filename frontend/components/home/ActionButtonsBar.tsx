"use client";

import Link from "next/link";
import { Calendar, Stethoscope, Heart } from "lucide-react";

/**
 * คอมโพเนนต์ ActionButtonsBar (แถบปุ่มทางลัดด่วน)
 * - นัดหมายแพทย์ -> เลื่อนไปหาหน้านัดหมายแพทย์ออนไลน์ (#online-appointment)
 * - ศูนย์รักษาเฉพาะทาง -> หน้าศูนย์การรักษาเฉพาะทาง (/specialized-centers)
 * - โปรโมชั่นและแพ็คเกจ -> หน้าโปรโมชั่นและแพ็คเกจ (/health-checkup)
 */
export default function ActionButtonsBar() {
  const handleScrollToAppointment = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      const isHome = window.location.pathname === "/" || window.location.pathname === "";
      if (isHome) {
        e.preventDefault();
        const element = document.getElementById("online-appointment");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "#online-appointment");
        }
      }
    }
  };

  return (
    <section className="w-full relative z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-lg rounded-b-2xl overflow-hidden">
        {/* ปุ่ม 1: นัดหมายแพทย์ -> เลื่อนไปหาหน้านัดหมายแพทย์ออนไลน์ */}
        <Link
          href="/#online-appointment"
          onClick={handleScrollToAppointment}
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#1877F2] hover:bg-[#1565c0] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg cursor-pointer text-center"
        >
          <Calendar className="w-6 h-6 md:w-7 md:h-7" />
          นัดหมายแพทย์
        </Link>

        {/* ปุ่ม 2: ศูนย์การรักษาเฉพาะทาง -> หน้าศูนย์การรักษาเฉพาะทาง */}
        <Link
          href="/specialized-centers"
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg border-t border-white/20 md:border-t-0 md:border-l cursor-pointer text-center"
        >
          <Stethoscope className="w-6 h-6 md:w-7 md:h-7" />
          ศูนย์การรักษาเฉพาะทาง
        </Link>

        {/* ปุ่ม 3: โปรโมชั่นและแพ็คเกจ -> หน้าโปรโมชั่นและแพ็คเกจ */}
        <Link
          href="/health-checkup"
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg border-t border-white/20 md:border-t-0 md:border-l cursor-pointer text-center"
        >
          <Heart className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" />
          โปรโมชั่นและแพ็คเกจ
        </Link>
      </div>
    </section>
  );
}

