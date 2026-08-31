"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <footer className={`${kanit.className} bg-white border-t-4 border-[#00bba7] pt-14 pb-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr_0.9fr_1.1fr] gap-10 md:gap-8">
        {/* คอลัมน์ที่ 1: โลโก้ + เบอร์โทร + ปุ่มโซเชียลสีส้ม */}
         <div className="flex flex-col space-y-4">
          {/* โลโก้โรงพยาบาล */}
          <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/img/logopnnh.png"
                alt="โรงพยาบาลปากช่องนานา"
                width={120}
                height={120}
                className="object-contain"
              />
          </Link>

          {/* เบอร์โทรศัพท์ */}
          <div className="flex items-center gap-2 text-[#ea580c] font-medium text-base pt-2">
            <Phone className="w-5 h-5 fill-[#ea580c] stroke-none" />
            <span>โทร : 044-311856</span>
          </div>

          <div className="w-full h-px bg-gray-200 my-1 max-w-[280px]" />

          
        </div>

        {/* คอลัมน์ที่ 2: OUR PAGES */}
         <div className="flex flex-col space-y-4">
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
         <div className="flex flex-col space-y-4">
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
         <div className="flex flex-col space-y-4">
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

