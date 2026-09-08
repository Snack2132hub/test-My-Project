"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Clock, Stethoscope, UserRound, CalendarDays, Phone } from "lucide-react";

interface AfterHoursClinic {
  id: number;
  clinic_name: string;
  specialist: string;
  doctor_name: string;
  schedule: string;
  phone: string;
  display_order: number;
}

export default function AfterHoursClinicPage() {
  const [clinics, setClinics] = useState<AfterHoursClinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/after-hours-clinic")
      .then((r) => r.json())
      .then((json) => {
        if (json.ok && Array.isArray(json.data)) setClinics(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#fffaf3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-5xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors">หน้าแรก</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-500">งานบริการ</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-orange-600 font-medium">คลินิกพิเศษนอกเวลา</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            คลินิกพิเศษนอกเวลา
          </h1>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mt-3"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
            บริการตรวจรักษาโดยแพทย์เฉพาะทางนอกเวลาราชการ เพื่อความสะดวกของผู้รับบริการที่ไม่สามารถมาในเวลาปกติได้
            สามารถตรวจสอบตารางออกตรวจและติดต่อนัดหมายได้ตามรายการด้านล่าง
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: CalendarDays, title: "วันให้บริการ", desc: "จันทร์ – ศุกร์ (นอกเวลาราชการ)" },
            { icon: Clock, title: "เวลาให้บริการ", desc: "16.00 – 20.00 น." },
            { icon: Stethoscope, title: "ค่าบริการเริ่มต้น", desc: "350 บาท (ไม่รวมค่ายาและค่าตรวจพิเศษ)" },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-sm border border-orange-100">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{c.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Clinic list */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">ตารางคลินิกและแพทย์ผู้ออกตรวจ</h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : clinics.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            ยังไม่มีข้อมูลคลินิกพิเศษนอกเวลาในขณะนี้
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-orange-50 text-gray-600 text-xs uppercase">
                  <tr>
                    <th className="py-3 px-4">คลินิก</th>
                    <th className="py-3 px-4">สาขา / ความเชี่ยวชาญ</th>
                    <th className="py-3 px-4">แพทย์ผู้ออกตรวจ</th>
                    <th className="py-3 px-4">วัน–เวลา</th>
                    <th className="py-3 px-4">ติดต่อ / นัดหมาย</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {clinics.map((c) => (
                    <tr key={c.id} className="hover:bg-orange-50/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">{c.clinic_name}</td>
                      <td className="py-3 px-4 text-gray-700">{c.specialist || "-"}</td>
                      <td className="py-3 px-4 text-gray-700">{c.doctor_name || "-"}</td>
                      <td className="py-3 px-4 text-gray-700">{c.schedule || "-"}</td>
                      <td className="py-3 px-4 text-gray-700">{c.phone || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {clinics.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <p className="font-bold text-gray-900">{c.clinic_name}</p>
                  <div className="mt-2 space-y-1.5 text-sm text-gray-600">
                    {c.specialist && (
                      <p className="flex items-center gap-2"><Stethoscope className="w-4 h-4 text-[#f97316] shrink-0" />{c.specialist}</p>
                    )}
                    {c.doctor_name && (
                      <p className="flex items-center gap-2"><UserRound className="w-4 h-4 text-[#f97316] shrink-0" />{c.doctor_name}</p>
                    )}
                    {c.schedule && (
                      <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#f97316] shrink-0" />{c.schedule}</p>
                    )}
                    {c.phone && (
                      <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#f97316] shrink-0" />{c.phone}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="mt-8 text-xs text-gray-400">
          * ตารางออกตรวจอาจมีการเปลี่ยนแปลง กรุณาโทรสอบถามก่อนเข้ารับบริการ
        </p>
      </div>
    </div>
  );
}
