"use client";

import Image from "next/image";
import { Megaphone } from "lucide-react";

/**
 * คอมโพเนนต์ AnnouncementsSection (ส่วนข่าวประกาศสำคัญ)
 * แสดงการ์ดโปสเตอร์ข่าวประกาศเด่น 3 ใบ
 */
export default function AnnouncementsSection() {
  return (
    <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 w-full flex-1">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อส่วนประกาศ */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-gray-700" fill="currentColor" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">ประกาศ !!!</h2>
        </div>

        {/* การ์ดประกาศ 3 ใบ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* การ์ดประกาศที่ 1 */}
          <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
            <Image
              src="/img/indexnews/test01.jpg"
              alt="เปลี่ยนแปลงเวลาให้บริการ 1"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* การ์ดประกาศที่ 2 */}
          <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
            <Image
              src="/img/indexnews/test01.jpg"
              alt="เปลี่ยนแปลงเวลาให้บริการ 2"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* การ์ดประกาศที่ 3 */}
          <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
            <Image
              src="/img/indexnews/test01.jpg"
              alt="เปลี่ยนแปลงเวลาให้บริการ 3"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* จุดนำทางสไลด์ (Carousel Dots Indicator) */}
        <div className="flex justify-center gap-3 mt-12">
          <div className="w-3.5 h-3.5 rounded-full bg-[#f97316] cursor-pointer shadow-sm"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
        </div>
      </div>
    </section>
  );
}
