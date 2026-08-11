import { Router } from "express";
import { getPool } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const [rows] = await getPool().query(
      "SELECT id, title, image_url, display_order FROM announcements WHERE is_active = 1 ORDER BY display_order ASC, id ASC"
    );
    res.json({ ok: true, data: rows });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
