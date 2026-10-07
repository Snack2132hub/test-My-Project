"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Clock,
  Megaphone,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Calendar,
  Tag,
  ZoomIn,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ข่าวสารและกิจกรรม — ดึงข้อมูลจาก /api/news (รองรับทั้ง In-Memory และ MySQL Database)
 * แบ่งเป็น 3 หมวดหลัก: คลินิกพิเศษนอกเวลา / ข่าวประชาสัมพันธ์ / กิจกรรมภายใน
 */

type TabKey = "clinic" | "pr" | "activity";

const TAB_CATEGORY: Record<TabKey, string> = {
  clinic: "after_hours",
  pr: "pr_news",
  activity: "activity",
};

const TAB_LABELS: Record<TabKey, string> = {
  clinic: "คลินิกพิเศษนอกเวลา",
  pr: "ข่าวประชาสัมพันธ์",
  activity: "กิจกรรมภายในและบริการชุมชน",
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600";

const PAGE_SIZE = 6;

interface NewsRow {
  id: number;
  title: string;
  category: string;
  image_url: string;
  content?: string;
  published_at: string;
}

function formatThaiDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsAndActivitiesSection() {
  const [newsTab, setNewsTab] = useState<TabKey>("activity");
  const [newsPage, setNewsPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubTag, setSelectedSubTag] = useState<string>("ทั้งหมด");
  const [cache, setCache] = useState<Partial<Record<TabKey, NewsRow[]>>>({});
  const [selectedNews, setSelectedNews] = useState<NewsRow | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedNews) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedNews(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNews]);

  // Fetch news data
  useEffect(() => {
    if (cache[newsTab]) return;
    let cancelled = false;
    fetch(`/api/news?category=${TAB_CATEGORY[newsTab]}&limit=100`)
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

  const rawItems = cache[newsTab] ?? [];
  const loading = cache[newsTab] === undefined;

  // Filter items by search query and optional sub-tag
  const filteredItems = useMemo(() => {
    let list = rawItems;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.content && item.content.toLowerCase().includes(q))
      );
    }
    if (selectedSubTag !== "ทั้งหมด") {
      list = list.filter(
        (item) =>
          (item.content && item.content.includes(selectedSubTag)) ||
          item.title.includes(selectedSubTag)
      );
    }
    return list;
  }, [rawItems, searchQuery, selectedSubTag]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = filteredItems.slice(newsPage * PAGE_SIZE, (newsPage + 1) * PAGE_SIZE);

  const switchTab = (tab: TabKey) => {
    setNewsTab(tab);
    setNewsPage(0);
    setSearchQuery("");
    setSelectedSubTag("ทั้งหมด");
  };

  // Sub-tag quick filters for activity tab
  const activitySubTags = [
    "ทั้งหมด",
    "MCATT",
    "บริการชุมชน",
    "อบรม",
    "ซ้อมแผน",
    "บริจาคโลหิต",
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#f97316] text-xs font-semibold mb-2 border border-orange-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ภาพข่าวและกิจกรรมโรงพยาบาล</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              ข่าวสาร และ กิจกรรมภายใน
            </h2>
            <div className="w-20 h-1 bg-[#f97316] mt-2.5 rounded-full"></div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setNewsPage(0);
              }}
              placeholder="ค้นหาข่าวและกิจกรรม..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 focus:border-[#f97316] focus:bg-white focus:ring-2 focus:ring-orange-100 rounded-xl outline-hidden text-gray-800 placeholder-gray-400 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                aria-label="ล้างการค้นหา"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-2 border-b border-gray-100">
          <div className="inline-flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            {([
              { key: "activity", label: "กิจกรรมภายใน", Icon: Users },
              { key: "pr", label: "ข่าวประชาสัมพันธ์", Icon: Megaphone },
              { key: "clinic", label: "คลินิกพิเศษนอกเวลา", Icon: Clock },
            ] as { key: TabKey; label: string; Icon: typeof Clock }[]).map(({ key, label, Icon }) => {
              const count = cache[key]?.length;
              return (
                <button
                  key={key}
                  onClick={() => switchTab(key)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    newsTab === key
                      ? "bg-[#f97316] text-white shadow-sm font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                  {typeof count === "number" && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        newsTab === key ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subtags for Activity */}
          {newsTab === "activity" && (
            <div className="flex flex-wrap items-center gap-1.5">
              {activitySubTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedSubTag(tag);
                    setNewsPage(0);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedSubTag === tag
                      ? "bg-orange-100 text-[#f97316] font-semibold border border-orange-200"
                      : "bg-white text-gray-500 hover:text-gray-800 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results summary if searching */}
        {(searchQuery || selectedSubTag !== "ทั้งหมด") && (
          <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-gray-500">
            <span>
              ผลการค้นหาพบ <strong className="text-[#f97316]">{filteredItems.length}</strong> รายการ
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubTag("ทั้งหมด");
              }}
              className="text-xs text-[#f97316] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" /> ล้างตัวกรอง
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 min-h-[420px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs">
                <div className="w-full aspect-[4/3] rounded-xl bg-slate-100 animate-pulse" />
                <div className="mt-4 h-4 bg-slate-100 rounded animate-pulse" />
                <div className="mt-2 h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
            <Users className="w-10 h-10 text-gray-300 mb-2" />
            <p className="text-gray-500 font-medium">ไม่พบข้อมูลข่าวสารหรือกิจกรรมในหมวดหมู่นี้</p>
            <p className="text-xs text-gray-400 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${newsTab}-${newsPage}-${selectedSubTag}-${searchQuery}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 min-h-[420px]"
            >
              {pageItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNews(item)}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  {/* กล่องรูปภาพ กดเพื่อเปิดดูภาพขนาดใหญ่ */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={item.image_url || FALLBACK_IMG}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-xs flex items-center gap-1 border border-gray-100">
                      <Tag className="w-3 h-3 text-[#f97316]" />
                      <span>{TAB_LABELS[newsTab]}</span>
                    </div>

                    {/* Hover Zoom overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-gray-900 text-xs font-semibold shadow-lg flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                        <ZoomIn className="w-3.5 h-3.5 text-[#f97316]" />
                        ดูรูปและรายละเอียด
                      </span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 font-light mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#f97316]" />
                        <span>{formatThaiDate(item.published_at)}</span>
                      </div>
                      <h4 className="text-[16px] sm:text-[17px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#f97316] transition-colors">
                        {item.title}
                      </h4>
                      {item.content && (
                        <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#f97316] font-medium">
                      <span>อ่านรายละเอียด</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Modal ป็อปอัพรูปภาพและรายละเอียดขนาดใหญ่ */}
        <AnimatePresence>
          {selectedNews && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
            >
              {/* ปุ่มปิด */}
              <button
                onClick={() => setSelectedNews(null)}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-xl group"
                aria-label="ปิดรูปภาพ"
              >
                <X className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
              </button>

              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Modal Header */}
                <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#f97316] text-white text-xs font-semibold">
                      {TAB_LABELS[newsTab]}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatThaiDate(selectedNews.published_at)}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    ปิด
                  </button>
                </div>

                {/* Poster / Photo scrollable area */}
                <div className="relative bg-black flex items-center justify-center p-2 sm:p-4 overflow-auto max-h-[62vh]">
                  <Image
                    src={selectedNews.image_url || FALLBACK_IMG}
                    alt={selectedNews.title}
                    width={1200}
                    height={800}
                    className="max-h-[58vh] w-auto object-contain rounded shadow-2xl"
                    priority
                  />
                </div>

                {/* Modal Footer Description */}
                <div className="bg-slate-900/95 text-white p-4 sm:p-5 border-t border-slate-800 shrink-0">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {selectedNews.title}
                  </h3>
                  {selectedNews.content && (
                    <p className="mt-1.5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl whitespace-pre-line">
                      {selectedNews.content}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination bar */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-gray-500 font-light">
              แสดงหน้า <strong className="text-gray-800 font-semibold">{newsPage + 1}</strong> จาก{" "}
              <strong className="text-gray-800 font-semibold">{totalPages}</strong> (ทั้งหมด{" "}
              {filteredItems.length} รายการ)
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={newsPage === 0}
                onClick={() => setNewsPage((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-gray-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                aria-label="Previous news page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>ก่อนหน้า</span>
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setNewsPage(idx)}
                    className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      newsPage === idx
                        ? "bg-[#f97316] text-white shadow-xs"
                        : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                    }`}
                    aria-label={`Go to news page ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={newsPage === totalPages - 1}
                onClick={() => setNewsPage((prev) => Math.min(totalPages - 1, prev + 1))}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-gray-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                aria-label="Next news page"
              >
                <span>ถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
