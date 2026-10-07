import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getMemoryNews, addMemoryNews } from "@/lib/newsData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(200, parseInt(searchParams.get("limit") || "12"));
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search")?.trim() || "";
  const offset = (page - 1) * limit;

  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();

    // Check if news table has records
    const [allCountRows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as total FROM news");
    const dbTotal = Number(allCountRows?.[0]?.total || 0);

    // If database table is empty, auto-seed default categorized news & activities
    if (dbTotal === 0) {
      const defaultNews = getMemoryNews();
      for (const item of defaultNews) {
        await pool.query(
          "INSERT INTO news (title, category, image_url, content, published_at, is_active) VALUES (?, ?, ?, ?, ?, 1)",
          [item.title, item.category, item.image_url, item.content || "", item.published_at]
        );
      }
    }

    let where = "WHERE is_active = 1";
    const params: (string | number)[] = [];
    if (category && category !== "all") {
      where += " AND category = ?";
      params.push(category);
    }
    if (search) {
      where += " AND (title LIKE ? OR content LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    const [countRows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) as total FROM news ${where}`, params);
    const total = Number(countRows?.[0]?.total || 0);

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, title, category, image_url, content, published_at FROM news ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return NextResponse.json({ ok: true, source: "db", total, page, limit, data: rows });
  } catch {
    // Database unavailable or not configured — fall back to in-memory bundled data
  }

  const all = getMemoryNews(category === "all" ? undefined : category, search);
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
