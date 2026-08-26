import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  getExpectedAdminSessionToken,
} from "@/lib/admin-session";

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const expected = await getExpectedAdminSessionToken();
  if (!expected) {
    return false;
  }

  const session = request.cookies.get(ADMIN_COOKIE)?.value;
  return session === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    if (await hasValidSession(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!process.env.ADMIN_PASSWORD?.trim()) {
    return NextResponse.next();
  }

  if (await hasValidSession(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
