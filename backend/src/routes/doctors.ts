import { Router, Request, Response } from "express";
import type { RowDataPacket } from "mysql2";
import { getPool } from "../db";

const router = Router();

type DoctorRow = RowDataPacket & {
  dr_id: number;
  dr_img: string | null;
};

router.get("/debug", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query<DoctorRow[]>(
      "SELECT dr_id, dr_img FROM doctor_detail ORDER BY dr_id ASC LIMIT 1"
    );

    res.json({
      ok: true,
      connected: true,
      table: "doctor_detail",
      data: rows[0]
        ? { dr_id: rows[0].dr_id, dr_img: rows[0].dr_img }
        : null,
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    res.status(500).json({ ok: false, message: "Cannot connect to database" });
  }
});

export default router;
