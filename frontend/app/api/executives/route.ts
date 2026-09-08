import { NextResponse } from "next/server";
import { getMemoryExecutives, addMemoryExecutive } from "@/lib/aboutData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>(
      "SELECT id, name, position, department, image_url, display_order FROM hospital_executives WHERE is_active = 1 ORDER BY display_order ASC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows });
    }
  } catch { }
  return NextResponse.json({ ok: true, source: "memory", data: getMemoryExecutives() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, position, department, image_url, display_order } = body;
    if (!position) return NextResponse.json({ ok: false, message: "กรุณาระบุตำแหน่ง" }, { status: 400 });

    const data = {
      name: name || "",
      position,
      department: department || "โรงพยาบาลปากช่องนานา",
      image_url: image_url || "",
      display_order: Number(display_order) || 99,
    };

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [result]: any = await pool.query(
        "INSERT INTO hospital_executives (name, position, department, image_url, display_order, is_active) VALUES (?, ?, ?, ?, ?, 1)",
        [data.name, data.position, data.department, data.image_url, data.display_order]
      );
      if (result?.insertId) return NextResponse.json({ ok: true, data: { id: result.insertId, ...data }, source: "db" });
    } catch { }

    return NextResponse.json({ ok: true, data: addMemoryExecutive(data), source: "memory" });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
