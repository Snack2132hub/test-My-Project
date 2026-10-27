# คู่มือส่งมอบโปรเจกต์สำหรับนักพัฒนา (Developer Handoff)

โปรเจกต์: เว็บไซต์โรงพยาบาลปากช่องนานา  
Repository: https://github.com/Snack2132hub/test-My-Project

## 1. ภาพรวมเทคโนโลยี

- Frontend: Next.js 16.2.7, React 19, TypeScript, Tailwind CSS 4
- Backend: Node.js, Express 4, TypeScript
- Database: MySQL 8.4 (ไดรเวอร์ mysql2)
- Icons/animation: lucide-react, motion
- การพัฒนา/ติดตั้ง: npm workspaces และ Docker Compose

โฟลเดอร์หลัก:
- `frontend/` — หน้าเว็บและโค้ด Next.js
- `frontend/app/` — routes/pages และ layouts ของ App Router
- `frontend/components/` — คอมโพเนนต์ UI (ถ้ามีในส่วนที่กำลังแก้)
- `frontend/lib/` — helper/library ฝั่งเว็บ เช่น `db.ts`
- `frontend/public/` — รูปภาพและไฟล์ static
- `frontend/styles/` — CSS หลัก
- `backend/src/index.ts` — จุดเริ่มต้น Express API
- `backend/src/routes/` — route handlers เช่น doctors และ news
- `docker-compose.yml` — services สำหรับพัฒนาใน Docker
- `docker-compose.prod.yml` — การตั้งค่า production
- `docker/mysql/init/` — ไฟล์เริ่มต้นฐานข้อมูลสำหรับ MySQL container (ถ้ามี)

> ตรวจสอบโครงสร้างจริงใน branch ที่กำลังทำงานก่อนแก้ไข เพราะชื่อ/ตำแหน่งไฟล์อาจเปลี่ยนได้

## 2. สิ่งที่ต้องติดตั้ง

1. Git
2. Node.js รุ่น LTS ที่เข้ากันได้กับ Next.js 16 และ npm
3. MySQL 8.x หากจะรันฐานข้อมูลบนเครื่องโดยตรง หรือ Docker Desktop หากจะใช้ Docker
4. VS Code หรือ editor ที่รองรับ TypeScript

## 3. ดึงโค้ดและติดตั้ง dependencies

แนะนำให้ติดตั้งจากโฟลเดอร์ราก repository เพราะโปรเจกต์ตั้งค่า npm workspaces ไว้แล้ว:

```bash
git clone https://github.com/Snack2132hub/test-My-Project.git
cd test-My-Project
npm install
```

สั่งรัน Frontend:

```bash
npm run dev
```

เปิดเว็บที่ http://localhost:3000

สั่งตรวจ build/lint:

```bash
npm run build
npm run lint
```

คำสั่ง root จะส่งต่อไปยัง workspace `frontend` ตาม `package.json` ปัจจุบัน

## 4. รัน Backend

เปิด terminal อีกหน้าต่างที่โฟลเดอร์ราก แล้วรัน:

```bash
npm run dev --workspace=backend
```

Backend ใช้พอร์ต 4000 โดยปริยาย:
- Health check: http://localhost:4000/health
- API prefix: `/api/doctors`
- API prefix: `/api/news`

ดูรายละเอียด endpoint, parameters และ response ที่แน่นอนจากไฟล์ใน `backend/src/routes/` ก่อนใช้งานหรือแก้ API

ตรวจ TypeScript build ของ Backend:

```bash
npm run build --workspace=backend
```

## 5. Environment variables และข้อมูลลับ

Frontend มีตัวอย่างที่ `frontend/.env.local.example` ให้คัดลอกเป็น `frontend/.env.local` แล้วกรอกค่าที่ถูกต้อง ตัวแปรที่พบในตัวอย่าง ได้แก่:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` — การเชื่อมต่อ MySQL
- `NEXT_PUBLIC_SHOW_DB_TEST` — เปิด/ปิดส่วนทดสอบฐานข้อมูลที่หน้าเว็บ
- `ENABLE_DB_DEBUG_ENDPOINT` — เปิด/ปิด debug endpoint
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` — ข้อมูลสำหรับระบบผู้ดูแลระบบ

