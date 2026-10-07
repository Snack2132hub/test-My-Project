"use client";
import "@/app/(pages)/pages.css";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Map as MapIcon } from "lucide-react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function ContactPage() {
  const [mapMode, setMapMode] = useState<"graphic" | "live">("graphic");

  return (
    <div className={`${kanit.className} min-h-screen bg-white pb-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Breadcrumb Navigation */}
        <nav
          id="contact-breadcrumb"
          className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-2"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#f97316] transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#f97316] font-medium">ติดต่อ</span>
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <h1
            id="contact-page-title"
            className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#f97316] tracking-tight"
          >
            ติดต่อเรา
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1.5 font-light">
            ช่องทางติดต่อสื่อสาร โรงพยาบาลปากช่องนานา
          </p>
        </div>

        {/* 2-Column Main Content (Left: Map, Right: Information Cards & Social Action Buttons) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Map Card matching the design image */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              id="hospital-map-container"
              className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[510px] rounded-[28px] overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white group"
            >
              {mapMode === "graphic" ? (
                /* ภาพแผนที่ตาม Mockup ดีไซน์ */
                <div className="relative w-full h-full">
                  <Image
                    src="/img/mappnnh.png"
                    alt="แผนที่ โรงพยาบาลปากช่องนานา"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                /* แผนที่ Interactive Google Maps สด */
                <iframe
                  title="แผนที่นำทาง โรงพยาบาลปากช่องนานา"
                  src="img/mappnnh.png"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}

              {/* ปุ่มสลับโหมดแผนที่ & เปิดใน Google Maps */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                <button
                  type="button"
                  onClick={() => setMapMode((prev) => (prev === "graphic" ? "live" : "graphic"))}
                  className="pointer-events-auto bg-white/95 hover:bg-white text-gray-700 hover:text-[#f97316] text-xs font-medium py-1.5 px-3 rounded-xl shadow-md border border-gray-200/80 backdrop-blur-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <MapIcon className="w-3.5 h-3.5 text-[#f97316]" />
                  <span>{mapMode === "graphic" ? "ดู Google Maps สด" : "ดูภาพแผนที่แบบผัง"}</span>
                </button>

                <a
                  href="https://maps.app.goo.gl/iWUGGCQnVGUm61UV8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto bg-white/95 hover:bg-white text-gray-700 hover:text-[#f97316] text-xs font-medium py-1.5 px-3 rounded-xl shadow-md border border-gray-200/80 backdrop-blur-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>เปิดใน Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Information Cards and 3 Pill Buttons */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Card 1: สถานที่ตั้ง */}
            <div
              id="contact-location-card"
              className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow flex items-center gap-4"
            >
              {/* Teardrop Pin Marker Icon matching mockup */}
              <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  สถานที่ตั้ง
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-light mt-0.5 leading-snug">
                  400 รพ.ปากช่องนานา ต.ปากช่อง อ.ปากช่อง จ.นครราชสีมา
                </p>
              </div>
            </div>

            {/* Card 2: เวลาทำการ */}
            <div
              id="contact-hours-card"
              className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow flex items-center gap-4"
            >
              {/* Clock Circular Badge matching mockup */}
              <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  เวลาทำการ
                </h2>
                <div className="text-xs sm:text-sm text-gray-600 font-light mt-0.5 space-y-0.5 leading-snug">
                  <p>• จันทร์ - ศุกร์ : 08.00 - 16.00 น.</p>
                  <p>• เสาร์ - อาทิตย์ : 09.00 - 16.00 น.</p>
                </div>
              </div>
            </div>

            {/* Card 3: โทรศัพท์กลาง โรงพยาบาล */}
            <div
              id="contact-phone-card"
              className="bg-white rounded-2xl p-5 border border-gray-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow flex items-center gap-4"
            >
              {/* Phone Circular Badge matching mockup */}
              <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.61c0-.55-.45-1-1-1z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">
                  โทรศัพท์กลาง โรงพยาบาล
                </h2>
                <div className="text-xs sm:text-sm text-gray-600 font-light mt-0.5 flex flex-wrap items-center gap-1.5 leading-snug">
                  <a
                    href="tel:044311856"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    044-311856
                  </a>
                  <span>,</span>
                  <a
                    href="tel:044312699"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    044-312699
                  </a>
                </div>
              </div>
            </div>

            {/* 3 Action Pill Buttons with Soft Shadow matching design image */}
            <div className="pt-2 space-y-3">
              {/* 1. Facebook Button (Soft Sky-Blue Pill) */}
              <a
                id="contact-btn-facebook"
                href="https://www.facebook.com/pnnh.go.th/?locale=th_TH"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-[#7eb8fa] hover:bg-[#6baaf5] text-white shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              >
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-[#1877F2] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-[15px] font-normal tracking-wide">
                  Facebook โรงพยาบาลปากช่องนานา
                </span>
              </a>

              {/* 2. LINE Official Button (Soft Green Pill) */}
              <a
                id="contact-btn-line"
                href="https://page.line.me/388bkozc?openQrModal=true"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-[#52cf6d] hover:bg-[#43bd5d] text-white shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              >
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-[#06C755] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.499.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .626.285.626.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </div>
                <span className="text-sm sm:text-[15px] font-normal tracking-wide">
                  Line Official โรงพยาบาลปากช่องนานา
                </span>
              </a>

              {/* 3. Email Button (Soft Coral/Rose Pill) */}
              <a
                id="contact-btn-email"
                href="mailto:saraban-pnnh@moph.go.th"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-[#df7d79] hover:bg-[#ce6b67] text-white shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              >
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-[#EA4335] fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-[15px] font-normal tracking-wide">
                  saraban-pnnh@moph.go.th
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
