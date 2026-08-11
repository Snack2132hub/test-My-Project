import { Router } from "express";
import bcrypt from "bcryptjs";
import { getPool } from "../db";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body as { username: string; password: string };

  if (!username || !password) {
    res.status(400).json({ ok: false, message: "กรุณาใส่ username และ password" });
    return;
  }

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT id, username, password, role, full_name FROM users WHERE username = ? LIMIT 1",
      [username]
    ) as [Array<{ id: number; username: string; password: string; role: string; full_name: string }>, unknown];

    if (rows.length === 0) {
      res.status(401).json({ ok: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      return;
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ ok: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      return;
    }

    res.json({ ok: true, username: user.username, role: user.role, full_name: user.full_name });
  } catch (err) {
    res.status(500).json({ ok: false, message: "เกิดข้อผิดพลาดในระบบ" });
  }
});

export default router;
