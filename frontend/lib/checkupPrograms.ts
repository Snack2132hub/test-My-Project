export interface CheckupProgram {
  id: number;
  title: string;
  price?: string;
  location?: string;
  time?: string;
  contact?: string;
  image: string;
  description?: string;
}

export const INITIAL_CHECKUP_PROGRAMS: CheckupProgram[] = [
  {
    id: 1,
    title: "โปรแกรมตรวจสุขภาพ สำหรับผู้ที่มีอายุน้อยกว่า 35 ปี",
    price: "ราคา 1,150 บาท",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ วันจันทร์ ถึง วันศุกร์ ตั้งแต่เวลา 08:00 น. - 16:00 น. ยกเว้นวันหยุดราชการ",
    contact: "044-311856 , 044-312568 ต่อ 631",
    image: "/img/Frame 1000005894.png",
    description: "ตรวจร่างกายทั่วไปโดยแพทย์ (Physical Examination), เอกซเรย์ทรวงอก (Chest X-Ray), ตรวจความสมบูรณ์ของเม็ดเลือด (Complete Blood Count), ตรวจปัสสาวะทั่วไป (Urine Analysis), ตรวจระดับน้ำตาลในเลือด (Fasting Blood Sugar), ตรวจระดับไขมันในเลือด (Cholesterol, Triglyceride, HDL, LDL), ตรวจการทำงานของไต (BUN, Creatinine), ตรวจการทำงานของตับ (Liver Function Test), ตรวจระดับกรดยูริกในเลือด (Uric Acid)",
  },
  {
    id: 2,
    title: "โปรแกรมตรวจสุขภาพ สำหรับ เพศชาย อายุ 35 ปีขึ้นไป",
    price: "ราคา 2,120 บาท",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ วันจันทร์ ถึง วันศุกร์ ตั้งแต่เวลา 08:00 น. - 16:00 น. ยกเว้นวันหยุดราชการ",
    contact: "044-311856 , 044-312568 ต่อ 631",
    image: "/img/Frame 1000005894.png",
    description: "ตรวจร่างกายทั่วไปโดยแพทย์ (Physical Examination), เอกซเรย์ทรวงอก (Chest X-Ray), ตรวจความสมบูรณ์ของเม็ดเลือด (Complete Blood Count), ตรวจปัสสาวะทั่วไป (Urine Analysis), ตรวจระดับไขมันในเลือด (Cholesterol, Triglyceride, HDL, LDL), ตรวจการทำงานของไต (BUN, Creatinine), ตรวจการทำงานของตับ (Liver Function Test), ตรวจระดับกรดยูริกในเลือด (Uric Acid), ตรวจระดับน้ำตาลในเลือด (Fasting Blood Sugar), ตรวจระดับน้ำตาลสะสมในเลือด (HbA1c), ตรวจคลื่นไฟฟ้าหัวใจ (EKG), ตรวจหาสารบ่งชี้มะเร็งตับ (AFP), ตรวจหาสารบ่งชี้มะเร็งต่อมลูกหมาก (PSA)",
  },
  {
    id: 3,
    title: "โปรแกรมตรวจสุขภาพ สำหรับข้าราชการ อายุน้อยกว่า 35 ปี",
    price: "สามารถนำใบเสร็จเบิกคืนได้ ตามสิทธิกรมบัญชีกลาง",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ วันจันทร์ ถึง วันศุกร์ ตั้งแต่เวลา 08:00 น. - 16:00 น. ยกเว้นวันหยุดราชการ",
    contact: "044-311856 , 044-312568 ต่อ 631",
    image: "/img/Frame 1000005894.png",
    description: "ตรวจร่างกายทั่วไปโดยแพทย์ (Physical Examination), ตรวจเอกซเรย์ทรวงอก (Chest X-Ray), ตรวจความสมบูรณ์ของเม็ดเลือด (Complete Blood Count), ตรวจปัสสาวะทั่วไป (Urine Analysis), ตรวจอุจจาระทั่วไป (Stool Examination), ตรวจหาเลือดแฝงในอุจจาระ (Occult Blood), ตรวจมะเร็งปากมดลูก เฉพาะเพศหญิง (Pap smear)",
  },
];

let globalCheckupPrograms = [...INITIAL_CHECKUP_PROGRAMS];

export function getMemoryCheckupPrograms(): CheckupProgram[] {
  return globalCheckupPrograms;
}

export function addMemoryCheckupProgram(item: Omit<CheckupProgram, "id">): CheckupProgram {
  const newId = globalCheckupPrograms.length > 0 ? Math.max(...globalCheckupPrograms.map((a) => a.id)) + 1 : 1;
  const newItem: CheckupProgram = { ...item, id: newId };
  globalCheckupPrograms = [newItem, ...globalCheckupPrograms];
  return newItem;
}
