"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Target, Compass } from "lucide-react";

export default function VisionMissionPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 pb-20">
      {/* 1. Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            หน้าแรก
          </Link>
          <span>/</span>
          <Link href="/about/history" className="hover:text-orange-500 transition-colors">
            เกี่ยวกับเรา
          </Link>
          <span>/</span>
          <span className="text-orange-600 font-medium">วิสัยทัศน์/พันธกิจ</span>
        </div>
      </div>

      {/* 2. Top Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] overflow-hidden bg-gray-100">
        <Image
          src="/img/pnnh_history_hero 3.png"
          alt="อาคารโรงพยาบาลปากช่องนานา"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 3. Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12 sm:space-y-16">
        {/* Title & Subtitle */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f97316] tracking-tight">
            วิสัยทัศน์ พันธกิจ
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gray-700">
            โรงพยาบาลปากช่องนานา
          </p>
        </div>

        {/* ค่านิยมหลัก */}
        <div className="text-center space-y-3 pt-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
            ค่านิยมหลัก
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#f97316]">
            &quot; ร่วมใจ ใฝ่งาน บริการดุจญาติมิตร &quot;
          </p>
        </div>

        {/* 3 Columns Section: เข็มมุ่ง, วิสัยทัศน์, เป้าหมาย */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 text-center items-start pt-4">
          {/* Column 1: เข็มมุ่ง */}
          <div className="flex flex-col items-center space-y-3 px-2">
            <div className="w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-[#f97316]">
              <Compass className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              เข็มมุ่ง
            </h3>
            <ul className="text-sm sm:text-base text-gray-600 space-y-1 text-center font-normal">
              <li>• 3P safety</li>
              <li>• ความมั่นคงทางการเงินการคลัง</li>
            </ul>
          </div>

          {/* Column 2: วิสัยทัศน์ */}
          <div className="flex flex-col items-center space-y-3 px-2">
            <div className="w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-[#f97316]">
              <Eye className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              วิสัยทัศน์
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs font-normal">
              &quot; ศูนย์การแพทย์และการสาธารณสุขชั้นเลิศ ในเขตการท่องเที่ยวระดับประเทศ &quot;
            </p>
          </div>

          {/* Column 3: เป้าหมาย */}
          <div className="flex flex-col items-center space-y-3 px-2">
            <div className="w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-[#f97316]">
              <Target className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              เป้าหมาย
            </h3>
            <ul className="text-sm sm:text-base text-gray-600 space-y-1 text-center font-normal">
              <li>• ประชาชนสุขภาพดี</li>
              <li>• เจ้าหน้าที่มีความสุข</li>
              <li>• ระบบสุขภาพยั่งยืน</li>
            </ul>
          </div>
        </div>

        {/* พันธกิจ (Mission) Section */}
        <div className="text-center pt-6 space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            พันธกิจ
          </h2>
          <ol className="text-sm sm:text-base md:text-lg text-gray-600 space-y-2 text-center font-normal leading-relaxed">
            <li>1. พัฒนาระบบการแพทย์เฉพาะทางขั้นสูงทุกสาขา</li>
            <li>2. สถาบันร่วมผลิตบุคลากรด้านการแพทย์และการสาธารณสุข</li>
            <li>3. พัฒนาระบบบริการสุขภาพปฐมภูมิแบบไร้รอยต่อ</li>
            <li>4. พัฒนาคุณภาพระบบบริหารจัดการโรงพยาบาลและเครือข่ายบริการสุขภาพ</li>
            <li>5. พัฒนาคุณภาพบริการสาธารณสุขในเขตการท่องเที่ยวเชิงนิเวศ</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

