import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifyCredentials,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!verifyCredentials(username, password)) {
    return NextResponse.json(
      { ok: false, message: "Username หรือ Password ไม่ถูกต้อง" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true, username });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
