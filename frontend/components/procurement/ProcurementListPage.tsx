"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  FileText,
  Download,
  CalendarClock,
  ClipboardList,
  Briefcase,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ProcurementItem {
  id: number;
  title: string;
  type: string;
  document_url: string;
  published_at: string;
  deadline_at: string | null;
}

type Variant = "procurement" | "job";

const CONFIG: Record<Variant, { heading: string; blurb: string; icon: typeof ClipboardList }> = {
  procurement: {
    heading: "ข่าวจัดซื้อจัดจ้าง",
    blurb:
      "ประกาศจัดซื้อจัดจ้าง ประกวดราคา ราคากลาง ผลผู้ชนะการเสนอราคา และแผนการจัดซื้อจัดจ้างของโรงพยาบาลปากช่องนานา",
    icon: ClipboardList,
  },
  job: {
    heading: "สมัครงาน / รับสมัครบุคลากร",
    blurb:
      "ประกาศรับสมัครงาน รายชื่อผู้มีสิทธิ์สอบ ผลการคัดเลือก และการขึ้นบัญชีผู้ผ่านการคัดเลือกของโรงพยาบาลปากช่องนานา",
    icon: Briefcase,
  },
};

const LIMIT = 10;

function formatThaiDate(value: string | null): string {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" });
}

export default function ProcurementListPage({ variant }: { variant: Variant }) {
  const cfg = CONFIG[variant];
  const [items, setItems] = useState<ProcurementItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/api/procurement?type=${variant}&page=${page}&limit=${LIMIT}`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.ok) {
          setItems(json.data);
          setTotal(json.total);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [variant, page]);

  const goToPage = (next: number) => {
    setLoading(true);
    setError(false);
    setPage(next);
  };

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div className="bg-gradient-to-b from-[#fffaf3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-5xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors">หน้าแรก</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-500">งานบริการ</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-orange-600 font-medium">{cfg.heading}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center shrink-0">
              <cfg.icon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {cfg.heading}
            </h1>
          </div>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mt-3"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">{cfg.blurb}</p>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            ไม่สามารถโหลดข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            ยังไม่มีประกาศในหมวดนี้
          </div>
        ) : (
          <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {items.map((item) => {
              const inner = (
                <div className="flex items-start gap-4 p-4 sm:p-5 group hover:bg-orange-50/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#f97316] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#f97316] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarClock className="w-3.5 h-3.5" />
                        ประกาศ {formatThaiDate(item.published_at)}
                      </span>
                      {item.deadline_at && (
                        <span className="flex items-center gap-1 text-red-500">
                          หมดเขต {formatThaiDate(item.deadline_at)}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.document_url && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-[#f97316] shrink-0 self-center">
                      <Download className="w-4 h-4" />
                      เอกสาร
                    </span>
                  )}
                </div>
              );

              return item.document_url ? (
                <a
                  key={item.id}
                  href={item.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={item.id}>{inner}</div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => goToPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="หน้าก่อนหน้า"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                  page === idx + 1
                    ? "bg-[#f97316] text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-orange-50"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="หน้าถัดไป"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
