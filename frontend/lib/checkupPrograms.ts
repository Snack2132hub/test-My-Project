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
    title: "โปรแกรมตรวจสุขภาพ สำหรับผู้ที่มีอยู่น้อยกว่า 35 ปี",
    price: "ราคา 1,150 บาท",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ จันทร์-ศุกร์ (เว้นวันหยุดนักขัตฤกษ์) 06.00 - 15.00 น.",
    contact: "044-211356 , 044-312568 ต่อ 631",
    image: "/img/Health_check_up/h1.png",
    description: "ตรวจร่างกายทั่วไปโดยแพทย์ (Physical Examination), เอกซเรย์ปอด (Chest X-Ray), ตรวจความสมบูรณ์ของเม็ดเลือด (CBC), ตรวจปัสสาวะทั่วไป (Urine Analysis), ตรวจระดับน้ำตาลในเลือด (Fasting Blood Sugar), ตรวจไขมันในเลือด (Cholesterol, Triglyceride, HDL, LDL), ตรวจการทำงานของไต (BUN, Creatinine), ตรวจการทำงานของตับ (Liver Function Test), ตรวจกรดยูริกในเลือด (Uric Acid)",
  },
  {
    id: 2,
    title: "โปรแกรมตรวจสุขภาพ สำหรับ เพศชาย อายุ 35 ปีขึ้นไป",
    price: "ราคา 2,120 บาท",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ จันทร์-ศุกร์ (เว้นวันหยุดนักขัตฤกษ์) 06.00 - 15.00 น.",
    contact: "044-211356 , 044-312568 ต่อ 631",
    image: "/img/Health_check_up/h2.png",
    description: "ตรวจร่างกายทั่วไปโดยแพทย์, เอกซเรย์ปอด, ตรวจความสมบูรณ์ของเม็ดเลือด, ตรวจปัสสาวะทั่วไป, ตรวจระดับน้ำตาลในเลือด, ตรวจระดับน้ำตาลสะสม (HbA1c), ตรวจไขมันในเลือด, ตรวจการทำงานของไต, ตรวจการทำงานของตับ, ตรวจกรดยูริก, ตรวจคลื่นไฟฟ้าหัวใจ (EKG), ตรวจสารบ่งชี้มะเร็งตับ (AFP), ตรวจสารบ่งชี้มะเร็งต่อมลูกหมาก (PSA)",
  },
  {
    id: 3,
    title: "โปรแกรมตรวจสุขภาพ สำหรับข้าราชการ อายน้อยกว่า 35 ปี",
    price: "สามารถเบิกได้ตามสิทธิกรมบัญชีกลาง",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ จันทร์-ศุกร์ (เว้นวันหยุดนักขัตฤกษ์) 06.00 - 15.00 น.",
    contact: "044-211356 , 044-312568 ต่อ 631",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    description: "ตรวจร่างกายทั่วไปโดยแพทย์, เอกซเรย์ปอด, ตรวจความสมบูรณ์ของเม็ดเลือด, ตรวจปัสสาวะทั่วไป, ตรวจอุจจาระทั่วไป, ตรวจหาเลือดแฝงในอุจจาระ (Occult Blood), ตรวจมะเร็งปากมดลูก เฉพาะสุภาพสตรี (Pap smear)",
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
