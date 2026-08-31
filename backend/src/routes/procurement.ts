import { Router } from "express";
import { getPool } from "../db";

const router = Router();

// GET /api/procurement?type=procurement&page=1&limit=8
router.get("/", async (req, res) => {
  const type = req.query.type as string | undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(20, Number(req.query.limit) || 8);
  const offset = (page - 1) * limit;

  if (type && !["procurement", "job"].includes(type)) {
    res.status(400).json({ ok: false, message: "type ไม่ถูกต้อง" });
    return;
  }

  try {
    const where = type ? "WHERE is_active = 1 AND type = ?" : "WHERE is_active = 1";
    const params = type ? [type, limit, offset] : [limit, offset];

    const [rows] = await getPool().query(
      `SELECT id, title, type, document_url, published_at, deadline_at FROM procurement ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
      params
    );
    const [countRows] = await getPool().query(
      `SELECT COUNT(*) as total FROM procurement ${where}`,
      type ? [type] : []
    ) as [Array<{ total: number }>, unknown];

    res.json({ ok: true, data: rows, total: countRows[0].total, page, limit });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// POST /api/procurement
router.post("/", async (req, res) => {
  const { title, type, document_url, deadline_at } = req.body;
  if (!title || !type) {
    res.status(400).json({ ok: false, message: "กรุณาระบุหัวข้อและประเภท" });
    return;
  }
  if (!["procurement", "job"].includes(type)) {
    res.status(400).json({ ok: false, message: "type ไม่ถูกต้อง" });
    return;
  }
  try {
    const [result]: any = await getPool().query(
      "INSERT INTO procurement (title, type, document_url, published_at, deadline_at, is_active) VALUES (?, ?, ?, NOW(), ?, 1)",
      [title, type, document_url || "", deadline_at || null]
    );
    res.json({ ok: true, id: result.insertId });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// PUT /api/procurement/:id
router.put("/:id", async (req, res) => {
  const { title, type, document_url, deadline_at, is_active } = req.body;
  const id = Number(req.params.id);
  if (!title || !type) {
    res.status(400).json({ ok: false, message: "กรุณาระบุหัวข้อและประเภท" });
    return;
  }
  try {
    await getPool().query(
      "UPDATE procurement SET title=?, type=?, document_url=?, deadline_at=?, is_active=? WHERE id=?",
      [title, type, document_url || "", deadline_at || null, is_active ?? 1, id]
    );
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// DELETE /api/procurement/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await getPool().query("DELETE FROM procurement WHERE id=?", [id]);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
