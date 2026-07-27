"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Megaphone,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ข้อมูลข่าวสารและกิจกรรม แบ่งเป็น 3 แท็บ (คลินิกพิเศษนอกเวลา, ข่าวประชาสัมพันธ์, กิจกรรมภายใน)
 * แต่ละแท็บมี 3 หน้า หน้าละ 6 รายการ
 */
const newsData = {
  clinic: [
    // หน้า 1
    [
      { id: 1, title: "คลินิกพิเศษเฉพาะทาง (นอกเวลาราชการ) - คลินิกจักษุ", date: "22 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
      { id: 2, title: "คลินิกพิเศษเฉพาะทาง - คลินิกอายุรกรรม", date: "23 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
      { id: 3, title: "คลินิกพิเศษเฉพาะทาง - คลินิกกุมารเวชกรรม", date: "24 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" },
      { id: 4, title: "คลินิกพิเศษเฉพาะทาง - คลินิกศัลยกรรมออร์โธปิดิกส์", date: "25 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" },
      { id: 5, title: "คลินิกพิเศษเฉพาะทาง - คลินิกทันตกรรมพิเศษ", date: "26 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600" },
      { id: 6, title: "คลินิกพิเศษเฉพาะทาง - คลินิกหัวใจและหลอดเลือด", date: "27 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600" },
    ],
    // หน้า 2
    [
      { id: 7, title: "คลินิกพิเศษเฉพาะทาง - คลินิกสูตินรีเวชกรรม", date: "28 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" },
      { id: 8, title: "คลินิกพิเศษเฉพาะทาง - คลินิกผิวหนังและความงาม", date: "29 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
      { id: 9, title: "คลินิกพิเศษเฉพาะทาง - คลินิกเวชศาสตร์ฟื้นฟู", date: "30 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
      { id: 10, title: "คลินิกพิเศษเฉพาะทาง - คลินิกหู ตา คอ จมูก", date: "31 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
      { id: 11, title: "คลินิกพิเศษเฉพาะทาง - คลินิกทางเดินอาหาร", date: "1 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" },
      { id: 12, title: "คลินิกพิเศษเฉพาะทาง - คลินิกระบบประสาท", date: "2 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" },
    ],
    // หน้า 3
    [
      { id: 13, title: "คลินิกพิเศษเฉพาะทาง - คลินิกภูมิแพ้และภูมิคุ้มกัน", date: "3 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600" },
      { id: 14, title: "คลินิกพิเศษเฉพาะทาง - คลินิกต่อมไร้ท่อและเบาหวาน", date: "4 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600" },
      { id: 15, title: "คลินิกพิเศษเฉพาะทาง - คลินิกโรคไตและฟอกเลือด", date: "5 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" },
      { id: 16, title: "คลินิกพิเศษเฉพาะทาง - คลินิกศัลยกรรมทั่วไป", date: "6 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
      { id: 17, title: "คลินิกพิเศษเฉพาะทาง - คลินิกจิตเวชและสุขภาพจิต", date: "7 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
      { id: 18, title: "คลินิกพิเศษเฉพาะทาง - คลินิกเวชศาสตร์ครอบครัว", date: "8 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
    ],
  ],
  pr: [
    // หน้า 1
    [
      { id: 1, title: "โครงการตรวจสุขภาพสิทธิประกันสังคมประจำปี 2569", date: "15 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
      { id: 2, title: "ประชาสัมพันธ์การขยายเวลาให้บริการห้องฉุกเฉิน", date: "16 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
      { id: 3, title: "ข้อแนะนำในการปฏิบัติตนช่วงฤดูฝนเพื่อป้องกันไข้เลือดออก", date: "18 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
      { id: 4, title: "ประกาศจัดซื้อจัดจ้างอุปกรณ์ทางการแพทย์ ประจำปีงบประมาณ 2569", date: "20 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
      { id: 5, title: "ยินดีต้อนรับคณะผู้ตรวจประเมินคุณภาพมาตรฐาน HA", date: "21 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
      { id: 6, title: "เปิดบริการคลินิกชะลอชราและเวชศาสตร์ฟื้นฟู สุขภาพดีทุกวัย", date: "22 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
    ],
    // หน้า 2
    [
      { id: 7, title: "บริการฉีดวัคซีนไข้หวัดใหญ่ฟรี สำหรับกลุ่มเสี่ยง 7 โรคเรื้อรัง", date: "23 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
      { id: 8, title: "แจ้งปิดให้บริการระบบลงทะเบียนชั่วคราวเพื่อปรับปรุงระบบ", date: "24 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
      { id: 9, title: "โครงการรับยาใกล้บ้าน ณ รพ.สต. ในเครือข่ายโรงพยาบาลปากช่องนานา", date: "25 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
      { id: 10, title: "ประชาสัมพันธ์ช่องทางการจองคิวออนไลน์ผ่านแอป หมอพร้อม", date: "26 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
      { id: 11, title: "ขอเชิญร่วมบริจาคโลหิตสำรองเพื่อผู้ป่วยฉุกเฉิน", date: "27 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600" },
      { id: 12, title: "รายงานสรุปผลการดำเนินงานประจำไตรมาสที่ 2/2569", date: "28 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
    ],
    // หน้า 3
    [
      { id: 13, title: "มาตรการสวมหน้ากากอนามัยในพื้นที่อาคารผู้ป่วยนอก", date: "29 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
      { id: 14, title: "แนะนำเทคโนโลยีเครื่องเอ็กซเรย์คอมพิวเตอร์ CT-Scan รุ่นใหม่", date: "30 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
      { id: 15, title: "โครงการดนตรีจิตอาสาบำบัดผู้ป่วยยามบ่าย ณ ลานกิจกรรม", date: "31 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
      { id: 16, title: "ตารางแพทย์ออกตรวจประจำเดือนสิงหาคม 2569", date: "1 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
      { id: 17, title: "เปิดตัวศูนย์ดูแลผู้ป่วยระยะยาวพึ่งพิง (Long-term Care)", date: "2 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
      { id: 18, title: "สิทธิประโยชน์การเบิกจ่ายตรงสำหรับข้าราชการและครอบครัว", date: "3 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600" },
    ],
  ],
  activity: [
    // หน้า 1
    [
      { id: 1, title: "โครงการอบรมป้องกันและซ้อมแผนอัคคีภัยประจำปี 2569", date: "10 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
      { id: 2, title: "กิจกรรมทำบุญตักบาตรเนื่องในวันสำคัญทางศาสนา", date: "12 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
      { id: 3, title: "พิธีมอบเกียรติบัตรบุคลากรดีเด่นประจำปี 2569", date: "14 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
      { id: 4, title: "สัมมนาพัฒนาศักยภาพการบริการและการสื่อสารดุจญาติมิตร", date: "16 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
      { id: 5, title: "กิจกรรม Big Cleaning Day ทำความสะอาดรอบโรงพยาบาล", date: "18 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
      { id: 6, title: "โครงการส่งเสริมการออกกำลังกาย สุขภาพดีชีวีมีสุข", date: "20 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
    ],
    // หน้า 2
    [
      { id: 7, title: "กิจกรรมเดิน-วิ่งมินิมาราธอนเพื่อการกุศล รพ.ปากช่องนานา", date: "22 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
      { id: 8, title: "โครงการบริจาคโลหิตรวมใจถวายเป็นพระราชกุศล", date: "24 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600" },
      { id: 9, title: "อบรมความรู้เรื่องการช่วยชีวิตขั้นพื้นฐาน (CPR) แก่ประชาชน", date: "25 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
      { id: 10, title: "กิจกรรมปลูกป่าเฉลิมพระเกียรติและอนุรักษ์สิ่งแวดล้อม", date: "26 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
      { id: 11, title: "สัมมนาการใช้นวัตกรรมดิจิทัลทางการแพทย์เพื่ออนาคต", date: "27 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
      { id: 12, title: "กิจกรรมเชื่อมสัมพันธ์ไมตรี กีฬาภายในโรงพยาบาล", date: "28 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
    ],
    // หน้า 3
    [
      { id: 13, title: "โครงการเยี่ยมบ้านผู้ป่วยติดเตียงในชุมชนเทศบาลปากช่อง", date: "29 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
      { id: 14, title: "งานแสดงนวัตกรรมและผลงานวิจัยของบุคลากรทางการแพทย์", date: "30 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
      { id: 15, title: "อบรมเชิงปฏิบัติการการใช้เครื่องมือแพทย์ระดับสูง", date: "31 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
      { id: 16, title: "กิจกรรมสันทนาการต้อนรับบุคลากรใหม่ประจำปี", date: "1 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
      { id: 17, title: "โครงการสัปดาห์รณรงค์ล้างมือเพื่อสุขอนามัยในโรงพยาบาล", date: "2 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
      { id: 18, title: "กิจกรรมแลกเปลี่ยนเรียนรู้การดูแลสุขภาพใจบุคลากร", date: "3 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
    ],
  ],
};

/**
 * คอมโพเนนต์ NewsAndActivitiesSection (ส่วนข่าวสาร และ กิจกรรมภายใน)
 * มีแท็บสลับหมวดข่าว + ระบบแบ่งหน้า 6 รายการต่อหน้า
 */
export default function NewsAndActivitiesSection() {
  const [newsTab, setNewsTab] = useState<"clinic" | "pr" | "activity">("clinic");
  const [newsPage, setNewsPage] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อส่วนข่าวสาร และ กิจกรรมภายใน */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            ข่าวสาร และ กิจกรรมภายใน
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
        </div>

        {/* แถบปุ่มเลือกหมวดหมู่ข่าว (Tabs) */}
        <div className="flex justify-center md:justify-end mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {/* Tab 1: คลินิกพิเศษนอกเวลา */}
            <button
              onClick={() => {
                setNewsTab("clinic");
                setNewsPage(0);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                newsTab === "clinic"
                  ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-md shadow-orange-200/70"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
              }`}
            >
              <Clock className="w-4 h-4" />
              คลินิกพิเศษนอกเวลา
            </button>

            {/* Tab 2: ข่าวประชาสัมพันธ์ */}
            <button
              onClick={() => {
                setNewsTab("pr");
                setNewsPage(0);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                newsTab === "pr"
                  ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-md shadow-orange-200/70"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
              }`}
            >
              <Megaphone className="w-4 h-4" />
              ข่าวประชาสัมพันธ์
            </button>

            {/* Tab 3: กิจกรรมภายใน */}
            <button
              onClick={() => {
                setNewsTab("activity");
                setNewsPage(0);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                newsTab === "activity"
                  ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-md shadow-orange-200/70"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
              }`}
            >
              <Users className="w-4 h-4" />
              กิจกรรมภายใน
            </button>
          </div>
        </div>

        {/* ตารางการ์ดข่าวสาร 6 รายการ (3 คอลัมน์ x 2 แถว) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${newsTab}-${newsPage}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 min-h-[420px]"
          >
            {(newsData[newsTab][newsPage] || newsData[newsTab][0]).map((item) => (
              <div
                key={item.id}
                className="flex flex-col group cursor-pointer transition-all duration-300"
              >
                {/* กรอบรูปภาพโปสเตอร์ข่าว */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
                  {/* 📌 [จุดเปลี่ยนรูปโปสเตอร์ข่าว] 
                      สามารถเปลี่ยน src ของข่าวได้จากอาร์เรย์ newsData ด้านบน
                  */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-[#f97316]">
                    <Sparkles className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>

                {/* ข้อความรายละเอียดข่าว */}
                <h3 className="mt-3 text-sm sm:text-base font-bold text-gray-800 leading-snug group-hover:text-[#f97316] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-gray-400 font-light">
                  {item.date}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ปุ่มสลับหน้า (Pagination) */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <button
            onClick={() => setNewsPage((prev) => (prev > 0 ? prev - 1 : 2))}
            className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
            aria-label="Previous news page"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setNewsPage(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                newsPage === idx
                  ? "w-3.5 h-3.5 bg-[#f97316] shadow-xs scale-110"
                  : "w-3.5 h-3.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to news page ${idx + 1}`}
            />
          ))}

          <button
            onClick={() => setNewsPage((prev) => (prev < 2 ? prev + 1 : 0))}
            className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
            aria-label="Next news page"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
