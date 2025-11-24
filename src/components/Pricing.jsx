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
  Scale,
  Target,
  GitMerge,
  Award,
  ThumbsUp, // Pro/Good Icon
  ThumbsDown, // Con/Bad Icon
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
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1 + 0.5,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// --- Data Structure with Risk/Reward Levels, Pros, and Cons ---
const pricingTiers = [
  {
    title: "Viewer (Free Trial)",
    duration: "Data Only / 10 Days",
    gradient: "from-gray-700 to-gray-800",
    riskReward: "N/A",
    isFree: true,
    riskLevel: 1,
    rewardLevel: 1,
    pros: [
      "10-Day Full Demo Access",
      "View AI Sentiment & Data",
      "Test on Demo Account",
    ],
    cons: ["No Live Trading License", "Basic Email Support Only"],
    features: [
      "No Live Trading License",
      "Basic Email Support",
      "Full Feature Access for 10 Days",
      "Test on Demo Account (Simulated)",
    ],
  },
  {
    title: "SLOW Mode",
    duration: "Low Risk / Long-Term Growth",
    gradient: "from-green-600 to-emerald-700",
    riskReward: "Low Risk / Low Reward",
    isFree: false,
    riskLevel: 2,
    rewardLevel: 2,
    pros: [
      "Conservative & Stable Strategy",
      "Minimal Drawdown Profile",
      "Designed for long-term growth",
    ],
    cons: ["Lower Return Potential", "Max 2 Trades Per Day"],
    features: [
      "1 Live Account License",
      "Conservative Trading Strategy",
      "Standard 24/7 Support",
      "All updates included",
    ],
  },
  {
    title: "MODERATE Mode",
    duration: "Medium Risk / Balanced (Recommended)",
    gradient: "from-cyan-500 to-blue-500",
    riskReward: "Balanced",
    isFree: false,
    riskLevel: 3,
    rewardLevel: 3,
    pros: [
      "Optimized Balance Strategy",
      "Higher Consistency",
      "Priority 24/7 Support",
    ],
    cons: ["Moderate Drawdown Potential", "Requires Regular Monitoring"],
    features: [
      "1 Live Account License",
      "Balanced Risk/Reward Strategy",
      "Monthly Performance Check",
      "Access to Strategy Presets",
    ],
  },
  {
    title: "FAST Mode",
    duration: "High Risk / High Reward",
    gradient: "from-red-500 to-orange-500",
    riskReward: "High Risk / High Reward",
    isFree: false,
    riskLevel: 5,
    rewardLevel: 5,
    pros: [
      "Highest Potential Returns",
      "Aggressive, High-Frequency Trading",
      "Premium 24/7 Support",
    ],
    cons: ["High Drawdown Risk", "High Volatility Tolerance"],
    features: [
      "1 Live Account License",
      "Aggressive Trading Strategy",
      "Weekly Optimization Check",
      "High Volatility Tolerance",
    ],
  },
  {
    title: "SCALPING Mode",
    duration: "High Accuracy in 15 mins",
    gradient: "from-purple-500 to-pink-500",
    riskReward: "Scalping",
    isFree: false,
    riskLevel: 4,
    rewardLevel: 4,
    pros: [
      "High-Precision 15-Minute Trades",
      "Quick Profit Realization",
      "Suitable for volatile markets",
    ],
    cons: ["Requires Low Spread Broker", "High Execution Speed Required"],
    features: [
      "1 Live Account License",
      "Ultra-Fast, Short-Term Strategy",
      "Dedicated Server Setup Guide",
      "Low Spread Broker Priority",
    ],
  },
  {
    title: "HEADING Mode",
    duration: "Specialized Trading Market Work",
    gradient: "from-yellow-500 to-orange-600",
    riskReward: "Specialized",
    isFree: false,
    riskLevel: 4,
    rewardLevel: 3,
    pros: [
      "AI for Specific Market Events",
      "Focus on High-Impact News",
      "2 Live Account Licenses",
    ],
    cons: ["Less Frequent Trades", "Requires Careful Monitoring"],
    features: [
      "2 Live Account Licenses",
      "AI designed for specific market events",
      "Dedicated Account Manager",
      "Exclusive Strategy Insights",
    ],
  },
  {
    title: "ADVANCE HEADGE Mode",
    duration: "Trading & Fast Movements",
    gradient: "from-violet-600 to-fuchsia-600",
    riskReward: "Specialized",
    isFree: false,
    riskLevel: 5,
    rewardLevel: 4,
    pros: [
      "Advanced Hedging Techniques",
      "Full Risk Customization",
      "Optimized for quick market shifts",
    ],
    cons: ["Complex Setup", "Maximum Risk Exposure"],
    features: [
      "2 Live Account Licenses",
      "Advanced Hedging Techniques",
      "Full Risk Management Customization",
      "Free AI Optimization Session (Yearly)",
    ],
  },
];

