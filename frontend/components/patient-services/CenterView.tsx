"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Phone,
  ChevronRight,
  ChevronLeft,
  Building,
  UserCheck,
} from "lucide-react";
import { type UICenter, type UIDoctor, toUIDoctor } from "@/lib/centerView";
import { BASE_PROMOTIONS, type PromotionItem } from "@/lib/promotionsData";

interface CenterViewProps {
  centers: UICenter[];
  selectedSlug: string;
  onSelectCenter: (slug: string) => void;
  loading: boolean;
  sidebarHeading?: string;
  pageHeading?: string;
  breadcrumbLabel?: string;
  breadcrumbHref?: string;
  showSidebar?: boolean;
}

export default function CenterView({
  centers,
  selectedSlug,
  onSelectCenter,
  loading,
  sidebarHeading = "ศูนย์รักษาเฉพาะทาง",
  breadcrumbLabel = "ศูนย์รักษาเฉพาะทาง",
  breadcrumbHref = "/specialized-centers",
  showSidebar = true,
}: CenterViewProps) {
  const [centerDoctors, setCenterDoctors] = useState<UIDoctor[]>([]);
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [promoPage, setPromoPage] = useState(0);
  const [doctorSlideOffset, setDoctorSlideOffset] = useState(0);

  const currentCenter = centers.find((c) => c.id === selectedSlug) || centers[0];

  // Randomize promotions on client mount or when center changes
  useEffect(() => {
    // Shuffle promotions randomly as requested
    const shuffled = [...BASE_PROMOTIONS].sort(() => Math.random() - 0.5);
    setPromotions(shuffled);
    setPromoPage(0);
  }, [selectedSlug]);

  // Fetch doctors for current center's department
  const activeDoctorDept = currentCenter?.doctorDepartment;
  useEffect(() => {
    if (!activeDoctorDept) {
      setCenterDoctors([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/doctors?department=${encodeURIComponent(activeDoctorDept)}`)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) {
          const list: UIDoctor[] = json.ok && Array.isArray(json.data) ? json.data.map(toUIDoctor) : [];

          // For OBGYN / Women's health center, ensure exact ordering matching the design image:
          // 1. พญ.ปนัดดา 2. นพ.บุญชัย 3. พญ.ธัญญารัตน์ 4. นพ.ธนกร 5. พญ.ขนิษฐา
          if (currentCenter.id === "obgyn") {
            const obOrder = [
              "ปนัดดา",
              "บุญชัย",
              "ธัญญารัตน์",
              "ธนกร",
              "ขนิษฐา",
              "วริศรา",
            ];
            list.sort((a, b) => {
              const idxA = obOrder.findIndex((name) => a.name.includes(name));
              const idxB = obOrder.findIndex((name) => b.name.includes(name));
              if (idxA !== -1 && idxB !== -1) return idxA - idxB;
              if (idxA !== -1) return -1;
              if (idxB !== -1) return 1;
              return 0;
            });
          }

          setCenterDoctors(list);
          setDoctorSlideOffset(0);
        }
      })
      .catch(() => {
        if (!cancelled) setCenterDoctors([]);
      });
    return () => {
      cancelled = true;
    };
  }, [activeDoctorDept, currentCenter?.id]);

  // Pagination for promotions (6 per page: 2 rows of 3 columns)
  const PROMOS_PER_PAGE = 6;
  const totalPromoPages = Math.max(1, Math.ceil(promotions.length / PROMOS_PER_PAGE));
  const currentPromos = useMemo(() => {
    const start = promoPage * PROMOS_PER_PAGE;
    return promotions.slice(start, start + PROMOS_PER_PAGE);
  }, [promotions, promoPage]);

  // Doctors pagination/carousel (5 visible cards)
  const VISIBLE_DOCTORS = 5;
  const maxDoctorOffset = Math.max(0, centerDoctors.length - VISIBLE_DOCTORS);
  const nextDoctorSlide = () => {
    setDoctorSlideOffset((prev) => (prev < maxDoctorOffset ? prev + 1 : 0));
  };
  const prevDoctorSlide = () => {
    setDoctorSlideOffset((prev) => (prev > 0 ? prev - 1 : maxDoctorOffset));
  };

  const visibleDoctors = useMemo(() => {
    if (centerDoctors.length <= VISIBLE_DOCTORS) return centerDoctors;
    return centerDoctors.slice(doctorSlideOffset, doctorSlideOffset + VISIBLE_DOCTORS);
  }, [centerDoctors, doctorSlideOffset]);

  // Center description paragraphs
  const descriptionParagraphs = useMemo(() => {
    if (!currentCenter) return [];
    if (currentCenter.id === "obgyn") {
      return [
        "ศูนย์สุขภาพสตรี โรงพยาบาล ปากช่องนานา ให้บริการตรวจวินิจฉัย ป้องกัน และรักษาโรคของสตรี การผ่าตัดทางนรีเวชโดยการส่องกล้องด้วยเทคโนโลยีที่ทันสมัย และมีประสิทธิภาพ บริการรับฝากครรภ์และการคลอดบุตร ตรวจวินิจฉัยความผิดปกติของทารกในครรภ์ ตลอดจนรักษาภาวะมีบุตรยาก",
        "ศูนย์สุขภาพสตรี โรงพยาบาล ปากช่องนานา ให้บริการตรวจวินิจฉัย ป้องกัน และรักษาโรคของสตรี การผ่าตัดทางนรีเวชโดยการส่องกล้องด้วยเทคโนโลยีที่ทันสมัย และมีประสิทธิภาพ บริการรับฝากครรภ์และการคลอดบุตร ตรวจวินิจฉัยความผิดปกติของทารกในครรภ์ ตลอดจนรักษาภาวะมีบุตรยาก",
        "ศูนย์สุขภาพสตรี โรงพยาบาล ปากช่องนานา ให้บริการตรวจวินิจฉัย ป้องกัน และรักษาโรคของสตรี การผ่าตัดทางนรีเวชโดยการส่องกล้องด้วยเทคโนโลยีที่ทันสมัย และมีประสิทธิภาพ บริการรับฝากครรภ์และการคลอดบุตร ตรวจวินิจฉัยความผิดปกติของทารกในครรภ์ ตลอดจนรักษาภาวะมีบุตรยาก",
        "ศูนย์สุขภาพสตรี โรงพยาบาล ปากช่องนานา ให้บริการตรวจวินิจฉัย ป้องกัน และรักษาโรคของสตรี การผ่าตัดทางนรีเวชโดยการส่องกล้องด้วยเทคโนโลยีที่ทันสมัย และมีประสิทธิภาพ บริการรับฝากครรภ์และการคลอดบุตร ตรวจวินิจฉัยความผิดปกติของทารกในครรภ์ ตลอดจนรักษาภาวะมีบุตรยาก",
      ];
    }
    // Default paragraphs for other centers
    const base = currentCenter.description;
    return [
      base,
      `${currentCenter.titleTh} มุ่งเน้นการดูแลรักษาตามมาตรฐานสากล โดยทีมแพทย์ผู้เชี่ยวชาญเฉพาะทาง พร้อมด้วยเครื่องมือและเทคโนโลยีทางการแพทย์ที่ทันสมัย เพื่อให้การตรวจวินิจฉัยและรักษาเป็นไปอย่างแม่นยำและรวดเร็ว`,
      `ให้บริการอย่างอบอุ่น ดุจญาติมิตร ด้วยความใส่ใจในทุกรายละเอียดของผู้ป่วย พร้อมให้คำปรึกษาและวางแผนการรักษาที่เหมาะสมที่สุดสำหรับผู้รับบริการแต่ละท่าน`,
    ];
  }, [currentCenter]);

  // Doctor department heading label
  const doctorDepartmentLabel = useMemo(() => {
    if (!currentCenter) return "เฉพาะทาง";
    if (currentCenter.id === "obgyn") return "สูตินรีเวช";
    if (currentCenter.doctorDepartment) {
      return currentCenter.doctorDepartment.replace(/^(แพทย์|แผนก)/, "");
    }
    return currentCenter.titleTh.replace(/^ศูนย์/, "");
  }, [currentCenter]);

  if (loading || !currentCenter) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex items-center justify-center text-gray-500">
        กำลังโหลดข้อมูลศูนย์บริการผู้ป่วย...
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-gray-800 pb-20 font-sans">
      {/* ── BREADCRUMBS ── */}
      <div className="bg-[#f8f9fa] border-b border-gray-200/80 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            หน้าแรก
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/medical-services" className="hover:text-orange-500 transition-colors">
            บริการทางการแพทย์
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={breadcrumbHref} className="hover:text-orange-500 transition-colors">
            {breadcrumbLabel}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#f97316] font-medium">{currentCenter.titleTh}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className={showSidebar ? "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" : "w-full"}>
          {/* ═════════════════════════════════════════════════════════ */}
          {/* LEFT SIDEBAR: แสดงเมื่อ showSidebar = true                  */}
          {/* ═════════════════════════════════════════════════════════ */}
          {showSidebar && (
            <aside className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#ea580c] to-[#f97316] p-4 text-white font-bold text-base sm:text-lg flex items-center gap-2 shadow-xs">
                <Building className="w-5 h-5 text-white" />
                <span>{sidebarHeading}</span>
              </div>

              <div className="p-2 divide-y divide-gray-100 max-h-[calc(100vh-220px)] overflow-y-auto">
                {centers.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = item.id === currentCenter.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectCenter(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left font-semibold text-xs sm:text-sm group ${
                        isSelected
                          ? "bg-[#ea580c] text-white shadow-sm"
                          : "text-gray-700 hover:bg-orange-50 hover:text-[#ea580c]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
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
                        className={`w-4 h-4 transition-transform shrink-0 ${
                          isSelected
                            ? "text-white translate-x-1"
                            : "text-gray-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Emergency 24h Box */}
              <div className="m-3 p-3.5 bg-red-50 rounded-xl border border-red-100 text-red-900 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-red-700 text-xs sm:text-sm">
                  <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse shrink-0" />
                  <span>สายด่วนอุบัติเหตุ 24 ชม.</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  กรณีอุบัติเหตุหรือผู้ป่วยวิกฤตฉุกเฉิน ติดต่อศูนย์กู้ชีพ รพ.ปากช่องนานา
                </p>
                <a
                  href="tel:044311856"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-xs shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 fill-white" />
                  <span>โทร 044-311856</span>
                </a>
              </div>
            </aside>
          )}

          {/* ═════════════════════════════════════════════════════════ */}
          {/* MAIN CONTENT AREA: 5 SECTIONS                              */}
          {/* ═════════════════════════════════════════════════════════ */}
          <main className={`${showSidebar ? "lg:col-span-8 xl:col-span-9" : "w-full"} space-y-10 sm:space-y-12`}>
            {/* ────────────────────────────────────────────────────── */}
            {/* SECTION 1: Banner (มีอันเดียวฟิกไว้เลย ตามรูปที่ 2)      */}
            {/* ────────────────────────────────────────────────────── */}
            <section className="relative w-full aspect-[2.4/1] min-h-[170px] sm:min-h-[220px] md:min-h-[280px] max-h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 border border-gray-200/70 shadow-sm">
              <Image
                src="/img/corporate-businessmen-shaking-hands 1.png"
                alt="บริการผู้ป่วย โรงพยาบาลปากช่องนานา"
                fill
                priority
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </section>

            {/* ────────────────────────────────────────────────────── */}
            {/* SECTION 2: ชื่อศูนย์ (หัวข้อหลัก)+ รายละเอียดศูนย์ (ตามรูปที่ 3) */}
            {/* ────────────────────────────────────────────────────── */}
            <section className="space-y-4">
              {/* Heading with orange underline */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  <span className="inline-block border-b-4 border-[#f97316] pb-1.5">
                    {currentCenter.titleTh}
                  </span>
                </h1>
              </div>

              {/* Description paragraphs */}
              <div className="text-gray-600 text-sm sm:text-base leading-relaxed sm:leading-loose space-y-3 sm:space-y-4 pt-2 text-justify sm:text-left font-normal">
                {descriptionParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>

            {/* ────────────────────────────────────────────────────── */}
            {/* SECTION 3: คลินิกภายในศูนย์สุขภาพ(ตามชื่อแผนก) (ตามรูปที่ 4) */}
            {/* ────────────────────────────────────────────────────── */}
            <section className="space-y-3 pt-1">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                ภายใน{currentCenter.titleTh} มีคลินิกร่วมด้วยทั้งหมด {currentCenter.clinics?.length || 0} คลินิก
              </h2>
              <ol className="space-y-1 text-sm sm:text-base text-gray-600 font-normal pl-1">
                {currentCenter.clinics?.map((clinic, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-gray-500 font-normal w-5 shrink-0">{idx + 1}.</span>
                    <span>{clinic}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* ────────────────────────────────────────────────────── */}
            {/* SECTION 4: Promotion แบบแรนดอม ดึงมาจากหน้าโปรโมชั่น     */}
            {/* (2 แถว แถวละ 3 การ์ด รวม 6 รายการ พร้อม pagination dots)  */}
            {/* ────────────────────────────────────────────────────── */}
            <section className="space-y-6 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentPromos.map((promo, idx) => (
                  <div
                    key={`${promo.id}-${idx}`}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-gray-100 border border-gray-200/90 shadow-2xs group-hover:shadow-md transition-all duration-300">
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="pt-2.5">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-1 group-hover:text-[#f97316] transition-colors leading-snug">
                        {promo.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 font-light">{promo.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots Controls: < ● ● ● > */}
              <div className="flex items-center justify-center gap-2 pt-3">
                <button
                  onClick={() => setPromoPage((p) => Math.max(0, p - 1))}
                  disabled={promoPage === 0}
                  className="p-1 rounded-full text-gray-400 hover:text-[#f97316] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                  aria-label="Previous Promotions Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPromoPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPromoPage(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      promoPage === idx
                        ? "bg-[#f97316] scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
                <button
                  onClick={() => setPromoPage((p) => Math.min(totalPromoPages - 1, p + 1))}
                  disabled={promoPage >= totalPromoPages - 1}
                  className="p-1 rounded-full text-gray-400 hover:text-[#f97316] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                  aria-label="Next Promotions Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* ────────────────────────────────────────────────────── */}
            {/* SECTION 5: แพทย์ที่อยู่ในศูนย์ (แสดงแค่รูป ชื่อ ตำแหน่ง)   */}
            {/* (ตามรูปที่ 6: หัวข้อขีดเส้นใต้ส้ม, ปุ่มแพทย์ทั้งหมด, Carousel) */}
            {/* ────────────────────────────────────────────────────── */}
            <section className="space-y-6 pt-4">
              {/* Header: Title + Link to all doctors */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  <span className="inline-block border-b-4 border-[#f97316] pb-1">
                    แพทย์{doctorDepartmentLabel}
                  </span>
                </h2>
                <Link
                  href={`/doctors?department=${encodeURIComponent(currentCenter.doctorDepartment || "")}`}
                  className="text-[#f97316] hover:text-orange-600 text-xs sm:text-sm font-semibold transition-colors"
                >
                  แพทย์ทั้งหมด
                </Link>
              </div>

              {/* Doctors Carousel / Grid */}
              {centerDoctors.length > 0 ? (
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  {/* Left Carousel Arrow */}
                  {centerDoctors.length > 4 && (
                    <button
                      onClick={prevDoctorSlide}
                      className="p-1 text-[#f97316] hover:text-orange-600 hover:scale-110 transition-transform shrink-0"
                      aria-label="Previous Doctors"
                    >
                      <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                    </button>
                  )}

                  {/* Doctor Cards */}
                  <div
                    className={`w-full ${
                      visibleDoctors.length <= 4
                        ? "flex flex-wrap justify-center gap-3.5 sm:gap-4"
                        : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4"
                    }`}
                  >
                    {visibleDoctors.map((doc) => (
                      <Link
                        key={doc.id}
                        href={`/doctors/${doc.id}`}
                        className={`group flex flex-col items-center text-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${
                          visibleDoctors.length <= 4
                            ? "w-[calc(50%-8px)] sm:w-[calc(25%-12px)] max-w-[195px]"
                            : "w-full"
                        }`}
                      >
                        {/* Soft Warm Beige/Peach Container for Doctor Portrait */}
                        <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#ffeedf] via-[#fff4ea] to-[#fff6ee] border border-orange-100/60 shadow-2xs relative flex items-end justify-center">
                          {doc.image ? (
                            <Image
                              src={doc.image}
                              alt={doc.name}
                              fill
                              className="object-cover object-top group-hover:scale-104 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-orange-200">
                              <UserCheck className="w-12 h-12" strokeWidth={1.5} />
                            </div>
                          )}
                        </div>

                        {/* Doctor Name, Position, Department (ตามรูปที่ 6 แสดงแค่รูป ชื่อ ตำแหน่ง) */}
                        <div className="w-full pt-2.5 px-0.5 space-y-0.5">
                          <h3 className="font-bold text-gray-900 text-xs sm:text-[13px] leading-tight line-clamp-1 group-hover:text-[#f97316] transition-colors">
                            {doc.name}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-gray-500 font-normal line-clamp-1">
                            {doc.title || "นายแพทย์เชี่ยวชาญ"}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-gray-400 font-normal line-clamp-1">
                            {currentCenter.doctorDepartment || currentCenter.titleTh}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Right Carousel Arrow */}
                  {centerDoctors.length > 4 && (
                    <button
                      onClick={nextDoctorSlide}
                      className="p-1 text-[#f97316] hover:text-orange-600 hover:scale-110 transition-transform shrink-0"
                      aria-label="Next Doctors"
                    >
                      <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-400">
                  กำลังจัดสรรตารางแพทย์ประจำศูนย์ ท่านสามารถดูรายชื่อแพทย์ทั้งหมดได้ที่{" "}
                  <Link href="/doctors" className="text-[#f97316] font-medium hover:underline">
                    หน้าบุคลากรแพทย์
                  </Link>
                </div>
              )}
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
