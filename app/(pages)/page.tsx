"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Stethoscope,
  Heart,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Bed,
  Syringe,
  UserPlus,
  Clock,
  Smile,
  HeartPulse,
  Eye,
  Baby,
  Bone,
  Activity,
  Scissors,
  ShieldAlert,
  Microscope,
  Sparkles,
  FileText,
  Users,
  Play,
  Phone,
  MapPin,
  Mail,
  Printer,
  Briefcase,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const banners = [
  {
    src: "/img/indexbanner/herobannertest01.png",
    title: "โรงพยาบาลปากช่องนานา",
    subtitle: "Pakchongnana Hospital",
    description: "ร่วมใจ ใฝ่บริการ บริการดุจญาติมิตร เพื่อสุขภาพที่ดีของท่าน",
    buttonText: "เกี่ยวกับเรา",
    showContent: true,
  },
  {
    src: "/img/indexbanner/herobannertest02.png",
    title: "", // ตั้งค่าว่าง หรือเว้นไว้ได้เลย
    subtitle: "",
    description: "",
    buttonText: "",
    showContent: false, // กำหนดเป็น false เพื่อไม่ให้แสดงกล่องข้อความและสีดำโปร่งแสงเคลือบรูปภาพ
  },
];

const services = [
  // หมวดหมู่ชุดที่ 1
  {
    title: "ศูนย์ตรวจสุขภาพ",
    icon: Stethoscope,
  },
  {
    title: "คลินิกพิเศษนอกเวลา",
    icon: Clock,
  },
  {
    title: "จองห้องพิเศษ",
    icon: Bed,
  },
  {
    title: "โปรแกรมฉีดวัคซีน",
    icon: Syringe,
  },
  {
    title: "ลงทะเบียนผู้ป่วยใหม่",
    icon: UserPlus,
  },
  {
    title: "คลินิกทันตกรรม",
    icon: Smile,
  },
  {
    title: "คลินิกโรคหัวใจ",
    icon: HeartPulse,
  },
  {
    title: "คลินิกจักษุและสายตา",
    icon: Eye,
  },
  // หมวดหมู่ชุดที่ 2
  {
    title: "คลินิกกุมารเวช",
    icon: Baby,
  },
  {
    title: "คลินิกกระดูกและข้อ",
    icon: Bone,
  },
  {
    title: "คลินิกกายภาพบำบัด",
    icon: Activity,
  },
  {
    title: "ศูนย์ศัลยกรรมผ่าตัด",
    icon: Scissors,
  },
  {
    title: "ศูนย์อุบัติเหตุ-ฉุกเฉิน",
    icon: ShieldAlert,
  },
  {
    title: "ศูนย์วินิจฉัยและเอ็กซเรย์",
    icon: Microscope,
  },
  {
    title: "ศูนย์ผิวหนังและความงาม",
    icon: Sparkles,
  },
  {
    title: "ตรวจวิเคราะห์ห้องแล็บ",
    icon: FileText,
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for Special After-hours Clinic Month Switcher
  const [selectedClinicMonth, setSelectedClinicMonth] = useState<"thisMonth" | "nextMonth">("thisMonth");

  // State for News and Internal Activities Section
  const [newsTab, setNewsTab] = useState<"clinic" | "pr" | "activity">("clinic");
  const [newsPage, setNewsPage] = useState(0);

  // State for Procurement & Jobs Section
  const [procurementTab, setProcurementTab] = useState<"procurement" | "jobs">("procurement");
  const [procurementPage, setProcurementPage] = useState(0);

  // State for Video Section
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Mock data for Procurement & Job Openings (3 pages x 6 items each)
  const procurementData = {
    procurement: [
      // Page 1
      [
        { id: 1, title: "ร่างประกาศ ประกวดราคาจัดซื้อน้ำยาตรวจวิเคราะห์ทางห้องปฏิบัติการทางการแพทย์ พร้อมเครื่องตรวจวิเคราะห์", date: "24 กรกฎาคม 2569" },
        { id: 2, title: "ยกเลิกประกาศ ประกวดราคาการจัดซื้อก๊าซออกซิเจนเหลวทางการแพทย์ จำนวน ๒๑๒,๒๒๐ ลูกบาศก์เมตร ด้วยวิธีประกวดราคา...", date: "24 มิถุนายน 2569" },
        { id: 3, title: "ประกาศผู้ชนะการเสนอราคา จัดซื้อวัสดุคอมพิวเตอร์และอุปกรณ์เครือข่ายสำหรับระบบสารสนเทศโรงพยาบาล", date: "23 มิถุนายน 2569" },
        { id: 4, title: "ประกวดราคาซื้อเครื่องติดตามการทำงานของหัวใจและสัญญาณชีพ ระดับกลาง จำนวน ๕ เครื่อง ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์", date: "20 มิถุนายน 2569" },
        { id: 5, title: "ประกาศจัดซื้อจัดจ้างเวชภัณฑ์ยาและวัสดุการแพทย์ ประจำไตรมาสที่ ๔/๒๕๖๙ โรงพยาบาลปากช่องนานา", date: "18 มิถุนายน 2569" },
        { id: 6, title: "เผยแพร่แผนการจัดซื้อจัดจ้าง เครื่องเอ็กซเรย์เคลื่อนที่ขนาดไม่น้อยกว่า ๓๐๐ mA ประจำปีงบประมาณ ๒๕๖๙", date: "15 มิถุนายน 2569" },
      ],
      // Page 2
      [
        { id: 7, title: "ประกาศผู้ชนะการเสนอราคา ซื้อชุดเครื่องมือผ่าตัดผ่านกล้องข้อเข่าและข้อไหล่ ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์", date: "12 มิถุนายน 2569" },
        { id: 8, title: "ประกวดราคาจ้างเหมาบริการทำความสะอาดอาคารผู้ป่วยนอก อาคารอุบัติเหตุ และอาคารอำนวยการ", date: "10 มิถุนายน 2569" },
        { id: 9, title: "ประกาศประกวดราคาซื้อครุภัณฑ์ยานพาหนะและขนส่ง รถพยาบาลฉุกเฉินระดับสูงพร้อมอุปกรณ์ประจำรถ", date: "08 มิถุนายน 2569" },
        { id: 10, title: "ยกเลิกประกาศ ประกวดราคาจัดซื้อวัสดุวิทยาศาสตร์การแพทย์ สำหรับห้องปฏิบัติการชันสูตรโรค", date: "05 มิถุนายน 2569" },
        { id: 11, title: "ประกาศผลการคัดเลือกผู้เสนอราคา งานจ้างปรับปรุงห้องผ่าตัดแรงดันลบ (Negative Pressure Room)", date: "02 มิถุนายน 2569" },
        { id: 12, title: "ประกาศจัดซื้อเครื่องช่วยหายใจชนิดควบคุมด้วยปริมาตรและแรงดัน จำนวน ๓ เครื่อง", date: "30 พฤษภาคม 2569" },
      ],
      // Page 3
      [
        { id: 13, title: "เผยแพร่ร่างประกาศประกวดราคาซื้อระบบจัดเก็บและรับส่งข้อมูลภาพทางการแพทย์ (PACS System)", date: "28 พฤษภาคม 2569" },
        { id: 14, title: "ประกาศผู้ชนะการเสนอราคา จัดซื้อชุดตรวจภูมิคุ้มกันวิทยาและเคมีคลินิกอัตโนมัติ", date: "25 พฤษภาคม 2569" },
        { id: 15, title: "ประกาศประกวดราคาซื้อวัสดุทันตกรรมและอุปกรณ์จัดฟัน ประจำปีงบประมาณ ๒๕๖๙", date: "22 พฤษภาคม 2569" },
        { id: 16, title: "ประกาศจ้างเหมาบำรุงรักษาและซ่อมแซมระบบบำบัดน้ำเสียโรงพยาบาลปากช่องนานา", date: "20 พฤษภาคม 2569" },
        { id: 17, title: "ประกาศผู้ชนะการเสนอราคา ซื้อวัสดุสำนักงานและงานพิมพ์เอกสารทางการแพทย์", date: "18 พฤษภาคม 2569" },
        { id: 18, title: "เผยแพร่แผนการจัดหาครุภัณฑ์การแพทย์และวิศวกรรมการแพทย์ ปีงบประมาณ ๒๕๗0", date: "15 พฤษภาคม 2569" },
      ],
    ],
    jobs: [
      // Page 1
      [
        { id: 1, title: "ประกาศรับสมัครบุคคลเพื่อเลือกสรรเป็นพนักงานกระทรวงสาธารณสุข ตำแหน่ง พยาบาลวิชาชีพ จำนวน ๑๕ อัตรา", date: "20 กรกฎาคม 2569" },
        { id: 2, title: "ประกาศรับสมัครคัดเลือกบุคคลเข้าปฏิบัติงาน ตำแหน่ง นักรังสีการแพทย์ ปฏิบัติงานกลุ่มงานรังสีวิทยา จำนวน ๓ อัตรา", date: "18 กรกฎาคม 2569" },
        { id: 3, title: "ประกาศรับสมัครลูกจ้างชั่วคราวเงินบำรุง ตำแหน่ง เภสัชกร กลุ่มงานเภสัชกรรม จำนวน ๒ อัตรา", date: "15 กรกฎาคม 2569" },
        { id: 4, title: "ประกาศรายชื่อผู้มีสิทธิ์เข้ารับการประเมินความรู้ความสามารถ ตำแหน่ง นักจัดการงานทั่วไป", date: "12 กรกฎาคม 2569" },
        { id: 5, title: "ประกาศผลการคัดเลือกบุคคลเพื่อบรรจุเป็นพนักงานพกส. ตำแหน่ง นักเทคนิคการแพทย์", date: "10 กรกฎาคม 2569" },
        { id: 6, title: "ประกาศรับสมัครลูกจ้างชั่วคราว ตำแหน่ง พนักงานช่วยเหลือคนไข้ (NA) จำนวน ๑๐ อัตรา", date: "08 กรกฎาคม 2569" },
      ],
      // Page 2
      [
        { id: 7, title: "ประกาศรับสมัครคัดเลือกบุคคลเพื่อบรรจุเป็นลูกจ้างชั่วคราว ตำแหน่ง เจ้าพนักงานการเงินและบัญชี", date: "05 กรกฎาคม 2569" },
        { id: 8, title: "ประกาศรายชื่อผู้ผ่านการคัดเลือกเป็นพนักงานกระทรวงสาธารณสุข ตำแหน่ง นักกายภาพบำบัด", date: "02 กรกฎาคม 2569" },
        { id: 9, title: "ประกาศรับสมัครบุคคลเพื่อเลือกสรรเป็นลูกจ้าง ตำแหน่ง พนักงานขับรถยนต์ งานอุบัติเหตุ-ฉุกเฉิน ๒ อัตรา", date: "28 มิถุนายน 2569" },
        { id: 10, title: "ประกาศขึ้นบัญชีผู้ผ่านการคัดเลือก ตำแหน่ง นักวิชาการสาธารณสุขปฏิบัติการ", date: "25 มิถุนายน 2569" },
        { id: 11, title: "ประกาศรับสมัครลูกจ้างชั่วคราวเงินบำรุง ตำแหน่ง พนักงานประกอบอาหาร กลุ่มงานโภชนวิทยา", date: "22 มิถุนายน 2569" },
        { id: 12, title: "ประกาศรายชื่อผู้มีสิทธิ์สอบสัมภาษณ์ ตำแหน่ง เจ้าพนักงานพัสดุ กลุ่มงานพัสดุ", date: "20 มิถุนายน 2569" },
      ],
      // Page 3
      [
        { id: 13, title: "ประกาศรับสมัครบุคคลเข้าทำงาน ตำแหน่ง นักวิชาการคอมพิวเตอร์ ศูนย์สารสนเทศ จำนวน ๑ อัตรา", date: "18 มิถุนายน 2569" },
        { id: 14, title: "ประกาศผลการสอบคัดเลือกพนักงานตำแหน่ง เจ้าพนักงานเวชสถิติ งานเวชสถิติและคอมพิวเตอร์", date: "15 มิถุนายน 2569" },
        { id: 15, title: "ประกาศรับสมัครคัดเลือกบุคคลเป็นลูกจ้างชั่วคราว ตำแหน่ง พนักงานซ่อมบำรุง งานซ่อมบำรุงและวิศวกรรม", date: "12 มิถุนายน 2569" },
        { id: 16, title: "ประกาศรายชื่อผู้ผ่านการเลือกสรรเป็นพนักงานกระทรวงสาธารณสุข ตำแหน่ง เจ้าพนักงานธุรการ", date: "10 มิถุนายน 2569" },
        { id: 17, title: "ประกาศรับสมัครสอบแข่งขันเพื่อบรรจุบุคคล ตำแหน่ง นักโภชนาการ ปฏิบัติงานกลุ่มงานโภชนาการ", date: "08 มิถุนายน 2569" },
        { id: 18, title: "ประกาศขึ้นบัญชีและยกเลิกบัญชีผู้ผ่านการเลือกสรร ตำแหน่ง ผู้ช่วยพยาบาล", date: "05 มิถุนายน 2569" },
      ],
    ],
  };

  // Mock data for News & Activities across 3 tabs (3 pages x 6 items each)
  const newsData = {
    clinic: [
      // Page 1
      [
        { id: 1, title: "คลินิกพิเศษเฉพาะทาง (นอกเวลาราชการ) - คลินิกจักษุ", date: "22 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
        { id: 2, title: "คลินิกพิเศษเฉพาะทาง - คลินิกอายุรกรรม", date: "23 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
        { id: 3, title: "คลินิกพิเศษเฉพาะทาง - คลินิกกุมารเวชกรรม", date: "24 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" },
        { id: 4, title: "คลินิกพิเศษเฉพาะทาง - คลินิกศัลยกรรมออร์โธปิดิกส์", date: "25 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" },
        { id: 5, title: "คลินิกพิเศษเฉพาะทาง - คลินิกทันตกรรมพิเศษ", date: "26 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600" },
        { id: 6, title: "คลินิกพิเศษเฉพาะทาง - คลินิกหัวใจและหลอดเลือด", date: "27 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600" },
      ],
      // Page 2
      [
        { id: 7, title: "คลินิกพิเศษเฉพาะทาง - คลินิกสูตินรีเวชกรรม", date: "28 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" },
        { id: 8, title: "คลินิกพิเศษเฉพาะทาง - คลินิกผิวหนังและความงาม", date: "29 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
        { id: 9, title: "คลินิกพิเศษเฉพาะทาง - คลินิกเวชศาสตร์ฟื้นฟู", date: "30 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
        { id: 10, title: "คลินิกพิเศษเฉพาะทาง - คลินิกหู ตา คอ จมูก", date: "31 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
        { id: 11, title: "คลินิกพิเศษเฉพาะทาง - คลินิกทางเดินอาหาร", date: "1 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" },
        { id: 12, title: "คลินิกพิเศษเฉพาะทาง - คลินิกระบบประสาท", date: "2 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" },
      ],
      // Page 3
      [
        { id: 13, title: "คลินิกพิเศษเฉพาะทาง - คลินิกภูมิแพ้และภูมิคุ้มกัน", date: "3 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600" },
        { id: 14, title: "คลินิกพิเศษเฉพาะทาง - คลินิกต่อมไร้ท่อและเบาหวาน", date: "4 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600" },
        { id: 15, title: "คลินิกพิเศษเฉพาะทาง - คลินิกโรคไตและฟอกเลือด", date: "5 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" },
        { id: 16, title: "คลินิกพิเศษเฉพาะทาง - คลินิกศัลยกรรมทั่วไป", date: "6 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
        { id: 17, title: "คลินิกพิเศษเฉพาะทาง - คลินิกจิตเวชและสุขภาพจิต", date: "7 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
        { id: 18, title: "คลินิกพิเศษเฉพาะทาง - คลินิกเวชศาสตร์ครอบครัว", date: "8 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
      ],
    ],
    pr: [
      // Page 1
      [
        { id: 1, title: "โครงการตรวจสุขภาพสิทธิประกันสังคมประจำปี 2569", date: "15 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
        { id: 2, title: "ประชาสัมพันธ์การขยายเวลาให้บริการห้องฉุกเฉิน", date: "16 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
        { id: 3, title: "ข้อแนะนำในการปฏิบัติตนช่วงฤดูฝนเพื่อป้องกันไข้เลือดออก", date: "18 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
        { id: 4, title: "ประกาศจัดซื้อจัดจ้างอุปกรณ์ทางการแพทย์ ประจำปีงบประมาณ 2569", date: "20 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
        { id: 5, title: "ยินดีต้อนรับคณะผู้ตรวจประเมินคุณภาพมาตรฐาน HA", date: "21 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
        { id: 6, title: "เปิดบริการคลินิกชะลอชราและเวชศาสตร์ฟื้นฟู สุขภาพดีทุกวัย", date: "22 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
      ],
      // Page 2
      [
        { id: 7, title: "บริการฉีดวัคซีนไข้หวัดใหญ่ฟรี สำหรับกลุ่มเสี่ยง 7 โรคเรื้อรัง", date: "23 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
        { id: 8, title: "แจ้งปิดให้บริการระบบลงทะเบียนชั่วคราวเพื่อปรับปรุงระบบ", date: "24 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
        { id: 9, title: "โครงการรับยาใกล้บ้าน ณ รพ.สต. ในเครือข่ายโรงพยาบาลปากช่องนานา", date: "25 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
        { id: 10, title: "ประชาสัมพันธ์ช่องทางการจองคิวออนไลน์ผ่านแอป หมอพร้อม", date: "26 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
        { id: 11, title: "ขอเชิญร่วมบริจาคโลหิตสำรองเพื่อผู้ป่วยฉุกเฉิน", date: "27 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600" },
        { id: 12, title: "รายงานสรุปผลการดำเนินงานประจำไตรมาสที่ 2/2569", date: "28 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
      ],
      // Page 3
      [
        { id: 13, title: "มาตรการสวมหน้ากากอนามัยในพื้นที่อาคารผู้ป่วยนอก", date: "29 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
        { id: 14, title: "แนะนำเทคโนโลยีเครื่องเอ็กซเรย์คอมพิวเตอร์ CT-Scan รุ่นใหม่", date: "30 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
        { id: 15, title: "โครงการดนตรีจิตอาสาบำบัดผู้ป่วยยามบ่าย ณ ลานกิจกรรม", date: "31 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
        { id: 16, title: "ตารางแพทย์ออกตรวจประจำเดือนสิงหาคม 2569", date: "1 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
        { id: 17, title: "เปิดตัวศูนย์ดูแลผู้ป่วยระยะยาวพึ่งพิง (Long-term Care)", date: "2 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
        { id: 18, title: "สิทธิประโยชน์การเบิกจ่ายตรงสำหรับข้าราชการและครอบครัว", date: "3 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600" },
      ],
    ],
    activity: [
      // Page 1
      [
        { id: 1, title: "โครงการอบรมป้องกันและซ้อมแผนอัคคีภัยประจำปี 2569", date: "10 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
        { id: 2, title: "กิจกรรมทำบุญตักบาตรเนื่องในวันสำคัญทางศาสนา", date: "12 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
        { id: 3, title: "พิธีมอบเกียรติบัตรบุคลากรดีเด่นประจำปี 2569", date: "14 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
        { id: 4, title: "สัมมนาพัฒนาศักยภาพการบริการและการสื่อสารดุจญาติมิตร", date: "16 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
        { id: 5, title: "กิจกรรม Big Cleaning Day ทำความสะอาดรอบโรงพยาบาล", date: "18 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
        { id: 6, title: "โครงการส่งเสริมการออกกำลังกาย สุขภาพดีชีวีมีสุข", date: "20 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
      ],
      // Page 2
      [
        { id: 7, title: "กิจกรรมเดิน-วิ่งมินิมาราธอนเพื่อการกุศล รพ.ปากช่องนานา", date: "22 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
        { id: 8, title: "โครงการบริจาคโลหิตรวมใจถวายเป็นพระราชกุศล", date: "24 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600" },
        { id: 9, title: "อบรมความรู้เรื่องการช่วยชีวิตขั้นพื้นฐาน (CPR) แก่ประชาชน", date: "25 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
        { id: 10, title: "กิจกรรมปลูกป่าเฉลิมพระเกียรติและอนุรักษ์สิ่งแวดล้อม", date: "26 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
        { id: 11, title: "สัมมนาการใช้นวัตกรรมดิจิทัลทางการแพทย์เพื่ออนาคต", date: "27 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
        { id: 12, title: "กิจกรรมเชื่อมสัมพันธ์ไมตรี กีฬาภายในโรงพยาบาล", date: "28 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
      ],
      // Page 3
      [
        { id: 13, title: "โครงการเยี่ยมบ้านผู้ป่วยติดเตียงในชุมชนเทศบาลปากช่อง", date: "29 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
        { id: 14, title: "งานแสดงนวัตกรรมและผลงานวิจัยของบุคลากรทางการแพทย์", date: "30 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600" },
        { id: 15, title: "อบรมเชิงปฏิบัติการการใช้เครื่องมือแพทย์ระดับสูง", date: "31 กรกฎาคม 2569", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" },
        { id: 16, title: "กิจกรรมสันทนาการต้อนรับบุคลากรใหม่ประจำปี", date: "1 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
        { id: 17, title: "โครงการสัปดาห์รณรงค์ล้างมือเพื่อสุขอนามัยในโรงพยาบาล", date: "2 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" },
        { id: 18, title: "กิจกรรมแลกเปลี่ยนเรียนรู้การดูแลสุขภาพใจบุคลากร", date: "3 สิงหาคม 2569", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600" },
      ],
    ],
  };

  // State for Medical Services Carousel
  const [servicePage, setServicePage] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const itemsPerPage = 5; // 1 single row of 5 items
  const totalServicePages = Math.ceil(services.length / itemsPerPage);

  const handleNextService = () => {
    setServicePage((prev) => (prev + 1) % totalServicePages);
  };

  const handlePrevService = () => {
    setServicePage((prev) => (prev - 1 + totalServicePages) % totalServicePages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // Auto slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-slate-50 flex-1">
      {/* Hero Banner Slider */}
      <section className="relative w-full h-[clamp(280px,45vw,550px)] bg-gray-200 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Image Layer */}
            <Image
              src={banners[currentIndex].src}
              alt={`Hero Banner ${currentIndex + 1}`}
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
              quality={95}
            />
            {/* Only show overlay and text content if showContent is true */}
            {banners[currentIndex].showContent !== false && (
              <>
                {/* Soft Dark Overlay for improved text readability */}
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/10 to-transparent md:bg-linear-to-r md:from-black/50 md:via-black/20 md:to-transparent" />

                {/* Slider Content Overlay with staggered sliding animations */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 text-white">
                  <div className="max-w-xl space-y-3 sm:space-y-4">
                    {banners[currentIndex].subtitle && (
                      <motion.span
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="inline-block text-[#fbbf24] text-xs sm:text-sm font-semibold uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs"
                      >
                        {banners[currentIndex].subtitle}
                      </motion.span>
                    )}
                    
                    {banners[currentIndex].title && (
                      <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight"
                      >
                        {banners[currentIndex].title}
                      </motion.h1>
                    )}

                    {banners[currentIndex].description && (
                      <motion.p
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="text-xs sm:text-sm md:text-base text-gray-100 drop-shadow-xs max-w-md font-light leading-relaxed"
                      >
                        {banners[currentIndex].description}
                      </motion.p>
                    )}

                    {banners[currentIndex].buttonText && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="pt-2 sm:pt-4"
                      >
                        <button className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-medium text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5">
                          {banners[currentIndex].buttonText}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/15 hover:bg-black/35 text-white transition-all cursor-pointer focus:outline-hidden"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/15 hover:bg-black/35 text-white transition-all cursor-pointer focus:outline-hidden"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Banner Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "bg-[#f97316] scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Action Buttons Bar */}
      <section className="w-full relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-lg rounded-b-2xl overflow-hidden">
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#1877F2] hover:bg-[#1565c0] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg">
            <Calendar className="w-6 h-6 md:w-7 md:h-7" />
            นัดหมายแพทย์
          </button>
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg border-t border-white/20 md:border-t-0 md:border-l">
            <Stethoscope className="w-6 h-6 md:w-7 md:h-7" />
            ศูนย์การรักษาเฉพาะทาง
          </button>
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-white py-4 md:py-5 transition-colors font-medium text-base md:text-lg border-t border-white/20 md:border-t-0 md:border-l">
            <Heart className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" />
            โปรโมชั่นและแพ็คเกจ
          </button>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 w-full flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-14">
            <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-gray-700" fill="currentColor" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">ประกาศ !!!</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Announcement Card 1 */}
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
              <Image
                src="/img/indexnews/test01.jpg"
                alt="เปลี่ยนแปลงเวลาให้บริการ"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Announcement Card 2 */}
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
              <Image
                src="/img/indexnews/test01.jpg"
                alt="เปลี่ยนแปลงเวลาให้บริการ"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Announcement Card 3 */}
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white aspect-[3/4] relative transform hover:-translate-y-2 cursor-pointer group">
              <Image
                src="/img/indexnews/test01.jpg"
                alt="เปลี่ยนแปลงเวลาให้บริการ"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-3 mt-12">
            <div className="w-3.5 h-3.5 rounded-full bg-[#f97316] cursor-pointer shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors shadow-sm"></div>
          </div>
        </div>
      </section>

      {/* Medical Services Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-[#fffdfa] border-t border-orange-50/50">
        {/* Soft Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
            alt="Hospital Corridor Background"
            fill
            className="object-cover opacity-[0.05] filter blur-xs"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbf8f3]/30 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#334155] tracking-tight">
              บริการทางการแพทย์
            </h2>
            <div className="w-24 h-1 bg-[#f97316] mt-4 rounded-full shadow-xs"></div>
          </div>

          {/* Carousel / Navigation wrapper */}
          {!showAllServices ? (
            <>
              <div className="relative flex items-center justify-between gap-2 sm:gap-4 px-1 md:px-6">
                {/* Left navigation arrow */}
                <button
                  onClick={handlePrevService}
                  className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
                  aria-label="Previous services page"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* Services Grid container for 1 Single Row (5 items) */}
                <div className="w-full px-2 sm:px-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={servicePage}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-4 sm:gap-x-6 md:gap-x-8 place-items-center w-full py-2"
                    >
                      {services
                        .slice(
                          servicePage * itemsPerPage,
                          (servicePage + 1) * itemsPerPage
                        )
                        .map((service, index) => {
                          const IconComponent = service.icon;
                          return (
                            <motion.div
                              key={index}
                              whileHover={{ y: -6, scale: 1.03 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className="flex flex-col items-center text-center group cursor-pointer w-full"
                            >
                              {/* Circle Button */}
                              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:shadow-orange-200/50 transition-all duration-300 relative border border-white/10">
                                {/* Outer animated border glow */}
                                <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300 blur-xs" />
                                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white stroke-[1.5] relative z-10" />
                              </div>

                              {/* Text Label */}
                              <span className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f97316] transition-colors leading-snug tracking-tight max-w-[130px] block">
                                {service.title}
                              </span>
                            </motion.div>
                          );
                        })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right navigation arrow */}
                <button
                  onClick={handleNextService}
                  className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100/70 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
                  aria-label="Next services page"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* Service Carousel Page Indicators */}
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: totalServicePages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setServicePage(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      servicePage === idx
                        ? "w-8 bg-[#f97316]"
                        : "w-2.5 bg-orange-200 hover:bg-orange-300"
                    }`}
                    aria-label={`Go to services page ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            /* All Services Expanded View */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4 sm:gap-x-6 md:gap-x-8 place-items-center w-full px-2 sm:px-6 py-2"
            >
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="flex flex-col items-center text-center group cursor-pointer w-full"
                  >
                    {/* Circle Button */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] flex items-center justify-center text-white shadow-md group-hover:shadow-xl group-hover:shadow-orange-200/50 transition-all duration-300 relative border border-white/10">
                      <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300 blur-xs" />
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white stroke-[1.5] relative z-10" />
                    </div>

                    {/* Text Label */}
                    <span className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium text-gray-700 group-hover:text-[#f97316] transition-colors leading-snug tracking-tight max-w-[130px] block">
                      {service.title}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* View All / Toggle Button */}
          <div className="flex justify-center mt-12 sm:mt-14">
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="px-10 py-3 sm:px-12 sm:py-3.5 bg-white hover:bg-[#f97316] text-[#f97316] hover:text-white border-2 border-[#f97316] font-medium text-sm sm:text-base rounded-full transition-all duration-300 shadow-xs hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:scale-98"
            >
              {showAllServices ? "ย่อลง" : "ดูทั้งหมด"}
            </button>
          </div>
        </div>
      </section>

      {/* Health Checkup & Vaccines Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="flex flex-col items-center mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              ตรวจสุขภาพ และ วัคซีน
            </h2>
            <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Health Checkup */}
            <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer aspect-[16/10] bg-white border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                alt="โปรแกรมตรวจสุขภาพ"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Top right hospital badge */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center p-1 z-10 border border-gray-100">
                <Image
                  src="/img/indexbanner/herobannertest01.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="object-contain rounded-full"
                />
              </div>

              {/* Bottom Left Orange Banner Ribbon */}
              <div className="absolute bottom-4 left-0 w-[85%] sm:w-[80%] bg-gradient-to-r from-[#ffa154] via-[#f97316] to-[#f97316] text-white py-3 px-4 sm:px-5 rounded-r-2xl shadow-lg flex items-center justify-between z-10">
                <div className="pr-2">
                  <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                    โปรแกรมตรวจสุขภาพ
                  </h3>
                  <p className="text-xs text-orange-100 font-light mt-0.5 truncate">
                    แพ็คเกจเกี่ยวกับโปรแกรมตรวจสุขภาพ
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Card 2: Vaccination */}
            <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer aspect-[16/10] bg-white border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
                alt="โปรแกรมฉีดวัคซีน"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Top right hospital badge */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center p-1 z-10 border border-gray-100">
                <Image
                  src="/img/indexbanner/herobannertest01.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="object-contain rounded-full"
                />
              </div>

              {/* Bottom Left Orange Banner Ribbon */}
              <div className="absolute bottom-4 left-0 w-[85%] sm:w-[80%] bg-gradient-to-r from-[#ffa154] via-[#f97316] to-[#f97316] text-white py-3 px-4 sm:px-5 rounded-r-2xl shadow-lg flex items-center justify-between z-10">
                <div className="pr-2">
                  <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                    โปรแกรมฉีดวัคซีน
                  </h3>
                  <p className="text-xs text-orange-100 font-light mt-0.5 truncate">
                    แพ็คเกจเกี่ยวกับโปรแกรมฉีดวัคซีน
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <Syringe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-12">
            <button className="px-10 py-2.5 sm:px-12 sm:py-3 bg-gradient-to-r from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] text-white font-medium text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:scale-98">
              ดูทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 1. ระบบนัดหมายออนไลน์ (Online Appointment) */}
      {/* ========================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-[#ffedd5]/80 via-[#fed7aa]/40 to-[#ffedd5]/60 border-t border-orange-100">
        <div className="max-w-6xl mx-auto">
          {/* หัวข้อส่วนระบบนัดหมายออนไลน์ */}
          <div className="flex flex-col items-center mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] tracking-tight">
              ระบบนัดหมายออนไลน์
            </h2>
            <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
          </div>

          {/* การ์ดระบบนัดหมาย 2 รายการ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* การ์ดที่ 1: คลินิก ในเวลาราชการ */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-white border border-orange-200/60 aspect-[16/10]">
                {/* 📌 [จุดที่ 1 สามารถเปลี่ยนรูปโปสเตอร์นัดหมายในเวลาราชการตรงนี้] 
                    เปลี่ยน src เป็นรูปภาพจากโฟลเดอร์ในโปรเจกต์ เช่น "/img/appointment/in_time.png" 
                */}
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                  alt="คลินิก ในเวลาราชการ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
                คลินิก ในเวลาราชการ
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 font-light">
                บริการนัดหมายออนไลน์ ในเวลาราชการ
              </p>
            </div>

            {/* การ์ดที่ 2: คลินิกเฉพาะทาง นอกเวลาราชการ */}
            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-white border border-orange-200/60 aspect-[16/10]">
                {/* 📌 [จุดที่ 2 สามารถเปลี่ยนรูปโปสเตอร์นัดหมายนอกเวลาราชการตรงนี้] 
                    เปลี่ยน src เป็นรูปภาพจากโฟลเดอร์ในโปรเจกต์ เช่น "/img/appointment/out_time.png" 
                */}
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                  alt="คลินิกเฉพาะทาง นอกเวลาราชการ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
                คลินิกเฉพาะทาง นอกเวลาราชการ
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 font-light">
                บริการนัดหมายออนไลน์ นอกเวลาราชการ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. ทีมแพทย์เชี่ยวชาญ (Medical Experts Team) */}
      {/* ========================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          {/* หัวข้อส่วนทีมแพทย์เชี่ยวชาญ */}
          <div className="flex flex-col items-center mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              ทีมแพทย์เชี่ยวชาญ
            </h2>
            <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
          </div>

          {/* รายการแพทย์ พร้อมปุ่มเลื่อน ซ้าย - ขวา */}
          <div className="relative flex items-center justify-between gap-2 sm:gap-4 max-w-6xl mx-auto">
            {/* ปุ่มเลื่อนซ้าย */}
            <button
              className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
              aria-label="Previous doctors"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* ตาราง/การ์ดรูปหมอ 4 ท่าน */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full py-2">
              {/* แพทย์คนที่ 1 */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 to-[#ffedd5]/90 border border-orange-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  {/* 📌 [จุดเปลี่ยนรูปแพทย์คนที่ 1] 
                      เปลี่ยน src เป็นรูปหมอในโฟลเดอร์โปรเจกต์ เช่น "/img/doctors/doctor01.png" 
                  */}
                  <Image
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
                    alt="นพ.ปิยะพงษ์ อินทร์อัครพัฒน์"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
                  นพ.ปิยะพงษ์ อินทร์อัครพัฒน์
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">นายแพทย์ชำนาญการ</p>
                <p className="text-xs text-gray-500">ศัลยศาสตร์ออร์โธปิดิกส์</p>
              </div>

              {/* แพทย์คนที่ 2 */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 to-[#ffedd5]/90 border border-orange-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  {/* 📌 [จุดเปลี่ยนรูปแพทย์คนที่ 2] 
                      เปลี่ยน src เป็นรูปหมอในโฟลเดอร์โปรเจกต์ เช่น "/img/doctors/doctor02.png" 
                  */}
                  <Image
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600"
                    alt="พญ.รจิตา หาญตระกูล"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
                  พญ.รจิตา หาญตระกูล
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">นายแพทย์ชำนาญการ</p>
                <p className="text-xs text-gray-500">อายุรกรรม</p>
              </div>

              {/* แพทย์คนที่ 3 */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 to-[#ffedd5]/90 border border-orange-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  {/* 📌 [จุดเปลี่ยนรูปแพทย์คนที่ 3] 
                      เปลี่ยน src เป็นรูปหมอในโฟลเดอร์โปรเจกต์ เช่น "/img/doctors/doctor03.png" 
                  */}
                  <Image
                    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600"
                    alt="นพ.วารินทร์ จันทร์ประเสริฐ"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
                  นพ.วารินทร์ จันทร์ประเสริฐ
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">นายแพทย์ชำนาญการ</p>
                <p className="text-xs text-gray-500">กุมารเวชกรรม</p>
              </div>

              {/* แพทย์คนที่ 4 */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#fed7aa]/50 to-[#ffedd5]/90 border border-orange-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  {/* 📌 [จุดเปลี่ยนรูปแพทย์คนที่ 4] 
                      เปลี่ยน src เป็นรูปหมอในโฟลเดอร์โปรเจกต์ เช่น "/img/doctors/doctor04.png" 
                  */}
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
                    alt="พญ.วิฒนา บงกชพร"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-800 group-hover:text-[#f97316] transition-colors">
                  พญ.วิฒนา บงกชพร
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">นายแพทย์ชำนาญการ</p>
                <p className="text-xs text-gray-500">เวชศาสตร์ครอบครัว</p>
              </div>
            </div>

            {/* ปุ่มเลื่อนขวา */}
            <button
              className="p-3 rounded-full bg-white hover:bg-[#fff7ed] text-[#f97316] hover:text-[#ea580c] shadow-md hover:shadow-lg border border-orange-100 transition-all cursor-pointer focus:outline-hidden transform active:scale-95 shrink-0 z-10"
              aria-label="Next doctors"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* ปุ่มดูทั้งหมด */}
          <div className="flex justify-center mt-12">
            <button className="px-10 py-2.5 sm:px-12 sm:py-3 bg-gradient-to-r from-[#ffa154] to-[#f97316] hover:from-[#f97316] hover:to-[#ea580c] text-white font-medium text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 active:scale-98">
              ดูทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. คลินิกพิเศษนอกเวลา (Special After-Hours Clinic) */}
      {/* ========================================== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-slate-50/50 border-t border-slate-100">
        {/* ฉากหลังรูปภาพเบลอโปร่งแสง */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
            alt="Hospital Background"
            fill
            className="object-cover opacity-[0.06] filter blur-xs"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/90" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* หัวข้อส่วนคลินิกพิเศษนอกเวลา */}
          <div className="flex flex-col items-start mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              คลินิกพิเศษนอกเวลา
            </h2>
            <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* คอลัมน์ซ้าย: รูปภาพโปสเตอร์ตารางให้บริการประจำเดือน */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-orange-100 bg-white group">
                <div className="relative aspect-[4/3] w-full">
                  {/* 📌 [จุดที่สามารถเปลี่ยนรูปตารางคลินิกพิเศษนอกเวลาตรงนี้] 
                      คุณสามารถเปลี่ยน src เป็นรูปภาพจากโฟลเดอร์ในโปรเจกต์ของคุณ เช่น:
                      - เดือนนี้: "/img/clinic/schedule_this_month.png"
                      - เดือนหน้า: "/img/clinic/schedule_next_month.png"
                  */}
                  <Image
                    src={
                      selectedClinicMonth === "thisMonth"
                        ? "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000"
                        : "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                    }
                    alt="ตารางคลินิกพิเศษนอกเวลา"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>
            </div>

            {/* คอลัมน์ขวา: ปุ่มสลับเดือน และ การ์ดข้อมูลบริการ */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* ปุ่มสลับเดือน (เดือนนี้ / เดือนหน้า) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedClinicMonth("thisMonth")}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer shadow-xs ${
                    selectedClinicMonth === "thisMonth"
                      ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-orange-200/60 shadow-md"
                      : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
                  }`}
                >
                  เดือนนี้
                </button>

                <button
                  onClick={() => setSelectedClinicMonth("nextMonth")}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-1 ${
                    selectedClinicMonth === "nextMonth"
                      ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-orange-200/60 shadow-md"
                      : "bg-white text-[#f97316] hover:bg-orange-50 border border-[#f97316]/60 shadow-xs"
                  }`}
                >
                  เดือนหน้า <ChevronRight className="w-4 h-4 inline stroke-[2.5]" />
                </button>
              </div>

              {/* การ์ดข้อมูลข่าวสารและรายละเอียด 3 รายการ */}
              <div className="flex flex-col gap-4 mt-1">
                {/* รายการที่ 1 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    LG
                  </div>
                  <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug group-hover:text-[#f97316] transition-colors">
                    จองคิวตรวจผ่าน แอปพลิเคชัน &quot;หมอพร้อม&quot;
                  </span>
                </div>

                {/* รายการที่ 2 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    LG
                  </div>
                  <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug group-hover:text-[#f97316] transition-colors">
                    อาคารผู้ป่วยนอก ชั้น 3 เวลา 16.00-20.00 น.
                  </span>
                </div>

                {/* รายการที่ 3 */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffa154] to-[#f97316] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    LG
                  </div>
                  <span className="text-gray-800 font-bold text-sm sm:text-base leading-snug group-hover:text-[#f97316] transition-colors">
                    ค่าบริการเริ่มต้นที่ 350 บาท
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. ข่าวสาร และ กิจกรรมภายใน (News & Activities) */}
      {/* ========================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          {/* หัวข้อส่วนข่าวสาร และ กิจกรรมภายใน */}
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              ข่าวสาร และ กิจกรรมภายใน
            </h2>
            <div className="w-24 h-1 bg-[#f97316] mt-3 rounded-full shadow-xs"></div>
          </div>

          {/* แถบปุ่มหมวดหมู่ (Tabs) */}
          <div className="flex justify-center md:justify-end mb-8">
            <div className="inline-flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
              {/* Tab 1: คลินิกพิเศษนอกเวลา */}
              <button
                onClick={() => {
                  setNewsTab("clinic");
                  setNewsPage(0);
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  newsTab === "clinic"
                    ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-md shadow-orange-200/70"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                }`}
              >
                <Clock className="w-4 h-4" />
                คลินิกพิเศษนอกเวลา
              </button>

              {/* Tab 2: ข่าวประชาสัมพันธ์ */}
              <button
                onClick={() => {
                  setNewsTab("pr");
                  setNewsPage(0);
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  newsTab === "pr"
                    ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-md shadow-orange-200/70"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                }`}
              >
                <Megaphone className="w-4 h-4" />
                ข่าวประชาสัมพันธ์
              </button>

              {/* Tab 3: กิจกรรมภายใน */}
              <button
                onClick={() => {
                  setNewsTab("activity");
                  setNewsPage(0);
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  newsTab === "activity"
                    ? "bg-gradient-to-r from-[#ffa154] to-[#f97316] text-white shadow-md shadow-orange-200/70"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
                }`}
              >
                <Users className="w-4 h-4" />
                กิจกรรมภายใน
              </button>
            </div>
          </div>

          {/* ตารางการ์ดข่าวสาร 6 รายการ (3 คอลัมน์ x 2 แถว) พร้อมระบบสลับหน้า */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${newsTab}-${newsPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 min-h-[420px]"
            >
              {(newsData[newsTab][newsPage] || newsData[newsTab][0]).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col group cursor-pointer transition-all duration-300"
                >
                  {/* กรอบรูปภาพโปสเตอร์ข่าว */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
                    {/* 📌 [จุดสำหรับเปลี่ยนรูปโปสเตอร์ข่าวสารและกิจกรรมภายในตรงนี้] 
                        คุณสามารถเปลี่ยน src เป็นรูปภาพจากโฟลเดอร์ในโปรเจกต์ เช่น "/img/news/news01.png"
                    */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* ไอคอนแว่นขยาย/ดาวมุมขวาบนเหมือนในโปสเตอร์ */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-[#f97316]">
                      <Sparkles className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  {/* ข้อความใต้การ์ดข่าวสาร */}
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-gray-800 leading-snug group-hover:text-[#f97316] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 font-light">
                    {item.date}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ปุ่มสลับหน้า / จุดเปลี่ยนหน้า carousel (Pagination) */}
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              onClick={() => setNewsPage((prev) => (prev > 0 ? prev - 1 : 2))}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Previous news page"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setNewsPage(idx)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  newsPage === idx
                    ? "w-3.5 h-3.5 bg-[#f97316] shadow-xs scale-110"
                    : "w-3.5 h-3.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to news page ${idx + 1}`}
              />
            ))}

            <button
              onClick={() => setNewsPage((prev) => (prev < 2 ? prev + 1 : 0))}
              className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
              aria-label="Next news page"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. ข่าวจัดซื้อจัดจ้าง & ข่าวสมัครงาน & สื่อวิดีโอ & ติดต่อเรา */}
      {/* ========================================== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "linear-gradient(to bottom, rgba(254, 243, 199, 0.85), rgba(253, 230, 138, 0.70), rgba(245, 158, 11, 0.85)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600')" }}>
        {/* Soft warmth overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-amber-100/40 to-orange-200/60 backdrop-blur-[1px]" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-16">
          {/* 5.1 การ์ดข่าวจัดซื้อจัดจ้าง & ข่าวสมัครงาน */}
          <div className="max-w-5xl mx-auto">
            {/* แท็บหัวข้อส่วนบน (Tabs) & ปุ่มดูทั้งหมด */}
            <div className="flex items-end justify-between px-2 sm:px-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setProcurementTab("procurement");
                    setProcurementPage(0);
                  }}
                  className={`px-5 py-2.5 sm:px-7 sm:py-3 rounded-t-2xl font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    procurementTab === "procurement"
                      ? "bg-[#f97316] text-white shadow-md shadow-orange-300/50 -mb-0.5 z-10"
                      : "bg-white/80 hover:bg-white text-gray-700 hover:text-[#f97316] border-t border-x border-orange-100"
                  }`}
                >
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                  ข่าวจัดซื้อจัดจ้าง
                </button>

                <button
                  onClick={() => {
                    setProcurementTab("jobs");
                    setProcurementPage(0);
                  }}
                  className={`px-5 py-2.5 sm:px-7 sm:py-3 rounded-t-2xl font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    procurementTab === "jobs"
                      ? "bg-[#f97316] text-white shadow-md shadow-orange-300/50 -mb-0.5 z-10"
                      : "bg-white/80 hover:bg-white text-gray-700 hover:text-[#f97316] border-t border-x border-orange-100"
                  }`}
                >
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  ข่าวสมัครงาน
                </button>
              </div>

              {/* ปุ่มดูทั้งหมด (Pill Button) */}
              <button className="mb-2 px-5 py-1.5 rounded-full bg-white/90 hover:bg-[#f97316] text-[#f97316] hover:text-white border border-[#f97316] font-medium text-xs sm:text-sm transition-all duration-300 shadow-xs cursor-pointer">
                ทั้งหมด
              </button>
            </div>

            {/* กรอบกล่องหลักข่าวจัดซื้อจัดจ้าง/สมัครงาน */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 border-orange-200/90 shadow-xl p-5 sm:p-8 min-h-[360px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${procurementTab}-${procurementPage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="divide-y divide-gray-100"
                >
                  {(procurementData[procurementTab][procurementPage] || procurementData[procurementTab][0]).map((item) => (
                    <div
                      key={item.id}
                      className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 group cursor-pointer hover:bg-orange-50/50 px-3 rounded-xl transition-colors"
                    >
                      <h3 className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-[#f97316] transition-colors line-clamp-1 leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-xs text-gray-400 font-light shrink-0">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setProcurementPage((prev) => (prev > 0 ? prev - 1 : 2))}
                className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
                aria-label="Previous procurement page"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setProcurementPage(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    procurementPage === idx
                      ? "w-3.5 h-3.5 bg-[#f97316] shadow-xs scale-110"
                      : "w-3.5 h-3.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to procurement page ${idx + 1}`}
                />
              ))}

              <button
                onClick={() => setProcurementPage((prev) => (prev < 2 ? prev + 1 : 0))}
                className="p-1.5 text-[#f97316] hover:text-[#ea580c] cursor-pointer transition-colors"
                aria-label="Next procurement page"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* 5.2 สื่อวิดีโอ & ติดต่อเรา Grid 2 คอลัมน์ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pt-4">
            {/* ฝั่งซ้าย: สื่อวิดีโอ */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-4 text-[#ea580c]">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-[#ea580c]">
                  <Play className="w-5 h-5 fill-[#ea580c]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-xs">
                  สื่อวิดีโอ
                </h2>
              </div>

              <div className="bg-white/95 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-orange-100/80 p-2 relative group aspect-[16/10] flex items-center justify-center">
                {isVideoPlaying ? (
                  <iframe
                    className="w-full h-full rounded-xl sm:rounded-2xl"
                    src="https://www.youtube.com/embed/5Peo-ivmupE?autoplay=1"
                    title="วิดีโอแนะนำโรงพยาบาลปากช่องนานา"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => setIsVideoPlaying(true)}
                    className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group/video"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                      alt="สื่อวิดีโอแนะนำโรงพยาบาล"
                      fill
                      className="object-cover group-hover/video:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/35 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center text-[#f97316] group-hover/video:scale-110 group-hover/video:bg-[#f97316] group-hover/video:text-white transition-all duration-300">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-3 rounded-xl text-white">
                      <p className="text-xs sm:text-sm font-medium line-clamp-1">
                        วิดีโอแนะนำโรงพยาบาลปากช่องนานา - มุ่งสู่บริการสุขภาพมาตรฐานสากล
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ฝั่งขวา: ติดต่อเรา */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5 mb-4 text-[#ea580c]">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-[#ea580c]">
                  <Phone className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-xs">
                  ติดต่อเรา
                </h2>
              </div>

              {/* การ์ดรายละเอียดการติดต่อ + แผนที่ */}
              <div className="bg-white/95 rounded-2xl sm:rounded-3xl shadow-lg border border-orange-100/80 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center flex-1">
                {/* ข้อมูลติดต่อ ฝั่งซ้ายของการ์ด */}
                <div className="sm:col-span-7 flex flex-col justify-between space-y-3.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                      โรงพยาบาลปากช่องนานา
                    </h3>
                    <p className="text-xs text-slate-500">Pakchongnana Hospital</p>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-gray-600 font-light">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        29 หมู่ 6 ถนนมิตรภาพ ต.ปากช่อง อ.ปากช่อง จ.นครราชสีมา 30130
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#f97316] shrink-0" />
                      <span>โทรศัพท์ : 044-311383, 044-311855</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Printer className="w-4 h-4 text-[#f97316] shrink-0" />
                      <span>โทรสาร : 044-312781</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#f97316] shrink-0" />
                      <span>อีเมล : info@pakchongnana.go.th</span>
                    </div>
                  </div>

                  {/* ปุ่มโซเชียลมีเดีย 4 ไอคอน */}
                  <div className="flex items-center gap-2.5 pt-2">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                      aria-label="Facebook"
                    >
                      <span className="font-bold text-xs">f</span>
                    </a>
                    <a
                      href="https://line.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#00B900] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                      aria-label="Line"
                    >
                      <span className="font-bold text-xs">LINE</span>
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                      aria-label="YouTube"
                    >
                      <Play className="w-4 h-4 fill-white" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                      aria-label="Instagram"
                    >
                      <span className="font-bold text-xs">IG</span>
                    </a>
                  </div>
                </div>

                {/* แผนที่ Google Maps ฝั่งขวาของการ์ด */}
                <div className="sm:col-span-5 h-48 sm:h-full min-h-[180px] relative rounded-xl overflow-hidden border border-gray-200 shadow-xs">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.61066922247!2d101.41249!3d14.6983!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311c4e7df68cdcd3%3A0x6b403d5ddcdbe3eb!2sPakchongnana%20Hospital!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="แผนที่โรงพยาบาลปากช่องนานา"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-semibold text-gray-700 shadow-xs flex items-center gap-1 border border-gray-200">
                    <Globe className="w-3 h-3 text-[#f97316]" /> Maps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
