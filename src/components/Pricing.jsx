// components/Pricing.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Repeat,
  Zap,
  Shield,
  DollarSign,
  CheckCircle,
  Eye,
  TrendingUp,
  TrendingDown,
  Clock,
  Scale,
} from "lucide-react";

// --- Animation Variants ---
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2 + 0.5,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// --- Reusable Pricing Card Component ---
const PricingCard = ({
  title,
  price,
  duration,
  features,
  gradient,
  riskReward,
  isFree,
  customDelay,
}) => (
  <motion.div
    custom={customDelay}
    variants={stepVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className={`relative p-8 rounded-3xl backdrop-blur-sm shadow-xl transition-all duration-500 
                ${
                  !isFree && riskReward === "Balanced"
                    ? "bg-gray-800/80 border-2 border-cyan-500/80 shadow-cyan-900/60"
                    : "bg-gray-900/70 border border-blue-500/30 hover:border-violet-500/50"
                }
               hover:scale-[1.03] group overflow-hidden`}
  >
    {riskReward === "High Risk / High Reward" && (
      <div className="absolute top-0 right-0 px-4 py-1 bg-red-600 text-white font-bold rounded-bl-lg text-xs tracking-wider">
        HIGH VOLATILITY
      </div>
    )}
    {isFree && (
      <div className="absolute top-0 right-0 px-4 py-1 bg-green-500 text-gray-900 font-bold rounded-bl-lg text-xs tracking-wider">
        FREE TIER
      </div>
    )}

    {/* Gradient Background Effect */}
    <div
      className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
    />

    <div className="relative z-10">
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 flex items-center">
        {riskReward === "High Risk / High Reward" && (
          <TrendingUp className="w-4 h-4 mr-1 text-red-500" />
        )}
        {riskReward === "Low Risk / Low Reward" && (
          <TrendingDown className="w-4 h-4 mr-1 text-green-500" />
        )}
        {riskReward === "Balanced" && (
          <Scale className="w-4 h-4 mr-1 text-cyan-500" />
        )}
        {riskReward === "Elevated" && (
          <TrendingUp className="w-4 h-4 mr-1 text-orange-500" />
        )}
        {riskReward === "N/A" && <Eye className="w-4 h-4 mr-1 text-gray-500" />}
        {duration}
      </p>

      <div className="my-6">
        <p className="text-5xl font-extrabold text-white">
          <span className="text-3xl font-normal align-top">$</span>
          <span
            className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {price}
          </span>
        </p>
        <p className="text-gray-500 mt-1">
          {isFree ? "access forever" : "per license, billed yearly"}
        </p>
      </div>

      <ul className="space-y-3 text-gray-300 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle
              className={`w-5 h-5 mr-3 flex-shrink-0 ${
                !isFree ? "text-cyan-400" : "text-gray-500"
              }`}
            />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.a
        href={isFree ? "#contact" : "#"}
        className={`w-full py-3 mt-4 font-bold rounded-xl shadow-lg relative overflow-hidden transition-all duration-300 flex items-center justify-center 
                    ${
                      isFree
                        ? "bg-gray-700/50 border border-gray-600 text-gray-400 cursor-default"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-cyan-500/50"
                    }`}
        whileHover={!isFree ? { scale: 1.02, y: -2 } : {}}
        whileTap={!isFree ? { scale: 0.98 } : {}}
        onClick={
          isFree
            ? () =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
            : () => {
                /* Checkout Logic */
              }
        }
      >
        <span className="relative z-10">
          {isFree ? "View Demo (10 Days)" : "Choose License"}
        </span>
      </motion.a>
    </div>
  </motion.div>
);

// --- Main Component ---
export default function Pricing() {
  // 🎯 NEW PRICING TIERS BASED ON USER REQUIREMENTS
  const pricingTiers = [
    {
      title: "Viewer (Free)",
      price: "0",
      duration: "Data Only",
      gradient: "from-gray-500 to-gray-600",
      riskReward: "N/A",
      isFree: true,
      features: [
        "Access to Live AI Data Dashboard",
        "View Charts and AI Sentiment",
        "Demo Trade (Min 10 Days Market)", // From sketch
        "No Live Trading License",
        "Basic Email Support",
      ],
    },
    {
      title: "Slow Mode",
      price: "299",
      duration: "Most Conservative Strategy",
      gradient: "from-green-600 to-emerald-700",
      riskReward: "Low Risk / Low Reward",
      isFree: false,
      features: [
        "1 Live Account License",
        "Conservative Trading Strategy",
        "Stable Drawdown Profile",
        "Standard 24/7 Support",
        "All updates included",
      ],
    },
    {
      title: "Moderate Mode",
      price: "499",
      duration: "Optimized for Consistency",
      gradient: "from-blue-600 to-indigo-600",
      riskReward: "Balanced",
      isFree: false,
      features: [
        "1 Live Account License",
        "Balanced Risk/Reward Strategy",
        "Priority 24/7 Technical Support",
        "Access to Strategy Presets",
        "Monthly Performance Check",
      ],
    },
    {
      title: "Fast Mode",
      price: "600", // 🎯 Price from the user's sketch
      duration: "High Frequency Trading",
      gradient: "from-red-500 to-orange-500",
      riskReward: "High Risk / High Reward",
      isFree: false,
      features: [
        "1 Live Account License",
        "Aggressive, High-Frequency Strategy",
        "Premium 24/7 Technical Support",
        "Weekly Optimization Check",
        "Highest Potential Returns",
      ],
    },
    {
      title: "Mid Mode",
      price: "899",
      duration: "The All-Rounder Solution",
      gradient: "from-violet-600 to-fuchsia-600",
      riskReward: "Elevated",
      isFree: false,
      features: [
        "2 Live Account Licenses",
        "Fully Customizable Risk Settings",
        "Dedicated Account Manager",
        "Advanced Strategy Presets (5+)",
        "Free VPS Setup Guidance",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-40 bg-gray-900 border-b border-cyan-500/10 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          background:
            "radial-gradient(circle at bottom left, #370665 0%, #0D1117 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* --- Header --- */}
        <motion.h2
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-5xl lg:text-7xl font-black text-center mb-6 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Choose Your AI Risk Mode
          </span>
        </motion.h2>

        <motion.p
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-center text-xl text-gray-400 max-w-4xl mx-auto mb-20 font-light"
        >
          Start with our free viewer plan, or select a license based on your
          preferred trading risk and reward profile.
        </motion.p>

        {/* -------------------------------------------------------------------------------- */}
        {/* --- STEP-BY-STEP SETUP GUIDE --- */}
        {/* -------------------------------------------------------------------------------- */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-12 text-white text-center">
            Your 3-Step Automation Setup
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Platform Setup (Updated to reflect sketch: Install Meta5) */}
            <motion.div
              custom={0}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-cyan-500/30 shadow-xl shadow-cyan-900/40 text-center"
            >
              <div className="text-5xl font-black text-cyan-400 mb-4">1</div>
              <Download className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                STEP 1: Install MetaTrader 5 (MT5)
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Our AI runs on the free MT5 platform. Download the app to begin
                the process.
              </p>
              <motion.a
                href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5"
                target="_blank"
                className="inline-flex items-center justify-center w-full py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download MT5 App
              </motion.a>
            </motion.div>

            {/* Step 2: Choose License */}
            <motion.div
              custom={1}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-blue-500/30 shadow-xl shadow-blue-900/40 text-center"
            >
              <div className="text-5xl font-black text-blue-400 mb-4">2</div>
              <DollarSign className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                STEP 2: Choose Your AI License Mode
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Select a risk mode below (Slow, Moderate, Mid, or Fast) and
                complete your purchase.
              </p>
              <motion.a
                href="#license-tiers"
                className="inline-flex items-center justify-center w-full py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("license-tiers")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Repeat className="w-4 h-4 mr-2" />
                View Licenses Below
              </motion.a>
            </motion.div>

            {/* Step 3: Deployment */}
            <motion.div
              custom={2}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-violet-500/30 shadow-xl shadow-violet-900/40 text-center"
            >
              <div className="text-5xl font-black text-violet-400 mb-4">3</div>
              <Zap className="w-10 h-10 text-violet-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                STEP 3: Activate the AI
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Receive your EA file and license key, and install it on your MT5
                platform to start trading.
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center w-full py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-violet-500 to-fuchsia-600 shadow-md hover:from-violet-600 hover:to-fuchsia-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                <Shield className="w-4 h-4 mr-2" />
                Request Deployment Help
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------------- */}
        {/* --- PRICING TIERS --- */}
        {/* -------------------------------------------------------------------------------- */}
        <div id="license-tiers">
          <h3 className="text-4xl font-bold mb-12 text-white text-center">
            AL-Shams AI License Tiers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {pricingTiers.map((tier, index) => (
              <PricingCard
                key={tier.title}
                {...tier}
                customDelay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
