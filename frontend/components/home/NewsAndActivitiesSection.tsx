"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Clock,
  Megaphone,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ข่าวสารและกิจกรรม — ดึงข้อมูลจาก /api/news (จัดการผ่านหน้า admin)
 * แบ่งเป็น 3 แท็บ: คลินิกพิเศษนอกเวลา / ข่าวประชาสัมพันธ์ / กิจกรรมภายใน
 */

type TabKey = "clinic" | "pr" | "activity";

const TAB_CATEGORY: Record<TabKey, string> = {
  clinic: "after_hours",
  pr: "pr_news",
  activity: "activity",
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600";

const PAGE_SIZE = 6;

interface NewsRow {
  id: number;
  title: string;
  image_url: string;
  published_at: string;
}

function formatThaiDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsAndActivitiesSection() {
  const [newsTab, setNewsTab] = useState<TabKey>("clinic");
  const [newsPage, setNewsPage] = useState(0);
  const [cache, setCache] = useState<Partial<Record<TabKey, NewsRow[]>>>({});
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  // ปิดป็อปอัพเมื่อกดปุ่ม Escape
  useEffect(() => {
    if (!previewImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

  useEffect(() => {
    if (cache[newsTab]) return;
    let cancelled = false;
    fetch(`/api/news?category=${TAB_CATEGORY[newsTab]}&limit=60`)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setCache((prev) => ({ ...prev, [newsTab]: json.ok ? json.data : [] }));
      })
      .catch(() => {
        if (!cancelled) setCache((prev) => ({ ...prev, [newsTab]: [] }));
      });
    return () => {
      cancelled = true;
    };
  }, [newsTab, cache]);

  const loading = cache[newsTab] === undefined;
  const items = cache[newsTab] ?? [];
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const pageItems = items.slice(newsPage * PAGE_SIZE, (newsPage + 1) * PAGE_SIZE);

  const switchTab = (tab: TabKey) => {
    setNewsTab(tab);
    setNewsPage(0);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อข่าวสารและกิจกรรมภายใน (ชิดขวา) */}
        <div className="flex flex-col items-end mb-8 text-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            ข่าวสาร และ กิจกรรมภายใน
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center md:justify-end mb-8">
          <div className="inline-flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {([
              { key: "clinic", label: "คลินิกพิเศษนอกเวลา", Icon: Clock },
              { key: "pr", label: "ข่าวประชาสัมพันธ์", Icon: Megaphone },
              { key: "activity", label: "กิจกรรมภายใน", Icon: Users },
            ] as { key: TabKey; label: string; Icon: typeof Clock }[]).map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => switchTab(key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  newsTab === key
                    ? "bg-linear-to-r from-[#ffa154] to-[#f97316] text-white shadow-md shadow-orange-200/70"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 min-h-[420px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="w-full aspect-[4/3] rounded-2xl bg-slate-100 border border-slate-200 animate-pulse" />
                <div className="mt-5 h-4 bg-slate-100 rounded animate-pulse" />
                <div className="mt-2 h-3 w-1/3 bg-slate-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center text-gray-400">
            ยังไม่มีข่าวในหมวดนี้
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${newsTab}-${newsPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 min-h-[420px]"
            >
              {pageItems.map((item) => (
                <div key={item.id} className="flex flex-col">
                  {/* กล่องรูปภาพ กดเพื่อเปิดดูภาพขนาดใหญ่ */}
                  <div
                    onClick={() =>
                      setPreviewImage({
                        url: item.image_url || FALLBACK_IMG,
                        title: item.title,
                      })
                    }
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm mb-3 cursor-pointer"
                    title="คลิกเพื่อดูภาพขนาดใหญ่"
                  >
                    <Image
                      src={item.image_url || FALLBACK_IMG}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h4 className="mt-5 text-[18px] font-bold text-gray-800 leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-400 font-light">{formatThaiDate(item.published_at)}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Modal ป็อปอัพรูปภาพขนาดใหญ่ */}
        <AnimatePresence>
          {previewImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-8"
            >
              {/* ปุ่มปิด */}
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="ปิดรูปภาพ"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              >
                <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden shadow-2xl bg-black/40">
                  <Image
                    src={previewImage.url}
                    alt={previewImage.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 95vw, 1000px"
                    priority
                  />
                </div>
                {previewImage.title && (
                  <p className="mt-3 text-white text-center text-sm sm:text-base font-medium max-w-2xl px-4 line-clamp-2 drop-shadow-md">
                    {previewImage.title}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination dots */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              onClick={() => setNewsPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Previous news page"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setNewsPage(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                  newsPage === idx ? "bg-[#f97316] shadow-xs scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to news page ${idx + 1}`}
              />
            ))}

            <button
              onClick={() => setNewsPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Next news page"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
