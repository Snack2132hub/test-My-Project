"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-4 border-[#00bba7] pt-14 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        {/* คอลัมน์ที่ 1: โลโก้ + เบอร์โทร + ปุ่มโซเชียลสีส้ม */}
        <div className="md:col-span-4 flex flex-col space-y-5">
          {/* โลโก้โรงพยาบาล */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 relative flex items-center justify-center">
              <Image
                src="/img/indexbanner/herobannertest01.png"
                alt="โรงพยาบาลปากช่องนานา"
                width={48}
                height={48}
                className="object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#ea580c] leading-tight">
                โรงพยาบาล
              </span>
              <span className="font-bold text-xl text-[#ea580c] leading-none">
                ปากช่องนานา
              </span>
            </div>
          </Link>

          {/* เบอร์โทรศัพท์ */}
          <div className="flex items-center gap-2 text-[#ea580c] font-medium text-base pt-2">
            <Phone className="w-5 h-5 fill-[#ea580c] stroke-none" />
            <span>โทร : 044-311856</span>
          </div>

          <div className="w-full h-px bg-gray-200 my-1 max-w-[280px]" />

          {/* ปุ่มโซเชียลสี่เหลี่ยมสีส้ม 4 ปุ่ม */}
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-md bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center font-bold text-lg transition-colors shadow-xs"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-md bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center font-bold text-xs transition-colors shadow-xs"
              aria-label="Line"
            >
              LINE
            </a>
            <a
              href="https://youtu.be/XxGFqrPq7lk?si=h2hWjMh4_kSWRcrs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-md bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center font-bold text-xs transition-colors shadow-xs"
              aria-label="YouTube"
            >
              YT
            </a>
            <a
              href="/patient-services"
              className="w-10 h-10 rounded-md bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Patient Services"
            >
              <User className="w-5 h-5 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* คอลัมน์ที่ 2: OUR PAGES */}
        <div className="md:col-span-2.5 flex flex-col space-y-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wider uppercase">
              OUR PAGES
            </h3>
            <div className="w-10 h-1 bg-[#ea580c] mt-1.5 rounded-full" />
          </div>
          <ul className="space-y-3 text-sm text-gray-600 font-medium pt-1 divide-y divide-gray-100">
            <li className="pt-2">
              <Link href="#" className="hover:text-[#ea580c] transition-colors block">
                เกี่ยวกับ
              </Link>
            </li>
            <li className="pt-3">
              <Link href="/patient-services" className="hover:text-[#ea580c] transition-colors block">
                บริการ
              </Link>
            </li>
            <li className="pt-3">
              <Link href="#" className="hover:text-[#ea580c] transition-colors block">
                แพทย์
              </Link>
            </li>
            <li className="pt-3">
              <Link href="#" className="hover:text-[#ea580c] transition-colors block">
                ข่าวสาร
              </Link>
            </li>
          </ul>
        </div>

        {/* คอลัมน์ที่ 3: SERVICE */}
        <div className="md:col-span-2.5 flex flex-col space-y-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wider uppercase">
              SERVICE
            </h3>
            <div className="w-10 h-1 bg-[#ea580c] mt-1.5 rounded-full" />
          </div>
          <ul className="space-y-3 text-sm text-gray-600 font-medium pt-1 divide-y divide-gray-100">
            <li className="pt-2">
              <Link href="#" className="hover:text-[#ea580c] transition-colors block">
                สมัครงาน
              </Link>
            </li>
            <li className="pt-3">
              <Link href="#" className="hover:text-[#ea580c] transition-colors block">
                จัดซื้อ จัดจ้าง
              </Link>
            </li>
            <li className="pt-3">
              <Link href="#" className="hover:text-[#ea580c] transition-colors block">
                งานบุคคล
              </Link>
            </li>
            <li className="pt-3">
              <Link href="#" className="hover:text-[#ea580c] transition-colors block">
                งานแผนยุทธศาสตร์
              </Link>
            </li>
          </ul>
        </div>

        {/* คอลัมน์ที่ 4: SERVICE DEPARTMENT */}
        <div className="md:col-span-3 flex flex-col space-y-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wider uppercase">
              SERVICE DEPARTMENT
            </h3>
            <div className="w-10 h-1 bg-[#ea580c] mt-1.5 rounded-full" />
          </div>
          <ul className="space-y-3 text-sm text-gray-600 font-medium pt-1 divide-y divide-gray-100">
            <li className="pt-2">
              <Link href="/patient-services?dept=internal" className="hover:text-[#ea580c] transition-colors block">
                อายุรกรรม
              </Link>
            </li>
            <li className="pt-3">
              <Link href="/patient-services?dept=surgery" className="hover:text-[#ea580c] transition-colors block">
                ศัลยกรรม
              </Link>
            </li>
            <li className="pt-3">
              <Link href="/patient-services?dept=dental" className="hover:text-[#ea580c] transition-colors block">
                ทันตกรรม
              </Link>
            </li>
            <li className="pt-3">
              <Link href="/patient-services?dept=thai" className="hover:text-[#ea580c] transition-colors block">
                แพทย์แผนไทย
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

