# คู่มือการใช้งานโปรเจกต์เว็บไซต์โรงพยาบาล

เอกสารนี้อธิบายวิธีติดตั้ง รัน แก้ไข และตรวจสอบเว็บไซต์โรงพยาบาลปากช่องนานา ซึ่งพัฒนาด้วย Next.js, React, TypeScript และ Tailwind CSS

## 1. สิ่งที่ต้องมี

- Node.js รุ่นที่รองรับ Next.js 16 (แนะนำรุ่น LTS ปัจจุบัน)
- npm (ติดตั้งมาพร้อม Node.js)

ตรวจสอบเวอร์ชันด้วยคำสั่ง:

```bash
node --version
npm --version
```

## 2. ติดตั้งและเปิดเว็บไซต์บนเครื่อง

เปิด Terminal ที่โฟลเดอร์โปรเจกต์ แล้วใช้คำสั่งต่อไปนี้:

```bash
npm install
npm run dev
```

จากนั้นเปิด `http://localhost:3000` ในเบราว์เซอร์ ระบบจะรีเฟรชหน้าให้อัตโนมัติเมื่อบันทึกไฟล์

คำสั่งสำคัญอื่น ๆ:

| คำสั่ง | ใช้สำหรับ |
| --- | --- |
| `npm run dev` | เปิดโหมดพัฒนา |
| `npm run lint` | ตรวจคุณภาพโค้ดด้วย ESLint |
| `npm run build` | สร้างไฟล์สำหรับนำขึ้นใช้งานจริง |
| `npm run start` | เปิดเว็บจาก build ที่สร้างแล้ว |

> บน PowerShell ของบางเครื่อง `npm` อาจถูกบล็อกด้วย Execution Policy ให้ใช้ `cmd /c npm run dev` หรือปรับนโยบายของเครื่องตามมาตรฐานทีมก่อน

## 3. ภาพรวมโครงสร้าง

```text
app/
  layout.tsx                         Layout กลาง: ฟอนต์, Navbar, เนื้อหา, Footer
  (pages)/
    page.tsx                          หน้าแรก (/)
    patient-services/
      page-patient-services.tsx       หน้าศูนย์บริการผู้ป่วย
components/
  navbar.tsx                          เมนูด้านบน
  footer.tsx                          ส่วนท้ายเว็บ
  home/                               ส่วนประกอบของหน้าแรก
public/img/                           รูปภาพที่เรียกผ่าน URL /img/...
styles/globals.css                    Tailwind และสไตล์/ตัวแปรกลาง
next.config.ts                        การตั้งค่า Next.js และโดเมนรูปภาพภายนอก
```

โฟลเดอร์ `(pages)` เป็น Route Group ของ Next.js: มีไว้จัดระเบียบโฟลเดอร์และไม่ปรากฏใน URL ดังนั้น `app/(pages)/page.tsx` คือ URL `/`

## 4. หน้าที่ของแต่ละส่วนในหน้าแรก

ไฟล์ `app/(pages)/page.tsx` เรียงส่วนประกอบของหน้าแรกตามลำดับนี้:

| Component | หน้าที่ | จุดแก้ไขหลัก |
| --- | --- | --- |
| `HeroBanner.tsx` | ภาพแบนเนอร์แบบสไลด์ | ตัวแปร `slides`; รูปใน `public/img/indexbanner` |
| `ActionButtonsBar.tsx` | ปุ่มทางลัด | ข้อความ, ไอคอน และปลายทางลิงก์ |
| `AnnouncementsSection.tsx` | ประกาศสำคัญ | ข้อความและรูปใน component |
| `MedicalServicesSection.tsx` | รายการศูนย์/บริการแพทย์ | Array `services` |
| `HealthCheckupSection.tsx` | ตรวจสุขภาพและวัคซีน | ข้อความและรูปใน `public/img/Health_check_up` |
| `OnlineAppointmentSection.tsx` | ช่องทางนัดหมายออนไลน์ | ลิงก์และข้อความของปุ่ม |
| `DoctorTeamSection.tsx` | รายชื่อทีมแพทย์ | Array `doctors` |
| `AfterHoursClinicSection.tsx` | ตารางคลินิกนอกเวลา | ข้อมูลของเดือนนี้/เดือนหน้า |
| `NewsAndActivitiesSection.tsx` | ข่าวและกิจกรรม | Object `newsData` |
| `ProcurementAndContactSection.tsx` | จัดซื้อ, สมัครงาน, วิดีโอ, ติดต่อ | Object `procurementData`, URL YouTube/Maps/โซเชียล |

## 5. แก้ไขเมนูและข้อมูลติดต่อ

### เมนูด้านบน

แก้ที่ `components/navbar.tsx`

- `Link href="..."` กำหนดปลายทางภายในเว็บ
- `<a href="...">` กำหนดปลายทางภายนอก เช่น Facebook, LINE, YouTube และแผนที่
- state `isMobileMenuOpen` ควบคุมเมนูมือถือ
- state `activeDropdown` ควบคุม dropdown ของเมนูเดสก์ท็อป

