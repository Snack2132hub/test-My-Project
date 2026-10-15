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

export const DOCTOR_FILENAME_TO_IMAGE: Record<string, string> = {
  "kittiv1.jpg": "/img/doc_img/ANES/KittiV1.jpg",
  "siwapv1.jpg": "/img/doc_img/ANES/SiwapV1.jpg",
  "warinv1.jpg": "/img/doc_img/ANES/WarinV1.jpg",
  "pichayv1.jpg": "/img/doc_img/ENT/PichayV1.jpg",
  "pipatv1.jpg": "/img/doc_img/ENT/PipatV1.jpg",
  "tmv1.jpg": "/img/doc_img/ENT/TmV1.jpg",
  "guntav1.jpg": "/img/doc_img/ER/GuntaV1.jpg",
  "nichav1.jpg": "/img/doc_img/ER/NichaV1.jpg",
  "adisv1.jpg": "/img/doc_img/FM/AdisV1.jpg",
  "malliv1.jpg": "/img/doc_img/FM/MalliV1.jpg",
  "sumatv1.jpg": "/img/doc_img/FM/SumatV1.jpg",
  "venav1.jpg": "/img/doc_img/FM/VenaV1.jpg",
  "vutikv1.jpg": "/img/doc_img/FM/VutikV1.jpg",
  "gezv1.jpg": "/img/doc_img/MED/GezV1.jpg",
  "gorrav1.jpg": "/img/doc_img/MED/GorraV1.jpg",
  "papadav1.jpg": "/img/doc_img/MED/PapadaV1.jpg",
  "rajiv1.jpg": "/img/doc_img/MED/RajiV1.jpg",
  "vutiv1.jpg": "/img/doc_img/MED/VutiV1.jpg",
  "wannapav1.jpg": "/img/doc_img/MED/WannapaV1.jpg",
  "warumv1.jpg": "/img/doc_img/MED/WarumV1.jpg",
  "bunchaiv1.jpg": "/img/doc_img/OB/BunchaiV1.jpg",
  "kanitv1.jpg": "/img/doc_img/OB/KanitV1.jpg",
  "panadv1.jpg": "/img/doc_img/OB/PanadV1.jpg",
  "panadv2.jpg": "/img/doc_img/OB/PanadV2.jpg",
  "tanakv1.jpg": "/img/doc_img/OB/TanakV1.jpg",
  "tanyav1.jpg": "/img/doc_img/OB/TanyaV1.jpg",
  "warisv1.jpg": "/img/doc_img/OB/WarisV1.jpg",
  "sirav1.jpg": "/img/doc_img/OPH/SiraV1.jpg",
  "chanv1.jpg": "/img/doc_img/ORTHO/ChanV1.jpg",
  "kwanv1.jpg": "/img/doc_img/ORTHO/KwanV1.jpg",
  "piyav1.jpg": "/img/doc_img/ORTHO/PiyaV1.jpg",
  "supav1.jpg": "/img/doc_img/ORTHO/SupaV1.jpg",
  "bundiv1.jpg": "/img/doc_img/PED/BundiV1.jpg",
  "gulv1.jpg": "/img/doc_img/PED/GulV1.jpg",
  "naddiv1.jpg": "/img/doc_img/PED/NaddiV1.jpg",
  "pimv1.jpg": "/img/doc_img/PED/PimV1.jpg",
  "somsakv1.jpg": "/img/doc_img/PED/SomsakV1.jpg",
  "warav1.jpg": "/img/doc_img/PED/WaraV1.jpg",
  "watv1.jpg": "/img/doc_img/PED/WatV1.jpg",
  "kkv1.jpg": "/img/doc_img/PSY/KKV1.jpg",
  "parusv1.jpg": "/img/doc_img/PSY/ParusV1.jpg",
  "chayutv1.jpg": "/img/doc_img/REH/ChayutV1.jpg",
  "weruv1.jpg": "/img/doc_img/REH/WeruV1.jpg",
  "chakritv1.jpg": "/img/doc_img/SURG/ChakritV1.jpg",
  "jitrav1.jpg": "/img/doc_img/SURG/JitraV1.jpg",
  "sasiv1.jpg": "/img/doc_img/SURG/SasiV1.jpg",
  "somyv1.jpg": "/img/doc_img/SURG/SomyV1.jpg",
  "tanawv1.jpg": "/img/doc_img/SURG/TanawV1.jpg",
  "tanetv1.jpg": "/img/doc_img/SURG/TanetV1.jpg",
  "benjav1.jpg": "/img/doc_img/XRAY/BenjaV1.jpg",
  "rinv1.jpg": "/img/doc_img/XRAY/RinV1.jpg",
  "sacranv1.jpg": "/img/doc_img/XRAY/SacranV1.jpg",
  "wassv1.jpg": "/img/doc_img/XRAY/WassV1.jpg",
  "nonpic.jpg": "/img/doc_img/nonpic.jpg",
  "nonpicw.jpg": "/img/doc_img/nonpicw.jpg",
};

export const DEPT_FOLDER_MAP: Record<string, string> = {
  "สูตินรีเวช": "OB",
  "สูติ-นรีเวชกรรม": "OB",
  "ศัลยกรรมทั่วไป": "SURG",
  "ศัลยกรรมยูโรวิทยา": "SURG",
  "ศัลยกรรม": "SURG",
  "ศัลยศาสตร์ออร์โธปิดิกส์": "ORTHO",
  "อายุรกรรม": "MED",
  "กุมารเวชกรรม": "PED",
  "จักษุวิทยา": "OPH",
  "รังสีวิทยาวินิจฉัย": "XRAY",
  "วิสัญญี": "ANES",
  "เวชศาสตร์ฟื้นฟู": "REH",
  "จิตเวชศาสตร์": "PSY",
  "โสต ศอ นาสิก": "ENT",
  "เวชศาสตร์ฉุกเฉิน": "ER",
  "เวชบำบัดวิกฤต": "MED",
  "เวชศาสตร์ครอบครัว": "FM",
};

export function normalizeDoctorImage(raw: unknown, department?: string): string {
  const v = str(raw);
  if (!v) {
    return "/img/doc_img/nonpic.jpg";
  }
  if (v.startsWith("http://") || v.startsWith("https://") || v.startsWith("data:")) {
    return v;
  }
  if (v.startsWith("/img/doc_img/")) {
    return v;
  }

  // Extract clean filename (e.g. "BunchaiV1.jpg" from "dr_im/BunchaiV1.jpg")
  const filename = v.split("/").pop() || "";
  const lower = filename.toLowerCase();

  // 1. Direct filename match in known doctor photos
  if (DOCTOR_FILENAME_TO_IMAGE[lower]) {
    return DOCTOR_FILENAME_TO_IMAGE[lower];
  }

  // 2. Department-based path
  const deptKey = department ? department.trim() : "";
  const folder = DEPT_FOLDER_MAP[deptKey];
  if (folder && filename && !filename.includes("nonpic")) {
    return `/img/doc_img/${folder}/${filename}`;
  }

  // 3. Fallback to /img/dr_im/${filename} (served by static dr_im or route handler)
  if (filename) {
    return `/img/dr_im/${filename}`;
  }

  return "/img/doc_img/nonpic.jpg";
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
    image: normalizeDoctorImage(row.dr_img, department),
    originalImg: str(row.dr_img) || undefined,
  };
}
