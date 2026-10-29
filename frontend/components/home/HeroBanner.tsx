"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BannerData {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_link?: string;
  show_content: boolean;
  is_active: boolean;
}

const DEFAULT_BANNERS: BannerData[] = [
  {
    id: 1,
    image_url: "/img/indexbanner/herobannertest01.png",
    title: "โรงพยาบาลปากช่องนานา",
    subtitle: "Pakchongnana Hospital",
    description: "ร่วมใจ ใฝ่บริการ บริการดุจญาติมิตร เพื่อสุขภาพที่ดีของท่าน",
    button_text: "เกี่ยวกับเรา",
    button_link: "/about/vision-mission",
    show_content: true,
    is_active: true,
  },
  {
    id: 2,
    image_url: "/img/indexbanner/herobannertest03.png",
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    show_content: false,
    is_active: true,
  },
  {
    id: 3,
    image_url: "/img/indexbanner/herobannertest04.png",
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    show_content: false,
    is_active: true,
  },
];

// รูปแบบแอนิเมชันสไลด์ที่ลื่นไหล นุ่มนวล (Smooth Flow Transition)
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : direction < 0 ? "-100%" : "0%",
    opacity: 0.6,
  }),
  center: {
    zIndex: 1,
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction > 0 ? "-100%" : direction < 0 ? "100%" : "0%",
    opacity: 0.6,
  }),
};

export default function HeroBanner() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [banners, setBanners] = useState<BannerData[]>(DEFAULT_BANNERS);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("/api/banners")
      .then((r) => r.json())
      .then((json) => {
        if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
          setBanners(json.data.filter((b: BannerData) => b.is_active));
        }
      })
      .catch(() => {});
  }, []);

  const bannerCount = banners.length || 1;
  const currentIndex = ((page % bannerCount) + bannerCount) % bannerCount;
  const currentBanner = banners[currentIndex] || DEFAULT_BANNERS[0];

  // เลื่อนไปสไลด์ถัดไปหรือก่อนหน้าพร้อมระบุทิศทางการไหล
  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const goToSlide = (targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    const diff = targetIndex - currentIndex;
    setPage([page + diff, diff > 0 ? 1 : -1]);
  };

  // ตั้งเวลาเลื่อนภาพอัตโนมัติอย่างนุ่มนวลทุกๆ 6.5 วินาที
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  return (
    <section
      className="relative w-full h-[clamp(280px,45vw,550px)] bg-slate-900 overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.85 },
            opacity: { duration: 0.65, ease: "easeInOut" },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
            if (swipe) {
              paginate(offset.x > 0 ? -1 : 1);
            }
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Layer รูปภาพแบนเนอร์ */}
          <Image
            src={currentBanner.image_url}
            alt={currentBanner.title || `Hero Banner ${currentIndex + 1}`}
            fill
            className="object-cover object-top"
            priority={currentIndex === 0}
            sizes="100vw"
            quality={95}
          />

          {/* แสดงข้อความโอเวอร์เลย์เมื่อ show_content เป็น true */}
          {currentBanner.show_content && (
            <>
              {/* แถบสีดำโปร่งแสงปรับให้อ่านข้อความง่ายขึ้น (เน้นฝั่งขวา) */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/25 to-transparent pointer-events-none" />

              {/* ข้อความและปุ่มบนแบนเนอร์ - จัดชิดขวา */}
              <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-6 sm:px-12 md:px-20 lg:px-32 text-white pointer-events-none">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="max-w-xl space-y-3 sm:space-y-4 flex flex-col items-end pointer-events-auto"
                >
                  {currentBanner.subtitle && (
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                      className="inline-block text-[#fbbf24] text-xs sm:text-sm font-semibold uppercase tracking-wider bg-black/30 px-3.5 py-1 rounded-full backdrop-blur-xs shadow-xs"
                    >
                      {currentBanner.subtitle}
                    </motion.span>
                  )}

                  {currentBanner.title && (
                    <motion.h1
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                      className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight"
                    >
                      {currentBanner.title}
                    </motion.h1>
                  )}

                  {currentBanner.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                      className="text-xs sm:text-sm md:text-base text-gray-100 drop-shadow-xs max-w-md font-light leading-relaxed"
                    >
                      {currentBanner.description}
                    </motion.p>
                  )}

                  {currentBanner.button_text && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                      className="pt-2 sm:pt-4"
                    >
                      <Link
                        href={currentBanner.button_link || "/about/vision-mission"}
                        className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 text-center active:scale-95"
                      >
                        {currentBanner.button_text}
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ปุ่มลูกศรเลื่อน ซ้าย-ขวา */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/25 hover:bg-black/50 text-white/90 hover:text-white backdrop-blur-xs transition-all cursor-pointer focus:outline-hidden opacity-0 group-hover:opacity-100 shadow-lg active:scale-90"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 stroke-[2.2]" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/25 hover:bg-black/50 text-white/90 hover:text-white backdrop-blur-xs transition-all cursor-pointer focus:outline-hidden opacity-0 group-hover:opacity-100 shadow-lg active:scale-90"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 stroke-[2.2]" />
      </button>

      {/* จุดบอกตำแหน่งสไลด์ (Dots Indicator) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 items-center bg-black/20 backdrop-blur-xs px-3.5 py-1.5 rounded-full">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              currentIndex === index
                ? "w-7 h-2.5 bg-[#f97316] shadow-sm shadow-orange-500/50"
                : "w-2.5 h-2.5 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
