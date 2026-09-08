import { NextResponse } from "next/server";
import { getOrgChartUrl, setOrgChartUrl } from "@/lib/aboutData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>("SELECT image_url FROM org_chart ORDER BY id DESC LIMIT 1");
    if (Array.isArray(rows) && rows[0]?.image_url) {
      return NextResponse.json({ ok: true, source: "db", image_url: rows[0].image_url });
    }
  } catch { }
  return NextResponse.json({ ok: true, source: "memory", image_url: getOrgChartUrl() });
}

export async function PUT(request: Request) {
  try {
    const { image_url } = await request.json();
    if (!image_url) return NextResponse.json({ ok: false, message: "กรุณาระบุ URL รูปภาพ" }, { status: 400 });

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query("DELETE FROM org_chart");
      await pool.query("INSERT INTO org_chart (image_url) VALUES (?)", [image_url]);
      return NextResponse.json({ ok: true, source: "db" });
    } catch { }

    setOrgChartUrl(image_url);
    return NextResponse.json({ ok: true, source: "memory" });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
