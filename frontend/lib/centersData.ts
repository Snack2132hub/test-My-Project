export interface Center {
  id: number;
  title: string;
  iconType: string;
  href: string;
  type: "specialized" | "special";
  display_order: number;
}

const defaultSpecialized: Center[] = [
  { id: 1, title: "ศูนย์สุขภาพสตรี", iconType: "house", href: "/patient-services?dept=women", type: "specialized", display_order: 1 },
  { id: 2, title: "ศูนย์กุมารเวชกรรม", iconType: "bed", href: "/patient-services?dept=pediatrics", type: "specialized", display_order: 2 },
  { id: 3, title: "ศูนย์อายุรกรรม", iconType: "bed", href: "/patient-services?dept=medicine", type: "specialized", display_order: 3 },
  { id: 4, title: "ศูนย์ศัลยกรรม", iconType: "user", href: "/patient-services?dept=surgery", type: "specialized", display_order: 4 },
  { id: 5, title: "ศูนย์กระดูกและข้อ", iconType: "user", href: "/patient-services?dept=ortho", type: "specialized", display_order: 5 },
  { id: 6, title: "อุบัติเหตุฉุกเฉิน", iconType: "stethoscope", href: "/patient-services?dept=emergency", type: "specialized", display_order: 6 },
  { id: 7, title: "หู คอ จมูก", iconType: "house", href: "/patient-services?dept=ent", type: "specialized", display_order: 7 },
  { id: 8, title: "จักษุ", iconType: "stethoscope", href: "/patient-services?dept=eye", type: "specialized", display_order: 8 },
  { id: 9, title: "นวดแผนไทย", iconType: "stethoscope", href: "/patient-services?dept=thaimassage", type: "specialized", display_order: 9 },
  { id: 10, title: "กายภาพบำบัด", iconType: "house", href: "/patient-services?dept=physio", type: "specialized", display_order: 10 },
  { id: 11, title: "เวชศาสตร์ฟื้นฟู", iconType: "stethoscope", href: "/patient-services?dept=rehab", type: "specialized", display_order: 11 },
];

const defaultSpecial: Center[] = [
  { id: 101, title: "คลินิกเบาหวาน", iconType: "stethoscope", href: "/patient-services?dept=diabetes", type: "special", display_order: 1 },
  { id: 102, title: "คลินิกความดันโลหิตสูง", iconType: "stethoscope", href: "/patient-services?dept=hypertension", type: "special", display_order: 2 },
  { id: 103, title: "คลินิกมะเร็ง", iconType: "stethoscope", href: "/patient-services?dept=cancer", type: "special", display_order: 3 },
];

let memoryStore: Center[] = [...defaultSpecialized, ...defaultSpecial];
let nextId = 200;

export function getMemoryCenters(type?: string): Center[] {
  if (type) return memoryStore.filter(c => c.type === type).sort((a, b) => a.display_order - b.display_order);
  return [...memoryStore].sort((a, b) => a.display_order - b.display_order);
}

export function addMemoryCenter(data: Omit<Center, "id">): Center {
  const item = { ...data, id: nextId++ };
  memoryStore.push(item);
  return item;
}

export function updateMemoryCenter(id: number, data: Partial<Center>): boolean {
  const idx = memoryStore.findIndex(c => c.id === id);
  if (idx === -1) return false;
  memoryStore[idx] = { ...memoryStore[idx], ...data };
  return true;
}

export function deleteMemoryCenter(id: number): boolean {
  const before = memoryStore.length;
  memoryStore = memoryStore.filter(c => c.id !== id);
  return memoryStore.length < before;
}
