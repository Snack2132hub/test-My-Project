import { NextResponse } from "next/server";
import { updateMemoryBanner, deleteMemoryBanner } from "@/lib/bannersData";

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
      await pool.query(
        "UPDATE banners SET image_url=?, title=?, subtitle=?, description=?, button_text=?, show_content=?, display_order=?, is_active=? WHERE id=?",
        [body.image_url, body.title, body.subtitle, body.description, body.button_text, body.show_content ? 1 : 0, body.display_order, body.is_active ? 1 : 0, id]
      );
      return NextResponse.json({ ok: true, source: "db" });
    } catch {}

    updateMemoryBanner(id, body);
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
    await pool.query("DELETE FROM banners WHERE id=?", [id]);
    return NextResponse.json({ ok: true, source: "db" });
  } catch {}

  deleteMemoryBanner(id);
  return NextResponse.json({ ok: true, source: "memory" });
}
