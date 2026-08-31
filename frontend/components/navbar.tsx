"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* 1. แถบ Top Bar (ไม่ sticky - เลื่อนหายตามหน้าเว็บ) */}
      <div className="w-full bg-[#ff8c1a] text-white py-1.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm font-sans">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* เบอร์โทรศัพท์ฝั่งซ้าย */}
          <div className="flex items-center gap-2 font-medium">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>044-311856, 044-312699</span>
          </div>

          {/* Social Media & Maps Links ฝั่งขวา */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/pnnh.go.th/?_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1"
              aria-label="Facebook"
            >
              <Image
                src="/img/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="object-contain"
              />
            </a>
            <a
              href="https://page.line.me/388bkozc?openQrModal=true"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1 font-bold text-[11px] leading-none"
              aria-label="Line"
            >
              <Image
                src="/img/linelogo.png"
                alt="Line"
                width={20}
                height={20}
                className="object-contain"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCRJNFYMJhUnOLTbkA2vQqUw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1"
              aria-label="YouTube"
            >
              <Image
                src="/img/youtubelogo.png"
                alt="YouTube"
                width={20}
                height={20}
                className="object-contain"
              />
            </a>
            <a
              href="https://www.google.co.th/maps/place/%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%9B%E0%B8%B2%E0%B8%81%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2/@14.6807633,101.3996733,18z/data=!4m6!3m5!1s0x311c2b17943fd687:0x507a8f81c859f147!8m2!3d14.6806741!4d101.4000776!16s%2Fg%2F11j8_wkstf?hl=th&entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-1"
              aria-label="Map Location"
            >
              <Image
                src="/img/maplogo.png"
                alt="Map Location"
                width={20}
                height={20}
                className="object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* 2. เมนูหลัก Navbar สีขาว (Sticky ติดขอบบนเมื่อเลื่อนจอ) */}
      <nav className={`${kanit.className} sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs h-18 px-4 sm:px-6 lg:px-8 transition-shadow`}>
        <div className="max-w-7xl mx-auto flex h-full items-center justify-between">
          {/* โลโก้โรงพยาบาลปากช่องนานา */}
          <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/img/logopnnh.png"
                alt="โรงพยาบาลปากช่องนานา"
                width={100}
                height={100}
                className="object-contain"
              />
          </Link>

          {/* เมนูหลักบน Desktop */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-3 text-sm font-normal text-[#76757C]">
            {/* หน้าหลัก */}
            <li>
              <Link
                href="/"
                className={`px-3 py-2 rounded-md transition-all duration-200 block ${
                  pathname === "/"
                    ? "text-[#f97316]"
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
              <Link
                href="/about/vision-mission"
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-200 ${
                  pathname?.startsWith("/about")
                    ? "text-[#f97316] font-medium"
                    : "hover:text-[#f97316]"
                }`}
              >
                เกี่ยวกับ <ChevronDown className="w-4 h-4 stroke-[2]" />
              </Link>
              {activeDropdown === "about" && (
                <ul className="absolute left-0 top-full w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <li>
                    <Link
                      href="/about/history"
                      className="block px-4 py-2 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ประวัติโรงพยาบาล
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/vision-mission"
                      className="block px-4 py-2 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      วิสัยทัศน์ / พันธกิจ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/executives"
                      className="block px-4 py-2 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ผู้บริหารโรงพยาบาล
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/organization"
                      className="block px-4 py-2 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
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
                    ? "text-[#f97316] "
                    : "hover:text-[#f97316]"
                }`}
              >
                ศูนย์บริการผู้ป่วย <ChevronDown className="w-4 h-4 stroke-[2]" />
              </Link>
              {activeDropdown === "patient" && (
                <ul className="absolute left-0 top-full w-60 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <li>
                    <Link
                      href="/specialized-centers"
                      className="block px-4 py-2.5 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์รักษาเฉพาะทาง
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/health-checkup"
                      className="block px-4 py-2.5 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] font-medium transition-colors"
                    >
                      ศูนย์ตรวจสุขภาพ (หน้าหลัก)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/health-checkup/checkup-program"
                      className="block pl-7 pr-4 py-2 text-xs text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      • โปรแกรมตรวจสุขภาพ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/health-checkup/vaccine-program"
                      className="block pl-7 pr-4 py-2 text-xs text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      • โปรแกรมฉีดวัคซีน
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient-services?dept=emergency"
                      className="block px-4 py-2.5 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์อุบัติเหตุ-ฉุกเฉิน
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient-services?dept=internal"
                      className="block px-4 py-2.5 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์อายุรกรรม
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/patient-services?dept=surgery"
                      className="block px-4 py-2.5 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
                    >
                      ศูนย์ศัลยกรรม
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2.5 text-sm text-[#76757C] hover:bg-orange-50 hover:text-[#f97316] transition-colors"
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
              className="block px-4 py-2.5 rounded-lg text-base font-normal text-gray-800 hover:bg-orange-50 hover:text-[#f97316]"
            >
              หน้าหลัก
            </Link>
            <Link
              href="/patient-services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-normal text-[#f97316] bg-orange-50"
            >
              ศูนย์บริการผู้ป่วย (ศูนย์รักษาเฉพาะทาง)
            </Link>
            <button
              onClick={() => toggleDropdown("mobile-about")}
              className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg text-base font-normal text-gray-800 hover:bg-orange-50"
            >
              เกี่ยวกับ <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === "mobile-about" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "mobile-about" && (
              <div className="pl-6 space-y-1 bg-gray-50 py-2 rounded-lg">
                <Link
                  href="/about/history"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-[#f97316]"
                >
                  ประวัติโรงพยาบาล
                </Link>
                <Link
                  href="/about/vision-mission"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-[#f97316]"
                >
                  วิสัยทัศน์ / พันธกิจ
                </Link>
                <Link
                  href="/about/executives"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-[#f97316]"
                >
                  ผู้บริหารโรงพยาบาล
                </Link>
                <Link
                  href="/about/organization"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:text-[#f97316]"
                >
                  โครงสร้างองค์กร
                </Link>
              </div>
            )}
            <button
              onClick={() => toggleDropdown("mobile-services")}
              className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg text-base font-normal text-gray-800 hover:bg-orange-50"
            >
              งานบริการ <ChevronDown className="w-4 h-4" />
            </button>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-normal text-gray-800 hover:bg-orange-50"
            >
              ค้นหาแพทย์
            </Link>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-normal text-gray-800 hover:bg-orange-50"
            >
              INTRANET
            </Link>
            <Link
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-normal text-gray-800 hover:bg-orange-50"
            >
              ติดต่อ
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}


