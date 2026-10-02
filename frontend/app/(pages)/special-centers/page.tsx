"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { CENTER_ICON_BY_SLUG } from "@/lib/centerView";

interface Center {
  slug: string;
  title_th: string;
  category: "special" | "specialized";
}

function CenterGrid({ centers, hrefFor }: { centers: Center[]; hrefFor: (c: Center) => string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8 md:gap-x-12 place-items-center">
      {centers.map((center) => {
        const Icon = CENTER_ICON_BY_SLUG[center.slug] || Stethoscope;
        return (
          <Link
            key={center.slug}
            href={hrefFor(center)}
            className="group flex flex-col items-center text-center cursor-pointer w-full"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] group-hover:from-[#f97316] group-hover:to-[#ea580c] flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border-2 border-white/20 shrink-0">
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 stroke-[1.5]" />
            </div>
            <div className="mt-3 sm:mt-4 flex items-start justify-center w-full px-1">
              <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 group-hover:text-[#f97316] transition-colors leading-snug tracking-tight text-center">
                {center.title_th}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function CentersPage() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/centers")
      .then((r) => r.json())
      .then((json) => {
        if (json.ok && Array.isArray(json.data)) setCenters(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const specialized = centers.filter((c) => c.category === "specialized");
  const special = centers.filter((c) => c.category === "special");

  return (
    <div className="bg-gradient-to-b from-[#fffaf3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">หน้าแรก</Link>
          <span>/</span>
          <Link href="/medical-services" className="hover:text-orange-500 transition-colors">บริการทางการแพทย์</Link>
          <span>/</span>
          <span className="text-orange-600 font-medium">ศูนย์การรักษา</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            ศูนย์การรักษา
          </h1>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mx-auto mt-3"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-[#f97316] rounded-full animate-spin" />
          </div>
        ) : centers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">ยังไม่มีข้อมูลศูนย์การรักษา</div>
        ) : (
          <div className="space-y-16 sm:space-y-20">
            {specialized.length > 0 && (
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-8 text-center sm:text-left">
                  ศูนย์การรักษาเฉพาะทาง
                </h2>
                <CenterGrid centers={specialized} hrefFor={(c) => `/patient-services?dept=${c.slug}`} />
              </section>
            )}
            {special.length > 0 && (
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-8 text-center sm:text-left">
                  ศูนย์รักษาพิเศษ (คลินิกเฉพาะโรค)
                </h2>
                <CenterGrid centers={special} hrefFor={(c) => `/special-centers/${c.slug}`} />
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
