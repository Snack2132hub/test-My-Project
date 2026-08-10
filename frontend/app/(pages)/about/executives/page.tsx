"use client";

import AboutSidebar from "@/components/about/AboutSidebar";

export default function HospitalExecutivesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-orange-50 via-white to-slate-50 border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[#f97316] tracking-tight">
            ผู้บริหารโรงพยาบาล
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6 text-gray-800">
            <h2 className="text-xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
              คณะผู้บริหาร โรงพยาบาลปากช่องนานา
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center shadow-xs">
                <div className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400 font-bold text-2xl">
                  ผอ.
                </div>
                <h3 className="font-bold text-gray-900 text-lg">ผู้อำนวยการโรงพยาบาล</h3>
                <p className="text-orange-600 font-medium text-sm mt-1">โรงพยาบาลปากช่องนานา</p>
                <p className="text-gray-600 text-xs mt-2">บริหารจัดการองค์กร และวิศวกรรมการแพทย์</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center shadow-xs">
                <div className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400 font-bold text-2xl">
                  รองฯ
                </div>
                <h3 className="font-bold text-gray-900 text-lg">รองผู้อำนวยการฝ่ายการแพทย์</h3>
                <p className="text-orange-600 font-medium text-sm mt-1">โรงพยาบาลปากช่องนานา</p>
                <p className="text-gray-600 text-xs mt-2">ดูแลระบบบริการการแพทย์และคลินิกเฉพาะทาง</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <AboutSidebar currentPath="/about/executives" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
