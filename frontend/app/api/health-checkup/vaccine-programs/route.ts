import { getCurrentAdminId } from "@/lib/adminAccounts";
import { NextResponse } from "next/server";
import {
  getMemoryVaccinePrograms,
  addMemoryVaccineProgram,
  deleteMemoryVaccineProgram,
  VACCINE_CATEGORY_LABELS,
} from "@/lib/vaccinePrograms";

export const dynamic = "force-dynamic";

// category เก็บเป็นรหัส (เช่น "flu") อ้างอิง vaccine_categories.code — เติม category_label (ชื่อไทย) ให้ฝั่งแสดงผลใช้ตรง ๆ
function withLabel<T extends { category?: string }>(item: T) {
  return { ...item, category_label: VACCINE_CATEGORY_LABELS[item.category || ""] || item.category || "" };
}

export async function GET() {
  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<any[]>(
      "SELECT vaccine_program_id AS id, title, price, category, location, time, contact, image, description FROM health_vaccine_programs ORDER BY vaccine_program_id ASC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ ok: true, source: "db", data: rows.map(withLabel) });
    }
  } catch (error) {
    // DB skipped or not initialized, fallback to memory store
  }

  return NextResponse.json({
    ok: true,
    source: "memory",
    data: getMemoryVaccinePrograms().map(withLabel),
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
      category: category || "general",
      location: location || "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
      time: time || "เปิดให้บริการ จันทร์-ศุกร์ 08.00 - 15.00 น.",
      contact: contact || "044-211356 , 044-312568 ต่อ 631",
      image: image || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
      description: description || "",
    };

    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      const adminId = await getCurrentAdminId();
      const [result]: any = await pool.query(
        "INSERT INTO health_vaccine_programs (title, price, category, location, time, contact, image, description, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          newItem.title,
          newItem.price,
          newItem.category,
          newItem.location,
          newItem.time,
          newItem.contact,
          newItem.image,
          newItem.description, adminId,
        ]
      );
      if (result && result.insertId) {
        return NextResponse.json({ ok: true, data: withLabel({ id: result.insertId, ...newItem }), source: "db" });
      }
    } catch (dbErr) {
      if ((dbErr as { code?: string })?.code === "ER_NO_REFERENCED_ROW_2") {
        return NextResponse.json({ ok: false, message: "หมวดวัคซีนไม่ถูกต้อง (category)" }, { status: 400 });
      }
      // fallback to memory
    }

    const created = addMemoryVaccineProgram(newItem);
    return NextResponse.json({ ok: true, data: withLabel(created), source: "memory" });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!id) return NextResponse.json({ ok: false, message: "ระบุ ID ไม่ถูกต้อง" }, { status: 400 });
    try {
      const { default: getPool } = await import("@/lib/db");
      const pool = getPool();
      await pool.query("DELETE FROM health_vaccine_programs WHERE vaccine_program_id = ?", [id]);
    } catch {}
    deleteMemoryVaccineProgram(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
