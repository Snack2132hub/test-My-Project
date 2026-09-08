import { NextResponse } from "next/server";
import { getMemoryDepartmentItems, addMemoryDepartmentItem } from "@/lib/departmentData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dept = searchParams.get("dept") || undefined;
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const query = dept
      ? "SELECT * FROM department_items WHERE dept=? ORDER BY display_order ASC"
      : "SELECT * FROM department_items ORDER BY display_order ASC";
    const [rows] = await pool.query<any[]>(query, dept ? [dept] : []);
    if (Array.isArray(rows) && rows.length > 0)
      return NextResponse.json({ ok: true, source: "db", data: rows });
  } catch {}
  return NextResponse.json({ ok: true, source: "memory", data: getMemoryDepartmentItems(dept) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dept, title, description = "", image_url = "", display_order = 99 } = body;
    if (!dept || !title) return NextResponse.json({ ok: false, message: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [r] = await pool.query<any>("INSERT INTO department_items (dept,title,description,image_url,display_order) VALUES (?,?,?,?,?)", [dept, title, description, image_url, display_order]);
      return NextResponse.json({ ok: true, source: "db", id: r.insertId });
    } catch {}
    const item = addMemoryDepartmentItem({ dept, title, description, image_url, display_order });
    return NextResponse.json({ ok: true, source: "memory", id: item.id });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
