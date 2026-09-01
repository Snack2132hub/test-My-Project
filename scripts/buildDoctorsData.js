const fs = require('fs');
const path = require('path');

const sqlContent = fs.readFileSync(path.join(__dirname, '../docker/mysql/init/doctor_detail.sql'), 'utf8');

function parseSQLTuples(sql) {
  const tuples = [];
  let inTuple = false;
  let inString = false;
  let escape = false;
  let currentTuple = [];
  let currentVal = '';
  
  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    
    if (!inTuple) {
      if (char === '(' && (i === 0 || /\s|,/.test(sql[i-1]))) {
        inTuple = true;
        currentTuple = [];
        currentVal = '';
        inString = false;
        escape = false;
      }
    } else {
      if (escape) {
        currentVal += char;
        escape = false;
      } else if (char === '\\') {
        escape = true;
      } else if (char === "'") {
        inString = !inString;
      } else if (char === ',' && !inString) {
        currentTuple.push(cleanVal(currentVal));
        currentVal = '';
      } else if (char === ')' && !inString) {
        currentTuple.push(cleanVal(currentVal));
        tuples.push(currentTuple);
        inTuple = false;
        currentTuple = [];
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
  }
  return tuples;
}

function cleanVal(v) {
  v = v.trim();
  if (v.toUpperCase() === 'NULL') return '';
  if (v.startsWith("'") && v.endsWith("'")) {
    return v.slice(1, -1).replace(/\\'/g, "'").replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n');
  }
  return v;
}

const tuples = parseSQLTuples(sqlContent);

const doctors = tuples.map(t => {
  const dr_id = parseInt(t[0], 10);
  const dr_name = t[1] || '';
  const dr_department = t[2] || '';
  
  // records 1 to 10
  const dr_records = [];
  for (let i = 3; i <= 12; i++) {
    if (t[i] && t[i].trim()) dr_records.push(t[i].trim());
  }
  
  // educational records 1 to 10
  const educational_records = [];
  for (let i = 13; i <= 22; i++) {
    if (t[i] && t[i].trim()) educational_records.push(t[i].trim());
  }
  
  // positions 1 to 5
  const positions = [];
  for (let i = 23; i <= 27; i++) {
    if (t[i] && t[i].trim()) positions.push(t[i].trim());
  }
  
  // contributions 1 to 5
  const contributions = [];
  for (let i = 28; i <= 32; i++) {
    if (t[i] && t[i].trim()) contributions.push(t[i].trim());
  }
  
  // schedules
  const schedules = [];
  for (let i = 35; i <= 37; i++) {
    if (t[i] && t[i].trim() && t[i].trim() !== '-') schedules.push(t[i].trim());
  }
  
  const dr_img = t[38] || '';

  // Determine standard position title
  let positionTitle = 'นายแพทย์ชำนาญการ';
  const allPosText = [...positions, ...dr_records].join(' ');
  if (allPosText.includes('นายแพทย์เชี่ยวชาญ') || allPosText.includes('แพทย์หญิงเชี่ยวชาญ') || dr_id === 401 || dr_id === 502 || dr_id === 602 || dr_id === 138 || dr_id === 1402 || dr_id === 1403) {
    positionTitle = 'นายแพทย์เชี่ยวชาญ';
  } else if (allPosText.includes('นายแพทย์ชำนาญการพิเศษ') || allPosText.includes('แพทย์หญิงชำนาญการพิเศษ') || dr_id === 101 || dr_id === 102 || dr_id === 103 || dr_id === 201 || dr_id === 403 || dr_id === 501 || dr_id === 601 || dr_id === 801 || dr_id === 802 || dr_id === 901 || dr_id === 902 || dr_id === 1101 || dr_id === 1201 || dr_id === 1401 || dr_id === 1405 || dr_id === 1409) {
    positionTitle = 'นายแพทย์ชำนาญการพิเศษ';
  } else if (allPosText.includes('นายแพทย์ปฏิบัติการ')) {
    positionTitle = 'นายแพทย์ปฏิบัติการ';
  }

  // Determine standard department category for filtering
  let departmentCategory = dr_department;
  if (dr_department === 'สูติ-นรีเวชกรรม') departmentCategory = 'สูตินรีเวช';
  else if (dr_department === 'จักษุ') departmentCategory = 'จักษุวิทยา';
  else if (dr_department === 'รังสีวิทยา') departmentCategory = 'รังสีวิทยาวินิจฉัย';
  else if (dr_department === 'หู คอ จมูก') departmentCategory = 'โสต ศอ นาสิก';
  else if (dr_department === 'Fammed') departmentCategory = 'เวชศาสตร์ครอบครัว';

  // Choose photo
  let image = '/img/doctors/male_doctor.jpg';
  if (dr_id === 401 || dr_name.includes('ปิยะพงษ์')) {
    image = '/img/doctors/piyapong.jpg';
  } else if (dr_name.startsWith('พญ.') || dr_img.includes('nonpicw') || dr_img.includes('Vena') || dr_id === 1403) {
    image = '/img/doctors/veena.jpg';
  } else if (dr_name.startsWith('นพ.')) {
    image = '/img/doctors/male_doctor.jpg';
  }

  return {
    id: dr_id,
    name: dr_name,
    department: dr_department,
    departmentCategory,
    position: positionTitle,
    positions,
    specialties: dr_records,
    education: educational_records,
    schedules,
    contributions,
    image,
    originalImg: dr_img
  };
}).filter(d => !isNaN(d.id) && d.name);

// Filter list constants according to user mockups
const positionLevels = [
  'ทั้งหมด',
  'นายแพทย์เชี่ยวชาญ',
  'นายแพทย์ชำนาญการพิเศษ',
  'นายแพทย์ชำนาญการ'
];

const medicalCenters = [
  'ทั้งหมด',
  'สูตินรีเวช',
  'ศัลยกรรมทั่วไป',
  'ศัลยกรรมยูโรวิทยา',
  'ศัลยศาสตร์ออร์โธปิดิกส์',
  'อายุรกรรม',
  'กุมารเวชกรรม',
  'จักษุวิทยา',
  'รังสีวิทยาวินิจฉัย',
  'วิสัญญี',
  'เวชศาสตร์ฟื้นฟู',
  'จิตเวชศาสตร์',
  'โสต ศอ นาสิก',
  'เวชศาสตร์ฉุกเฉิน',
  'เวชบำบัดวิกฤต',
  'เวชศาสตร์ครอบครัว'
];

const fileContent = `export interface Doctor {
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

export const POSITION_LEVELS: string[] = ${JSON.stringify(positionLevels, null, 2)};

export const MEDICAL_CENTERS: string[] = ${JSON.stringify(medicalCenters, null, 2)};

export const DOCTORS_DATA: Doctor[] = ${JSON.stringify(doctors, null, 2)};

export function getDoctorById(id: number | string): Doctor | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return DOCTORS_DATA.find((d) => d.id === numericId);
}
`;

fs.writeFileSync(path.join(__dirname, '../frontend/lib/doctorsData.ts'), fileContent, 'utf8');
console.log('Successfully written frontend/lib/doctorsData.ts with ' + doctors.length + ' doctors.');
