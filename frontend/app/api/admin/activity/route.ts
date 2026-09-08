import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ActivityItem {
  date: string;
  actor: string;
  detail: string;
  timestamp: number;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function formatThaiDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const buddhistYear = d.getFullYear() + 543;
    return `${d.getDate()}/${d.getMonth() + 1}/${buddhistYear}`;
  } catch {
    return dateStr;
  }
}

export async function GET() {
  const items: ActivityItem[] = [];

  // ดึงข่าวล่าสุด
  try {
    const res = await fetch(`${API}/api/news?page=1&limit=5`, { cache: "no-store" });
    const json = await res.json();
    if (json.ok && Array.isArray(json.data)) {
      for (const news of json.data) {
        const categoryMap: Record<string, string> = {
          pr_news: "ข่าวประชาสัมพันธ์",
          activity: "กิจกรรม",
          after_hours: "คลินิกพิเศษนอกเวลา",
        };
        items.push({
          date: formatThaiDate(news.published_at || news.created_at || new Date().toISOString()),
          actor: categoryMap[news.category] || "ข่าวสาร",
          detail: news.title,
          timestamp: new Date(news.published_at || news.created_at || 0).getTime(),
        });
      }
    }
  } catch {}

  // ดึงข้อมูลแพทย์ล่าสุด
  try {
    const res = await fetch(`${API}/api/doctors?page=1&limit=5`, { cache: "no-store" });
    const json = await res.json();
    const doctors = json.data || json.doctors || [];
    if (Array.isArray(doctors)) {
      for (const dr of doctors.slice(0, 5)) {
        const name = dr.dr_name || dr.name || "";
        if (!name) continue;
        items.push({
          date: formatThaiDate(dr.updated_at || dr.created_at || new Date().toISOString()),
          actor: "แพทย์",
          detail: `ลงข้อมูลแพทย์ ${name}`,
          timestamp: new Date(dr.updated_at || dr.created_at || 0).getTime(),
        });
      }
    }
  } catch {}

  // ดึง banner ล่าสุด
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM banners ORDER BY id DESC LIMIT 3"
    );
    if (Array.isArray(rows)) {
      for (const b of rows) {
        items.push({
          date: formatThaiDate(b.created_at || b.updated_at || new Date().toISOString()),
          actor: "แบนเนอร์",
          detail: `อัพเดทแบนเนอร์หน้าแรก${b.title ? ": " + b.title : ""}`,
          timestamp: new Date(b.created_at || b.updated_at || 0).getTime(),
        });
      }
    }
  } catch {}

  // เรียงตาม timestamp ล่าสุด แล้วเอา 6 รายการแรก
  items.sort((a, b) => b.timestamp - a.timestamp);
  const result = items.slice(0, 6);

  return NextResponse.json({ ok: true, data: result });
}
