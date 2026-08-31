"use client";

import Image from "next/image";
import Link from "next/link";

export default function HospitalHistoryPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 pb-16">
      {/* 1. Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200 py-2.5 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            หน้าแรก
          </Link>
          <span>/</span>
          <Link href="/about/vision-mission" className="hover:text-orange-500 transition-colors">
            เกี่ยวกับเรา
          </Link>
          <span>/</span>
          <span className="text-orange-600 font-medium">ประวัติโรงพยาบาล</span>
        </div>
      </div>

      {/* 2. Top Hero Banner */}
      <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] overflow-hidden bg-gray-100">
        <Image
          src="/img/pnnh_history_hero 3.png"
          alt="อาคารโรงพยาบาลปากช่องนานา"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            ประวัติโรงพยาบาล
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f97316] leading-tight mt-1">
            ปากช่องนานา
          </h1>
        </div>

        {/* Section 1: First paragraph with right-side interior image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start mb-8">
          <div className="md:col-span-7 space-y-4 text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
            <p className="indent-8 text-justify">
              เดิมเป็น สถานีอนามัยชั้น 2 ประจำ กิ่ง อำเภอสีคิ้ว จังหวัดนครราชสีมา ตั้งอยู่บริเวณตลาดปากช่อง ต่อมาในปี พ.ศ.2505 ได้รับการยกฐานะเป็น สถานีอนามัยชั้น 1 ประจำอำเภอปากช่อง ในขณะนั้นมีบทบาทและความรับผิดชอบตามที่กำหนดไว้ทั้งสิ้น 4 งาน ได้แก่การบริการสาธารณสุขผสมผสาน การสนับสนุนงานสาธารณสุขมูลฐานและพัฒนาชุมชน บริหารงานวิชาการ งานสุขศึกษาและประชาสัมพันธ์ ปี พ.ศ.2518 ได้เปลี่ยนเป็น ศูนย์การแพทย์และอนามัย ขนาด 10 เตียง
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <Image
                src="/img/pnnh_interior_1.png"
                alt="จุดบริการประชาสัมพันธ์ โรงพยาบาลปากช่องนานา"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Second paragraph */}
        <div className="mb-8 text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
          <p className="indent-8 text-justify">
            ในปี พ.ศ.2519 ได้ฐานะขึ้นเป็นโรงพยาบาลประจำอำเภอ ขนาด 10 เตียง โดยใช้ชื่อว่า โรงพยาบาลปากช่อง ต่อมาเมื่อปี พ.ศ. 2520 นายเล็ก นานา ได้มอบที่ดินจำนวน 30 ไร่ อยู่ห่างจากอำเภอปากช่องประมาณ 4 กิโลเมตร ให้เป็นที่ก่อสร้างโรงพยาบาลแห่งใหม่ จึงได้มีการเปลี่ยนชื่อโรงพยาบาลใหม่เป็น &quot;โรงพยาบาลปากช่องนานา&quot; เพื่อเป็นการขอบคุณ และได้ขยายเป็นโรงพยาบาลชุมชนขนาด 30 เตียง โดยมี นายแพทย์อุเทน จารณศรี เป็นผู้อำนวยการในขณะนั้น ต่อมา พ.ศ. 2522 ขยายเป็นโรงพยาบาลชุมชนขนาด 60 เตียง มีนายแพทย์นิวัฒน์ พฤฒิธาดา เป็นผู้อำนวยการ พ.ศ.2535 ขยายเป็นโรงพยาบาลชุมชนขนาด 90 เตียง และขยายเป็นโรงพยาบาลชุมชนขนาดใหญ่ 120 เตียง ในปี พ.ศ.2537 เนื่องจากมีผู้ป่วยจำนวนมาก
          </p>
        </div>

        {/* Section 3: Wide middle photo */}
        <div className="mb-8">
          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <Image
              src="/img/pnnh_building2.png"
              alt="อาคารทางเข้าและโถงบริการ โรงพยาบาลปากช่องนานา"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section 4: Third paragraph */}
        <div className="text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
          <p className="indent-8 text-justify">
            ตามแผนยุทธศาสตร์เขตสุขภาพเครือข่ายบริการที่ ๙ นครชัยบุรินทร์ โรงพยาบาลปากช่องนานาได้ฐานะเป็นโรงพยาบาลทั่วไป ขนาดเล็ก เปิดบริการ 150 เตียง ในปี พ.ศ. 2558 ที่รับผิดชอบลูกข่ายของตนเองได้แก่ โรงพยาบาลส่งเสริมสุขภาพตำบล จำนวน ๒๐ แห่ง ปัจจุบันโรงพยาบาลปากช่องนานา กำลังดำเนินการพัฒนาศักยภาพโรงพยาบาล โดยการขยายการให้บริการ เป็นโรงพยาบาลทั่วไป ขนาด ๓๐๐ เตียง (จำนวนเตียงที่เปิดให้บริการจริง เดือน เมษายน 2561 = 259 เตียง)
          </p>
        </div>
      </div>
    </div>
  );
}
