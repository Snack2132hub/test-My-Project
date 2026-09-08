import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getMemoryNews, addMemoryNews } from "@/lib/newsData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(200, parseInt(searchParams.get("limit") || "12"));
  const category = searchParams.get("category") || undefined;
  const offset = (page - 1) * limit;

  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const where = category ? "WHERE is_active = 1 AND category = ?" : "WHERE is_active = 1";
    const params = category ? [category] : [];
    const [countRows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) as total FROM news ${where}`, params);
    const total = Number(countRows?.[0]?.total || 0);
    if (total > 0) {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT id, title, category, image_url, content, published_at FROM news ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      );
      return NextResponse.json({ ok: true, source: "db", total, page, limit, data: rows });
    }
  } catch {
    // DB unavailable, fall back to memory
  }

  const all = getMemoryNews(category);
  return NextResponse.json({
    ok: true,
    source: "memory",
    total: all.length,
    page,
    limit,
    data: all.slice(offset, offset + limit),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category = "pr_news", image_url = "", content = "" } = body;
    if (!title) return NextResponse.json({ ok: false, message: "กรุณาระบุหัวข้อข่าว" }, { status: 400 });

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO news (title, category, image_url, content) VALUES (?, ?, ?, ?)",
        [title, category, image_url, content]
      );
      if (result?.insertId) {
        return NextResponse.json({ ok: true, source: "db", data: { id: result.insertId, title } });
      }
    } catch {
      // fall back to memory
    }

    const created = addMemoryNews({ title, category, image_url, content });
    return NextResponse.json({ ok: true, source: "memory", data: created });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
