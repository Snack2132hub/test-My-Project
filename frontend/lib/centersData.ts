import type { TreatmentCenter } from "@/lib/treatmentCentersData";

/** ศูนย์รักษาพิเศษ (คลินิกเฉพาะโรค) — โครงสร้างข้อมูลเดียวกับศูนย์รักษาเฉพาะทาง */
export type SpecialCenter = TreatmentCenter;

const B = ["/img/indexbanner/herobannertest01.png", "/img/indexbanner/herobannertest02.png"];

let centers: SpecialCenter[] = [
  {
    id: 1,
    slug: "diabetes",
    title_th: "คลินิกเบาหวาน",
    title_en: "Diabetes Clinic",
    icon_type: "activity",
    description:
      "ให้บริการตรวจวินิจฉัย ติดตาม และดูแลผู้ป่วยเบาหวานแบบองค์รวม โดยทีมอายุรแพทย์ พยาบาลเวชปฏิบัติ นักโภชนาการ และเภสัชกร เพื่อควบคุมระดับน้ำตาลและป้องกันภาวะแทรกซ้อน",
    highlight_text: "คุมน้ำตาลให้อยู่หมัด ลดความเสี่ยงภาวะแทรกซ้อนระยะยาว",
    banners: B,
    services: [
      "ตรวจคัดกรองและวินิจฉัยโรคเบาหวาน (FBS, HbA1c)",
      "ปรับยาและอินซูลินโดยแพทย์เฉพาะทาง",
      "ให้คำปรึกษาด้านโภชนาการและการควบคุมอาหาร",
      "ตรวจคัดกรองภาวะแทรกซ้อนที่ตา ไต และเท้า",
      "คลินิกให้ความรู้การดูแลตนเองสำหรับผู้ป่วยเบาหวาน",
    ],
    facilities: [
      "เครื่องตรวจน้ำตาลปลายนิ้วและ HbA1c ในคลินิก",
      "ห้องให้คำปรึกษาโภชนาการเฉพาะบุคคล",
      "อุปกรณ์ตรวจคัดกรองปลายประสาทเท้า",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 12.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "310",
    doctor_department: "อายุรกรรม",
    display_order: 1,
  },
  {
    id: 2,
    slug: "hypertension",
    title_th: "คลินิกความดันโลหิตสูง",
    title_en: "Hypertension Clinic",
    icon_type: "heart-pulse",
    description:
      "ให้บริการตรวจ วินิจฉัย และควบคุมความดันโลหิตสูง พร้อมประเมินความเสี่ยงโรคหัวใจและหลอดเลือด โดยทีมอายุรแพทย์และพยาบาลเฉพาะทาง",
    highlight_text: "ควบคุมความดันให้คงที่ ลดความเสี่ยงอัมพาตและโรคหัวใจ",
    banners: B,
    services: [
      "วัดและติดตามความดันโลหิตอย่างเป็นระบบ",
      "ปรับยาลดความดันตามแนวทางมาตรฐาน",
      "ประเมินความเสี่ยงโรคหลอดเลือดสมองและหัวใจ",
      "ให้คำแนะนำการปรับพฤติกรรมและควบคุมเกลือ/โซเดียม",
    ],
    facilities: [
      "เครื่องวัดความดันอัตโนมัติและ ABPM (วัดต่อเนื่อง 24 ชม.)",
      "เครื่องตรวจคลื่นไฟฟ้าหัวใจ (EKG)",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 12.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "311",
    doctor_department: "อายุรกรรม",
    display_order: 2,
  },
  {
    id: 3,
    slug: "cancer",
    title_th: "คลินิกมะเร็ง",
    title_en: "Cancer Clinic",
    icon_type: "file-text",
    description:
      "ให้บริการตรวจคัดกรอง วินิจฉัย และดูแลผู้ป่วยโรคมะเร็งแบบประคับประคอง ประสานงานส่งต่อเพื่อรับเคมีบำบัดและรังสีรักษา พร้อมทีมดูแลแบบสหวิชาชีพ",
    highlight_text: "ตรวจพบเร็ว ดูแลต่อเนื่อง เคียงข้างผู้ป่วยและครอบครัว",
    banners: B,
    services: [
      "ตรวจคัดกรองมะเร็งที่พบบ่อย (เต้านม ปากมดลูก ลำไส้ใหญ่)",
      "ประเมินและวินิจฉัยเบื้องต้น พร้อมส่งต่อผู้เชี่ยวชาญ",
      "ติดตามอาการระหว่างและหลังการรักษา",
      "การดูแลแบบประคับประคองและจัดการความปวด",
      "ให้คำปรึกษาด้านจิตใจแก่ผู้ป่วยและครอบครัว",
    ],
    facilities: [
      "ห้องตรวจและให้คำปรึกษาเป็นส่วนตัว",
      "ระบบนัดหมายและส่งต่อผู้ป่วยกับศูนย์มะเร็งเครือข่าย",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 12.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "312",
    doctor_department: "อายุรกรรม",
    display_order: 3,
  },
];
let nextId = 4;

export function getMemoryCenters(slug?: string): SpecialCenter[] {
  const list = slug ? centers.filter((c) => c.slug === slug) : centers;
  return [...list].sort((a, b) => a.display_order - b.display_order);
}

export function addMemoryCenter(data: Omit<SpecialCenter, "id">): SpecialCenter {
  const item = { ...data, id: nextId++ };
  centers.push(item);
  return item;
}

export function updateMemoryCenter(id: number, data: Partial<Omit<SpecialCenter, "id">>): boolean {
  const idx = centers.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  centers[idx] = { ...centers[idx], ...data };
  return true;
}

export function deleteMemoryCenter(id: number): boolean {
  const before = centers.length;
  centers = centers.filter((c) => c.id !== id);
  return centers.length < before;
}
