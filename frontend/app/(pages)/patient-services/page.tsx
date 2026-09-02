"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
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
  Clock,
  Phone,
  Calendar,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  CheckCircle2,
  Award,
  Building,
  Info,
} from "lucide-react";

// -------------------------------------------------------------
// ข้อมูลศูนย์รักษาเฉพาะทาง (Specialized Treatment Centers Data)
// -------------------------------------------------------------
interface MedicalDoctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  schedule: string;
  image: string;
}

interface CenterDetail {
  id: string;
  titleTh: string;
  titleEn: string;
  icon: React.ElementType;
  description: string;
  highlightText: string;
  banners: string[];
  services: string[];
  serviceHours: {
    regular: string;
    afterHours?: string;
    emergency?: string;
  };
  contactExt: string;
  doctors: MedicalDoctor[];
  facilities: string[];
}

const centersData: CenterDetail[] = [
  {
    id: "emergency",
    titleTh: "ศูนย์อุบัติเหตุและฉุกเฉิน",
    titleEn: "Emergency & Trauma Center",
    icon: ShieldAlert,
    description:
      "ให้บริการดูแลรักษาผู้ป่วยภาวะฉุกเฉินวิกฤตและอุบัติเหตุตลอด 24 ชั่วโมง โดยทีมแพทย์เฉพาะทางด้านเวชศาสตร์ฉุกเฉินและพยาบาลวิชาชีพผู้เชี่ยวชาญ พร้อมด้วยรถพยาบาลฉุกเฉินระดับสูง (Advanced Life Support)",
    highlightText: "พร้อมดูแลคุณทุกวินาทีชีวิต ด้วยระบบการช่วยชีวิตขั้นสูง 24 ชั่วโมง",
    banners: [
      "/img/indexbanner/herobannertest01.png",
      "/img/indexbanner/herobannertest02.png",
    ],
    services: [
      "บริการรับแจ้งเหตุและช่วยชีวิตผู้ป่วยฉุกเฉิน 24 ชั่วโมง",
      "ศูนย์รับผู้ป่วยอุบัติเหตุรุนแรงและผ่าตัดฉุกเฉิน (Trauma Center)",
      "รถพยาบาลฉุกเฉินพร้อมอุปกรณ์กู้ชีพขั้นสูง (ALS Ambulance)",
      "ห้องกู้ชีพ (Resuscitation Room) พร้อมเครื่องกระตุกหัวใจและเครื่องช่วยหายใจ",
      "การคัดแยกประเภทผู้ป่วย (Triage System) ตามความรุนแรงของโรค",
    ],
    serviceHours: {
      regular: "เปิดบริการตลอด 24 ชั่วโมง (ทุกวัน)",
      emergency: "สายด่วนฉุกเฉิน โทร 1669 หรือ 044-311856 ต่อ 101-102",
    },
    contactExt: "101, 102, 103",
    doctors: [
      {
        id: "d1",
        name: "นพ. สมชาย สายชล",
        title: "แพทย์เฉพาะทางเวชศาสตร์ฉุกเฉิน",
        specialty: "เวชศาสตร์ฉุกเฉินและการกู้ชีวิตขั้นสูง (EM)",
        schedule: "ประจำการ 24 ชั่วโมง (ตามตารางเวร)",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
      },
      {
        id: "d2",
        name: "พญ. นภาพร มงคลจิต",
        title: "แพทย์เฉพาะทางเวชศาสตร์ฉุกเฉิน",
        specialty: "การดูแลผู้ป่วยอุบัติเหตุรุนแรง (Trauma Specialist)",
        schedule: "ประจำการ 24 ชั่วโมง (ตามตารางเวร)",
        image: "https://images.unsplash.com/photo-1594824813566-88855ce7896c?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "ห้องกู้ชีพและผ่าตัดเล็กฉุกเฉิน",
      "เครื่องกระตุกไฟฟ้าหัวใจ (Defibrillator)",
      "เครื่องช่วยหายใจชนิดเคลื่อนย้ายได้",
      "จุดจอดรถพยาบาลกู้ชีพฉุกเฉิน (Ambulance Bay)",
    ],
  },
  {
    id: "obgyn",
    titleTh: "ศูนย์สูตินรีเวชกรรม",
    titleEn: "Obstetrics & Gynecology Center",
    icon: HeartPulse,
    description:
      "ให้บริการตรวจวินิจฉัยและรักษาโรคสตรี ให้บริการฝากครรภ์ คลอดบุตร และการผ่าตัดทางสูตินรีเวช โดยทีมสูตินรีแพทย์ผู้เชี่ยวชาญ พร้อมห้องคลอดและห้องพักฟื้นที่ได้มาตรฐานความปลอดภัยสูง",
    highlightText: "ดูแลสุขภาพสตรีทุกช่วงวัย และเคียงข้างคุณแม่อย่างอบอุ่นตลอดการตั้งครรภ์",
    banners: [
      "/img/indexbanner/herobannertest02.png",
      "/img/indexbanner/herobannertest01.png",
    ],
    services: [
      "บริการฝากครรภ์คุณภาพ และการตรวจคัดกรองความผิดปกติของทารกในครรภ์",
      "บริการทำคลอดธรรมชาติ และผ่าตัดทำคลอด (Cesarean Section)",
      "ตรวจอัลตราซาวด์ 4 มิติ ดูพัฒนาการทารกในครรภ์",
      "ตรวจคัดกรองมะเร็งปากมดลูก (Pap Smear / HPV DNA Test)",
      "รักษาโรคสตรี เช่น เนื้องอกมดลูก ถุงน้ำรังไข่ และผ่าตัดผ่านกล้องทางนรีเวช",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
      afterHours: "คลินิกพิเศษนอกเวลา : จันทร์ - ศุกร์ 16.30 - 20.00 น. / เสาร์ - อาทิตย์ 08.30 - 12.00 น.",
    },
    contactExt: "201, 202",
    doctors: [
      {
        id: "d3",
        name: "พญ. ศิริพร วิเศษโสภา",
        title: "สูตินรีแพทย์เฉพาะทาง",
        specialty: "เวชศาสตร์มารดาและทารกในครรภ์ (MFM)",
        schedule: "จันทร์ - ศุกร์ (08.30 - 15.30 น.)",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
      },
      {
        id: "d4",
        name: "นพ. กิตติศักดิ์ พรหมมณี",
        title: "สูตินรีแพทย์เฉพาะทาง",
        specialty: "มะเร็งวิทยานรีเวชและการผ่าตัดผ่านกล้อง",
        schedule: "อังคาร, พฤหัสบดี, ศุกร์ (09.00 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "ห้องคลอดส่วนตัวมาตรฐานความปลอดภัย",
      "เครื่องอัลตราซาวด์ 4D ทันสมัย",
      "ห้องผ่าตัดผ่านกล้องทางนรีเวช",
      "ห้องพักฟื้นคุณแม่หลังคลอดพร้อมทารก",
    ],
  },
  {
    id: "internal",
    titleTh: "ศูนย์อายุรกรรม",
    titleEn: "Internal Medicine Center",
    icon: Stethoscope,
    description:
      "ให้บริการตรวจวินิจฉัยและรักษาโรคทางอายุรกรรมทั่วไปและโรคเรื้อรัง เช่น โรคหัวใจ ความดันโลหิตสูง เบาหวาน โรคไต โรคระบบทางเดินอาหาร และโรคระบบหายใจ",
    highlightText: "ดูแลรักษาโรคเฉพาะทางโดยทีมอายุรแพทย์ผู้เชี่ยวชาญ เพื่อคุณภาพชีวิตที่ดีอย่างยั่งยืน",
    banners: [
      "/img/indexbanner/herobannertest01.png",
      "/img/indexbanner/herobannertest02.png",
    ],
    services: [
      "ตรวจรักษาโรคทั่วไป และโรคเรื้อรัง (เบาหวาน, ความดัน, ไขมันในเลือดสูง)",
      "คลินิกโรคหัวใจและหลอดเลือด (Cardiology Clinic)",
      "คลินิกโรคไตและฟอกเลือดด้วยเครื่องไตเทียม (Hemodialysis Center)",
      "คลินิกโรคระบบทางเดินอาหารและตับ (Gastroenterology)",
      "คลินิกโรคระบบหายใจและปอด (Pulmonology)",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
      afterHours: "คลินิกนอกเวลา : จันทร์ - ศุกร์ 16.30 - 20.00 น.",
    },
    contactExt: "301, 302, 305",
    doctors: [
      {
        id: "d5",
        name: "นพ. วิศรุต วงศ์ไทย",
        title: "อายุรแพทย์เฉพาะทางโรคหัวใจ",
        specialty: "อายุรศาสตร์โรคหัวใจและหลอดเลือด",
        schedule: "จันทร์, พุธ, ศุกร์ (08.30 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=80",
      },
      {
        id: "d6",
        name: "พญ. วรรณภา อรุณสวัสดิ์",
        title: "อายุรแพทย์เฉพาะทางโรคไต",
        specialty: "อายุรศาสตร์โรคไตและการฟอกเลือด",
        schedule: "อังคาร, พฤหัสบดี (08.30 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1594824813566-88855ce7896c?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "เครื่องตรวจคลื่นไฟฟ้าหัวใจ EKG & Echo",
      "ศูนย์ฟอกเลือดด้วยเครื่องไตเทียมทันสมัย",
      "ห้องส่องกล้องระบบทางเดินอาหาร",
    ],
  },
  {
    id: "surgery",
    titleTh: "ศูนย์ศัลยกรรม",
    titleEn: "Surgical Center",
    icon: Scissors,
    description:
      "ให้บริการผ่าตัดและวินิจฉัยโรคทางศัลยกรรมทั่วไป ศัลยกรรมผ่านกล้องแผลเล็ก (Laparoscopic Surgery) และศัลยกรรมทางระบบปัสสาวะ โดยทีมศัลยแพทย์ผู้เชี่ยวชาญ",
    highlightText: "ผ่าตัดแผลเล็ก ฟื้นตัวไว มั่นใจด้วยมาตรฐานความปลอดภัยระดับสากล",
    banners: [
      "/img/indexbanner/herobannertest02.png",
      "/img/indexbanner/herobannertest01.png",
    ],
    services: [
      "ศัลยกรรมทั่วไป (ผ่าตัดไส้ติ่ง, นิ่วในถุงน้ำดี, ไส้เลื่อน, ก้อนเนื้อ)",
      "ศัลยกรรมผ่าตัดผ่านกล้องแผลเล็ก (MIS / Laparoscopic Surgery)",
      "ศัลยกรรมระบบทางเดินปัสสาวะ (ผ่าตัดโรคนิ่ว, ต่อมลูกหมากโต)",
      "ศัลยกรรมตกแต่งบาดแผลและศัลยกรรมหลอดเลือด",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
      emergency: "เคสผ่าตัดฉุกเฉินพร้อมให้บริการตลอด 24 ชั่วโมง",
    },
    contactExt: "401, 402",
    doctors: [
      {
        id: "d7",
        name: "นพ. ภานุเดช ศิริวัฒน์",
        title: "ศัลยแพทย์เฉพาะทางผ่าตัดผ่านกล้อง",
        specialty: "ศัลยกรรมทั่วไปและการผ่าตัดผ่านกล้องแผลเล็ก",
        schedule: "จันทร์ - ศุกร์ (09.00 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "ห้องผ่าตัดแรงดันบวก (Positive Pressure OR)",
      "กล้องส่องผ่าตัดความคมชัดสูง 4K",
      "ห้องพักฟื้นผู้ป่วยหลังผ่าตัด (PACU)",
    ],
  },
  {
    id: "dental",
    titleTh: "ศูนย์ทันตกรรม",
    titleEn: "Dental Center",
    icon: Smile,
    description:
      "ให้บริการดูแลสุขภาพช่องปากและฟันครบวงจร ทั้งทันตกรรมทั่วไป ทันตกรรมประดิษฐ์ จัดฟัน ผ่าฟันครุฑ และทันตกรรมศัลยกรรมริมฝีปากเพดานแหว่ง",
    highlightText: "รอยยิ้มสดใส สุขภาพฟันแข็งแรง ด้วยเครื่องมือสะอาดปราศจากเชื้อ 100%",
    banners: [
      "/img/indexbanner/herobannertest01.png",
      "/img/indexbanner/herobannertest02.png",
    ],
    services: [
      "ตรวจสุขภาพช่องปาก ขูดหินปูน อุดฟัน ถอนฟัน",
      "ผ่าฟันครุฑ ศัลยกรรมช่องปากและใบหน้า",
      "รักษารากฟัน (Endodontics) และรักษาโรคเหงือก",
      "ใส่ฟันปลอม ทำครอบฟัน สะพานฟัน และรากฟันเทียม",
      "ทันตกรรมจัดฟัน และทันตกรรมสำหรับเด็ก",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.30 - 16.00 น.",
      afterHours: "คลินิกนอกเวลา : จันทร์ - พฤหัสบดี 16.30 - 20.00 น.",
    },
    contactExt: "501, 502",
    doctors: [
      {
        id: "d8",
        name: "ทพญ. ชลทิชา สุวรรณเวช",
        title: "ทันตแพทย์เฉพาะทางรักษารากฟัน",
        specialty: "ทันตกรรมรักษารากฟันและทันตกรรมบูรณะ",
        schedule: "จันทร์ - ศุกร์ (08.30 - 15.30 น.)",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "ยูนิตทันตกรรมทันสมัยปลอดเชื้อ",
      "เครื่องเอกซเรย์ฟันระบบดิจิทัล 3D / OPG",
      "ระบบอบฆ่าเชื้อเครื่องมือมาตรฐานสากล Autoclave",
    ],
  },
  {
    id: "pediatrics",
    titleTh: "ศูนย์กุมารเวชกรรม",
    titleEn: "Pediatric Center",
    icon: Baby,
    description:
      "ให้บริการตรวจรักษาโรคในเด็ก ตั้งแต่วัยทารกแรกเกิดจนถึงวัยรุ่น ให้บริการฉีดวัคซีนตามวัย และส่งเสริมพัฒนาการเด็กอย่างสมบูรณ์",
    highlightText: "ดูแลเอาใจใส่เจ้าตัวเล็กด้วยความรัก และความเชี่ยวชาญจากกุมารแพทย์",
    banners: [
      "/img/indexbanner/herobannertest02.png",
      "/img/indexbanner/herobannertest01.png",
    ],
    services: [
      "ตรวจรักษาโรคทั่วไปในเด็ก และโรคติดเชื้อในเด็ก",
      "คลินิกวัคซีนเด็ก และประเมินพัฒนาการตามวัย",
      "หอผู้ป่วยวิกฤตทารกแรกเกิด (NICU)",
      "ให้คำปรึกษาการเลี้ยงลูกด้วยนมแม่และโภชนาการเด็ก",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
      afterHours: "คลินิกนอกเวลา : เสาร์ - อาทิตย์ 08.30 - 12.00 น.",
    },
    contactExt: "601, 602",
    doctors: [
      {
        id: "d9",
        name: "พญ. ปรียานุช รัตนศิลป์",
        title: "กุมารแพทย์ผู้เชี่ยวชาญ",
        specialty: "กุมารศาสตร์ทั่วไปและพัฒนาการเด็ก",
        schedule: "จันทร์ - ศุกร์ (08.30 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1594824813566-88855ce7896c?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "มุมของเล่นเสริมพัฒนาการเด็กแยกโซนปลอดเชื้อ",
      "ตู้บ่มทารกและเครื่องส่องไฟรักษาภาวะตัวเหลือง",
    ],
  },
  {
    id: "orthopedics",
    titleTh: "ศูนย์กระดูกและข้อ",
    titleEn: "Orthopedic Center",
    icon: Bone,
    description:
      "ให้บริการตรวจรักษา ผ่าตัด และฟื้นฟูผู้ป่วยโรคกระดูก ข้อต่อ เส้นเอ็น และกล้ามเนื้อ รวมถึงการผ่าตัดเปลี่ยนข้อเข่า-ข้อสะโพกเทียม",
    highlightText: "คืนความเคลื่อนไหวที่คล่องตัว เพื่อการดำเนินชีวิตอย่างไร้ขีดจำกัด",
    banners: [
      "/img/indexbanner/herobannertest01.png",
      "/img/indexbanner/herobannertest02.png",
    ],
    services: [
      "รักษาอุบัติเหตุกระดูกหัก ข้อเคล็ด และข้อหลุด",
      "ผ่าตัดเปลี่ยนข้อเข่าเทียม และข้อสะโพกเทียม (Joint Replacement)",
      "ผ่าตัดผ่านกล้องส่องข้อ (Arthroscopic Surgery)",
      "รักษาอาการปวดหลัง หมอนรองกระดูกทับเส้นประสาท",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    },
    contactExt: "701, 702",
    doctors: [
      {
        id: "d10",
        name: "นพ. ณัฐวุฒิ สุขสวัสดิ์",
        title: "ศัลยแพทย์กระดูกและข้อ",
        specialty: "ผ่าตัดเปลี่ยนข้อเข่าและข้อสะโพกเทียม",
        schedule: "อังคาร, พุธ, ศุกร์ (09.00 - 15.30 น.)",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "เครื่องเอกซเรย์คอมพิวเตอร์ดิจิทัล C-Arm ในห้องผ่าตัด",
      "อุปกรณ์กายภาพบำบัดฟื้นฟูข้อต่อเฉพาะทาง",
    ],
  },
  {
    id: "physical-therapy",
    titleTh: "ศูนย์กายภาพบำบัด",
    titleEn: "Physical Therapy Center",
    icon: Activity,
    description:
      "ให้บริการฟื้นฟูสมรรถภาพร่างกาย รักษาอาการปวดออฟฟิศซินโดรม ผู้ป่วยอัมพฤกษ์ อัมพาต ผู้ป่วยหลังผ่าตัด และผู้บาดเจ็บจากการเล่นกีฬา",
    highlightText: "ฟื้นฟูร่างกายอย่างตรงจุด คลายปวด ปรับโครงสร้างร่างกายให้แข็งแรง",
    banners: [
      "/img/indexbanner/herobannertest02.png",
      "/img/indexbanner/herobannertest01.png",
    ],
    services: [
      "กายภาพบำบัดลดปวด ออฟฟิศซินโดรม ปวดคอ บ่า หลัง",
      "ฟื้นฟูผู้ป่วยโรคหลอดเลือดสมอง (Stroke Rehabilitation)",
      "กายภาพบำบัดผู้ป่วยหลังผ่าตัดกระดูกและข้อ",
      "การรักษาด้วยคลื่นอัลตราซาวด์ แสงเลเซอร์บำบัด และการดึงคอ-ดึงหลัง",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    },
    contactExt: "801, 802",
    doctors: [
      {
        id: "d11",
        name: "กภ. เมทินี สุจริต",
        title: "นักกายภาพบำบัดวิชาชีพ",
        specialty: "กายภาพบำบัดระบบกระดูกและกล้ามเนื้อ",
        schedule: "จันทร์ - ศุกร์ (08.30 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "เครื่องบำบัดด้วยคลื่นกระแทก High-Intensity Laser / Shockwave",
      "เตียงดึงคอและหลังไฟฟ้าอัตโนมัติ",
      "ห้องฝึกกายภาพบำบัดกว้างขวาง",
    ],
  },
  {
    id: "rehab",
    titleTh: "ศูนย์เวชศาสตร์ฟื้นฟู",
    titleEn: "Rehabilitation Center",
    icon: Heart,
    description:
      "ให้บริการประเมินและวางแผนฟื้นฟูสมรรถภาพร่างกาย กิจกรรมบำบัด และฝึกพูด สำหรับผู้ป่วยบาดเจ็บทางสมอง ไขสันหลัง และผู้สูงอายุ",
    highlightText: "ช่วยให้ผู้ป่วยกลับมาพึ่งพาตนเองได้ และมีคุณภาพชีวิตที่ดีขึ้น",
    banners: [
      "/img/indexbanner/herobannertest01.png",
      "/img/indexbanner/herobannertest02.png",
    ],
    services: [
      "กิจกรรมบำบัด (Occupational Therapy) ฝึกการกลืนและการขับถ่าย",
      "อรรถบำบัด (Speech Therapy) ฝึกการพูดและสื่อสาร",
      "การจัดทำอุปกรณ์ประคองและกายอุปกรณ์เสริม",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.30 - 16.00 น.",
    },
    contactExt: "805",
    doctors: [
      {
        id: "d12",
        name: "พญ. อรทัย ทรัพย์มณี",
        title: "แพทย์เฉพาะทางเวชศาสตร์ฟื้นฟู",
        specialty: "เวชศาสตร์ฟื้นฟูผู้ป่วยฟื้นตัวจาก stroke",
        schedule: "จันทร์, พุธ, ศุกร์ (09.00 - 15.00 น.)",
        image: "https://images.unsplash.com/photo-1594824813566-88855ce7896c?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "ห้องฝึกกิจกรรมบำบัดเสมือนบ้านจริง",
      "อุปกรณ์ฝึกเดินและฝึกทรงตัว",
    ],
  },
  {
    id: "ent",
    titleTh: "ศูนย์หู คอ จมูก",
    titleEn: "ENT Center",
    icon: FileText,
    description:
      "ให้บริการตรวจวินิจฉัยและรักษาโรคของหู คอ จมูก โรคภูมิแพ้ โรคไซนัสอักเสบ เสียงแหบ ก้อนที่คอ และอาการตรวจการได้ยิน",
    highlightText: "ดูแลระบบทางการหายใจส่วนบนและการได้ยินอย่างเชี่ยวชาญ",
    banners: [
      "/img/indexbanner/herobannertest02.png",
      "/img/indexbanner/herobannertest01.png",
    ],
    services: [
      "ตรวจส่องกล้องไซนัส และผ่าตัดส่องกล้องกล่องเสียง",
      "ตรวจการได้ยิน (Audiogram) และใส่เครื่องช่วยฟัง",
      "รักษาโรคภูมิแพ้ทางจมูก ไซนัสอักเสบ และนอนกรน",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    },
    contactExt: "901",
    doctors: [
      {
        id: "d13",
        name: "นพ. อนุชา ไชยสงคราม",
        title: "แพทย์เฉพาะทาง หู คอ จมูก",
        specialty: "โสต ศอ นาสิกวิทยา และการส่องกล้อง",
        schedule: "จันทร์ - ศุกร์ (08.30 - 15.30 น.)",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "ห้องตรวจส่องกล้องไร้เสียง (Audiometric Soundproof Booth)",
      "ชุดส่องกล้องตรวจไซนัสและกล่องเสียงความละเอียดสูง",
    ],
  },
  {
    id: "eye",
    titleTh: "ศูนย์จักษุ (ตา)",
    titleEn: "Eye / Ophthalmology Center",
    icon: Eye,
    description:
      "ให้บริการตรวจวัดสายตา ตรวจคัดกรองต้อกระจก ต้อหิน ต้อเนื้อ มะเร็งตา และผ่าตัดต้อกระจกสลายต้อด้วยคลื่นความถี่สูง (Phacoemulsification)",
    highlightText: "ถนอมดวงตาคู่สดใส เพื่อการมองเห็นที่คมชัดยาวนาน",
    banners: [
      "/img/indexbanner/herobannertest01.png",
      "/img/indexbanner/herobannertest02.png",
    ],
    services: [
      "ตรวจวัดสายตาและตรวจสุขภาพดวงตาประจำปี",
      "ผ่าตัดสลายต้อกระจกใส่เลนส์แก้วตาเทียม (Phacoemulsification)",
      "รักษาต้อหิน ต้อเนื้อ และจอตาเสื่อมจากเบาหวาน",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.00 - 16.00 น.",
    },
    contactExt: "951",
    doctors: [
      {
        id: "d14",
        name: "พญ. ธิดารัตน์ ประเสริฐสุข",
        title: "จักษุแพทย์เฉพาะทาง",
        specialty: "จักษุวิทยาและการผ่าตัดสลายต้อกระจก",
        schedule: "จันทร์, อังคาร, พฤหัสบดี (08.30 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "เครื่องสลายต้อกระจกด้วยคลื่นเสียงความถี่สูง Phacoemulsifier",
      "กล้องถ่ายภาพจอประสาทตาชนิดไม่ต้องขยายม่านตา",
    ],
  },
  {
    id: "thai",
    titleTh: "ศูนย์แพทย์แผนไทยและการแพทย์ทางเลือก",
    titleEn: "Thai Traditional & Alternative Medicine Center",
    icon: Sparkles,
    description:
      "ให้บริการนวดรักษาโรค นวดประคบสมุนไพร ทับหม้อเกลือหลังคลอด ฝังเข็มรักษาโรค และจ่ายยาสมุนไพรไทยโดยแพทย์แผนไทยและแพทย์แผนจีนวิชาชีพ",
    highlightText: "บำบัดรักษาด้วยภูมิปัญญาไทยและศาสตร์การแพทย์ทางเลือกที่ได้มาตรฐาน",
    banners: [
      "/img/indexbanner/herobannertest02.png",
      "/img/indexbanner/herobannertest01.png",
    ],
    services: [
      "นวดราชสำนักรักษาอาการปวดสะบัก ปวดคอ หลัง ขา",
      "การประคบสมุนไพรสด และการอบสมุนไพรบำบัด",
      "บริการทับหม้อเกลือและดูแลฟื้นฟูคุณแม่หลังคลอด",
      "บริการฝังเข็ม ครอบแก้ว บำบัดอาการปวดตามจุด (Acupuncture)",
      "ตรวจรักษาและจ่ายยาสมุนไพรไทยตำรับมาตรฐาน",
    ],
    serviceHours: {
      regular: "จันทร์ - ศุกร์ : 08.30 - 16.30 น.",
      afterHours: "เสาร์ - อาทิตย์ : 08.30 - 15.30 น. (เปิดให้บริการนวดและฝังเข็ม)",
    },
    contactExt: "980, 981",
    doctors: [
      {
        id: "d15",
        name: "พท.ป. ชาญชัย มั่นคง",
        title: "แพทย์แผนไทยประยุกต์",
        specialty: "เวชกรรมไทยและการนวดรักษาโรค",
        schedule: "จันทร์ - เสาร์ (08.30 - 16.00 น.)",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
      },
    ],
    facilities: [
      "ห้องนวดบำบัดรักษาเป็นส่วนตัวเงียบสงบ",
      "ตู้อบสมุนไพรไทยแยกชาย-หญิง",
      "ห้องฝังเข็มสะอาดพร้อมอุปกรณ์ใช้ครั้งเดียวทิ้ง",
    ],
  },
];

// Component หลักแบบ Inner (สำหรับใช้งานร่วมกับ useSearchParams)
function PatientServicesContent() {
  const searchParams = useSearchParams();
  const initialDept = searchParams?.get("dept") || "emergency";

  const [selectedCenterId, setSelectedCenterId] = useState<string>(initialDept);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // อัปเดตศูนย์ที่เลือกถ้า query string เปลี่ยน
  useEffect(() => {
    const dept = searchParams?.get("dept");
    if (dept && centersData.some((c) => c.id === dept)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCenterId(dept);
    }
  }, [searchParams]);

  const currentCenter =
    centersData.find((c) => c.id === selectedCenterId) || centersData[0];

  // อัปเดต slide index เมื่อเปลี่ยนศูนย์
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentSlideIndex(0);
  }, [selectedCenterId]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % currentCenter.banners.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? currentCenter.banners.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans pb-16">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER BREADCRUMB BANNER WITH GEOMETRIC PATTERN        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-md">
        {/* Geometric Hexagon / Light Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00bba7_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Light Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Breadcrumb Links */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-teal-200 font-medium bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
            <Link href="/" className="hover:text-white transition-colors">
              หน้าหลัก
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-teal-100 font-semibold">ศูนย์บริการผู้ป่วย</span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-orange-400 font-bold">{currentCenter.titleTh}</span>
          </nav>

          {/* Title Headers */}
          <div className="space-y-2 pt-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f97316] drop-shadow-sm tracking-tight">
              ศูนย์บริการผู้ป่วย - ศูนย์รักษาเฉพาะทาง
            </h1>
            <p className="text-sm sm:text-base text-teal-100 max-w-2xl mx-auto font-light">
              ให้บริการตรวจ วินิจฉัย และรักษาพยาบาลด้วยทีมแพทย์เฉพาะทาง ครอบคลุมทุกสาขา พร้อมอุปกรณ์ทางการแพทย์ทันสมัย
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN 2-COLUMN LAYOUT (SIDEBAR + CONTENT AREA)               */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR: รายชื่อ 12 ศูนย์เฉพาะทาง (Orange Buttons)  */}
          {/* ========================================================= */}
          <aside className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden sticky top-6">
            <div className="bg-gradient-to-r from-[#ea580c] to-[#f97316] p-4 text-white font-bold text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-white" />
              <span>ศูนย์รักษาเฉพาะทาง</span>
            </div>

            {/* List of Center Buttons */}
            <div className="p-2 divide-y divide-gray-100">
              {centersData.map((item) => {
                const IconComponent = item.icon;
                const isSelected = item.id === selectedCenterId;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCenterId(item.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 text-left font-semibold text-sm group ${
                      isSelected
                        ? "bg-[#ea580c] text-white shadow-md scale-[1.01]"
                        : "text-gray-700 hover:bg-orange-50 hover:text-[#ea580c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-orange-100 text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="leading-snug">{item.titleTh}</span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? "text-white translate-x-1"
                          : "text-gray-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Emergency Hotline Banner inside Sidebar */}
            <div className="m-3 p-4 bg-red-50 rounded-xl border border-red-100 text-red-900 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-red-700 text-sm">
                <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
                <span>สายด่วนอุบัติเหตุ 24 ชม.</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                กรณีอุบัติเหตุหรือผู้ป่วยวิกฤตฉุกเฉิน ติดต่อศูนย์กู้ชีพ รพ.ปากช่องนานา
              </p>
              <a
                href="tel:044311856"
                className="inline-flex items-center justify-center gap-2 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-xs shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
                <span>โทร 044-311856</span>
              </a>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT MAIN CONTENT AREA                                    */}
          {/* ========================================================= */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCenter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* 1. SLIDER & CENTER TITLE HEADER CARD */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                  {/* Image Carousel */}
                  <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-900">
                    <Image
                      src={currentCenter.banners[currentSlideIndex]}
                      alt={currentCenter.titleTh}
                      fill
                      priority
                      className="object-cover transition-all duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Prev & Next Slide Buttons */}
                    {currentCenter.banners.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                          aria-label="Previous Slide"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                          aria-label="Next Slide"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Banner Text overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <span className="inline-block px-3 py-1 bg-[#ea580c] text-white text-xs font-bold rounded-full mb-1 uppercase tracking-wider">
                        {currentCenter.titleEn}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold drop-shadow-md">
                        {currentCenter.titleTh}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-2xl font-light">
                        {currentCenter.highlightText}
                      </p>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-6 h-6 text-[#ea580c] shrink-0 mt-0.5" />
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {currentCenter.description}
                      </p>
                    </div>

                    {/* Quick Info Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                        <Clock className="w-5 h-5 text-teal-600 shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-bold text-gray-800 block">เวลาทำการหลัก</span>
                          <span className="text-teal-700 font-medium">{currentCenter.serviceHours.regular}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <Phone className="w-5 h-5 text-[#ea580c] shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-bold text-gray-800 block">เบอร์ติดต่อตรง</span>
                          <span className="text-[#ea580c] font-semibold">
                            044-311856 ต่อ {currentCenter.contactExt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. SERVICES & HIGHLIGHTS SECTION */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        ขอบเขตการให้บริการทางการแพทย์
                      </h3>
                      <p className="text-xs text-gray-500">Medical Services & Care Scope</p>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentCenter.services.map((srv, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-gray-700 text-sm font-medium hover:bg-orange-50/50 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Extra Hours note */}
                  {currentCenter.serviceHours.afterHours && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                      <div>
                        <span className="font-bold block text-amber-950">
                          บริการคลินิกพิเศษนอกเวลาราชการ (After-Hours Clinic)
                        </span>
                        <span>{currentCenter.serviceHours.afterHours}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. MEDICAL TEAM (ทีมแพทย์ประจำศูนย์) */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          ทีมแพทย์เฉพาะทางประจำศูนย์
                        </h3>
                        <p className="text-xs text-gray-500">Specialized Medical Doctors</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentCenter.doctors.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-slate-50 hover:shadow-md transition-shadow"
                      >
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                          <Image
                            src={doc.image}
                            alt={doc.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <h4 className="font-bold text-gray-900 text-base leading-snug">
                            {doc.name}
                          </h4>
                          <span className="inline-block px-2.5 py-0.5 bg-teal-100 text-teal-800 text-xs font-semibold rounded-md">
                            {doc.title}
                          </span>
                          <p className="text-xs text-gray-600 font-medium">
                            <span className="text-gray-400">เชี่ยวชาญ:</span> {doc.specialty}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
                            <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
                            <span>{doc.schedule}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. FACILITIES & EQUIPMENT */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        เครื่องมือและสิ่งอำนวยความสะดวก
                      </h3>
                      <p className="text-xs text-gray-500">Facilities & Modern Medical Equipment</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentCenter.facilities.map((fac, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 bg-teal-50/40 text-gray-800 text-sm font-semibold"
                      >
                        <Building className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. CALL TO ACTION / APPOINTMENT BANNER */}
                <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                  <div className="space-y-2 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold">
                      ต้องการทำนัดหมายหรือสอบถามข้อมูลเพิ่มเติม?
                    </h3>
                    <p className="text-xs sm:text-sm text-orange-100 font-light">
                      เปิดให้บริการจองคิวตรวจออนไลน์ล่วงหน้า เพื่อความสะดวกและไม่ต้องรอนาน
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 bg-white text-[#ea580c] hover:bg-orange-50 font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>จองคิวนัดหมายออนไลน์</span>
                    </button>
                    <a
                      href={`tel:044311856`}
                      className="w-full sm:w-auto px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>โทร 044-311856</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. MODAL นัดหมายแพทย์ออนไลน์ (Appointment Modal)              */}
      {/* ------------------------------------------------------------- */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 border border-gray-100">
            <button
              onClick={() => setIsAppointmentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#ea580c] uppercase">
                {currentCenter.titleTh}
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                ลงทะเบียนนัดหมายตรวจล่วงหน้า
              </h3>
              <p className="text-xs text-gray-500">
                กรอกข้อมูลเบื้องต้น เจ้าหน้าที่จะติดต่อกลับเพื่อยืนยันนัดหมาย
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`บันทึกคำขอนัดหมายตรวจ ณ ${currentCenter.titleTh} เรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับ`);
                setIsAppointmentModalOpen(false);
              }}
              className="space-y-4 text-sm"
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  ชื่อ-นามสกุล ผู้ป่วย *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น นายสมชาย ใจดี"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    เบอร์โทรศัพท์ติดต่อ *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    วันที่ต้องการรับบริการ
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  อาการเบื้องต้น / ข้อความเพิ่มเติม
                </label>
                <textarea
                  rows={3}
                  placeholder="ระบุอาการเบื้องต้น..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ea580c] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAppointmentModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs shadow-md transition-colors"
                >
                  ส่งข้อมูลนัดหมาย
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Export default Page Wrap ด้วย Suspense สำหรับ useSearchParams
export default function PatientServicesPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">กำลังโหลดข้อมูลศูนย์บริการผู้ป่วย...</div>}>
      <PatientServicesContent />
    </Suspense>
  );
}
