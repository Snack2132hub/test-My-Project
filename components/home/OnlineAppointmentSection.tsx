"use client";

import Image from "next/image";

/**
 * คอมโพเนนต์ OnlineAppointmentSection (ระบบนัดหมายออนไลน์)
 * - คลินิก ในเวลาราชการ
 * - คลินิกเฉพาะทาง นอกเวลาราชการ
 */
export default function OnlineAppointmentSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-[#ffedd5]/80 via-[#fed7aa]/40 to-[#ffedd5]/60 border-t border-orange-100">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อส่วนระบบนัดหมายออนไลน์ */}
        <div className="flex flex-col items-center mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] tracking-tight">
            ระบบนัดหมายออนไลน์
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
        </div>

        {/* การ์ดระบบนัดหมาย 2 รายการ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* การ์ดที่ 1: คลินิก ในเวลาราชการ */}
          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-white border border-orange-200/60 aspect-[16/10]">
              {/* 📌 [จุดเปลี่ยนรูปโปสเตอร์นัดหมายในเวลาราชการ] 
                  สามารถเปลี่ยน src เป็นรูปภาพจากโฟลเดอร์ในโปรเจกต์ เช่น "/img/appointment/in_time.png" 
              */}
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                alt="คลินิก ในเวลาราชการ"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
              คลินิก ในเวลาราชการ
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 font-light">
              บริการนัดหมายออนไลน์ ในเวลาราชการ
            </p>
          </div>

          {/* การ์ดที่ 2: คลินิกเฉพาะทาง นอกเวลาราชการ */}
          <div className="flex flex-col items-center text-center group cursor-pointer">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-white border border-orange-200/60 aspect-[16/10]">
              {/* 📌 [จุดเปลี่ยนรูปโปสเตอร์นัดหมายนอกเวลาราชการ] 
                  สามารถเปลี่ยน src เป็นรูปภาพจากโฟลเดอร์ในโปรเจกต์ เช่น "/img/appointment/out_time.png" 
              */}
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                alt="คลินิกเฉพาะทาง นอกเวลาราชการ"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
              คลินิกเฉพาะทาง นอกเวลาราชการ
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 font-light">
              บริการนัดหมายออนไลน์ นอกเวลาราชการ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
