import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!password || !request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authorization = request.headers.get("authorization");
  const expected = `Basic ${Buffer.from(`admin:${password}`).toString("base64")}`;

  if (authorization === expected) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="EMP Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
