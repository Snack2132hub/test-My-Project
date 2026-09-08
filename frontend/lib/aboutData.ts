export interface Executive {
  id: number;
  name: string;
  position: string;
  department: string;
  image_url: string;
  display_order: number;
}

let executives: Executive[] = [
  { id: 1, name: "", position: "ผู้อำนวยการโรงพยาบาล", department: "โรงพยาบาลปากช่องนานา", image_url: "", display_order: 1 },
  { id: 2, name: "", position: "รองผู้อำนวยการฝ่ายการแพทย์", department: "โรงพยาบาลปากช่องนานา", image_url: "", display_order: 2 },
];
let nextExecId = 10;

export function getMemoryExecutives(): Executive[] {
  return [...executives].sort((a, b) => a.display_order - b.display_order);
}
export function addMemoryExecutive(data: Omit<Executive, "id">): Executive {
  const item = { ...data, id: nextExecId++ };
  executives.push(item);
  return item;
}
export function updateMemoryExecutive(id: number, data: Partial<Executive>): boolean {
  const idx = executives.findIndex(e => e.id === id);
  if (idx === -1) return false;
  executives[idx] = { ...executives[idx], ...data };
  return true;
}
export function deleteMemoryExecutive(id: number): boolean {
  const before = executives.length;
  executives = executives.filter(e => e.id !== id);
  return executives.length < before;
}

// Org chart — single image URL
let orgChartUrl = "";
export function getOrgChartUrl(): string { return orgChartUrl; }
export function setOrgChartUrl(url: string): void { orgChartUrl = url; }
