"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ข้อมูลรูปภาพและข้อความสำหรับ Hero Banner สไลเดอร์
 * สามารถแก้ไข/เพิ่ม/ลบ แบนเนอร์ได้ที่อาร์เรย์นี้
 */
const banners = [
  {
    src: "/img/indexbanner/herobannertest01.png",
    title: "โรงพยาบาลปากช่องนานา",
    subtitle: "Pakchongnana Hospital",
    description: "ร่วมใจ ใฝ่บริการ บริการดุจญาติมิตร เพื่อสุขภาพที่ดีของท่าน",
    buttonText: "เกี่ยวกับเรา",
    showContent: true, // แสดงกล่องข้อความและปุ่มกด
  },
  {
    src: "/img/indexbanner/herobannertest03.png",
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    showContent: false, // ซ่อนกล่องข้อความ ให้เห็นเฉพาะรูปภาพเต็มแผ่น
  },
   {
    src: "/img/indexbanner/herobannertest04.png",
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    showContent: false, // ซ่อนกล่องข้อความ ให้เห็นเฉพาะรูปภาพเต็มแผ่น
  },
];

/**
 * คอมโพเนนต์ HeroBanner (แบนเนอร์สไลเดอร์หน้าแรก)
 * - เล่นสไลด์อัตโนมัติทุก 8 วินาที
 * - มีปุ่มเลื่อน ซ้าย-ขวา และจุด Indicator ด้านล่าง
 */
export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // เลื่อนไปสไลด์ถัดไป
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // เลื่อนไปสไลด์ก่อนหน้า
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // ตั้งเวลาสไลด์อัตโนมัติทุกๆ 8 วินาที
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[clamp(280px,45vw,550px)] bg-gray-200 overflow-hidden group">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Layer รูปภาพแบนเนอร์ */}
          <Image
            src={banners[currentIndex].src}
            alt={`Hero Banner ${currentIndex + 1}`}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            quality={95}
          />

          {/* แสดงข้อความโอเวอร์เลย์เมื่อ showContent เป็น true */}
          {banners[currentIndex].showContent !== false && (
            <>
              {/* แถบสีดำโปร่งแสงปรับให้อ่านข้อความง่ายขึ้น (เน้นฝั่งขวา) */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/25 to-transparent" />

              {/* ข้อความและปุ่มบนแบนเนอร์ - จัดชิดขวา */}
              <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-6 sm:px-12 md:px-20 lg:px-32 text-white">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="max-w-xl space-y-3 sm:space-y-4 flex flex-col items-end"
                >
                  {banners[currentIndex].subtitle && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                      className="inline-block text-[#fbbf24] text-xs sm:text-sm font-semibold uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs"
                    >
                      {banners[currentIndex].subtitle}
                    </motion.span>
                  )}

                  {banners[currentIndex].title && (
                    <motion.h1
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                      className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight"
                    >
                      {banners[currentIndex].title}
                    </motion.h1>
                  )}

                  {banners[currentIndex].description && (
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      className="text-xs sm:text-sm md:text-base text-gray-100 drop-shadow-xs max-w-md font-light leading-relaxed"
                    >
                      {banners[currentIndex].description}
                    </motion.p>
                  )}

                  {banners[currentIndex].buttonText && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                      className="pt-2 sm:pt-4"
                    >
                      <button className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5">
                        {banners[currentIndex].buttonText}
                      </button>
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
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/15 hover:bg-black/35 text-white transition-all cursor-pointer focus:outline-hidden"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/15 hover:bg-black/35 text-white transition-all cursor-pointer focus:outline-hidden"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* จุดบอกตำแหน่งสไลด์ (Dots Indicator) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? "bg-[#f97316] scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
