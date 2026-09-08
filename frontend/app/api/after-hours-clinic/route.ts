import { NextResponse } from "next/server";
import { getMemoryAfterHoursClinics, addMemoryAfterHoursClinic } from "@/lib/afterHoursData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>("SELECT * FROM after_hours_clinics ORDER BY display_order ASC");
    if (Array.isArray(rows) && rows.length > 0)
      return NextResponse.json({ ok: true, source: "db", data: rows });
  } catch {}
  return NextResponse.json({ ok: true, source: "memory", data: getMemoryAfterHoursClinics() });
}

export async function POST(request: Request) {
  try {
    const { clinic_name, specialist = "", doctor_name = "", schedule = "", phone = "", display_order = 99 } = await request.json();
    if (!clinic_name) return NextResponse.json({ ok: false, message: "กรุณากรอกชื่อคลินิก" }, { status: 400 });
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [r] = await pool.query<any>("INSERT INTO after_hours_clinics (clinic_name,specialist,doctor_name,schedule,phone,display_order) VALUES (?,?,?,?,?,?)", [clinic_name, specialist, doctor_name, schedule, phone, display_order]);
      return NextResponse.json({ ok: true, source: "db", id: r.insertId });
    } catch {}
    const clinic = addMemoryAfterHoursClinic({ clinic_name, specialist, doctor_name, schedule, phone, display_order });
    return NextResponse.json({ ok: true, source: "memory", id: clinic.id });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
