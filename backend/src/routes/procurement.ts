import { Router, Request, Response } from "express";
import type { RowDataPacket, OkPacket } from "mysql2";
import { getPool } from "../db";

const router = Router();

function parseDateNews(dateStr: string | null | undefined): string {
  if (!dateStr) return new Date().toISOString();
  const trimmed = dateStr.trim();
  if (!trimmed) return new Date().toISOString();

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

router.get("/", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 10);
    const offset = (page - 1) * limit;
    const type = req.query.type as string | undefined;

    // 1. ลองดึงจากตาราง purchase
    if (type !== "job") {
      try {
        const [purchaseCount] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as total FROM purchase");
        const total = (purchaseCount[0] as any)?.total ?? 0;
        if (total > 0) {
          const [purchaseRows] = await pool.query<RowDataPacket[]>(
            `SELECT purchase_id, news_h, news_detail, h_file1, file1, h_file2, file2, h_file3, file3, h_file4, file4, h_file5, file5, date_news
             FROM purchase
             ORDER BY purchase_id DESC
             LIMIT ? OFFSET ?`,
            [limit, offset]
          );

          const data = purchaseRows.map((r: any) => {
            const files: { label: string; url: string }[] = [];
            for (let i = 1; i <= 5; i++) {
              const f = r[`file${i}`];
              const h = r[`h_file${i}`];
              if (f && typeof f === "string" && f.trim()) {
                const cleanF = f.trim();
                files.push({
                  label: (h && typeof h === "string" && h.trim()) ? h.trim() : `เอกสารแนบ ${i}`,
                  url: cleanF.startsWith("http") || cleanF.startsWith("/") ? cleanF : `/docs/${cleanF}`,
                });
              }
            }
            return {
              id: r.purchase_id,
              title: r.news_h || "ประกาศจัดซื้อจัดจ้าง",
              detail: r.news_detail || "",
              type: "procurement",
              document_url: files[0]?.url || (r.file1 ? (r.file1.startsWith("/") || r.file1.startsWith("http") ? r.file1 : `/docs/${r.file1}`) : ""),
              files,
              published_at: parseDateNews(r.date_news),
              deadline_at: null,
            };
          });

          return res.json({ ok: true, total, page, limit, data, source: "db_purchase" });
        }
      } catch {}
    }

    // 2. ลองดึงตาราง procurement_items หรือ procurement
    let tableName = "procurement_items";
    try {
      await pool.query("SELECT 1 FROM procurement_items LIMIT 1");
    } catch {
      tableName = "procurement";
    }

    let where = "WHERE 1=1";
    const params: any[] = [];
    if (type) { where += " AND type = ?"; params.push(type); }

    const [countRows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) as total FROM ${tableName} ${where}`, params);
    const total = (countRows[0] as any)?.total ?? 0;

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, title, type, document_url, published_at, deadline_at FROM ${tableName} ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    res.json({ ok: true, total, page, limit, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const { title, detail = "", type = "procurement", document_url = "", deadline_at = null } = req.body;
    if (!title) return res.status(400).json({ ok: false, message: "กรุณาระบุหัวข้อ" });

    // ลองเพิ่มใน purchase
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const [pRes] = await pool.query<OkPacket>(
        "INSERT INTO purchase (news_h, news_detail, file1, date_news) VALUES (?, ?, ?, ?)",
        [title, detail, document_url, todayStr]
      );
      return res.json({ ok: true, data: { id: pRes.insertId, title } });
    } catch {}

    const [result] = await pool.query<OkPacket>(
      "INSERT INTO procurement (title, type, document_url, deadline_at) VALUES (?, ?, ?, ?)",
      [title, type, document_url, deadline_at || null]
    );
    res.json({ ok: true, data: { id: result.insertId, title } });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const { title, detail = "", type, document_url, deadline_at } = req.body;
    try {
      await pool.query(
        "UPDATE purchase SET news_h=?, news_detail=?, file1=? WHERE purchase_id=?",
        [title ?? "", detail ?? "", document_url ?? "", req.params.id]
      );
    } catch {}
    try {
      await pool.query(
        "UPDATE procurement SET title=?, type=?, document_url=?, deadline_at=? WHERE id=?",
        [title ?? "", type ?? "procurement", document_url ?? "", deadline_at || null, req.params.id]
      );
    } catch {}
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    try {
      await pool.query("DELETE FROM purchase WHERE purchase_id = ?", [req.params.id]);
    } catch {}
    try {
      await pool.query("DELETE FROM procurement WHERE id = ?", [req.params.id]);
    } catch {}
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
