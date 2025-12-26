"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, RefreshCw, DollarSign, Clock, AlertCircle, CheckCircle } from "lucide-react";

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

export default function RefundPage() {
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
            <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Refund Policy
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
              <RefreshCw className="w-6 h-6" />
              1. Introduction
            </h2>
            <div className="prose prose-invert max-w-none space-y-4 text-gray-300 leading-relaxed">
              <p>
                At <strong className="text-white">Shams Global Systems</strong> ("Company", "we", "us", or "our"), 
                we are committed to providing high-quality AI-powered trading solutions and Expert Advisors. This 
                Refund Policy outlines the terms and conditions under which refunds may be issued for our products 
                and services.
              </p>
              <p>
                Please read this policy carefully before making a purchase. By purchasing our products or services, 
                you acknowledge that you have read, understood, and agree to be bound by this Refund Policy.
              </p>
            </div>
          </section>

          {/* General Policy */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              2. General Refund Policy
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
                <p className="font-semibold text-yellow-200 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Important Notice
                </p>
                <p>
                  Due to the digital nature of our products and services, <strong className="text-white">all sales 
                  are generally final</strong>. Once a subscription or service has been activated, refunds are typically 
                  not available. We encourage you to review our service details, pricing, and terms carefully before 
                  making a purchase.
                </p>
              </div>
            </div>
          </section>

          {/* Subscription Refunds */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              3. Subscription Refunds
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Annual AI Trading Subscription ($600 USD/year):</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">No Refunds:</strong> Annual subscription fees are non-refundable 
                  once payment has been processed and the subscription has been activated.
                </li>
                <li>
                  <strong className="text-white">Cancellation:</strong> You may cancel your subscription at any time, 
                  but cancellation does not entitle you to a refund for the unused portion of your subscription period.
                </li>
                <li>
                  <strong className="text-white">Service Access:</strong> Upon cancellation, you will retain access 
                  to the service until the end of your current billing period.
                </li>
              </ul>
            </div>
          </section>

          {/* Consultation Refunds */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              4. Consultation Service Refunds
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Consultation Sessions ($600 USD per session):</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Cancellation Policy:</strong> If you cancel a scheduled consultation 
                  at least <span className="text-cyan-400 font-bold">48 hours</span> before the scheduled time, you 
                  may be eligible for a full refund or rescheduling.
                </li>
                <li>
                  <strong className="text-white">No-Show Policy:</strong> If you fail to attend a scheduled consultation 
                  without prior notice, no refund will be issued.
                </li>
                <li>
                  <strong className="text-white">Completed Consultations:</strong> Once a consultation session has been 
                  completed, no refunds will be provided.
                </li>
              </ul>
            </div>
          </section>

          {/* Exceptions */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              5. Exceptions and Special Circumstances
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We understand that exceptional circumstances may arise. Refunds may be considered in the following 
                situations:
              </p>
              
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-5 space-y-3">
                <h3 className="text-lg font-semibold text-cyan-300">5.1 Technical Issues</h3>
                <p>
                  If you experience significant technical issues that prevent you from using our services, and our 
                  technical support team is unable to resolve the issue within <span className="text-cyan-400 font-bold">
                  14 days</span> of your initial report, you may be eligible for a partial or full refund. This 
                  must be requested within <span className="text-cyan-400 font-bold">30 days</span> of purchase.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-5 space-y-3">
                <h3 className="text-lg font-semibold text-cyan-300">5.2 Duplicate Charges</h3>
                <p>
                  If you are charged multiple times for the same product or service due to a technical error on our 
                  part, we will immediately refund the duplicate charges upon verification.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-5 space-y-3">
                <h3 className="text-lg font-semibold text-cyan-300">5.3 Service Unavailability</h3>
                <p>
                  If our services become permanently unavailable due to circumstances beyond your control, and you have 
                  not received the full value of your subscription, we may provide a prorated refund based on the 
                  unused portion of your subscription.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              6. Refund Request Process
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                If you believe you are eligible for a refund under the exceptions outlined above, please follow 
                these steps:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong className="text-white">Contact Support:</strong> Email us at{" "}
                  <a href="mailto:support@shamsgs.com" className="text-cyan-400 hover:text-cyan-300 underline">
                    support@shamsgs.com
                  </a>{" "}
                  with the subject line "Refund Request" within the applicable time frame.
                </li>
                <li>
                  <strong className="text-white">Provide Details:</strong> Include the following information in your request:
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                    <li>Your order number or transaction ID</li>
                    <li>Date of purchase</li>
                    <li>Reason for refund request</li>
                    <li>Support ticket numbers (if applicable)</li>
                    <li>Any relevant documentation or screenshots</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Review Period:</strong> We will review your request within{" "}
                  <span className="text-cyan-400 font-bold">5-7 business days</span> and respond with our decision.
                </li>
                <li>
                  <strong className="text-white">Processing Time:</strong> If approved, refunds will be processed 
                  within <span className="text-cyan-400 font-bold">10-14 business days</span> to your original payment 
                  method.
                </li>
              </ol>
            </div>
          </section>

          {/* Payment Method Refunds */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              7. Refund Method
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Refunds will be issued to the original payment method used for the purchase:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Credit/Debit Cards:</strong> Refunds will be credited back to the 
                  card used for the original transaction.
                </li>
                <li>
                  <strong className="text-white">Razorpay (INR):</strong> Refunds will be processed through Razorpay 
                  to your original payment method.
                </li>
                <li>
                  <strong className="text-white">Stripe (USD):</strong> Refunds will be processed through Stripe to 
                  your original payment method.
                </li>
              </ul>
              <p className="text-yellow-200 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
                <strong>Note:</strong> The time it takes for the refund to appear in your account depends on your 
                bank or payment provider. This typically ranges from 5-14 business days after we process the refund.
              </p>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4">
              8. Non-Refundable Items and Services
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed bg-red-500/10 border border-red-500/30 rounded-lg p-5">
              <p>
                The following items and services are <strong className="text-red-300">strictly non-refundable</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Activated annual subscriptions</li>
                <li>Completed consultation sessions</li>
                <li>Downloaded Expert Advisors or software</li>
                <li>License keys that have been activated</li>
                <li>Services used or accessed after purchase</li>
                <li>Refund requests made after 30 days from the date of purchase</li>
              </ul>
            </div>
          </section>

          {/* Chargebacks */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              9. Chargebacks and Disputes
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                If you initiate a chargeback or dispute with your payment provider without first contacting us, we 
                reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Immediately suspend or terminate your account</li>
                <li>Revoke access to all services and products</li>
                <li>Pursue legal action to recover any costs associated with the chargeback</li>
              </ul>
              <p>
                We strongly encourage you to contact our support team first to resolve any issues before initiating 
                a chargeback. We are committed to working with you to find a satisfactory solution.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              10. Changes to This Refund Policy
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately 
                upon posting on this page. We will update the "Last Updated" date to reflect any changes.
              </p>
              <p>
                Your continued use of our services after any changes to this Refund Policy constitutes acceptance 
                of those changes. We encourage you to review this policy periodically.
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
                If you have any questions about this Refund Policy or wish to request a refund, please contact us:
              </p>
              <ul className="space-y-2">
                <li><strong className="text-white">Email:</strong> support@shamsgs.com</li>
                <li><strong className="text-white">Phone:</strong> +971 58 635 4242</li>
                <li><strong className="text-white">Address:</strong> Ajman Free Zone C1 Building, United Arab Emirates</li>
              </ul>
              <p className="mt-4">
                Our support team is available to assist you and will respond to your inquiries within 24-48 hours 
                during business days.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t border-gray-700 pt-8">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
              <p className="text-center text-gray-300 leading-relaxed">
                By purchasing our products or services, you acknowledge that you have read, understood, and agree 
                to be bound by this Refund Policy. We recommend reviewing this policy before making any purchase.
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

