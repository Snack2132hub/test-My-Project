"use client";

import { useState, useEffect } from "react";
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
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const ITEMS_PER_PAGE = 8;

interface ProcurementRow {
  id: number;
  title: string;
  published_at: string;
}

function formatThaiDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
}
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
  const [cache, setCache] = useState<Partial<Record<"procurement" | "jobs", ProcurementRow[]>>>({});
  const router = useRouter();

  useEffect(() => {
    if (cache[procurementTab]) return;
    const apiType = procurementTab === "jobs" ? "job" : "procurement";
    let cancelled = false;
    fetch(`${API}/api/procurement?type=${apiType}&page=1&limit=60`)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) {
          setCache((prev) => ({ ...prev, [procurementTab]: json.ok && Array.isArray(json.data) ? json.data : [] }));
        }
      })
      .catch(() => {
        if (!cancelled) setCache((prev) => ({ ...prev, [procurementTab]: [] }));
      });
    return () => {
      cancelled = true;
    };
  }, [procurementTab, cache]);

  const loading = cache[procurementTab] === undefined;
  const currentNews = cache[procurementTab] ?? [];

  const totalPages = Math.max(1, Math.ceil(currentNews.length / ITEMS_PER_PAGE));

  const paginatedNews = currentNews.slice(
    procurementPage * ITEMS_PER_PAGE,
    (procurementPage + 1) * ITEMS_PER_PAGE
  );
  return (
    <section
      className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(254, 243, 199, 0.85), rgba(253, 230, 138, 0.70), rgba(245, 158, 11, 0.85)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600')",
      }}
    >
      {/* โอเวอร์เลย์สีอุ่นนุ่มนวล */}
      <div className="absolute inset-0 bg-linear-to-b from-orange-50/50 via-amber-100/40 to-orange-200/60 backdrop-blur-[1px]" />

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

          </div>

          {/* กรอบกล่องหลักข่าวจัดซื้อจัดจ้าง/สมัครงาน */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 border-orange-200/90 shadow-xl px-4 sm:px-5 py-3 min-h-[40px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${procurementTab}-${procurementPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="divide-y divide-gray-100"
              >
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="py-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </div>
                  ))
                ) : paginatedNews.length === 0 ? (
                  <div className="py-10 text-center text-sm text-gray-400">
                    ยังไม่มีประกาศในหมวดนี้
                  </div>
                ) : (
                  paginatedNews.map((item) => (
                    <div
                      key={item.id}
                      className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 group cursor-pointer hover:bg-orange-50/40 rounded-lg transition-colors"
                    >
                      <h4 className="text-[18px] font-bold text-gray-800 group-hover:text-[#f97316] transition-colors line-clamp-1 leading-snug">
                        {item.title}
                      </h4>

                      <span className="text-[16px] text-gray-400 font-light shrink-0">
                        {formatThaiDate(item.published_at)}
                      </span>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-end mt-4 pr-4">
              <button
                onClick={() => {
                  if (procurementTab === "procurement") {
                    router.push("/procurement");
                  } else {
                    router.push("/jobs");
                  }
                }}
                className="px-5 py-2 rounded-full bg-[#f97316] text-white hover:bg-[#ea580c] transition-all duration-300 shadow-md cursor-pointer"
              >
                ดูทั้งหมด
              </button>
</div>
          </div>

          {/* ปุ่มสลับหน้า (Pagination) */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
                onClick={() => setProcurementPage((prev) => prev > 0 ? prev - 1 : totalPages - 1)}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Previous procurement page"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setProcurementPage(idx)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                    procurementPage === idx
                      ? "bg-[#f97316] text-white"
                      : "bg-white text-gray-600 hover:bg-orange-100"
                  }`}
                >
                  {idx + 1}
                </button>
              )
            )}

            <button
              onClick={() => setProcurementPage((prev) => prev < totalPages - 1 ? prev + 1 : 0 )}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Next procurement page"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* 2. สื่อวิดีโอ & ติดต่อเรา Grid 2 คอลัมน์ */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pt-4">
          {/* ฝั่งซ้าย: สื่อวิดีโอ */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5 text-[#ea580c]">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-[#ea580c]">
                  <Play className="w-5 h-5 fill-[#ea580c]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-xs">
                  สื่อวิดีโอ
                </h2>
              </div>
              <a
                href="https://youtu.be/XxGFqrPq7lk?si=h2hWjMh4_kSWRcrs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-semibold shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>ดูบน YouTube</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>

            <div className="bg-white/95 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-orange-100/80 p-2 relative group aspect-[16/10] flex items-center justify-center">
              {isVideoPlaying ? (
                <iframe
                  className="w-full h-full rounded-xl sm:rounded-2xl"
                  src="https://www.youtube.com/embed/XxGFqrPq7lk?autoplay=1"
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
                    src="https://img.youtube.com/vi/XxGFqrPq7lk/hqdefault.jpg"
                    alt="สื่อวิดีโอแนะนำโรงพยาบาล"
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover/video:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/35 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center text-[#f97316] group-hover/video:scale-110 group-hover/video:bg-[#f97316] group-hover/video:text-white transition-all duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-3 rounded-xl text-white flex items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-medium line-clamp-1">
                      วิดีโอแนะนำโรงพยาบาลปากช่องนานา - มุ่งสู่บริการสุขภาพมาตรฐานสากล
                    </p>
                    <a
                      href="https://youtu.be/XxGFqrPq7lk?si=h2hWjMh4_kSWRcrs"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="hidden sm:inline">เปิด YouTube</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ฝั่งขวา: ติดต่อเรา */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-4 text-[#ea580c]">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-[#ea580c]">
                <Phone className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-xs">
                ติดต่อเรา
              </h2>
            </div>

            {/* การ์ดรายละเอียดการติดต่อ + แผนที่ */}
            <div className="bg-white/95 rounded-2xl sm:rounded-3xl shadow-lg border border-orange-100/80 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-start flex-1">
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
