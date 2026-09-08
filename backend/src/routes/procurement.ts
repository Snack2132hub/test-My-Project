import { Router, Request, Response } from "express";
import type { RowDataPacket, OkPacket } from "mysql2";
import { getPool } from "../db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 10);
    const offset = (page - 1) * limit;
    const type = req.query.type as string | undefined;

    let where = "WHERE 1=1";
    const params: any[] = [];
    if (type) { where += " AND type = ?"; params.push(type); }

    const [countRows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) as total FROM procurement_items ${where}`, params);
    const total = (countRows[0] as any).total;

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, title, type, document_url, published_at, deadline_at FROM procurement_items ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
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
    const { title, type = "procurement", document_url = "", deadline_at = null } = req.body;
    if (!title) return res.status(400).json({ ok: false, message: "กรุณาระบุหัวข้อ" });
    const [result] = await pool.query<OkPacket>(
      "INSERT INTO procurement_items (title, type, document_url, deadline_at) VALUES (?, ?, ?, ?)",
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
    const { title, type, document_url, deadline_at } = req.body;
    await pool.query(
      "UPDATE procurement_items SET title=?, type=?, document_url=?, deadline_at=? WHERE id=?",
      [title ?? "", type ?? "procurement", document_url ?? "", deadline_at || null, req.params.id]
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    await pool.query("DELETE FROM procurement_items WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
