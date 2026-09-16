"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

interface DoctorAvatarProps {
  image: string;
  name: string;
  alt: string;
  priority?: boolean;
  imageClassName?: string;
  sizes?: string;
}

/**
 * รูปแพทย์ — ถ้ามี image ใช้รูปจริง (next/image fill)
 * ถ้าไม่มี "หรือ" รูปโหลดไม่ขึ้น (ลิงก์เสีย/ไฟล์หาย) ใช้ไอคอนรูปคนแทน
 * (วางเต็มกรอบ parent — ต้องใส่ position: relative ให้ parent เอง)
 */
export default function DoctorAvatar({
  image,
  name,
  alt,
  priority,
  imageClassName = "object-cover object-top",
  sizes,
}: DoctorAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        className={imageClassName}
        sizes={sizes}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center text-orange-300" aria-label={name}>
      <User className="w-1/3 h-1/3" strokeWidth={1.5} />
    </div>
  );
}
