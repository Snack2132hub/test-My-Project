import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import getPool from "@/lib/db";
import { DOCTORS_DATA, doctorToRawRow, resolveDoctorRealPhoto, type Doctor } from "@/lib/doctorsData";
import { mapDoctorRow, normalizeDoctorImage } from "@/lib/doctorsMap";

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

  const pageParam = url.searchParams.get("page");
  const limitParam = url.searchParams.get("limit");
  const expertise = url.searchParams.get("expertise")?.trim() || "";
  const department = url.searchParams.get("department")?.trim() || "";

  // ── Admin paginated endpoint (when page is provided) ─────────────────────
  if (pageParam !== null) {
    const page = Math.max(1, Number(pageParam) || 1);
    const limit = Math.min(100, Math.max(1, Number(limitParam) || 10));
    const offset = (page - 1) * limit;

    try {
      const pool = getPool();
      const conditions: string[] = [];
      const params: (string | number)[] = [];
      if (department) {
        conditions.push("dr_department = ?");
        params.push(department);
      }
      if (expertise) {
        conditions.push("(dr_record1 = ? OR position1 = ?)");
        params.push(expertise, expertise);
      }
      const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT dr_id, dr_name, dr_department, dr_record1, dr_record2, position1, dr_img, dr_check1, dr_check2
         FROM doctor_detail ${where}
         ORDER BY dr_id ASC LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      );
      const [countRows] = await pool.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS total FROM doctor_detail ${where}`,
        params
      );
      const mappedRows = rows.map((r) => ({
        ...r,
        dr_img: normalizeDoctorImage(r.dr_img, r.dr_department),
      }));
      return NextResponse.json({
        ok: true,
        source: "db",
        data: mappedRows,
        total: (countRows[0] as { total: number })?.total ?? 0,
        page,
        limit,
      });
    } catch {
      // DB unavailable — fall back to in-memory DOCTORS_DATA
      let rawList = DOCTORS_DATA.map(doctorToRawRow);
      if (department) {
        rawList = rawList.filter((r) => r.dr_department.includes(department));
      }
      if (expertise) {
        rawList = rawList.filter((r) => r.dr_record1 === expertise || r.position1 === expertise);
      }
      const total = rawList.length;
      const paged = rawList.slice(offset, offset + limit);
      return NextResponse.json({
        ok: true,
        source: "static",
        data: paged,
        total,
        page,
        limit,
      });
    }
  }

  // ── Public doctor directory ───────────────────────────────────────────
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
      ).map(resolveDoctorRealPhoto)
    : DOCTORS_DATA.map(resolveDoctorRealPhoto);
  return NextResponse.json({ ok: true, source: "static", data: fallback });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      dr_name, dr_department,
      dr_record1 = "", dr_record2 = "", dr_record3 = "", dr_record4 = "", dr_record5 = "",
      dr_record6 = "", dr_record7 = "", dr_record8 = "", dr_record9 = "", dr_record10 = "",
      educational_record1 = "", educational_record2 = "", educational_record3 = "", educational_record4 = "", educational_record5 = "",
      educational_record6 = "", educational_record7 = "", educational_record8 = "", educational_record9 = "", educational_record10 = "",
      position1 = "", position2 = "", position3 = "", position4 = "", position5 = "",
      contribution1 = "", contribution2 = "", contribution3 = "", contribution4 = "", contribution5 = "",
      contribution_link = "", contribution_file = "",
      dr_check1 = "", dr_check2 = "", dr_check3 = "",
      dr_img = "",
    } = body ?? {};

    if (!dr_name || !dr_department) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุชื่อแพทย์และแผนก" }, { status: 400 });
    }

    try {
      const pool = getPool();
      const [maxRows] = await pool.query<RowDataPacket[]>("SELECT COALESCE(MAX(dr_id), 0) + 1 AS nextId FROM doctor_detail");
      const nextId = (maxRows[0] as { nextId: number }).nextId;

      await pool.query<ResultSetHeader>(
        `INSERT INTO doctor_detail (
          dr_id, dr_name, dr_department,
          dr_record1, dr_record2, dr_record3, dr_record4, dr_record5,
          dr_record6, dr_record7, dr_record8, dr_record9, dr_record10,
          educational_record1, educational_record2, educational_record3, educational_record4, educational_record5,
          educational_record6, educational_record7, educational_record8, educational_record9, educational_record10,
          position1, position2, position3, position4, position5,
          contribution1, contribution2, contribution3, contribution4, contribution5,
          contribution_link, contribution_file,
          dr_check1, dr_check2, dr_check3, dr_img
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nextId, dr_name, dr_department,
          dr_record1, dr_record2, dr_record3, dr_record4, dr_record5,
          dr_record6, dr_record7, dr_record8, dr_record9, dr_record10,
          educational_record1, educational_record2, educational_record3, educational_record4, educational_record5,
          educational_record6, educational_record7, educational_record8, educational_record9, educational_record10,
          position1, position2, position3, position4, position5,
          contribution1, contribution2, contribution3, contribution4, contribution5,
          contribution_link, contribution_file,
          dr_check1, dr_check2, dr_check3, dr_img,
        ]
      );
      return NextResponse.json({ ok: true, id: nextId }, { status: 201 });
    } catch {
      const nextId = DOCTORS_DATA.reduce((max, d) => Math.max(max, d.id), 0) + 1;
      const newDoc: Doctor = {
        id: nextId,
        name: dr_name,
        department: dr_department,
        departmentCategory: dr_department,
        position: dr_record1 || position1 || "แพทย์",
        positions: [position1, position2, position3, position4, position5].filter(Boolean),
        specialties: [dr_record2, dr_record3, dr_record4, dr_record5, dr_record6, dr_record7, dr_record8, dr_record9, dr_record10].filter(Boolean),
        education: [educational_record1, educational_record2, educational_record3, educational_record4, educational_record5, educational_record6, educational_record7, educational_record8, educational_record9, educational_record10].filter(Boolean),
        schedules: [dr_check1, dr_check2, dr_check3].filter(Boolean),
        contributions: [contribution1, contribution2, contribution3, contribution4, contribution5].filter(Boolean),
        image: dr_img || "/img/doctors/male_doctor.jpg",
        originalImg: "",
      };
      DOCTORS_DATA.unshift(newDoc);
      return NextResponse.json({ ok: true, id: nextId }, { status: 201 });
    }
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

