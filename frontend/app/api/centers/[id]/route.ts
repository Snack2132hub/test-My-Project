import { NextResponse } from "next/server";
import { updateMemoryCenter, deleteMemoryCenter } from "@/lib/centersData";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try {
    const body = await request.json();
    const { title, iconType, href, type, display_order } = body;

    if (!title || !type) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุชื่อและประเภทศูนย์" }, { status: 400 });
    }

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query(
        "UPDATE hospital_centers SET title=?, icon_type=?, href=?, type=?, display_order=? WHERE id=?",
        [title, iconType || "stethoscope", href || "", type, Number(display_order) || 99, id]
      );
      return NextResponse.json({ ok: true, source: "db" });
    } catch {
      // fallback to memory
    }

    const ok = updateMemoryCenter(id, { title, iconType, href, type, display_order: Number(display_order) || 99 });
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try {
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query("DELETE FROM hospital_centers WHERE id=?", [id]);
      return NextResponse.json({ ok: true, source: "db" });
    } catch {
      // fallback to memory
    }

    const ok = deleteMemoryCenter(id);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
