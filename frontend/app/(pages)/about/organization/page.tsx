"use client";

import { useState, useEffect } from "react";
import AboutSidebar from "@/components/about/AboutSidebar";

export default function OrganizationPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/org-chart")
      .then(r => r.json())
      .then(json => { if (json.ok) setImageUrl(json.image_url || ""); })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-orange-50 via-white to-slate-50 border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-[#f97316] tracking-tight">โครงสร้างองค์กร</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-6 text-gray-800">
            <h2 className="text-xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
              โครงสร้างการบริหารงาน โรงพยาบาลปากช่องนานา
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-orange-200 border-t-[#f97316] rounded-full animate-spin" />
              </div>
            ) : imageUrl ? (
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={imageUrl} alt="โครงสร้างองค์กร โรงพยาบาลปากช่องนานา" className="w-full h-auto" />
              </div>
            ) : (
              /* Fallback static structure */
              <div className="bg-orange-50/60 border border-orange-200 rounded-xl p-6 text-center space-y-4 shadow-xs">
                <div className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg inline-block text-base sm:text-lg shadow-xs">
                  ผู้อำนวยการโรงพยาบาลปากช่องนานา
                </div>
                <div className="w-0.5 h-6 bg-orange-300 mx-auto"></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-semibold">
                  <div className="bg-white border border-orange-300 py-3 px-4 rounded-lg shadow-xs text-gray-800">กลุ่มงานภารกิจด้านการแพทย์</div>
                  <div className="bg-white border border-orange-300 py-3 px-4 rounded-lg shadow-xs text-gray-800">กลุ่มงานภารกิจด้านการพยาบาล</div>
                  <div className="bg-white border border-orange-300 py-3 px-4 rounded-lg shadow-xs text-gray-800">กลุ่มงานภารกิจด้านอำนวยการ</div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <AboutSidebar currentPath="/about/organization" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
