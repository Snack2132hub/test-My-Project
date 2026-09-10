"use client";

import { useState } from "react";
import { CalendarClock, Newspaper } from "lucide-react";
import AfterHoursManager from "@/components/admin/AfterHoursManager";
import NewsManager from "@/components/admin/NewsManager";

/**
 * รวมเมนู "คลินิกพิเศษนอกเวลา" ไว้ที่เดียว — แต่แยกการเพิ่มข้อมูลด้านในเป็น 2 แท็บ:
 *  1. ตารางแพทย์ออกตรวจ  (ตาราง after_hours_clinics)
 *  2. ข่าวคลินิกนอกเวลา   (ตาราง news หมวด after_hours)
 */
export default function AfterHoursAdmin() {
  const [tab, setTab] = useState<"schedule" | "news">("schedule");

  const tabs = [
    { key: "schedule" as const, label: "ตารางแพทย์ออกตรวจ", icon: CalendarClock },
    { key: "news" as const, label: "ข่าวคลินิกนอกเวลา", icon: Newspaper },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100/80 rounded-xl w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tab === key ? "bg-white text-[#f97316] shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === "schedule" ? (
        <AfterHoursManager />
      ) : (
        <NewsManager categories={[{ value: "after_hours", label: "ข่าวคลินิกนอกเวลา" }]} />
      )}
    </div>
  );
}
