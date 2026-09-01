import { NextResponse } from "next/server";
import { updateMemoryRegStep, deleteMemoryRegStep } from "@/lib/patientRegData";

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
      await pool.query("UPDATE patient_reg_steps SET title=?,description=?,display_order=? WHERE id=?", [body.title, body.description, body.display_order, id]);
      return NextResponse.json({ ok: true, source: "db" });
    } catch {}
    updateMemoryRegStep(id, body);
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
    await pool.query("DELETE FROM patient_reg_steps WHERE id=?", [id]);
    return NextResponse.json({ ok: true, source: "db" });
  } catch {}
  deleteMemoryRegStep(id);
  return NextResponse.json({ ok: true, source: "memory" });
}
