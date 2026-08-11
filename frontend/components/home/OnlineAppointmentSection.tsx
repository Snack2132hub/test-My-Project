"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

/**
 * คอมโพเนนต์ OnlineAppointmentSection (ระบบนัดหมายออนไลน์)
 * - คลินิก ในเวลาราชการ
 * - คลินิกเฉพาะทาง นอกเวลาราชการ
 * - มี Lightbox ขยายรูปภาพเมื่อกด
 */
export default function OnlineAppointmentSection() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  // ปิด modal เมื่อกด ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  const appointmentCards = [
    {
      title: "คลินิก ในเวลาราชการ",
      subtitle: "บริการนัดหมายออนไลน์ ในเวลาราชการ",
      src: "/img/in.png",
      alt: "คลินิก ในเวลาราชการ",
    },
    {
      title: "คลินิกเฉพาะทาง นอกเวลาราชการ",
      subtitle: "บริการนัดหมายออนไลน์ นอกเวลาราชการ",
      src: "/img/out.png",
      alt: "คลินิกเฉพาะทาง นอกเวลาราชการ",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-[#ffedd5]/80 via-[#fed7aa]/40 to-[#ffedd5]/60 border-t border-orange-100">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อส่วนระบบนัดหมายออนไลน์ */}
        <div className="flex flex-col items-center mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] tracking-tight">
            ระบบนัดหมายออนไลน์
          </h2>
          <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
        </div>

        {/* การ์ดระบบนัดหมาย 2 รายการ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {appointmentCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() =>
                setSelectedImage({
                  src: card.src,
                  alt: card.alt,
                  title: card.title,
                })
              }
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-white border border-orange-200/80 aspect-[16/11] flex items-center justify-center p-2">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Hover overlay indicator */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-sm backdrop-blur-[1px]">
                  <span className="bg-[#f97316] text-white px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                    <ZoomIn className="w-4 h-4" />
                    คลิกเพื่อดูรูปขยาย
                  </span>
                </div>
              </div>

              <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#f97316] transition-colors flex items-center gap-2">
                {card.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 font-light">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal ขยายรูปใหญ่ แบบไม่มีกรอบ */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          {/* ปุ่มปิดแบบลอยมุมขวาบน */}
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer z-50 shadow-xl group"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
          </button>

          {/* รูปภาพขยายใหญ่ ไม่มีกรอบ */}
          <div
            className="relative flex items-center justify-center max-w-[95vw] max-h-[92vh] animate-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
            />
          </div>
        </div>
      )}
    </section>
  );
}

