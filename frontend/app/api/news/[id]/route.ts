import { NextResponse } from "next/server";
import { updateMemoryNews, deleteMemoryNews } from "@/lib/newsData";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });
  try {
    const body = await request.json();
    const { title, category, image_url, content } = body;
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query(
        "UPDATE news SET title=?, category=?, image_url=?, content=? WHERE id=?",
        [title ?? "", category ?? "pr_news", image_url ?? "", content ?? "", id]
      );
      return NextResponse.json({ ok: true, source: "db" });
    } catch {
      // fall back to memory
    }
    const ok = updateMemoryNews(id, { title, category, image_url, content });
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
    await pool.query("DELETE FROM news WHERE id = ?", [id]);
    return NextResponse.json({ ok: true, source: "db" });
  } catch {
    // fall back to memory
  }
  const ok = deleteMemoryNews(id);
  return NextResponse.json({ ok });
}
