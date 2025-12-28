"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // "success" | "error"

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      setMessage("Payment completed successfully.");
      setMessageType("success");
    } else if (status === "cancelled") {
      setMessage("Payment was cancelled. You can try again.");
      setMessageType("error");
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-2xl rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-950/90 shadow-2xl shadow-cyan-900/40 p-6 sm:p-10 space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {message && (
          <div
            className={`mb-4 text-xs sm:text-sm px-4 py-2 rounded-full border ${
              messageType === "success"
                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                : "border-red-500/60 bg-red-500/10 text-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70 mb-1">
              SECURE PAYMENT PORTAL
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Complete your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-300 bg-clip-text text-transparent">
                AI Trading Subscription
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-300/80 max-w-xl">
              Choose your AI mode and complete the secure payment. All
              transactions are encrypted and processed via Stripe.
            </p>
          </div>
          <Link
            href="/"
            className="self-start text-xs sm:text-sm text-cyan-300 hover:text-cyan-200 underline underline-offset-4 decoration-cyan-500/60"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="flex justify-center items-center w-full">
          <stripe-buy-button
            buy-button-id="buy_btn_1SjKLI0SWFjKFrvtf8Hr8lP3"
            publishable-key="pk_test_51Sh0DO0SWFjKFrvtT9ec12v3uqsMzxM2cnKbaat4T9NShnMbLS76rmp8F0dVpgcqgoW1HbgMYzbsJouPPQVQfyd200u3KNtCDy"
          ></stripe-buy-button>
        </div>

        <div className="flex gap-4 justify-center items-center w-full">
          <a
            href="https://buy.stripe.com/test_7sY00bcAuclWeRu0rg8IU00?return_url=https://shamsgs.com/payment/success"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all shadow-lg"
          >
            Proceed to Stripe Checkout
          </a>
        </div>

        <p className="pt-2 text-[11px] sm:text-xs text-gray-400/80">
          Note: Payments are processed securely via Stripe. Your card details
          never touch our servers.
        </p>
      </motion.div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
          <div className="text-cyan-400">Loading payment portal...</div>
        </main>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
