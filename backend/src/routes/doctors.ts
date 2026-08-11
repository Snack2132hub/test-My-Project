import { Router, Request, Response } from "express";
import type { RowDataPacket } from "mysql2";
import { getPool } from "../db";

const router = Router();

type DoctorRow = RowDataPacket & {
  dr_id: number;
  dr_img: string | null;
};

// GET /api/doctors?page=1&limit=8&department=xxx
router.get("/", async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 8);
  const offset = (page - 1) * limit;
  const department = req.query.department as string | undefined;

  try {
    const where = department ? "WHERE dr_department = ?" : "";
    const params = department ? [department, limit, offset] : [limit, offset];

    const [rows] = await getPool().query(
      `SELECT dr_id, dr_name, dr_department, dr_record1, position1, dr_img FROM doctor_detail ${where} ORDER BY dr_id ASC LIMIT ? OFFSET ?`,
      params
    );
    const [countRows] = await getPool().query(
      `SELECT COUNT(*) as total FROM doctor_detail ${where}`,
      department ? [department] : []
    ) as [Array<RowDataPacket & { total: number }>, unknown];

    res.json({ ok: true, data: rows, total: countRows[0].total, page, limit });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// GET /api/doctors/debug
router.get("/debug", async (_req: Request, res: Response) => {
  try {
    const [rows] = await getPool().query<DoctorRow[]>(
      "SELECT dr_id, dr_img FROM doctor_detail ORDER BY dr_id ASC LIMIT 1"
    );
    res.json({ ok: true, connected: true, table: "doctor_detail", data: rows[0] ?? null });
  } catch (error) {
    console.error("DB connection failed:", error);
    res.status(500).json({ ok: false, message: "Cannot connect to database" });
  }
});

export default router;
