import { NextResponse } from "next/server";
import { DOCTORS_DATA, getDoctorById } from "@/lib/doctorsData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const dept = searchParams.get("dept");
  const position = searchParams.get("position");

  if (id) {
    const doctor = getDoctorById(id);
    if (!doctor) {
      return NextResponse.json({ ok: false, message: "Doctor not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, data: doctor });
  }

  let result = DOCTORS_DATA;

  if (dept && dept !== "ทั้งหมด") {
    result = result.filter(
      (d) =>
        d.departmentCategory.includes(dept) || d.department.includes(dept)
    );
  }

  if (position && position !== "ทั้งหมด") {
    result = result.filter((d) => d.position.includes(position));
  }

  return NextResponse.json({
    ok: true,
    total: result.length,
    data: result,
  });
}