export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "pnnh_default_admin_session_secret_2026";
}

async function hmacSign(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function hmacVerify(payload: string, signature: string): Promise<boolean> {
  try {
    const expected = await hmacSign(payload);
    if (expected.length !== signature.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
  return username === expectedUsername && password === expectedPassword;
}

export async function createSessionToken(username: string): Promise<string> {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${expiresAt}:${username}`;
  const encodedPayload = btoa(encodeURIComponent(payload));
  const signature = await hmacSign(payload);
  return `${encodedPayload}.${btoa(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<{ username: string } | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const encodedPayload = parts[0];
  const signature = atob(parts.slice(1).join("."));

  let payload: string;
  try {
    payload = decodeURIComponent(atob(encodedPayload));
  } catch {
    return null;
  }

  const valid = await hmacVerify(payload, signature);
  if (!valid) return null;

  const colonIdx = payload.indexOf(":");
  if (colonIdx === -1) return null;
  const expiresAt = Number(payload.slice(0, colonIdx));
  const username = payload.slice(colonIdx + 1);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt || !username) return null;

  return { username };
}
