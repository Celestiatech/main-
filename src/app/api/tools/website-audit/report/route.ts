import { NextRequest, NextResponse } from "next/server";
import { buildAuditReportHtml, type AuditResult } from "@/lib/audit-report";

export const runtime = "nodejs";

/**
 * Turns an audit result into a printable report document.
 * The client opens the response in a new tab, where "Save as PDF" produces the file.
 */
export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const result = (payload as { result?: AuditResult } | null)?.result;

  if (!result || !Array.isArray(result.sections)) {
    return NextResponse.json({ success: false, error: "An audit result is required." }, { status: 400 });
  }

  return new NextResponse(buildAuditReportHtml(result), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
