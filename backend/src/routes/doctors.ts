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

// POST /api/doctors
router.post("/", async (req: Request, res: Response) => {
  const { dr_name, dr_department, dr_record1, position1, dr_img, dr_check1, dr_check2 } = req.body;
  if (!dr_name || !dr_department) {
    res.status(400).json({ ok: false, message: "กรุณาระบุชื่อแพทย์และแผนก" });
    return;
  }
  try {
    const [maxRows] = await getPool().query("SELECT MAX(dr_id) as maxId FROM doctor_detail") as [Array<RowDataPacket & { maxId: number }>, unknown];
    const newId = (maxRows[0].maxId || 0) + 1;
    await getPool().query(
      "INSERT INTO doctor_detail (dr_id, dr_name, dr_department, dr_record1, position1, dr_img, dr_check1, dr_check2, date_add, user_add) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'admin')",
      [newId, dr_name, dr_department, dr_record1 || "", position1 || "", dr_img || "", dr_check1 || "", dr_check2 || ""]
    );
    res.json({ ok: true, dr_id: newId });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// PUT /api/doctors/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { dr_name, dr_department, dr_record1, position1, dr_img, dr_check1, dr_check2 } = req.body;
  const id = Number(req.params.id);
  if (!dr_name || !dr_department) {
    res.status(400).json({ ok: false, message: "กรุณาระบุชื่อแพทย์และแผนก" });
    return;
  }
  try {
    await getPool().query(
      "UPDATE doctor_detail SET dr_name=?, dr_department=?, dr_record1=?, position1=?, dr_img=?, dr_check1=?, dr_check2=?, edit_date=NOW(), edit_user='admin' WHERE dr_id=?",
      [dr_name, dr_department, dr_record1 || "", position1 || "", dr_img || "", dr_check1 || "", dr_check2 || "", id]
    );
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// DELETE /api/doctors/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await getPool().query("DELETE FROM doctor_detail WHERE dr_id=?", [id]);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
