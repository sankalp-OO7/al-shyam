import { NextResponse } from "next/server";

// Simple geo endpoint using edge/hosting headers (e.g. x-vercel-ip-country)
export async function GET(request) {
  const countryHeader =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("x-country-code");

  const country = countryHeader || "IN"; // Default to IN if unknown

  return NextResponse.json({ country });
}



