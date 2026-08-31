"use client";

import { useState, useEffect } from "react";
import AboutSidebar from "@/components/about/AboutSidebar";

interface Executive {
  id: number;
  name: string;
  position: string;
  department: string;
  image_url: string;
  display_order: number;
}

export default function HospitalExecutivesPage() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/executives")
      .then(r => r.json())
      .then(json => { if (json.ok) setExecutives(json.data); })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-orange-50 via-white to-slate-50 border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-[#f97316] tracking-tight">ผู้บริหารโรงพยาบาล</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 space-y-6 text-gray-800">
            <h2 className="text-xl font-bold text-gray-900 border-b-4 border-orange-500 pb-1 inline-block mb-4">
              คณะผู้บริหาร โรงพยาบาลปากช่องนานา
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-orange-200 border-t-[#f97316] rounded-full animate-spin" />
              </div>
            ) : executives.length === 0 ? (
              <p className="text-gray-400 text-sm py-8 text-center">ยังไม่มีข้อมูลผู้บริหาร</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {executives.map(exec => (
                  <div key={exec.id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center shadow-xs">
                    <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 border-2 border-white shadow flex items-center justify-center">
                      {exec.image_url ? (
                        <img src={exec.image_url} alt={exec.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 font-bold text-xl">{exec.position.slice(0, 2)}</span>
                      )}
                    </div>
                    {exec.name && <p className="font-bold text-gray-900 text-base mb-1">{exec.name}</p>}
                    <h3 className="font-semibold text-gray-800 text-sm">{exec.position}</h3>
                    {exec.department && <p className="text-orange-600 font-medium text-xs mt-1">{exec.department}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

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
