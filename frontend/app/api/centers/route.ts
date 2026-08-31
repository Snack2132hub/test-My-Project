import { NextResponse } from "next/server";
import { getMemoryCenters, addMemoryCenter } from "@/lib/centersData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;

  // Try DB first
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const where = type ? "AND type = ?" : "";
    const params = type ? [type] : [];
    const [rows] = await pool.query<any[]>(
      `SELECT id, title, icon_type as iconType, href, type, display_order FROM hospital_centers WHERE is_active = 1 ${where} ORDER BY type, display_order ASC`,
      params
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows });
    }
  } catch {
    // DB not available, use memory store
  }

  return NextResponse.json({ ok: true, source: "memory", data: getMemoryCenters(type) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, iconType, href, type, display_order } = body;

    if (!title || !type) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุชื่อและประเภทศูนย์" }, { status: 400 });
    }
    if (!["specialized", "special"].includes(type)) {
      return NextResponse.json({ ok: false, message: "type ไม่ถูกต้อง" }, { status: 400 });
    }

    const data = {
      title,
      iconType: iconType || "stethoscope",
      href: href || `/patient-services?dept=${encodeURIComponent(title)}`,
      type: type as "specialized" | "special",
      display_order: Number(display_order) || 99,
    };

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [result]: any = await pool.query(
        "INSERT INTO hospital_centers (title, icon_type, href, type, display_order, is_active) VALUES (?, ?, ?, ?, ?, 1)",
        [data.title, data.iconType, data.href, data.type, data.display_order]
      );
      if (result?.insertId) {
        return NextResponse.json({ ok: true, data: { id: result.insertId, ...data }, source: "db" });
      }
    } catch {
      // fallback to memory
    }

    const created = addMemoryCenter(data);
    return NextResponse.json({ ok: true, data: created, source: "memory" });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
