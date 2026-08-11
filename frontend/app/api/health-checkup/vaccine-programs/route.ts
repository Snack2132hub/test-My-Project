import { NextResponse } from "next/server";
import getPool from "@/lib/db";
import {
  getMemoryVaccinePrograms,
  addMemoryVaccineProgram,
} from "@/lib/vaccinePrograms";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query<any[]>(
      "SELECT id, title, price, category, location, time, contact, image, description FROM health_vaccine_programs ORDER BY id ASC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows });
    }
  } catch (error) {
    // DB skipped or not initialized, fallback to memory store
  }

  return NextResponse.json({
    ok: true,
    source: "memory",
    data: getMemoryVaccinePrograms(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, price, category, location, time, contact, image, description } = body;

    if (!title) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุชื่อโปรแกรมวัคซีน" }, { status: 400 });
    }

    const newItem = {
      title,
      price: price || "",
      category: category || "วัคซีนทั่วไป",
      location: location || "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
      time: time || "เปิดให้บริการ จันทร์-ศุกร์ 08.00 - 15.00 น.",
      contact: contact || "044-211356 , 044-312568 ต่อ 631",
      image: image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
      description: description || "",
    };

    try {
      const pool = getPool();
      const [result]: any = await pool.query(
        "INSERT INTO health_vaccine_programs (title, price, category, location, time, contact, image, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newItem.title,
          newItem.price,
          newItem.category,
          newItem.location,
          newItem.time,
          newItem.contact,
          newItem.image,
          newItem.description,
        ]
      );
      if (result && result.insertId) {
        return NextResponse.json({ ok: true, data: { id: result.insertId, ...newItem }, source: "db" });
      }
    } catch (dbErr) {
      // fallback to memory
    }

    const created = addMemoryVaccineProgram(newItem);
    return NextResponse.json({ ok: true, data: created, source: "memory" });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" }, { status: 500 });
  }
}
