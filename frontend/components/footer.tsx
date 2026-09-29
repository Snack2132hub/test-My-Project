"use client";

import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
        {/* คอลัมน์ที่ 1: โลโก้ + ที่อยู่โรงพยาบาล */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/img/logopnnh.png"
              alt="โรงพยาบาลปากช่องนานา"
              width={140}
              height={50}
              className="object-contain"
              style={{ height: "auto" }}
            />
          </Link>
          <div className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed space-y-0.5 pt-1">
            <p>400 โรงพยาบาลปากช่องนานา ถนนมิตรภาพ</p>
            <p>ตำบลปากช่อง อำเภอปากช่อง</p>
            <p>จังหวัดนครราชสีมา 30130</p>
          </div>
        </div>

        {/* คอลัมน์ที่ 2: OUR PAGES */}
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-3">
            OUR PAGES
          </h3>
          <ul className="text-xs sm:text-sm text-gray-600 font-light divide-y divide-gray-100">
            <li className="py-2.5">
              <Link href="/about/vision-mission" className="hover:text-[#ea580c] transition-colors block">
                เกี่ยวกับเรา
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/doctors" className="hover:text-[#ea580c] transition-colors block">
                บุคลากรแพทย์
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/jobs" className="hover:text-[#ea580c] transition-colors block">
                สมัครงาน
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/contact" className="hover:text-[#ea580c] transition-colors block">
                ติดต่อ
              </Link>
            </li>
          </ul>
        </div>

        {/* คอลัมน์ที่ 3: MEDICAL SERVICE */}
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-3">
            MEDICAL SERVICE
          </h3>
          <ul className="text-xs sm:text-sm text-gray-600 font-light divide-y divide-gray-100">
            <li className="py-2.5">
              <Link href="/patient-services" className="hover:text-[#ea580c] transition-colors block">
                บริการทางการแพทย์
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/specialized-centers" className="hover:text-[#ea580c] transition-colors block">
                ศูนย์การรักษาเฉพาะทาง
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/health-checkup" className="hover:text-[#ea580c] transition-colors block">
                ศูนย์ตรวจสุขภาพ
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/patient-services" className="hover:text-[#ea580c] transition-colors block">
                ห้องพิเศษ
              </Link>
            </li>
          </ul>
        </div>

        {/* คอลัมน์ที่ 4: ORTHER */}
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-3">
            ORTHER
          </h3>
          <ul className="text-xs sm:text-sm text-gray-600 font-light divide-y divide-gray-100">
            <li className="py-2.5">
              <Link href="/jobs" className="hover:text-[#ea580c] transition-colors block">
                กลุ่มงานทรัพยากรบุคคล
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/about/vision-mission" className="hover:text-[#ea580c] transition-colors block">
                กลุ่มงานยุทธศาสตร์และแผนงานโครงการ
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/procurement" className="hover:text-[#ea580c] transition-colors block">
                งานจัดซื้อจัดจ้าง
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/about/history" className="hover:text-[#ea580c] transition-colors block">
                งานจริยธรรมโรงพยาบาล
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
