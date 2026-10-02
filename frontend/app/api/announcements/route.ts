import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Announcement {
  id: number;
  image: string;
  title?: string;
}

let memoryAnnouncements: Announcement[] = [
  { id: 1, image: "/img/indexbanner/t1.jpg" },
  { id: 2, image: "/img/indexbanner/t2.jpg" },
  { id: 3, image: "/img/indexbanner/t3.jpg" },
  { id: 4, image: "/img/indexbanner/t4.jpg" },
  { id: 5, image: "/img/indexbanner/t5.jpg" },
  { id: 6, image: "/img/indexbanner/t6.jpg" },
  { id: 7, image: "/img/indexbanner/ann1.jpg" },
];


export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>(
      "SELECT id, image, title FROM announcements ORDER BY id ASC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows });
    }
  } catch {
    // DB not available, fall back to memory
  }

  return NextResponse.json({ ok: true, source: "memory", data: memoryAnnouncements });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, title } = body;
    if (!image) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุ URL รูปภาพ" }, { status: 400 });
    }

    const newItem: Announcement = {
      id: Date.now(),
      image,
      title: title || "",
    };

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [result]: any = await pool.query(
        "INSERT INTO announcements (image, title) VALUES (?, ?)",
        [newItem.image, newItem.title]
      );
      if (result?.insertId) {
        return NextResponse.json({ ok: true, data: { ...newItem, id: result.insertId }, source: "db" });
      }
    } catch {
      // fall back to memory
    }

    memoryAnnouncements.push(newItem);
    return NextResponse.json({ ok: true, data: newItem, source: "memory" });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!id) {
      return NextResponse.json({ ok: false, message: "ระบุ ID ไม่ถูกต้อง" }, { status: 400 });
    }

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query("DELETE FROM announcements WHERE id = ?", [id]);
    } catch {
      // ignore
    }

    memoryAnnouncements = memoryAnnouncements.filter((a) => a.id !== id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
