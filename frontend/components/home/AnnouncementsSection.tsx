"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Megaphone, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";

type DbStatus = {
  ok: boolean;
  connected?: boolean;
  table?: string;
  data?: { dr_id: number; dr_img: string | null } | null;
  message?: string;
};

function DbStatusCard() {
  const [status, setStatus] = useState<DbStatus | null>(null);
  const isEnabled = process.env.NEXT_PUBLIC_SHOW_DB_TEST === "true";

  useEffect(() => {
    if (!isEnabled) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/debug`)
      .then((r) => r.json())
      .then((d: DbStatus) => setStatus(d))
      .catch(() => setStatus({ ok: false, message: "ไม่สามารถเชื่อมต่อได้" }));
  }, [isEnabled]);

  if (!isEnabled || !status) return null;

  const isConnected = status.ok && status.connected;

  return (
    <div
      className={`rounded-2xl border px-6 py-4 mb-10 max-w-xl mx-auto grid grid-cols-2 gap-x-8 gap-y-1 text-sm ${
        isConnected
          ? "bg-green-50 border-green-200 text-green-900"
          : "bg-red-50 border-red-200 text-red-900"
      }`}
    >
      <div>
        <span className="font-semibold">สถานะ:</span>{" "}
        {isConnected ? "เชื่อมต่อฐานข้อมูลสำเร็จ" : status.message ?? "เชื่อมต่อไม่สำเร็จ"}
      </div>
      {status.table && (
        <div>
          <span className="font-semibold">ตารางที่เชื่อม:</span> {status.table}
        </div>
      )}
      {status.data && (
        <>
          <div>
            <span className="font-semibold">รหัสแพทย์:</span> {status.data.dr_id}
          </div>
          <div>
            <span className="font-semibold">รูปภาพ:</span> {status.data.dr_img}
          </div>
        </>
      )}
    </div>
  );
}

export interface AnnouncementItem {
  id: number;
  image: string;
  title?: string;
}

// ข้อมูลสำรองตั้งต้น 7 รูปภาพ
const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  { id: 1, image: "/img/indexnews/test01.jpg" },
  { id: 2, image: "/img/indexbanner/herobannertest02.png" },
  { id: 3, image: "/img/indexbanner/herobannertest03.png" },
  { id: 4, image: "/img/indexbanner/herobannertest04.png" },
  { id: 5, image: "/img/indexbanner/herobannertest05.png" },
  { id: 6, image: "/img/indexbanner/herobannertest06.png" },
  { id: 7, image: "/img/indexbanner/herobannertest07.png" },
];

/**
 * คอมโพเนนต์ AnnouncementsSection (ส่วนข่าวประกาศสำคัญ)
 * แสดงเฉพาะรูปภาพโปสเตอร์ข่าวประกาศ สามารถลาก/สไลด์เปลี่ยนรูปได้อย่างอิสระ
 * รองรับการดึงข้อมูลจาก API หลังบ้าน (/api/announcements)
 */
export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeDot, setActiveDot] = useState(0);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // สำหรับการลากด้วยเมาส์ (Mouse Drag to Scroll)
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // ดึงข้อมูลจาก API หลังบ้าน (พร้อม Fallback)
  useEffect(() => {
    let isMounted = true;
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcements");
        if (res.ok) {
          const json = await res.json();
          if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
            if (isMounted) {
              setAnnouncements(json.data);
            }
          }
        }
      } catch (err) {
        console.log("Could not fetch from backend, using fallback images:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    dragDistanceRef.current = Math.abs(x - startXRef.current);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // เลื่อนไปทางซ้าย/ขวา เมื่อกดปุ่มลูกศร
  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    const targetScroll =
      direction === "left"
        ? scrollRef.current.scrollLeft - cardWidth
        : scrollRef.current.scrollLeft + cardWidth;

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // คำนวณหา index สำหรับจุด Indicator
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const progress = scrollLeft / maxScroll;
    const index = Math.min(
      Math.floor(progress * announcements.length),
      announcements.length - 1
    );
    setActiveDot(index);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const targetScroll = (index / Math.max(1, announcements.length - 1)) * maxScroll;

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 w-full flex-1">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อส่วนประกาศ (ใช้ไอคอนสีดำ Megaphone ตามเดิม) */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-gray-700" fill="currentColor" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            ประกาศ !!!
          </h2>
        </div>

        <DbStatusCard />

        {/* Container สไลเดอร์ลากรูปภาพ */}
        <div className="relative group/carousel">
          {/* ปุ่มเลื่อนซ้าย */}
          <button
            onClick={() => scrollByAmount("left")}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-slate-200 text-slate-800 shadow-lg items-center justify-center hover:bg-slate-900 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
            title="เลื่อนซ้าย"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* ปุ่มเลื่อนขวา */}
          <button
            onClick={() => scrollByAmount("right")}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 border border-slate-200 text-slate-800 shadow-lg items-center justify-center hover:bg-slate-900 hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
            title="เลื่อนขวา"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* แถบรูปภาพประกาศ (เฉพาะรูปล้วนๆ ไม่แสดงข้อความ) */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {isLoading && (
              <div className="w-full flex justify-center items-center py-12 text-slate-400">
                กำลังโหลดภาพประกาศ...
              </div>
            )}

            {!isLoading &&
              announcements.map((item) => (
                <div
                  key={item.id}
                  className="snap-start flex-none w-[280px] sm:w-[320px] md:w-[340px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative cursor-pointer group border border-slate-100"
                  onClick={() => {
                    if (dragDistanceRef.current < 5) {
                      setSelectedAnnouncement(item);
                    }
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title || "ภาพประกาศ"}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 pointer-events-none"
                    sizes="(max-width: 768px) 280px, 340px"
                  />

                  {/* Hover effect แสดงไอคอนพรีวิวเมื่อนำเมาส์มาวาง */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-800 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye className="w-6 h-6" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* จุดนำทางสไลด์ (Carousel Dots Indicator) */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {[0, 1, 2, 3, 4].map((dotIndex) => {
            const isActive =
              Math.round(
                (activeDot / Math.max(1, announcements.length - 1)) * 4
              ) === dotIndex;
            return (
              <button
                key={dotIndex}
                onClick={() => {
                  const targetIndex = Math.round(
                    (dotIndex / 4) * (announcements.length - 1)
                  );
                  scrollToIndex(targetIndex);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer shadow-sm ${
                  isActive
                    ? "w-8 h-3.5 bg-[#f97316]"
                    : "w-3.5 h-3.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide section ${dotIndex + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Pop-up ขยายรูปภาพประกาศเมื่อคลิก */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-slate-900/70 text-white hover:bg-slate-900 rounded-full transition-colors shadow-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-[3/4] max-h-[85vh] bg-slate-100">
              <Image
                src={selectedAnnouncement.image}
                alt={selectedAnnouncement.title || "ภาพประกาศขยายใหญ่"}
                fill
                className="object-contain"
                quality={95}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
