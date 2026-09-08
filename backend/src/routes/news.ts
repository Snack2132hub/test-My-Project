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
    const category = req.query.category as string | undefined;

    let where = "WHERE is_active = 1";
    const params: any[] = [];
    if (category) { where += " AND category = ?"; params.push(category); }

    const [countRows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) as total FROM news ${where}`, params);
    const total = (countRows[0] as any).total;

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, title, category, image_url, content, published_at FROM news ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
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
    const { title, category = "pr_news", image_url = "", content = "" } = req.body;
    if (!title) return res.status(400).json({ ok: false, message: "กรุณาระบุหัวข้อข่าว" });
    const [result] = await pool.query<OkPacket>(
      "INSERT INTO news (title, category, image_url, content) VALUES (?, ?, ?, ?)",
      [title, category, image_url, content]
    );
    res.json({ ok: true, data: { id: result.insertId, title } });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const { title, category, image_url, content } = req.body;
    await pool.query(
      "UPDATE news SET title=?, category=?, image_url=?, content=? WHERE id=?",
      [title ?? "", category ?? "pr_news", image_url ?? "", content ?? "", req.params.id]
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    await pool.query("DELETE FROM news WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
