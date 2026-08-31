import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";

export async function GET() {
  const store = await cookies();
  const session = verifySessionToken(store.get(ADMIN_SESSION_COOKIE)?.value);

  return NextResponse.json({
    ok: true,
    authenticated: Boolean(session),
    username: session?.username ?? null,
  });
}
