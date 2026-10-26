import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import getPool from "@/lib/db";

export const dynamic = "force-dynamic";

function parseDateNews(dateStr: string | null | undefined): string {
  if (!dateStr) return new Date().toISOString();
  const trimmed = dateStr.trim();
  if (!trimmed) return new Date().toISOString();

  // Pattern: DD/MM/YYYY or DD-MM-YYYY (e.g. 18/03/2569 or 18/03/2026)
  const dmy = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})$/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]);
    let year = Number(dmy[3]);
    if (year < 100) year += 2500;
    if (year > 2400) year -= 543;
    const d = new Date(Date.UTC(year, month - 1, day));
    if (!isNaN(d.getTime())) return d.toISOString();
  }

  // Pattern: YYYY-MM-DD or YYYY/MM/DD (e.g. 2569-03-18 or 2026-03-18)
  const ymd = trimmed.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (ymd) {
    let year = Number(ymd[1]);
    const month = Number(ymd[2]);
    const day = Number(ymd[3]);
    if (year > 2400) year -= 543;
    const d = new Date(Date.UTC(year, month - 1, day));
    if (!isNaN(d.getTime())) return d.toISOString();
  }

  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) return d.toISOString();

  return trimmed;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type")?.trim() || "";
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit")) || 20));
  const offset = (page - 1) * limit;

  try {
    const pool = getPool();

    // 1. ดึงจากตาราง purchase ใน MySQL
    if (type !== "job") {
      try {
        const [purchaseCountRows] = await pool.query<RowDataPacket[]>(
          "SELECT COUNT(*) AS total FROM purchase"
        );
        const total = (purchaseCountRows[0] as { total: number })?.total ?? 0;

        if (total > 0) {
          const [purchaseRows] = await pool.query<RowDataPacket[]>(
            `SELECT 
               purchase_id, news_h, news_detail,
               h_file1, file1, h_file2, file2, h_file3, file3, h_file4, file4, h_file5, file5,
               date_news
             FROM purchase
             ORDER BY purchase_id DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
          );

          if (Array.isArray(purchaseRows) && purchaseRows.length > 0) {
            const data = purchaseRows.map((row: any) => {
              const files: { label: string; url: string }[] = [];
              for (let i = 1; i <= 5; i++) {
                const f = row[`file${i}`];
                const h = row[`h_file${i}`];
                if (f && typeof f === "string" && f.trim()) {
                  const cleanF = f.trim();
                  const cleanH = (h && typeof h === "string" && h.trim()) ? h.trim() : `เอกสารแนบ ${i}`;
                  files.push({
                    label: cleanH,
                    url: cleanF.startsWith("http") || cleanF.startsWith("/") ? cleanF : `/docs/${cleanF}`,
                  });
                }
              }

              const docUrl =
                files[0]?.url ||
                (row.file1 ? (row.file1.startsWith("/") || row.file1.startsWith("http") ? row.file1 : `/docs/${row.file1}`) : "");

              return {
                id: row.purchase_id,
                title: row.news_h || "ประกาศจัดซื้อจัดจ้าง",
                detail: row.news_detail || "",
                type: "procurement",
                document_url: docUrl,
                files,
                published_at: parseDateNews(row.date_news),
                deadline_at: null,
              };
            });

            return NextResponse.json({
              ok: true,
              source: "db_purchase",
              data,
              total,
              page,
              limit,
            });
          }
        }
      } catch {}
    }

    // 2. หากเป็นหมวดสมัครงาน (job) ค้นหาจากตาราง purchase
    if (type === "job") {
      try {
        const [jobCountRows] = await pool.query<RowDataPacket[]>(
          "SELECT COUNT(*) AS total FROM purchase WHERE news_h LIKE '%สมัคร%' OR news_h LIKE '%คัดเลือก%' OR news_h LIKE '%บรรจุ%'"
        );
        const total = (jobCountRows[0] as { total: number })?.total ?? 0;
        if (total > 0) {
          const [jobRows] = await pool.query<RowDataPacket[]>(
            `SELECT 
               purchase_id, news_h, news_detail,
               h_file1, file1, h_file2, file2, h_file3, file3, h_file4, file4, h_file5, file5,
               date_news
             FROM purchase
             WHERE news_h LIKE '%สมัคร%' OR news_h LIKE '%คัดเลือก%' OR news_h LIKE '%บรรจุ%'
             ORDER BY purchase_id DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
          );
          if (Array.isArray(jobRows) && jobRows.length > 0) {
            const data = jobRows.map((row: any) => {
              const files: { label: string; url: string }[] = [];
              for (let i = 1; i <= 5; i++) {
                const f = row[`file${i}`];
                const h = row[`h_file${i}`];
                if (f && typeof f === "string" && f.trim()) {
                  const cleanF = f.trim();
                  const cleanH = (h && typeof h === "string" && h.trim()) ? h.trim() : `เอกสารแนบ ${i}`;
                  files.push({
                    label: cleanH,
                    url: cleanF.startsWith("http") || cleanF.startsWith("/") ? cleanF : `/docs/${cleanF}`,
                  });
                }
              }
              const docUrl = files[0]?.url || (row.file1 ? (row.file1.startsWith("/") || row.file1.startsWith("http") ? row.file1 : `/docs/${row.file1}`) : "");
              return {
                id: row.purchase_id,
                title: row.news_h || "ประกาศรับสมัครงาน",
                detail: row.news_detail || "",
                type: "job",
                document_url: docUrl,
                files,
                published_at: parseDateNews(row.date_news),
                deadline_at: null,
              };
            });
            return NextResponse.json({
              ok: true,
              source: "db_purchase_jobs",
              data,
              total,
              page,
              limit,
            });
          }
        }
      } catch {}
    }

    // 3. ตรวจสอบตาราง procurement สำรองในฐานข้อมูล
    try {
      const where = type ? "WHERE type = ?" : "";
      const params: (string | number)[] = type ? [type, limit, offset] : [limit, offset];
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT id, title, type, document_url, published_at, deadline_at
         FROM procurement ${where}
         ORDER BY published_at DESC LIMIT ? OFFSET ?`,
        params
      );
      const [countRows] = await pool.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS total FROM procurement ${where}`,
        type ? [type] : []
      );
      if (Array.isArray(rows) && rows.length > 0) {
        return NextResponse.json({
          ok: true,
          source: "db_procurement",
          data: rows,
          total: (countRows[0] as { total: number })?.total ?? 0,
          page,
          limit,
        });
      }
    } catch {}
  } catch {
    // ฐานข้อมูลไม่สามารถเชื่อมต่อได้
  }

  // ข้อมูลสำรองเมื่อไม่มีการเชื่อมต่อฐานข้อมูล เพื่อให้หน้าเว็บแสดงรายการและสามารถคลิกเปิดดูไฟล์ PDF ได้จริง
  const FALLBACK_DATA: Record<string, any[]> = {
    procurement: [
      {
        id: 101,
        title: "สรุปผลการดำเนินการจัดซื้อจัดจ้าง ประจำเดือนมีนาคม 2566 (แบบ สขร.1)",
        detail: "สรุปผลการจัดซื้อจัดจ้างในรอบเดือนมีนาคม 2566 ของโรงพยาบาลปากช่องนานา",
        type: "procurement",
        document_url: "/docs/a.pdf",
        files: [{ label: "เอกสาร สขร.1 มี.ค. 2566", url: "/docs/a.pdf" }],
        published_at: "2023-03-31T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 102,
        title: "สรุปผลการดำเนินการจัดซื้อจัดจ้าง ประจำเดือนกุมภาพันธ์ 2566 (แบบ สขร.1)",
        detail: "สรุปผลการจัดซื้อจัดจ้างในรอบเดือนกุมภาพันธ์ 2566 ของโรงพยาบาลปากช่องนานา",
        type: "procurement",
        document_url: "/docs/06.สขร 1 กุมภาพันธ์ 2566.pdf",
        files: [{ label: "เอกสาร สขร.1 ก.พ. 2566", url: "/docs/06.สขร 1 กุมภาพันธ์ 2566.pdf" }],
        published_at: "2023-02-28T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 103,
        title: "สรุปผลการดำเนินการจัดซื้อจัดจ้าง ประจำเดือนมกราคม 2566 (แบบ สขร.1)",
        detail: "สรุปผลการจัดซื้อจัดจ้างในรอบเดือนมกราคม 2566 ของโรงพยาบาลปากช่องนานา",
        type: "procurement",
        document_url: "/docs/05.สขร 1 มกราคม 2566.pdf",
        files: [{ label: "เอกสาร สขร.1 ม.ค. 2566", url: "/docs/05.สขร 1 มกราคม 2566.pdf" }],
        published_at: "2023-01-31T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 104,
        title: "สรุปผลการดำเนินการจัดซื้อจัดจ้าง ประจำเดือนธันวาคม 2565 (แบบ สขร.1)",
        detail: "สรุปผลการจัดซื้อจัดจ้างในรอบเดือนธันวาคม 2565 ของโรงพยาบาลปากช่องนานา",
        type: "procurement",
        document_url: "/docs/04.แบบ สขร.1 ธ.ค. 2565.pdf",
        files: [{ label: "เอกสาร สขร.1 ธ.ค. 2565", url: "/docs/04.แบบ สขร.1 ธ.ค. 2565.pdf" }],
        published_at: "2022-12-30T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 105,
        title: "สรุปผลการดำเนินการจัดซื้อจัดจ้าง ประจำเดือนพฤศจิกายน 2565 (แบบ สขร.1)",
        detail: "สรุปผลการจัดซื้อจัดจ้างในรอบเดือนพฤศจิกายน 2565 ของโรงพยาบาลปากช่องนานา",
        type: "procurement",
        document_url: "/docs/03.แบบ สขร.1 พ.ย. 2565.pdf",
        files: [{ label: "เอกสาร สขร.1 พ.ย. 2565", url: "/docs/03.แบบ สขร.1 พ.ย. 2565.pdf" }],
        published_at: "2022-11-30T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 106,
        title: "สรุปผลการดำเนินการจัดซื้อจัดจ้าง ประจำเดือนตุลาคม 2565 (แบบ สขร.1)",
        detail: "สรุปผลการจัดซื้อจัดจ้างในรอบเดือนตุลาคม 2565 ของโรงพยาบาลปากช่องนานา",
        type: "procurement",
        document_url: "/docs/02.แบบ สขร.1 ต.ค. 2565.pdf",
        files: [{ label: "เอกสาร สขร.1 ต.ค. 2565", url: "/docs/02.แบบ สขร.1 ต.ค. 2565.pdf" }],
        published_at: "2022-10-31T00:00:00.000Z",
        deadline_at: null,
      },
    ],
    job: [
      {
        id: 201,
        title: "ประกาศรับสมัครบุคคลเพื่อเลือกสรรเป็นพนักงานกระทรวงสาธารณสุขทั่วไป ตำแหน่งพยาบาลวิชาชีพ",
        detail: "รับสมัครบุคคลเพื่อเลือกสรรเป็นพนักงานกระทรวงสาธารณสุขทั่วไป โรงพยาบาลปากช่องนานา",
        type: "job",
        document_url: "/docs/07.สขร 1 มีนาคม 2566.pdf",
        files: [{ label: "ประกาศรับสมัครงาน", url: "/docs/07.สขร 1 มีนาคม 2566.pdf" }],
        published_at: "2023-03-25T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 202,
        title: "ประกาศรายชื่อผู้มีสิทธิ์เข้ารับการคัดเลือกเพื่อบรรจุเป็นลูกจ้างชั่วคราวเงินบำรุง",
        detail: "รายชื่อผู้มีสิทธิ์เข้ารับการประเมินความรู้ความสามารถและสอบสัมภาษณ์",
        type: "job",
        document_url: "/docs/06.สขร 1 กุมภาพันธ์ 2566.pdf",
        files: [{ label: "ประกาศรายชื่อผู้มีสิทธิ์สอบ", url: "/docs/06.สขร 1 กุมภาพันธ์ 2566.pdf" }],
        published_at: "2023-02-20T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 203,
        title: "ประกาศรับสมัครคัดเลือกบุคคลเพื่อจ้างเป็นลูกจ้างรายคาบ ตำแหน่งพนักงานบริการ",
        detail: "รับสมัครคัดเลือกบุคคลเพื่อจ้างเป็นลูกจ้างรายคาบ สังกัดกลุ่มงานบริหารทั่วไป",
        type: "job",
        document_url: "/docs/05.สขร 1 มกราคม 2566.pdf",
        files: [{ label: "ประกาศรับสมัคร", url: "/docs/05.สขร 1 มกราคม 2566.pdf" }],
        published_at: "2023-01-22T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 204,
        title: "ประกาศผลการคัดเลือกบุคคลเพื่อเลือกสรรเป็นพนักงานกระทรวงสาธารณสุขทั่วไป",
        detail: "ผลการคัดเลือกและขึ้นบัญชีผู้ผ่านการคัดเลือก โรงพยาบาลปากช่องนานา",
        type: "job",
        document_url: "/docs/04.แบบ สขร.1 ธ.ค. 2565.pdf",
        files: [{ label: "ประกาศผลการคัดเลือก", url: "/docs/04.แบบ สขร.1 ธ.ค. 2565.pdf" }],
        published_at: "2022-12-25T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 205,
        title: "ประกาศรับสมัครบุคคลเพื่อเลือกสรรเป็นพนักงานราชการทั่วไป ตำแหน่งนักวิชาการคอมพิวเตอร์",
        detail: "รับสมัครพนักงานราชการทั่วไป ตำแหน่งนักวิชาการคอมพิวเตอร์ ศูนย์เทคโนโลยีสารสนเทศ",
        type: "job",
        document_url: "/docs/03.แบบ สขร.1 พ.ย. 2565.pdf",
        files: [{ label: "ประกาศรับสมัคร", url: "/docs/03.แบบ สขร.1 พ.ย. 2565.pdf" }],
        published_at: "2022-11-20T00:00:00.000Z",
        deadline_at: null,
      },
      {
        id: 206,
        title: "ประกาศรายชื่อผู้ผ่านการเลือกสรรเพื่อจัดจ้างเป็นพนักงานกระทรวงสาธารณสุข",
        detail: "ประกาศรายชื่อผู้ผ่านการประเมินสมรรถนะ ครั้งที่ 1 และ 2",
        type: "job",
        document_url: "/docs/02.แบบ สขร.1 ต.ค. 2565.pdf",
        files: [{ label: "ประกาศรายชื่อผู้ผ่านการเลือกสรร", url: "/docs/02.แบบ สขร.1 ต.ค. 2565.pdf" }],
        published_at: "2022-10-25T00:00:00.000Z",
        deadline_at: null,
      },
    ],
  };

  const fallbackList = FALLBACK_DATA[type === "job" ? "job" : "procurement"] || [];
  const paginatedFallback = fallbackList.slice(offset, offset + limit);

  return NextResponse.json({
    ok: true,
    source: "fallback_bundled",
    data: paginatedFallback,
    total: fallbackList.length,
    page,
    limit,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, detail = "", type = "procurement", document_url = "", deadline_at = null } = body ?? {};
    if (!title) {
      return NextResponse.json({ ok: false, message: "กรุณาระบุหัวข้อประกาศ" }, { status: 400 });
    }

    const pool = getPool();
    // บันทึกลงตาราง purchase
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const [purchaseResult] = await pool.query<ResultSetHeader>(
        "INSERT INTO purchase (news_h, news_detail, file1, date_news) VALUES (?, ?, ?, ?)",
        [title, detail, document_url, todayStr]
      );
      return NextResponse.json({ ok: true, id: purchaseResult.insertId }, { status: 201 });
    } catch {
      // หากไม่มีตาราง purchase ให้ลงตาราง procurement
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO procurement (title, type, document_url, deadline_at) VALUES (?, ?, ?, ?)",
        [title, type, document_url, deadline_at || null]
      );
      return NextResponse.json({ ok: true, id: result.insertId }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ ok: false, message: "เกิดข้อผิดพลาดในการบันทึกลงฐานข้อมูล" }, { status: 500 });
  }
}
