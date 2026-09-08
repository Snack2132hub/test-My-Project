import { NextResponse } from "next/server";
import { getMemoryRegSteps, addMemoryRegStep } from "@/lib/patientRegData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>("SELECT * FROM patient_reg_steps ORDER BY display_order ASC");
    if (Array.isArray(rows) && rows.length > 0)
      return NextResponse.json({ ok: true, source: "db", data: rows });
  } catch {}
  return NextResponse.json({ ok: true, source: "memory", data: getMemoryRegSteps() });
}

export async function POST(request: Request) {
  try {
    const { title, description = "", display_order = 99 } = await request.json();
    if (!title) return NextResponse.json({ ok: false, message: "กรุณากรอกหัวข้อ" }, { status: 400 });
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [r] = await pool.query<any>("INSERT INTO patient_reg_steps (title,description,display_order) VALUES (?,?,?)", [title, description, display_order]);
      return NextResponse.json({ ok: true, source: "db", id: r.insertId });
    } catch {}
    const step = addMemoryRegStep({ title, description, display_order });
    return NextResponse.json({ ok: true, source: "memory", id: step.id });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
