import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import {
  getMemoryAnnouncements,
  addMemoryAnnouncement,
  deleteMemoryAnnouncement,
  updateMemoryAnnouncement,
  HealthAnnouncement,
} from "@/lib/healthAnnouncements";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pool = getPool();
    // Try querying MySQL database table if exists
    const [rows] = await pool.query<any[]>(
      "SELECT id, title, date, category, image, description, pinned FROM health_checkup_announcements ORDER BY id DESC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows });
    }
  } catch (error) {
    // If table doesn't exist or MySQL fails, fall back to memory store
    console.log("MySQL connection or query skipped, using memory store fallback");
  }

  return NextResponse.json({
    ok: true,
    source: "memory",
    data: getMemoryAnnouncements(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, category, image, description, pinned } = body;

    if (!title) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุชื่อประกาศ" }, { status: 400 });
    }

    const newItem = {
      title,
      date: date || new Date().toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" }),
      category: category || "ข่าวสาร",
      image: image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
      description: description || "",
      pinned: !!pinned,
    };

    try {
      const pool = getPool();
      const [result]: any = await pool.query(
        "INSERT INTO health_checkup_announcements (title, date, category, image, description, pinned) VALUES (?, ?, ?, ?, ?, ?)",
        [newItem.title, newItem.date, newItem.category, newItem.image, newItem.description, newItem.pinned ? 1 : 0]
      );
      if (result && result.insertId) {
        return NextResponse.json({
          ok: true,
          data: { id: result.insertId, ...newItem },
          source: "db",
        });
      }
    } catch (dbErr) {
      console.log("DB Insert skipped, using memory store");
    }

    const created = addMemoryAnnouncement(newItem);
    return NextResponse.json({ ok: true, data: created, source: "memory" });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" }, { status: 500 });
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
      const pool = getPool();
      await pool.query("DELETE FROM health_checkup_announcements WHERE id = ?", [id]);
    } catch (dbErr) {
      // ignore db error
    }

    deleteMemoryAnnouncement(id);
    return NextResponse.json({ ok: true, message: "ลบข้อมูลเรียบร้อยแล้ว" });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการลบข้อมูล" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, date, category, image, description, pinned } = body;

    if (!id) {
      return NextResponse.json({ ok: false, message: "ระบุ ID ไม่ถูกต้อง" }, { status: 400 });
    }

    const updatedData = {
      ...(title && { title }),
      ...(date && { date }),
      ...(category && { category }),
      ...(image && { image }),
      ...(description !== undefined && { description }),
      ...(pinned !== undefined && { pinned }),
    };

    try {
      const pool = getPool();
      await pool.query(
        "UPDATE health_checkup_announcements SET title = ?, date = ?, category = ?, image = ?, description = ?, pinned = ? WHERE id = ?",
        [
          updatedData.title,
          updatedData.date,
          updatedData.category,
          updatedData.image,
          updatedData.description,
          updatedData.pinned ? 1 : 0,
          id,
        ]
      );
    } catch (dbErr) {
      // ignore db error
    }

    const updated = updateMemoryAnnouncement(id, updatedData);
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูล" }, { status: 500 });
  }
}
