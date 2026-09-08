import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  getMemoryTreatmentCenters,
  addMemoryTreatmentCenter,
  type TreatmentCenter,
} from "@/lib/treatmentCentersData";

export const dynamic = "force-dynamic";

function parseList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string");
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
    } catch {
      return [];
    }
  }
  return [];
}

function mapRow(row: RowDataPacket): TreatmentCenter {
  return {
    id: Number(row.id),
    slug: String(row.slug),
    title_th: String(row.title_th ?? ""),
    title_en: String(row.title_en ?? ""),
    icon_type: String(row.icon_type ?? "stethoscope"),
    description: String(row.description ?? ""),
    highlight_text: String(row.highlight_text ?? ""),
    banners: parseList(row.banners),
    services: parseList(row.services),
    facilities: parseList(row.facilities),
    hours_regular: String(row.hours_regular ?? ""),
    hours_after: String(row.hours_after ?? ""),
    hours_emergency: String(row.hours_emergency ?? ""),
    contact_ext: String(row.contact_ext ?? ""),
    doctor_department: String(row.doctor_department ?? ""),
    display_order: Number(row.display_order ?? 99),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || undefined;

  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();

    // Seed the table on first use so admin edits persist from the start.
    const [countRows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as total FROM treatment_centers");
    if (Number(countRows?.[0]?.total || 0) === 0) {
      for (const c of getMemoryTreatmentCenters()) {
        await pool.query(
          `INSERT INTO treatment_centers
            (slug, title_th, title_en, icon_type, description, highlight_text, banners, services, facilities,
             hours_regular, hours_after, hours_emergency, contact_ext, doctor_department, display_order, is_active)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)`,
          [
            c.slug, c.title_th, c.title_en, c.icon_type, c.description, c.highlight_text,
            JSON.stringify(c.banners), JSON.stringify(c.services), JSON.stringify(c.facilities),
            c.hours_regular, c.hours_after, c.hours_emergency, c.contact_ext, c.doctor_department, c.display_order,
          ]
        );
      }
    }

    const where = slug ? "WHERE is_active = 1 AND slug = ?" : "WHERE is_active = 1";
    const params = slug ? [slug] : [];
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM treatment_centers ${where} ORDER BY display_order ASC`,
      params
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows.map(mapRow) });
    }
  } catch {
    // DB unavailable — fall back to bundled data
  }

  return NextResponse.json({
    ok: true,
    source: "memory",
    data: getMemoryTreatmentCenters(slug),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title_th } = body;
    if (!slug || !title_th) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุ slug และชื่อศูนย์" }, { status: 400 });
    }

    const data: Omit<TreatmentCenter, "id"> = {
      slug: String(slug).trim(),
      title_th: String(title_th).trim(),
      title_en: String(body.title_en ?? "").trim(),
      icon_type: String(body.icon_type ?? "stethoscope"),
      description: String(body.description ?? ""),
      highlight_text: String(body.highlight_text ?? ""),
      banners: Array.isArray(body.banners) ? body.banners.filter((v: unknown) => typeof v === "string" && v) : [],
      services: Array.isArray(body.services) ? body.services.filter((v: unknown) => typeof v === "string" && v) : [],
      facilities: Array.isArray(body.facilities) ? body.facilities.filter((v: unknown) => typeof v === "string" && v) : [],
      hours_regular: String(body.hours_regular ?? ""),
      hours_after: String(body.hours_after ?? ""),
      hours_emergency: String(body.hours_emergency ?? ""),
      contact_ext: String(body.contact_ext ?? ""),
      doctor_department: String(body.doctor_department ?? ""),
      display_order: Number(body.display_order) || 99,
    };

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO treatment_centers
          (slug, title_th, title_en, icon_type, description, highlight_text, banners, services, facilities,
           hours_regular, hours_after, hours_emergency, contact_ext, doctor_department, display_order, is_active)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)`,
        [
          data.slug, data.title_th, data.title_en, data.icon_type, data.description, data.highlight_text,
          JSON.stringify(data.banners), JSON.stringify(data.services), JSON.stringify(data.facilities),
          data.hours_regular, data.hours_after, data.hours_emergency, data.contact_ext,
          data.doctor_department, data.display_order,
        ]
      );
      if (result?.insertId) {
        return NextResponse.json({ ok: true, source: "db", data: { id: result.insertId, ...data } });
      }
    } catch {
      // fall back to memory
    }

    const created = addMemoryTreatmentCenter(data);
    return NextResponse.json({ ok: true, source: "memory", data: created });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
