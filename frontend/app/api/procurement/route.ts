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

  // ส่งค่าว่างเมื่อไม่มีข้อมูลในฐานข้อมูล
  return NextResponse.json({
    ok: true,
    source: "db_empty",
    data: [],
    total: 0,
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
