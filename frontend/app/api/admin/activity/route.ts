import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { getMemoryNews } from "@/lib/newsData";
import { DOCTORS_DATA } from "@/lib/doctorsData";

export const dynamic = "force-dynamic";

interface ActivityItem {
  date: string;
  actor: string;
  detail: string;
  timestamp: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  pr_news: "ข่าวประชาสัมพันธ์",
  activity: "กิจกรรม",
  after_hours: "คลินิกพิเศษนอกเวลา",
  job: "การสมัครงาน / รับบุคลากร",
  procurement: "ข่าวจัดซื้อจัดจ้าง",
};

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

  // ดึงข่าวล่าสุด — /api/news (ตาราง news) แทน Express backend เดิม
  try {
    let newsRows: { title: string; category: string; published_at: string }[] = [];
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT title, category, published_at FROM news ORDER BY published_at DESC LIMIT 5"
      );
      if (Array.isArray(rows) && rows.length > 0) {
        newsRows = rows as unknown as typeof newsRows;
      }
    } catch {
      // DB unavailable — fall back to memory
    }
    if (newsRows.length === 0) {
      newsRows = getMemoryNews().slice(0, 5);
    }
    for (const news of newsRows) {
      items.push({
        date: formatThaiDate(news.published_at),
        actor: CATEGORY_LABELS[news.category] || "ข่าวสาร",
        detail: news.title,
        timestamp: new Date(news.published_at || 0).getTime(),
      });
    }
  } catch {}

  // ดึงข้อมูลแพทย์ล่าสุด — ตาราง doctor_detail แทน Express backend เดิม
  try {
    let doctorRows: { name: string; updated: string | null }[] = [];
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT dr_name, edit_date, date_add FROM doctor_detail ORDER BY dr_id DESC LIMIT 5"
      );
      if (Array.isArray(rows) && rows.length > 0) {
        doctorRows = rows.map((r) => ({
          name: String(r.dr_name ?? ""),
          updated: (r.edit_date || r.date_add || null) as string | null,
        }));
      }
    } catch {
      // DB unavailable — fall back to bundled data
    }
    if (doctorRows.length === 0) {
      doctorRows = DOCTORS_DATA.slice(0, 5).map((d) => ({ name: d.name, updated: null }));
    }
    for (const dr of doctorRows) {
      if (!dr.name) continue;
      items.push({
        date: formatThaiDate(dr.updated || new Date().toISOString()),
        actor: "แพทย์",
        detail: `ลงข้อมูลแพทย์ ${dr.name}`,
        timestamp: dr.updated ? new Date(dr.updated).getTime() : 0,
      });
    }
  } catch {}

  // ดึง banner ล่าสุด
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT title, created_at FROM banners ORDER BY id DESC LIMIT 3"
    );
    if (Array.isArray(rows)) {
      for (const b of rows) {
        items.push({
          date: formatThaiDate(String(b.created_at ?? new Date().toISOString())),
          actor: "แบนเนอร์",
          detail: `อัพเดทแบนเนอร์หน้าแรก${b.title ? ": " + b.title : ""}`,
          timestamp: new Date(String(b.created_at ?? 0)).getTime(),
        });
      }
    }
  } catch {}

  // เรียงตาม timestamp ล่าสุด แล้วเอา 6 รายการแรก
  items.sort((a, b) => b.timestamp - a.timestamp);
  const result = items.slice(0, 6);

  return NextResponse.json({ ok: true, data: result });
}
