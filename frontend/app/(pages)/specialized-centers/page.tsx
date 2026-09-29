"use client";
import "@/app/(pages)/pages.css";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Center {
  slug: string;
  title_th: string;
  icon_type?: string;
}

// =========================================================================
// กำหนดรูปไอคอนสำหรับแต่ละศูนย์ตามต้องการ (สามารถเปลี่ยนชื่อ Frame01, Frame02... ได้ที่นี่)
// =========================================================================
export const CENTER_ICON_MAP: Record<string, string> = {
  emergency: "/img/icon/Frame01.png",         // 1. ศูนย์อุบัติเหตุและฉุกเฉิน
  obgyn: "/img/icon/Frame02.png",             // 2. ศูนย์สุขภาพสตรี
  internal: "/img/icon/Frame02.png",          // 3. ศูนย์อายุรกรรม
  surgery: "/img/icon/Frame03.png",           // 4. ศูนย์ศัลยกรรม
  dental: "/img/icon/Frame03.png",            // 5. ศูนย์ทันตกรรม
  pediatrics: "/img/icon/Frame04.png",        // 6. ศูนย์กุมารเวชกรรม
  orthopedics: "/img/icon/Frame01.png",       // 7. ศูนย์กระดูกและข้อ
  "physical-therapy": "/img/icon/Frame01.png", // 8. ศูนย์กายภาพบำบัด
  rehab: "/img/icon/Frame04.png",             // 9. ศูนย์เวชศาสตร์ฟื้นฟู
  ent: "/img/icon/Frame01.png",               // 10. ศูนย์หู คอ จมูก
  eye: "/img/icon/Frame04.png",               // 11. ศูนย์จักษุ (ตา)
  thai: "/img/icon/Frame04.png",              // 12. นวดแผนไทย
};

function getCenterIconSrc(slug: string, index: number): string {
  if (CENTER_ICON_MAP[slug]) return CENTER_ICON_MAP[slug];
  const pad = String(index + 1).padStart(2, "0");
  return `/img/icon/Frame${pad}.png`;
}

export default function SpecializedCentersPage() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/treatment-centers")
      .then((r) => r.json())
      .then((json) => {
        if (json.ok && Array.isArray(json.data)) setCenters(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#fffaf3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">หน้าแรก</Link>
          <span>/</span>
          <Link href="/medical-services" className="hover:text-orange-500 transition-colors">บริการทางการแพทย์</Link>
          <span>/</span>
          <span className="text-orange-600 font-medium">ศูนย์การรักษาเฉพาะทาง</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            ศูนย์การรักษาเฉพาะทาง
          </h1>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mx-auto mt-3"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-[#f97316] rounded-full animate-spin" />
          </div>
        ) : centers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">ยังไม่มีข้อมูลศูนย์รักษาเฉพาะทาง</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-10 sm:gap-y-12 gap-x-6 sm:gap-x-8 md:gap-x-12 place-items-center">
            {centers.map((center, index) => (
              <Link
                key={center.slug}
                href={`/patient-services?dept=${center.slug}`}
                className="flex flex-col items-center text-center cursor-pointer w-full"
              >
                {/* แสดงเฉพาะรูปไอคอน ไม่มีวงกลมพื้นหลัง CSS ซ้อนทับ */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
                  <Image
                    src={getCenterIconSrc(center.slug, index)}
                    alt={center.title_th}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3 sm:mt-4 flex items-start justify-center w-full px-1 min-h-[2.5rem]">
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-snug tracking-tight text-center">
                    {center.title_th}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
