"use client";

import Image from "next/image";
import { HeartPulse, Syringe } from "lucide-react";

/**
 * คอมโพเนนต์ HealthCheckupSection (ตรวจสุขภาพ และ วัคซีน)
 * แสดงการ์ดแพ็คเกจตรวจสุขภาพ และ แพ็คเกจฉีดวัคซีน
 */
export default function HealthCheckupSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อส่วนตรวจสุขภาพ และ วัคซีน */}
        <div className="flex flex-col items-center mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            ตรวจสุขภาพ และ วัคซีน
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
        </div>

        {/* การ์ดแพ็คเกจ 2 รายการ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* การ์ดที่ 1: โปรแกรมตรวจสุขภาพ */}
          <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer aspect-[16/10] bg-white border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
              alt="โปรแกรมตรวจสุขภาพ"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* โลโก้รพ. มุมขวาบนของการ์ด */}
            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center p-1 z-10 border border-gray-100">
              <Image
                src="/img/indexbanner/herobannertest01.png"
                alt="Hospital Logo"
                width={28}
                height={28}
                className="object-contain rounded-full"
              />
            </div>

            {/* แถบริบบิ้นสีส้มด้านล่างการ์ด */}
            <div className="absolute bottom-4 left-0 w-[85%] sm:w-[80%] bg-gradient-to-r from-[#ffa154] via-[#f97316] to-[#f97316] text-white py-3 px-4 sm:px-5 rounded-r-2xl shadow-lg flex items-center justify-between z-10">
              <div className="pr-2">
                <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                  โปรแกรมตรวจสุขภาพ
                </h3>
                <p className="text-xs text-orange-100 font-light mt-0.5 truncate">
                  แพ็คเกจเกี่ยวกับโปรแกรมตรวจสุขภาพ
                </p>
              </div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          {/* การ์ดที่ 2: โปรแกรมฉีดวัคซีน */}
          <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer aspect-[16/10] bg-white border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
              alt="โปรแกรมฉีดวัคซีน"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* โลโก้รพ. มุมขวาบนของการ์ด */}
            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center p-1 z-10 border border-gray-100">
              <Image
                src="/img/indexbanner/herobannertest01.png"
                alt="Hospital Logo"
                width={28}
                height={28}
                className="object-contain rounded-full"
              />
            </div>

            {/* แถบริบบิ้นสีส้มด้านล่างการ์ด */}
            <div className="absolute bottom-4 left-0 w-[85%] sm:w-[80%] bg-gradient-to-r from-[#ffa154] via-[#f97316] to-[#f97316] text-white py-3 px-4 sm:px-5 rounded-r-2xl shadow-lg flex items-center justify-between z-10">
              <div className="pr-2">
                <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                  โปรแกรมฉีดวัคซีน
                </h3>
                <p className="text-xs text-orange-100 font-light mt-0.5 truncate">
                  แพ็คเกจเกี่ยวกับโปรแกรมฉีดวัคซีน
                </p>
              </div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center shrink-0">
                <Syringe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
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
