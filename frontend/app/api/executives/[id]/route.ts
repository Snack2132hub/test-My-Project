import { NextResponse } from "next/server";
import { updateMemoryExecutive, deleteMemoryExecutive } from "@/lib/aboutData";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  try {
    const body = await request.json();
    const { name, position, department, image_url, display_order } = body;

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query(
        "UPDATE hospital_executives SET name=?, position=?, department=?, image_url=?, display_order=? WHERE id=?",
        [name || "", position, department || "", image_url || "", Number(display_order) || 99, id]
      );
      return NextResponse.json({ ok: true, source: "db" });
    } catch { }

    const ok = updateMemoryExecutive(id, { name, position, department, image_url, display_order: Number(display_order) });
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  try {
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query("DELETE FROM hospital_executives WHERE id=?", [id]);
      return NextResponse.json({ ok: true, source: "db" });
    } catch { }

    return NextResponse.json({ ok: deleteMemoryExecutive(id) });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
