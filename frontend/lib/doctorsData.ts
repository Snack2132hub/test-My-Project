export interface Doctor {
  id: number;
  name: string;
  department: string;
  departmentCategory: string;
  position: string;
  positions: string[];
  specialties: string[];
  education: string[];
  schedules: string[];
  contributions: string[];
  image: string;
  originalImg?: string;
}

export const POSITION_LEVELS: string[] = [
  "ทั้งหมด",
  "นายแพทย์เชี่ยวชาญ",
  "นายแพทย์ชำนาญการพิเศษ",
  "นายแพทย์ชำนาญการ"
];

export const MEDICAL_CENTERS: string[] = [
  "ทั้งหมด",
  "สูตินรีเวช",
  "ศัลยกรรมทั่วไป",
  "ศัลยกรรมยูโรวิทยา",
  "ศัลยศาสตร์ออร์โธปิดิกส์",
  "อายุรกรรม",
  "กุมารเวชกรรม",
  "จักษุวิทยา",
  "รังสีวิทยาวินิจฉัย",
  "วิสัญญี",
  "เวชศาสตร์ฟื้นฟู",
  "จิตเวชศาสตร์",
  "โสต ศอ นาสิก",
  "เวชศาสตร์ฉุกเฉิน",
  "เวชบำบัดวิกฤต",
  "เวชศาสตร์ครอบครัว"
];

