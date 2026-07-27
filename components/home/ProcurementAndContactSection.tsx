"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Play,
  Phone,
  MapPin,
  Printer,
  Mail,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ข้อมูลข่าวจัดซื้อจัดจ้าง และ ข่าวสมัครงาน (3 หน้า หน้าละ 6 รายการ)
 */
const procurementData = {
  procurement: [
    // หน้า 1
    [
      { id: 1, title: "ร่างประกาศ ประกวดราคาจัดซื้อน้ำยาตรวจวิเคราะห์ทางห้องปฏิบัติการทางการแพทย์ พร้อมเครื่องตรวจวิเคราะห์", date: "24 กรกฎาคม 2569" },
      { id: 2, title: "ยกเลิกประกาศ ประกวดราคาการจัดซื้อก๊าซออกซิเจนเหลวทางการแพทย์ จำนวน ๒๑๒,๒๒๐ ลูกบาศก์เมตร ด้วยวิธีประกวดราคา...", date: "24 มิถุนายน 2569" },
      { id: 3, title: "ประกาศผู้ชนะการเสนอราคา จัดซื้อวัสดุคอมพิวเตอร์และอุปกรณ์เครือข่ายสำหรับระบบสารสนเทศโรงพยาบาล", date: "23 มิถุนายน 2569" },
      { id: 4, title: "ประกวดราคาซื้อเครื่องติดตามการทำงานของหัวใจและสัญญาณชีพ ระดับกลาง จำนวน ๕ เครื่อง ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์", date: "20 มิถุนายน 2569" },
      { id: 5, title: "ประกาศจัดซื้อจัดจ้างเวชภัณฑ์ยาและวัสดุการแพทย์ ประจำไตรมาสที่ ๔/๒๕๖๙ โรงพยาบาลปากช่องนานา", date: "18 มิถุนายน 2569" },
      { id: 6, title: "เผยแพร่แผนการจัดซื้อจัดจ้าง เครื่องเอ็กซเรย์เคลื่อนที่ขนาดไม่น้อยกว่า ๓๐๐ mA ประจำปีงบประมาณ ๒๕๖๙", date: "15 มิถุนายน 2569" },
    ],
    // หน้า 2
    [
      { id: 7, title: "ประกาศผู้ชนะการเสนอราคา ซื้อชุดเครื่องมือผ่าตัดผ่านกล้องข้อเข่าและข้อไหล่ ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์", date: "12 มิถุนายน 2569" },
      { id: 8, title: "ประกวดราคาจ้างเหมาบริการทำความสะอาดอาคารผู้ป่วยนอก อาคารอุบัติเหตุ และอาคารอำนวยการ", date: "10 มิถุนายน 2569" },
      { id: 9, title: "ประกาศประกวดราคาซื้อครุภัณฑ์ยานพาหนะและขนส่ง รถพยาบาลฉุกเฉินระดับสูงพร้อมอุปกรณ์ประจำรถ", date: "08 มิถุนายน 2569" },
      { id: 10, title: "ยกเลิกประกาศ ประกวดราคาจัดซื้อวัสดุวิทยาศาสตร์การแพทย์ สำหรับห้องปฏิบัติการชันสูตรโรค", date: "05 มิถุนายน 2569" },
      { id: 11, title: "ประกาศผลการคัดเลือกผู้เสนอราคา งานจ้างปรับปรุงห้องผ่าตัดแรงดันลบ (Negative Pressure Room)", date: "02 มิถุนายน 2569" },
      { id: 12, title: "ประกาศจัดซื้อเครื่องช่วยหายใจชนิดควบคุมด้วยปริมาตรและแรงดัน จำนวน ๓ เครื่อง", date: "30 พฤษภาคม 2569" },
    ],
    // หน้า 3
    [
      { id: 13, title: "เผยแพร่ร่างประกาศประกวดราคาซื้อระบบจัดเก็บและรับส่งข้อมูลภาพทางการแพทย์ (PACS System)", date: "28 พฤษภาคม 2569" },
      { id: 14, title: "ประกาศผู้ชนะการเสนอราคา จัดซื้อชุดตรวจภูมิคุ้มกันวิทยาและเคมีคลินิกอัตโนมัติ", date: "25 พฤษภาคม 2569" },
      { id: 15, title: "ประกาศประกวดราคาซื้อวัสดุทันตกรรมและอุปกรณ์จัดฟัน ประจำปีงบประมาณ ๒๕๖๙", date: "22 พฤษภาคม 2569" },
      { id: 16, title: "ประกาศจ้างเหมาบำรุงรักษาและซ่อมแซมระบบบำบัดน้ำเสียโรงพยาบาลปากช่องนานา", date: "20 พฤษภาคม 2569" },
      { id: 17, title: "ประกาศผู้ชนะการเสนอราคา ซื้อวัสดุสำนักงานและงานพิมพ์เอกสารทางการแพทย์", date: "18 พฤษภาคม 2569" },
      { id: 18, title: "เผยแพร่แผนการจัดหาครุภัณฑ์การแพทย์และวิศวกรรมการแพทย์ ปีงบประมาณ ๒๕๗0", date: "15 พฤษภาคม 2569" },
    ],
  ],
  jobs: [
    // หน้า 1
    [
      { id: 1, title: "ประกาศรับสมัครบุคคลเพื่อเลือกสรรเป็นพนักงานกระทรวงสาธารณสุข ตำแหน่ง พยาบาลวิชาชีพ จำนวน ๑๕ อัตรา", date: "20 กรกฎาคม 2569" },
      { id: 2, title: "ประกาศรับสมัครคัดเลือกบุคคลเข้าปฏิบัติงาน ตำแหน่ง นักรังสีการแพทย์ ปฏิบัติงานกลุ่มงานรังสีวิทยา จำนวน ๓ อัตรา", date: "18 กรกฎาคม 2569" },
      { id: 3, title: "ประกาศรับสมัครลูกจ้างชั่วคราวเงินบำรุง ตำแหน่ง เภสัชกร กลุ่มงานเภสัชกรรม จำนวน ๒ อัตรา", date: "15 กรกฎาคม 2569" },
      { id: 4, title: "ประกาศรายชื่อผู้มีสิทธิ์เข้ารับการประเมินความรู้ความสามารถ ตำแหน่ง นักจัดการงานทั่วไป", date: "12 กรกฎาคม 2569" },
      { id: 5, title: "ประกาศผลการคัดเลือกบุคคลเพื่อบรรจุเป็นพนักงานพกส. ตำแหน่ง นักเทคนิคการแพทย์", date: "10 กรกฎาคม 2569" },
      { id: 6, title: "ประกาศรับสมัครลูกจ้างชั่วคราว ตำแหน่ง พนักงานช่วยเหลือคนไข้ (NA) จำนวน ๑๐ อัตรา", date: "08 กรกฎาคม 2569" },
    ],
    // หน้า 2
    [
      { id: 7, title: "ประกาศรับสมัครคัดเลือกบุคคลเพื่อบรรจุเป็นลูกจ้างชั่วคราว ตำแหน่ง เจ้าพนักงานการเงินและบัญชี", date: "05 กรกฎาคม 2569" },
      { id: 8, title: "ประกาศรายชื่อผู้ผ่านการคัดเลือกเป็นพนักงานกระทรวงสาธารณสุข ตำแหน่ง นักกายภาพบำบัด", date: "02 กรกฎาคม 2569" },
      { id: 9, title: "ประกาศรับสมัครบุคคลเพื่อเลือกสรรเป็นลูกจ้าง ตำแหน่ง พนักงานขับรถยนต์ งานอุบัติเหตุ-ฉุกเฉิน ๒ อัตรา", date: "28 มิถุนายน 2569" },
      { id: 10, title: "ประกาศขึ้นบัญชีผู้ผ่านการคัดเลือก ตำแหน่ง นักวิชาการสาธารณสุขปฏิบัติการ", date: "25 มิถุนายน 2569" },
      { id: 11, title: "ประกาศรับสมัครลูกจ้างชั่วคราวเงินบำรุง ตำแหน่ง พนักงานประกอบอาหาร กลุ่มงานโภชนวิทยา", date: "22 มิถุนายน 2569" },
      { id: 12, title: "ประกาศรายชื่อผู้มีสิทธิ์สอบสัมภาษณ์ ตำแหน่ง เจ้าพนักงานพัสดุ กลุ่มงานพัสดุ", date: "20 มิถุนายน 2569" },
    ],
    // หน้า 3
    [
      { id: 13, title: "ประกาศรับสมัครบุคคลเข้าทำงาน ตำแหน่ง นักวิชาการคอมพิวเตอร์ ศูนย์สารสนเทศ จำนวน ๑ อัตรา", date: "18 มิถุนายน 2569" },
      { id: 14, title: "ประกาศผลการสอบคัดเลือกพนักงานตำแหน่ง เจ้าพนักงานเวชสถิติ งานเวชสถิติและคอมพิวเตอร์", date: "15 มิถุนายน 2569" },
      { id: 15, title: "ประกาศรับสมัครคัดเลือกบุคคลเป็นลูกจ้างชั่วคราว ตำแหน่ง พนักงานซ่อมบำรุง งานซ่อมบำรุงและวิศวกรรม", date: "12 มิถุนายน 2569" },
      { id: 16, title: "ประกาศรายชื่อผู้ผ่านการเลือกสรรเป็นพนักงานกระทรวงสาธารณสุข ตำแหน่ง เจ้าพนักงานธุรการ", date: "10 มิถุนายน 2569" },
      { id: 17, title: "ประกาศรับสมัครสอบแข่งขันเพื่อบรรจุบุคคล ตำแหน่ง นักโภชนาการ ปฏิบัติงานกลุ่มงานโภชนาการ", date: "08 มิถุนายน 2569" },
      { id: 18, title: "ประกาศขึ้นบัญชีและยกเลิกบัญชีผู้ผ่านการเลือกสรร ตำแหน่ง ผู้ช่วยพยาบาล", date: "05 มิถุนายน 2569" },
    ],
  ],
};

