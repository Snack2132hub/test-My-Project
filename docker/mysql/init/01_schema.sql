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
-- ศูนย์รักษาพิเศษ (คลินิกเฉพาะโรค — โครงสร้างเดียวกับ treatment_centers)
-- banners / services / facilities เก็บเป็น JSON array ในรูป TEXT
-- =============================================
CREATE TABLE IF NOT EXISTS `hospital_centers` (
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
  UNIQUE KEY `uq_hospital_centers_slug` (`slug`)
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

-- ข้อมูลตั้งต้นข่าวสาร กิจกรรม และคลินิกพิเศษนอกเวลา
INSERT IGNORE INTO `news` (`id`, `title`, `category`, `image_url`, `content`, `published_at`) VALUES
(1, 'ทีม MCATT โรงพยาบาลปากช่องนานา ลงพื้นที่เยียวยาจิตใจและดูแลสุขภาพจิตชุมชนเชิงรุก', 'activity', '/img/activity/ob68/MCATT_ob.jpg', 'กลุ่มงานจิตเวชและยาเสพติด พร้อมทีมสหวิชาชีพ MCATT ลงพื้นที่ร่วมกับ รพ.สต. เพื่อดูแลช่วยเหลือและเยียวยาจิตใจผู้ได้รับผลกระทบจากภาวะวิกฤต', '2025-10-25 10:00:00'),
(2, 'ทีมแพทย์เวชศาสตร์ครอบครัวลงพื้นที่เยี่ยมบ้าน (Home Care) ดูแลผู้ป่วยติดเตียงและผู้พิการ', 'activity', '/img/activity/nov68/25-1_nov.jpg', 'ทีมแพทย์ พยาบาลเวชปฏิบัติครอบครัว และนักกายภาพบำบัด ออกเยี่ยมบ้านดูแลผู้ป่วยโรคเรื้อรังและผู้ป่วยระยะท้าย', '2025-11-25 14:30:00'),
(3, 'การซ้อมแผนรองรับสถานการณ์อุบัติเหตุหมู่และภัยพิบัติทางถนน ประจำปี 2568', 'activity', '/img/activity/nov68/21_nov.jpg', 'กลุ่มงานการแพทย์ฉุกเฉินและสาธารณภัย ร่วมกับภาคีเครือข่ายกู้ชีพกู้ภัย จัดการฝึกซ้อมแผนรับมืออุบัติเหตุหมู่บนทางหลวงมิตรภาพ', '2025-11-21 09:30:00'),
(4, 'การอบรมเชิงปฏิบัติการพัฒนาทักษะการช่วยฟื้นคืนชีพขั้นสูง (ACLS) สำหรับแพทย์และพยาบาล', 'activity', '/img/activity/nov68/11_nov.jpg', 'กลุ่มงานวิชาการและพัฒนาบุคลากร จัดอบรมฟื้นฟูทักษะการกู้ชีพขั้นสูง ACLS และการใช้เครื่องกระตุกหัวใจอัตโนมัติ', '2025-11-11 08:30:00'),
(5, 'พิธีมอบเกียรติบัตรและเชิดชูเกียรติบุคลากรดีเด่น ผู้ปฏิบัติงานด้วยหัวใจความเป็นมนุษย์', 'activity', '/img/activity/nov68/7_nov.jpg', 'ผู้อำนวยการโรงพยาบาลปากช่องนานา เป็นประธานในพิธีมอบรางวัลเชิดชูเกียรติแก่บุคลากรทางการแพทย์และเจ้าหน้าที่', '2025-11-07 11:00:00'),
(6, 'กิจกรรม Big Cleaning Day รวมพลังบุคลากรทำความสะอาดและพัฒนาสิ่งแวดล้อมโรงพยาบาล', 'activity', '/img/activity/nov68/19_nov.jpg', 'คณะผู้บริหารและเจ้าหน้าที่ทุกแผนกร่วมแรงร่วมใจทำความสะอาดตามมาตรฐาน Green & Clean Hospital', '2025-11-19 15:00:00'),
(7, 'การอบรมสุขศึกษาและโภชนาการสำหรับผู้ป่วยโรคไตวายเรื้อรัง ชะลอไตเสื่อมด้วยการปรับพฤติกรรม', 'activity', '/img/activity/nov68/26_nov.jpg', 'กลุ่มงานโภชนศาสตร์ร่วมกับคลินิกชะลอไตเสื่อม จัดเวิร์กช็อปสาธิตเมนูอาหารลดเค็ม ชะลอไตเสื่อม', '2025-11-26 09:00:00'),
(8, 'การประชุมวิชาการพัฒนาระบบการดูแลผู้ป่วยระยะประคับประคอง (Palliative Care Network)', 'activity', '/img/activity/nov68/29_nov.jpg', 'การแลกเปลี่ยนเรียนรู้การดูแลผู้ป่วยแบบ Palliative Care ร่วมกับ รพ.สต. และองค์กรปกครองส่วนท้องถิ่น', '2025-11-29 13:30:00'),
(9, 'หน่วยทันตกรรมเคลื่อนที่ออกให้บริการตรวจรักษาฟันและส่งเสริมสุขภาพช่องปากแก่นักเรียน', 'activity', '/img/activity/dec/17_dec.jpg', 'กลุ่มงานทันตกรรมส่งเสริมทันตสุขภาพ ออกหน่วยให้บริการตรวจสุขภาพช่องปาก อุดฟัน เคลือบฟลูออไรด์แก่นักเรียน', '2025-12-17 09:30:00'),
(10, 'การฝึกอบรมการป้องกันและระงับอัคคีภัยขั้นต้น พร้อมซ้อมอพยพผู้ป่วยเสมือนจริง', 'activity', '/img/activity/dec/18_dec.jpg', 'ทีมงานอาชีวอนามัยและความปลอดภัยจัดซ้อมแผนอพยพผู้ป่วยและการระงับเหตุอัคคีภัยเสมือนจริง', '2025-12-18 14:00:00'),
(11, 'การประชุมวิชาการแนวทางการดูแลผู้ป่วยโรคหลอดเลือดหัวใจอุดตันเฉียบพลัน (STEMI Network)', 'activity', '/img/activity/dec/11_dec.jpg', 'แพทย์เฉพาะทางอายุรศาสตร์โรคหัวใจ บรรยายแนวทางการเปิดหลอดเลือดหัวใจอย่างรวดเร็ว (STEMI Fast Track)', '2025-12-11 13:00:00'),
(12, 'กิจกรรมมอบของขวัญและส่งมอบรอยยิ้มแก่ผู้ป่วยเด็กในหอผู้ป่วยกุมารเวชกรรม', 'activity', '/img/activity/dec/25_dec.jpg', 'ทีมพยาบาลกุมารเวชกรรมจัดกิจกรรมสร้างความสุข มอบของเล่นและขนมแก่เด็กที่นอนพักรักษาตัวในโรงพยาบาล', '2025-12-25 11:00:00'),
(13, 'คณะผู้บริหารตรวจเยี่ยมจุดบริการด่านหน้า มอบขวัญและกำลังใจแก่เจ้าหน้าที่เวรปฏิบัติการ', 'activity', '/img/activity/dec/30_dec.jpg', 'ผู้บริหารเดินตรวจเยี่ยมห้องฉุกเฉิน หอผู้ป่วยใน ห้องผ่าตัด และจุดบริการด่านหน้า มอบของบำรุงขวัญแก่เจ้าหน้าที่', '2025-12-30 20:00:00'),
(14, 'การประชุมเชิงปฏิบัติการพัฒนาคุณภาพบริการตามมาตรฐานโรงพยาบาลและบริการสุขภาพ (HA)', 'activity', '/img/activity/ob68/21_ob1.jpg', 'การทบทวนเวชระเบียนและกระบวนการดูแลรักษาผู้ป่วย เพื่อมุ่งสู่การรับรองคุณภาพสถานพยาบาลระดับสากล', '2025-10-21 09:00:00'),
(15, 'หน่วยแพทย์เคลื่อนที่ออกตรวจรักษาและให้คำปรึกษาสุขภาพประชาชนในพื้นที่ตำบลโป่งตาลอง', 'activity', '/img/activity/ob68/22_ob.jpg', 'ทีมแพทย์ พยาบาล และเภสัชกร ออกตรวจสุขภาพทั่วไป จ่ายยา และให้ความรู้การดูแลสุขภาพแก่ประชาชน', '2025-10-22 10:30:00'),
(16, 'โครงการอบรมเชิงปฏิบัติการการช่วยฟื้นคืนชีพขั้นพื้นฐาน (Basic CPR & AED) แก่ประชาชน', 'activity', '/img/activity/ob68/9_ob.jpg', 'ฝึกทักษะการกดหน้าอกช่วยชีวิตและการใช้เครื่องฟื้นคืนคลื่นหัวใจด้วยไฟฟ้าอัตโนมัติ (AED)', '2025-10-09 13:30:00'),
(17, 'กิจกรรมรับบริจาคโลหิต ร่วมใจต่อชีวิตเพื่อนมนุษย์ ร่วมกับเหล่ากาชาดจังหวัดนครราชสีมา', 'activity', '/img/activity/21_jan.jpg', 'โรงพยาบาลปากช่องนานา ขอขอบคุณบุคลากรและประชาชนทุกท่านที่ร่วมบริจาคโลหิต', '2026-01-21 09:00:00'),
(18, 'การพัฒนาเครือข่ายระบบส่งต่อผู้ป่วยโรคหลอดเลือดสมองเฉียบพลัน (Stroke Fast Track)', 'activity', '/img/activity/26_jan.jpg', 'การอบรมเชื่อมโยงการประเมินอาการ Fast Track และการให้ยาละลายลิ่มเลือด (rt-PA) ภายในเวลาทอง', '2026-01-26 13:30:00'),
(19, 'กิจกรรมวันพยาบาลสากล ร่วมยกย่องและเชิดชูบทบาทวิชาชีพพยาบาลผู้ดูแลชีวิตด้วยหัวใจ', 'activity', '/img/activity/12_may.jpg', 'พิธีรำลึกมิสฟลอเรนซ์ ไนติงเกล และการแสดงความขอบคุณพยาบาลวิชาชีพทุกท่าน', '2026-05-12 10:00:00'),
(20, 'โครงการรณรงค์วันงดสูบบุหรี่โลก ร่วมใจสร้างสิ่งแวดล้อมปลอดบุหรี่เพื่อสุขภาพปอดและคนที่คุณรัก', 'pr_news', '/img/activity/smoke.jpg', 'กลุ่มงานเวชปฏิบัติครอบครัวและชุมชน จัดกิจกรรมรณรงค์เลิกบุหรี่ ให้คำปรึกษาการเลิกบุหรี่ผ่านคลินิกฟ้าใส', '2026-05-31 09:00:00'),
(21, 'ประชาสัมพันธ์บริการฉีดวัคซีนป้องกันโรคไข้หวัดใหญ่ 4 สายพันธุ์ สำหรับกลุ่มเสี่ยง 7 กลุ่มโรค', 'pr_news', '/img/activity/nov68/6_nov.jpg', 'โรงพยาบาลปากช่องนานา เปิดให้บริการฉีดวัคซีนไข้หวัดใหญ่ประจำปีสำหรับผู้สูงอายุและกลุ่มเสี่ยง', '2025-11-06 10:00:00'),
(22, 'เตรียมความพร้อมศูนย์อุบัติเหตุฉุกเฉินระดับสูง รับมือช่วงเทศกาลปีใหม่ตลอด 24 ชั่วโมง', 'pr_news', '/img/activity/dec/26_dec.jpg', 'โรงพยาบาลปากช่องนานา เพิ่มกำลังทีมแพทย์ พยาบาล ห้องผ่าตัด และคลังเลือด พร้อมรับมืออุบัติเหตุ 24 ชม.', '2025-12-26 09:00:00'),
(23, 'การเปิดจุดบริการปฐมพยาบาลและตรวจวัดความดันโลหิตแก่ผู้เดินทางช่วงเทศกาล', 'pr_news', '/img/activity/dec/29_dec.jpg', 'ตั้งจุดบริการตรวจสุขภาพเบื้องต้นและแจกยาจำเป็นสำหรับผู้ขับขี่ที่สัญจรผ่านเส้นทางอำเภอปากช่อง', '2025-12-29 10:00:00'),
(24, 'ประชาสัมพันธ์โครงการตรวจคัดกรองมะเร็งเต้านมและมะเร็งปากมดลูกสัญจรฟรี', 'pr_news', '/img/activity/dec/12_dec.jpg', 'กลุ่มสุขภาพสตรีและสูตินรีเวช เปิดให้บริการตรวจคัดกรองมะเร็งสตรีด้วยเครื่องเอกซเรย์เต้านมเคลื่อนที่ (Mammogram)', '2025-12-12 09:00:00'),
(25, 'รณรงค์วันไตโลก ชวนคนไทยลดเค็มครึ่งหนึ่ง ชะลอไตเสื่อม สุขภาพยืนยาว', 'pr_news', '/img/activity/10_mar.jpg', 'จัดนิทรรศการให้ความรู้เรื่องโรคไต ตรวจประเมินการทำงานของไต และตรวจวัดความดันโลหิต', '2026-03-10 09:00:00'),
(26, 'กิจกรรมวันอนามัยโลก (World Health Day) สุขภาพดีเริ่มต้นที่เราทุกคน', 'pr_news', '/img/activity/7_apr.jpg', 'ประชาสัมพันธ์การดูแลสุขภาพแบบองค์รวม ตรวจสุขภาพเบื้องต้นฟรี และให้คำปรึกษาปัญหาสุขภาพ', '2026-04-07 09:30:00'),
(27, 'ประชาสัมพันธ์เปิดให้บริการคลินิกพิเศษเฉพาะทางเพิ่มเติม เพื่อความสะดวกของผู้รับบริการ', 'pr_news', '/img/activity/1_july.jpg', 'โรงพยาบาลปากช่องนานา เพิ่มการให้บริการคลินิกเฉพาะทางโรคข้อ คลินิกผิวหนัง และคลินิกพัฒนาการเด็ก', '2026-07-01 08:30:00'),
(28, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนสิงหาคม', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_aug.jpg', 'บริการตรวจรักษาโดยแพทย์เฉพาะทางนอกเวลาราชการ วันจันทร์ - ศุกร์ 16.00 - 20.00 น. เสาร์ - อาทิตย์ 08.00 - 12.00 น.', '2026-08-01 08:00:00'),
(29, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนกรกฎาคม', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_july.png', 'ตารางออกตรวจแพทย์เฉพาะทาง คลินิกกุมารเวชกรรม สูตินรีเวชกรรม ศัลยกรรมกระดูกและข้อ และอายุรกรรม', '2026-07-01 08:00:00'),
(30, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนมิถุนายน', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_jun.jpg', 'ตารางตรวจแพทย์เฉพาะทางนอกเวลาราชการ อำนวยความสะดวกแก่ผู้รับบริการไม่ต้องลางาน', '2026-06-01 08:00:00'),
(31, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนพฤษภาคม', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_may.jpg', 'ตารางแพทย์ออกตรวจคลินิกพิเศษนอกเวลา SMC โรงพยาบาลปากช่องนานา ประจำเดือนพฤษภาคม', '2026-05-01 08:00:00'),
(32, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนเมษายน', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_apr.png', 'ตารางแพทย์ออกตรวจคลินิกพิเศษนอกเวลา SMC โรงพยาบาลปากช่องนานา ประจำเดือนเมษายน', '2026-04-01 08:00:00'),
(33, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนมีนาคม', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_mar.png', 'ตารางแพทย์ออกตรวจคลินิกพิเศษนอกเวลา SMC โรงพยาบาลปากช่องนานา ประจำเดือนมีนาคม', '2026-03-01 08:00:00'),
(34, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนกุมภาพันธ์', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_feb.png', 'ตารางแพทย์ออกตรวจคลินิกพิเศษนอกเวลา SMC โรงพยาบาลปากช่องนานา ประจำเดือนกุมภาพันธ์', '2026-02-01 08:00:00'),
(35, 'ตารางการออกตรวจคลินิกพิเศษนอกเวลาราชการ (SMC) ประจำเดือนมกราคม', 'after_hours', '/img/AfterHoursClinicSection/smc/smc_jan2.jpg', 'ตารางแพทย์ออกตรวจคลินิกพิเศษนอกเวลา SMC โรงพยาบาลปากช่องนานา ประจำเดือนมกราคม', '2026-01-01 08:00:00');

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
