import { NextResponse } from "next/server";
import { getMemoryBanners, addMemoryBanner } from "@/lib/bannersData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM banners ORDER BY display_order ASC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows });
    }
  } catch {}
  return NextResponse.json({ ok: true, source: "memory", data: getMemoryBanners() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image_url, title = "", subtitle = "", description = "", button_text = "", show_content = false, display_order = 99, is_active = true } = body;
    if (!image_url) return NextResponse.json({ ok: false, message: "กรุณาเลือกรูปภาพ" }, { status: 400 });

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [result] = await pool.query<any>(
        "INSERT INTO banners (image_url, title, subtitle, description, button_text, show_content, display_order, is_active) VALUES (?,?,?,?,?,?,?,?)",
        [image_url, title, subtitle, description, button_text, show_content ? 1 : 0, display_order, is_active ? 1 : 0]
      );
      return NextResponse.json({ ok: true, source: "db", id: result.insertId });
    } catch {}

    const banner = addMemoryBanner({ image_url, title, subtitle, description, button_text, show_content, display_order, is_active });
    return NextResponse.json({ ok: true, source: "memory", id: banner.id });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