// --- Sub-Component for Risk/Reward Visualization ---
const RiskRewardMeter = ({ riskLevel, rewardLevel }) => {
  // Risk/Reward is on a 1-5 scale. Meter has 5 segments.
  const getLevelColor = (level) => {
    if (level === 5) return "bg-red-500";
    if (level === 4) return "bg-orange-500";
    if (level === 3) return "bg-yellow-500";
    if (level === 2) return "bg-green-500";
    return "bg-gray-500";
  };

  return (
    <div className="space-y-2 mb-6 text-xs font-semibold">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Risk Level</span>
        <span
          className={`${getLevelColor(
            riskLevel
          )} text-white px-2 py-0.5 rounded-full`}
        >
          {riskLevel}/5
        </span>
      </div>
      <div className="flex w-full h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`${getLevelColor(riskLevel)} transition-all duration-500`}
          style={{ width: `${(riskLevel / 5) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-gray-400">Reward Potential</span>
        <span
          className={`${getLevelColor(
            rewardLevel
          )} text-white px-2 py-0.5 rounded-full`}
        >
          {rewardLevel}/5
        </span>
      </div>
      <div className="flex w-full h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`${getLevelColor(
            rewardLevel
          )} transition-all duration-500`}
          style={{ width: `${(rewardLevel / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

// --- Reusable Pricing Card Component ---
const PricingCard = ({
  title,
  duration,
  features,
  gradient,
  riskReward,
  isFree,
  customDelay,
  riskLevel,
  rewardLevel,
  pros,
  cons,
}) => {
  const isRecommended = riskReward === "Balanced";
  return (
    <motion.div
      custom={customDelay}
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative p-5 sm:p-6 rounded-xl shadow-2xl transition-all duration-500 h-full flex flex-col justify-between
                  ${
                    isRecommended
                      ? "bg-gray-800/90 border-4 border-cyan-500 shadow-cyan-900/70 transform scale-105 z-20" // Highlighted
                      : "bg-gray-900/80 border border-gray-700/50 hover:border-violet-500/50 z-10" // Default
                  }
                  hover:shadow-xl group overflow-hidden`}
    >
      {/* Ribbons/Badges */}
      {isRecommended && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-cyan-500 text-gray-900 font-bold rounded-bl-lg text-xs tracking-wider flex items-center">
          <Award className="w-3 h-3 mr-1" /> RECOMMENDED
        </div>
      )}
      {riskReward === "High Risk / High Reward" && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-red-600 text-white font-bold rounded-bl-lg text-xs tracking-wider">
          HIGH REWARD
        </div>
      )}
      {isFree && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-green-500 text-gray-900 font-bold rounded-bl-lg text-xs tracking-wider">
          FREE 10 DAYS
        </div>
      )}

      {/* Gradient Background Effect - Subtler use */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-extrabold mb-1 text-white">{title}</h3>

        {/* Duration/Risk Tag */}
        <p className="text-gray-400 text-sm mb-6 flex items-center font-medium">
          {riskReward === "High Risk / High Reward" && (
            <TrendingUp className="w-4 h-4 mr-1 text-red-500" />
          )}
          {riskReward === "Low Risk / Low Reward" && (
            <TrendingDown className="w-4 h-4 mr-1 text-green-500" />
          )}
          {riskReward === "Balanced" && (
            <Scale className="w-4 h-4 mr-1 text-cyan-500" />
          )}
          {riskReward === "Specialized" && (
            <GitMerge className="w-4 h-4 mr-1 text-yellow-500" />
          )}
          {riskReward === "Scalping" && (
            <Target className="w-4 h-4 mr-1 text-purple-500" />
          )}
          {riskReward === "N/A" && (
            <Eye className="w-4 h-4 mr-1 text-gray-500" />
          )}
          {duration}
        </p>

        {/* --- Risk/Reward Visualizations --- */}
        {!isFree && (
          <RiskRewardMeter riskLevel={riskLevel} rewardLevel={rewardLevel} />
        )}

        {/* 🎯 Price Placeholder */}
        <div className="my-4 border-b border-gray-700 pb-4">
          <p className="text-2xl font-extrabold text-white">
            {isFree ? "Free for 10 Days" : "Full License Required"}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {isFree ? "Full Feature Access" : "Billed Annually (Starting $600)"}
          </p>
        </div>

        {/* --- Pros and Cons (Goods and Bads) --- */}
        <div className="flex space-x-4 mb-6 pt-2">
          <div className="flex-1">
            <p className="text-sm font-bold text-green-400 flex items-center mb-1">
              <ThumbsUp className="w-4 h-4 mr-1" /> Goods (Pros)
            </p>
            <ul className="space-y-1">
              {pros.slice(0, 2).map(
                (
                  p,
                  i // Show top 2 pros
                ) => (
                  <li
                    key={i}
                    className="text-xs text-gray-300 flex items-start"
                  >
                    <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                    {p}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-red-400 flex items-center mb-1">
              <ThumbsDown className="w-4 h-4 mr-1" /> Bads (Cons)
            </p>
            <ul className="space-y-1">
              {cons.slice(0, 2).map(
                (
                  c,
                  i // Show top 2 cons
                ) => (
                  <li
                    key={i}
                    className="text-xs text-gray-300 flex items-start"
                  >
                    <span className="text-red-500 mr-2 flex-shrink-0">•</span>
                    {c}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Features List (Less emphasis now) */}
        <p className="text-sm font-bold text-white mt-4 mb-3">Key Features:</p>
        <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle
                className={`w-4 h-4 mt-1 mr-3 flex-shrink-0 ${
                  !isFree ? "text-cyan-400" : "text-gray-500"
                }`}
              />
              <span className="text-xs">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <motion.a
          href={isFree ? "#contact" : "#"}
          className={`w-full py-3 font-bold rounded-lg shadow-lg relative overflow-hidden transition-all duration-300 flex items-center justify-center text-lg
                      ${
                        isFree
                          ? "bg-gray-700 border border-gray-600 text-gray-400 hover:bg-gray-600"
                          : isRecommended
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/50 hover:shadow-lg"
                          : "bg-gray-700/70 border border-blue-500/30 text-white hover:bg-gray-600"
                      }`}
          whileHover={!isFree ? { scale: 1.02, y: -1 } : { scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();
            // Placeholder for actual checkout/payment logic
          }}
        >
          <span className="relative z-10 text-base">
            {isFree ? "Start 10-Day Demo" : "Get Started"}
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function Pricing() {
  // Custom class for centering the last item in a 3-column grid when total items is 7
  const getGridClass = (index, total) => {
    // 7 items: indices 0-2 (row 1), 3-5 (row 2), 6 (row 3, centered)
    if (total === 7 && index === total - 1) {
      return "lg:col-start-2";
    }
    return "";
  };

  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-40 bg-gray-950 border-b border-blue-500/10 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at top right, #001f3f 0%, transparent 50%), radial-gradient(circle at bottom left, #370665 0%, #0D1117 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* --- Header --- */}
        <motion.h2
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-6xl lg:text-7xl font-extrabold text-center mb-4 tracking-tighter"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Power Your Trading.
          </span>
        </motion.h2>

        {/* 🎯 GENERAL PRICING HEADING */}
        <motion.h3
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-4xl font-extrabold text-white text-center mb-2"
        >
          <span className="text-white">600 DOLLER YEARLY MEMBERSHIP</span>
        </motion.h3>

        <motion.p
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-center text-xl text-gray-400 max-w-4xl mx-auto mb-12 font-light"
        >
          Select the AI Mode that matches your risk tolerance and trading
          frequency. All paid licenses start at $600 / Year.
        </motion.p>

        {/* -------------------------------------------------------------------------------- */}
        {/* --- STEP-BY-STEP SETUP GUIDE (NOW AT TOP) --- */}
        {/* -------------------------------------------------------------------------------- */}
        <div className="mb-20">
          {" "}
          {/* Added mb-20 for separation from tiers */}
          <h3 className="text-3xl font-bold mb-12 text-white text-center">
            Your 3-Step Automation Setup
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Download MT5 */}
            <motion.div
              custom={0}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-cyan-500/30 shadow-lg text-center"
            >
              <div className="text-5xl font-black text-cyan-400 mb-4">1</div>
              <Download className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                Download MT5
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
              className="p-6 rounded-xl bg-gray-900/70 border border-blue-500/30 shadow-lg text-center"
            >
              <div className="text-5xl font-black text-blue-400 mb-4">2</div>
              <DollarSign className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                Select AI Mode
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Select your preferred risk mode from the tiers below to obtain
                your license key.
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
                View Modes Below
              </motion.a>
            </motion.div>

            {/* Step 3: Deployment */}
            <motion.div
              custom={2}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/70 border border-violet-500/30 shadow-lg text-center"
            >
              <div className="text-5xl font-black text-violet-400 mb-4">3</div>
              <Zap className="w-10 h-10 text-violet-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-3">
                Activate & Trade
              </h4>
              <p className="text-gray-400 mb-4 text-sm">
                Install the Expert Advisor file with your license key to start
                automated trading.
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
                Get Deployment Help
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------------- */}
        {/* --- PRICING TIERS --- */}
        {/* -------------------------------------------------------------------------------- */}
        <div id="license-tiers">
          <h3 className="text-4xl font-bold mb-12 text-white text-center">
            SHAMSGS AI License Modes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.title}
                className={`flex ${getGridClass(index, pricingTiers.length)}`}
                // Apply visual offset to the recommended card
                style={
                  tier.riskReward === "Balanced"
                    ? { marginTop: "-1rem", marginBottom: "-1rem" }
                    : {}
                }
              >
                <PricingCard {...tier} customDelay={index * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
