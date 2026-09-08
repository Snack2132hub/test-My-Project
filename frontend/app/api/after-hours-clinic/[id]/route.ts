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
      await pool.query("UPDATE after_hours_clinics SET clinic_name=?,specialist=?,doctor_name=?,schedule=?,phone=?,display_order=? WHERE id=?", [body.clinic_name, body.specialist, body.doctor_name, body.schedule, body.phone, body.display_order, id]);
      return NextResponse.json({ ok: true, source: "db" });
    } catch {}
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
    await pool.query("DELETE FROM after_hours_clinics WHERE id=?", [id]);
    return NextResponse.json({ ok: true, source: "db" });
  } catch {}
  deleteMemoryAfterHoursClinic(id);
  return NextResponse.json({ ok: true, source: "memory" });
}
