"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Clock,
  Phone,
  Calendar,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  CheckCircle2,
  Award,
  Building,
  Info,
} from "lucide-react";
import { type UICenter, type UIDoctor, toUIDoctor } from "@/lib/centerView";

interface CenterViewProps {
  centers: UICenter[];
  selectedSlug: string;
  onSelectCenter: (slug: string) => void;
  loading: boolean;
  sidebarHeading: string;
  pageHeading: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
}

export default function CenterView({
  centers,
  selectedSlug,
  onSelectCenter,
  loading,
  sidebarHeading,
  pageHeading,
  breadcrumbLabel,
  breadcrumbHref,
}: CenterViewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [centerDoctors, setCenterDoctors] = useState<UIDoctor[]>([]);

  const currentCenter = centers.find((c) => c.id === selectedSlug) || centers[0];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentSlideIndex(0);
  }, [selectedSlug]);

  const activeDoctorDept = currentCenter?.doctorDepartment;
  useEffect(() => {
    if (!activeDoctorDept) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCenterDoctors([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/doctors?department=${encodeURIComponent(activeDoctorDept)}`)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) {
          setCenterDoctors(json.ok && Array.isArray(json.data) ? json.data.map(toUIDoctor) : []);
        }
      })
      .catch(() => {
        if (!cancelled) setCenterDoctors([]);
      });
    return () => {
      cancelled = true;
    };
  }, [activeDoctorDept]);

  if (loading || !currentCenter) {
    return (
      <div className="w-full bg-slate-50 min-h-screen p-16 text-center text-gray-500">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  const nextSlide = () =>
    setCurrentSlideIndex((prev) => (prev + 1) % currentCenter.banners.length);
  const prevSlide = () =>
    setCurrentSlideIndex((prev) => (prev === 0 ? currentCenter.banners.length - 1 : prev - 1));

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans pb-16">
      {/* 1. TOP HEADER BREADCRUMB BANNER */}
      <section className="relative bg-linear-to-r from-teal-900 via-teal-800 to-emerald-900 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00bba7_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-4">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-teal-200 font-medium bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
            <Link href="/" className="hover:text-white transition-colors">หน้าหลัก</Link>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <Link href={breadcrumbHref} className="text-teal-100 font-semibold hover:text-white transition-colors">
              {breadcrumbLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-orange-400 font-bold">{currentCenter.titleTh}</span>
          </nav>

          <div className="space-y-2 pt-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f97316] drop-shadow-sm tracking-tight">
              {pageHeading}
            </h1>
            <p className="text-sm sm:text-base text-teal-100 max-w-2xl mx-auto font-light">
              ให้บริการตรวจ วินิจฉัย และรักษาพยาบาลด้วยทีมแพทย์เฉพาะทาง พร้อมอุปกรณ์ทางการแพทย์ทันสมัย
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR */}
          <aside className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden sticky top-6">
            <div className="bg-linear-to-r from-[#ea580c] to-[#f97316] p-4 text-white font-bold text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-white" />
              <span>{sidebarHeading}</span>
            </div>

            <div className="p-2 divide-y divide-gray-100">
              {centers.map((item) => {
                const IconComponent = item.icon;
                const isSelected = item.id === currentCenter.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectCenter(item.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 text-left font-semibold text-sm group ${
                      isSelected
                        ? "bg-[#ea580c] text-white shadow-md scale-[1.01]"
                        : "text-gray-700 hover:bg-orange-50 hover:text-[#ea580c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-orange-100 text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="leading-snug">{item.titleTh}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? "text-white translate-x-1"
                          : "text-gray-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="m-3 p-4 bg-red-50 rounded-xl border border-red-100 text-red-900 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-red-700 text-sm">
                <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
                <span>สายด่วนอุบัติเหตุ 24 ชม.</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                กรณีอุบัติเหตุหรือผู้ป่วยวิกฤตฉุกเฉิน ติดต่อศูนย์กู้ชีพ รพ.ปากช่องนานา
              </p>
              <a
                href="tel:044311856"
                className="inline-flex items-center justify-center gap-2 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-xs shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
                <span>โทร 044-311856</span>
              </a>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCenter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* SLIDER + HEADER */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-900">
                    <Image
                      src={currentCenter.banners[currentSlideIndex]}
                      alt={currentCenter.titleTh}
                      fill
                      priority
                      className="object-cover transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                    {currentCenter.banners.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                          aria-label="Previous Slide"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                          aria-label="Next Slide"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      {currentCenter.titleEn && (
                        <span className="inline-block px-3 py-1 bg-[#ea580c] text-white text-xs font-bold rounded-full mb-1 uppercase tracking-wider">
                          {currentCenter.titleEn}
                        </span>
                      )}
                      <h2 className="text-2xl sm:text-3xl font-extrabold drop-shadow-md">
                        {currentCenter.titleTh}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-2xl font-light">
                        {currentCenter.highlightText}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-6 h-6 text-[#ea580c] shrink-0 mt-0.5" />
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {currentCenter.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                        <Clock className="w-5 h-5 text-teal-600 shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-bold text-gray-800 block">เวลาทำการหลัก</span>
                          <span className="text-teal-700 font-medium">{currentCenter.serviceHours.regular}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <Phone className="w-5 h-5 text-[#ea580c] shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-bold text-gray-800 block">เบอร์ติดต่อตรง</span>
                          <span className="text-[#ea580c] font-semibold">
                            044-311856 ต่อ {currentCenter.contactExt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SERVICES */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">ขอบเขตการให้บริการทางการแพทย์</h3>
                      <p className="text-xs text-gray-500">Medical Services &amp; Care Scope</p>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentCenter.services.map((srv, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-gray-700 text-sm font-medium hover:bg-orange-50/50 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>

                  {currentCenter.serviceHours.afterHours && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                      <div>
                        <span className="font-bold block text-amber-950">
                          บริการคลินิกพิเศษนอกเวลาราชการ (After-Hours Clinic)
                        </span>
                        <span>{currentCenter.serviceHours.afterHours}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* MEDICAL TEAM */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">ทีมแพทย์เฉพาะทางประจำศูนย์</h3>
                        <p className="text-xs text-gray-500">Specialized Medical Doctors</p>
                      </div>
                    </div>
                  </div>

                  {centerDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {centerDoctors.map((doc) => (
                        <Link
                          key={doc.id}
                          href={`/doctors/${doc.id}`}
                          className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-slate-50 hover:shadow-md hover:border-orange-200 transition-all"
                        >
                          <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                            {doc.image ? (
                              <Image src={doc.image} alt={doc.name} fill className="object-cover object-top" />
                            ) : (
                              <UserCheck className="w-8 h-8 text-slate-300" strokeWidth={1.5} />
                            )}
                          </div>
                          <div className="space-y-1.5 flex-1">
                            <h4 className="font-bold text-gray-900 text-base leading-snug">{doc.name}</h4>
                            <span className="inline-block px-2.5 py-0.5 bg-teal-100 text-teal-800 text-xs font-semibold rounded-md">
                              {doc.title}
                            </span>
                            <p className="text-xs text-gray-600 font-medium">
                              <span className="text-gray-400">เชี่ยวชาญ:</span> {doc.specialty}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
                              <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
                              <span>{doc.schedule}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-sm text-gray-400">
                      ดูรายชื่อแพทย์ทั้งหมดได้ที่{" "}
                      <Link href="/doctors" className="text-[#ea580c] font-medium hover:underline">
                        หน้าบุคลากรแพทย์
                      </Link>
                    </div>
                  )}
                </div>

                {/* FACILITIES */}
                {currentCenter.facilities.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">เครื่องมือและสิ่งอำนวยความสะดวก</h3>
                        <p className="text-xs text-gray-500">Facilities &amp; Modern Medical Equipment</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentCenter.facilities.map((fac, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 bg-teal-50/40 text-gray-800 text-sm font-semibold"
                        >
                          <Building className="w-4 h-4 text-teal-600 shrink-0" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-linear-to-r from-[#ea580c] to-[#c2410c] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                  <div className="space-y-2 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold">ต้องการทำนัดหมายหรือสอบถามข้อมูลเพิ่มเติม?</h3>
                    <p className="text-xs sm:text-sm text-orange-100 font-light">
                      เปิดให้บริการจองคิวตรวจออนไลน์ล่วงหน้า เพื่อความสะดวกและไม่ต้องรอนาน
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <a
                      href="tel:044311856"
                      className="w-full sm:w-auto px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>โทร 044-311856</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* APPOINTMENT MODAL */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 border border-gray-100">
            <button
              onClick={() => setIsAppointmentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#ea580c] uppercase">{currentCenter.titleTh}</span>
              <h3 className="text-xl font-bold text-gray-900">ลงทะเบียนนัดหมายตรวจล่วงหน้า</h3>
              <p className="text-xs text-gray-500">
                กรอกข้อมูลเบื้องต้น เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันนัดหมาย
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`บันทึกคำขอนัดหมายตรวจ ณ ${currentCenter.titleTh} เรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับ`);
                setIsAppointmentModalOpen(false);
              }}
              className="space-y-4 text-sm"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-1">ชื่อ-นามสกุล ผู้ป่วย *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น นายสมชาย ใจดี"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">เบอร์โทรศัพท์ติดต่อ *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">วันที่ต้องการรับบริการ</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">อาการเบื้องต้น / ข้อความเพิ่มเติม</label>
                <textarea
                  rows={3}
                  placeholder="ระบุอาการเบื้องต้น..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAppointmentModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs shadow-md transition-colors"
                >
                  ส่งข้อมูลนัดหมาย
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
