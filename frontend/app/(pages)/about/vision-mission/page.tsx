"use client";

import AboutSidebar from "@/components/about/AboutSidebar";

export default function VisionMissionPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Area (Left side) */}
          <div className="lg:col-span-8 space-y-8 text-gray-800">
            {/* 1. วิสัยทัศน์ */}
            <section>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
                วิสัยทัศน์
              </h1>
              <div className="py-2 px-4 sm:px-6 bg-orange-50/50 rounded-lg border-l-4 border-orange-400">
                <p className="text-base sm:text-lg font-medium text-gray-800 text-center py-2">
                  &quot; ศูนย์การแพทย์และการสาธารณสุขชั้นเลิศ ในเขตการท่องเที่ยวระดับประเทศ &quot;
                </p>
              </div>
            </section>

            {/* 2. พันธกิจ */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
                พันธกิจ
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-base text-gray-800 pl-2 leading-relaxed">
                <li>พัฒนาระบบการแพทย์เฉพาะทางขั้นสูงทุกสาขา</li>
                <li>สถาบันร่วมผลิตบุคลากรด้านการแพทย์และการสาธารณสุข</li>
                <li>พัฒนาระบบบริการสุขภาพปฐมภูมิแบบไร้รอยต่อ</li>
                <li>พัฒนาคุณภาพระบบบริหารจัดการโรงพยาบาลและเครือข่ายบริการสุขภาพ</li>
                <li>พัฒนาคุณภาพบริการสาธารณสุขในเขตการท่องเที่ยวเชิงนิเวศ</li>
              </ol>
            </section>

            {/* 3. เข็มมุ่ง */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
                เข็มมุ่ง
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-base text-gray-800 pl-2 leading-relaxed">
                <li>3P safety</li>
                <li>ความมั่นคงทางการเงินการคลัง</li>
              </ol>
            </section>

            {/* 4. เป้าหมาย */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
                เป้าหมาย
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-base text-gray-800 pl-2 leading-relaxed">
                <li>ประชาชนสุขภาพดี</li>
                <li>เจ้าหน้าที่มีความสุข</li>
                <li>ระบบสุขภาพยั่งยืน</li>
              </ol>
            </section>

            {/* 5. ค่านิยมหลัก */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
                ค่านิยมหลัก
              </h2>
              <div className="py-2 px-4 sm:px-6 bg-slate-50 rounded-lg border-l-4 border-slate-700">
                <p className="text-base sm:text-lg font-medium text-gray-800 text-center py-2">
                  &quot; ร่วมใจ ใฝ่งาน บริการดุจญาติมิตร &quot;
                </p>
              </div>
            </section>
          </div>

          {/* Right Sidebar Area */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <AboutSidebar currentPath="/about/vision-mission" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
