import { Router } from "express";
import { getPool } from "../db";

const router = Router();

// GET /api/clinic-schedule?month=8&year=2026
router.get("/", async (req, res) => {
  const now = new Date();
  const thisMonth = Number(req.query.month) || now.getMonth() + 1;
  const thisYear = Number(req.query.year) || now.getFullYear();

  const nextDate = new Date(thisYear, thisMonth, 1);
  const nextMonth = nextDate.getMonth() + 1;
  const nextYear = nextDate.getFullYear();

  try {
    const [rows] = await getPool().query(
      "SELECT month, year, image_url FROM clinic_schedule WHERE (month = ? AND year = ?) OR (month = ? AND year = ?)",
      [thisMonth, thisYear, nextMonth, nextYear]
    ) as [Array<{ month: number; year: number; image_url: string }>, unknown];

    const current = rows.find((r) => r.month === thisMonth && r.year === thisYear) || null;
    const next = rows.find((r) => r.month === nextMonth && r.year === nextYear) || null;

    res.json({ ok: true, current, next });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
