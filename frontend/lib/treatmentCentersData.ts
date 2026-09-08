export interface TreatmentCenter {
  id: number;
  slug: string;
  title_th: string;
  title_en: string;
  icon_type: string;
  description: string;
  highlight_text: string;
  banners: string[];
  services: string[];
  facilities: string[];
  hours_regular: string;
  hours_after: string;
  hours_emergency: string;
  contact_ext: string;
  doctor_department: string;
  display_order: number;
  is_active?: number;
}

export const CENTER_ICON_TYPES = [
  "shield-alert",
  "heart-pulse",
  "stethoscope",
  "scissors",
  "smile",
  "baby",
  "bone",
  "activity",
  "heart",
  "file-text",
  "eye",
  "sparkles",
] as const;

const B = ["/img/indexbanner/herobannertest01.png", "/img/indexbanner/herobannertest02.png"];

let centers: TreatmentCenter[] = [
  {
    id: 1,
    slug: "emergency",
    title_th: "ศูนย์อุบัติเหตุและฉุกเฉิน",
    title_en: "Emergency & Trauma Center",
    icon_type: "shield-alert",
    description:
      "ให้บริการดูแลรักษาผู้ป่วยภาวะฉุกเฉินวิกฤตและอุบัติเหตุตลอด 24 ชั่วโมง โดยทีมแพทย์เฉพาะทางด้านเวชศาสตร์ฉุกเฉินและพยาบาลวิชาชีพผู้เชี่ยวชาญ พร้อมด้วยรถพยาบาลฉุกเฉินระดับสูง (Advanced Life Support)",
    highlight_text: "พร้อมดูแลคุณทุกวินาทีชีวิต ด้วยระบบการช่วยชีวิตขั้นสูง 24 ชั่วโมง",
    banners: B,
    services: [
      "บริการรับแจ้งเหตุและช่วยชีวิตผู้ป่วยฉุกเฉิน 24 ชั่วโมง",
      "ศูนย์รับผู้ป่วยอุบัติเหตุรุนแรงและผ่าตัดฉุกเฉิน (Trauma Center)",
      "รถพยาบาลฉุกเฉินพร้อมอุปกรณ์กู้ชีพขั้นสูง (ALS Ambulance)",
      "ห้องกู้ชีพ (Resuscitation Room) พร้อมเครื่องกระตุกหัวใจและเครื่องช่วยหายใจ",
      "การคัดแยกประเภทผู้ป่วย (Triage System) ตามความรุนแรงของโรค",
    ],
    facilities: [
      "ห้องกู้ชีพและผ่าตัดเล็กฉุกเฉิน",
      "เครื่องกระตุกไฟฟ้าหัวใจ (Defibrillator)",
      "เครื่องช่วยหายใจชนิดเคลื่อนย้ายได้",
      "จุดจอดรถพยาบาลกู้ชีพฉุกเฉิน (Ambulance Bay)",
    ],
    hours_regular: "เปิดบริการตลอด 24 ชั่วโมง (ทุกวัน)",
    hours_after: "",
    hours_emergency: "สายด่วนฉุกเฉิน โทร 1669 หรือ 044-311856 ต่อ 101-102",
    contact_ext: "101, 102, 103",
    doctor_department: "เวชศาสตร์ฉุกเฉิน",
    display_order: 1,
  },
  {
    id: 2,
    slug: "obgyn",
    title_th: "ศูนย์สูตินรีเวชกรรม",
    title_en: "Obstetrics & Gynecology Center",
    icon_type: "heart-pulse",
    description:
      "ให้บริการตรวจวินิจฉัยและรักษาโรคสตรี ให้บริการฝากครรภ์ คลอดบุตร และการผ่าตัดทางสูตินรีเวช โดยทีมสูตินรีแพทย์ผู้เชี่ยวชาญ พร้อมห้องคลอดและห้องพักฟื้นที่ได้มาตรฐานความปลอดภัยสูง",
    highlight_text: "ดูแลสุขภาพสตรีทุกช่วงวัย และเคียงข้างคุณแม่อย่างอบอุ่นตลอดการตั้งครรภ์",
    banners: B,
    services: [
      "บริการฝากครรภ์คุณภาพ และการตรวจคัดกรองความผิดปกติของทารกในครรภ์",
      "บริการทำคลอดธรรมชาติ และผ่าตัดทำคลอด (Cesarean Section)",
      "ตรวจอัลตราซาวด์ 4 มิติ ดูพัฒนาการทารกในครรภ์",
      "ตรวจคัดกรองมะเร็งปากมดลูก (Pap Smear / HPV DNA Test)",
      "รักษาโรคสตรี เช่น เนื้องอกมดลูก ถุงน้ำรังไข่ และผ่าตัดผ่านกล้องทางนรีเวช",
    ],
    facilities: [
      "ห้องคลอดส่วนตัวมาตรฐานความปลอดภัย",
      "เครื่องอัลตราซาวด์ 4D ทันสมัย",
      "ห้องผ่าตัดผ่านกล้องทางนรีเวช",
      "ห้องพักฟื้นคุณแม่หลังคลอดพร้อมทารก",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "คลินิกพิเศษนอกเวลา : จันทร์ - ศุกร์ 16.30 - 20.00 น. / เสาร์ - อาทิตย์ 08.30 - 12.00 น.",
    hours_emergency: "",
    contact_ext: "201, 202",
    doctor_department: "สูติ-นรีเวชกรรม",
    display_order: 2,
  },
  {
    id: 3,
    slug: "internal",
    title_th: "ศูนย์อายุรกรรม",
    title_en: "Internal Medicine Center",
    icon_type: "stethoscope",
    description:
      "ให้บริการตรวจวินิจฉัยและรักษาโรคทางอายุรกรรมทั่วไปและโรคเรื้อรัง เช่น โรคหัวใจ ความดันโลหิตสูง เบาหวาน โรคไต โรคระบบทางเดินอาหาร และโรคระบบหายใจ",
    highlight_text: "ดูแลรักษาโรคเฉพาะทางโดยทีมอายุรแพทย์ผู้เชี่ยวชาญ เพื่อคุณภาพชีวิตที่ดีอย่างยั่งยืน",
    banners: B,
    services: [
      "ตรวจรักษาโรคทั่วไป และโรคเรื้อรัง (เบาหวาน, ความดัน, ไขมันในเลือดสูง)",
      "คลินิกโรคหัวใจและหลอดเลือด (Cardiology Clinic)",
      "คลินิกโรคไตและฟอกเลือดด้วยเครื่องไตเทียม (Hemodialysis Center)",
      "คลินิกโรคระบบทางเดินอาหารและตับ (Gastroenterology)",
      "คลินิกโรคระบบหายใจและปอด (Pulmonology)",
    ],
    facilities: [
      "เครื่องตรวจคลื่นไฟฟ้าหัวใจ EKG & Echo",
      "ศูนย์ฟอกเลือดด้วยเครื่องไตเทียมทันสมัย",
      "ห้องส่องกล้องระบบทางเดินอาหาร",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "คลินิกนอกเวลา : จันทร์ - ศุกร์ 16.30 - 20.00 น.",
    hours_emergency: "",
    contact_ext: "301, 302, 305",
    doctor_department: "อายุรกรรม",
    display_order: 3,
  },
  {
    id: 4,
    slug: "surgery",
    title_th: "ศูนย์ศัลยกรรม",
    title_en: "Surgical Center",
    icon_type: "scissors",
    description:
      "ให้บริการผ่าตัดและวินิจฉัยโรคทางศัลยกรรมทั่วไป ศัลยกรรมผ่านกล้องแผลเล็ก (Laparoscopic Surgery) และศัลยกรรมทางระบบปัสสาวะ โดยทีมศัลยแพทย์ผู้เชี่ยวชาญ",
    highlight_text: "ผ่าตัดแผลเล็ก ฟื้นตัวไว มั่นใจด้วยมาตรฐานความปลอดภัยระดับสากล",
    banners: B,
    services: [
      "ศัลยกรรมทั่วไป (ผ่าตัดไส้ติ่ง, นิ่วในถุงน้ำดี, ไส้เลื่อน, ก้อนเนื้อ)",
      "ศัลยกรรมผ่าตัดผ่านกล้องแผลเล็ก (MIS / Laparoscopic Surgery)",
      "ศัลยกรรมระบบทางเดินปัสสาวะ (ผ่าตัดโรคนิ่ว, ต่อมลูกหมากโต)",
      "ศัลยกรรมตกแต่งบาดแผลและศัลยกรรมหลอดเลือด",
    ],
    facilities: [
      "ห้องผ่าตัดแรงดันบวก (Positive Pressure OR)",
      "กล้องส่องผ่าตัดความคมชัดสูง 4K",
      "ห้องพักฟื้นผู้ป่วยหลังผ่าตัด (PACU)",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "",
    hours_emergency: "เคสผ่าตัดฉุกเฉินพร้อมให้บริการตลอด 24 ชั่วโมง",
    contact_ext: "401, 402",
    doctor_department: "ศัลยกรรมทั่วไป",
    display_order: 4,
  },
  {
    id: 5,
    slug: "dental",
    title_th: "ศูนย์ทันตกรรม",
    title_en: "Dental Center",
    icon_type: "smile",
    description:
      "ให้บริการดูแลสุขภาพช่องปากและฟันครบวงจร ทั้งทันตกรรมทั่วไป ทันตกรรมประดิษฐ์ จัดฟัน ผ่าฟันครุฑ และทันตกรรมศัลยกรรมริมฝีปากเพดานแหว่ง",
    highlight_text: "รอยยิ้มสดใส สุขภาพฟันแข็งแรง ด้วยเครื่องมือสะอาดปราศจากเชื้อ 100%",
    banners: B,
    services: [
      "ตรวจสุขภาพช่องปาก ขูดหินปูน อุดฟัน ถอนฟัน",
      "ผ่าฟันครุฑ ศัลยกรรมช่องปากและใบหน้า",
      "รักษารากฟัน (Endodontics) และรักษาโรคเหงือก",
      "ใส่ฟันปลอม ทำครอบฟัน สะพานฟัน และรากฟันเทียม",
      "ทันตกรรมจัดฟัน และทันตกรรมสำหรับเด็ก",
    ],
    facilities: [
      "ยูนิตทันตกรรมทันสมัยปลอดเชื้อ",
      "เครื่องเอกซเรย์ฟันระบบดิจิทัล 3D / OPG",
      "ระบบอบฆ่าเชื้อเครื่องมือมาตรฐานสากล Autoclave",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.30 - 16.00 น.",
    hours_after: "คลินิกนอกเวลา : จันทร์ - พฤหัสบดี 16.30 - 20.00 น.",
    hours_emergency: "",
    contact_ext: "501, 502",
    doctor_department: "ทันตกรรม",
    display_order: 5,
  },
  {
    id: 6,
    slug: "pediatrics",
    title_th: "ศูนย์กุมารเวชกรรม",
    title_en: "Pediatric Center",
    icon_type: "baby",
    description:
      "ให้บริการตรวจรักษาโรคในเด็ก ตั้งแต่วัยทารกแรกเกิดจนถึงวัยรุ่น ให้บริการฉีดวัคซีนตามวัย และส่งเสริมพัฒนาการเด็กอย่างสมบูรณ์",
    highlight_text: "ดูแลเอาใจใส่เจ้าตัวเล็กด้วยความรัก และความเชี่ยวชาญจากกุมารแพทย์",
    banners: B,
    services: [
      "ตรวจรักษาโรคทั่วไปในเด็ก และโรคติดเชื้อในเด็ก",
      "คลินิกวัคซีนเด็ก และประเมินพัฒนาการตามวัย",
      "หอผู้ป่วยวิกฤตทารกแรกเกิด (NICU)",
      "ให้คำปรึกษาการเลี้ยงลูกด้วยนมแม่และโภชนาการเด็ก",
    ],
    facilities: [
      "มุมของเล่นเสริมพัฒนาการเด็กแยกโซนปลอดเชื้อ",
      "ตู้บ่มทารกและเครื่องส่องไฟรักษาภาวะตัวเหลือง",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "คลินิกนอกเวลา : เสาร์ - อาทิตย์ 08.30 - 12.00 น.",
    hours_emergency: "",
    contact_ext: "601, 602",
    doctor_department: "กุมารเวชกรรม",
    display_order: 6,
  },
  {
    id: 7,
    slug: "orthopedics",
    title_th: "ศูนย์กระดูกและข้อ",
    title_en: "Orthopedic Center",
    icon_type: "bone",
    description:
      "ให้บริการตรวจรักษา ผ่าตัด และฟื้นฟูผู้ป่วยโรคกระดูก ข้อต่อ เส้นเอ็น และกล้ามเนื้อ รวมถึงการผ่าตัดเปลี่ยนข้อเข่า-ข้อสะโพกเทียม",
    highlight_text: "คืนความเคลื่อนไหวที่คล่องตัว เพื่อการดำเนินชีวิตอย่างไร้ขีดจำกัด",
    banners: B,
    services: [
      "รักษาอุบัติเหตุกระดูกหัก ข้อเคล็ด และข้อหลุด",
      "ผ่าตัดเปลี่ยนข้อเข่าเทียม และข้อสะโพกเทียม (Joint Replacement)",
      "ผ่าตัดผ่านกล้องส่องข้อ (Arthroscopic Surgery)",
      "รักษาอาการปวดหลัง หมอนรองกระดูกทับเส้นประสาท",
    ],
    facilities: [
      "เครื่องเอกซเรย์คอมพิวเตอร์ดิจิทัล C-Arm ในห้องผ่าตัด",
      "อุปกรณ์กายภาพบำบัดฟื้นฟูข้อต่อเฉพาะทาง",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "701, 702",
    doctor_department: "ศัลยศาสตร์ออร์โธปิดิกส์",
    display_order: 7,
  },
  {
    id: 8,
    slug: "physical-therapy",
    title_th: "ศูนย์กายภาพบำบัด",
    title_en: "Physical Therapy Center",
    icon_type: "activity",
    description:
      "ให้บริการฟื้นฟูสมรรถภาพร่างกาย รักษาอาการปวดออฟฟิศซินโดรม ผู้ป่วยอัมพฤกษ์ อัมพาต ผู้ป่วยหลังผ่าตัด และผู้บาดเจ็บจากการเล่นกีฬา",
    highlight_text: "ฟื้นฟูร่างกายอย่างตรงจุด คลายปวด ปรับโครงสร้างร่างกายให้แข็งแรง",
    banners: B,
    services: [
      "กายภาพบำบัดลดปวด ออฟฟิศซินโดรม ปวดคอ บ่า หลัง",
      "ฟื้นฟูผู้ป่วยโรคหลอดเลือดสมอง (Stroke Rehabilitation)",
      "กายภาพบำบัดผู้ป่วยหลังผ่าตัดกระดูกและข้อ",
      "การรักษาด้วยคลื่นอัลตราซาวด์ แสงเลเซอร์บำบัด และการดึงคอ-ดึงหลัง",
    ],
    facilities: [
      "เครื่องบำบัดด้วยคลื่นกระแทก High-Intensity Laser / Shockwave",
      "เตียงดึงคอและหลังไฟฟ้าอัตโนมัติ",
      "ห้องฝึกกายภาพบำบัดกว้างขวาง",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "801, 802",
    doctor_department: "เวชศาสตร์ฟื้นฟู",
    display_order: 8,
  },
  {
    id: 9,
    slug: "rehab",
    title_th: "ศูนย์เวชศาสตร์ฟื้นฟู",
    title_en: "Rehabilitation Center",
    icon_type: "heart",
    description:
      "ให้บริการประเมินและวางแผนฟื้นฟูสมรรถภาพร่างกาย กิจกรรมบำบัด และฝึกพูด สำหรับผู้ป่วยบาดเจ็บทางสมอง ไขสันหลัง และผู้สูงอายุ",
    highlight_text: "ช่วยให้ผู้ป่วยกลับมาพึ่งพาตนเองได้ และมีคุณภาพชีวิตที่ดีขึ้น",
    banners: B,
    services: [
      "กิจกรรมบำบัด (Occupational Therapy) ฝึกการกลืนและการขับถ่าย",
      "อรรถบำบัด (Speech Therapy) ฝึกการพูดและสื่อสาร",
      "การจัดทำอุปกรณ์ประคองและกายอุปกรณ์เสริม",
    ],
    facilities: [
      "ห้องฝึกกิจกรรมบำบัดเสมือนบ้านจริง",
      "อุปกรณ์ฝึกเดินและฝึกทรงตัว",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.30 - 16.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "805",
    doctor_department: "เวชศาสตร์ฟื้นฟู",
    display_order: 9,
  },
  {
    id: 10,
    slug: "ent",
    title_th: "ศูนย์หู คอ จมูก",
    title_en: "ENT Center",
    icon_type: "file-text",
    description:
      "ให้บริการตรวจวินิจฉัยและรักษาโรคของหู คอ จมูก โรคภูมิแพ้ โรคไซนัสอักเสบ เสียงแหบ ก้อนที่คอ และอาการตรวจการได้ยิน",
    highlight_text: "ดูแลระบบทางการหายใจส่วนบนและการได้ยินอย่างเชี่ยวชาญ",
    banners: B,
    services: [
      "ตรวจส่องกล้องไซนัส และผ่าตัดส่องกล้องกล่องเสียง",
      "ตรวจการได้ยิน (Audiogram) และใส่เครื่องช่วยฟัง",
      "รักษาโรคภูมิแพ้ทางจมูก ไซนัสอักเสบ และนอนกรน",
    ],
    facilities: [
      "ห้องตรวจส่องกล้องไร้เสียง (Audiometric Soundproof Booth)",
      "ชุดส่องกล้องตรวจไซนัสและกล่องเสียงความละเอียดสูง",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "901",
    doctor_department: "หู คอ จมูก",
    display_order: 10,
  },
  {
    id: 11,
    slug: "eye",
    title_th: "ศูนย์จักษุ (ตา)",
    title_en: "Eye / Ophthalmology Center",
    icon_type: "eye",
    description:
      "ให้บริการตรวจวัดสายตา ตรวจคัดกรองต้อกระจก ต้อหิน ต้อเนื้อ มะเร็งตา และผ่าตัดต้อกระจกสลายต้อด้วยคลื่นความถี่สูง (Phacoemulsification)",
    highlight_text: "ถนอมดวงตาคู่สดใส เพื่อการมองเห็นที่คมชัดยาวนาน",
    banners: B,
    services: [
      "ตรวจวัดสายตาและตรวจสุขภาพดวงตาประจำปี",
      "ผ่าตัดสลายต้อกระจกใส่เลนส์แก้วตาเทียม (Phacoemulsification)",
      "รักษาต้อหิน ต้อเนื้อ และจอตาเสื่อมจากเบาหวาน",
    ],
    facilities: [
      "เครื่องสลายต้อกระจกด้วยคลื่นเสียงความถี่สูง Phacoemulsifier",
      "กล้องถ่ายภาพจอประสาทตาชนิดไม่ต้องขยายม่านตา",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    hours_after: "",
    hours_emergency: "",
    contact_ext: "951",
    doctor_department: "จักษุ",
    display_order: 11,
  },
  {
    id: 12,
    slug: "thai",
    title_th: "ศูนย์แพทย์แผนไทยและการแพทย์ทางเลือก",
    title_en: "Thai Traditional & Alternative Medicine Center",
    icon_type: "sparkles",
    description:
      "ให้บริการนวดรักษาโรค นวดประคบสมุนไพร ทับหม้อเกลือหลังคลอด ฝังเข็มรักษาโรค และจ่ายยาสมุนไพรไทยโดยแพทย์แผนไทยและแพทย์แผนจีนวิชาชีพ",
    highlight_text: "บำบัดรักษาด้วยภูมิปัญญาไทยและศาสตร์การแพทย์ทางเลือกที่ได้มาตรฐาน",
    banners: B,
    services: [
      "นวดราชสำนักรักษาอาการปวดสะบัก ปวดคอ หลัง ขา",
      "การประคบสมุนไพรสด และการอบสมุนไพรบำบัด",
      "บริการทับหม้อเกลือและดูแลฟื้นฟูคุณแม่หลังคลอด",
      "บริการฝังเข็ม ครอบแก้ว บำบัดอาการปวดตามจุด (Acupuncture)",
      "ตรวจรักษาและจ่ายยาสมุนไพรไทยตำรับมาตรฐาน",
    ],
    facilities: [
      "ห้องนวดบำบัดรักษาเป็นส่วนตัวเงียบสงบ",
      "ตู้อบสมุนไพรไทยแยกชาย-หญิง",
      "ห้องฝังเข็มสะอาดพร้อมอุปกรณ์ใช้ครั้งเดียวทิ้ง",
    ],
    hours_regular: "จันทร์ - ศุกร์ : 08.30 - 16.30 น.",
    hours_after: "เสาร์ - อาทิตย์ : 08.30 - 15.30 น. (เปิดให้บริการนวดและฝังเข็ม)",
    hours_emergency: "",
    contact_ext: "980, 981",
    doctor_department: "แพทย์แผนไทย",
    display_order: 12,
  },
];
let nextId = 13;

export function getMemoryTreatmentCenters(slug?: string): TreatmentCenter[] {
  const list = slug ? centers.filter((c) => c.slug === slug) : centers;
  return [...list].sort((a, b) => a.display_order - b.display_order);
}

export function addMemoryTreatmentCenter(
  data: Omit<TreatmentCenter, "id">
): TreatmentCenter {
  const center = { ...data, id: nextId++ };
  centers.push(center);
  return center;
}

export function updateMemoryTreatmentCenter(
  id: number,
  data: Partial<Omit<TreatmentCenter, "id">>
): boolean {
  const idx = centers.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  centers[idx] = { ...centers[idx], ...data };
  return true;
}

export function deleteMemoryTreatmentCenter(id: number): boolean {
  const before = centers.length;
  centers = centers.filter((c) => c.id !== id);
  return centers.length < before;
}
