import { Router } from "express";
import { getPool } from "../db";

const router = Router();

// GET /api/news?category=after_hours&page=1&limit=6
router.get("/", async (req, res) => {
  const category = req.query.category as string | undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(20, Number(req.query.limit) || 6);
  const offset = (page - 1) * limit;

  const validCategories = ["after_hours", "pr_news", "activity"];
  if (category && !validCategories.includes(category)) {
    res.status(400).json({ ok: false, message: "category ไม่ถูกต้อง" });
    return;
  }

  try {
    const where = category ? "WHERE is_active = 1 AND category = ?" : "WHERE is_active = 1";
    const params = category ? [category, limit, offset] : [limit, offset];

    const [rows] = await getPool().query(
      `SELECT id, title, category, image_url, published_at FROM news ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
      params
    );
    const [countRows] = await getPool().query(
      `SELECT COUNT(*) as total FROM news ${where}`,
      category ? [category] : []
    ) as [Array<{ total: number }>, unknown];

    res.json({ ok: true, data: rows, total: countRows[0].total, page, limit });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
