"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white notranslate">
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
          <p className="text-gray-400 text-sm">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-8 sm:space-y-12 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the services provided by Shams Global
              Systems ("Shamsgs", "we", "us"), you agree to be bound by these
              Terms & Conditions. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              2. Account Access and Authorization
            </h2>
            <div className="prose prose-invert max-w-none space-y-4">
              <p>
                When you purchase consultation services or subscribe to any
                Shamsgs service that requires account integration (for example,
                trading account setup or AI-driven account management), you
                acknowledge and agree to the following:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>
                  You will open an account with the broker or provider
                  recommended or instructed by Shamsgs, either before or
                  immediately after subscribing, as part of the service
                  activation process.
                </li>
                <li>
                  You hereby authorize Shamsgs Consulting to access and manage
                  that account on your behalf for the purpose of implementing
                  and operating AI-driven trading or related services. Such
                  management may require providing Shamsgs Consulting with
                  account credentials or access methods needed to integrate and
                  operate the service.
                </li>
                <li>
                  Providing access and credentials is voluntary but required to
                  deliver the integrated service. By providing credentials or
                  granting access, you expressly consent to Shamsgs Consulting
                  performing actions on the account necessary to deliver the
                  contracted services.
                </li>
                <li>
                  Shamsgs will treat your credentials and account access in
                  accordance with our Privacy Policy and will take commercially
                  reasonable measures to protect that information. You remain
                  responsible for reviewing and understanding the security and
                  risks involved in sharing access with a third-party service
                  provider.
                </li>
                <li>
                  If you have questions about what access is needed or how We
                  manage your credentials, please contact support@shamsgs.com
                  prior to providing access.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              3. Other Terms
            </h2>
            <p>
              These Terms are in addition to any specific service agreement you
              enter into with Shamsgs. By proceeding with paid services that
              involve account integration, you confirm that you have read,
              understood, and consent to this authorization.
            </p>
          </section>
        </div>
      </div>

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
