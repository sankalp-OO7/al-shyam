"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowLeft, Lock, Eye, Database, Mail } from "lucide-react";

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

export default function PrivacyPage() {
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
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Privacy Policy
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
              <Lock className="w-6 h-6" />
              1. Introduction
            </h2>
            <div className="prose prose-invert max-w-none space-y-4 text-gray-300 leading-relaxed">
              <p>
                At <strong className="text-white">Shams Global Systems</strong> ("Company", "we", "us", or "our"), 
                we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                visit our website, use our services, or interact with us.
              </p>
              <p>
                By accessing our website or using our services, you consent to the data practices described in this 
                Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <h3 className="text-xl font-semibold text-white mt-4">2.1 Personal Information</h3>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Contact Information:</strong> Name, email address, phone number, and postal address</li>
                <li><strong className="text-white">Account Information:</strong> Username, password, and account preferences</li>
                <li><strong className="text-white">Payment Information:</strong> Billing address, payment method details (processed securely through third-party payment processors)</li>
                <li><strong className="text-white">Communication Data:</strong> Messages, inquiries, and support tickets you send to us</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">2.2 Technical Information</h3>
              <p>We automatically collect certain technical information when you visit our website:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and geolocation data</li>
                <li>Browser type and version</li>
                <li>Device information (operating system, device type)</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">2.3 Trading Data</h3>
              <p>
                When you use our Expert Advisors or trading services, we may collect anonymized trading data for 
                analytical and improvement purposes. This data does not include personally identifiable information.
              </p>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              3. How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide, maintain, and improve our services and website</li>
                <li>To process payments and manage your subscription</li>
                <li>To communicate with you about your account, orders, and support requests</li>
                <li>To send you important updates, notifications, and marketing communications (with your consent)</li>
                <li>To personalize your experience and deliver relevant content</li>
                <li>To detect, prevent, and address technical issues, fraud, or security threats</li>
                <li>To comply with legal obligations and enforce our Terms and Conditions</li>
                <li>To analyze usage patterns and improve our products and services</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>We do not sell, rent, or trade your personal information. We may share your information in the following circumstances:</p>

              <h3 className="text-xl font-semibold text-white mt-4">4.1 Service Providers</h3>
              <p>
                We may share information with trusted third-party service providers who assist us in operating our 
                business, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment processors (Razorpay, Stripe) for processing transactions</li>
                <li>Email service providers for communications</li>
                <li>Cloud hosting providers for data storage</li>
                <li>Analytics services for website usage analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6">4.2 Legal Requirements</h3>
              <p>
                We may disclose your information if required by law or in response to valid legal requests, such as 
                court orders, subpoenas, or government investigations.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6">4.3 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to 
                the acquiring entity.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              5. Data Security
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-5">
              <p>
                We implement industry-standard security measures to protect your personal information from unauthorized 
                access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through PCI-DSS compliant providers</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular data backups and disaster recovery procedures</li>
              </ul>
              <p className="text-yellow-200 mt-4">
                <strong>Note:</strong> While we strive to protect your information, no method of transmission over 
                the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website 
                traffic, and personalize content. You can control cookies through your browser settings; however, 
                disabling cookies may limit some functionality of our website.
              </p>
              <p>Types of cookies we use:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong className="text-white">Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              7. Your Privacy Rights
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Access:</strong> Request access to your personal information</li>
                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information</li>
                <li><strong className="text-white">Objection:</strong> Object to processing of your personal information</li>
                <li><strong className="text-white">Data Portability:</strong> Request transfer of your data to another service</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the contact information provided at the end of 
                this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              8. Data Retention
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined 
                in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p>
                When you cancel your account, we will delete or anonymize your personal information, except where 
                we are required to retain it for legal or legitimate business purposes.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              9. Children's Privacy
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect 
                personal information from children. If you become aware that a child has provided us with personal 
                information, please contact us immediately, and we will take steps to delete such information.
              </p>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              10. International Data Transfers
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. 
                These countries may have different data protection laws than your country.
              </p>
              <p>
                By using our services, you consent to the transfer of your information to our facilities in the 
                United Arab Emirates and to the third-party service providers we use globally.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal 
                requirements. We will notify you of any material changes by posting the new Privacy Policy on this 
                page and updating the "Last Updated" date.
              </p>
              <p>
                Your continued use of our services after any changes to this Privacy Policy constitutes acceptance 
                of those changes.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              12. Contact Us
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-5">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <ul className="space-y-2">
                <li><strong className="text-white">Email:</strong> support@shamsgs.com</li>
                <li><strong className="text-white">Phone:</strong> +971 58 635 4242</li>
                <li><strong className="text-white">Address:</strong> Dubai, United Arab Emirates</li>
              </ul>
              <p className="mt-4">
                We will respond to your inquiries within a reasonable timeframe and in accordance with applicable 
                data protection laws.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t border-gray-700 pt-8">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
              <p className="text-center text-gray-300 leading-relaxed">
                By using our services, you acknowledge that you have read and understood this Privacy Policy and 
                consent to the collection, use, and disclosure of your information as described herein.
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