### Footer

แก้ที่ `components/footer.tsx` สำหรับชื่อโรงพยาบาล ที่อยู่ เบอร์โทร อีเมล และลิงก์หมวดต่าง ๆ

ควรเปลี่ยนลิงก์ `href="#"` ที่ยังเป็น placeholder เป็นหน้าจริงก่อนเผยแพร่

## 6. เพิ่มหรือเปลี่ยนรูปภาพ

1. วางไฟล์ใน `public/img/` โดยจัดหมวด เช่น `public/img/news/new-item.jpg`
2. เรียกใช้ในโค้ดผ่าน path ที่ขึ้นต้นด้วย `/`:

```tsx
<Image src="/img/news/new-item.jpg" alt="คำอธิบายรูปภาพ" fill />
```

3. หากใช้รูปจากโดเมนภายนอก ให้เพิ่มโดเมนนั้นใน `images.remotePatterns` ของ `next.config.ts` ก่อน มิฉะนั้น `next/image` จะไม่ยอมแสดงรูป

ควรตั้ง `alt` ให้สื่อความหมายกับรูปทุกครั้ง เพื่อการเข้าถึงและ SEO

## 7. หน้าศูนย์บริการผู้ป่วย

โค้ดหน้าบริการผู้ป่วยอยู่ที่ `app/(pages)/patient-services/page-patient-services.tsx`

- `centersData` เป็นแหล่งข้อมูลหลักของแต่ละศูนย์: ชื่อ, คำอธิบาย, แบนเนอร์, รายการบริการ, เวลาเปิด, แพทย์ และสิ่งอำนวยความสะดวก
- URL สามารถระบุศูนย์ที่ต้องการได้ด้วย query string เช่น `/patient-services?dept=emergency`
- ค่า `id` ของข้อมูลใน `centersData` ต้องตรงกับค่า `dept` ที่ส่งมาจาก Navbar/Footer
- component ใช้ `motion/react` สำหรับ animation และมี modal การนัดหมาย

### สำคัญ: เปิดใช้งาน route นี้

Next.js จะสร้าง route จากไฟล์ที่ชื่อ `page.tsx` เท่านั้น ปัจจุบันไฟล์ชื่อ `page-patient-services.tsx` จึงไม่ถูกใช้เป็นหน้า `/patient-services` โดยอัตโนมัติ

ก่อนใช้งานลิงก์ `/patient-services` ให้เปลี่ยนชื่อไฟล์เป็น:

```text
app/(pages)/patient-services/page.tsx
```

หลังเปลี่ยนชื่อ ให้เปิด `/patient-services` และทดสอบ query เช่น `/patient-services?dept=internal`

## 8. รูปแบบการเขียนสไตล์

- ใช้ Tailwind utility classes ใน `className` เป็นหลัก เช่น `px-4`, `bg-white`, `md:grid-cols-2`
- `styles/globals.css` เก็บ Tailwind import, CSS variables และ typography กลาง
- ไฟล์ `navbar.module.css`, `footer.module.css`, `page.module.css` มีอยู่ในโปรเจกต์ แต่ยังไม่พบการ import ใช้งานใน component ปัจจุบัน ควรเลือกใช้แนวทางเดียวให้ชัดเจนก่อนเพิ่มสไตล์ใหม่
- breakpoints ที่ใช้บ่อย: `sm`, `md`, `lg`; ตรวจทั้งมือถือและเดสก์ท็อปหลังแก้ layout

## 9. ตรวจสอบก่อนส่งงาน

ทำตามลำดับนี้:

```bash
npm run lint
npm run build
```

จากนั้นทดสอบด้วยตนเอง:

- หน้าแรกและทุกลิงก์เมนู
- เมนูมือถือและ dropdown
- สไลด์แบนเนอร์, แท็บข่าว และ pagination
- ขนาดมือถือ/แท็บเล็ต/เดสก์ท็อป
- รูปภาพภายในและรูปจาก YouTube/Unsplash
- ลิงก์โทรศัพท์, แผนที่, YouTube และ social media

## 10. สถานะปัจจุบันและงานที่ควรทำต่อ

- เนื้อหาข่าว บริการ แพทย์ และประกาศส่วนใหญ่เป็นข้อมูล hard-coded ในไฟล์ component ยังไม่ได้เชื่อม API หรือฐานข้อมูล
- ลิงก์ภายนอกหลายตำแหน่งเป็นตัวอย่าง เช่น Facebook, LINE และ Instagram ควรเปลี่ยนเป็นบัญชีจริง
- `npm run lint` ปัจจุบันพบ error ในหน้าบริการผู้ป่วยจากการเรียก `setState` โดยตรงภายใน `useEffect` และพบ import ที่ไม่ได้ใช้ 2 รายการ ควรแก้ให้ lint ผ่านก่อน deploy
- เมื่อต้องการให้ทีมแก้เนื้อหาเองบ่อย ๆ แนะนำย้ายข้อมูลจาก arrays ใน component ไปยัง CMS หรือ API ในอนาคต
