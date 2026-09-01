export interface DepartmentItem {
  id: number;
  dept: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

let items: DepartmentItem[] = [];
let nextId = 1;

export function getMemoryDepartmentItems(dept?: string): DepartmentItem[] {
  return [...items]
    .filter(i => !dept || i.dept === dept)
    .sort((a, b) => a.display_order - b.display_order);
}

export function addMemoryDepartmentItem(data: Omit<DepartmentItem, "id">): DepartmentItem {
  const item = { ...data, id: nextId++ };
  items.push(item);
  return item;
}

export function updateMemoryDepartmentItem(id: number, data: Partial<Omit<DepartmentItem, "id">>): boolean {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return false;
  items[idx] = { ...items[idx], ...data };
  return true;
}

export function deleteMemoryDepartmentItem(id: number): boolean {
  const before = items.length;
  items = items.filter(i => i.id !== id);
  return items.length < before;
}
