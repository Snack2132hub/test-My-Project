"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Stethoscope, Heart, Megaphone, ChevronLeft, ChevronRight, Bed, Syringe, UserPlus, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const banners = [
  {
    src: "/img/indexbanner/herobannertest01.png",
    title: "โรงพยาบาลปากช่องนานา",
    subtitle: "Pakchongnana Hospital",
    description: "ร่วมใจ ใฝ่บริการ บริการดุจญาติมิตร เพื่อสุขภาพที่ดีของท่าน",
    buttonText: "เกี่ยวกับเรา",
    showContent: true,
  },
  {
    src: "/img/indexbanner/herobannertest02.png",
    title: "", // ตั้งค่าว่าง หรือเว้นไว้ได้เลย
    subtitle: "",
    description: "",
    buttonText: "",
    showContent: false, // กำหนดเป็น false เพื่อไม่ให้แสดงกล่องข้อความและสีดำโปร่งแสงเคลือบรูปภาพ
  },
];

const services = [
  {
    title: "ศูนย์ตรวจสุขภาพ",
    icon: Stethoscope,
  },
  {
    title: "คลินิกพิเศษนอกเวลา",
    icon: Clock,
  },
  {
    title: "จองห้องพิเศษ",
    icon: Bed,
  },
  {
    title: "โปรแกรมฉีดวัคซีน",
    icon: Syringe,
  },
  {
    title: "ลงทะเบียนผู้ป่วยใหม่",
    icon: UserPlus,
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // Auto slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-slate-50 flex-1">
      {/* Hero Banner Slider */}
      <section className="relative w-full h-[clamp(280px,45vw,550px)] bg-gray-200 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Image Layer */}
            <Image
              src={banners[currentIndex].src}
              alt={`Hero Banner ${currentIndex + 1}`}
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
              quality={95}
            />
            {/* Only show overlay and text content if showContent is true */}
            {banners[currentIndex].showContent !== false && (
              <>
                {/* Soft Dark Overlay for improved text readability */}
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/10 to-transparent md:bg-linear-to-r md:from-black/50 md:via-black/20 md:to-transparent" />

                {/* Slider Content Overlay with staggered sliding animations */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 text-white">
                  <div className="max-w-xl space-y-3 sm:space-y-4">
                    {banners[currentIndex].subtitle && (
                      <motion.span
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="inline-block text-[#fbbf24] text-xs sm:text-sm font-semibold uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs"
                      >
                        {banners[currentIndex].subtitle}
                      </motion.span>
                    )}
                    
                    {banners[currentIndex].title && (
                      <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight"
                      >
                        {banners[currentIndex].title}
                      </motion.h1>
                    )}

                    {banners[currentIndex].description && (
                      <motion.p
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="text-xs sm:text-sm md:text-base text-gray-100 drop-shadow-xs max-w-md font-light leading-relaxed"
                      >
                        {banners[currentIndex].description}
                      </motion.p>
                    )}

                    {banners[currentIndex].buttonText && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="pt-2 sm:pt-4"
                      >
                        <button className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5">
                          {banners[currentIndex].buttonText}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
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

        {/* Banner Indicator Dots */}
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

      {/* Action Buttons Bar */}
      <section className="w-full relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-lg rounded-b-2xl overflow-hidden">
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#1877F2] hover:bg-[#1565c0] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg">
            <Calendar className="w-6 h-6 md:w-7 md:h-7" />
            นัดหมายแพทย์
          </button>
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg border-t border-white/20 md:border-t-0 md:border-l">
            <Stethoscope className="w-6 h-6 md:w-7 md:h-7" />
            ศูนย์การรักษาเฉพาะทาง
          </button>
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg border-t border-white/20 md:border-t-0 md:border-l">
            <Heart className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" />
            โปรโมชั่นและแพ็คเกจ
          </button>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-14">
            <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-gray-700" fill="currentColor" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">ประกาศ !!!</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Announcement Card 1 */}
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
              <Image
                    src="/img/indexnews/test01.jpg"
                    alt="เปลี่ยนแปลงเวลาให้บริการ"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
            </div>
            {/* Announcement Card 2 */}
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
              <Image
                    src="/img/indexnews/test01.jpg"
                    alt="เปลี่ยนแปลงเวลาให้บริการ"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
            </div>
            {/* Announcement Card 3 */}
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
              <Image
                    src="/img/indexnews/test01.jpg"
                    alt="เปลี่ยนแปลงเวลาให้บริการ"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-3 mt-12">
            <div className="w-3.5 h-3.5 rounded-full bg-[#f97316] cursor-pointer shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
          </div>
        </div>
      </section>

      {/* Medical Services Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-[#fffdfa] border-t border-orange-50/50">
        {/* Soft Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
            alt="Hospital Corridor Background"
            fill
            className="object-cover opacity-[0.05] filter blur-xs"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbf8f3]/30 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#334155] tracking-tight">
              บริการทางการแพทย์
            </h2>
            <div className="w-24 h-1 bg-[#f97316] mt-4 rounded-full shadow-xs"></div>
          </div>

          {/* Carousel / Navigation wrapper */}
          <div className="relative flex items-center justify-between px-2 md:px-12">
            {/* Left navigation arrow */}
            <button className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 hidden sm:block">
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Services Grid/Flex container */}
            <div className="flex flex-wrap sm:flex-nowrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 w-full py-2">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center text-center group cursor-pointer min-w-[120px] sm:min-w-0 sm:flex-1"
                  >
                    {/* Circle Button */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:shadow-orange-200/50 transition-all duration-300 relative border border-white/10">
                      {/* Outer animated border glow */}
                      <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300 blur-xs" />
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-white stroke-[1.5] relative z-10" />
                    </div>

                    {/* Text Label */}
                    <span className="mt-5 text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f97316] transition-colors leading-snug tracking-tight max-w-[130px] block">
                      {service.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Right navigation arrow */}
            <button className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 hidden sm:block">
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-14">
            <button className="px-10 py-3 sm:px-12 sm:py-3.5 bg-white hover:bg-[#f97316] text-[#f97316] hover:text-white border-2 border-[#f97316] font-medium text-sm sm:text-base rounded-full transition-all duration-300 shadow-xs hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:scale-98">
              ดูทั้งหมด
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}