import Image from "next/image";
import { Calendar, Stethoscope, Heart, Megaphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-slate-50 flex-1">
      {/* Hero Banner */}
      <section className="relative w-full h-[clamp(250px,40vw,500px)] bg-gray-200 overflow-hidden">
        <Image
          src="/img/indexbanner/herobannertest01.png"
          alt="Hero Banner"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
          quality={90}
        />
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
    </div>
  );
}