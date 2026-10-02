import { NextResponse } from "next/server";
import { updateMemoryAfterHoursClinic, deleteMemoryAfterHoursClinic } from "@/lib/afterHoursData";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });
  try {
    const body = await request.json();
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query("UPDATE smc_clinic SET clinic_name=?,doctor_id=?,schedule=?,phone=?,display_order=? WHERE smc_clinic_id=?", [body.clinic_name, body.doctor_id ? Number(body.doctor_id) : null, body.schedule, body.phone, body.display_order, id]);
      return NextResponse.json({ ok: true, source: "db" });
    } catch (e) {
      if ((e as { code?: string })?.code === "ER_NO_REFERENCED_ROW_2") return NextResponse.json({ ok: false, message: "ไม่พบแพทย์ตามรหัสที่ระบุ (doctor_id)" }, { status: 400 });
    }
    updateMemoryAfterHoursClinic(id, body);
    return NextResponse.json({ ok: true, source: "memory" });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    await pool.query("DELETE FROM smc_clinic WHERE smc_clinic_id=?", [id]);
    return NextResponse.json({ ok: true, source: "db" });
  } catch {}
  deleteMemoryAfterHoursClinic(id);
  return NextResponse.json({ ok: true, source: "memory" });
}
