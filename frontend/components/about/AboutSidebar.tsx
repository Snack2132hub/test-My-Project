"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AboutSidebarProps {
  currentPath?: string;
}

export default function AboutSidebar({ currentPath }: AboutSidebarProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  const menuItems = [
    { label: "ประวัติโรงพยาบาล", href: "/about/history" },
    { label: "วิสัยทัศน์ / พันธกิจ", href: "/about/vision-mission" },
    { label: "ผู้บริหารโรงพยาบาล", href: "/about/executives" },
    { label: "โครงสร้างองค์กร", href: "/about/organization" },
  ];

  return (
    <aside className="w-full">
      <div className="bg-gray-100/90 border-l-4 border-gray-700 py-3 px-4 font-bold text-gray-800 text-base mb-3 rounded-r-sm">
        เกี่ยวกับโรงพยาบาล
      </div>
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = activePath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block w-full py-2.5 px-4 text-sm font-medium rounded-xs transition-all duration-200 text-center ${
                isActive
                  ? "bg-[#2c3036] text-white font-semibold shadow-sm border-l-4 border-orange-500"
                  : "bg-[#374151] hover:bg-[#2c3036] text-white hover:text-orange-300 shadow-xs"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
