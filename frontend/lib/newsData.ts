export interface NewsItem {
  id: number;
  title: string;
  category: string; // pr_news | activity | after_hours | job | procurement
  image_url: string;
  content: string;
  document_url: string; // ลิงก์เอกสารแนบ (ใช้กับหมวด job / procurement)
  deadline_at: string | null; // วันหมดเขต (ใช้กับหมวด job / procurement)
  published_at: string;
  is_active?: number;
}

let items: NewsItem[] = [
  {
    id: 1,
    title: "โครงการตรวจสุขภาพสิทธิประกันสังคมประจำปี 2569",
    category: "pr_news",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
    content: "",
    document_url: "",
    deadline_at: null,
    published_at: "2026-07-15T09:00:00",
  },
  {
    id: 2,
    title: "ประชาสัมพันธ์การขยายเวลาให้บริการห้องฉุกเฉิน",
    category: "pr_news",
    image_url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
    content: "",
    document_url: "",
    deadline_at: null,
    published_at: "2026-07-16T09:00:00",
  },
  {
    id: 3,
    title: "โครงการอบรมป้องกันและซ้อมแผนอัคคีภัยประจำปี 2569",
    category: "activity",
    image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    content: "",
    document_url: "",
    deadline_at: null,
    published_at: "2026-07-10T09:00:00",
  },
  {
    id: 4,
    title: "กิจกรรมทำบุญตักบาตรเนื่องในวันสำคัญทางศาสนา",
    category: "activity",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
    content: "",
    document_url: "",
    deadline_at: null,
    published_at: "2026-07-12T09:00:00",
  },
  {
    id: 5,
    title: "คลินิกพิเศษเฉพาะทาง (นอกเวลาราชการ) - คลินิกจักษุ",
    category: "after_hours",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    content: "",
    document_url: "",
    deadline_at: null,
    published_at: "2026-07-22T09:00:00",
  },
  {
    id: 6,
    title: "คลินิกพิเศษเฉพาะทาง - คลินิกอายุรกรรม",
    category: "after_hours",
    image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
    content: "",
    document_url: "",
    deadline_at: null,
    published_at: "2026-07-23T09:00:00",
  },
  {
    id: 7,
    title: "ประกาศรับสมัครบุคคลเพื่อเลือกสรรเป็นพนักงานกระทรวงสาธารณสุข ตำแหน่ง พยาบาลวิชาชีพ",
    category: "job",
    image_url: "",
    content: "",
    document_url: "",
    deadline_at: "2026-08-15T16:30:00",
    published_at: "2026-07-20T09:00:00",
  },
  {
    id: 8,
    title: "ประกวดราคาจัดซื้อเครื่องเอกซเรย์เคลื่อนที่ ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์",
    category: "procurement",
    image_url: "",
    content: "",
    document_url: "",
    deadline_at: "2026-08-10T16:30:00",
    published_at: "2026-07-24T09:00:00",
  },
];
let nextId = 9;

export function getMemoryNews(category?: string): NewsItem[] {
  const list = category ? items.filter((n) => n.category === category) : items;
  return [...list].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export function addMemoryNews(data: Omit<NewsItem, "id" | "published_at">): NewsItem {
  const item: NewsItem = { ...data, id: nextId++, published_at: new Date().toISOString() };
  items.push(item);
  return item;
}

export function updateMemoryNews(id: number, data: Partial<Omit<NewsItem, "id">>): boolean {
  const idx = items.findIndex((n) => n.id === id);
  if (idx === -1) return false;
  items[idx] = { ...items[idx], ...data };
  return true;
}

export function deleteMemoryNews(id: number): boolean {
  const before = items.length;
  items = items.filter((n) => n.id !== id);
  return items.length < before;
}
