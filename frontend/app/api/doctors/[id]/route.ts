import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

import getPool from "@/lib/db";
import { getDoctorById } from "@/lib/doctorsData";
import { mapDoctorRow } from "@/lib/doctorsMap";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });

  try {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM doctor_detail WHERE dr_id = ?",
      [id]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: mapDoctorRow(rows[0] as never) });
    }
  } catch {
    // DB unavailable — fall back to bundled data
  }

  const doctor = getDoctorById(id);
  if (!doctor) return NextResponse.json({ ok: false, message: "ไม่พบแพทย์" }, { status: 404 });
  return NextResponse.json({ ok: true, source: "static", data: doctor });
}
