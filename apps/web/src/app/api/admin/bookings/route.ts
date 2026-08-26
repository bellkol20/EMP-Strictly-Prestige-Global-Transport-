import { NextRequest, NextResponse } from "next/server";
import { getServerApiBaseUrl } from "@/lib/api-server";

export async function GET(request: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY?.trim();

  if (!adminKey) {
    return NextResponse.json(
      { message: "Admin is not configured." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${getServerApiBaseUrl()}/bookings/recent`, {
      headers: { "x-admin-key": adminKey },
      cache: "no-store",
    });

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to reach booking service." },
      { status: 502 },
    );
  }
}
