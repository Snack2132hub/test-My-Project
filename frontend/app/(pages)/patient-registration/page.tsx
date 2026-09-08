"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ClipboardList, Phone, Clock, MapPin } from "lucide-react";

interface RegStep {
  id: number;
  title: string;
  description: string;
  display_order: number;
}

export default function PatientRegistrationPage() {
  const [steps, setSteps] = useState<RegStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/patient-registration")
      .then((r) => r.json())
      .then((json) => {
        if (json.ok && Array.isArray(json.data)) setSteps(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#fffaf3] via-[#fffdfa] to-white min-h-screen text-gray-800 pb-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50/80 border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors">หน้าแรก</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-500">ศูนย์บริการผู้ป่วย</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-orange-600 font-medium">ลงทะเบียนผู้ป่วยใหม่</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center shrink-0">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              ลงทะเบียนผู้ป่วยใหม่
            </h1>
          </div>
          <div className="w-20 h-1 bg-[#f97316] rounded-full mt-3"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
            ขั้นตอนการทำบัตรและลงทะเบียนสำหรับผู้ที่มารับบริการที่โรงพยาบาลปากช่องนานาเป็นครั้งแรก
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-2xl border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : steps.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            ยังไม่มีข้อมูลขั้นตอนการลงทะเบียน
          </div>
        ) : (
          <ol className="space-y-4">
            {steps.map((step, idx) => (
              <li
                key={step.id}
                className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-[#f97316] text-white font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900">{step.title}</h3>
                  {step.description && (
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {step.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* Contact / hours */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-orange-100 shadow-sm">
            <Clock className="w-5 h-5 text-[#f97316] shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-800">เวลาทำบัตร</p>
              <p className="text-xs text-gray-500 mt-0.5">ในเวลาราชการ 07.00 – 16.00 น.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-orange-100 shadow-sm">
            <MapPin className="w-5 h-5 text-[#f97316] shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-800">จุดทำบัตร</p>
              <p className="text-xs text-gray-500 mt-0.5">อาคารผู้ป่วยนอก ชั้น 1 งานเวชระเบียน</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-orange-100 shadow-sm">
            <Phone className="w-5 h-5 text-[#f97316] shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-800">สอบถามเพิ่มเติม</p>
              <p className="text-xs text-gray-500 mt-0.5">044-311383, 044-311855</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
