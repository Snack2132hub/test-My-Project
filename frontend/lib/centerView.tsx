import type { ElementType } from "react";
import {
  ShieldAlert,
  HeartPulse,
  Stethoscope,
  Scissors,
  Smile,
  Baby,
  Bone,
  Activity,
  Heart,
  Eye,
  FileText,
  Sparkles,
} from "lucide-react";
import type { Center } from "@/lib/centersData";

export interface UIDoctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  schedule: string;
  image: string;
}

export interface UICenter {
  id: string; // slug
  titleTh: string;
  titleEn: string;
  icon: ElementType;
  description: string;
  highlightText: string;
  banners: string[];
  services: string[];
  facilities: string[];
  serviceHours: { regular: string; afterHours?: string; emergency?: string };
  contactExt: string;
  doctorDepartment: string;
}

// ไอคอนของแต่ละศูนย์ผูกกับ slug (เป็นเรื่องการแสดงผล จึงไม่เก็บในฐานข้อมูล)
export const CENTER_ICON_BY_SLUG: Record<string, ElementType> = {
  diabetes: Activity,
  hypertension: HeartPulse,
  cancer: FileText,
  emergency: ShieldAlert,
  obgyn: HeartPulse,
  internal: Stethoscope,
  surgery: Scissors,
  dental: Smile,
  pediatrics: Baby,
  orthopedics: Bone,
  "physical-therapy": Activity,
  rehab: Heart,
  ent: FileText,
  eye: Eye,
  thai: Sparkles,
};

export const FALLBACK_BANNER = "/img/indexbanner/herobannertest01.png";

export function toUICenter(c: Center): UICenter {
  return {
    id: c.slug,
    titleTh: c.title_th,
    titleEn: c.title_en,
    icon: CENTER_ICON_BY_SLUG[c.slug] || Stethoscope,
    description: c.description,
    highlightText: c.highlight_text,
    banners: c.banners.length ? c.banners : [FALLBACK_BANNER],
    services: c.services,
    facilities: c.facilities,
    serviceHours: {
      regular: c.hours_regular,
      afterHours: c.hours_after || undefined,
      emergency: c.hours_emergency || undefined,
    },
    contactExt: c.contact_ext,
    doctorDepartment: c.doctor_department,
  };
}

interface ApiDoctor {
  id: number;
  name: string;
  position: string;
  department: string;
  specialties: string[];
  schedules: string[];
  image: string;
}

export function toUIDoctor(d: ApiDoctor): UIDoctor {
  return {
    id: String(d.id),
    name: d.name,
    title: d.position || "แพทย์ประจำศูนย์",
    specialty: d.specialties?.[0] || d.department || "-",
    schedule: d.schedules?.[0] || "ตามตารางออกตรวจ",
    image: d.image || "",
  };
}
