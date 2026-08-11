export interface VaccineProgram {
  id: number;
  title: string;
  price?: string;
  category?: string;
  location?: string;
  time?: string;
  contact?: string;
  image: string;
  description?: string;
}

export const INITIAL_VACCINE_PROGRAMS: VaccineProgram[] = [
  {
    id: 1,
    title: "บริการฉีดวัคซีน ศูนย์ตรวจสุขภาพ โรงพยาบาลปากช่องนานา",
    price: "เริ่มต้น 420 บาท",
    category: "วัคซีนทั่วไป",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ จันทร์-ศุกร์ 08.00 - 15.00 น.",
    contact: "044-211356 , 044-312568 ต่อ 631",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    description: "รวมรายการวัคซีนป้องกันโรคต่างๆ สำหรับเด็ก ผู้ใหญ่ และผู้สูงอายุ มีวัคซีนไข้หวัดใหญ่, ไวรัสตับอักเสบ, มะเร็งปากมดลูก (HPV), RSV และอีกมากมาย",
  },
  {
    id: 2,
    title: "ป้องการคุณและคนที่คุณรัก - วัคซีนไข้หวัดใหญ่ ชนิด 4 สายพันธุ์",
    price: "ราคา 420 บาท",
    category: "ไข้หวัดใหญ่",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ จันทร์-ศุกร์ 08.00 - 15.00 น.",
    contact: "044-211356 , 044-312568 ต่อ 631",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    description: "กระตุ้นภูมิคุ้มกันป้องกันโรคไข้หวัดใหญ่ประจำปี เหมาะสำหรับทุกช่วงวัย",
  },
  {
    id: 3,
    title: "ไข้เลือดออกป้องกันได้! วัคซีนป้องกันการติดเชื้อไข้เลือดออก",
    price: "ราคา 1,800 บาท / เข็ม",
    category: "ไข้เลือดออก",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    time: "เปิดให้บริการ จันทร์-ศุกร์ 08.00 - 15.00 น.",
    contact: "044-211356 , 044-312568 ต่อ 631",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    description: "ป้องกันการติดเชื้อสายพันธุ์ไข้เลือดออก ลดอัตราการนอนโรงพยาบาลรุนแรง",
  },
  {
    id: 4,
    title: "วัคซีนรวม คอตีบ บาดทะยัก และไอกรน (Tdap)",
    price: "เริ่มต้น 720 บาท",
    category: "วัคซีนผู้ใหญ่",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800",
    description: "วัคซีนป้องกันโรคคอตีบ บาดทะยัก และไอกรน แนะนำกระตุ้นทุก 10 ปี",
  },
  {
    id: 5,
    title: "ผู้ประกันตน รพ.ปากช่องนานา อายุ 50 ปีขึ้นไป ฉีดวัคซีนไข้หวัดใหญ่ฟรี",
    price: "ไม่มีค่าใช้จ่าย",
    category: "สิทธิประโยชน์",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    description: "สิทธิประโยชน์บริการฉีดวัคซีนไข้หวัดใหญ่ฟรี สำหรับผู้ประกันตน รพ.ปากช่องนานา อายุ 50 ปีขึ้นไป",
  },
  {
    id: 6,
    title: "วัคซีน HPV ป้องกันมะเร็งปากมดลูก และมะเร็งจากไวรัส HPV",
    price: "ตามสิทธิ / แพ็คเกจ",
    category: "วัคซีน HPV",
    location: "ศูนย์ตรวจสุขภาพ Wellness Center",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
    description: "ฉีดวัคซีน HPV เพื่อสร้างภูมิคุ้มกันป้องกันมะเร็งปากมดลูก หูดหงอนไก่ และมะเร็งช่องปาก",
  },
  {
    id: 7,
    title: "วัคซีนป้องกัน RSV สำหรับผู้สูงอายุ และกลุ่มเสี่ยง",
    price: "ราคาตามสิทธิ",
    category: "วัคซีน RSV",
    location: "ศูนย์ตรวจสุขภาพ อาคารผู้ป่วยนอก ชั้น 2",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    description: "ป้องกันการติดเชื้อไวรัส RSV ในระบบทางเดินหายใจรุนแรงในผู้สูงอายุ",
  },
];

let globalVaccinePrograms = [...INITIAL_VACCINE_PROGRAMS];

export function getMemoryVaccinePrograms(): VaccineProgram[] {
  return globalVaccinePrograms;
}

export function addMemoryVaccineProgram(item: Omit<VaccineProgram, "id">): VaccineProgram {
  const newId = globalVaccinePrograms.length > 0 ? Math.max(...globalVaccinePrograms.map((a) => a.id)) + 1 : 1;
  const newItem: VaccineProgram = { ...item, id: newId };
  globalVaccinePrograms = [newItem, ...globalVaccinePrograms];
  return newItem;
}
