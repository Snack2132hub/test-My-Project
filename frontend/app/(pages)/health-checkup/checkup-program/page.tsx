"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse,
  Phone,
  Clock,
  MapPin,
  ZoomIn,
  X,
  ChevronRight,
  Info,
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
    <div className="bg-gradient-to-b from-[#fcf8f3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-24">
      {/* 1. Breadcrumbs */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-5xl mx-auto flex items-center gap-1.5 flex-wrap">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        {/* Header Title */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 text-xs font-semibold mb-3">
            <HeartPulse className="w-4 h-4 text-[#f97316]" />
            <span>ศูนย์ตรวจสุขภาพ Wellness Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            โปรแกรมตรวจสุขภาพ
          </h1>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mt-3"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-8 py-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm animate-pulse space-y-4"
              >
                <div className="w-full h-96 bg-gray-200 rounded-2xl" />
                <div className="h-6 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          /* Programs List (Vertical Poster Style) */
          <div className="space-y-12">
            {programs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-md hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Poster Display Area */}
                <div
                  className="relative w-full bg-gray-900 cursor-pointer overflow-hidden flex items-center justify-center min-h-[420px] sm:min-h-[550px] md:min-h-[620px]"
                  onClick={() => setSelectedPoster(item)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto max-h-[85vh] object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  />

                  {/* Top Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#f97316] text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.price || "แพ็คเกจตรวจสุขภาพ"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPoster(item);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-xs font-medium shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-orange-400" />
                      <span>ขยายรูปใหญ่</span>
                    </button>
                  </div>
                </div>

                {/* Info Footer Under Poster */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-white to-orange-50/30 border-t border-orange-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {item.title}
                      </h2>
                      {item.price && (
                        <p className="text-lg font-extrabold text-[#f97316] mt-1">
                          {item.price}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedPoster(item)}
                      className="self-start md:self-auto px-6 py-2.5 bg-gradient-to-r from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span>ดูภาพโปสเตอร์ฉบับเต็ม</span>
                    </button>
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-600 leading-relaxed bg-white/80 p-4 rounded-2xl border border-orange-100/60 mb-4">
                      <strong className="text-gray-800 block mb-1">รายการตรวจในโปรแกรม:</strong>
                      {item.description}
                    </p>
                  )}

                  {/* Quick Meta Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-200/80 text-xs sm:text-sm text-gray-600">
                    {item.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    )}
                    {item.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="truncate">{item.time}</span>
                      </div>
                    )}
                    {item.contact && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="truncate">{item.contact}</span>
                      </div>
                    )}
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setSelectedPoster(null)}
        >
          {/* Close button top right */}
          <button
            onClick={() => setSelectedPoster(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer z-50 shadow-2xl group"
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
            <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-800 shrink-0">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {selectedPoster.title}
                </h3>
                {selectedPoster.price && (
                  <p className="text-xs text-orange-400 font-medium">
                    {selectedPoster.price}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedPoster(null)}
                className="px-4 py-1.5 bg-[#f97316] text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors"
              >
                ปิด
              </button>
            </div>

            {/* Poster image full scroll view */}
            <div className="relative bg-black flex items-center justify-center p-2 sm:p-6 overflow-auto max-h-[80vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPoster.image}
                alt={selectedPoster.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
