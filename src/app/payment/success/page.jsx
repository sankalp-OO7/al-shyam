"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Clock, Mail } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * (i + 1), duration: 0.5, ease: "easeOut" },
  }),
};

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-2xl rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 via-slate-900/60 to-black/80 shadow-2xl shadow-emerald-900/40 p-6 sm:p-10 space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-center">
          <motion.div
            custom={-1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <CheckCircle className="w-20 h-20 text-emerald-400" />
          </motion.div>
        </div>

        <motion.div
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-300/80 text-base sm:text-lg max-w-xl mx-auto">
            Thank you for your purchase. Your AI Trading Subscription is being
            activated.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 sm:p-6 space-y-3"
        >
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-300 mb-1">
                Service Activation
              </h3>
              <p className="text-sm text-gray-300">
                Your license and access credentials will be delivered to your
                registered email within{" "}
                <span className="font-semibold">24 hours</span>.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 sm:p-6 space-y-3"
        >
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-300 mb-1">
                Check Your Email
              </h3>
              <p className="text-sm text-gray-300">
                Keep an eye on your inbox (including spam folder) for the
                activation email with your license key and setup instructions.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 text-sm text-gray-400 bg-gray-900/40 rounded-xl p-5 sm:p-6"
        >
          <h4 className="font-semibold text-white mb-3">Next Steps:</h4>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Wait for the activation email (within 24 hours)</li>
            <li>Download MetaTrader 5 if you haven't already</li>
            <li>Install the Expert Advisor with your license key</li>
            <li>Start automated trading on your account</li>
          </ol>
        </motion.div>

        <motion.div
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg text-center"
          >
            Back to Home
          </Link>
          <a
            href="mailto:support@shamsgs.com"
            className="px-6 py-3 bg-gray-700/70 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all text-center"
          >
            Contact Support
          </a>
        </motion.div>

        <p className="text-center text-xs text-gray-500 pt-4">
          Transaction ID will be sent to your email. Keep it for your records.
        </p>
      </motion.div>
    </main>
  );
}
