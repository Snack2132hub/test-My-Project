import type { Doctor } from "@/lib/doctorsData";

/** Row shape from the legacy `doctor_detail` table (wide, 1-indexed columns). */
type DoctorRow = Record<string, unknown> & { dr_id: number };

function str(v: unknown): string {
  return v == null ? "" : String(v).trim();
}

function range(row: DoctorRow, prefix: string, from: number, to: number): string[] {
  const out: string[] = [];
  for (let i = from; i <= to; i++) {
    const val = str(row[`${prefix}${i}`]);
    if (val) out.push(val);
  }
  return out;
}

function normalizeImage(raw: unknown): string {
  const v = str(raw);
  if (!v) return ""; // no photo → components render a placeholder icon
  if (v.startsWith("/") || v.startsWith("http")) return v;
  return `/img/${v}`;
}

/** Map one `doctor_detail` row to the public `Doctor` shape the frontend expects. */
export function mapDoctorRow(row: DoctorRow): Doctor {
  const level = str(row.dr_record1) || str(row.position1);
  const department = str(row.dr_department);
  return {
    id: Number(row.dr_id),
    name: str(row.dr_name),
    department,
    departmentCategory: department,
    position: level,
    positions: range(row, "position", 1, 5),
    specialties: range(row, "dr_record", 2, 10),
    education: range(row, "educational_record", 1, 10),
    schedules: range(row, "dr_check", 1, 3),
    contributions: range(row, "contribution", 1, 5),
    image: normalizeImage(row.dr_img),
    originalImg: str(row.dr_img) || undefined,
  };
}
