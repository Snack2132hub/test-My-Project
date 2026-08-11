"use client";

import Link from "next/link";
import { Bed, Stethoscope, UserCheck } from "lucide-react";

/**
 * Custom House with Cross Icon matching the hospital design
 */
function HospitalHouseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-10 h-10 sm:w-12 sm:h-12 text-white"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10Z" />
      <path d="M12 10V16" />
      <path d="M9 13H15" />
    </svg>
  );
}

/**
 * Custom Person with Checkmark Icon matching the hospital design
 */
function UserCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-10 h-10 sm:w-12 sm:h-12 text-white"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <circle cx="17.5" cy="11.5" r="3.5" fill="#f97316" stroke="white" strokeWidth="1.5" />
      <path d="M16 11.5l1 1 2-2" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

const specializedCenters = [
  {
    title: "ศูนย์สุขภาพสตรี",
    iconType: "house",
    href: "/patient-services?dept=women",
  },
  {
    title: "ศูนย์กุมารเวชกรรม",
    iconType: "bed",
    href: "/patient-services?dept=pediatrics",
  },
  {
    title: "ศูนย์อายุรกรรม",
    iconType: "bed",
    href: "/patient-services?dept=medicine",
  },
  {
    title: "ศูนย์ศัลยกรรม",
    iconType: "user",
    href: "/patient-services?dept=surgery",
  },
  {
    title: "ศูนย์กระดูกและข้อ",
    iconType: "user",
    href: "/patient-services?dept=ortho",
  },
  {
    title: "อุบัติเหตุฉุกเฉิน",
    iconType: "stethoscope",
    href: "/patient-services?dept=emergency",
  },
  {
    title: "หู คอ จมูก",
    iconType: "house",
    href: "/patient-services?dept=ent",
  },
  {
    title: "จักษุ",
    iconType: "stethoscope",
    href: "/patient-services?dept=eye",
  },
  {
    title: "นวดแผนไทย",
    iconType: "stethoscope",
    href: "/patient-services?dept=thaimassage",
  },
  {
    title: "กายภาพบำบัด",
    iconType: "house",
    href: "/patient-services?dept=physio",
  },
  {
    title: "เวชศาสตร์ฟื้นฟู",
    iconType: "stethoscope",
    href: "/patient-services?dept=rehab",
  },
];

export default function SpecializedCentersPage() {
  const renderIcon = (type: string) => {
    switch (type) {
      case "house":
        return <HospitalHouseIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />;
      case "bed":
        return <Bed className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white stroke-[1.5]" />;
      case "user":
        return <UserCheckIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />;
      case "stethoscope":
      default:
        return <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white stroke-[1.5]" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#fffaf3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-20">
      {/* 1. Breadcrumb Navigation */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            หน้าแรก
          </Link>
          <span>/</span>
          <Link href="/medical-services" className="hover:text-orange-500 transition-colors">
            บริการทางการแพทย์
          </Link>
          <span>/</span>
          <span className="text-orange-600 font-medium">ศูนย์การรักษาเฉพาะทาง</span>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            ศูนย์การรักษาเฉพาะทาง
          </h1>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mx-auto mt-3"></div>
        </div>

        {/* Grid layout for Specialized Centers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8 md:gap-x-12 place-items-center">
          {specializedCenters.map((center, index) => (
            <Link
              key={index}
              href={center.href}
              className="group flex flex-col items-center text-center cursor-pointer w-full"
            >
              {/* Circular Icon Card */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] group-hover:from-[#f97316] group-hover:to-[#ea580c] flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border-2 border-white/20 shrink-0">
                {renderIcon(center.iconType)}
              </div>

              {/* Service Title */}
              <div className="mt-3 sm:mt-4 flex items-start justify-center w-full px-1">
                <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#f97316] transition-colors leading-snug tracking-tight text-center">
                  {center.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