ข้อควรปฏิบัติ:
- ห้าม commit ไฟล์ `.env.local`, `.env.docker`, `.env.production` หรือรหัสผ่าน/secret ลง Git
- ใช้ค่าตัวอย่างเป็นเพียงแนวทางเท่านั้น เปลี่ยนรหัสผ่านเริ่มต้นและ secret ก่อนใช้งานจริง
- ห้ามเปิด debug endpoint หรือ DB test ใน production โดยไม่จำเป็น
- อย่าใส่ secret ในตัวแปรที่ขึ้นต้นด้วย `NEXT_PUBLIC_` เพราะค่าจะถูกเปิดเผยใน browser
- Backend โหลด environment ผ่าน `dotenv/config`; ตรวจ route และไฟล์ config เพื่อดูตัวแปรที่ต้องใช้จริง
- ถ้าใช้ Docker ให้สร้างไฟล์ environment ตามที่ compose อ้างถึง (เช่น `.env.docker`) จากค่าที่ผู้ดูแลระบบจัดเตรียมให้ ห้ามนำ secret จริงไปใส่ในเอกสาร

## 6. ใช้ Docker (ทางเลือก)

ไฟล์ `docker-compose.yml` กำหนด services สำหรับ web, backend, MySQL และ phpMyAdmin โดย mapping port ที่พบ:
- Web: http://localhost:3000
- Backend: http://localhost:4000
- MySQL host port: 3307 (ใน container ใช้ 3306)
- phpMyAdmin: http://localhost:8081 (เมื่อเปิด profile tools)

หลังสร้างและกรอกไฟล์ `.env.docker` ตามค่าที่ทีมดูแลให้แล้ว:

```bash
npm run docker:up
npm run docker:logs
npm run docker:down
```

เปิด phpMyAdmin:

```bash
npm run docker:tools:up
```

**ระวัง:** `npm run docker:reset-db` ใช้ `docker compose down -v` ซึ่งลบ volume ฐานข้อมูลของ Docker ได้ อย่าใช้กับข้อมูลจริงหรือข้อมูลที่ยังไม่ได้สำรอง

Production compose ใช้ `.env.production`:

```bash
npm run docker:prod:up
npm run docker:prod:logs
npm run docker:prod:down
```

ตรวจสอบไฟล์ compose และ environment ของ deployment ก่อนรันคำสั่งใด ๆ ใน server จริง

## 7. แนวทางแก้ไขโค้ด

- แก้หน้า/เส้นทางเว็บ: เริ่มตรวจที่ `frontend/app/`
- แก้ layout หรือ metadata เว็บไซต์: ตรวจ `frontend/app/layout.tsx`
- แก้ CSS: ตรวจ `frontend/styles/` และ class ของ component ที่เกี่ยวข้อง
- แก้การเชื่อมต่อฐานข้อมูลฝั่งเว็บ: ตรวจ `frontend/lib/db.ts` และจุดเรียกใช้
- แก้ API/ข้อมูลแพทย์/ข่าว: ตรวจ `backend/src/routes/` และ `backend/src/index.ts`
- แก้ schema หรือข้อมูลเริ่มต้น MySQL: ตรวจ migration/SQL ที่มีอยู่จริงใน repository และปรึกษาผู้ดูแลฐานข้อมูลก่อนเปลี่ยน schema

ก่อนแก้ ให้ค้นหาจุดเรียกใช้งานทั้งหมดและดูรูปแบบข้อมูลที่หน้าเว็บคาดหวัง อย่าเปลี่ยนชื่อ field หรือ API response โดยไม่แก้ผู้เรียกใช้ที่เกี่ยวข้อง

