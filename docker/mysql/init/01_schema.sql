-- =============================================
-- PNNH Hospital Website - Database Schema
-- =============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- =============================================
-- แบนเนอร์หน้าแรก
-- =============================================
CREATE TABLE IF NOT EXISTS `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(500) NOT NULL,
  `title` varchar(255) DEFAULT '',
  `subtitle` varchar(255) DEFAULT '',
  `description` text,
  `button_text` varchar(100) DEFAULT '',
  `show_content` tinyint(1) DEFAULT 1,
  `display_order` int DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ผู้บริหารโรงพยาบาล
-- =============================================
CREATE TABLE IF NOT EXISTS `hospital_executives` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT '',
  `department` varchar(255) DEFAULT '',
  `image_url` varchar(500) DEFAULT '',
  `display_order` int DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- โครงสร้างองค์กร (รูปภาพ)
-- =============================================
CREATE TABLE IF NOT EXISTS `org_chart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(500) NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ศูนย์รักษา / ศูนย์พิเศษ
-- =============================================
CREATE TABLE IF NOT EXISTS `hospital_centers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `icon_type` varchar(100) DEFAULT '',
  `href` varchar(500) DEFAULT '',
  `type` varchar(50) DEFAULT 'specialized',
  `display_order` int DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- แผนกต่างๆ (ศูนย์บริการผู้ป่วย)
-- =============================================
CREATE TABLE IF NOT EXISTS `department_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dept` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(500) DEFAULT '',
  `display_order` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ขั้นตอนการลงทะเบียนผู้ป่วย
-- =============================================
CREATE TABLE IF NOT EXISTS `patient_reg_steps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `display_order` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- คลินิกพิเศษนอกเวลา
-- =============================================
CREATE TABLE IF NOT EXISTS `after_hours_clinics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clinic_name` varchar(255) NOT NULL,
  `specialist` varchar(255) DEFAULT '',
  `doctor_name` varchar(255) DEFAULT '',
  `schedule` varchar(255) DEFAULT '',
  `phone` varchar(100) DEFAULT '',
  `display_order` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- โปรแกรมตรวจสุขภาพ
-- =============================================
CREATE TABLE IF NOT EXISTS `health_checkup_programs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` varchar(100) DEFAULT '',
  `location` varchar(255) DEFAULT '',
  `time` varchar(255) DEFAULT '',
  `contact` varchar(255) DEFAULT '',
  `image` varchar(500) DEFAULT '',
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- โปรแกรมฉีดวัคซีน
-- =============================================
CREATE TABLE IF NOT EXISTS `health_vaccine_programs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` varchar(100) DEFAULT '',
  `category` varchar(100) DEFAULT 'วัคซีนทั่วไป',
  `location` varchar(255) DEFAULT '',
  `time` varchar(255) DEFAULT '',
  `contact` varchar(255) DEFAULT '',
  `image` varchar(500) DEFAULT '',
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ข่าวสารและประกาศ (ศูนย์ตรวจสุขภาพ)
-- =============================================
CREATE TABLE IF NOT EXISTS `health_checkup_announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(100) DEFAULT '',
  `category` varchar(100) DEFAULT 'ข่าวสาร',
  `image` varchar(500) DEFAULT '',
  `description` text,
  `pinned` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ประกาศ / โปสเตอร์หน้าหลัก
-- =============================================
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(500) NOT NULL,
  `title` varchar(255) DEFAULT '',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ข่าวสารและกิจกรรม
-- =============================================
CREATE TABLE IF NOT EXISTS `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `category` varchar(100) DEFAULT 'pr_news',
  `image_url` varchar(500) DEFAULT '',
  `content` text,
  `is_active` tinyint(1) DEFAULT 1,
  `published_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- จัดซื้อจัดจ้าง / สมัครงาน
-- =============================================
CREATE TABLE IF NOT EXISTS `procurement_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `type` varchar(50) DEFAULT 'procurement',
  `document_url` varchar(500) DEFAULT '',
  `published_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deadline_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- ศูนย์รักษาเฉพาะทาง (หน้า /patient-services)
-- banners / services / facilities เก็บเป็น JSON array ในรูป TEXT
-- =============================================
CREATE TABLE IF NOT EXISTS `treatment_centers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(60) NOT NULL,
  `title_th` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT '',
  `icon_type` varchar(40) DEFAULT 'stethoscope',
  `description` text,
  `highlight_text` varchar(500) DEFAULT '',
  `banners` text,
  `services` text,
  `facilities` text,
  `hours_regular` varchar(255) DEFAULT '',
  `hours_after` varchar(255) DEFAULT '',
  `hours_emergency` varchar(255) DEFAULT '',
  `contact_ext` varchar(100) DEFAULT '',
  `doctor_department` varchar(255) DEFAULT '',
  `display_order` int DEFAULT 99,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_treatment_centers_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
