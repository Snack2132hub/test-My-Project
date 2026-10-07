import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyCredentials, verifySessionToken } from "@/lib/adminAuth";
import type { RowDataPacket } from "mysql2";

export async function authenticateAdmin(username: string, password: string): Promise<boolean> {
  return verifyCredentials(username, password);
}

/** Return the database ID for the signed-in admin, when an admin account exists. */
export async function getCurrentAdminId(): Promise<number | null> {
  const store = await cookies();
  const session = await verifySessionToken(store.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) return null;

  try {
    const { default: getPool } = await import("@/lib/db");
    const pool = getPool();
    const [rows] = await pool.query<(RowDataPacket & { admin_id: number })[]>(
      "SELECT admin_id FROM admin_accounts WHERE username = ? LIMIT 1",
      [session.username]
    );
    return rows[0]?.admin_id ?? null;
  } catch {
    // Admin sessions can still work when the optional account table is not configured.
    return null;
  }
}
