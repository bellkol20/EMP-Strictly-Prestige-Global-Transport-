export const ADMIN_COOKIE = "espgt_admin_session";

export async function createAdminSessionToken(
  password: string,
  adminKey: string,
): Promise<string> {
  const data = new TextEncoder().encode(`${password}:${adminKey}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getExpectedAdminSessionToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD?.trim();
  const adminKey = process.env.ADMIN_API_KEY?.trim();
  if (!password || !adminKey) {
    return null;
  }
  return createAdminSessionToken(password, adminKey);
}
