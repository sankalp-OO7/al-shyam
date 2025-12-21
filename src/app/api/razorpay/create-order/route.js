import Razorpay from "razorpay";
import { NextResponse } from "next/server";

// Creates a Razorpay order on the server using secret key.
export async function POST(request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys not configured" },
        { status: 500 }
      );
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Amount is fixed server-side for security (₹600 * 100 = 60000 paise)
    const amount = 60000;
    const currency = "INR";

    const order = await instance.orders.create({
      amount,
      currency,
      payment_capture: 1,
    });

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency,
      key: keyId, // Public key exposed safely to client
    });
  } catch (error) {
    console.error("Razorpay create-order error", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}



