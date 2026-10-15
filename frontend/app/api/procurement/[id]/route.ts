import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";

import getPool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });

  try {
    const body = await request.json();
    const { title, detail = "", type = "procurement", document_url = "", deadline_at = null } = body ?? {};
    if (!title) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุหัวข้อประกาศ" }, { status: 400 });
    }

    const pool = getPool();
    // ลองอัปเดตในตาราง purchase ก่อน
    try {
      const [purchaseRes] = await pool.query<ResultSetHeader>(
        "UPDATE purchase SET news_h = ?, news_detail = ?, file1 = ? WHERE purchase_id = ?",
        [title, detail, document_url, id]
      );
      if (purchaseRes.affectedRows > 0) return NextResponse.json({ ok: true });
    } catch {}

    // ถ้าไม่มีใน purchase ให้ลอง procurement
    try {
      const [result] = await pool.query<ResultSetHeader>(
        "UPDATE procurement SET title = ?, type = ?, document_url = ?, deadline_at = ? WHERE id = ?",
        [title, type, document_url, deadline_at || null, id]
      );
      if (result.affectedRows > 0) return NextResponse.json({ ok: true });
    } catch {}

    return NextResponse.json({ ok: false, message: "ไม่พบรายการที่ต้องการแก้ไขในฐานข้อมูล" }, { status: 404 });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูล" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });

  try {
    const pool = getPool();
    try {
      const [purchaseRes] = await pool.query<ResultSetHeader>("DELETE FROM purchase WHERE purchase_id = ?", [id]);
      if (purchaseRes.affectedRows > 0) return NextResponse.json({ ok: true });
    } catch {}

    try {
      const [result] = await pool.query<ResultSetHeader>("DELETE FROM procurement WHERE id = ?", [id]);
      if (result.affectedRows > 0) return NextResponse.json({ ok: true });
    } catch {}

    return NextResponse.json({ ok: false, message: "ไม่พบรายการที่ต้องการลบในฐานข้อมูล" }, { status: 404 });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการลบข้อมูล" }, { status: 500 });
  }
}
