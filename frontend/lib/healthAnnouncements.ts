export interface HealthAnnouncement {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  description?: string;
  pinned?: boolean;
}

export const INITIAL_ANNOUNCEMENTS: HealthAnnouncement[] = [
  {
    id: 1,
    title: "โรคพิษสุนัขบ้า ป้องกันได้ด้วยวัคซีน",
    date: "20 กรกฎาคม 2565",
    category: "วัคซีน",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    description: "แนะนำการรับฉีดวัคซีนป้องกันโรคพิษสุนัขบ้า เพื่อความปลอดภัยสำหรับทุกวัย",
    pinned: true,
  },
  {
    id: 2,
    title: "โรคติดเชื้อไวรัสอีโบลา",
    date: "20 กรกฎาคม 2565",
    category: "ข่าวสาร",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    description: "เกร็ดความรู้และการเฝ้าระวังโรคติดเชื้อไวรัสอีโบลาสำหรับประชาชน",
    pinned: false,
  },
  {
    id: 3,
    title: "บริการเจาะเลือดล่วงหน้า",
    date: "20 กรกฎาคม 2565",
    category: "บริการพิเศษ",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600",
    description: "ลดระยะเวลารอคอยด้วยบริการเปิดห้องเจาะเลือดล่วงหน้า เวลา 06.00 - 10.00 น.",
    pinned: true,
  },
  {
    id: 4,
    title: "วันวัณโรค ตรวจเร็ว-รักษาหาย",
    date: "22 กรกฎาคม 2565",
    category: "ตรวจสุขภาพ",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600",
    description: "รณรงค์ตรวจคัดกรองวัณโรคอย่างรวดเร็ว รู้ทัน รักษาได้หายขาด",
    pinned: false,
  },
  {
    id: 5,
    title: "ฟรีวัคซีน HPV ทุกสิทธิ",
    date: "22 กรกฎาคม 2565",
    category: "วัคซีน",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    description: "รับบริการฉีดวัคซีนมะเร็งปากมดลูก (HPV) ฟรี สำหรับกลุ่มสิทธิตามเงื่อนไขที่กำหนด",
    pinned: true,
  },
  {
    id: 6,
    title: "บริการเจาะเลือดล่วงหน้า (ศูนย์ Wellness)",
    date: "22 กรกฎาคม 2565",
    category: "บริการพิเศษ",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
    description: "เปิดให้บริการเจาะเลือดล่วงหน้า เพิ่มความสะดวกสบายให้ผู้ป่วยนอก",
    pinned: false,
  },
];

// In-memory store fallback for standard environments
let globalAnnouncements = [...INITIAL_ANNOUNCEMENTS];

export function getMemoryAnnouncements(): HealthAnnouncement[] {
  return globalAnnouncements;
}

export function addMemoryAnnouncement(announcement: Omit<HealthAnnouncement, "id">): HealthAnnouncement {
  const newId = globalAnnouncements.length > 0 ? Math.max(...globalAnnouncements.map((a) => a.id)) + 1 : 1;
  const newItem: HealthAnnouncement = {
    ...announcement,
    id: newId,
  };
  globalAnnouncements = [newItem, ...globalAnnouncements];
  return newItem;
}

export function deleteMemoryAnnouncement(id: number): boolean {
  const initialLen = globalAnnouncements.length;
  globalAnnouncements = globalAnnouncements.filter((item) => item.id !== id);
  return globalAnnouncements.length < initialLen;
}

export function updateMemoryAnnouncement(id: number, updated: Partial<HealthAnnouncement>): HealthAnnouncement | null {
  const idx = globalAnnouncements.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  globalAnnouncements[idx] = {
    ...globalAnnouncements[idx],
    ...updated,
  };
  return globalAnnouncements[idx];
}
