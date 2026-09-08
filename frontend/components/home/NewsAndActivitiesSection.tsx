"use client";

import { useState, useEffect } from "react";
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
        <div className="flex flex-col items-center mb-10 text-center">
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
                <div key={item.id} className="flex flex-col group cursor-pointer transition-all duration-300">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow mb-3">
                    <Image
                      src={item.image_url || FALLBACK_IMG}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-[#f97316]">
                      <Sparkles size={18} strokeWidth={2} />
                    </div>
                  </div>
                  <h4 className="mt-5 text-[18px] font-bold text-gray-800 leading-snug group-hover:text-[#f97316] transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-400 font-light">{formatThaiDate(item.published_at)}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

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
