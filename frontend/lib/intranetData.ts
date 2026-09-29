export interface IntranetSystem {
  id: string;
  name: string; // ชื่อระบบหลัก เช่น Tiger HR, HRS, E-Office
  description: string; // รายละเอียด เช่น ระบบ SCAN ใบหน้า / ใบลา / OT
  category: "clinical" | "medical_records" | "personnel" | "organization";
  url: string; // ลิงก์ฮาร์ดโค้ด
  iconType: string;
  badgeBg?: string;
}

export interface IntranetCategory {
  id: "all" | "clinical" | "medical_records" | "personnel" | "organization";
  name: string;
}

export const INTRANET_CATEGORIES: IntranetCategory[] = [
  { id: "all", name: "ทั้งหมด" },
  { id: "clinical", name: "ระบบคลินิก / บริการผู้ป่วย" },
  { id: "medical_records", name: "ระบบเวชระเบียน / ข้อมูลการแพทย์" },
  { id: "personnel", name: "ระบบบุคลากร" },
  { id: "organization", name: "ระบบบริหารจัดการองค์กร" },
];

/**
 * รายการระบบทั้งหมดตามแบบดีไซน์ สามารถระบุ URL ได้ที่ช่อง `url: "..."`
 */
export const INTRANET_SYSTEMS: IntranetSystem[] = [
  // -------------------------------------------------------------
  // แถวที่ 1
  // -------------------------------------------------------------
  {
    id: "tiger-hr",
    name: "Tiger HR",
    description: "ระบบ Scan ใบหน้า / ใบลา / OT",
    category: "personnel",
    url: "#",
    iconType: "tiger_hr",
  },
  {
    id: "hrs",
    name: "HRS",
    description: "ระบบรายงานสารสนเทศโรงพยาบาล (HRS)",
    category: "medical_records",
    url: "#",
    iconType: "folders",
  },
  {
    id: "hmd",
    name: "HMD",
    description: "ระบบแดชบอร์ดบริหารโรงพยาบาล (HMD)",
    category: "medical_records",
    url: "#",
    iconType: "dashboard_monitor",
  },
  {
    id: "safemind-ai",
    name: "SAFEMIND AI",
    description: "ระบบอัจฉริยะดูแลจิตใจ ปลอดภัยทั้งอำเภอ",
    category: "clinical",
    url: "#",
    iconType: "safemind",
  },

  // -------------------------------------------------------------
  // แถวที่ 2
  // -------------------------------------------------------------
  {
    id: "e-office",
    name: "E-Office",
    description: "โปรแกรมสำนักงานอิเล็กทรอนิกส์ E-Office",
    category: "organization",
    url: "#",
    iconType: "e_office",
  },
  {
    id: "audio-visual",
    name: "โสตทัศนศึกษา",
    description: "ระบบงาน โสตทัศนศึกษา",
    category: "organization",
    url: "#",
    iconType: "multimedia",
  },
  {
    id: "itsm",
    name: "ITSM",
    description: "ระบบ ITSM / IT Service Management",
    category: "organization",
    url: "#",
    iconType: "itsm_diagram",
  },
  {
    id: "pms",
    name: "PMS",
    description: "ระบบประเมินผลการปฏิบัติงานราชการออนไลน์",
    category: "medical_records",
    url: "#",
    iconType: "pms_gauge",
  },

  // -------------------------------------------------------------
  // แถวที่ 3
  // -------------------------------------------------------------
  {
    id: "hrms-risk",
    name: "HRMS",
    description: "ระบบจัดการความเสี่ยงของสถานพยาบาล",
    category: "organization",
    url: "#",
    iconType: "risk_chart",
  },
  {
    id: "appointment",
    name: "ระบบนัดหมาย",
    description: "ระบบรายการนัดตามช่วงเวลา",
    category: "clinical",
    url: "#",
    iconType: "calendar_appointment",
  },
  {
    id: "nana-refill",
    name: "NANA Refill",
    description: "ระบบ Refill ยา",
    category: "clinical",
    url: "#",
    iconType: "nana_refill",
  },
  {
    id: "saline-requisition",
    name: "ระบบเบิกน้ำเกลือ",
    description: "ระบบเบิกน้ำเกลือ",
    category: "clinical",
    url: "#",
    iconType: "iv_bottle",
  },

  // -------------------------------------------------------------
  // แถวที่ 4
  // -------------------------------------------------------------
  {
    id: "ipd-medical-record",
    name: "ระบบติดตามเวชระเบียน",
    description: "ระบบติดตามเวชระเบียนผู้ป่วยใน",
    category: "medical_records",
    url: "#",
    iconType: "medical_record_track",
  },
  {
    id: "p4p",
    name: "P4P",
    description: "Pay for Performance : P4P",
    category: "personnel",
    url: "#",
    iconType: "p4p_system",
  },
  {
    id: "salary",
    name: "Salary",
    description: "ระบบข้อมูลเงินเดือน รพ.ปากช่องนานา",
    category: "personnel",
    url: "#",
    iconType: "salary_system",
  },
  {
    id: "telegram-alert",
    name: "Telegram Alert",
    description: "ระบบลงทะเบียน Telegram แจ้งเตือนข้อมูลเงินเดือน",
    category: "personnel",
    url: "#",
    iconType: "telegram_alert",
  },

  // -------------------------------------------------------------
  // แถวที่ 5
  // -------------------------------------------------------------
  {
    id: "kphis",
    name: "KPHIS",
    description: "KPHIS ระบบลงข้อมูลผู้ป่วยใน",
    category: "medical_records",
    url: "#",
    iconType: "kphis_network",
  },
  {
    id: "rmc-plus",
    name: "RMC+",
    description: "ระบบบริหารจัดการเครื่องมือแพทย์",
    category: "organization",
    url: "#",
    iconType: "rmc_plus",
  },
  {
    id: "lab-online",
    name: "LAB Online",
    description: "ระบบรายงานผล Lab Online",
    category: "medical_records",
    url: "#",
    iconType: "lab_atom",
  },
  {
    id: "tonkla-clinic",
    name: "Tonkla Clinic",
    description: "คลินิกต้นกล้า",
    category: "clinical",
    url: "#",
    iconType: "tonkla_plant",
  },

  // -------------------------------------------------------------
  // แถวที่ 6
  // -------------------------------------------------------------
  {
    id: "ipiss",
    name: "IPISS",
    description: "ระบบบันทึกคะแนนและประเมินผลตามแผนฯ IPISS",
    category: "medical_records",
    url: "#",
    iconType: "rubiks_cube",
  },
  {
    id: "hrd",
    name: "HRD",
    description: "ระบบบันทึกข้อมูลไปราชการ/ประชุม/อบรม",
    category: "personnel",
    url: "#",
    iconType: "hrd_rainbow",
  },
  {
    id: "high-cost",
    name: "ระบบขออนุมัติรายการที่มีค่าใช้จ่ายสูง",
    description: "ขออนุมัติรายการที่มีค่าใช้จ่ายสูง",
    category: "organization",
    url: "#",
    iconType: "cost_approval",
  },
  {
    id: "env",
    name: "ENV",
    description: "งานสิ่งแวดล้อมและความปลอดภัย (ENV)",
    category: "organization",
    url: "#",
    iconType: "env_globe",
  },

  // -------------------------------------------------------------
  // แถวที่ 7
  // -------------------------------------------------------------
  {
    id: "procurement",
    name: "ระบบจัดซื้อจัดจ้าง",
    description: "ระบบจัดซื้อจัดจ้าง",
    category: "organization",
    url: "#",
    iconType: "invoice_procurement",
  },
  {
    id: "digital-hr",
    name: "ระบบบริหารจัดการทรัพยากรบุคคลดิจิทัล",
    description: "บริหารทรัพยากรบุคคล",
    category: "organization",
    url: "#",
    iconType: "door_exit",
  },
  {
    id: "wsu-act",
    name: "ระบบรายงาน พรบ.",
    description: "ระบบรายงาน พรบ.",
    category: "medical_records",
    url: "#",
    iconType: "wsu_act_book",
  },
  {
    id: "debtor",
    name: "ระบบจัดเก็บลูกหนี้ต้นสังกัด",
    description: "โรงพยาบาลปากช่องนานา",
    category: "organization",
    url: "#",
    iconType: "debtor_robot",
  },

  // -------------------------------------------------------------
  // แถวที่ 8
  // -------------------------------------------------------------
  {
    id: "opd-tracker",
    name: "PakChong OPD Tracker",
    description: "ระบบติดตามระยะเวลารับบริการผู้ป่วยนอก",
    category: "clinical",
    url: "#",
    iconType: "opd_hourglass",
  },
  {
    id: "death-certificate",
    name: "Death Certificate",
    description: "ระบบออกหนังสือรับรองการตายอิเล็กทรอนิกส์ (EMDC)",
    category: "clinical",
    url: "#",
    iconType: "death_certificate",
  },

  // -------------------------------------------------------------
  // ระบบเพิ่มเติมที่มีในรายการหมวดหมู่ของดีไซน์
  // -------------------------------------------------------------
  {
    id: "cssd",
    name: "ระบบรายงานจ่ายกลาง",
    description: "ระบบจ่ายกลาง (CSSD)",
    category: "clinical",
    url: "#",
    iconType: "supply_cart",
  },
  {
    id: "psychology",
    name: "รายงานผลจิตวิทยาคลินิก",
    description: "รายงานผลจิตวิทยาคลินิก",
    category: "medical_records",
    url: "#",
    iconType: "psychology_brain",
  },
  {
    id: "disability-cert",
    name: "แพลตฟอร์มออกเอกสารรับรองความพิการ",
    description: "เอกสารรับรองความพิการ",
    category: "medical_records",
    url: "#",
    iconType: "disability_support",
  },
  {
    id: "repair-online",
    name: "ระบบแจ้งซ่อมออนไลน์ (rmcdotnet)",
    description: "ระบบแจ้งซ่อมออนไลน์ รพ.ปากช่องนานา",
    category: "organization",
    url: "#",
    iconType: "technicians_repair",
  },
];