## 8. Workflow สำหรับทำงานร่วมกันด้วย Git

สร้าง branch สำหรับงานแต่ละเรื่อง:

```bash
git checkout main
git pull origin main
git checkout -b feat/ชื่อฟีเจอร์
```

หลังแก้ไข:

```bash
git status
git diff
npm run build
npm run lint
git add .
git commit -m "feat: อธิบายสิ่งที่เปลี่ยน"
git push -u origin feat/ชื่อฟีเจอร์
```

จากนั้นเปิด Pull Request เพื่อให้คนอื่นตรวจสอบก่อน merge หลีกเลี่ยงการแก้ไขบน `main` โดยตรง และอย่าใช้ `git push --force` กับ branch ที่ทำงานร่วมกันโดยไม่ตกลงกับทีม

## 9. แก้ปัญหาที่พบบ่อย

- **ไม่พบ package/module:** รัน `npm install` ที่โฟลเดอร์ราก แล้วตรวจว่าเปิด terminal อยู่ใน repository ที่ถูกต้อง
- **พอร์ต 3000/4000 ถูกใช้งาน:** ปิด process เดิมหรือปรับพอร์ตให้สอดคล้องกันทั้ง config และ API URL
- **เชื่อม MySQL ไม่ได้:** ตรวจว่า MySQL ทำงานอยู่, host/port ถูกต้อง, database และ user มีสิทธิ์ และ environment โหลดถูกไฟล์
- **Frontend แสดงข้อมูล fallback/ข้อมูลไม่อัปเดต:** ตรวจ log และ `frontend/lib/db.ts` รวมถึง API/route ที่หน้าเว็บเรียก
- **Next.js แจ้ง workspace root หรือพบ lockfile หลายไฟล์:** ติดตั้ง dependencies จาก root workspace เป็นหลัก อย่าลบ lockfile โดยไม่ตรวจ workflow ของทีม
- **Docker มี Watchpack/ENOMEM หรือ file watcher ช้า:** ตรวจ RAM ที่จัดสรรให้ Docker, จำนวนไฟล์ที่ mount และ process dev server ที่ค้างอยู่ก่อนล้าง cache

อย่าแก้ปัญหาด้วยการลบฐานข้อมูล, volume หรือ lockfile ทันที หากยังไม่เข้าใจผลกระทบ

## 10. Checklist ก่อนส่งงาน

- [ ] ทดสอบหน้าหรือ endpoint ที่เปลี่ยน
- [ ] `npm run build` ผ่าน
- [ ] `npm run lint` ผ่าน (หรืออธิบาย error ที่มีอยู่ก่อน)
- [ ] ไม่มีรหัสผ่าน, token หรือไฟล์ environment ใน commit
- [ ] ตรวจ `git diff` ว่าไม่มีการเปลี่ยนแปลงที่ไม่เกี่ยวข้อง
- [ ] อัปเดตเอกสารเมื่อเพิ่ม environment variable, API หรือขั้นตอนติดตั้ง
- [ ] เปิด Pull Request พร้อมอธิบายสิ่งที่เปลี่ยน วิธีทดสอบ และข้อควรระวัง

## 11. ข้อมูลที่ผู้ดูแลเดิมควรส่งมอบแยกจาก repository

- ไฟล์ environment ที่กรอกค่าจริง ส่งผ่านช่องทางที่ปลอดภัย
- วิธีเข้าถึงฐานข้อมูลและขั้นตอนสำรอง/กู้คืน
- บัญชี/สิทธิ์ที่จำเป็น เช่น GitHub และระบบ deploy
- URL ของระบบทดสอบ/production และขั้นตอน deploy/rollback
- งานค้าง ปัญหาที่ทราบ และรายการที่ยังไม่ได้ทดสอบ

คู่มือนี้อ้างอิงโครงสร้างและไฟล์ config ที่ตรวจพบใน repository ณ เวลาจัดทำ ควรทบทวนหลังมีการเปลี่ยน architecture หรือ deployment
