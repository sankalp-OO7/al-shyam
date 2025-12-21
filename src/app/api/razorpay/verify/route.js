import crypto from "crypto";
import { NextResponse } from "next/server";
import { appendPaymentRow } from "@/utils/googleSheets";

// Verifies Razorpay signature securely and logs to Google Sheets.
export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, country } =
      await request.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret not configured" },
        { status: 500 }
      );
    }

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { error: "Missing Razorpay parameters" },
        { status: 400 }
      );
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Compute HMAC on server only, never on client.
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Append to Google Sheets on successful verification.
    try {
      await appendPaymentRow({
        country: country || "IN",
        gateway: "Razorpay",
        amount: 600,
        currency: "INR",
        paymentId: razorpay_payment_id,
        status: "SUCCESS",
      });
    } catch (sheetErr) {
      console.error("Failed to append Razorpay row to Sheets", sheetErr);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Razorpay verify error", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}



