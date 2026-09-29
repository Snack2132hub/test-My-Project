"use client";

import React from "react";

interface IntranetBadgeProps {
  iconType: string;
  name?: string;
}

export default function IntranetBadge({ iconType, name }: IntranetBadgeProps) {
  // Size is fixed to fit the round avatar slot on the left of each card
  const containerClass =
    "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden shadow-xs select-none transition-transform group-hover:scale-105 duration-200";

  switch (iconType) {
    case "tiger_hr":
      return (
        <div className={`${containerClass} bg-gradient-to-b from-[#1877F2] to-[#0A4BB8] text-white p-1`}>
          <div className="flex flex-col items-center leading-none">
            <div className="flex items-center gap-0.5">
              <span className="font-serif italic text-[10px] sm:text-[11px] font-bold">Tiger</span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 text-[6px] font-bold flex items-center justify-center text-white">@</span>
              <span className="text-[11px] sm:text-xs font-black text-sky-200">HR</span>
            </div>
            <span className="text-[6px] text-sky-100 italic scale-90">Enterprise</span>
          </div>
        </div>
      );

    case "folders":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] p-1.5`}>
          <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow" viewBox="0 0 80 80" fill="none">
            <path d="M18 52 L36 28 L42 30 L24 54 Z" fill="#EF4444" />
            <path d="M18 52 L26 55 L44 31 L36 28 Z" fill="#F87171" />
            <path d="M26 55 L44 31 L50 33 L32 57 Z" fill="#F59E0B" />
            <path d="M26 55 L34 58 L52 34 L44 31 Z" fill="#FBBF24" />
            <path d="M34 58 L52 34 L58 36 L40 60 Z" fill="#0284C7" />
            <path d="M34 58 L42 61 L60 37 L52 34 Z" fill="#38BDF8" />
            <circle cx="28" cy="46" r="2.5" fill="#FFFFFF" />
            <circle cx="36" cy="49" r="2.5" fill="#FFFFFF" />
            <circle cx="44" cy="52" r="2.5" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case "dashboard_monitor":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] p-1.5 text-white`}>
          <div className="flex flex-col items-center">
            <div className="w-8 h-6 bg-slate-900 rounded-xs border border-slate-700 p-0.5 flex flex-col justify-between">
              <div className="flex items-end gap-0.5 h-2 justify-end">
                <div className="w-1 h-1 bg-yellow-400 rounded-xs" />
                <div className="w-1 h-2 bg-green-400 rounded-xs" />
                <div className="w-1 h-1.5 bg-sky-400 rounded-xs" />
              </div>
              <div className="w-4 h-0.5 bg-pink-500 rounded-full" />
            </div>
            <div className="w-1 h-1 bg-slate-700" />
            <div className="w-4 h-0.5 bg-slate-600 rounded-full" />
          </div>
        </div>
      );

    case "safemind":
      return (
        <div className={`${containerClass} bg-gradient-to-b from-[#1E3A5F] via-[#28537E] to-[#122438] p-1`}>
          <div className="w-full h-full rounded-full border border-sky-300/40 flex flex-col items-center justify-center">
            <div className="w-6 h-5 bg-sky-100 rounded-md border border-sky-300 flex items-center justify-center relative shadow-xs">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-slate-800 rounded-full" />
                <div className="w-1 h-1 bg-slate-800 rounded-full" />
              </div>
            </div>
            <span className="text-[6px] text-sky-200 font-bold mt-0.5">SafeMind</span>
          </div>
        </div>
      );

    case "e_office":
      return (
        <div className={`${containerClass} bg-gradient-to-tr from-emerald-100 via-green-50 to-lime-100 border border-green-200/80`}>
          <div className="flex items-center gap-0.5">
            <span className="text-sm sm:text-base font-black text-emerald-600 leading-none">e</span>
            <span className="text-[10px] sm:text-xs font-black text-emerald-800 leading-none">Office</span>
          </div>
        </div>
      );

    case "multimedia":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#2D2D2D] via-[#1E1E1E] to-[#121212] border border-neutral-700`}>
          <span className="text-lg">🎬</span>
        </div>
      );

    case "itsm_diagram":
      return (
        <div className={`${containerClass} bg-sky-50 border-2 border-sky-300`}>
          <span className="text-[11px] sm:text-xs font-black text-[#0284C7]">ITSM</span>
        </div>
      );

    case "pms_gauge":
      return (
        <div className={`${containerClass} bg-slate-50 border border-gray-200`}>
          <div className="w-8 h-8 rounded-full border-2 border-emerald-400 border-t-amber-400 border-r-rose-400 flex items-center justify-center relative">
            <span className="text-[8px] font-black text-slate-800">PMS</span>
          </div>
        </div>
      );

    case "risk_chart":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#E11D48] via-[#EA580C] to-[#C2410C]`}>
          <span className="text-lg">📋</span>
        </div>
      );

    case "calendar_appointment":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#0284C7] to-[#075985] text-white`}>
          <span className="text-lg">📅</span>
        </div>
      );

    case "nana_refill":
      return (
        <div className={`${containerClass} bg-emerald-100 border border-emerald-300 text-emerald-900`}>
          <span className="text-lg">💊</span>
        </div>
      );

    case "iv_bottle":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-amber-500 to-amber-600 text-white`}>
          <span className="text-lg">🩸</span>
        </div>
      );

    case "medical_record_track":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-800 text-white`}>
          <span className="text-lg">📁</span>
        </div>
      );

    case "p4p_system":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-blue-700 via-sky-600 to-indigo-700 text-white`}>
          <span className="text-xs sm:text-sm font-black tracking-tight">P4P</span>
        </div>
      );

    case "salary_system":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-800 text-white`}>
          <span className="text-lg">💰</span>
        </div>
      );

    case "telegram_alert":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#229ED9] via-[#0088cc] to-[#006699] text-white`}>
          <span className="text-lg">✈️</span>
        </div>
      );

    case "kphis_network":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] text-white`}>
          <span className="text-[10px] sm:text-xs font-black">KPHIS</span>
        </div>
      );

    case "rmc_plus":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#22D3EE] to-[#0891B2]`}>
          <span className="text-[10px] sm:text-xs font-black text-purple-900">RMC+</span>
        </div>
      );

    case "lab_atom":
      return (
        <div className={`${containerClass} bg-sky-100 border border-sky-300`}>
          <span className="text-lg">🔬</span>
        </div>
      );

    case "tonkla_plant":
      return (
        <div className={`${containerClass} bg-emerald-50 border border-emerald-200`}>
          <span className="text-lg">🌱</span>
        </div>
      );

    case "rubiks_cube":
      return (
        <div className={`${containerClass} bg-slate-100 border border-slate-300`}>
          <span className="text-[10px] sm:text-xs font-black text-slate-800">IPISS</span>
        </div>
      );

    case "hrd_rainbow":
      return (
        <div className={`${containerClass} bg-white border-2 border-purple-200`}>
          <span className="text-[10px] sm:text-xs font-black text-purple-600">HRD</span>
        </div>
      );

    case "cost_approval":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-amber-200 to-amber-100 border border-amber-300`}>
          <span className="text-lg">💵</span>
        </div>
      );

    case "env_globe":
      return (
        <div className={`${containerClass} bg-emerald-100 border border-emerald-400`}>
          <span className="text-lg">🌍</span>
        </div>
      );

    case "invoice_procurement":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-sky-500 to-blue-700 text-white`}>
          <span className="text-lg">📑</span>
        </div>
      );

    case "door_exit":
      return (
        <div className={`${containerClass} bg-slate-100 border border-slate-300`}>
          <span className="text-lg">🚪</span>
        </div>
      );

    case "wsu_act_book":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-emerald-700 to-green-800 text-white`}>
          <span className="text-[9px] font-bold text-emerald-200">WSU.</span>
        </div>
      );

    case "debtor_robot":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-emerald-600 to-teal-700 text-white`}>
          <span className="text-lg">🤖</span>
        </div>
      );

    case "opd_hourglass":
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white`}>
          <span className="text-lg">⏳</span>
        </div>
      );

    case "death_certificate":
      return (
        <div className={`${containerClass} bg-white border border-slate-200`}>
          <span className="text-lg">📜</span>
        </div>
      );

    case "supply_cart":
      return (
        <div className={`${containerClass} bg-amber-500 text-white`}>
          <span className="text-lg">🛒</span>
        </div>
      );

    case "psychology_brain":
      return (
        <div className={`${containerClass} bg-purple-800 text-white`}>
          <span className="text-lg">🧠</span>
        </div>
      );

    case "disability_support":
      return (
        <div className={`${containerClass} bg-sky-50 border border-sky-200`}>
          <span className="text-lg">♿</span>
        </div>
      );

    case "technicians_repair":
      return (
        <div className={`${containerClass} bg-blue-700 text-white`}>
          <span className="text-lg">🛠️</span>
        </div>
      );

    default:
      return (
        <div className={`${containerClass} bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-800 text-white`}>
          <span className="text-xs font-bold">{name?.slice(0, 3) || "SYS"}</span>
        </div>
      );
  }
}
