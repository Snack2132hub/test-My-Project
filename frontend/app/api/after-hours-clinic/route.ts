import { getCurrentAdminId } from "@/lib/adminAccounts";
import { NextResponse } from "next/server";
import { getMemoryAfterHoursClinics, addMemoryAfterHoursClinic } from "@/lib/afterHoursData";

export const dynamic = "force-dynamic";

// specialist / doctor_name are derived by joining doctor_detail -> departments (read-only on doctor data)
const AFTER_HOURS_SELECT = `
  SELECT a.smc_clinic_id AS id, a.clinic_name, a.doctor_id,
         COALESCE(d.dr_name, '') AS doctor_name,
         COALESCE(dep.name_th, '') AS specialist,
         a.schedule, a.phone, a.display_order
  FROM smc_clinic a
  LEFT JOIN doctor_detail d ON d.dr_id = a.doctor_id
  LEFT JOIN departments dep ON dep.department_id = d.department_id`;

export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>(`${AFTER_HOURS_SELECT} ORDER BY a.display_order ASC`);
    if (Array.isArray(rows) && rows.length > 0)
      return NextResponse.json({ ok: true, source: "db", data: rows });
  } catch {}
  return NextResponse.json({ ok: true, source: "memory", data: getMemoryAfterHoursClinics() });
}

export async function POST(request: Request) {
  try {
    const { clinic_name, doctor_id, specialist = "", doctor_name = "", schedule = "", phone = "", display_order = 99 } = await request.json();
    if (!clinic_name) return NextResponse.json({ ok: false, message: "กรุณากรอกชื่อคลินิก" }, { status: 400 });
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const adminId = await getCurrentAdminId();
      const [r] = await pool.query<any>(
        "INSERT INTO smc_clinic (clinic_name,doctor_id,schedule,phone,display_order, created_by) VALUES (?,?,?,?,?, ?)",
        [clinic_name, doctor_id ? Number(doctor_id) : null, schedule, phone, display_order, adminId
        ]
      );
      return NextResponse.json({ ok: true, source: "db", id: r.insertId });
    } catch (e) {
      if ((e as { code?: string })?.code === "ER_NO_REFERENCED_ROW_2") return NextResponse.json({ ok: false, message: "ไม่พบแพทย์ตามรหัสที่ระบุ (doctor_id)" }, { status: 400 });
    }
    const clinic = addMemoryAfterHoursClinic({ clinic_name, specialist, doctor_name, schedule, phone, display_order });
    return NextResponse.json({ ok: true, source: "memory", id: clinic.id });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
