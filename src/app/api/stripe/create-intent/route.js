import Stripe from "stripe";
import { NextResponse } from "next/server";
import { appendPaymentRow } from "@/utils/googleSheets";

// Creates a Stripe Checkout Session (redirect flow) for 2000 AED.
export async function POST(request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe secret key not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    });

    const origin =
      request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;
    const { country } = await request.json().catch(() => ({ country: "US" }));

    // Fixed, trusted price server-side.
    const amount = 2000;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "AI Trading Subscription",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?status=cancelled`,
      metadata: {
        country: country || "UNKNOWN",
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe create-intent error", error);
    return NextResponse.json(
      { error: "Failed to create Stripe session" },
      { status: 500 }
    );
  }
}