export const DOCTORS_DATA: Doctor[] = [
  {
    "id": 101,
    "name": "นพ.บุญชัย กิ่งเพ็ชรรุ่งเรือง",
    "department": "สูติ-นรีเวชกรรม",
    "departmentCategory": "สูตินรีเวช",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการพิเศษ",
      "วุฒิบัตรสาขาสูติศาสตร์-นรีเวชวิทยา"
    ],
    "education": [],
    "schedules": [
      "นรีเวช วันอังคาร เวลา 08.00 - 16.00 น.",
      "ฝากครรภ์ วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/BunchaiV1.jpg"
  },
  {
    "id": 102,
    "name": "พญ.ปนัดดา เขมรัตน์ตระกูล",
    "department": "สูติ-นรีเวชกรรม",
    "departmentCategory": "สูตินรีเวช",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ",
      "รองผู้อำนวยการกลุ่มภารกิจด้านบริการทุติยภูมิและตติยภูมิ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาสูติศาสตร์-นรีเวชวิทยา"
    ],
    "education": [
      "1989 - 1995 - Faculty of Medicine Siriraj Hospital, Mahidol University, Bangkok, Thailand (Doctor of medicine)",
      "1998 - 2001 - Obstetrics and gynecology , Mahidol University"
    ],
    "schedules": [
      "นรีเวช วันพุธ เวลา 08.00 - 16.00 น.",
      "ฝากครรภ์ วันอังคาร 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/PanadV2.jpg"
  },
  {
    "id": 103,
    "name": "พญ.ธัญญารัตน์ วินิจธนา",
    "department": "สูติ-นรีเวชกรรม",
    "departmentCategory": "สูตินรีเวช",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการพิเศษ",
      "วุฒิบัตรสาขาสูติศาสตร์-นรีเวชวิทยา"
    ],
    "education": [],
    "schedules": [
      "นรีเวช วันศุกร์ เวลา 08.00 - 16.00 น.",
      "ฝากครรภ์ วันพฤหัส เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/TanyaV1.jpg"
  },
  {
    "id": 104,
    "name": "นพ.ธนกร วรินทร์",
    "department": "สูติ-นรีเวชกรรม",
    "departmentCategory": "สูตินรีเวช",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการ",
      "วุฒิบัตรสาขาสูติศาสตร์-นรีเวชวิทยา"
    ],
    "education": [],
    "schedules": [
      "นรีเวช วันพฤหัสบดี เวลา 08.00 - 16.00 น.",
      "ฝากครรภ์ วันพุธ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/TanakV1.jpg"
  },
  {
    "id": 105,
    "name": "พญ.ขนิษฐา  ปานสำเนียง",
    "department": "สูติ-นรีเวชกรรม",
    "departmentCategory": "สูตินรีเวช",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาสูติศาสตร์-นรีเวชวิทยา"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/KanitV1.jpg"
  },
  {
    "id": 106,
    "name": "พญ.วริศรา ราชพล",
    "department": "สูติ-นรีเวชกรรม",
    "departmentCategory": "สูตินรีเวช",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาสูติศาสตร์ นรีเวชวิทยา"
    ],
    "education": [
      "2012-2019 แพทยศาสตร์บัณฑิต เกียรตินิยมอันดับ2 มหาวิทยาลัยเทคโนโลยีสุรนารี",
      "2022-2024 วุฒิบัตรสาขาสูติศาสตร์ นรีเวชวิทยา รพ.ศรีนครินทร์ มหาวิทยาลัยขอนแก่น"
    ],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/WarisV1.jpg"
  },
  {
    "id": 201,
    "name": "นพ.สมยศ สุขเสถียร",
    "department": "ศัลยกรรมทั่วไป",
    "departmentCategory": "ศัลยกรรมทั่วไป",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการพิเศษ",
      "วุฒิบัตรสาขาศัลยศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์   เวลา 08.00 - 16.00 น.",
      "วันศุกร์     เวลา 08.00 - 12.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/SomyV1.jpg"
  },
  {
    "id": 202,
    "name": "นพ.ธเนศ สันติโรจนกุล",
    "department": "ศัลยกรรมทั่วไป",
    "departmentCategory": "ศัลยกรรมทั่วไป",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการ",
      "วุฒิบัตรสาขาศัลยศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันอังคาร  เวลา 08.00 - 16.00 น.",
      "วันพฤหัสบดี  เวลา 08.00 - 12.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/TanetV1.jpg"
  },
  {
    "id": 203,
    "name": "พญ.จิตรานันท์ นาคหมื่นไวย",
    "department": "ศัลยกรรมทั่วไป",
    "departmentCategory": "ศัลยกรรมทั่วไป",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [],
    "specialties": [
      "นายแพทย์ปฏิบัติการ",
      "วุฒิบัตรสาขาศัลยศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์  เวลา 08.00 - 12.00 น.",
      "วันพุธ  เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/JitraV1.jpg"
  },
  {
    "id": 204,
    "name": "นพ.ชาคริต ศรีเจริญวณิชย์",
    "department": "ศัลยกรรมทั่วไป",
    "departmentCategory": "ศัลยกรรมทั่วไป",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ",
      "รองผู้อำนวยการฝ่ายกิจกรรมพิเศษ",
      "ผู้ช่วยผู้อำนวยการด้านบริการ (service plan)"
    ],
    "specialties": [
      "Transoral Endoscopic Thyroidectomy Vestibular Approach (TOETVA)",
      "Laparoscopic Cholecystectomy",
      "Laparoscopic Hernia Repair (TEP, TAPP)",
      "Laparoscopic Colorectal Surgery",
      "Endoscopic Surgery (EGD, Colonoscopy, ERCP, advance endoscopy)"
    ],
    "education": [
      "2005-2011 - Faculty of Medicine Siriraj Hospital, Mahidol University, Bangkok, Thailand (Doctor of medicine)",
      "2012-2016 - Residency training in General Surgery, Rajavithi Hospital, Bangkok, Thailand (Diploma in Thai board of General Surgery)",
      "2019-2021 clinical fellowship in minimally invasive surgery and endocrinology surgery, Police General Hospital, Thailand",
      "2012- Advanced Cardiac Life Support (ACLS), Bangkok, Thailand",
      "2012- Advanced Trauma Life Support (ATLS) Student Course Bangkok, Thailand"
    ],
    "schedules": [
      "วันพุธ  เวลา 08.00 - 12.00 น.",
      "วันศุกร์  เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/ChakritV1.jpg"
  },
  {
    "id": 205,
    "name": "นพ.ศศิภาพ  วีระสมบัติ",
    "department": "ศัลยกรรมทั่วไป",
    "departmentCategory": "ศัลยกรรมทั่วไป",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาศัลยศาสตร์"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/SasiV1.jpg"
  },
  {
    "id": 301,
    "name": "นพ.ฉายฉันท์ สร้อยศรีทอง",
    "department": "ศัลยกรรมยูโรวิทยา",
    "departmentCategory": "ศัลยกรรมยูโรวิทยา",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการ"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 302,
    "name": "นพ.ธนวินท์ โชติเรืองประเสริฐ",
    "department": "ศัลยกรรมยูโรวิทยา",
    "departmentCategory": "ศัลยกรรมยูโรวิทยา",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการ"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/TanawV1.jpg"
  },
  {
    "id": 401,
    "name": "นพ.ปิยะพงษ์ ชินคำอัครพัฒน์",
    "department": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "departmentCategory": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "position": "นายแพทย์เชี่ยวชาญ",
    "positions": [
      "นายแพทย์เชี่ยวชาญ (C9)",
      "รองผู้อำนวยการ ด้านการเงินและการคลัง (CFO)",
      "Chief of Orthopaedic Unit, Pakchongnana  Hospital."
    ],
    "specialties": [
      "ผ่าตัดข้อเทียม (เข่าและสะโพก )",
      "ผ่าตัดส่องกล้อง  @ เข่า ไหล่ ข้อศอก ข้อเท้า กระดูกสันหลัง (one portal)",
      "ผ่าตัดกระดูกสันหลัง (ระดับเอว )",
      "ผ่าตัดกระดูกหัก (ทั่วไป)"
    ],
    "education": [
      "2021 : Diploma in Clinical Statistics , Center for Clinical Epidermiology & Clinical Statistics, Faculty of Medicine Chiang Mai University",
      "2020 : Diploma in Clinical Epidermiology,  Institute of Medicine , Suranaree University of Technology & Clinical Epidermiology Society 2020 : หนังสืออนุมัติแสดงความรู้ความชำนาญในการประกอบวิชาชีพเวชกรรมสาขาเวชศาสตร์ป้องกัน แขนงสาธารณสุขศาสตร์",
      "2018 : หลักสูตรนักบริหารระดับสูงด้านสาธารณสุข (นบส.ส.) รุ่นที่ 25 สถาบันพัฒนาสุขภาพอาเซียน มหาวิทยาลัยมหิดล 2018 :  หลักสูตรนักพัฒนบริหารศาสตร์ระดับกลาง รุ่นที่ 3 สถาบันบัณฑิตพัฒนบริหารศาสตร์",
      "2016 : Spine surgery. Department of orthopaedics and traumatology, university of Hongkong, February- March",
      "2015 :  Full-endoscopic Operations of the spine training program Bumrungrad International Hospital (2days).",
      "2014 : Endoprosthesis joint replacement. Surgical exchange and training program .Rotenberg ,Germany. October",
      "2012 : THA&TKA and navigated systems . Fellowship, St. Vincenz Hospital, Brakel, Germany. July ? August.",
      "2010 : Shoulder Arthroscopy. Clinician and  Investigator ,Kyung Hee University ,Seoul ,Korea. November.",
      "2009 : Sports medicine. Guest fellow , Technical University of Munich ,Germany. , May ? July 2009.",
      "2008 :  Clinical and operative orthopaedic surgery, AO Fellowship , Tubingen ,Germany. July ? August 2008."
    ],
    "schedules": [
      "วันอังคาร เวลา 09.00 - 15.30 น.",
      "วันพฤหัสบดี  เวลา 09 .00 - 11.30 น."
    ],
    "contributions": [
      "Comparative treatment between open reduction and close reduction technique in close supracondylar humeral fracture (Gartland III). Saraburi hospital medical journal 2006; 31(2): 87-91.",
      "Health behavior improvement program leads to an increase in the knee scores in OA knee. Journal of health science 2014; 23: 437-44.",
      "Nail fixation versus clavicle support for displaced mid shaft clavicle fractures: time to return to work and long term results. Journal of the medical association of Thailand 2018; 101(suppl3): s195-202.",
      "Heterotopic ossification following non cemented hip replacement: a comparative study using minimal invasive surgery vs. conventional anterolateral approach. Journal of southeast asian medical research 2019; 3(1): 18-24."
    ],
    "image": "/img/doctors/piyapong.jpg",
    "originalImg": "dr_im/PiyaV1.jpg"
  },
  {
    "id": 402,
    "name": "นพ.ขวัญชัย มาสุธน",
    "department": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "departmentCategory": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการ",
      "วุฒิบัตรสาขาศัลยศาสตร์ออร์โธปิดิกส์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์  เวลา 09.00 - 11.30 น.",
      "วันพุธ  เวลา 09.00 - 15.30 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/KwanV1.jpg"
  },
  {
    "id": 403,
    "name": "นพ.ศุภวิชญ์ จุฬาปกรณ์",
    "department": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "departmentCategory": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาศัลยศาสตร์ออร์โธปิดิกส์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ เวลา 09.00 - 15.30 น.",
      "วันพุธ  เวลา 09.00 - 11.30 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/SupaV1.jpg"
  },
  {
    "id": 404,
    "name": "นพ.จิรายุ เชาวลิตวงศ์",
    "department": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "departmentCategory": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [],
    "specialties": [
      "นายแพทย์ชำนาญการ",
      "วุฒิบัตรสาขาศัลยศาสตร์ออร์โธปิดิกส์",
      "อนุสาขาการผ่าตัดกระดูกสันหลัง"
    ],
    "education": [],
    "schedules": [
      "วันอังคาร เวลา 09.00 - 11.30 น.",
      "วันพฤหัสบดี  เวลา 09.00 - 15.30 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 405,
    "name": "นพ.ชาญชัย จงทวีสถาพร",
    "department": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "departmentCategory": "ศัลยศาสตร์ออร์โธปิดิกส์",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาศัลยศาสตร์ออร์โธปิดิกส์"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/ChanV1.jpg"
  },
  {
    "id": 501,
    "name": "นพ.วุฒิพงษ์ อัศวเพชรกูล",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/VutiV1.jpg"
  },
  {
    "id": 502,
    "name": "พญ.รจิตา หาญตะล่อม",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์เชี่ยวชาญ",
    "positions": [
      "นายแพทย์เชี่ยวชาญ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์",
      "วุฒิบัตรสาขาอายุรศาสตร์โรคไต"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/RajiV1.jpg"
  },
  {
    "id": 503,
    "name": "พญ.เกษศรินทร์ กาญจนจารุรัตน์",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/GezV1.jpg"
  },
  {
    "id": 504,
    "name": "พญ.ปภาดา ศรีเมฆ",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/PapadaV1.jpg"
  },
  {
    "id": 505,
    "name": "พญ.วรรณภา รักสุจริต",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์",
      "วุฒิบัตรสาขาประสาทวิทยา"
    ],
    "education": [
      "แพทยศาสตร์บัณฑิต มหาวิทยาลัยศรีนครินทรวิโรฒ"
    ],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น.",
      "คลินิกพิเศษเฉพาะทางนอกเวลาราชการ เวลา 16.00 - 20.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/WannapaV1.jpg"
  },
  {
    "id": 506,
    "name": "พญ.วรัมพร ศิลปะ",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/WarumV1.jpg"
  },
  {
    "id": 507,
    "name": "นพ.ปุณณวิช จิตเจือจุน",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น.",
      "คลินิกพิเศษเฉพาะทางนอกเวลาราชการ เวลา 16.00 - 20.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/PunnaV1.jpg"
  },
  {
    "id": 508,
    "name": "นพ.กรภพ นาคพันธุ์",
    "department": "อายุรกรรม",
    "departmentCategory": "อายุรกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาอายุรศาสตร์"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/GorraV1.jpg"
  },
  {
    "id": 601,
    "name": "นพ.สมศักดิ์ สหสิทธิวัฒน์",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันพฤหัสบดี เวลา 08.00 - 16.00 น.",
      "วันศุกร์     เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/SomsakV1.jpg"
  },
  {
    "id": 602,
    "name": "นพ.วารสินทร์ จันทร์ประกายสี",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์เชี่ยวชาญ",
    "positions": [
      "นายแพทย์เชี่ยวชาญ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์  เวลา 08.00 - 16.00 น.",
      "วันศุกร์     เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/WaraV1.jpg"
  },
  {
    "id": 603,
    "name": "พญ.ณัฐฑิณี นภัทรธีรโชติ",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันพฤหัสบดี เวลา 08.00 - 16.00 น.",
      "วันศุกร์  เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/NaddiV1.jpg"
  },
  {
    "id": 604,
    "name": "พญ.กุลฤดี ศิริพรโภคา",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันพฤหัสบดี เวลา 08.00 - 16.00 น.",
      "วันศุกร์     เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/GulV1.jpg"
  },
  {
    "id": 605,
    "name": "พญ.วัชรินทร์ คล้ายทอง",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์  เวลา 08.00 - 16.00 น.",
      "วันอังคาร    เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/WatV1.jpg"
  },
  {
    "id": 606,
    "name": "พญ.บัณฑิตา แสงชลินทร์",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์  เวลา 08.00 - 16.00 น.",
      "วันอังคาร  เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/BundiV1.jpg"
  },
  {
    "id": 607,
    "name": "พญ.ศิริเกศ อัมหิรัญ",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 608,
    "name": "พญ.พิมพ์ชนก ศิริศาสตร์",
    "department": "กุมารเวชกรรม",
    "departmentCategory": "กุมารเวชกรรม",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/PimV1.jpg"
  },
  {
    "id": 701,
    "name": "พญ.นิศารัตน์ จองธุระกิจ",
    "department": "จักษุ",
    "departmentCategory": "จักษุวิทยา",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาจักษุวิทยา"
    ],
    "education": [
      "2006 Degree of bachelor of Medicine and bachelor of Surgery . The University Of Leeds,UK"
    ],
    "schedules": [
      "วันอังคาร เวลา 08.00 - 16.00 น.",
      "วันพฤหัสบดี  เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 702,
    "name": "พญ.ศิรภา  วชิรปรีชาพงษ์",
    "department": "จักษุ",
    "departmentCategory": "จักษุวิทยา",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาจักษุวิทยา"
    ],
    "education": [
      "แพทยศาสตร์บัณฑิต (เกียรตินิยมอันดับ 2) มหาวิทยาลัยมหิดล"
    ],
    "schedules": [
      "วันจันทร์  เวลา 08.00 - 16.00 น.",
      "วันพุธ  เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/SiraV1.jpg"
  },
  {
    "id": 801,
    "name": "พญ.สคราญ อโณทัยไพบูลย์",
    "department": "รังสีวิทยา",
    "departmentCategory": "รังสีวิทยาวินิจฉัย",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขารังสีวิทยาวินิจฉัย"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/SacranV1.jpg"
  },
  {
    "id": 802,
    "name": "พญ.เบญจพร โรจนอารีย์",
    "department": "รังสีวิทยา",
    "departmentCategory": "รังสีวิทยาวินิจฉัย",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขารังสีวิทยาทั่วไป"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/BenjaV1.jpg"
  },
  {
    "id": 803,
    "name": "พญ.รินทร์ลภัส ลัทธศักดิ์ศิริ",
    "department": "รังสีวิทยา",
    "departmentCategory": "รังสีวิทยาวินิจฉัย",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขารังสีวิทยาวินิจฉัย"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/RinV1.jpg"
  },
  {
    "id": 804,
    "name": "พญ.วาสนา กาญจนจารุรัตน์",
    "department": "รังสีวิทยา",
    "departmentCategory": "รังสีวิทยาวินิจฉัย",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขารังสีวิทยาวินิจฉัย"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/WassV1.jpg"
  },
  {
    "id": 901,
    "name": "พญ.วฤนดา จันทร์ประกายสี",
    "department": "วิสัญญี",
    "departmentCategory": "วิสัญญี",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาวิสัญญีวิทยา"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/WarinV1.jpg"
  },
  {
    "id": 902,
    "name": "พญ.ศิวพร ศิริมาศรังษี",
    "department": "วิสัญญี",
    "departmentCategory": "วิสัญญี",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาวิสัญญีวิทยา"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/SiwapV1.jpg"
  },
  {
    "id": 903,
    "name": "นพ.กิติคุณ ภูมิโคกรักษ์",
    "department": "วิสัญญี",
    "departmentCategory": "วิสัญญี",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาวิสัญญีวิทยา"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/KittiV1.jpg"
  },
  {
    "id": 904,
    "name": "พญ.พรพรหม สิทธิเวทยานนท์",
    "department": "วิสัญญี",
    "departmentCategory": "วิสัญญี",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาวิสัญญีวิทยา"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1001,
    "name": "พญ.วีรุฒา โอชา",
    "department": "เวชศาสตร์ฟื้นฟู",
    "departmentCategory": "เวชศาสตร์ฟื้นฟู",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ฟื้นฟู"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ เวลา 09.00 - 12.00 น.",
      "วันศุกร์     เวลา 09.00 - 12.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/WeruV1.jpg"
  },
  {
    "id": 1002,
    "name": "นพ.ชยุตพล ทองศิริ",
    "department": "เวชศาสตร์ฟื้นฟู",
    "departmentCategory": "เวชศาสตร์ฟื้นฟู",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ฟื้นฟู"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/ChayutV1.jpg"
  },
  {
    "id": 1101,
    "name": "นพ.ควรคิดณัฐฐา อรุณศรี",
    "department": "จิตเวชศาสตร์",
    "departmentCategory": "จิตเวชศาสตร์",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาจิตเวชศาสตร์"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/KKV1.jpg"
  },
  {
    "id": 1102,
    "name": "พญ.ปารัช ภิรมย์รัตน์",
    "department": "จิตเวชศาสตร์",
    "departmentCategory": "จิตเวชศาสตร์",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาจิตเวชศาสตร์เด็กและวัยรุ่น"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/ParusV1.jpg"
  },
  {
    "id": 1201,
    "name": "นพ.พิพัฒน์ แจ่มพัฒนกิจ",
    "department": "หู คอ จมูก",
    "departmentCategory": "โสต ศอ นาสิก",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาโสต ศอ นาสิก วิทยา",
      "อนุมัติบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์  เวลา 08.00 - 16.00 น.",
      "วันพุธ     เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/PipatV1.jpg"
  },
  {
    "id": 1202,
    "name": "พญ.พิชญาภัจณ์ มองเพ็ชร์",
    "department": "หู คอ จมูก",
    "departmentCategory": "โสต ศอ นาสิก",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาโสต ศอ นาสิก วิทยา"
    ],
    "education": [],
    "schedules": [
      "วันอังคาร เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/PichayV1.jpg"
  },
  {
    "id": 1203,
    "name": "พญ.ฐิติมา หมื่นแสน",
    "department": "หู คอ จมูก",
    "departmentCategory": "โสต ศอ นาสิก",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาโสต ศอ นาสิก วิทยา"
    ],
    "education": [],
    "schedules": [
      "วันพฤหัสบดี เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/TmV1.jpg"
  },
  {
    "id": 1301,
    "name": "พญ.ณิชกานต์ พินิจจิตรสมุทร",
    "department": "เวชศาสตร์ฉุกเฉิน",
    "departmentCategory": "เวชศาสตร์ฉุกเฉิน",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ฉุกเฉิน"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/NichaV1.jpg"
  },
  {
    "id": 1302,
    "name": "พญ.วรนิษฐ์ ทวีสินธนกิตติ์",
    "department": "เวชศาสตร์ฉุกเฉิน",
    "departmentCategory": "เวชศาสตร์ฉุกเฉิน",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ฉุกเฉิน"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1303,
    "name": "นพ.ยอดมงคล นวฤทธิอัศวิน",
    "department": "เวชศาสตร์ฉุกเฉิน",
    "departmentCategory": "เวชศาสตร์ฉุกเฉิน",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ฉุกเฉิน"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 1304,
    "name": "นพ.กันตวัฒน์ ลีปายะคุณ",
    "department": "เวชศาสตร์ฉุกเฉิน",
    "departmentCategory": "เวชศาสตร์ฉุกเฉิน",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ฉุกเฉิน"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/GuntaV1.jpg"
  },
  {
    "id": 1401,
    "name": "นพ.อดิศักดิ์ ศรีศุภรางค์กุล",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/AdisV1.jpg"
  },
  {
    "id": 1402,
    "name": "พญ.สุจริต สุขเวสพงษ์",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์เชี่ยวชาญ",
    "positions": [
      "นายแพทย์เชี่ยวชาญ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1403,
    "name": "พญ.วีณา มงคลพร",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์เชี่ยวชาญ",
    "positions": [
      "นายแพทย์เชี่ยวชาญ"
    ],
    "specialties": [
      "วุฒิบัตรสาขากุมารเวชศาสตร์",
      "อนุมัติบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/VenaV1.jpg"
  },
  {
    "id": 1404,
    "name": "พญ.ธัญนุช โอปณะโสภิต",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1405,
    "name": "พญ.จตุรพร คติบัญชา",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1406,
    "name": "พญ.สุมัจฉา ยอดบุญมา",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/SumatV1.jpg"
  },
  {
    "id": 1407,
    "name": "พญ.จุฑามาศ วงศ์เทววิมาน",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1408,
    "name": "พญ.วรัญญา ตั้งตระกูล",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [
      "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น."
    ],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1409,
    "name": "นพ.วุฒิไกร กรพิมาย",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการพิเศษ",
    "positions": [
      "นายแพทย์ชำนาญการพิเศษ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/VutikV1.jpg"
  },
  {
    "id": 1410,
    "name": "นพ.โกสินทร์ มหรรณพกุล",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 1411,
    "name": "นพ.ศิวกร จัดระเบียบ",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 1412,
    "name": "พญ.มัลลิกา ธาราธิคุณ",
    "department": "เวชศาสตร์ครอบครัว",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ชำนาญการ",
    "positions": [
      "นายแพทย์ชำนาญการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/MalliV1.jpg"
  },
  {
    "id": 1501,
    "name": "พญ.ดุษฎีพร จันปัญญา",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1502,
    "name": "นพ.ธนดล เวณุนันท์",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 1503,
    "name": "นพ.นิติพงศ์ พงษ์สาครสวัส",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 1504,
    "name": "พญ.อารียา คิม",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1505,
    "name": "พญ.กนกพร จันทร์เมือง",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  },
  {
    "id": 1506,
    "name": "นพ.วริทธิ์ อิทธิพันธุวัฒน์",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 1507,
    "name": "นพ.ชิษณุพงศ์ พรหมเมืองขวา",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/male_doctor.jpg",
    "originalImg": "dr_im/nonpic.jpg"
  },
  {
    "id": 1508,
    "name": "พญ.ณัฐชยา เลขานุกิจ",
    "department": "Fammed",
    "departmentCategory": "เวชศาสตร์ครอบครัว",
    "position": "นายแพทย์ปฏิบัติการ",
    "positions": [
      "นายแพทย์ปฏิบัติการ"
    ],
    "specialties": [
      "วุฒิบัตรสาขาเวชศาสตร์ครอบครัว"
    ],
    "education": [],
    "schedules": [],
    "contributions": [],
    "image": "/img/doctors/veena.jpg",
    "originalImg": "dr_im/nonpicw.jpg"
  }
];

export function getDoctorById(id: number | string): Doctor | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return DOCTORS_DATA.find((d) => d.id === numericId);
}
