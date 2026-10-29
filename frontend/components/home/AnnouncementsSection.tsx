"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Megaphone, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";


export interface AnnouncementItem {
  id: number;
  image: string;
  title?: string;
}

// ข้อมูลสำรองตั้งต้น 7 รูปภาพ (รองรับทั้ง .jpg และ .png)
const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  { id: 1, image: "/img/indexnews/t1.jpg" },
  { id: 2, image: "/img/indexbanner/t2.jpg" },
  { id: 3, image: "/img/indexbanner/t3.jpg" },
  { id: 4, image: "/img/indexbanner/t4.jpg" },
  { id: 5, image: "/img/indexbanner/t5.jpg" },
  { id: 6, image: "/img/indexbanner/t6.jpg" },
  { id: 7, image: "/img/indexbanner/ann1.jpg" },
];

/**
 * SmartAnnouncementImage
 * คอมโพเนนต์แสดงผลรูปภาพที่รองรับทั้ง .jpg และ .png โดยอัตโนมัติ
 * หากสกุลไฟล์ที่ระบุ (เช่น .jpg) ไม่พบ จะสลับไปลองโหลด .png (และในทางกลับกัน) ให้ทันที
 */
function SmartAnnouncementImage({
  src,
  alt,
  fill,
  className,
  sizes,
  quality,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attempted, setAttempted] = useState<string[]>([]);

  useEffect(() => {
    setCurrentSrc(src);
    setAttempted([]);
  }, [src]);

  const handleError = () => {
    if (currentSrc.toLowerCase().endsWith(".jpg") && !attempted.includes("png")) {
      setAttempted((prev) => [...prev, "png"]);
      setCurrentSrc(currentSrc.replace(/\.jpg$/i, ".png"));
    } else if (currentSrc.toLowerCase().endsWith(".png") && !attempted.includes("jpg")) {
      setAttempted((prev) => [...prev, "jpg"]);
      setCurrentSrc(currentSrc.replace(/\.png$/i, ".jpg"));
    } else if (currentSrc.toLowerCase().endsWith(".jpeg") && !attempted.includes("png")) {
      setAttempted((prev) => [...prev, "png"]);
      setCurrentSrc(currentSrc.replace(/\.jpeg$/i, ".png"));
    } else if (!attempted.includes("fallback")) {
      setAttempted((prev) => [...prev, "fallback"]);
      setCurrentSrc("/img/indexbanner/herobannertest02.png");
    }
  };

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      quality={quality}
      onError={handleError}
    />
  );
}

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

  const [isPaused, setIsPaused] = useState(false);

  // ฟังก์ชันเลื่อนไปยังภาพถัดไป (พร้อมวนลูปกลับมาเริ่มต้นเมื่อสุดทาง)
  const nextSlide = () => {
    if (!scrollRef.current || announcements.length <= 1) return;
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    // คำนวณระยะก้าวของการเลื่อน (card width + gap 24px)
    const cardEl = container.querySelector(".snap-start") as HTMLElement | null;
    const step = cardEl ? cardEl.offsetWidth + 24 : 344;

    // หากเลื่อนจนใกล้สุดขอบแล้ว ให้วนกลับไปเริ่มต้นที่ 0
    if (scrollLeft >= maxScroll - 20) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const target = Math.min(scrollLeft + step, maxScroll);
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  // ฟังก์ชันเลื่อนย้อนกลับ
  const prevSlide = () => {
    if (!scrollRef.current || announcements.length <= 1) return;
    const container = scrollRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const cardEl = container.querySelector(".snap-start") as HTMLElement | null;
    const step = cardEl ? cardEl.offsetWidth + 24 : 344;

    if (scrollLeft <= 20) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      const target = Math.max(scrollLeft - step, 0);
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  // เลื่อนไปทางซ้าย/ขวา เมื่อกดปุ่มลูกศร
  const scrollByAmount = (direction: "left" | "right") => {
    if (direction === "left") {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // สลับหมุนเวียนภาพประกาศอัตโนมัติทุกๆ ~5 วินาที
  // พักการเล่นอัตโนมัติเมื่อผู้ใช้นำเมาส์ไปชี้, ลากด้วยตนเอง หรือเปิด Modal ดูภาพใหญ่
  useEffect(() => {
    if (isLoading || announcements.length <= 1 || isPaused || selectedAnnouncement !== null) {
      return;
    }

    const interval = setInterval(() => {
      if (!isDraggingRef.current) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading, announcements.length, isPaused, selectedAnnouncement]);

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
        {/* หัวข้อส่วนประกาศ พร้อมเส้นสีส้มใต้ข้อความตามแบบในรูป */}
        <div className="flex items-center justify-center gap-3.5 sm:gap-4 mb-12">
          <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-gray-700 shrink-0" fill="currentColor" />
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              ประกาศ !!!
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[#f97316] mt-3 rounded-full"></div>
          </div>
        </div>

        {/* Container สไลเดอร์ลากรูปภาพ */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
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
                  <SmartAnnouncementImage
                    src={item.image}
                    alt={item.title || "ภาพประกาศ"}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 pointer-events-none"
                    sizes="(max-width: 768px) 280px, 340px"
                  />

                  {/* Hover effect แสดงไอคอนพรีวิวเมื่อนำเมาส์มาวาง (ไอคอนดวงตาสีส้ม) */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-white/95 backdrop-blur-md rounded-full text-[#f97316] shadow-lg transform scale-90 group-hover:scale-100 transition-all border border-orange-100/80">
                      <Eye className="w-6 h-6 text-[#f97316] stroke-[2.2]" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* จุดนำทางสไลด์ (Carousel Dots Indicator) */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {[0, 1, 2, 3].map((dotIndex) => {
            const isActive =
              Math.round(
                (activeDot / Math.max(1, announcements.length - 1)) * 3
              ) === dotIndex;
            return (
              <button
                key={dotIndex}
                onClick={() => {
                  const targetIndex = Math.round(
                    (dotIndex / 3) * (announcements.length - 1)
                  );
                  scrollToIndex(targetIndex);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-8 bg-[#f97316]"
                    : "w-2.5 bg-orange-200 hover:bg-orange-300"
                }`}
                aria-label={`Go to slide section ${dotIndex + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Pop-up ขยายรูปภาพประกาศเมื่อคลิก (แสดงเฉพาะตัวรูปภาพ ไม่มีกรอบซ้ายขวา) */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/45 backdrop-blur-sm animate-fadeIn cursor-pointer"
          onClick={() => setSelectedAnnouncement(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* ปุ่มปิดแบบลอยมุมขวาบน */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAnnouncement(null);
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-xl group"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
          </button>

          {/* ตัวรูปภาพประกาศเพียวๆ ไม่มีกรอบซ้ายขวา */}
          <div
            className="relative flex items-center justify-center max-h-[90vh] max-w-[92vw] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedAnnouncement.image}
              alt={selectedAnnouncement.title || "ภาพประกาศขยายใหญ่"}
              className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-2xl shadow-2xl select-none"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.endsWith(".jpg")) {
                  target.src = target.src.replace(/\.jpg$/i, ".png");
                } else if (target.src.endsWith(".png")) {
                  target.src = target.src.replace(/\.png$/i, ".jpg");
                }
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
