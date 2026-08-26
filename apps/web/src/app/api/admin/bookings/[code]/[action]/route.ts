import { NextResponse } from "next/server";
import { getServerApiBaseUrl } from "@/lib/api-server";

type Props = {
  params: Promise<{ code: string; action: string }>;
};

export async function POST(_request: Request, { params }: Props) {
  const { code, action } = await params;
  const adminKey = process.env.ADMIN_API_KEY?.trim();

  if (!adminKey) {
    return NextResponse.json(
      { message: "Admin is not configured." },
      { status: 503 },
    );
  }

  if (action !== "approve" && action !== "deny") {
    return NextResponse.json({ message: "Unknown action." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${getServerApiBaseUrl()}/bookings/${encodeURIComponent(code)}/${action}`,
      {
        method: "POST",
        headers: { "x-admin-key": adminKey },
      },
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
