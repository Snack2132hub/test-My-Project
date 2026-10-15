import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import getPool from "@/lib/db";
import { DOCTORS_DATA, doctorToRawRow, getDoctorById } from "@/lib/doctorsData";
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
      const mapped = mapDoctorRow(rows[0] as never);
      return NextResponse.json({
        ok: true,
        source: "db",
        data: { ...rows[0], ...mapped, dr_img: mapped.image },
      });
    }
  } catch {
    // DB unavailable — fall back to bundled data
  }

  const doctor = getDoctorById(id);
  if (!doctor) return NextResponse.json({ ok: false, message: "ไม่พบแพทย์" }, { status: 404 });
  return NextResponse.json({
    ok: true,
    source: "static",
    data: { ...doctorToRawRow(doctor), ...doctor },
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });

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
      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE doctor_detail SET
          dr_name = ?, dr_department = ?,
          dr_record1 = ?, dr_record2 = ?, dr_record3 = ?, dr_record4 = ?, dr_record5 = ?,
          dr_record6 = ?, dr_record7 = ?, dr_record8 = ?, dr_record9 = ?, dr_record10 = ?,
          educational_record1 = ?, educational_record2 = ?, educational_record3 = ?, educational_record4 = ?, educational_record5 = ?,
          educational_record6 = ?, educational_record7 = ?, educational_record8 = ?, educational_record9 = ?, educational_record10 = ?,
          position1 = ?, position2 = ?, position3 = ?, position4 = ?, position5 = ?,
          contribution1 = ?, contribution2 = ?, contribution3 = ?, contribution4 = ?, contribution5 = ?,
          contribution_link = ?, contribution_file = ?,
          dr_check1 = ?, dr_check2 = ?, dr_check3 = ?, dr_img = ?
        WHERE dr_id = ?`,
        [
          dr_name, dr_department,
          dr_record1, dr_record2, dr_record3, dr_record4, dr_record5,
          dr_record6, dr_record7, dr_record8, dr_record9, dr_record10,
          educational_record1, educational_record2, educational_record3, educational_record4, educational_record5,
          educational_record6, educational_record7, educational_record8, educational_record9, educational_record10,
          position1, position2, position3, position4, position5,
          contribution1, contribution2, contribution3, contribution4, contribution5,
          contribution_link, contribution_file,
          dr_check1, dr_check2, dr_check3, dr_img,
          id,
        ]
      );
      if (result.affectedRows > 0) return NextResponse.json({ ok: true });
    } catch {
      // Fall back to in-memory update
    }

    const idx = DOCTORS_DATA.findIndex((d) => d.id === id);
    if (idx === -1) return NextResponse.json({ ok: false, message: "ไม่พบข้อมูลแพทย์" }, { status: 404 });
    DOCTORS_DATA[idx] = {
      ...DOCTORS_DATA[idx],
      name: dr_name,
      department: dr_department,
      departmentCategory: dr_department,
      position: dr_record1 || position1 || DOCTORS_DATA[idx].position,
      positions: [position1, position2, position3, position4, position5].filter(Boolean),
      specialties: [dr_record2, dr_record3, dr_record4, dr_record5, dr_record6, dr_record7, dr_record8, dr_record9, dr_record10].filter(Boolean),
      education: [educational_record1, educational_record2, educational_record3, educational_record4, educational_record5, educational_record6, educational_record7, educational_record8, educational_record9, educational_record10].filter(Boolean),
      schedules: [dr_check1, dr_check2, dr_check3].filter(Boolean),
      contributions: [contribution1, contribution2, contribution3, contribution4, contribution5].filter(Boolean),
      image: dr_img || DOCTORS_DATA[idx].image,
      originalImg: dr_img ? "" : DOCTORS_DATA[idx].originalImg,
    };
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ ok: false, message: "ID ไม่ถูกต้อง" }, { status: 400 });

  try {
    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM doctor_detail WHERE dr_id = ?", [id]);
    if (result.affectedRows > 0) return NextResponse.json({ ok: true });
  } catch {
    // Fall back to in-memory delete
  }

  const idx = DOCTORS_DATA.findIndex((d) => d.id === id);
  if (idx === -1) return NextResponse.json({ ok: false, message: "ไม่พบข้อมูลแพทย์" }, { status: 404 });
  DOCTORS_DATA.splice(idx, 1);
  return NextResponse.json({ ok: true });
}

