"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className="w-full relative z-50 font-sans shadow-xs">
      {/* 1. แถบ Top Bar สีเขียวมรกต (Emerald Teal Top Bar) */}
      <div className="bg-[#00bba7] text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* เบอร์โทรศัพท์ฝั่งซ้าย */}
          <div className="flex items-center gap-2 font-medium">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>044-311856, 044-312699</span>
          </div>

          {/* Social Media & Maps Links ฝั่งขวา */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1 font-bold text-[11px] leading-none"
              aria-label="Line"
            >
              LINE
            </a>
            <a
              href="https://youtu.be/XxGFqrPq7lk?si=h2hWjMh4_kSWRcrs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1"
              aria-label="Map Location"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. เมนูหลัก Navbar สีขาว */}
      <nav className="bg-white border-b border-gray-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* โลโก้โรงพยาบาลปากช่องนานา */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Image
                src="/img/indexbanner/herobannertest01.png"
                alt="โรงพยาบาลปากช่องนานา"
                width={48}
                height={48}
                className="object-contain rounded-full shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-xl text-[#ea580c] leading-tight tracking-tight group-hover:text-[#c2410c] transition-colors">
                โรงพยาบาล
              </span>
              <span className="font-bold text-base sm:text-xl text-[#ea580c] leading-none tracking-tight group-hover:text-[#c2410c] transition-colors">
                ปากช่องนานา
              </span>
            </div>
          </Link>

          {/* เมนูหลักบน Desktop */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-3 text-sm font-semibold text-gray-700">
            {/* หน้าหลัก */}
            <li>
              <Link
                href="/"
                className={`px-3 py-2 rounded-md transition-all duration-200 block ${
                  pathname === "/"
                    ? "text-[#f97316] border-b-2 border-[#f97316]"
                    : "hover:text-[#f97316]"
                }`}
              >
                หน้าหลัก
              </Link>
            </li>

            {/* เกี่ยวกับ ▾ */}
            <li
              className="relative group"
              onMouseEnter={() => setActiveDropdown("about")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 hover:text-[#f97316] cursor-pointer transition-colors">
                เกี่ยวกับ <ChevronDown className="w-4 h-4 stroke-[2]" />
              </button>
              {activeDropdown === "about" && (
                <ul className="absolute left-0 top-full w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ประวัติโรงพยาบาล
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      วิสัยทัศน์ / พันธกิจ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ผู้บริหารโรงพยาบาล
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      โครงสร้างองค์กร
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ศูนย์บริการผู้ป่วย ▾ (ไฮไลท์ส้มเมื่อเลือกหน้า patient-services) */}
            <li
              className="relative group"
              onMouseEnter={() => setActiveDropdown("patient")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/patient-services"
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200 ${
                  pathname?.startsWith("/patient-services")
                    ? "text-[#f97316] border-b-2 border-[#f97316]"
                    : "hover:text-[#f97316]"
                }`}
              >
                ศูนย์บริการผู้ป่วย <ChevronDown className="w-4 h-4 stroke-[2]" />
              </Link>
              {activeDropdown === "patient" && (
                <ul className="absolute left-0 top-full w-60 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <li>
                    <Link
                      href="/patient-services"
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์รักษาเฉพาะทาง
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient-services?dept=emergency"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์อุบัติเหตุ-ฉุกเฉิน
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient-services?dept=internal"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์อายุรกรรม
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient-services?dept=surgery"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์ศัลยกรรม
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient-services?dept=pediatrics"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      โปรแกรมฉีดวัคซีน
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ลงทะเบียนผู้ป่วยใหม่
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* ค้นหาแพทย์ */}
            <li>
              <Link
                href="#"
                className="px-3 py-2 hover:text-[#f97316] transition-colors block"
              >
                ค้นหาแพทย์
              </Link>
            </li>

            {/* งานบริการ ▾ */}
            <li
              className="relative group"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 hover:text-[#f97316] cursor-pointer transition-colors">
                งานบริการ <ChevronDown className="w-4 h-4 stroke-[2]" />
              </button>
              {activeDropdown === "services" && (
                <ul className="absolute left-0 top-full w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      คลินิกพิเศษนอกเวลา
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      สมัครงาน / รับสมัครบุคลากร
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ข่าวจัดซื้อจัดจ้าง
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* INTRANET */}
            <li>
              <Link
                href="#"
                className="px-3 py-2 hover:text-[#f97316] transition-colors block uppercase tracking-wide"
              >
                INTRANET
              </Link>
            </li>

            {/* ติดต่อ */}
            <li>
              <Link
                href="#"
                className="px-3 py-2 hover:text-[#f97316] transition-colors block"
              >
                ติดต่อ
              </Link>
            </li>
          </ul>

          {/* ปุ่ม Hamburger สำหรับ Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-[#f97316] hover:bg-orange-50 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* เมนู Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-gray-100 space-y-2 px-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#f97316]"
            >
              หน้าหลัก
            </Link>
            <Link
              href="/patient-services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-[#f97316] bg-orange-50"
            >
              ศูนย์บริการผู้ป่วย (ศูนย์รักษาเฉพาะทาง)
            </Link>
            <button
              onClick={() => toggleDropdown("mobile-about")}
              className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50"
            >
              เกี่ยวกับ <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleDropdown("mobile-services")}
              className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50"
            >
              งานบริการ <ChevronDown className="w-4 h-4" />
            </button>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50"
            >
              ค้นหาแพทย์
            </Link>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50"
            >
              INTRANET
            </Link>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-orange-50"
            >
              ติดต่อ
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}