/**
 * คอมโพเนนต์ ProcurementAndContactSection
 * ประกอบด้วย:
 * 1. ข่าวจัดซื้อจัดจ้าง & ข่าวสมัครงาน (ตารางรายการพร้อมแท็บและหน้าสลับ)
 * 2. สื่อวิดีโอ (เล่นวิดีโอ YouTube)
 * 3. ติดต่อเรา (ข้อมูลที่อยู่ เบอร์โทร โซเชียลมีเดีย และ แผนที่ Google Maps)
 */
export default function ProcurementAndContactSection() {
  const [procurementTab, setProcurementTab] = useState<"procurement" | "jobs">("procurement");
  const [procurementPage, setProcurementPage] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(254, 243, 199, 0.85), rgba(253, 230, 138, 0.70), rgba(245, 158, 11, 0.85)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600')",
      }}
    >
      {/* โอเวอร์เลย์สีอุ่นนุ่มนวล */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-amber-100/40 to-orange-200/60 backdrop-blur-[1px]" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* ========================================== */}
        {/* 1. การ์ดข่าวจัดซื้อจัดจ้าง & ข่าวสมัครงาน */}
        {/* ========================================== */}
        <div className="max-w-5xl mx-auto">
          {/* แท็บหัวข้อส่วนบน (Tabs) & ปุ่มดูทั้งหมด */}
          <div className="flex items-end justify-between px-2 sm:px-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setProcurementTab("procurement");
                  setProcurementPage(0);
                }}
                className={`px-5 py-2.5 sm:px-7 sm:py-3 rounded-t-2xl font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  procurementTab === "procurement"
                    ? "bg-[#f97316] text-white shadow-md shadow-orange-300/50 -mb-0.5 z-10"
                    : "bg-white/80 hover:bg-white text-gray-700 hover:text-[#f97316] border-t border-x border-orange-100"
                }`}
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                ข่าวจัดซื้อจัดจ้าง
              </button>

              <button
                onClick={() => {
                  setProcurementTab("jobs");
                  setProcurementPage(0);
                }}
                className={`px-5 py-2.5 sm:px-7 sm:py-3 rounded-t-2xl font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  procurementTab === "jobs"
                    ? "bg-[#f97316] text-white shadow-md shadow-orange-300/50 -mb-0.5 z-10"
                    : "bg-white/80 hover:bg-white text-gray-700 hover:text-[#f97316] border-t border-x border-orange-100"
                }`}
              >
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                ข่าวสมัครงาน
              </button>
            </div>

            {/* ปุ่มดูทั้งหมด */}
            <button className="mb-2 px-5 py-1.5 rounded-full bg-white/90 hover:bg-[#f97316] text-[#f97316] hover:text-white border border-[#f97316] font-medium text-xs sm:text-sm transition-all duration-300 shadow-xs cursor-pointer">
              ทั้งหมด
            </button>
          </div>

          {/* กรอบกล่องหลักข่าวจัดซื้อจัดจ้าง/สมัครงาน */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 border-orange-200/90 shadow-xl p-5 sm:p-8 min-h-[360px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${procurementTab}-${procurementPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="divide-y divide-gray-100"
              >
                {(procurementData[procurementTab][procurementPage] || procurementData[procurementTab][0]).map((item) => (
                  <div
                    key={item.id}
                    className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 group cursor-pointer hover:bg-orange-50/50 px-3 rounded-xl transition-colors"
                  >
                    <h3 className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-[#f97316] transition-colors line-clamp-1 leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-xs text-gray-400 font-light shrink-0">
                      {item.date}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ปุ่มสลับหน้า (Pagination) */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => setProcurementPage((prev) => (prev > 0 ? prev - 1 : 2))}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Previous procurement page"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setProcurementPage(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  procurementPage === idx
                    ? "w-3.5 h-3.5 bg-[#f97316] shadow-xs scale-110"
                    : "w-3.5 h-3.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to procurement page ${idx + 1}`}
              />
            ))}

            <button
              onClick={() => setProcurementPage((prev) => (prev < 2 ? prev + 1 : 0))}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Next procurement page"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* 2. สื่อวิดีโอ & ติดต่อเรา Grid 2 คอลัมน์ */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pt-4">
          {/* ฝั่งซ้าย: สื่อวิดีโอ */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-4 text-[#ea580c]">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-[#ea580c]">
                <Play className="w-5 h-5 fill-[#ea580c]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-xs">
                สื่อวิดีโอ
              </h2>
            </div>

            <div className="bg-white/95 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-orange-100/80 p-2 relative group aspect-[16/10] flex items-center justify-center">
              {isVideoPlaying ? (
                <iframe
                  className="w-full h-full rounded-xl sm:rounded-2xl"
                  src="https://www.youtube.com/embed/5Peo-ivmupE?autoplay=1"
                  title="วิดีโอแนะนำโรงพยาบาลปากช่องนานา"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  onClick={() => setIsVideoPlaying(true)}
                  className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group/video"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                    alt="สื่อวิดีโอแนะนำโรงพยาบาล"
                    fill
                    className="object-cover group-hover/video:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/35 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center text-[#f97316] group-hover/video:scale-110 group-hover/video:bg-[#f97316] group-hover/video:text-white transition-all duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-3 rounded-xl text-white">
                    <p className="text-xs sm:text-sm font-medium line-clamp-1">
                      วิดีโอแนะนำโรงพยาบาลปากช่องนานา - มุ่งสู่บริการสุขภาพมาตรฐานสากล
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ฝั่งขวา: ติดต่อเรา */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-4 text-[#ea580c]">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-[#ea580c]">
                <Phone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-xs">
                ติดต่อเรา
              </h2>
            </div>

            {/* การ์ดรายละเอียดการติดต่อ + แผนที่ */}
            <div className="bg-white/95 rounded-2xl sm:rounded-3xl shadow-lg border border-orange-100/80 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center flex-1">
              {/* ข้อมูลติดต่อ ฝั่งซ้ายของการ์ด */}
              <div className="sm:col-span-7 flex flex-col justify-between space-y-3.5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                    โรงพยาบาลปากช่องนานา
                  </h3>
                  <p className="text-xs text-slate-500">Pakchongnana Hospital</p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-gray-600 font-light">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      29 หมู่ 6 ถนนมิตรภาพ ต.ปากช่อง อ.ปากช่อง จ.นครราชสีมา 30130
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#f97316] shrink-0" />
                    <span>โทรศัพท์ : 044-311383, 044-311855</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-[#f97316] shrink-0" />
                    <span>โทรสาร : 044-312781</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#f97316] shrink-0" />
                    <span>อีเมล : info@pakchongnana.go.th</span>
                  </div>
                </div>

                {/* ปุ่มโซเชียลมีเดีย 4 ไอคอน */}
                <div className="flex items-center gap-2.5 pt-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                    aria-label="Facebook"
                  >
                    <span className="font-bold text-xs">f</span>
                  </a>
                  <a
                    href="https://line.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#00B900] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                    aria-label="Line"
                  >
                    <span className="font-bold text-xs">LINE</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                    aria-label="YouTube"
                  >
                    <Play className="w-4 h-4 fill-white" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                    aria-label="Instagram"
                  >
                    <span className="font-bold text-xs">IG</span>
                  </a>
                </div>
              </div>

              {/* แผนที่ Google Maps ฝั่งขวาของการ์ด */}
              <div className="sm:col-span-5 h-48 sm:h-full min-h-[180px] relative rounded-xl overflow-hidden border border-gray-200 shadow-xs">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.61066922247!2d101.41249!3d14.6983!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311c4e7df68cdcd3%3A0x6b403d5ddcdbe3eb!2sPakchongnana%20Hospital!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="แผนที่โรงพยาบาลปากช่องนานา"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-semibold text-gray-700 shadow-xs flex items-center gap-1 border border-gray-200">
                  <Globe className="w-3 h-3 text-[#f97316]" /> Maps
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
