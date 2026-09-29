"use client";
import "@/app/(pages)/pages.css";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, Sparkles } from "lucide-react";
import { Kanit } from "next/font/google";
import {
  INTRANET_SYSTEMS,
  INTRANET_CATEGORIES,
  type IntranetSystem,
  type IntranetCategory,
} from "@/lib/intranetData";
import IntranetBadge from "@/components/intranet/IntranetBadge";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function IntranetPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IntranetCategory["id"]>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const currentCategoryName = useMemo(() => {
    const found = INTRANET_CATEGORIES.find((c) => c.id === selectedCategory);
    return found ? found.name : "ทั้งหมด";
  }, [selectedCategory]);

  // Filtering logic: Prefix-aware, word-aware, and substring-aware
  const filteredSystems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return INTRANET_SYSTEMS.filter((item) => {
      // 1. Category check
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search check: matches initial prefix or keywords
      if (!q) return true;

      const nameLower = item.name.toLowerCase();
      const descLower = item.description.toLowerCase();

      const startsWithName = nameLower.startsWith(q);
      const startsWithDesc = descLower.startsWith(q);

      const wordsInName = nameLower.split(/[\s/()\-:]+/);
      const wordsInDesc = descLower.split(/[\s/()\-:]+/);
      const wordMatch =
        wordsInName.some((w) => w.startsWith(q)) || wordsInDesc.some((w) => w.startsWith(q));

      const includesText = nameLower.includes(q) || descLower.includes(q);

      return startsWithName || startsWithDesc || wordMatch || includesText;
    });
  }, [selectedCategory, searchQuery]);

  const handleCardClick = (system: IntranetSystem) => {
    if (!system.url || system.url === "#") {
      showToast(`ระบบ "${system.name}" ยังไม่ได้กำหนด URL (url: "#" ใน lib/intranetData.ts)`);
    } else {
      window.open(system.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={`${kanit.className} min-h-screen bg-[#fcfcfd] pb-24`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-light leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7">
        {/* Breadcrumb matching mockup: หน้าแรก / บุคลากรแพทย์ */}
        <nav
          className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2 font-light"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#f97316] transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#f97316] font-normal">บุคลากรแพทย์</span>
        </nav>

        {/* Header Section matching Figma Mockup */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-gray-200/80 mb-8">
          {/* Left: Title & Subtitle */}
          <div>
            <h1 className="page-h1 text-[#f97316] uppercase">
              INTRANET
            </h1>
            <p className="page-subtitle mt-1.5">
              ระบบงานภายใน Intranet โรงพยาบาลปากช่องนานา
            </p>
          </div>

          {/* Right: Search & Category Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3.5">
            {/* Search Input */}
            <div className="relative min-w-[240px] sm:w-64">
              <label className="block text-xs font-normal text-gray-500 mb-1">
                ค้นหาระบบ
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="พิมพ์ค้นหาชื่อระบบ..."
                  className="w-full pl-9 pr-8 py-2 rounded-md bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] transition-all font-light"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Dropdown (หมวดหมู่) matching mockup style */}
            <div className="relative min-w-[220px]" ref={dropdownRef}>
              <label className="block text-xs font-normal text-gray-500 mb-1">
                หมวดหมู่
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white border border-[#f97316] rounded-md px-3.5 py-2 text-sm text-[#f97316] font-normal flex items-center justify-between shadow-2xs hover:bg-orange-50/20 transition-all cursor-pointer"
              >
                <span className="truncate pr-2">{currentCategoryName}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#f97316] shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-full sm:w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                  {INTRANET_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-orange-50 text-[#f97316] font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{cat.name}</span>
                        {isSelected && <span className="text-xs text-[#f97316]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Heading matching Figma: "ทั้งหมด" or selected category */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="page-h2 text-gray-800">
            {currentCategoryName}
          </h2>
          <span className="page-desc text-gray-400">
            ({filteredSystems.length} รายการ)
          </span>
        </div>

        {/* 4-Column Grid matching Figma Mockup */}
        {filteredSystems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredSystems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="group page-card p-3 sm:p-3.5 flex items-center gap-3 hover:border-[#f97316] hover:bg-orange-50/10 transition-all duration-200 cursor-pointer text-left"
              >
                {/* Left: Round Avatar Badge */}
                <IntranetBadge iconType={item.iconType} name={item.name} />

                {/* Right: Title and Description stacked */}
                <div className="flex-1 min-w-0">
                  <h5 className="page-h5 text-gray-800 group-hover:text-[#f97316] leading-snug tracking-tight text-left line-clamp-1 transition-colors">
                    {item.name}
                  </h5>
                  <p className="page-desc text-gray-500 leading-snug line-clamp-2 mt-0.5 text-left">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 max-w-md mx-auto my-12 shadow-xs">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800 mb-1">
              ไม่พบระบบที่ตรงกับ &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-gray-500 mb-5 font-light">
              ลองเปลี่ยนคำค้นหา หรือเลือกดูทุกหมวดหมู่
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
            >
              แสดงระบบทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
