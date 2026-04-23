import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is missing from environment variables.");
}

const resend = new Resend(resendApiKey);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = String(body.fullName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const vin = String(body.vin ?? "")
      .trim()
      .toUpperCase();
    const preferredDate = String(body.preferredDate ?? "").trim();
    const preferredTime = String(body.preferredTime ?? "").trim();

    if (
      !fullName ||
      !phone ||
      !email ||
      !vin ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const safeFullName = escapeHtml(fullName);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeVin = escapeHtml(vin);
    const safePreferredDate = escapeHtml(preferredDate);
    const safePreferredTime = escapeHtml(preferredTime);

    const result = await resend.emails.send({
      from: "Elite Rebuilt Inspections <onboarding@resend.dev>",
      to: ["info@eliterebuilt.com"],
      subject: `New Inspection Request — ${fullName}`,
      replyTo: email,
      html: `
        <div style="margin:0;padding:24px;background:#f6f6f2;font-family:Arial,sans-serif;color:#0f172a;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
            <div style="background:#0f172a;padding:24px 28px;">
              <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a3e635;font-weight:700;">
                New Inspection Request
              </p>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;color:#ffffff;">
                Elite Rebuilt Inspections
              </h1>
            </div>

            <div style="padding:28px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#475569;">
                A new inspection request was submitted through the website.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:14px 0;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;">Full Name</p>
                    <p style="margin:6px 0 0;font-size:16px;color:#0f172a;font-weight:600;">${safeFullName}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 0;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;">Phone Number</p>
                    <p style="margin:6px 0 0;font-size:16px;color:#0f172a;font-weight:600;">${safePhone}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 0;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;">Email</p>
                    <p style="margin:6px 0 0;font-size:16px;color:#0f172a;font-weight:600;">${safeEmail}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 0;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;">VIN Number</p>
                    <p style="margin:6px 0 0;font-size:16px;color:#0f172a;font-weight:600;">${safeVin}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 0;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;">Preferred Date</p>
                    <p style="margin:6px 0 0;font-size:16px;color:#0f172a;font-weight:600;">${safePreferredDate}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 0;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;">Preferred Time</p>
                    <p style="margin:6px 0 0;font-size:16px;color:#0f172a;font-weight:600;">${safePreferredTime}</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top:24px;padding:18px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;">
                <p style="margin:0;font-size:13px;line-height:1.7;color:#475569;">
                  Reply directly to this email to contact the customer, or call them at
                  <strong style="color:#0f172a;"> ${safePhone}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Resend result:", result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Inspection request email error:", error);

    return NextResponse.json(
      { error: "Failed to send inspection request." },
      { status: 500 },
    );
  }
}
