import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

import getPool from "@/lib/db";
import { DOCTORS_DATA } from "@/lib/doctorsData";
import { mapDoctorRow } from "@/lib/doctorsMap";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // ── Debug endpoint (localhost or ENABLE_DB_DEBUG_ENDPOINT) ──────────────
  if (url.searchParams.get("debug") === "1") {
    const host = request.headers.get("host") ?? "";
    const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");
    if (!isLocalhost && process.env.ENABLE_DB_DEBUG_ENDPOINT !== "true") {
      return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    }
    try {
      const pool = getPool();
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT dr_id, dr_img FROM doctor_detail ORDER BY dr_id ASC LIMIT 1"
      );
      return NextResponse.json({ ok: true, connected: true, table: "doctor_detail", data: rows[0] ?? null });
    } catch (error) {
      console.error("Failed to check database connection", error);
      return NextResponse.json({ ok: false, message: "Cannot connect to database" }, { status: 500 });
    }
  }

  // ── Public doctor directory ───────────────────────────────────────────
  const department = url.searchParams.get("department")?.trim() || "";

  try {
    const pool = getPool();
    const [rows] = department
      ? await pool.query<RowDataPacket[]>(
          "SELECT * FROM doctor_detail WHERE dr_department = ? OR dr_department LIKE ? ORDER BY dr_id ASC",
          [department, `%${department}%`]
        )
      : await pool.query<RowDataPacket[]>("SELECT * FROM doctor_detail ORDER BY dr_id ASC");
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows.map((r) => mapDoctorRow(r as never)) });
    }
  } catch {
    // DB unavailable — fall back to bundled data
  }

  const fallback = department
    ? DOCTORS_DATA.filter(
        (d) => d.department.includes(department) || d.departmentCategory.includes(department)
      )
    : DOCTORS_DATA;
  return NextResponse.json({ ok: true, source: "static", data: fallback });
}
