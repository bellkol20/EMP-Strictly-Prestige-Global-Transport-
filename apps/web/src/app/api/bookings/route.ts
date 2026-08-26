import { NextRequest, NextResponse } from "next/server";
import { getServerApiBaseUrl } from "@/lib/api-server";

export async function POST(request: NextRequest) {
  const body = await request.text();

  try {
    const response = await fetch(`${getServerApiBaseUrl()}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
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
