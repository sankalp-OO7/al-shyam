"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" },
  }),
};

async function loadRazorpayScript() {
  if (typeof window === "undefined") return false;
  if (document.getElementById("razorpay-checkout-js")) return true;

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const [country, setCountry] = useState(null);
  const [geoLoading, setGeoLoading] = useState(true);
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // "success" | "error"

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("/api/geo", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setCountry(data.country || "IN");
        } else {
          setCountry("IN");
        }
      } catch {
        setCountry("IN");
      } finally {
        setGeoLoading(false);
      }
    };

    detectCountry();
  }, []);

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

  const handleRazorpay = useCallback(async () => {
    try {
      setMessage(null);
      setMessageType(null);
      setRazorpayLoading(true);

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const { orderId, amount, currency, key } = await orderRes.json();

      const options = {
        key,
        amount,
        currency,
        name: "Shams Global Systems",
        description: "AI Trading Subscription (Annual)",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                country: country || "IN",
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Verification failed");
            }

            setMessage("Razorpay payment successful and verified.");
            setMessageType("success");
          } catch (err) {
            console.error(err);
            setMessage(
              "Payment succeeded but verification failed. Please contact support."
            );
            setMessageType("error");
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#06b6d4",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      setMessage("Unable to start Razorpay payment. Please try again.");
      setMessageType("error");
    } finally {
      setRazorpayLoading(false);
    }
  }, [country]);

  const handleStripe = useCallback(async () => {
    try {
      setMessage(null);
      setMessageType(null);
      setStripeLoading(true);

      const res = await fetch("/api/stripe/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: country || "US" }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Stripe session");
      }

      const { url } = await res.json();
      if (!url) {
        throw new Error("No redirect URL from Stripe");
      }

      window.location.href = url;
    } catch (error) {
      console.error(error);
      setMessage("Unable to start Stripe payment. Please try again.");
      setMessageType("error");
      setStripeLoading(false);
    }
  }, [country]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-4xl rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-950/90 shadow-2xl shadow-cyan-900/40 p-6 sm:p-10 space-y-6 sm:space-y-8"
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
              Choose your preferred payment gateway below. All transactions are
              encrypted and processed via PCI-DSS compliant providers.
            </p>
          </div>
          <Link
            href="/"
            className="self-start text-xs sm:text-sm text-cyan-300 hover:text-cyan-200 underline underline-offset-4 decoration-cyan-500/60"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {/* Razorpay Card */}
          <motion.div
            className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 via-slate-900/60 to-black/80 p-5 sm:p-6 space-y-4 overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-cyan-300">
                  Razorpay
                </h2>
                <p className="text-xs sm:text-sm text-gray-300/80">
                  Recommended for India-based INR payments via UPI, cards, and
                  net banking.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40">
                UPI / CARDS
              </span>
            </div>

            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-gray-300/90">
              <li>• Instant confirmation</li>
              <li>• Supports UPI, cards, and major Indian banks</li>
              <li>• Best for customers paying from India</li>
            </ul>

            <button
              type="button"
              className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2.5 sm:py-3 text-sm sm:text-base transition-colors shadow-lg shadow-cyan-900/40 ${
                geoLoading || country !== "IN" || razorpayLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={geoLoading || country !== "IN" || razorpayLoading}
              onClick={handleRazorpay}
            >
              {razorpayLoading ? "Processing..." : "Proceed with Razorpay"}
            </button>
          </motion.div>

          {/* Stripe Card */}
          <motion.div
            className="relative rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-slate-900/60 to-black/80 p-5 sm:p-6 space-y-4 overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-purple-300">
                  Stripe
                </h2>
                <p className="text-xs sm:text-sm text-gray-300/80">
                  Ideal for global payments in USD and multiple currencies via
                  cards and wallets.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-200 border border-purple-500/40">
                INTL CARDS
              </span>
            </div>

            <ul className="mt-2 space-y-1 text-xs sm:text-sm text-gray-300/90">
              <li>• Visa, Mastercard, Amex and more</li>
              <li>• Multi-currency support</li>
              <li>• Strong fraud prevention & 3D Secure</li>
            </ul>

            <button
              type="button"
              className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-purple-500 hover:bg-purple-400 text-black font-semibold py-2.5 sm:py-3 text-sm sm:text-base transition-colors shadow-lg shadow-purple-900/40 ${
                geoLoading || country === "IN" || stripeLoading
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={geoLoading || country === "IN" || stripeLoading}
              onClick={handleStripe}
            >
              {stripeLoading ? "Redirecting..." : "Proceed with Stripe"}
            </button>
          </motion.div>
        </div>

        <p className="pt-2 text-[11px] sm:text-xs text-gray-400/80">
          Note: Payments are processed securely via Razorpay (INR) and Stripe
          (USD). Your card details never touch our servers.
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


