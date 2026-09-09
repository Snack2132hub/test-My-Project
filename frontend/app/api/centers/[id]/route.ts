import { NextResponse } from "next/server";
import { updateMemoryCenter, deleteMemoryCenter } from "@/lib/centersData";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });

  try {
    const body = await request.json();
    const list = (v: unknown) =>
      Array.isArray(v) ? v.filter((x: unknown) => typeof x === "string" && x) : [];

    const fields = {
      title_th: String(body.title_th ?? ""),
      title_en: String(body.title_en ?? ""),
      icon_type: String(body.icon_type ?? "stethoscope"),
      description: String(body.description ?? ""),
      highlight_text: String(body.highlight_text ?? ""),
      banners: list(body.banners),
      services: list(body.services),
      facilities: list(body.facilities),
      hours_regular: String(body.hours_regular ?? ""),
      hours_after: String(body.hours_after ?? ""),
      hours_emergency: String(body.hours_emergency ?? ""),
      contact_ext: String(body.contact_ext ?? ""),
      doctor_department: String(body.doctor_department ?? ""),
      display_order: Number(body.display_order) || 99,
    };

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query(
        `UPDATE hospital_centers SET
          title_th=?, title_en=?, icon_type=?, description=?, highlight_text=?,
          banners=?, services=?, facilities=?,
          hours_regular=?, hours_after=?, hours_emergency=?, contact_ext=?, doctor_department=?, display_order=?
         WHERE id=?`,
        [
          fields.title_th, fields.title_en, fields.icon_type, fields.description, fields.highlight_text,
          JSON.stringify(fields.banners), JSON.stringify(fields.services), JSON.stringify(fields.facilities),
          fields.hours_regular, fields.hours_after, fields.hours_emergency, fields.contact_ext,
          fields.doctor_department, fields.display_order, id,
        ]
      );
      return NextResponse.json({ ok: true, source: "db" });
    } catch {
      // fall back to memory
    }

    const ok = updateMemoryCenter(id, fields);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });

  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    await pool.query("DELETE FROM hospital_centers WHERE id = ?", [id]);
    return NextResponse.json({ ok: true, source: "db" });
  } catch {
    // fall back to memory
  }
  const ok = deleteMemoryCenter(id);
  return NextResponse.json({ ok });
}
