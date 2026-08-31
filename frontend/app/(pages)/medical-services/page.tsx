"use client";

import Link from "next/link";
import {
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

const services = [
  {
    title: "ศูนย์ตรวจสุขภาพ",
    icon: Stethoscope,
    href: "/patient-services?dept=checkup",
  },
  {
    title: "คลินิกพิเศษนอกเวลา",
    icon: Clock,
    href: "/patient-services?dept=afterhours",
  },
  {
    title: "จองห้องพิเศษ",
    icon: Bed,
    href: "/patient-services?dept=specialroom",
  },
  {
    title: "โปรแกรมฉีดวัคซีน",
    icon: Syringe,
    href: "/patient-services?dept=vaccine",
  },
  {
    title: "ลงทะเบียนผู้ป่วยใหม่",
    icon: UserPlus,
    href: "/patient-services?dept=register",
  },
  {
    title: "คลินิกทันตกรรม",
    icon: Smile,
    href: "/patient-services?dept=dental",
  },
  {
    title: "คลินิกโรคหัวใจ",
    icon: HeartPulse,
    href: "/patient-services?dept=cardiology",
  },
  {
    title: "คลินิกจักษุและสายตา",
    icon: Eye,
    href: "/patient-services?dept=eye",
  },
  {
    title: "คลินิกกุมารเวช",
    icon: Baby,
    href: "/patient-services?dept=pediatrics",
  },
  {
    title: "คลินิกกระดูกและข้อ",
    icon: Bone,
    href: "/patient-services?dept=ortho",
  },
  {
    title: "คลินิกกายภาพบำบัด",
    icon: Activity,
    href: "/patient-services?dept=physio",
  },
  {
    title: "ศูนย์ศัลยกรรมผ่าตัด",
    icon: Scissors,
    href: "/patient-services?dept=surgery",
  },
  {
    title: "ศูนย์อุบัติเหตุ-ฉุกเฉิน",
    icon: ShieldAlert,
    href: "/patient-services?dept=emergency",
  },
  {
    title: "ศูนย์วินิจฉัยและเอ็กซเรย์",
    icon: Microscope,
    href: "/patient-services?dept=imaging",
  },
  {
    title: "ศูนย์ผิวหนังและความงาม",
    icon: Sparkles,
    href: "/patient-services?dept=derma",
  },
  {
    title: "ตรวจวิเคราะห์ห้องแล็บ",
    icon: FileText,
    href: "/patient-services?dept=lab",
  },
];

export default function MedicalServicesPage() {
  return (
    <div className="bg-gradient-to-b from-[#fffaf3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-20">
      {/* 1. Breadcrumb navigation */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            หน้าแรก
          </Link>
          <span>/</span>
          <span className="text-gray-600">บริการทางการแพทย์</span>
          <span>/</span>
          <span className="text-orange-600 font-medium">บริการทางการแพทย์ต่างๆ</span>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            บริการทางการแพทย์
          </h1>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mx-auto mt-3"></div>
        </div>

        {/* Grid layout for services */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8 md:gap-x-12 place-items-center">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="group flex flex-col items-center text-center cursor-pointer w-full"
              >
                {/* Circular Icon Card */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] group-hover:from-[#f97316] group-hover:to-[#ea580c] flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border-2 border-white/20 shrink-0">
                  <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white stroke-[1.5] relative z-10" />
                </div>

                {/* Service Title */}
                <div className="mt-3 sm:mt-4 flex items-start justify-center w-full px-1">
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#f97316] transition-colors leading-snug tracking-tight text-center">
                    {service.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
