export interface Banner {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  show_content: boolean;
  display_order: number;
  is_active: boolean;
}

let banners: Banner[] = [
  {
    id: 1,
    image_url: "/img/indexbanner/herobannertest01.png",
    title: "โรงพยาบาลปากช่องนานา",
    subtitle: "Pakchongnana Hospital",
    description: "ร่วมใจ ใฝ่บริการ บริการดุจญาติมิตร เพื่อสุขภาพที่ดีของท่าน",
    button_text: "เกี่ยวกับเรา",
    show_content: true,
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    image_url: "/img/indexbanner/herobannertest03.png",
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    show_content: false,
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    image_url: "/img/indexbanner/herobannertest04.png",
    title: "",
    subtitle: "",
    description: "",
    button_text: "",
    show_content: false,
    display_order: 3,
    is_active: true,
  },
];

let nextId = 4;

export function getMemoryBanners(): Banner[] {
  return [...banners].sort((a, b) => a.display_order - b.display_order);
}

export function addMemoryBanner(data: Omit<Banner, "id">): Banner {
  const banner: Banner = { ...data, id: nextId++ };
  banners.push(banner);
  return banner;
}

export function updateMemoryBanner(id: number, data: Partial<Omit<Banner, "id">>): boolean {
  const idx = banners.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  banners[idx] = { ...banners[idx], ...data };
  return true;
}

export function deleteMemoryBanner(id: number): boolean {
  const before = banners.length;
  banners = banners.filter((b) => b.id !== id);
  return banners.length < before;
}
