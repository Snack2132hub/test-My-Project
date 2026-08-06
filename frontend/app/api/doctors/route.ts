import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";

import getPool from "@/lib/db";

export const dynamic = "force-dynamic";

type DoctorDebugRow = RowDataPacket & {
  dr_id: number;
  dr_img: string | null;
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const host = request.headers.get("host") ?? "";
  const isDebugEnabledByEnv = process.env.ENABLE_DB_DEBUG_ENDPOINT === "true";
  const isLocalhost =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.startsWith("localhost:") ||
    host.startsWith("127.0.0.1:");
  const isLocalDebugRequest =
    isLocalhost && requestUrl.searchParams.get("debug") === "1";

  if (!isDebugEnabledByEnv && !isLocalDebugRequest) {
    return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
  }

  try {
    const pool = getPool();
    const [rows] = await pool.query<DoctorDebugRow[]>(
      "SELECT dr_id, dr_img FROM doctor_detail ORDER BY dr_id ASC LIMIT 1"
    );

    return NextResponse.json({
      ok: true,
      connected: true,
      table: "doctor_detail",
      data: rows[0]
        ? {
            dr_id: rows[0].dr_id,
            dr_img: rows[0].dr_img,
          }
        : null,
    });
  } catch (error) {
    console.error("Failed to check database connection", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Cannot connect to database",
      },
      { status: 500 }
    );
  }
}