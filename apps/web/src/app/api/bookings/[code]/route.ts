import { NextResponse } from "next/server";
import { getServerApiBaseUrl } from "@/lib/api-server";

type Props = {
  params: Promise<{ code: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { code } = await params;

  try {
    const response = await fetch(
      `${getServerApiBaseUrl()}/bookings/${encodeURIComponent(code)}`,
      { cache: "no-store" },
    );

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
