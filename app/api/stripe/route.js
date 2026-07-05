import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json(
        { success: false, message: "Missing session_id" },
        { status: 400 }
      );
    }

    // ✅ Fetch checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // ✅ Update DB record
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: session.id },
        { done: true },
        { new: true }
      );

      return NextResponse.json({
        success: true,
        username: updatedPayment?.to_user || "Guest",
        amount: session.amount_total / 100, // Convert from paisa/cents to rupees
      });
    }

    return NextResponse.json({
      success: false,
      message: "Payment not completed",
    });
  } catch (err) {
    console.error("Stripe Verify Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
