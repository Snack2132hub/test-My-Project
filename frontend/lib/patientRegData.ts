export interface RegStep {
  id: number;
  title: string;
  description: string;
  display_order: number;
}

let steps: RegStep[] = [];
let nextId = 1;

export function getMemoryRegSteps(): RegStep[] {
  return [...steps].sort((a, b) => a.display_order - b.display_order);
}

export function addMemoryRegStep(data: Omit<RegStep, "id">): RegStep {
  const step = { ...data, id: nextId++ };
  steps.push(step);
  return step;
}

export function updateMemoryRegStep(id: number, data: Partial<Omit<RegStep, "id">>): boolean {
  const idx = steps.findIndex(s => s.id === id);
  if (idx === -1) return false;
  steps[idx] = { ...steps[idx], ...data };
  return true;
}

export function deleteMemoryRegStep(id: number): boolean {
  const before = steps.length;
  steps = steps.filter(s => s.id !== id);
  return steps.length < before;
}
