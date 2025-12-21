"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowLeft, Shield, DollarSign } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6 },
  }),
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        className="relative border-b border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-black/90 to-slate-950/90"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Last Updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="space-y-8 sm:space-y-12"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              1. Introduction
            </h2>
            <div className="prose prose-invert max-w-none space-y-4 text-gray-300 leading-relaxed">
              <p>
                Welcome to <strong className="text-white">Shams Global Systems</strong> ("Company", "we", "us", or "our"). 
                These Terms and Conditions ("Terms") govern your access to and use of our AI-powered trading solutions, 
                Expert Advisors, and related services provided through our platform.
              </p>
              <p>
                By accessing our services, purchasing our products, or using our trading automation tools, you agree to 
                be bound by these Terms. If you disagree with any part of these Terms, you may not access or use our services.
              </p>
              <p className="text-yellow-200 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <strong>Our Location:</strong> Dubai, United Arab Emirates (UAE)
              </p>
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              2. Services Offered
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Shams Global Systems provides the following services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI-powered Forex trading Expert Advisors (EAs) for MetaTrader 4 and MetaTrader 5 platforms</li>
                <li>Automated trading algorithms and strategies</li>
                <li>Trading license subscriptions and access keys</li>
                <li>Technical support and consultation services</li>
                <li>Educational resources and trading guidance</li>
              </ul>
            </div>
          </section>

          {/* Pricing & Payment */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              3. Pricing & Payment Terms
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Subscription Fees:</strong> Our AI Trading Subscription is priced at 
                <span className="text-cyan-400 font-bold"> $600 USD per year</span> (or equivalent in INR via Razorpay). 
                This is an annual subscription fee that grants you access to our licensed trading solutions.
              </p>
              
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-5 space-y-3">
                <h3 className="text-lg font-semibold text-cyan-300">Consultation Charges</h3>
                <p>
                  In addition to subscription fees, we offer consultation services at a rate of{" "}
                  <span className="text-cyan-400 font-bold">$600 USD</span> per consultation session. 
                  Consultation services include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Personalized trading strategy optimization</li>
                  <li>Account setup and configuration guidance</li>
                  <li>Risk management consultation</li>
                  <li>Technical support for advanced customization</li>
                </ul>
              </div>

              <p>
                <strong className="text-white">Payment Methods:</strong> We accept payments via Razorpay (for INR 
                transactions) and Stripe (for USD and international payments). All payments are processed securely, 
                and your card details are never stored on our servers.
              </p>

              <p>
                <strong className="text-white">Refund Policy:</strong> All subscriptions and consultation fees are 
                non-refundable once payment is processed. We recommend reviewing our service details carefully before 
                making a purchase.
              </p>
            </div>
          </section>

          {/* Account Requirements */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              4. Account Requirements
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
                <p className="font-semibold text-yellow-200 mb-2">Minimum Deposit Requirements:</p>
                <ul className="space-y-2">
                  <li>
                    <strong className="text-white">Minimum:</strong> A deposit of at least{" "}
                    <span className="font-bold text-yellow-200">$10,000 USD</span> is required to safely operate 
                    our AI trading systems.
                  </li>
                  <li>
                    <strong className="text-white">Recommended:</strong> For optimal performance, we recommend an 
                    account size of <span className="font-bold text-yellow-200">$100,000 USD</span> or higher.
                  </li>
                </ul>
              </div>
              <p>
                These requirements ensure adequate capital for risk management and allow the trading algorithms to 
                function as designed.
              </p>
            </div>
          </section>

          {/* User Obligations */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              5. User Obligations
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>By using our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our trading tools in compliance with applicable laws and regulations</li>
                <li>Maintain the confidentiality of your license keys and account credentials</li>
                <li>Not share, resell, or redistribute our Expert Advisors or license keys</li>
                <li>Use only licensed copies of MetaTrader 4 or MetaTrader 5 platforms</li>
                <li>Report any technical issues or security concerns promptly</li>
                <li>Understand that trading involves financial risk and that past performance does not guarantee future results</li>
              </ul>
            </div>
          </section>

          {/* Risk Disclosure */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4">
              6. Risk Disclosure
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed bg-red-500/10 border border-red-500/30 rounded-lg p-5">
              <p>
                <strong className="text-red-300">IMPORTANT:</strong> Trading in foreign exchange (Forex) and other 
                financial instruments carries a high level of risk and may not be suitable for all investors.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may lose all or more than your initial investment</li>
                <li>Past performance is not indicative of future results</li>
                <li>Our AI trading systems do not guarantee profits or eliminate risk</li>
                <li>Market conditions can change rapidly, affecting trading performance</li>
                <li>You should only trade with capital you can afford to lose</li>
              </ul>
              <p>
                By using our services, you acknowledge that you understand these risks and that Shams Global Systems 
                is not responsible for any trading losses you may incur.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              7. Intellectual Property
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                All content, algorithms, code, documentation, and materials provided by Shams Global Systems are 
                protected by intellectual property laws. Our Expert Advisors, trading algorithms, and software are 
                proprietary property of Shams Global Systems.
              </p>
              <p>
                You are granted a non-exclusive, non-transferable license to use our products for your personal 
                trading purposes only. You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reverse engineer, decompile, or disassemble our software</li>
                <li>Modify, adapt, or create derivative works</li>
                <li>Distribute, sell, or sublicense our products</li>
                <li>Remove any copyright or proprietary notices</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              8. Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                To the maximum extent permitted by law, Shams Global Systems shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
                incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
              <p>
                Our total liability for any claims arising out of or related to our services shall not exceed the 
                amount you paid to us in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              9. Termination
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We reserve the right to terminate or suspend your access to our services immediately, without prior 
                notice, if you breach these Terms or engage in any fraudulent, illegal, or harmful activity.
              </p>
              <p>
                You may cancel your subscription at any time; however, no refunds will be provided for unused portions 
                of your subscription period.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              10. Governing Law
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates 
                (UAE), without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction 
                of the courts of Dubai, UAE.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              11. Contact Us
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-5">
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="space-y-2">
                <li><strong className="text-white">Email:</strong> support@shamsgs.com</li>
                <li><strong className="text-white">Phone:</strong> +971 58 635 4242</li>
                <li><strong className="text-white">Address:</strong> Dubai, United Arab Emirates</li>
              </ul>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t border-gray-700 pt-8">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
              <p className="text-center text-gray-300 leading-relaxed">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by 
                these Terms and Conditions.
              </p>
            </div>
          </section>
        </motion.div>
      </div>

      {/* Footer Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </main>
  );
}

