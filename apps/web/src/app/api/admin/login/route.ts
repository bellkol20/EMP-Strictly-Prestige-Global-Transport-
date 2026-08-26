import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getExpectedAdminSessionToken,
} from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD?.trim();
  const expectedToken = await getExpectedAdminSessionToken();

  if (!password || !expectedToken) {
    return NextResponse.json(
      { message: "Admin login is not configured." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const submitted = body.password ?? "";
  const expectedPassword = Buffer.from(password);
  const receivedPassword = Buffer.from(submitted);

  const passwordMatches =
    expectedPassword.length === receivedPassword.length &&
    timingSafeEqual(expectedPassword, receivedPassword);

  if (!passwordMatches) {
    return NextResponse.json({ message: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, expectedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
