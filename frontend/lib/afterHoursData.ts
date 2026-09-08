export interface AfterHoursClinic {
  id: number;
  clinic_name: string;
  specialist: string;
  doctor_name: string;
  schedule: string;
  phone: string;
  display_order: number;
}

let clinics: AfterHoursClinic[] = [];
let nextId = 1;

export function getMemoryAfterHoursClinics(): AfterHoursClinic[] {
  return [...clinics].sort((a, b) => a.display_order - b.display_order);
}

export function addMemoryAfterHoursClinic(data: Omit<AfterHoursClinic, "id">): AfterHoursClinic {
  const clinic = { ...data, id: nextId++ };
  clinics.push(clinic);
  return clinic;
}

export function updateMemoryAfterHoursClinic(id: number, data: Partial<Omit<AfterHoursClinic, "id">>): boolean {
  const idx = clinics.findIndex(c => c.id === id);
  if (idx === -1) return false;
  clinics[idx] = { ...clinics[idx], ...data };
  return true;
}

export function deleteMemoryAfterHoursClinic(id: number): boolean {
  const before = clinics.length;
  clinics = clinics.filter(c => c.id !== id);
  return clinics.length < before;
}
