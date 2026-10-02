import { getCurrentAdminId } from "@/lib/adminAccounts";
import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { Center, CenterCategory } from "@/lib/centersData";
import { getMemoryCenters, addMemoryCenter } from "@/lib/centersData";

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

function mapRow(row: RowDataPacket): Center {
  return {
    id: Number(row.id),
    category: (row.category === "special" ? "special" : "specialized") as CenterCategory,
    slug: String(row.slug),
    title_th: String(row.title_th ?? ""),
    title_en: String(row.title_en ?? ""),
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
    department_id: row.department_id != null ? Number(row.department_id) : undefined,
    display_order: Number(row.display_order ?? 99),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || undefined;
  const category = (searchParams.get("category") as CenterCategory | null) || undefined;

  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();

    const where: string[] = ["c.is_active = 1"];
    const params: string[] = [];
    if (slug) { where.push("c.slug = ?"); params.push(slug); }
    if (category) { where.push("c.category = ?"); params.push(category); }

    // doctor_department is derived from the department relationship (no duplicated text column)
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT c.*, c.hospital_center_id AS id, d.name_th AS doctor_department
       FROM hospital_centers c JOIN departments d ON d.department_id = c.department_id
       WHERE ${where.join(" AND ")} ORDER BY c.display_order ASC`,
      params
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows.map(mapRow) });
    }
  } catch {
    // DB unavailable — fall back to bundled data
  }

  return NextResponse.json({ ok: true, source: "memory", data: getMemoryCenters(category, slug) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title_th } = body;
    if (!slug || !title_th) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุ slug และชื่อศูนย์" }, { status: 400 });
    }
    const category: CenterCategory = body.category === "special" ? "special" : "specialized";

    const data: Omit<Center, "id"> = {
      category,
      slug: String(slug).trim(),
      title_th: String(title_th).trim(),
      title_en: String(body.title_en ?? "").trim(),
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
      department_id: body.department_id ? Number(body.department_id) : undefined,
      display_order: Number(body.display_order) || 99,
    };

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const adminId = await getCurrentAdminId();
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO hospital_centers
          (category, slug, title_th, title_en, description, highlight_text, banners, services, facilities,
           hours_regular, hours_after, hours_emergency, contact_ext, department_id, display_order, is_active, created_by)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1, ?)`,
        [
          data.category, data.slug, data.title_th, data.title_en, data.description, data.highlight_text,
          JSON.stringify(data.banners), JSON.stringify(data.services), JSON.stringify(data.facilities),
          data.hours_regular, data.hours_after, data.hours_emergency, data.contact_ext,
          data.department_id ?? null, data.display_order, adminId,
        ]
      );
      if (result?.insertId) {
        return NextResponse.json({ ok: true, source: "db", data: { id: result.insertId, ...data } });
      }
    } catch {
      // fall back to memory
    }

    const created = addMemoryCenter(data);
    return NextResponse.json({ ok: true, source: "memory", data: created });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
