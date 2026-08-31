"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ZoomIn,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface CheckupProgram {
  id: number;
  title: string;
  price?: string;
  location?: string;
  time?: string;
  contact?: string;
  image: string;
  description?: string;
}

export default function CheckupProgramPage() {
  const [programs, setPrograms] = useState<CheckupProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoster, setSelectedPoster] = useState<CheckupProgram | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/health-checkup/checkup-programs");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setPrograms(json.data);
      }
    } catch (err) {
      console.error("Error fetching checkup programs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 pb-24">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#f8f9fa] border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 flex-wrap">
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
          <span className="text-orange-600 font-medium">โปรแกรมตรวจสุขภาพ</span>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            โปรแกรมตรวจสุขภาพ
          </h1>
          <div className="w-16 h-1 bg-[#f97316] rounded-full mt-2"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-8 py-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full aspect-[4/4.2] bg-gray-100 rounded-xl shadow-xs border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : (
          /* Programs List - 3 Posters Stacked matching Image 2 */
          <div className="space-y-8 sm:space-y-10">
            {programs.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPoster(item)}
                className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/90 transition-all duration-300 group cursor-pointer"
              >
                {/* Poster Image */}
                <div className="relative w-full flex items-center justify-center bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain block group-hover:scale-[1.008] transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Hover Zoom Prompt Badge */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-gray-900 text-sm font-semibold shadow-lg flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                      <ZoomIn className="w-4 h-4 text-[#f97316]" />
                      คลิกเพื่อดูภาพขยาย
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Lightbox Poster Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setSelectedPoster(null)}
        >
          {/* Close button top right */}
          <button
            onClick={() => setSelectedPoster(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-50 shadow-2xl group"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
          </button>

          {/* Modal Container */}
          <div
            className="relative bg-gray-950 rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-gray-800 shrink-0">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white">
                  {selectedPoster.title}
                </h3>
                {selectedPoster.price && (
                  <p className="text-xs text-orange-400 font-medium mt-0.5">
                    {selectedPoster.price}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedPoster(null)}
                className="px-3 py-1 bg-[#f97316] hover:bg-orange-600 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                ปิด
              </button>
            </div>

            {/* Poster image full scroll view */}
            <div className="relative bg-black flex items-center justify-center p-2 sm:p-4 overflow-auto max-h-[82vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPoster.image}
                alt={selectedPoster.title}
                className="max-h-[78vh] w-auto object-contain rounded shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
