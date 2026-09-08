"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Syringe,
  ChevronRight,
  ZoomIn,
  X,
  Tag,
  Phone,
  Clock,
  MapPin,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

interface VaccineProgram {
  id: number;
  title: string;
  price?: string;
  category?: string;
  location?: string;
  time?: string;
  contact?: string;
  image: string;
  description?: string;
}

export default function VaccineProgramPage() {
  const [vaccines, setVaccines] = useState<VaccineProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPoster, setSelectedPoster] = useState<VaccineProgram | null>(null);

  const itemsPerPage = 6;

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/health-checkup/vaccine-programs");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setVaccines(json.data);
      }
    } catch (err) {
      console.error("Error fetching vaccine programs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Categories
  const categories = [
    "ทั้งหมด",
    ...Array.from(new Set(vaccines.map((v) => v.category).filter(Boolean))),
  ];

  // Filter
  const filteredVaccines =
    activeCategory === "ทั้งหมด"
      ? vaccines
      : vaccines.filter((v) => v.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredVaccines.length / itemsPerPage) || 1;
  const currentItems = filteredVaccines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gradient-to-b from-[#fcf8f3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-24">
      {/* 1. Breadcrumbs */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            หน้าแรก
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/medical-services" className="hover:text-orange-500 transition-colors">
            บริการทางการแพทย์
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/health-checkup" className="hover:text-orange-500 transition-colors">
            ศูนย์ตรวจสุขภาพ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-orange-600 font-medium">โปรแกรมฉีดวัคซีน</span>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        {/* Header Title */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 text-xs font-semibold mb-3">
            <Syringe className="w-4 h-4 text-[#f97316]" />
            <span>ศูนย์ตรวจสุขภาพ Wellness Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            โปรแกรมฉีดวัคซีน
          </h1>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mt-3"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat as string}
              onClick={() => {
                setActiveCategory(cat as string);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#f97316] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200"
              }`}
            >
              {cat as string}
            </button>
          ))}
        </div>

        {/* Loading or Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse flex flex-col gap-3"
              >
                <div className="w-full h-48 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">ไม่พบข้อมูลรายการวัคซีนในหมวดหมู่นี้</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPoster(item)}
                className="bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              >
                {/* Poster Image Container */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Logo Watermark top right */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center p-0.5 border border-gray-100">
                    <Image
                      src="/img/indexbanner/herobannertest01.png"
                      alt="Logo"
                      width={22}
                      height={22}
                      className="object-contain rounded-full"
                    />
                  </div>

                  {/* Price/Category Tag top left */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#f97316] text-white text-[11px] font-semibold shadow-sm flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.category || "วัคซีน"}</span>
                  </div>

                  {/* Hover Zoom Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                      <ZoomIn className="w-3.5 h-3.5 text-[#f97316]" />
                      ดูรูปขยาย
                    </span>
                  </div>
                </div>

                {/* Text Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-base text-gray-800 group-hover:text-[#f97316] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#f97316]">
                      {item.price || "สอบถามราคา"}
                    </span>
                    <span className="text-[#f97316] font-medium group-hover:underline">
                      รายละเอียดเพิ่มเติม →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:text-orange-600 hover:border-orange-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === pageNum
                      ? "w-8 bg-[#f97316]"
                      : "w-2.5 bg-orange-200 hover:bg-orange-300"
                  }`}
                  aria-label={`Go to page ${pageNum}`}
                />
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:text-orange-600 hover:border-orange-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Poster Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setSelectedPoster(null)}
        >
          {/* Close button top right */}
          <button
            onClick={() => setSelectedPoster(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-50 shadow-xl group"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
          </button>

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#f97316] text-white mb-1">
                  {selectedPoster.category || "วัคซีน"}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white line-clamp-1">
                  {selectedPoster.title}
                </h3>
              </div>
            </div>

            {/* Image display */}
            <div className="relative bg-gray-950 flex items-center justify-center p-2 sm:p-4 overflow-auto max-h-[65vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPoster.image}
                alt={selectedPoster.title}
                className="max-h-[60vh] w-auto object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Description & Price */}
            <div className="p-5 bg-white border-t border-gray-100 flex flex-col gap-2">
              {selectedPoster.price && (
                <p className="text-sm font-bold text-[#f97316]">
                  {selectedPoster.price}
                </p>
              )}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {selectedPoster.description || "รายละเอียดบริการโปรแกรมฉีดวัคซีน ศูนย์ตรวจสุขภาพ โรงพยาบาลปากช่องนานา"}
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                <span>สอบถามเพิ่มเติม: {selectedPoster.contact || "044-211356 , 044-312568 ต่อ 631"}</span>
                <button
                  onClick={() => setSelectedPoster(null)}
                  className="px-4 py-1.5 bg-[#f97316] text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
