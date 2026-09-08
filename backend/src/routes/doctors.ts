import { Router, Request, Response } from "express";
import type { RowDataPacket, OkPacket } from "mysql2";
import { getPool } from "../db";

const router = Router();

// GET /api/doctors?page=1&limit=10&dept=xxx&search=xxx
router.get("/", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 10);
    const offset = (page - 1) * limit;
    const dept = req.query.dept as string | undefined;
    const search = req.query.search as string | undefined;
    const expertise = req.query.expertise as string | undefined;

    let where = "WHERE 1=1";
    const params: any[] = [];

    if (dept) { where += " AND dr_department = ?"; params.push(dept); }
    if (search) { where += " AND dr_name LIKE ?"; params.push(`%${search}%`); }
    if (expertise) { where += " AND (dr_record1 = ? OR position1 = ?)"; params.push(expertise, expertise); }

    const [countRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM doctor_detail ${where}`, params
    );
    const total = (countRows[0] as any).total;

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT dr_id, dr_name, dr_department, dr_record1, dr_record2, position1, dr_check1, dr_check2, dr_check3, dr_img
       FROM doctor_detail ${where} ORDER BY dr_id ASC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({ ok: true, total, page, limit, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// GET /api/doctors/debug
router.get("/debug", async (_req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT dr_id, dr_img FROM doctor_detail ORDER BY dr_id ASC LIMIT 1"
    );
    res.json({ ok: true, connected: true, table: "doctor_detail", data: rows[0] ?? null });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Cannot connect to database" });
  }
});

// GET /api/doctors/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM doctor_detail WHERE dr_id = ?", [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ ok: false, message: "ไม่พบแพทย์" });
    res.json({ ok: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// POST /api/doctors
router.post("/", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const b = req.body;
    if (!b.dr_name) return res.status(400).json({ ok: false, message: "กรุณาระบุชื่อแพทย์" });

    const v = (f: string) => b[f] ?? "";
    const [result] = await pool.query<OkPacket>(
      `INSERT INTO doctor_detail (
        dr_name, dr_department,
        dr_record1, dr_record2, dr_record3, dr_record4, dr_record5,
        dr_record6, dr_record7, dr_record8, dr_record9, dr_record10,
        educational_record1, educational_record2, educational_record3, educational_record4, educational_record5,
        educational_record6, educational_record7, educational_record8, educational_record9, educational_record10,
        position1, position2, position3, position4, position5,
        contribution1, contribution2, contribution3, contribution4, contribution5,
        contribution_link, contribution_file,
        dr_check1, dr_check2, dr_check3, dr_img, date_add, user_add
      ) VALUES (
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),'admin'
      )`,
      [
        b.dr_name, v("dr_department"),
        v("dr_record1"), v("dr_record2"), v("dr_record3"), v("dr_record4"), v("dr_record5"),
        v("dr_record6"), v("dr_record7"), v("dr_record8"), v("dr_record9"), v("dr_record10"),
        v("educational_record1"), v("educational_record2"), v("educational_record3"), v("educational_record4"), v("educational_record5"),
        v("educational_record6"), v("educational_record7"), v("educational_record8"), v("educational_record9"), v("educational_record10"),
        v("position1"), v("position2"), v("position3"), v("position4"), v("position5"),
        v("contribution1"), v("contribution2"), v("contribution3"), v("contribution4"), v("contribution5"),
        v("contribution_link"), v("contribution_file"),
        v("dr_check1"), v("dr_check2"), v("dr_check3"), v("dr_img"),
      ]
    );
    res.json({ ok: true, data: { dr_id: result.insertId, dr_name: b.dr_name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// PUT /api/doctors/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const b = req.body;
    const v = (f: string) => b[f] ?? "";

    await pool.query(
      `UPDATE doctor_detail SET
        dr_name=?, dr_department=?,
        dr_record1=?, dr_record2=?, dr_record3=?, dr_record4=?, dr_record5=?,
        dr_record6=?, dr_record7=?, dr_record8=?, dr_record9=?, dr_record10=?,
        educational_record1=?, educational_record2=?, educational_record3=?, educational_record4=?, educational_record5=?,
        educational_record6=?, educational_record7=?, educational_record8=?, educational_record9=?, educational_record10=?,
        position1=?, position2=?, position3=?, position4=?, position5=?,
        contribution1=?, contribution2=?, contribution3=?, contribution4=?, contribution5=?,
        contribution_link=?, contribution_file=?,
        dr_check1=?, dr_check2=?, dr_check3=?, dr_img=?, edit_date=NOW(), edit_user='admin'
       WHERE dr_id=?`,
      [
        v("dr_name"), v("dr_department"),
        v("dr_record1"), v("dr_record2"), v("dr_record3"), v("dr_record4"), v("dr_record5"),
        v("dr_record6"), v("dr_record7"), v("dr_record8"), v("dr_record9"), v("dr_record10"),
        v("educational_record1"), v("educational_record2"), v("educational_record3"), v("educational_record4"), v("educational_record5"),
        v("educational_record6"), v("educational_record7"), v("educational_record8"), v("educational_record9"), v("educational_record10"),
        v("position1"), v("position2"), v("position3"), v("position4"), v("position5"),
        v("contribution1"), v("contribution2"), v("contribution3"), v("contribution4"), v("contribution5"),
        v("contribution_link"), v("contribution_file"),
        v("dr_check1"), v("dr_check2"), v("dr_check3"), v("dr_img"),
        req.params.id,
      ]
    );
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

// DELETE /api/doctors/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    await pool.query("DELETE FROM doctor_detail WHERE dr_id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาด" });
  }
});

export default router;
